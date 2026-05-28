import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const PHOTO_IMG =
  "https://cdn.poehali.dev/projects/509b3616-eefd-4714-a649-aa305bef5803/bucket/3b1a67dc-5617-4360-9712-04dcf8a99caf.jpeg";

/* ── Scroll animation hook ── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, vis } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(36px)",
        transition: `opacity .75s ease ${delay}ms, transform .75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const whoCards = [
  ["Мамам", "Чтобы лучше понимать характер ребёнка, его сильные стороны, таланты и вектор развития."],
  ["Экспертам мягких ниш", "Психологам, коучам, наставникам — которым нужен ещё один точный инструмент."],
  ["Предпринимателям", "Чтобы лучше чувствовать партнёрство, совместимость и особенности команды."],
  ["Тем, кто хочет разобраться в себе", "Чтобы увидеть сильные стороны и понять повторяющиеся сценарии."],
];

const getCards = [
  ["Понимание системы", "Научитесь читать карту жизненного пути и делать базовые расчёты."],
  ["Навык анализа", "Начнёте видеть предназначение, сильные стороны и причины напряжения в отношениях."],
  ["Прогнозирование", "Сможете делать прогнозы на день, месяц и год."],
  ["Практический инструмент", "Начнёте лучше понимать клиентов, близких, детей и партнёров."],
  ["Профессиональное расширение", "Сможете встроить нумерологию в свою практику."],
  ["Новый вектор", "Для кого-то — новая опора, для кого-то — направление для монетизации."],
];

const programFeatures = [
  ["Globe", "Онлайн-формат", "Можно учиться из любой точки мира."],
  ["Play", "Видео-уроки", "К материалам можно возвращаться столько раз, сколько нужно."],
  ["Users", "Практика и разборы", "Знания переходят в навык."],
];

export default function Index() {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "var(--c-bg)", color: "var(--c-text)", fontFamily: "'Manrope', sans-serif" }}
    >

      {/* NAV */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4"
        style={{ backdropFilter: "blur(20px)", background: "rgba(23,19,29,0.75)", borderBottom: "1px solid rgba(201,164,106,0.1)" }}
      >
        <div>
          <div className="font-display text-lg font-semibold" style={{ color: "var(--c-text)", letterSpacing: ".04em" }}>
            Екатерина Усова
          </div>
          <div className="text-xs" style={{ color: "var(--c-muted)" }}>Практический курс по нумерологии</div>
        </div>
        <a href="#program" className="btn-gold hidden md:inline-flex" style={{ padding: ".6rem 1.4rem", fontSize: ".85rem" }}>
          Посмотреть программу
        </a>
      </header>

      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ paddingTop: "80px" }}
      >
        {/* Orbs */}
        <div className="orb w-[600px] h-[600px] top-0 left-0 -translate-x-1/3 -translate-y-1/4" style={{ background: "rgba(200,168,255,0.1)" }} />
        <div className="orb w-[400px] h-[400px] bottom-0 left-1/4" style={{ background: "rgba(201,164,106,0.08)" }} />

        {/* Decorative stars */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="star absolute rounded-full"
              style={{
                width: i % 3 === 0 ? "3px" : "2px",
                height: i % 3 === 0 ? "3px" : "2px",
                background: i % 2 === 0 ? "var(--c-accent)" : "var(--c-accent2)",
                top: `${5 + (i * 19) % 88}%`,
                left: `${3 + (i * 27) % 55}%`,
                animationDelay: `${i * 0.25}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-0 items-center min-h-screen">

          {/* LEFT — text */}
          <div className="flex flex-col justify-center py-16 md:py-24 md:pr-10">
            <div
              className="anim-fade-up inline-flex self-start items-center gap-2 px-4 py-1.5 rounded-full mb-7 text-xs font-semibold uppercase tracking-widest"
              style={{ border: "1px solid rgba(201,164,106,0.3)", background: "rgba(201,164,106,0.08)", color: "var(--c-accent)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--c-accent)" }} />
              Нумерология как инструмент
            </div>

            <h1
              className="anim-fade-up d100 font-display font-medium mb-6"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4.5rem)", lineHeight: 1.07, letterSpacing: "-.01em" }}
            >
              Практический<br />
              <span className="text-gold-shimmer italic">онлайн-курс</span>
              <br />
              <span style={{ color: "var(--c-text)" }}>с Екатериной Усовой</span>
            </h1>

            <p className="anim-fade-up d200 text-base leading-relaxed mb-8 max-w-lg" style={{ color: "var(--c-muted)" }}>
              Для самопознания, работы с людьми и в качестве дополнительного профессионального инструмента.
              Нумерология — инструмент анализа личности, жизненных циклов и взаимодействия людей через дату рождения.
            </p>

            <div className="anim-fade-up d300 flex flex-wrap gap-3 mb-10">
              <a href="#program" className="btn-gold">
                Посмотреть программу курса
                <Icon name="ArrowRight" size={16} />
              </a>
              <a href="#about-course" className="btn-ghost">О курсе</a>
            </div>

            {/* Facts */}
            <div className="anim-fade-up d400 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { t: "2 месяца", d: "Пошаговое обучение от основ к практике." },
                { t: "Онлайн", d: "Видео-уроки, разборы и сопровождение." },
                { t: "Для жизни и работы", d: "Знания, которые применяются сразу." },
              ].map((f, i) => (
                <div key={i} className="card-base p-4">
                  <div className="font-display text-lg font-semibold mb-0.5" style={{ color: "var(--c-accent)" }}>{f.t}</div>
                  <div className="text-xs leading-relaxed" style={{ color: "var(--c-muted)" }}>{f.d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — photo */}
          <div className="hidden md:flex relative items-end justify-center self-stretch">
            {/* Glow behind photo */}
            <div
              className="absolute inset-x-0 bottom-0 top-[10%]"
              style={{ background: "radial-gradient(ellipse 80% 70% at 50% 90%, rgba(200,168,255,0.18) 0%, transparent 70%)" }}
            />
            {/* Vertical golden line left edge */}
            <div
              className="absolute left-0 top-[15%] bottom-0 w-px"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(201,164,106,0.3) 30%, rgba(201,164,106,0.15) 80%, transparent)" }}
            />
            {/* Photo */}
            <div className="relative w-full h-full flex items-end justify-center" style={{ paddingTop: "80px" }}>
              <img
                src={PHOTO_IMG}
                alt="Екатерина Усова"
                className="anim-fade-up d200 relative z-10 w-full object-cover object-top"
                style={{
                  height: "calc(100vh - 80px)",
                  maxHeight: "860px",
                  objectPosition: "center top",
                  maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 78%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 78%, transparent 100%)",
                }}
              />
              {/* Badge over photo */}
              <div
                className="absolute bottom-16 left-4 z-20"
                style={{ background: "rgba(23,19,29,0.75)", backdropFilter: "blur(14px)", border: "1px solid rgba(201,164,106,0.25)", borderRadius: "1rem", padding: ".875rem 1.25rem", maxWidth: "240px" }}
              >
                <div className="text-sm font-semibold mb-0.5" style={{ color: "var(--c-accent)" }}>Психолог-практик</div>
                <div className="text-xs leading-relaxed" style={{ color: "var(--c-muted)" }}>Нумеролог · Астропсихолог</div>
              </div>
            </div>
          </div>

          {/* Mobile photo strip */}
          <div className="md:hidden relative w-full mt-6 mb-2 overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(201,164,106,0.15)" }}>
            <img
              src={PHOTO_IMG}
              alt="Екатерина Усова"
              className="w-full object-cover object-top"
              style={{ height: "340px" }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(23,19,29,0.8) 0%, transparent 50%)" }} />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-sm font-semibold" style={{ color: "var(--c-accent)" }}>Психолог-практик · Нумеролог · Астропсихолог</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT COURSE */}
      <section id="about-course" className="py-24 px-6" style={{ background: "linear-gradient(180deg, var(--c-bg) 0%, #1a1426 50%, var(--c-bg) 100%)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="ornament mb-14"><span className="text-xs uppercase tracking-widest px-3">О курсе</span></div>
          <div className="grid md:grid-cols-2 gap-14 items-start">
            <Reveal>
              <h2 className="font-display text-4xl md:text-5xl font-medium mb-6" style={{ lineHeight: 1.15 }}>
                Иногда нам не хватает не мотивации,{" "}
                <span className="italic" style={{ color: "var(--c-accent2)" }}>а понимания себя</span>
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "var(--c-muted)" }}>
                Когда одни и те же ситуации повторяются, дело часто не в слабости характера. Чаще всего человеку просто не хватает системы, через которую можно понять свои реакции, выборы и отношения.
              </p>
              <ul className="check-list">
                {[
                  "Почему с одними людьми легко, а с другими всё время напряжение.",
                  "Почему ребёнок ведёт себя «не так», а партнёр словно не слышит вас.",
                  "Почему в жизни снова и снова возвращаются похожие сценарии.",
                  "Почему вроде бы стараетесь, а ясности о себе всё равно не хватает.",
                ].map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </Reveal>

            <Reveal delay={150}>
              <div className="card-base p-8">
                <h3 className="font-display text-2xl font-semibold mb-4" style={{ color: "var(--c-accent)" }}>
                  Как я работаю с этим инструментом
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--c-muted)" }}>
                  Я смотрю на дату рождения не как на магию, а как на исходные данные. Через них можно анализировать личность, жизненные циклы и взаимодействие человека с другими людьми.
                </p>
                <ul className="check-list">
                  {[
                    "Помогает видеть сильные стороны и внутренние задачи человека.",
                    "Даёт понятный язык для разговора о ребёнке, близких, клиентах и команде.",
                    "Позволяет замечать закономерности там, где раньше всё казалось хаосом.",
                    "Становится дополнительным инструментом в профессии и жизни.",
                  ].map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHO */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-14">
            <div className="ornament mb-6"><span className="text-xs uppercase tracking-widest px-3">Аудитория</span></div>
            <h2 className="font-display text-4xl md:text-5xl font-medium" style={{ lineHeight: 1.15 }}>
              Кому подойдёт этот курс
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {whoCards.map(([title, desc], i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="card-base p-7 h-full">
                  <div className="font-display text-xl font-semibold mb-3" style={{ color: "var(--c-accent2)" }}>{title}</div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--c-muted)" }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="py-24 px-6" style={{ background: "linear-gradient(180deg, var(--c-bg) 0%, #1a1426 50%, var(--c-bg) 100%)" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-14">
            <div className="ornament mb-6"><span className="text-xs uppercase tracking-widest px-3">Результаты</span></div>
            <h2 className="font-display text-4xl md:text-5xl font-medium" style={{ lineHeight: 1.15 }}>
              Что вы получите за{" "}
              <span className="text-gold-shimmer">2 месяца</span>{" "}
              работы со мной
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {getCards.map(([title, desc], i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="card-base p-7 h-full">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-4"
                    style={{ background: "rgba(201,164,106,0.15)", color: "var(--c-accent)", border: "1px solid rgba(201,164,106,0.25)" }}
                  >
                    {i + 1}
                  </div>
                  <div className="font-semibold text-base mb-2" style={{ color: "var(--c-text)" }}>{title}</div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--c-muted)" }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAM */}
      <section id="program" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-14">
            <div className="ornament mb-6"><span className="text-xs uppercase tracking-widest px-3">Формат</span></div>
            <h2 className="font-display text-4xl md:text-5xl font-medium mb-4" style={{ lineHeight: 1.15 }}>
              Как построено обучение
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "var(--c-muted)" }}>
              Обучение выстроено так, чтобы не перегружать: постепенно войти в инструмент, начать практиковаться и не оставаться с вопросами один на один.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <Reveal>
              <div className="grid gap-5">
                {programFeatures.map(([icon, title, desc], i) => (
                  <div key={i} className="card-base p-6 flex gap-4 items-start">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(201,164,106,0.1)", border: "1px solid rgba(201,164,106,0.2)" }}
                    >
                      <Icon name={icon} size={20} style={{ color: "var(--c-accent)" }} />
                    </div>
                    <div>
                      <div className="font-semibold mb-1" style={{ color: "var(--c-text)" }}>{title}</div>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--c-muted)" }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="card-base p-8">
                <div className="font-display text-xl font-semibold mb-5" style={{ color: "var(--c-accent2)" }}>
                  Дополнительно в курсе:
                </div>
                <ul className="check-list">
                  {[
                    "Закрытый чат участников для вопросов и поддержки.",
                    "Сопровождение в процессе обучения.",
                    "Пошаговая система от базовых расчётов к практике.",
                    "Применение и для себя, и в профессиональной деятельности.",
                  ].map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* AUTHOR */}
      <section className="py-24 px-6" style={{ background: "linear-gradient(180deg, var(--c-bg) 0%, #1a1426 50%, var(--c-bg) 100%)" }}>
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center">
            <div className="ornament mb-6"><span className="text-xs uppercase tracking-widest px-3">Об авторе</span></div>
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 font-display text-3xl font-semibold"
              style={{ background: "rgba(200,168,255,0.12)", border: "1px solid rgba(200,168,255,0.25)", color: "var(--c-accent2)" }}
            >
              ЕУ
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-medium mb-4" style={{ lineHeight: 1.15 }}>
              Екатерина Усова
            </h2>
            <p className="text-sm font-semibold uppercase tracking-widest mb-8" style={{ color: "var(--c-accent)" }}>
              Психолог-практик · нумеролог · астропсихолог
            </p>
            <div className="card-base p-8 text-left">
              <div className="grid gap-4">
                {[
                  "Екатерина Усова — психолог-практик, нумеролог и астропсихолог.",
                  "Больше 5 лет в практике консультирования и передачи знаний через обучение.",
                  "Десятки клиентов и индивидуальных разборов.",
                ].map((t, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="mt-1.5 shrink-0 text-xs" style={{ color: "var(--c-accent)" }}>✦</span>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--c-muted)" }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div
              className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(201,164,106,0.12) 0%, rgba(200,168,255,0.08) 100%)", border: "1px solid rgba(201,164,106,0.2)" }}
            >
              <div className="orb w-72 h-72 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ background: "rgba(201,164,106,0.06)" }} />
              <div className="relative z-10">
                <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--c-accent)" }}>Следующий шаг</div>
                <h2 className="font-display text-4xl md:text-5xl font-medium mb-4" style={{ lineHeight: 1.15 }}>
                  Полную программу и условия участия я собрала в чат-боте
                </h2>
                <p className="text-base mb-8 max-w-lg mx-auto" style={{ color: "var(--c-muted)" }}>
                  Там можно посмотреть модули курса, узнать формат оплаты, задать вопросы и записаться на обучение.
                </p>
                <a
                  href="https://t.me/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold text-lg"
                  style={{ padding: "1rem 2.5rem" }}
                >
                  Посмотреть программу курса
                  <Icon name="ArrowUpRight" size={18} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="py-8 px-6 text-center text-xs"
        style={{ borderTop: "1px solid rgba(201,164,106,0.1)", color: "var(--c-muted)" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="font-display text-base font-medium" style={{ color: "var(--c-accent)", opacity: 0.7 }}>
            Екатерина Усова
          </span>
          <span>© Екатерина Усова</span>
          <span className="max-w-xs text-center md:text-right opacity-60">
            Результаты обучения зависят от личной практики и вовлечённости участника.
          </span>
        </div>
      </footer>
    </div>
  );
}