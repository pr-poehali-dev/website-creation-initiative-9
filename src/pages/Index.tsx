import { useEffect, useRef } from "react";

const PHOTO =
  "https://cdn.poehali.dev/projects/509b3616-eefd-4714-a649-aa305bef5803/bucket/309872e0-5c35-4af7-af30-fd44780a43c4.jpeg";

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function R({ tag: Tag = "div", children, className = "", ...props }: { tag?: keyof JSX.IntrinsicElements; children: React.ReactNode; className?: string; [k: string]: unknown }) {
  const ref = useReveal();
  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={`reveal${className ? " " + className : ""}`} {...props}>
      {children}
    </Tag>
  );
}

export default function Index() {
  return (
    <>
      <style>{`
        :root {
          --c-text: #f5eef8;
          --c-muted: #cbbdd4;
          --c-faint: #a190ad;
          --c-gold: #c9a46a;
          --c-gold-h: #dab77f;
          --c-lav: #c8a8ff;
          --c-bg: #17131d;
          --c-bg2: #1a1522;
          --c-card: rgba(255,255,255,0.04);
          --c-border: rgba(255,255,255,0.08);
          --c-shadow: 0 20px 60px rgba(6,4,11,0.45);
          --font-d: 'Cormorant Garamond', Georgia, serif;
          --font-b: 'Manrope', system-ui, sans-serif;
          --tr: 220ms cubic-bezier(0.16,1,0.3,1);
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          font-family: var(--font-b);
          font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
          line-height: 1.65;
          color: var(--c-text);
          background:
            radial-gradient(circle at 15% 20%, rgba(200,168,255,0.14), transparent 30%),
            radial-gradient(circle at 85% 10%, rgba(201,164,106,0.10), transparent 28%),
            linear-gradient(180deg, #17131d 0%, #1a1522 35%, #140f19 100%);
          overflow-x: hidden;
        }
        img { max-width: 100%; display: block; }
        a { color: inherit; text-decoration: none; }

        .wrap { width: min(100% - 32px, 1040px); margin: 0 auto; }

        /* HEADER */
        .site-header {
          position: sticky; top: 0; z-index: 20;
          backdrop-filter: blur(18px);
          background: rgba(23,19,29,0.58);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .header-inner {
          display: flex; align-items: center; justify-content: space-between;
          gap: 1rem; min-height: 74px;
        }
        .brand { display: flex; align-items: center; gap: 12px; color: var(--c-muted); font-size: clamp(0.875rem, 0.8rem + 0.35vw, 1rem); }
        .brand-mark {
          width: 38px; height: 38px; border-radius: 50%;
          border: 1px solid rgba(201,164,106,0.55);
          display: grid; place-items: center;
          color: var(--c-gold);
          background: rgba(255,255,255,0.03);
          flex-shrink: 0;
        }
        .brand-name { display: block; font-weight: 700; color: var(--c-text); }
        .brand-sub { font-size: 0.8125rem; }
        /* Мобильная кнопка снизу — скрыта на десктопе */
        .mobile-cta-bar { display: none; }
        @media (max-width: 600px) {
          .mobile-cta-bar { display: flex; }
          .header-btn { display: none !important; }
          .header-inner { min-height: 62px; }
          main { padding-bottom: 80px; }
        }

        /* BUTTONS */
        .btn, .btn-sec {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 8px;
          min-height: 52px; padding: 0 22px;
          border-radius: 9999px;
          font-family: var(--font-b);
          font-size: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
          transition: transform var(--tr), background var(--tr), box-shadow var(--tr);
          border: 1px solid transparent;
          cursor: pointer; white-space: nowrap;
        }
        .btn {
          background: linear-gradient(135deg, var(--c-gold), #e1c08f);
          color: #22160b; font-weight: 800;
          box-shadow: 0 12px 30px rgba(201,164,106,0.24);
        }
        .btn:hover { background: linear-gradient(135deg, var(--c-gold-h), #eacf9f); transform: translateY(-2px); box-shadow: 0 16px 40px rgba(201,164,106,0.35); }
        .btn-sec {
          border-color: rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.04);
          color: var(--c-text); font-weight: 600;
        }
        .btn-sec:hover { border-color: rgba(255,255,255,0.28); background: rgba(255,255,255,0.08); transform: translateY(-2px); }

        /* HERO PHOTO */
        .hero-photo-wrap {
          width: 100%;
          max-height: 88vh;
          overflow: hidden;
          position: relative;
        }
        .hero-photo-wrap img {
          width: 100%;
          height: clamp(380px, 65vw, 860px);
          object-fit: cover;
          object-position: center top;
          display: block;
          mask-image: linear-gradient(to bottom, black 0%, black 72%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 0%, black 72%, transparent 100%);
        }
        .hero-photo-wrap .photo-orb {
          position: absolute; pointer-events: none;
          border-radius: 50%; filter: blur(90px);
        }

        /* HERO TEXT */
        .hero { padding: clamp(40px, 6vw, 72px) 0 clamp(48px, 8vw, 88px); }
        .eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 10px 14px; border-radius: 9999px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          color: var(--c-muted);
          font-size: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
          margin-bottom: 20px;
        }
        .eyebrow::before {
          content: ""; width: 8px; height: 8px; border-radius: 50%;
          background: var(--c-gold);
          box-shadow: 0 0 12px rgba(201,164,106,0.7);
          flex-shrink: 0;
        }
        h1, h2 {
          font-family: var(--font-d);
          line-height: 1.02; letter-spacing: -0.02em;
        }
        h1 {
          font-size: clamp(2.8rem, 1.7rem + 4vw, 5.4rem);
          max-width: 11ch;
        }
        h2 { font-size: clamp(2rem, 1.4rem + 2vw, 3.3rem); margin-bottom: 16px; }
        .lead { color: var(--c-muted); max-width: 60ch; }
        .hero-lead { margin: 20px 0 0; }
        .hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
        .hero-points { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 32px; }
        .hero-point {
          padding: 16px; border-radius: 1rem;
          background: var(--c-card); border: 1px solid var(--c-border);
          color: var(--c-muted); font-size: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
        }
        .hero-point strong { display: block; color: var(--c-text); margin-bottom: 4px; }

        /* (photo card styles removed — photo is now full-width above hero) */

        /* SECTIONS */
        .section { padding: clamp(56px, 8vw, 104px) 0; }
        .section + .section { border-top: 1px solid rgba(255,255,255,0.04); }
        .split { display: grid; grid-template-columns: 0.95fr 1.05fr; gap: clamp(24px, 4vw, 56px); align-items: start; }

        .card { border: 1px solid var(--c-border); background: var(--c-card); border-radius: 28px; padding: clamp(24px, 3vw, 34px); box-shadow: var(--c-shadow); }
        .soft-card { border: 1px solid var(--c-border); background: var(--c-card); border-radius: 24px; padding: 22px; min-height: 100%; box-shadow: var(--c-shadow); }
        .mini-card { border: 1px solid var(--c-border); background: var(--c-card); border-radius: 20px; padding: 18px; box-shadow: var(--c-shadow); }
        .mini-card strong, .card strong { display: block; color: var(--c-text); margin-bottom: 6px; font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem); }
        .mini-card p, .card p { color: var(--c-muted); margin: 0; font-size: clamp(0.875rem, 0.8rem + 0.35vw, 1rem); }

        .ulist { list-style: none; display: grid; gap: 14px; }
        .ulist li { position: relative; padding-left: 22px; color: var(--c-muted); }
        .ulist li::before {
          content: ""; position: absolute; left: 0; top: 0.72em;
          width: 8px; height: 8px; border-radius: 50%;
          background: linear-gradient(135deg, var(--c-gold), var(--c-lav));
        }

        .audience-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 32px; }
        .results-grid, .feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 32px; }

        /* AUTHOR */
        .author-box { display: grid; grid-template-columns: 160px 1fr; gap: 24px; align-items: center; }
        .author-box img {
          width: 160px; height: 190px;
          object-fit: cover; object-position: center top;
          border-radius: 24px;
          border: 1px solid var(--c-border);
        }

        /* CTA */
        .cta-shell {
          border-radius: 32px;
          padding: clamp(28px, 5vw, 52px);
          background:
            radial-gradient(circle at 20% 20%, rgba(200,168,255,0.16), transparent 28%),
            radial-gradient(circle at 80% 10%, rgba(201,164,106,0.16), transparent 24%),
            linear-gradient(135deg, rgba(42,32,56,0.95), rgba(26,19,35,0.96));
          border: 1px solid rgba(255,255,255,0.10);
          box-shadow: var(--c-shadow);
        }
        .cta-grid { display: grid; grid-template-columns: 1fr auto; gap: 24px; align-items: center; }

        /* FOOTER */
        .footer { padding: 28px 0 42px; color: var(--c-faint); font-size: clamp(0.875rem, 0.8rem + 0.35vw, 1rem); }
        .footer-inner { display: flex; justify-content: space-between; gap: 20px; flex-wrap: wrap; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 20px; }

        /* REVEAL */
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 700ms ease, transform 700ms ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .hero-grid, .split, .cta-grid, .author-box, .results-grid, .feature-grid { grid-template-columns: 1fr; }
          .hero-points, .audience-grid { grid-template-columns: 1fr 1fr; }
          .photo-badge, .floating-note { position: static; margin-top: 14px; max-width: none; }
        }
        @media (max-width: 720px) {
          .wrap { width: min(100% - 24px, 1040px); }
          .hero-points, .audience-grid, .results-grid, .feature-grid { grid-template-columns: 1fr; }
          .author-box { grid-template-columns: 1fr; }
          .author-box img { width: 100%; max-width: 260px; height: auto; }
          .brand-sub { display: none; }
        }
      `}</style>

      {/* HEADER */}
      <header className="site-header">
        <div className="wrap header-inner">
          <a className="brand" href="#top">
            <span className="brand-mark">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="8.5" />
                <path d="M12 3.5v17" /><path d="M3.5 12h17" />
                <path d="M6.4 6.4l11.2 11.2" /><path d="M17.6 6.4L6.4 17.6" />
              </svg>
            </span>
            <span>
              <span className="brand-name">Екатерина Усова</span>
              <span className="brand-sub">Практический курс по нумерологии</span>
            </span>
          </a>
          <a className="btn header-btn" href="#program">Посмотреть программу курса</a>
        </div>
      </header>

      {/* Мобильная кнопка-закрепка снизу */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 30,
        padding: "12px 16px 20px",
        background: "linear-gradient(to top, rgba(23,19,29,0.98) 60%, transparent)",
        display: "flex", justifyContent: "center",
      }} className="mobile-cta-bar">
        <a className="btn" href="#program" style={{ width: "100%", maxWidth: "400px", justifyContent: "center" }}>
          Посмотреть программу курса
        </a>
      </div>

      <main id="top">

        {/* FULL-WIDTH PHOTO */}
        <div className="hero-photo-wrap">
          <div className="photo-orb" style={{ width: "600px", height: "500px", top: 0, left: "50%", transform: "translateX(-50%)", background: "rgba(200,168,255,0.12)" }} />
          <img src={PHOTO} alt="Екатерина Усова" width="1440" height="900" loading="eager" />
        </div>

        {/* HERO TEXT */}
        <section className="hero">
          <div className="wrap">
            <R>
              <div style={{ textAlign: "center", marginBottom: "16px" }}>
                <span className="eyebrow" style={{ display: "inline-flex" }}>Нумерология как инструмент</span>
              </div>
              <h1 style={{ textAlign: "center", maxWidth: "none", fontSize: "clamp(2.8rem, 1.7rem + 4vw, 5.4rem)" }}>
                Практический онлайн-курс<br />с Екатериной Усовой
              </h1>
              <p className="lead hero-lead" style={{ textAlign: "center", margin: "20px auto 0", maxWidth: "62ch" }}>
                Для самопознания, работы с людьми и в качестве дополнительного профессионального инструмента. Нумерология — инструмент анализа личности, жизненных циклов и взаимодействия людей через дату рождения.
              </p>
              <div className="hero-actions" style={{ justifyContent: "center" }}>
                <a className="btn" href="#program">Посмотреть программу курса</a>
                <a className="btn-sec" href="#about-course">О курсе</a>
              </div>
              <div className="hero-points" style={{ maxWidth: "720px", margin: "32px auto 0" }}>
                <div className="hero-point"><strong>2 месяца</strong>Пошаговое обучение от основ к практике.</div>
                <div className="hero-point"><strong>Онлайн-формат</strong>Видео-уроки, разборы и сопровождение.</div>
                <div className="hero-point"><strong>Для жизни и работы</strong>Знания, которые можно применять сразу.</div>
              </div>
            </R>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section" id="about-course">
          <div className="wrap split">
            <R>
              <h2>Иногда нам не хватает не мотивации, а понимания себя</h2>
              <p className="lead">Когда одни и те же ситуации повторяются, дело часто не в слабости характера. Чаще всего человеку просто не хватает системы, через которую можно понять свои реакции, выборы и отношения.</p>
            </R>
            <R className="card">
              <ul className="ulist">
                <li>Почему с одними людьми легко, а с другими всё время напряжение.</li>
                <li>Почему ребёнок ведёт себя «не так», а партнёр словно не слышит вас.</li>
                <li>Почему в жизни снова и снова возвращаются похожие сценарии.</li>
                <li>Почему вроде бы стараетесь, а ясности о себе всё равно не хватает.</li>
              </ul>
            </R>
          </div>
        </section>

        {/* HOW I WORK */}
        <section className="section">
          <div className="wrap split">
            <R className="soft-card" />
            <R>
              <h2>Как я работаю с этим инструментом</h2>
              <p className="lead" style={{ marginBottom: "20px" }}>Я смотрю на дату рождения не как на магию, а как на исходные данные. Через них можно анализировать личность, жизненные циклы и взаимодействие человека с другими людьми.</p>
              <ul className="ulist">
                <li>Помогает видеть сильные стороны и внутренние задачи человека.</li>
                <li>Даёт понятный язык для разговора о ребёнке, близких, клиентах и команде.</li>
                <li>Позволяет замечать закономерности там, где раньше всё казалось хаосом.</li>
                <li>Становится дополнительным инструментом в профессии и жизни.</li>
              </ul>
            </R>
          </div>
        </section>

        {/* WHO */}
        <section className="section">
          <div className="wrap">
            <R>
              <h2>Кому подойдёт этот курс</h2>
              <div className="audience-grid">
                {[
                  ["Мамам", "Чтобы лучше понимать характер ребёнка, его сильные стороны, таланты и подходящий вектор развития."],
                  ["Экспертам мягких ниш", "Психологам, коучам, наставникам и практикам, которым нужен ещё один точный инструмент для работы с людьми."],
                  ["Предпринимателям", "Чтобы лучше чувствовать партнёрство, совместимость, особенности команды и периоды внутренних изменений."],
                  ["Тем, кто хочет разобраться в себе", "Чтобы увидеть свои сильные стороны, понять повторяющиеся сценарии и перестать действовать вслепую."],
                ].map(([t, d]) => (
                  <article key={t} className="mini-card"><strong>{t}</strong><p>{d}</p></article>
                ))}
              </div>
            </R>
          </div>
        </section>

        {/* RESULTS */}
        <section className="section">
          <div className="wrap">
            <R>
              <h2>Что вы получите за 2 месяца работы со мной</h2>
              <div className="results-grid">
                {[
                  ["Понимание системы", "Научитесь читать карту жизненного пути человека и делать базовые нумерологические расчёты без путаницы."],
                  ["Навык анализа", "Начнёте видеть предназначение, сильные стороны, особенности характера и причины напряжения в отношениях."],
                  ["Прогнозирование", "Сможете делать прогнозы на день, месяц и год, чтобы применять это и для себя, и в работе с людьми."],
                  ["Практический инструмент", "Начнёте лучше понимать клиентов, близких, детей, партнёров и свои собственные реакции."],
                  ["Профессиональное расширение", "Сможете встроить нумерологию в свою практику как дополнительный навык и новый формат работы."],
                  ["Новый вектор", "Для кого-то — личная опора, для кого-то — новое направление, которое можно монетизировать."],
                ].map(([t, d]) => (
                  <article key={t} className="card"><strong>{t}</strong><p>{d}</p></article>
                ))}
              </div>
            </R>
          </div>
        </section>

        {/* PROGRAM */}
        <section className="section" id="program">
          <div className="wrap split">
            <R>
              <h2>Как построено обучение</h2>
              <p className="lead" style={{ marginBottom: "24px" }}>Мне важно, чтобы обучение не перегружало. Я выстроила его так, чтобы вы постепенно вошли в инструмент, начали практиковаться и не оставались с вопросами один на один.</p>
              <div className="feature-grid">
                {[
                  ["Онлайн-формат", "Учиться можно из любой точки мира в удобном ритме."],
                  ["Видео-уроки", "К материалам можно возвращаться столько раз, сколько нужно."],
                  ["Практика и разборы", "Знания переходят в навык, а не остаются теорией."],
                ].map(([t, d]) => (
                  <div key={t} className="mini-card"><strong>{t}</strong><p>{d}</p></div>
                ))}
              </div>
            </R>
            <R className="card">
              <ul className="ulist">
                <li>Закрытый чат участников для вопросов, уточнений и поддержки.</li>
                <li>Сопровождение в процессе обучения и помощь по шагам.</li>
                <li>Пошаговая система: от базовых расчётов к уверенной практике.</li>
                <li>Всё, что проходите, можно применять и для себя, и в профессиональной деятельности.</li>
              </ul>
            </R>
          </div>
        </section>

        {/* AUTHOR */}
        <section className="section">
          <div className="wrap">
            <R className="author-box">
              <img src={PHOTO} alt="Екатерина Усова" width="500" height="700" loading="lazy" />
              <div>
                <h2>Об авторе курса</h2>
                <p className="lead" style={{ marginBottom: "16px" }}>
                  <strong style={{ color: "var(--c-text)" }}>Екатерина Усова</strong> — психолог-практик, нумеролог и астропсихолог. Больше 5 лет в практике консультирования и передачи знаний через обучение. Десятки клиентов и индивидуальных разборов.
                </p>
                <p className="lead">
                  В своей работе помогает людям глубже понимать себя, свои внутренние процессы и отношения через инструменты самопознания и практического анализа личности. Этот курс создан для тех, кому важны не громкие формулировки, а ясность, структура и возможность применять знания в реальной жизни.
                </p>
              </div>
            </R>
          </div>
        </section>

        {/* CTA */}
        <section className="section" style={{ paddingBottom: "clamp(64px, 10vw, 120px)" }}>
          <div className="wrap">
            <R className="cta-shell">
              <div className="cta-grid">
                <div>
                  <h2>Полную программу и условия участия я собрала в чат-боте</h2>
                  <p className="lead" style={{ marginTop: "12px" }}>
                    Там можно посмотреть модули курса, узнать формат оплаты, задать вопросы и записаться на обучение.
                  </p>
                </div>
                <div>
                  <a className="btn" href="https://t.me/yourusername" target="_blank" rel="noopener noreferrer">
                    Посмотреть программу курса
                  </a>
                </div>
              </div>
            </R>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-inner">
          <span>© Екатерина Усова</span>
          <span>Результаты обучения зависят от личной практики и вовлечённости участника.</span>
        </div>
      </footer>
    </>
  );
}