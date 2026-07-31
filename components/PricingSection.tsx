"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { countries, flagEmoji } from "@/lib/countries";
import { PLAN_FEATURES, PRICE_TIERS, getActiveTierIndex, type PlanId } from "@/lib/eventos";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Placeholder — Barbara conecta el link real del grupo cuando esté listo.
const WHATSAPP_GROUP_URL = "#";
const QUIZ_SECONDS = 60;
const WHATSAPP_SECONDS = 20;

const QUIZ = [
  {
    key: "perfil",
    label: "Fase 1 · Tu rol",
    q: "¿Cuál describe mejor tu rol hoy?",
    opts: [
      { id: "ceo", emoji: "👔", label: "CEO / Dueño de empresa" },
      { id: "dir", emoji: "🤝", label: "Director / mano derecha del CEO" },
      { id: "emp", emoji: "🚀", label: "Emprendedor construyendo su empresa" },
      { id: "area", emoji: "🧭", label: "Líder de un área o equipo" },
    ],
  },
  {
    key: "reto",
    label: "Fase 2 · Tu mayor freno",
    q: "¿Qué es lo que más te frena para escalar?",
    opts: [
      { id: "excel", emoji: "📋", label: "Llevo todo en Excel y me entero tarde" },
      { id: "intu", emoji: "🎲", label: "Decido por intuición, no por datos" },
      { id: "equipo", emoji: "🧩", label: "Mi equipo no está alineado en lo importante" },
      { id: "control", emoji: "🔥", label: "Crezco sin estructura, fuera de control" },
    ],
  },
  {
    key: "etapa",
    label: "Fase 3 · Tu empresa",
    q: "¿En qué etapa está tu empresa?",
    opts: [
      { id: "grande", emoji: "🏢", label: "Facturo +$1M/año o equipo de +20" },
      { id: "crec", emoji: "📈", label: "En crecimiento ($100k–$1M)" },
      { id: "inicio", emoji: "🌱", label: "Apenas arrancando" },
      { id: "na", emoji: "•", label: "Prefiero no decir" },
    ],
  },
] as const;

const PERFIL_AP: Record<string, string> = {
  ceo: "Como CEO o dueño, en CEO en Control vas a armar tu propio mapa con los 4 sistemas — no más consejos sueltos. ImpactX te da la dirección; Scaling Up, Topgrading y Hyper Sales Growth te sacan de la operación día a día.",
  dir: "Como mano derecha del CEO, vas a salir hablando el mismo idioma que tu CEO: Scaling Up para las prioridades y KPIs, y Topgrading para las decisiones de equipo que hoy dependen de la intuición.",
  emp: "Estás construyendo tu empresa, y el bootcamp te da el orden antes de necesitarlo: ImpactX para el modelo de negocio, Hyper Sales Growth para no depender de ti para vender.",
  area: "Lideras un equipo o área, y en el bootcamp te llevás Scaling Up: el sistema de prioridades, KPIs y cadencia que le da a tu equipo un lenguaje común.",
};
const RETO_PROB: Record<string, string> = {
  excel: "Llevar todo en Excel es justo lo que Scaling Up resuelve: te vas con el Tablero del CEO y el Radar, un solo lugar para ver el estado real de tu empresa.",
  intu: "Decidir por intuición se corrige con Topgrading: vas a salir sabiendo tomar mejores decisiones de talento y delegación, no adivinando.",
  equipo: "Un equipo desalineado es exactamente el problema que ataca Scaling Up: prioridades, dueños y cadencia de reuniones para que todos remen para el mismo lado.",
  control: "Crecer sin estructura se ordena con los 4 sistemas juntos: ImpactX te da el rumbo; Scaling Up, Topgrading y Hyper Sales Growth te dan el control operativo, comercial y de equipo.",
};
const ETAPA_LINE: Record<string, string> = {
  grande: "Con tu tamaño, el bootcamp te sirve para instalar los sistemas antes de que el caos cueste más caro — Scaling Up y Topgrading son justo para esta etapa.",
  crec: "Estás en la etapa exacta para la que se diseñó CEO en Control: cuando el crecimiento empieza a romper la estructura que tenías.",
  inicio: "Arrancar con los 4 sistemas desde ahora te ahorra años de reconstruir procesos más adelante.",
  na: "",
};

type Step = "pricing" | "form" | "checkout" | "quiz" | "done";

export function PricingSection() {
  const [step, setStep] = useState<Step>("pricing");
  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("MX");
  const [phone, setPhone] = useState("");
  const [picked, setPicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [phase, setPhase] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [skipped, setSkipped] = useState(false);
  const [quizTimer, setQuizTimer] = useState(QUIZ_SECONDS);

  const flowRef = useRef<HTMLDivElement>(null);
  const now = useMemo(() => new Date(), []);
  const tierIdx = getActiveTierIndex(now);
  const tier = PRICE_TIERS[tierIdx];

  // Geo-IP — completa el país automáticamente si el visitante no lo tocó
  useEffect(() => {
    if (picked) return;
    let cancel = false;
    (async () => {
      try {
        const r = await fetch("/api/geo").then((x) => x.json()).catch(() => null);
        const iso = r?.country ? String(r.country).toUpperCase() : null;
        if (!cancel && iso && countries.some((c) => c.code === iso)) setCountryCode(iso);
      } catch {}
    })();
    return () => { cancel = true; };
  }, [picked]);

  // Countdown del quiz → si llega a 0, salta a "done"
  useEffect(() => {
    if (step !== "quiz") return;
    if (quizTimer <= 0) { skipQuiz(); return; }
    const t = setTimeout(() => setQuizTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, quizTimer]);

  function choosePlan(id: PlanId) {
    setSelectedPlan(id);
    setStep("form");
    setTimeout(() => flowRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  const selectedCountry = countries.find((c) => c.code === countryCode);
  const prefix = selectedCountry?.phoneCode || "+";
  const valid =
    name.trim().length >= 4 &&
    name.trim().includes(" ") &&
    emailRe.test(email.trim()) &&
    phone.replace(/\D/g, "").length >= 6;

  const firstName = name.trim().split(" ")[0];

  async function submitForm() {
    setErr(null);
    if (!valid) { setErr("Escribí tu nombre y apellido, un email y un teléfono válidos."); return; }
    setLoading(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: `${prefix} ${phone.trim()}`,
          country: selectedCountry?.name,
          plan: selectedPlan,
        }),
      });
    } catch {}
    setLoading(false);
    setStep("checkout");
  }

  async function goToPayment() {
    setLoading(true);
    try {
      await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: selectedPlan, email: email.trim().toLowerCase(), name: name.trim() }),
      });
    } catch {}
    setLoading(false);
    setStep("quiz");
    setPhase(0);
    setQuizTimer(QUIZ_SECONDS);
  }

  function pickAnswer(optId: string) {
    const key = QUIZ[phase].key;
    const next = { ...answers, [key]: optId };
    setAnswers(next);
    if (phase < QUIZ.length - 1) {
      setPhase((p) => p + 1);
    } else {
      setStep("done");
    }
  }

  function skipQuiz() {
    setSkipped(true);
    setStep("done");
  }

  const planPriceUSD = selectedPlan === "pro" ? tier.proUSD : tier.generalUSD;
  const planInfo = selectedPlan ? PLAN_FEATURES[selectedPlan] : null;
  const lastTier = PRICE_TIERS[PRICE_TIERS.length - 1];

  return (
    <section id="comprar" className="section-py">
      <div className="wrap">
        <p className="kicker mb-3">LA OFERTA</p>
        <h2 className="h2 mb-8">Dos tickets. Sin VIP.</h2>

        {/* FASE 1 — Pricing */}
        <div className="grid gap-6 md:grid-cols-2 mb-10">
          {(Object.keys(PLAN_FEATURES) as PlanId[]).map((id) => {
            const info = PLAN_FEATURES[id];
            const usd = id === "pro" ? tier.proUSD : tier.generalUSD;
            const fullUsd = id === "pro" ? lastTier.proUSD : lastTier.generalUSD;
            const isSelected = selectedPlan === id && step !== "pricing";
            return (
              <div
                key={id}
                onClick={() => choosePlan(id)}
                className={`plan-card relative cursor-pointer ${id === "pro" ? "plan-card--pro" : "plan-card--general"} ${isSelected ? "is-selected" : ""}`}
              >
                {info.featured && (
                  <span className="absolute -top-3 right-6 rounded-full bg-[var(--purple-500)] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                    Mejor valor
                  </span>
                )}
                {isSelected && (
                  <span className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--ice)] text-[13px] font-black text-[#16181E]">✓</span>
                )}
                {id === "pro" ? (
                  <div className="mb-3 flex items-center gap-2.5">
                    <p className="kicker !mb-0">PRO</p>
                    <span
                      className="rounded-full px-3 py-1 text-sm font-extrabold uppercase tracking-wide text-[#5c3a00]"
                      style={{ background: "linear-gradient(135deg,#FFD65A,var(--warning))" }}
                    >
                      2×1
                    </span>
                  </div>
                ) : (
                  <p className="kicker mb-3">{info.name}</p>
                )}
                {tier.label !== lastTier.label && (
                  <span className="mb-2 inline-block rounded-full bg-[var(--warning)]/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--warning)]">
                    Oferta {tier.label}
                  </span>
                )}
                <div className="flex items-baseline gap-3">
                  {fullUsd !== usd && (
                    <span className="text-xl font-bold text-[var(--dim)] line-through">${fullUsd}</span>
                  )}
                  <p className="text-[44px] font-extrabold leading-none" style={{ color: "var(--warning)" }}>
                    ${usd}<span className="ml-1 text-base font-bold opacity-70">USD</span>
                  </p>
                </div>
                <p className="text-xs font-semibold text-[var(--warning)] mb-5 mt-1">Oferta por tiempo limitado</p>
                <ul className="space-y-2 text-sm mb-6">
                  {info.features.map((f) => (
                    <li key={f} className="flex gap-2 border-t border-[var(--border)] pt-2 first:border-t-0 first:pt-0">
                      <span className="text-[var(--success)] font-bold">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={(e) => { e.stopPropagation(); choosePlan(id); }}
                  className={`btn w-full ${info.featured ? "btn-primary" : "btn-outline"}`}
                >
                  Elegir {info.name} <span className="arrow">→</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* FASES 2-4 — Formulario / Checkout / Quiz / Confirmación */}
        <div ref={flowRef} />
        <AnimatePresence mode="wait">
          {step !== "pricing" && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className={step === "checkout" ? "stripe-checkout mx-auto" : "glass mx-auto rounded-3xl p-8 md:p-10"}
              style={{ maxWidth: step === "checkout" ? 900 : step === "done" && !skipped ? 720 : 560 }}
            >
              {step === "form" && (
                <>
                  <p className="kicker mb-2">Ticket {planInfo?.name}</p>
                  <h3 className="text-2xl font-extrabold mb-1">Completá tus datos</h3>
                  <p className="text-sm text-[var(--muted)] mb-6">Un minuto y quedás en la lista. Después vas al pago.</p>

                  <label className="field-label">Nombre y apellido</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Ana Torres" maxLength={80} className="field-input mb-4" autoComplete="name" />

                  <label className="field-label">Email</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="tucorreo@empresa.com" maxLength={120} className="field-input mb-4" autoComplete="email" inputMode="email" />

                  <label className="field-label">Teléfono (WhatsApp)</label>
                  <div className="flex gap-2">
                    <div className="relative shrink-0">
                      <select
                        value={countryCode}
                        onChange={(e) => { setCountryCode(e.target.value); setPicked(true); }}
                        aria-label="País"
                        className="field-input w-[134px] cursor-pointer appearance-none pr-7 font-semibold text-sm"
                      >
                        {countries.map((c) => (
                          <option key={c.code} value={c.code} className="bg-[var(--bg-2)] text-white">
                            {flagEmoji(c.code)} {c.code} {c.phoneCode}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-[var(--muted)]">▾</span>
                    </div>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^\d\s]/g, ""))}
                      placeholder={`${prefix} 55 1234 5678`}
                      inputMode="tel"
                      maxLength={16}
                      className="field-input flex-1"
                      autoComplete="tel-national"
                    />
                  </div>
                  {err && <p className="mt-3 text-sm text-[var(--danger)]">{err}</p>}
                  <button onClick={submitForm} disabled={loading} className="btn btn-primary w-full mt-5">
                    {loading ? "Guardando…" : <>Continuar al pago <span className="arrow">→</span></>}
                  </button>
                  <button onClick={() => setStep("pricing")} className="mt-3 block text-xs text-[var(--muted)] hover:text-white">← Elegir otro ticket</button>
                </>
              )}

              {step === "checkout" && planInfo && (
                <div className="grid md:grid-cols-2">
                  {/* Columna izquierda — resumen del pedido */}
                  <div className="border-b border-[rgba(8,16,34,.08)] p-8 md:border-b-0 md:border-r">
                    <button onClick={() => setStep("form")} className="mb-6 text-[#16181E]/50 hover:text-[#16181E]">←</button>
                    <div className="mb-6 flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full text-white text-xs font-black" style={{ background: "var(--blue-500)" }}>G</span>
                      <span className="text-sm font-semibold text-[#16181E]">Growth Institute</span>
                      <span className="ml-2 rounded bg-[var(--warning)]/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#8a5a00]">Modo simulación</span>
                    </div>
                    <p className="text-sm text-[#16181E]/60 mb-1">Pagar Growth Institute</p>
                    <p className="text-4xl font-extrabold text-[#16181E] mb-6">${planPriceUSD}.00</p>

                    <div className="flex items-start gap-3 border-t border-[rgba(8,16,34,.08)] py-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-lg" style={{ background: "var(--grad-vivid)" }}>🎟️</div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#16181E]">Ticket {planInfo.name}</p>
                        <p className="text-xs text-[#16181E]/50">CEO en Control · 29–30 Ago 2026</p>
                      </div>
                      <p className="text-sm font-semibold text-[#16181E]">${planPriceUSD}.00</p>
                    </div>

                    <div className="space-y-2 border-t border-[rgba(8,16,34,.08)] pt-4 text-sm">
                      <div className="flex justify-between text-[#16181E]/60"><span>Subtotal</span><span>${planPriceUSD}.00</span></div>
                    </div>
                    <div className="flex justify-between border-t border-[rgba(8,16,34,.08)] mt-3 pt-3 text-sm font-bold text-[#16181E]">
                      <span>Total</span><span>${planPriceUSD}.00</span>
                    </div>
                  </div>

                  {/* Columna derecha — formulario de pago */}
                  <div className="p-8">
                    <label className="stripe-label">Email</label>
                    <input value={email} disabled className="stripe-input mb-4 opacity-70" />

                    <label className="stripe-label">Información de la tarjeta</label>
                    <div className="stripe-card-group mb-4">
                      <div className="flex items-center justify-between border-b border-[rgba(8,16,34,.1)] px-3.5 py-3">
                        <input placeholder="1234 1234 1234 1234" disabled className="w-full bg-transparent text-sm text-[#16181E] placeholder:text-[#16181E]/35 outline-none" />
                        <div className="flex gap-1 shrink-0">
                          <span className="brand-chip" style={{ background: "#1A1F71" }}>VISA</span>
                          <span className="brand-chip" style={{ background: "#EB001B" }}>MC</span>
                          <span className="brand-chip" style={{ background: "#2E77BC" }}>AMEX</span>
                        </div>
                      </div>
                      <div className="flex">
                        <input placeholder="MM / AA" disabled className="w-1/2 border-r border-[rgba(8,16,34,.1)] bg-transparent px-3.5 py-3 text-sm text-[#16181E] placeholder:text-[#16181E]/35 outline-none" />
                        <input placeholder="CVC" disabled className="w-1/2 bg-transparent px-3.5 py-3 text-sm text-[#16181E] placeholder:text-[#16181E]/35 outline-none" />
                      </div>
                    </div>

                    <label className="stripe-label">Nombre en la tarjeta</label>
                    <input value={name} disabled className="stripe-input mb-6 opacity-70" />

                    <motion.button
                      onClick={goToPayment}
                      disabled={loading}
                      animate={{ boxShadow: ["0 0 0 0 rgba(31,79,216,.35)", "0 0 0 10px rgba(31,79,216,0)"] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                      className="btn btn-primary w-full"
                    >
                      {loading ? "Procesando…" : `Pagar $${planPriceUSD}.00`}
                    </motion.button>
                    <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#16181E]/45">🔒 Pago seguro y encriptado</p>
                    <p className="mt-1 text-center text-[11px] text-[#16181E]/35">Vista previa — todavía no está conectado un cobro real</p>
                  </div>
                </div>
              )}

              {step === "quiz" && (
                <>
                  <div className="mb-8 border-b border-white/10 pb-7 text-center">
                    <div className="mx-auto mb-3 flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[var(--success)]/45 bg-[var(--success)]/15 text-2xl">✓</div>
                    <h3 className="text-2xl font-extrabold leading-tight">
                      ¡Compra confirmada{firstName ? `, ${firstName}` : ""}!
                    </h3>
                    {planInfo && (
                      <p className="mt-2 text-sm text-[var(--muted)]">
                        Ticket {planInfo.name} · ${planPriceUSD} USD · CEO en Control, 29–30 agosto 2026
                      </p>
                    )}
                    <p className="mt-2 text-sm text-[var(--soft)]">
                      Te enviamos un email a <b>{email.trim().toLowerCase()}</b> con toda la información de acceso.
                    </p>
                  </div>

                  <div className="text-center mb-6">
                    <p className="kicker mb-2">Mientras tanto</p>
                    <h3 className="text-2xl font-extrabold leading-tight">En 3 clics personalizamos tu experiencia</h3>
                  </div>
                  <div className="flex gap-1.5 mb-6">
                    {QUIZ.map((_, i) => (
                      <div key={i} className="h-1.5 flex-1 rounded-full" style={{ background: i <= phase ? "var(--grad-glow)" : "rgba(255,255,255,.1)" }} />
                    ))}
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div key={phase} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
                      <p className="kicker mb-2">{QUIZ[phase].label}</p>
                      <h4 className="text-xl font-extrabold mb-4">{QUIZ[phase].q}</h4>
                      <div className="flex flex-col gap-2.5">
                        {QUIZ[phase].opts.map((o) => (
                          <button key={o.id} onClick={() => pickAnswer(o.id)} className="quiz-option">
                            <span className="text-lg">{o.emoji}</span>{o.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  {phase > 0 && (
                    <button onClick={() => setPhase((p) => p - 1)} className="mt-4 block text-xs text-[var(--muted)] hover:text-white">← Atrás</button>
                  )}
                  <div className="mt-5 rounded-2xl border-[1.5px] border-[var(--success)]/45 bg-gradient-to-br from-[var(--success)]/15 to-[var(--success)]/5 p-5 text-center">
                    <p className="mb-2.5 text-sm font-bold text-[var(--success)]">🚀 Únete al grupo con otros CEOs que también están escalando</p>
                    <p className="mb-2 text-xs text-[var(--muted)]">
                      Continuás en <b className="tabular-nums text-[var(--success)]">{Math.floor(quizTimer / 60)}:{String(quizTimer % 60).padStart(2, "0")}</b>
                    </p>
                    <div className="mb-3.5 h-1 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full bg-[var(--success)] transition-[width] duration-1000" style={{ width: `${(quizTimer / QUIZ_SECONDS) * 100}%` }} />
                    </div>
                    <button onClick={skipQuiz} className="btn btn-success w-full">Saltar y ver mi confirmación →</button>
                  </div>
                </>
              )}

              {step === "done" && (
                <>
                  {!skipped ? (
                    <div className="mx-auto mb-8 max-w-[640px] text-center">
                      <p className="kicker mb-3">Análisis para ti</p>
                      <p className="mb-3 text-lg font-bold">{PERFIL_AP[answers.perfil] ?? PERFIL_AP.area}</p>
                      <p className="mb-3 text-[15px] text-[var(--soft)]">{RETO_PROB[answers.reto] ?? ""}</p>
                      {ETAPA_LINE[answers.etapa] && <p className="text-[15px] text-[var(--soft)]">{ETAPA_LINE[answers.etapa]}</p>}
                    </div>
                  ) : (
                    <div className="mb-6 text-center">
                      <h3 className="text-2xl font-extrabold leading-tight">¡Ya casi{firstName ? `, ${firstName}` : ""}!</h3>
                      <p className="mt-2 text-sm text-[var(--muted)]">Unite al grupo de WhatsApp para no perderte nada.</p>
                    </div>
                  )}

                  <WhatsAppRedirect />
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function WhatsAppRedirect() {
  const [s, setS] = useState(WHATSAPP_SECONDS);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (opened) return;
    if (s <= 0) {
      if (WHATSAPP_GROUP_URL !== "#") { try { window.location.assign(WHATSAPP_GROUP_URL); } catch {} }
      setOpened(true);
      return;
    }
    const t = setTimeout(() => setS((x) => x - 1), 1000);
    return () => clearTimeout(t);
  }, [s, opened]);

  const pct = Math.max(0, Math.min(100, (s / WHATSAPP_SECONDS) * 100));

  return (
    <div className="rounded-2xl border-[1.5px] border-[var(--success)]/50 bg-gradient-to-br from-[var(--success)]/12 to-[var(--success)]/4 p-5 text-center">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[var(--success)]">Grupo de WhatsApp del bootcamp</p>
      {!opened && (
        <>
          <p className="mb-1 text-[10px] uppercase tracking-wider text-[var(--muted)]">Te llevamos al grupo en</p>
          <p className="mb-3 text-4xl font-extrabold tabular-nums text-[var(--success)]">
            {Math.floor(s / 60)}:{String(s % 60).padStart(2, "0")}
          </p>
          <div className="mb-3.5 h-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-[var(--success)] transition-[width] duration-1000" style={{ width: `${pct}%` }} />
          </div>
        </>
      )}
      <a
        href={WHATSAPP_GROUP_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setOpened(true)}
        className="btn btn-success w-full"
      >
        Unirme al grupo ahora →
      </a>
      {WHATSAPP_GROUP_URL === "#" && (
        <p className="mt-2 text-[10px] text-[var(--dim)]">Placeholder — acá va el link real del grupo cuando lo tengas.</p>
      )}
    </div>
  );
}
