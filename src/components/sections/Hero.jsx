import { useState, useEffect, useRef } from 'react';

const HERO_BG = '/images/hero_bg.png';

function AnimatedCounter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const startTime = performance.now();
        const step = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * end));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen min-h-[680px] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#1C1C1E' }}
    >
      {/* Parallax background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          transform: `translateY(${scrollY * 0.28}px)`,
          willChange: 'transform',
        }}
      />

      {/* Dark overlays — always visible */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(28,28,30,0.88) 0%, rgba(28,28,30,0.65) 50%, rgba(28,28,30,0.45) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(28,28,30,0.75) 0%, transparent 50%)' }} />

      {/* Decorative rings */}
      <div className="absolute top-32 right-16 w-64 h-64 rounded-full border border-white/5 hidden lg:block" />
      <div className="absolute top-44 right-28 w-32 h-32 rounded-full border border-white/8 hidden lg:block" />

      {/* ── Hero Content ── */}
      <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 border border-white/25 text-white/90 px-4 py-1.5 rounded-full mb-8 font-body text-xs font-medium tracking-widest uppercase"
          style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', animation: 'fadeUp 0.6s ease 0.1s both' }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#F4894E' }} />
          Est. 2004 · Nagpur's Softest Idlis · ⭐ 4.5 Google Rating
        </div>

        {/* Headline */}
        <h1
          id="hero-headline"
          className="font-display font-bold text-white leading-[1.05] mb-6"
          style={{ fontSize: 'clamp(2.8rem, 8vw, 5.5rem)', animation: 'fadeUp 0.7s ease 0.25s both' }}
        >
          Authentic
          <span
            className="block italic"
            style={{ backgroundImage: 'linear-gradient(135deg, #F4894E, #E8621A, #D4A853)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
          >
            South Indian
          </span>
          Taste
        </h1>

        {/* Subheading */}
        <p
          className="font-body text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-10"
          style={{ color: 'rgba(255,255,255,0.72)', animation: 'fadeUp 0.7s ease 0.4s both' }}
        >
          Handcrafted idlies, crispy golden dosas, and aromatic filter coffee —<br className="hidden sm:block" />
          made with heirloom recipes and farm-fresh ingredients.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animation: 'fadeUp 0.7s ease 0.55s both' }}
        >
          <a id="hero-cta-menu" href="#menu" className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
            Explore Menu
          </a>
          <a id="hero-cta-call" href="tel:+919209521933" className="btn-outline" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
            Call Us Now
          </a>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div
        className="absolute left-0 right-0 z-10"
        style={{ bottom: '5.5rem', animation: 'fadeUp 0.7s ease 0.75s both' }}
      >
        <div className="section-container">
          <div className="flex justify-center">
            <div
              className="grid grid-cols-3 w-full max-w-lg"
              style={{
                background: 'rgba(255,255,255,0.78)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.4)',
                borderRadius: '1rem',
                padding: '1.1rem 2rem',
                boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
              }}
            >
              {[
                { end: 20,  suffix: '+', label: 'Years of Taste' },
                { end: 500, suffix: '+', label: 'Happy Tables Daily' },
                { end: 50,  suffix: '+', label: 'Menu Items' },
              ].map(({ end, suffix, label }, i) => (
                <div key={label} className="text-center" style={{ borderRight: i < 2 ? '1px solid rgba(0,0,0,0.1)' : 'none', padding: '0 1.25rem' }}>
                  <p className="font-display font-bold" style={{ fontSize: '1.5rem', color: '#E8621A' }}>
                    <AnimatedCounter end={end} suffix={suffix} />
                  </p>
                  <p className="font-body font-medium" style={{ fontSize: '10px', color: 'rgba(28,28,30,0.55)', marginTop: '2px' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <a
        href="#menu"
        aria-label="Scroll to menu"
        className="absolute left-1/2 z-10 flex flex-col items-center gap-2 no-underline group"
        style={{ bottom: '1.25rem', transform: 'translateX(-50%)', animation: 'fadeIn 1s ease 1.2s both' }}
      >
        {/* Mouse */}
        <div className="scroll-indicator-mouse">
          <div className="scroll-indicator-wheel" />
        </div>
        {/* Cascading chevrons */}
        <div className="flex flex-col items-center" style={{ gap: '1px', marginTop: '2px' }}>
          <span className="scroll-chevron" />
          <span className="scroll-chevron" />
          <span className="scroll-chevron" />
        </div>
        {/* Label */}
        <span className="scroll-indicator-label">Scroll</span>
      </a>
    </section>
  );
}
