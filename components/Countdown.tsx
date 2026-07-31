"use client";

import { useEffect, useState } from "react";

function diff(targetISO: string) {
  const target = new Date(targetISO).getTime();
  const now = Date.now();
  const ms = Math.max(0, target - now);
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1_000) % 60),
    done: ms <= 0,
  };
}

/** Cuenta regresiva en vivo hasta targetISO. Días · horas · minutos · segundos. */
export function Countdown({ targetISO }: { targetISO: string }) {
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setT(diff(targetISO));
    const id = setInterval(() => setT(diff(targetISO)), 1000);
    return () => clearInterval(id);
  }, [targetISO]);

  if (!t) return null;
  if (t.done) return <span className="text-sm text-[var(--soft)]">El evento ya está en vivo</span>;

  const cells = [
    { v: t.days, l: "días" },
    { v: t.hours, l: "hs" },
    { v: t.minutes, l: "min" },
    { v: t.seconds, l: "seg" },
  ];

  return (
    <div className="flex gap-3">
      {cells.map((c) => (
        <div key={c.l} className="flex flex-col items-center rounded-xl border border-[var(--border-md)] bg-white/[.03] px-3 py-2 min-w-[58px]">
          <span className="text-xl font-extrabold tabular-nums leading-none">{String(c.v).padStart(2, "0")}</span>
          <span className="text-[10px] uppercase tracking-widest text-[var(--muted)] mt-1">{c.l}</span>
        </div>
      ))}
    </div>
  );
}
