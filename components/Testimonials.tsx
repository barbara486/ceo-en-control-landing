const TESTIMONIOS = [
  {
    quote: "Tus consejos me están permitiendo crecer: cuando te escuché por primera vez facturaba 1.000 USD al mes; hoy, después de 12 meses, estoy en los 9.000 USD mensuales.",
    author: "Jhairo R.",
  },
  {
    quote: "Oro molido su información, Sr. Marcos. He aplicado varios de los consejos que usted da y me han cambiado la vida.",
    author: "Luis Carlos A.",
  },
  {
    quote: "Ya me volví fan de Daniel — transmite sus conocimientos claros, concisos, naturales, sin vender humo.",
    author: "David G.",
  },
  {
    quote: "Es maravilloso conocer a grandes empresarios que están dispuestos a enseñar a otros. ¡Mil gracias!",
    author: "Laura F.",
  },
  {
    quote: "Excelente contenido, gran claridad en los conceptos y tips para aplicar ya mismo en la empresa.",
    author: "Mayra G.",
  },
  {
    quote: "Muy agradecido por su aporte. Soy emprendedor y con esta información voy a dar pasos diferentes de acá en adelante.",
    author: "Roger A.",
  },
];

export function Testimonials() {
  return (
    <section className="section-py section-light">
      <div className="wrap">
        <p className="kicker mb-3">LA COMUNIDAD GI</p>
        <h2 className="h2 mb-3">Lo que dice la audiencia de Daniel Marcos</h2>
        <p className="lead mb-10">
          Comentarios reales de la audiencia de Growth Institute en YouTube (nombres abreviados por privacidad).
        </p>

        <div className="grid gap-5 md:grid-cols-3">
          {TESTIMONIOS.map((t) => (
            <figure key={t.author} className="card-lift card-on-light rounded-2xl p-6">
              <blockquote className="text-[15px] leading-relaxed text-[var(--soft)]">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 text-xs font-bold uppercase tracking-wider text-[var(--blue-400)]">
                {t.author} · comentario en YouTube
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
