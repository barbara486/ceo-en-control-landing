const ITEMS = [
  { label: "Proveedores", x: 310, y: 110 },
  { label: "Clientes clave", x: 690, y: 110 },
  { label: "Aprobaciones internas", x: 140, y: 300 },
  { label: "Precios y descuentos", x: 860, y: 300 },
  { label: "Prioridades del equipo", x: 310, y: 490 },
  { label: "Contrataciones", x: 690, y: 490 },
];

const CENTER = { x: 500, y: 300 };
const RADIUS = 90;
const VB_W = 1000;
const VB_H = 600;

function lineEnd(item: { x: number; y: number }) {
  const dx = item.x - CENTER.x;
  const dy = item.y - CENTER.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / dist;
  const uy = dy / dist;
  return { x: CENTER.x + ux * RADIUS, y: CENTER.y + uy * RADIUS };
}

export function BottleneckDiagram() {
  return (
    <div className="mx-auto mb-6 max-w-[720px]">
      <div className="relative w-full" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
        <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="bn-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="rgba(214,64,69,.45)" />
            </marker>
          </defs>
          {ITEMS.map((it) => {
            const end = lineEnd(it);
            return (
              <line
                key={it.label}
                x1={it.x}
                y1={it.y}
                x2={end.x}
                y2={end.y}
                stroke="rgba(214,64,69,.35)"
                strokeWidth={2.5}
                markerEnd="url(#bn-arrow)"
              />
            );
          })}
        </svg>

        {ITEMS.map((it) => (
          <div
            key={it.label}
            className="card-on-light absolute flex items-center justify-center rounded-xl text-center font-semibold leading-tight"
            style={{
              left: `${(it.x / VB_W) * 100}%`,
              top: `${(it.y / VB_H) * 100}%`,
              width: "20%",
              minWidth: 0,
              padding: "clamp(5px,1.6vw,10px) clamp(6px,2.2vw,14px)",
              fontSize: "clamp(9px, 2.5vw, 13px)",
              transform: "translate(-50%, -50%)",
            }}
          >
            {it.label}
          </div>
        ))}

        <div
          className="absolute flex flex-col items-center justify-center rounded-full text-center text-white"
          style={{
            left: `${(CENTER.x / VB_W) * 100}%`,
            top: `${(CENTER.y / VB_H) * 100}%`,
            width: `${((RADIUS * 2) / VB_W) * 100}%`,
            aspectRatio: "1 / 1",
            minWidth: 0,
            padding: "4%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle at 35% 30%, #e3676b, var(--danger))",
            boxShadow: "0 0 40px rgba(214,64,69,.45)",
          }}
        >
          <span className="block w-full font-extrabold" style={{ fontSize: "clamp(13px, 4.2vw, 20px)" }}>TÚ</span>
          <span
            className="mt-0.5 block w-full font-bold uppercase leading-tight opacity-90"
            style={{ fontSize: "clamp(6.5px, 2vw, 10px)", letterSpacing: "0.02em" }}
          >
            Cuello de botella
          </span>
        </div>
      </div>

      <div className="mx-auto mt-2 w-fit text-2xl leading-none" style={{ color: "var(--danger)" }}>↓</div>

      <div
        className="mx-auto mt-2 max-w-[480px] rounded-xl px-6 py-4 text-center text-sm font-semibold"
        style={{ background: "rgba(214,64,69,.06)", border: "1px solid rgba(214,64,69,.25)", color: "var(--danger)" }}
      >
        Menos tiempo. Menos foco. Menos crecimiento real — cada semana que pasa.
      </div>
    </div>
  );
}
