# CEO en Control — Landing Page

Landing page del bootcamp virtual "CEO en Control" de Growth Institute (29–30 agosto 2026).

## Stack

Next.js 16 + React 19 + TypeScript + Tailwind v4 + Motion (App Router, sin carpeta `src/`, alias `@/*`).
Mismo stack y design system que `gi-workshop-tablero-ceo`.

## Estructura

- `app/page.tsx` — Server Component con todo el contenido estático (hero, problema, sistemas, agenda, kit, speaker, testimonios, FAQ).
- `app/layout.tsx` — fuentes, metadata, JSON-LD (Event + Organization).
- `app/globals.css` — design system oficial de GI en formato Tailwind v4 `@theme`.
- `components/PricingSection.tsx` — Client Component con el flujo de compra completo de 4 fases: Pricing → Formulario → Checkout (simulado) → Quiz + WhatsApp.
- `components/Countdown.tsx`, `components/Reveal.tsx` — animaciones.
- `components/Speaker.tsx`, `components/Testimonials.tsx` — secciones de contenido.
- `lib/eventos.ts` — fechas, escalera de precios y features de cada plan.
- `lib/countries.ts` — selector de país/teléfono.
- `app/api/{lead,checkout,geo}/route.ts` — endpoints placeholder (ver "Pendiente" abajo).
- `app/robots.ts`, `app/sitemap.ts`, `public/llms.txt` — SEO/GEO para buscadores y crawlers de IA.

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de producción
```

## Pendiente antes de conectar todo de verdad

- [ ] **Pago real**: hoy el botón "Ir al pago" es una simulación (`app/api/checkout/route.ts`). Cuando tengas el link/mecanismo de cobro real (Stripe u otro), se conecta ahí.
- [ ] **HubSpot / Meta CAPI**: `app/api/lead/route.ts` solo loguea el lead por ahora.
- [ ] **Grupo de WhatsApp real**: reemplazar `WHATSAPP_GROUP_URL = "#"` en `components/PricingSection.tsx` por el link real.
- [ ] **Zoom**: sin conectar todavía (`lib/eventos.ts` tiene el placeholder comentado).
- [ ] **Imágenes de "Lo que obtienes"**: hoy son solo texto + emoji. Reemplazar cuando haya mockups.

## Deploy

Vercel detecta Next.js automáticamente. Si el proyecto en Vercel quedó configurado como sitio estático ("Other") de la versión anterior, cambiar el Framework Preset a **Next.js** en Settings → General.
