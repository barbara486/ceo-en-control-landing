const TESTIMONIOS = [
  { quote: "Hace 1 año apliqué tus enseñanzas y he crecido 6 veces en facturación en un año.", author: "Jhairo R." },
  { quote: "Oro molido su información. He aplicado varios de sus consejos y me han cambiado la vida.", author: "Luis Carlos A." },
  { quote: "Me volví fan de Daniel — transmite sus conocimientos claros, concisos, naturales, sin vender humo.", author: "David G." },
  { quote: "Me cambió la vida Scaling Up.", author: "Pedro" },
  { quote: "Muy agradecido por su aporte. Con esta información voy a dar pasos diferentes de acá en adelante.", author: "Roger A." },
  { quote: "Es maravilloso conocer a grandes empresarios dispuestos a enseñar a otros. ¡Mil gracias!", author: "Laura F." },
  { quote: "El compromiso se ve en los comportamientos: qué tan alineado estás con tus valores, misión y visión.", author: "Héctor P." },
  { quote: "Hoy comienzo. En 5 años les cuento. Gracias por compartir tus conocimientos.", author: "Carlos Q." },
  { quote: "Excelente como persona y como empresario — siempre lleva sus planes a la realidad con responsabilidad.", author: "Ana María V." },
  { quote: "Excelente contenido, gran claridad en los conceptos y tips para aplicar ya mismo.", author: "Mayra G." },
  { quote: "Para muchos el emprendimiento no es una elección, es la única oportunidad.", author: "Ivett G." },
  { quote: "Gracias a estas ideas, estoy ordenando mi empresa como corresponde.", author: "Miguel Ángel O." },
  { quote: "Me diste ideas y ratificaste tesis que ya tenía. El contenido es muy valioso.", author: "José Luis N." },
  { quote: "Poquito tiempo pero no tiene desperdicio. Buenísimo de principio a fin.", author: "Antonio C." },
  { quote: "Cuestiones prácticas y funcionales, explicadas de forma clara y precisa. Me es de mucha utilidad.", author: "César C." },
  { quote: "Estos consejos son muy buenos para llevar mi proyecto adelante de manera asertiva y efectiva.", author: "Adriana D." },
  { quote: "Soy tu súper fan, la neta me inspirás.", author: "Rubén S." },
  { quote: "Excelente contenido. Gracias por compartir información tan valiosa.", author: "Lauren L." },
  { quote: "Excelente aporte. Acompaño mi visión con este tipo de contenido.", author: "Nicolás T." },
  { quote: "Siempre compartiendo contenido interesante y aportando valor real.", author: "Eduardo N." },
  { quote: "Después de escucharte, me di cuenta del valor real de mi equipo. Gracias.", author: "Marta B." },
];

function chunk<T>(arr: T[], n: number): T[][] {
  const out: T[][] = Array.from({ length: n }, () => []);
  arr.forEach((item, i) => out[i % n].push(item));
  return out;
}

function Card({ t }: { t: (typeof TESTIMONIOS)[number] }) {
  return (
    <figure className="card-on-light w-[340px] shrink-0 rounded-2xl p-6">
      <blockquote className="text-[15px] leading-relaxed text-[var(--soft)]">&ldquo;{t.quote}&rdquo;</blockquote>
      <figcaption className="mt-4 text-xs font-bold uppercase tracking-wider text-[var(--blue-400)]">{t.author}</figcaption>
    </figure>
  );
}

export function Testimonials() {
  const rows = chunk(TESTIMONIOS, 3);

  return (
    <section className="section-py section-light overflow-hidden">
      <div className="wrap mb-10">
        <p className="kicker mb-3">LA COMUNIDAD GI</p>
        <h2 className="h2 mb-3">Lo que dice la audiencia de Daniel Marcos</h2>
        <p className="lead">Comentarios reales de la audiencia de Growth Institute (nombres abreviados por privacidad).</p>
      </div>

      <div className="flex flex-col gap-5">
        {rows.map((row, i) => (
          <div key={i} className="marquee-viewport">
            <div className={`marquee-row ${i === 1 ? "marquee-row--reverse" : ""}`}>
              {[...row, ...row].map((t, j) => (
                <Card key={`${t.author}-${j}`} t={t} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
