// Config del evento — todo lo que cambia entre ediciones vive acá.
// Precios y fechas de venta van acá (no son secretos). Claves de HubSpot/Stripe/Zoom
// van en variables de entorno cuando se conecten — nunca en este archivo.

export type PriceTier = {
  label: string;
  startISO: string;
  endISO: string;
  generalUSD: number;
  generalMXN: number;
  proUSD: number;
  proMXN: number;
};

export const EVENTO_ACTUAL = {
  slug: "ceo-en-control",
  nombre: "CEO en Control",
  fechaInicioISO: "2026-08-29T09:00:00-06:00",
  fechaFinISO: "2026-08-30T14:00:00-06:00",
  fechaLabel: "29 – 30 agosto 2026 · 09:00–14:00 CDMX",
  formato: "Virtual en vivo por Zoom",
  duracionDias: 2,
  // zoomWebinarId: "" // TODO: agregar cuando conectemos Zoom
  // hubspotFormId: "" // TODO: agregar cuando conectemos HubSpot
};

export const PRICE_TIERS: PriceTier[] = [
  { label: "Early Bird", startISO: "2026-08-01", endISO: "2026-08-11", generalUSD: 15, generalMXN: 319, proUSD: 19, proMXN: 389 },
  { label: "Ventana 2", startISO: "2026-08-11", endISO: "2026-08-21", generalUSD: 19, generalMXN: 399, proUSD: 25, proMXN: 499 },
  { label: "Ventana 3", startISO: "2026-08-21", endISO: "2026-08-28", generalUSD: 25, generalMXN: 499, proUSD: 29, proMXN: 599 },
  { label: "Última oportunidad", startISO: "2026-08-28", endISO: "2026-08-31", generalUSD: 29, generalMXN: 599, proUSD: 35, proMXN: 699 },
];

/** Devuelve el índice de la ventana de precio activa para una fecha dada. */
export function getActiveTierIndex(now: Date): number {
  for (let i = 0; i < PRICE_TIERS.length; i++) {
    const start = new Date(`${PRICE_TIERS[i].startISO}T00:00:00`);
    const end = new Date(`${PRICE_TIERS[i].endISO}T00:00:00`);
    if (now < start) return i === 0 ? 0 : i;
    if (now >= start && now < end) return i;
  }
  return PRICE_TIERS.length - 1;
}

export function daysUntil(dateISO: string, now: Date): number {
  const target = new Date(`${dateISO}T00:00:00`);
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / 86_400_000));
}

export type PlanId = "general" | "pro";

export const PLAN_FEATURES: Record<PlanId, { name: string; featured?: boolean; features: string[] }> = {
  general: {
    name: "General",
    features: [
      "Acceso a los 2 días en vivo",
      "Herramientas y materiales",
      "Diploma firmado por Growth Institute",
      "Grupo de WhatsApp",
    ],
  },
  pro: {
    name: "PRO — 2×1",
    featured: true,
    features: [
      "Todo lo del General",
      "CEO + Mano derecha (2 accesos)",
      "Sesión adicional la semana siguiente",
    ],
  },
};
