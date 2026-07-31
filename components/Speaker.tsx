import Image from "next/image";

export function Speaker() {
  return (
    <section className="section-py section-light">
      <div className="wrap">
        <p className="kicker mb-3">TU COACH DE APERTURA Y CIERRE</p>
        <h2 className="h2 mb-8">Daniel Marcos</h2>

        <div className="grid gap-8 md:grid-cols-[280px_1fr] items-center rounded-3xl card-on-light p-8 md:p-10">
          <div className="mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-2xl">
            <Image
              src="/brand/daniel-foto-1.jpg"
              alt="Daniel Marcos, cofundador de Growth Institute"
              width={420}
              height={560}
              className="h-full w-full object-cover object-top"
            />
          </div>
          <div>
            <p className="lead mb-4">
              Cofundador de Growth Institute y creador de ImpactX. Durante más de una década ha ayudado a
              cientos de CEOs en LATAM y USA a salir de la operación diaria y construir empresas que
              funcionan sin depender de ellos.
            </p>
            <p className="text-[17px] italic text-[var(--soft)]">
              &ldquo;Tu empresa no necesita más contenido. Necesita que vos salgas del cuello de botella.&rdquo;
            </p>
            <p className="mt-6 text-xs font-bold uppercase tracking-widest text-[var(--blue-300)]">
              Coach de ImpactX · Apertura y cierre del bootcamp
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
