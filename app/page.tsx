import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Countdown } from "@/components/Countdown";
import { PricingSection } from "@/components/PricingSection";
import { Speaker } from "@/components/Speaker";
import { Testimonials } from "@/components/Testimonials";
import { EVENTO_ACTUAL } from "@/lib/eventos";

export default function Page() {
  return (
    <main>
      <Nav />
      <Hero />
      <Problema />
      <Promesa />
      <Sistemas />
      <Evento />
      <Agenda />
      <LoQueObtienes />
      <Speaker />
      <Testimonials />
      <PricingSection />
      <Faq />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--bg)]/85 backdrop-blur-md">
      <div className="wrap flex items-center justify-between py-4">
        <Image src="/brand/logo-gi-blanco.png" alt="Growth Institute" width={140} height={24} className="h-6 w-auto" />
        <a href="#comprar" className="btn btn-primary btn-sm">Reservar mi lugar</a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="pt-16 pb-12 md:pt-24 md:pb-16" style={{ background: "linear-gradient(180deg,#16181E 0%,#081022 100%)" }}>
      <div className="wrap">
        <div className="live-badge mb-6">
          <span className="live-dot" />
          <span>BOOTCAMP VIRTUAL EN VIVO</span>
        </div>
        <h1 className="text-[56px] md:text-[92px] font-extrabold leading-[1.02] tracking-tight mb-6">
          CEO en<br /><span className="accent">Control</span>
        </h1>
        <p className="lead max-w-[620px] mb-6">
          Deja de improvisar. En 2 días vas a conocer los 4 sistemas que los CEOs profesionales usan para <strong className="font-extrabold text-white">tener su empresa en control.</strong>
        </p>
        <div className="date-glow mb-8">
          <span className="text-2xl leading-none">📅</span>
          <div>
            <p className="text-sm font-bold">{EVENTO_ACTUAL.fechaLabel}</p>
            <p className="mt-1 text-xs text-[var(--muted)]">{EVENTO_ACTUAL.formato} — el horario está en tiempo de Ciudad de México (CDMX). No es un evento presencial.</p>
          </div>
        </div>
        <div className="mb-8">
          <a href="#comprar" className="btn btn-primary btn-sm md:h-[56px] md:px-8 md:text-base">Reservar mi lugar</a>
          <p className="mt-3 text-xs text-[var(--dim)]">Cupo limitado · 1 ticket = 1 acceso individual a Zoom</p>
        </div>
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">El bootcamp empieza en</p>
          <Countdown targetISO={EVENTO_ACTUAL.fechaInicioISO} />
        </div>
      </div>
    </section>
  );
}

function Problema() {
  return (
    <section className="section-py section-light">
      <div className="wrap max-w-[760px]">
        <Reveal>
          <p className="kicker mb-3">EL PROBLEMA</p>
          <h2 className="h2 mb-5">Tu empresa creció.<br />Tú no saliste de la operación.</h2>
          <p className="lead mb-3">
            El CEO en etapa 2–3 sabe que necesita sistemas para escalar. Sabe los nombres. No sabe cómo priorizarlos ni por dónde empezar. Sigue siendo el cuello de botella porque nadie le mostró el mapa completo.
          </p>
          <p className="lead opacity-90">
            Y cada semana que pasa sin ese mapa, el costo de seguir operando así lo sigue pagando el propio CEO: menos tiempo, menos foco, menos crecimiento real.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Promesa() {
  return (
    <section className="section-py" style={{ background: "var(--bg)" }}>
      <div className="wrap max-w-[760px]">
        <Reveal>
          <p className="kicker mb-3">LA PROMESA</p>
          <h2 className="h2 mb-5">Deja de improvisar.</h2>
          <p className="lead mb-3">En 2 días vas a conocer los 4 sistemas que los CEOs profesionales usan para tener su empresa en control:</p>
          <p className="accent text-2xl font-extrabold">ImpactX, Scaling Up, Topgrading e Hyper Sales Growth.</p>
        </Reveal>
      </div>
    </section>
  );
}

const SISTEMAS = [
  { num: "01", title: "ImpactX", desc: "Sistema de propósito y modelo de negocio. Le da dirección al CEO y a toda la empresa.", coach: "COACH · DANIEL MARCOS", photo: true },
  { num: "02", title: "Scaling Up", desc: "Prioridades, KPIs, dueños y cadencia. El sistema que le devuelve el ritmo operativo.", coach: "COACH · PAULINA LÓPEZ & MIGUEL GONZÁLEZ" },
  { num: "03", title: "Topgrading", desc: "Mejores decisiones de talento y delegación. Construye el equipo correcto.", coach: "COACH · MARITE RÍO NEVADO" },
  { num: "04", title: "Hyper Sales Growth", desc: "Motor comercial visible, predecible y que funciona sin el CEO.", coach: "COACH · CHRISTIAN TURNBULL", accent: true },
];

function Sistemas() {
  return (
    <section className="section-py section-light">
      <div className="wrap">
        <p className="kicker mb-3">LOS 4 SISTEMAS</p>
        <h2 className="h2 mb-8">Lo que vas a conocer</h2>
        <RevealGroup className="grid gap-5 md:grid-cols-2">
          {SISTEMAS.map((s) => (
            <RevealItem key={s.num}>
              <article
                className={`card-lift flex h-full flex-col rounded-3xl ${s.accent ? "text-white" : "card-on-light"} ${s.photo ? "overflow-hidden p-0" : "p-7"}`}
                style={s.accent ? { background: "var(--grad-vivid)" } : undefined}
              >
                {s.photo && (
                  <Image src="/brand/daniel-foto-4.jpg" alt="Daniel Marcos, coach de ImpactX" width={640} height={360} className="aspect-video w-full object-cover object-top" />
                )}
                <div className={s.photo ? "p-7" : ""}>
                  <span className="text-xs font-bold opacity-50">{s.num}</span>
                  <h3 className="mt-2 mb-3 text-2xl font-extrabold">{s.title}</h3>
                  <p className={`mb-5 text-[15px] ${s.accent ? "text-white/90" : "text-[var(--muted)]"}`}>{s.desc}</p>
                  <p className={`text-[11px] font-bold uppercase tracking-wider ${s.accent ? "text-white/65" : "text-[var(--dim)]"}`}>{s.coach}</p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function Evento() {
  return (
    <section className="section-py section-light">
      <div className="wrap">
        <p className="kicker mb-3">EL EVENTO</p>
        <h2 className="h2 mb-8">2 días. Virtual en vivo por Zoom. Sin replay.</h2>
        <div className="grid gap-5 md:grid-cols-3">
          <div className="card-on-dark rounded-3xl p-7 text-white" style={{ background: "var(--bg)" }}>
            <p className="kicker mb-4 text-[var(--purple-300)]">FECHA</p>
            <p className="text-2xl font-extrabold leading-tight mb-2">29 – 30<br />Agosto 2026</p>
            <p className="text-sm text-[var(--muted)]">09:00 – 14:00 CDMX</p>
          </div>
          <div className="card-on-light rounded-3xl p-7">
            <p className="kicker mb-4">FORMATO</p>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              {["Virtual en vivo por Zoom", "1 ticket = 1 sesión de entrada a Zoom", "Acceso individual, no se reenvía el link", "Sin replay anunciado", "Grupo de WhatsApp 14 días antes", "Diploma firmado por Growth Institute"].map((f) => (
                <li key={f} className="border-t border-[var(--border)] pt-2 first:border-t-0 first:pt-0">{f}</li>
              ))}
            </ul>
          </div>
          <div className="card-on-light rounded-3xl p-7">
            <p className="kicker mb-4">PARA QUIÉN</p>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              {["CEO etapa 2–3 (LATAM + USA)", "Ya tiene equipo", "Sigue siendo el cuello de botella", "Necesita claridad, no más contenido"].map((f) => (
                <li key={f} className="border-t border-[var(--border)] pt-2 first:border-t-0 first:pt-0">{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const AGENDA_DIA1 = [
  { time: "09:00", title: "Apertura · De crecer por default a escalar por diseño", desc: "Daniel Marcos · La empresa creció; el CEO sigue siendo el cuello de botella." },
  { time: "09:40", title: "La claridad es el primer sistema de control", desc: "ImpactX · Daniel Marcos · Propósito y modelo de negocio." },
  { time: "11:00", title: "Las prioridades correctas crean el ritmo escalable", desc: "Scaling Up · Paulina López & Miguel González · Tablero del CEO + Radar." },
  { time: "12:30", title: "Aplicación guiada · ¿Qué necesita ordenarse primero?", desc: "Cuello de botella, prioridad y siguiente conversación con el equipo." },
  { time: "13:15", title: "Cierre Día 1 · Síntesis y próximos pasos", desc: "Cierre operativo · 14:00" },
];
const AGENDA_DIA2 = [
  { time: "09:00", title: "Recap · De control a capacidad", desc: "Qué cambia en la lectura del CEO después de ver el sistema operativo." },
  { time: "09:30", title: "El equipo correcto multiplica la libertad del CEO", desc: "Topgrading · Marite Río Nevado · Roles críticos, talento y delegación." },
  { time: "11:00", title: "El crecimiento comienza con tu cultura de ventas", desc: "Hyper Sales Growth · Christian Turnbull · Motor comercial predecible." },
  { time: "12:30", title: "Una sola prioridad: el sistema que moverá todo lo demás", desc: "El CEO sale con una decisión clara, no con cinco tareas." },
  { time: "13:15", title: "Cierre · Síntesis y siguiente nivel", desc: "Agradecimientos y próximos pasos · Cierre operativo 14:00" },
];

function AgendaColumn({ label, items, dark }: { label: string; items: typeof AGENDA_DIA1; dark?: boolean }) {
  return (
    <div className={`rounded-3xl p-7 ${dark ? "card-on-dark text-white" : "card-on-light"}`} style={dark ? { background: "var(--bg)" } : undefined}>
      <p className="kicker mb-5 text-[var(--purple-300)]">{label}</p>
      {items.map((it, i) => (
        <div key={it.time} className={`flex gap-4 py-3 ${i > 0 ? "border-t border-[var(--border)]" : ""}`}>
          <span className="w-14 shrink-0 text-sm font-bold text-[var(--blue-300)]">{it.time}</span>
          <div>
            <p className="text-[15px] font-bold">{it.title}</p>
            <p className="text-sm text-[var(--muted)]">{it.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Agenda() {
  return (
    <section className="section-py section-light">
      <div className="wrap">
        <p className="kicker mb-3">LA AGENDA</p>
        <h2 className="h2 mb-8">Dos días. 09:00 – 14:00 CDMX.</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <AgendaColumn label="DÍA 1 · 29 AGOSTO · RECUPERAR CONTROL" items={AGENDA_DIA1} dark />
          <AgendaColumn label="DÍA 2 · 30 AGOSTO · LIBERAR Y CRECER" items={AGENDA_DIA2} />
        </div>
      </div>
    </section>
  );
}

const KIT = [
  { icon: "📊", title: "Tablero del CEO", desc: "Tu panel de control para tomar decisiones con claridad. El estado real de tu empresa en un solo lugar.", accent: true },
  { icon: "🧭", title: "Radar del CEO", desc: "Diagnóstico de los 8 ejes críticos de tu negocio. Saber dónde estás es el primer paso para tomar el control." },
  { icon: "🎯", title: "Diagnóstico ImpactX", desc: "Evalúa tu liderazgo e impacto como CEO. Resultados personalizados sobre dónde enfocarte primero." },
];

function LoQueObtienes() {
  return (
    <section className="section-py section-light">
      <div className="wrap">
        <p className="kicker mb-3">KIT DEL CEO EN CONTROL</p>
        <h2 className="h2 mb-8">Solo por asistir los 2 días, te llevas:</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {KIT.map((k) => (
            <article
              key={k.title}
              className={`rounded-3xl p-7 ${k.accent ? "text-white" : "card-on-light"}`}
              style={k.accent ? { background: "var(--grad-glow)" } : undefined}
            >
              <span className="text-3xl">{k.icon}</span>
              <h3 className="mt-4 mb-3 text-lg font-extrabold">{k.title}</h3>
              <p className={`text-sm ${k.accent ? "text-white/90" : "text-[var(--muted)]"}`}>{k.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQ = [
  { q: "¿Hay grabación si no puedo estar en vivo?", a: "No. El acceso es solo en vivo por Zoom, sin replay anunciado. Si reservás tu lugar, bloqueá esas fechas: 29 y 30 de agosto, 09:00–14:00 CDMX." },
  { q: "¿Puedo compartir mi acceso con otra persona?", a: "No. 1 ticket = 1 sesión de entrada a Zoom. El acceso es individual. Si van dos personas de tu empresa, el ticket PRO incluye 2 accesos (CEO + mano derecha)." },
  { q: "¿Es para mí?", a: "Está pensado para CEOs en etapa 2–3 (LATAM y USA) que ya tienen equipo, siguen siendo el cuello de botella y necesitan claridad — no más contenido." },
  { q: "¿Qué diferencia hay entre el ticket General y el PRO?", a: "El General incluye los 2 días en vivo, herramientas, diploma y grupo de WhatsApp. El PRO (2×1) suma un segundo acceso y una sesión adicional la semana siguiente." },
  { q: "¿Qué recibo además de las sesiones en vivo?", a: "El Kit del CEO en Control: Tablero del CEO, Radar del CEO y Diagnóstico ImpactX, más el grupo de WhatsApp y tu diploma firmado por Growth Institute." },
];

function Faq() {
  return (
    <section className="section-py section-light section-tint" id="faq">
      <div className="wrap max-w-[760px]">
        <p className="kicker mb-3">PREGUNTAS FRECUENTES</p>
        <h2 className="h2 mb-8">Antes de reservar tu lugar</h2>
        <div className="divide-y divide-[var(--border)]">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-[17px] font-bold">
                {f.q}
                <span className="ml-4 text-[var(--blue-300)] group-open:hidden">+</span>
                <span className="ml-4 hidden text-[var(--blue-300)] group-open:inline">−</span>
              </summary>
              <p className="mt-3 text-[15px] text-[var(--muted)]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 text-center" style={{ background: "var(--bg)" }}>
      <Image src="/brand/logo-gi-blanco.png" alt="Growth Institute" width={120} height={20} className="mx-auto mb-3 h-5 w-auto opacity-80" />
      <p className="text-sm text-[var(--dim)]">CEO en Control · Agosto 2026</p>
    </footer>
  );
}
