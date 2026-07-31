export async function POST(req: Request) {
  const body = await req.json();
  // TODO: enviar a HubSpot Forms API (ver gi-workshop-tablero-ceo/app/api/lead/route.ts)
  // TODO: disparar evento Lead / InitiateCheckout a Meta CAPI (server-side)
  console.log("[lead] recibido:", body.email, "plan:", body.plan);
  return Response.json({ ok: true, via: "placeholder" });
}
