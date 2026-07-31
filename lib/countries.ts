// Países LATAM + USA + España + más comunes (audiencia GI)
export const countries = [
  { code: "MX", name: "México", phoneCode: "+52" },
  { code: "CO", name: "Colombia", phoneCode: "+57" },
  { code: "PE", name: "Perú", phoneCode: "+51" },
  { code: "EC", name: "Ecuador", phoneCode: "+593" },
  { code: "CL", name: "Chile", phoneCode: "+56" },
  { code: "AR", name: "Argentina", phoneCode: "+54" },
  { code: "VE", name: "Venezuela", phoneCode: "+58" },
  { code: "BO", name: "Bolivia", phoneCode: "+591" },
  { code: "PY", name: "Paraguay", phoneCode: "+595" },
  { code: "UY", name: "Uruguay", phoneCode: "+598" },
  { code: "CR", name: "Costa Rica", phoneCode: "+506" },
  { code: "PA", name: "Panamá", phoneCode: "+507" },
  { code: "GT", name: "Guatemala", phoneCode: "+502" },
  { code: "HN", name: "Honduras", phoneCode: "+504" },
  { code: "SV", name: "El Salvador", phoneCode: "+503" },
  { code: "NI", name: "Nicaragua", phoneCode: "+505" },
  { code: "DO", name: "Rep. Dominicana", phoneCode: "+1" },
  { code: "PR", name: "Puerto Rico", phoneCode: "+1" },
  { code: "CU", name: "Cuba", phoneCode: "+53" },
  { code: "ES", name: "España", phoneCode: "+34" },
  { code: "US", name: "Estados Unidos", phoneCode: "+1" },
  { code: "CA", name: "Canadá", phoneCode: "+1" },
  { code: "BR", name: "Brasil", phoneCode: "+55" },
  { code: "OT", name: "Otro", phoneCode: "" },
] as const;

export type CountryCode = (typeof countries)[number]["code"];

/** Convierte un ISO code (MX) en emoji de bandera (🇲🇽). */
export function flagEmoji(code: string): string {
  if (code === "OT") return "🌐";
  return code
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}
