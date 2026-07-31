# Handoff — CEO en Control (landing + funnel)

Este documento resume cómo funciona el flujo de compra de la landing y qué falta conectar para que sea 100% real (hoy todo funciona de punta a punta pero con placeholders: no cobra de verdad, no manda leads a ningún lado, no manda al grupo de WhatsApp real).

Stack: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4 + Motion. Sin backend propio ni base de datos — todo lo que hoy sería "backend" son API routes de Next.js (`app/api/*`).

---

## 1. El funnel — cómo está armado hoy

Todo pasa **en una sola página**, sin navegar a otra URL. La lógica completa vive en `components/PricingSection.tsx` (Client Component), como una máquina de estados:

```ts
type Step = "pricing" | "form" | "checkout" | "quiz" | "done";
```

**Fase 1 — Pricing** (`step === "pricing"`, estado inicial)
- Dos tarjetas: General y PRO (2×1). Precios y ventanas de fecha en `lib/eventos.ts` (`PRICE_TIERS`, `PLAN_FEATURES`, `getActiveTierIndex`).
- Clic en la tarjeta o en su botón → `choosePlan(id)` → guarda el plan elegido, pasa a `"form"` y hace scroll suave al formulario.

**Fase 2 — Formulario** (`step === "form"`)
- Campos: nombre y apellido, email, teléfono + selector de país (autodetecta el país vía `/api/geo`, que lee el header `x-vercel-ip-country` que agrega Vercel automáticamente — no depende de ningún servicio externo).
- Validación: nombre ≥4 caracteres y con espacio, email con regex simple, teléfono ≥6 dígitos.
- Al enviar (`submitForm`) → hace `POST /api/lead` (hoy placeholder) → pasa a `"checkout"`.

**Fase 3 — Checkout** (`step === "checkout"`)
- Es una **réplica visual** de un checkout de Stripe (resumen del pedido + campos de tarjeta), pero **no está conectado a nada real todavía**. Los inputs de tarjeta están deshabilitados a propósito.
- Botón "Pagar $X" (`goToPayment`) → hace `POST /api/checkout` (hoy placeholder) → pasa a `"quiz"`.

**Fase 4 — Quiz + WhatsApp** (`step === "quiz"` → `"done"`)
- Primero muestra un banner de "¡Compra confirmada!" con el resumen + aviso de que llega un email (ese email **todavía no se envía**, ver HubSpot abajo).
- Debajo, un quiz de 3 preguntas con countdown de 60s que salta automáticamente si no responde.
- Al terminar (o saltar) → `step: "done"`: muestra un análisis personalizado según las respuestas (o un mensaje genérico si saltó) + un bloque que redirige al grupo de WhatsApp en 20s.

---

## 2. Qué falta conectar — checklist para el dev

### 🔴 Pago real (Stripe)
- **Dónde:** `components/PricingSection.tsx` función `goToPayment()` + `app/api/checkout/route.ts`
- **Hoy:** `/api/checkout` solo hace `console.log` y devuelve `{ ok: true, url: "#" }`. No cobra nada.
- **Falta:**
  1. Decidir Stripe Checkout hosteado vs. Payment Links vs. Stripe Elements embebido (impacta si el usuario sale un instante a `checkout.stripe.com` o no).
  2. En `/api/checkout`, crear la Checkout Session real (`stripe.checkout.sessions.create`) con el precio según `plan` + la ventana de precio activa (`tier`), y devolver `session.url`.
  3. En el frontend, en vez de solo avanzar el `step`, redirigir: `window.location.href = url`.
  4. Definir `success_url` / `cancel_url` — si el pago es hosteado, el usuario vuelve a este sitio después de pagar (¿a qué paso? probablemente directo al quiz).
  5. Webhook de Stripe (`app/api/webhook/stripe`, no existe todavía) para confirmar el pago del lado del servidor y disparar HubSpot + Meta CAPI (ver abajo).
- **Env vars necesarias:** `STRIPE_SECRET_KEY`, y los IDs de precio o montos por plan/ventana.

### 🔴 Checkout en la misma página
- Ya está resuelto tal cual está hoy — todo el flujo (pricing → form → checkout → quiz) es una sola página sin recargar. Lo único a tener en cuenta: si usan Stripe Checkout hosteado (opción más simple y seguro/PCI), el usuario sale brevemente a `checkout.stripe.com` y vuelve — eso es normal y no contradice el pedido de "una sola página", pero si quieren que **nunca** salga del dominio, hay que usar Stripe Elements embebido (bastante más trabajo de desarrollo).

### 🔴 HubSpot
- **Dónde:** `app/api/lead/route.ts`
- **Hoy:** solo `console.log(body.email)`. No llega ningún contacto a HubSpot.
- **Falta:** llamar a la API de HubSpot (Forms API o Contacts API) con nombre/email/teléfono/país/plan cuando se envía el formulario, y un segundo llamado cuando termina el quiz para enriquecer el contacto con las respuestas (perfil/reto/etapa).
- **Referencia real ya funcionando:** el proyecto hermano `gi-workshop-tablero-ceo` (mismo equipo, mismo stack) ya tiene esto conectado en `app/api/lead/route.ts` — es el mejor punto de partida para copiar el patrón.
- **Env vars necesarias:** token privado de HubSpot, portal ID, form ID.

### 🔴 Meta (Pixel + Conversions API)
- **Hoy:** no hay nada implementado — ni el pixel del navegador ni CAPI del lado del servidor.
- **Falta:**
  1. Agregar el snippet del Pixel en `app/layout.tsx` (renderizado solo si existe la env var, para no romper nada si no está seteada).
  2. Disparar evento `Lead` al enviar el formulario, `InitiateCheckout` al entrar a la fase de pago, y `Purchase` (server-side, vía CAPI, disparado por el webhook de Stripe una vez confirmado el pago real — nunca antes).
- **Env vars necesarias:** `META_PIXEL_ID` (mismo valor para navegador y servidor, para que no se desincronicen).

### 🟡 Grupo de WhatsApp
- **Dónde:** `components/PricingSection.tsx`, línea con `const WHATSAPP_GROUP_URL = "#";` (cerca del principio del archivo).
- **Falta:** un solo cambio — reemplazar `"#"` por el link real del grupo. Es lo más simple de todo este checklist.

### 🟡 Zoom
- **Dónde:** `lib/eventos.ts` tiene un campo comentado `// zoomWebinarId`.
- **A confirmar con el equipo:** este bootcamp es pago y el acceso se asume que llega por email/WhatsApp después de la compra, no por un registro tipo webinar de Zoom con link automático (a diferencia del proyecto hermano, que es un webinar gratuito). Si igual quieren automatizar el envío del link de Zoom, hay que definir ese flujo — hoy no existe.

### 🟢 Pendientes menores (no bloquean nada técnico)
- **Christian Turnbull (coach de Hyper Sales Growth):** usé la foto que Barbara pasó, pero no aparece en el equipo oficial publicado en growthinstitute.com — confirmar si es coach invitado/externo.
- **Sección "Lo que obtienes"/Kit del CEO:** hoy es texto + emoji, sin mockups. Sumar imágenes cuando estén listas.
- **Dominio propio:** el sitio vive en `ceo-en-control-landing.vercel.app`. Evaluar dominio de la empresa si van a pautar.
- **Analytics (GTM/GA4):** no están conectados. No estaba pedido explícitamente, pero queda para definir si lo quieren.

---

## 3. Dónde está cada cosa (mapa rápido del código)

| Qué | Archivo |
|---|---|
| Lógica completa del funnel (las 4 fases) | `components/PricingSection.tsx` |
| Precios, ventanas de fecha, features de cada plan | `lib/eventos.ts` |
| Selector de país/teléfono | `lib/countries.ts` |
| Geo-IP (detecta país automáticamente) | `app/api/geo/route.ts` |
| Placeholder de captura de lead | `app/api/lead/route.ts` |
| Placeholder de checkout/pago | `app/api/checkout/route.ts` |
| Link del grupo de WhatsApp | `components/PricingSection.tsx` (`WHATSAPP_GROUP_URL`) |
| Design system (colores, tipografía) | `app/globals.css` |
| Resto de las secciones de la landing | `app/page.tsx` |

---

## 4. Variables de entorno que van a necesitar

Ninguna está seteada todavía. Se configuran en Vercel → Settings → Environment Variables del proyecto nuevo que armen.

```
STRIPE_SECRET_KEY=
HUBSPOT_PRIVATE_APP_TOKEN=
HUBSPOT_PORTAL_ID=
HUBSPOT_FORM_ID=
META_PIXEL_ID=
```
