export async function POST(req: Request) {
  const { plan, email, name } = await req.json();
  // TODO: crear Stripe Checkout Session (o usar un Payment Link) y devolver la URL real
  // const session = await stripe.checkout.sessions.create({...})
  // return Response.json({ url: session.url })
  console.log("[checkout] plan:", plan, "email:", email, "name:", name);
  return Response.json({ ok: true, url: "#" }); // placeholder — no cobra de verdad todavía
}
