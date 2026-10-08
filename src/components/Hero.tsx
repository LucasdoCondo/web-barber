import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CalendarCheck, Star, MapPin, Scissors } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ onBook }: { onBook: () => void }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
      gsap.fromTo('.hero-line', { opacity: 0, y: 90 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.12, ease: 'power4.out', delay: 0.35 });
      gsap.fromTo('.hero-fade', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, delay: 0.9 });
      gsap.to('.hero-bg', {
        yPercent: 18, scale: 1.08, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero-content', {
        yPercent: -12, opacity: 0.25, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom 30%', scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="top" className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-28 md:items-center">
      <div className="hero-bg absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1800&q=80&auto=format&fit=crop"
          alt="Interior da Barbearia Imperial"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/70 to-[#0A0A0B]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B]/90 via-transparent to-transparent" />
      </div>

      <div className="hero-content relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">
        <p className="hero-eyebrow mb-4 inline-flex items-center gap-2 rounded-full border border-imperial-gold/40 bg-black/50 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-imperial-gold backdrop-blur">
          <Scissors size={13} /> A arte do corte desde 2012
        </p>
        <h1 className="font-display text-[17vw] leading-[0.85] sm:text-8xl md:text-[9rem]">
          <span className="hero-line block">ESTILO DE</span>
          <span className="hero-line gold-text block">ELITE IMPERIAL</span>
        </h1>
        <p className="hero-fade mt-5 max-w-xl text-base text-white/75 md:text-lg">
          Mais que um corte — um ritual. Navalha, toalha quente e acabamento cirúrgico
          num espaço pensado para quem exige excelência.
        </p>
        <div className="hero-fade mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={onBook}
            className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-imperial-goldlight via-imperial-gold to-imperial-bronze px-8 py-4 font-bold text-imperial-black shadow-2xl shadow-imperial-gold/30 transition hover:scale-[1.03]"
          >
            <CalendarCheck size={19} /> Agendar Horário
          </button>
          <a href="#servicos" className="rounded-full border border-white/25 px-8 py-4 font-semibold text-white/90 backdrop-blur transition hover:border-imperial-gold hover:text-imperial-gold">
            Explorar Serviços
          </a>
        </div>
        <div className="hero-fade mt-10 flex flex-wrap gap-6 text-sm text-white/60">
          <span className="flex items-center gap-2"><Star size={15} className="text-imperial-gold" /> 4.97 · 3.200+ avaliações</span>
          <span className="flex items-center gap-2"><MapPin size={15} className="text-imperial-gold" /> Av. Central 480 · Centro</span>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2">
        <div className="h-12 w-7 rounded-full border border-white/30 p-1.5">
          <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-imperial-gold mx-auto" />
        </div>
      </div>
    </section>
  );
}
