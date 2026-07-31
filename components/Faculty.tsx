import Image from "next/image";

const COACHES = [
  {
    id: "daniel",
    tag: "01 · Apertura y cierre · ImpactX",
    name: "Daniel Marcos",
    role: "Cofundador y CEO de Growth Institute · creador de ImpactX",
    desc: "Coach de CEOs por más de 20 años en 6 continentes. Durante más de una década ayudó a cientos de CEOs en LATAM y USA a salir de la operación diaria y construir empresas que funcionan sin depender de ellos. Abre y cierra el bootcamp, y da el sistema de propósito y modelo de negocio que le da dirección a toda la empresa.",
    quote: "“Tu empresa no necesita más contenido. Necesita que tú salgas del cuello de botella.”",
    photo: "/brand/coach-daniel-marcos.png",
  },
  {
    id: "scaling-up",
    tag: "02 · Scaling Up",
    name: "Paulina López & Miguel González",
    role: "Head of Consulting y Head Coach · Growth Institute",
    desc: "Construyen el Tablero del CEO: prioridades, KPIs, dueños y cadencia de reuniones. El sistema que le devuelve el ritmo operativo a la empresa — y las horas al fundador.",
    photos: ["/brand/coach-paulina-lopez.png", "/brand/coach-miguel-gonzalez.png"],
  },
  {
    id: "topgrading",
    tag: "03 · Topgrading",
    name: "Marite Río Nevado",
    role: "Head Coach · Growth Institute",
    desc: "Enseña a tomar mejores decisiones de talento y delegación real. El sistema que asegura que el equipo correcto esté en los roles correctos — para que delegar deje de dar miedo.",
    photo: "/brand/coach-marite-rio-nevado.png",
  },
  {
    id: "hsg",
    tag: "04 · Hyper Sales Growth",
    name: "Christian Turnbull",
    role: "Coach de ventas y crecimiento · Growth Institute",
    desc: "Construye un motor comercial visible, predecible y que funciona sin que el CEO esté cerrando cada venta. El último sistema — el que convierte claridad en ingresos.",
    photo: "/brand/coach-christian-turnbull.jpg",
  },
] as const;

function CoachPhoto({ coach }: { coach: (typeof COACHES)[number] }) {
  if ("photos" in coach) {
    return (
      <div className="flex justify-center gap-1.5 md:justify-start">
        {coach.photos.map((src) => (
          <div key={src} className="h-[100px] w-[54px] shrink-0 overflow-hidden rounded-xl">
            <Image src={src} alt={coach.name} width={140} height={260} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="mx-auto h-[100px] w-[100px] shrink-0 overflow-hidden rounded-2xl md:mx-0">
      <Image src={coach.photo} alt={coach.name} width={200} height={200} className="h-full w-full object-cover" />
    </div>
  );
}

export function Faculty() {
  return (
    <section className="section-py section-light" id="faculty">
      <div className="wrap">
        <p className="kicker mb-3">LOS 4 SISTEMAS Y SUS COACHES</p>
        <h2 className="h2 mb-3">Cada sistema, enseñado por quien lo domina.</h2>
        <p className="lead mb-10">No es Daniel solo con cuatro slides. Cada bloque lo lidera el coach senior de Growth Institute especializado en ese sistema — para que la profundidad sea real, no de repaso.</p>

        <div className="flex flex-col gap-5">
          {COACHES.map((coach) => (
            <article key={coach.id} className="faculty-card grid grid-cols-1 items-center gap-6 rounded-3xl p-7 text-center md:grid-cols-[120px_1fr] md:p-8 md:text-left">
              <CoachPhoto coach={coach} />
              <div>
                <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--blue-400)]">{coach.tag}</p>
                <h3 className="mb-1 text-xl font-extrabold">{coach.name}</h3>
                <p className="mb-2.5 text-[13.5px] text-[var(--muted)]">{coach.role}</p>
                <p className="text-[15px] leading-relaxed text-[var(--soft)]">{coach.desc}</p>
                {"quote" in coach && <p className="mt-3 text-sm font-semibold text-[var(--blue-400)]">{coach.quote}</p>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
