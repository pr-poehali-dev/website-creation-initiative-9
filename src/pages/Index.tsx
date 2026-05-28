import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/509b3616-eefd-4714-a649-aa305bef5803/files/bda4d3ff-5647-413c-a4bd-9dde647a0f74.jpg";

const features = [
  {
    icon: "Zap",
    title: "Молниеносная скорость",
    desc: "Работает в 10 раз быстрее конкурентов. Никаких задержек — только результат.",
  },
  {
    icon: "Shield",
    title: "Надёжная защита",
    desc: "Шифрование данных на каждом уровне. Ваша информация в полной безопасности.",
  },
  {
    icon: "BarChart3",
    title: "Аналитика в реальном времени",
    desc: "Полная картина бизнеса одним взглядом. Принимайте решения на основе данных.",
  },
  {
    icon: "Globe",
    title: "Работает везде",
    desc: "Веб, мобильные устройства, планшеты — единый опыт на любой платформе.",
  },
  {
    icon: "Users",
    title: "Для команд",
    desc: "Совместная работа без барьеров. Синхронизация изменений в режиме реального времени.",
  },
  {
    icon: "Headphones",
    title: "Поддержка 24/7",
    desc: "Живые специалисты готовы помочь в любое время суток.",
  },
];

function useIntersection(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function AnimSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useIntersection();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-[#080d12] font-body text-white overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-md bg-[#080d12]/70 border-b border-white/5">
        <span className="font-display text-xl font-semibold tracking-widest text-white uppercase">
          ПРОДУКТ
        </span>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#hero" className="hover:text-white transition-colors">Главная</a>
          <a href="#features" className="hover:text-white transition-colors">О продукте</a>
          <a href="#contacts" className="hover:text-white transition-colors">Контакты</a>
        </div>
        <a
          href="#contacts"
          className="px-5 py-2 rounded-full text-sm font-semibold bg-[#00ff80] text-[#080d12] hover:bg-[#00e5ff] transition-colors duration-300"
        >
          Начать
        </a>
      </nav>

      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 grid-bg overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00ff80]/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#7c3aed]/15 blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center animate-fade-in-up" style={{ animationFillMode: "forwards" }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00ff80]/30 bg-[#00ff80]/10 text-[#00ff80] text-xs font-semibold uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff80] animate-pulse" />
            Новый стандарт
          </span>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-tight tracking-tight mb-6 max-w-4xl">
            Ваш{" "}
            <span className="text-gradient-shimmer">продукт</span>
            <br />
            меняет правила
          </h1>

          <p className="text-white/60 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
            Один инструмент — бесконечные возможности. Решение, которое трансформирует ваш бизнес уже с первого дня.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contacts"
              className="group px-8 py-4 rounded-full bg-[#00ff80] text-[#080d12] font-bold text-base hover:bg-[#00e5ff] transition-all duration-300 animate-glow flex items-center gap-2"
            >
              Попробовать бесплатно
              <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#features"
              className="px-8 py-4 rounded-full border border-white/20 text-white/80 font-semibold text-base hover:border-white/50 hover:text-white transition-all duration-300"
            >
              Узнать больше
            </a>
          </div>
        </div>

        <div className="relative mt-16 w-full max-w-4xl mx-auto animate-float" style={{ animationDelay: "1s" }}>
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#00ff80]/5 relative">
            <img src={HERO_IMG} alt="Продукт" className="w-full h-64 md:h-96 object-cover" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#080d12]/80 via-transparent to-transparent" />
          </div>
        </div>

        <div className="relative z-10 mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { val: "10x", label: "быстрее" },
            { val: "99.9%", label: "uptime" },
            { val: "5 000+", label: "клиентов" },
          ].map((s, i) => (
            <AnimSection key={i} delay={i * 100}>
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-[#00ff80]">{s.val}</div>
                <div className="text-white/50 text-sm mt-1">{s.label}</div>
              </div>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative py-28 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080d12] via-[#0d1520] to-[#080d12] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <AnimSection className="text-center mb-16">
            <span className="text-[#00ff80] text-xs font-semibold uppercase tracking-widest">О продукте</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase mt-3 mb-4">
              Почему выбирают <span className="text-gradient">нас</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Мы создали продукт, который решает реальные задачи. Без лишних слов — только ценность.
            </p>
          </AnimSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <AnimSection key={i} delay={i * 80}>
                <div className="glow-border rounded-2xl p-6 bg-[#0d1520]/80 backdrop-blur h-full group cursor-default transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-[#00ff80]/10 flex items-center justify-center mb-4 group-hover:bg-[#00ff80]/20 transition-colors">
                    <Icon name={f.icon} size={22} className="text-[#00ff80]" />
                  </div>
                  <h3 className="font-display text-lg font-semibold uppercase tracking-wide mb-2">{f.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 px-6">
        <AnimSection>
          <div className="max-w-4xl mx-auto rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00ff80]/20 via-[#00e5ff]/10 to-[#7c3aed]/20" />
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="relative z-10 p-12 md:p-16 text-center">
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-4">
                Готовы начать?
              </h2>
              <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
                Присоединяйтесь к тысячам клиентов, которые уже трансформировали свой бизнес.
              </p>
              <a
                href="#contacts"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#00ff80] text-[#080d12] font-bold text-base hover:bg-[#00e5ff] transition-colors duration-300"
              >
                Начать прямо сейчас
                <Icon name="ArrowRight" size={18} />
              </a>
            </div>
          </div>
        </AnimSection>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-28 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <AnimSection>
            <span className="text-[#00ff80] text-xs font-semibold uppercase tracking-widest">Контакты</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mt-3 mb-4">
              Свяжитесь<br />с нами
            </h2>
            <p className="text-white/50 text-base mb-8 leading-relaxed">
              Оставьте заявку и мы свяжемся с вами в течение 24 часов. Расскажем подробности и ответим на все вопросы.
            </p>
            <div className="flex flex-col gap-5">
              {[
                { icon: "Mail", label: "Email", val: "hello@example.com" },
                { icon: "Phone", label: "Телефон", val: "+7 (800) 000-00-00" },
                { icon: "MapPin", label: "Адрес", val: "Москва, Россия" },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00ff80]/10 flex items-center justify-center shrink-0">
                    <Icon name={c.icon} size={18} className="text-[#00ff80]" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs">{c.label}</div>
                    <div className="text-white font-medium">{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </AnimSection>

          <AnimSection delay={150}>
            {sent ? (
              <div className="glow-border rounded-2xl p-10 bg-[#0d1520]/80 text-center">
                <div className="w-16 h-16 rounded-full bg-[#00ff80]/20 flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" size={32} className="text-[#00ff80]" />
                </div>
                <h3 className="font-display text-2xl font-bold uppercase mb-2">Отправлено!</h3>
                <p className="text-white/50">Мы получили вашу заявку и свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glow-border rounded-2xl p-8 bg-[#0d1520]/80 backdrop-blur flex flex-col gap-5"
              >
                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-widest mb-2">Имя</label>
                  <input
                    type="text"
                    required
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#00ff80]/50 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-widest mb-2">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#00ff80]/50 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-widest mb-2">Сообщение</label>
                  <textarea
                    rows={4}
                    placeholder="Расскажите о вашем проекте..."
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#00ff80]/50 transition-colors text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#00ff80] text-[#080d12] font-bold text-base hover:bg-[#00e5ff] transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  Отправить заявку
                  <Icon name="Send" size={18} />
                </button>
              </form>
            )}
          </AnimSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg font-semibold tracking-widest uppercase text-white/40">ПРОДУКТ</span>
          <p className="text-white/20 text-sm">© 2026 Все права защищены</p>
          <div className="flex gap-6 text-sm text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white/60 transition-colors">Условия</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
