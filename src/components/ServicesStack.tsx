import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Check, ArrowRight } from 'lucide-react';
import { services, formatPrice } from '../data/barbershop';
import RevealText from './RevealText';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesStack({ onBook }: { onBook: (serviceId: string) => void }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.stack-card');
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, {
          scale: 0.92 - (cards.length - i) * 0.01,
          opacity: 0.55,
          filter: 'blur(2px)',
          transformOrigin: 'center top',
          ease: 'none',
          scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top top+=140', scrub: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="servicos" data-bg="#131316" className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <p className="mb-3 text-xs uppercase tracking-[0.35em] text-imperial-gold">01 — Nossos Serviços</p>
      <RevealText className="font-display text-5xl leading-[0.95] md:text-7xl">
        <>ESCOLHA O SEU <span className="gold-text">RITUAL</span></>
      </RevealText>
      <p className="mt-4 max-w-xl text-white/60">
        Quatro experiências, um padrão: perfeição. Role para empilhar os pacotes e escolha o seu.
      </p>

      <div className="mt-12 flex flex-col gap-6 md:gap-8">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.id}
              className="stack-card sticky"
              style={{ top: `${96 + i * 22}px` }}
            >
              <article className={`metallic-card relative overflow-hidden rounded-3xl p-7 md:p-10 ${i === services.length - 1 ? 'ring-2 ring-imperial-gold/60' : ''}`}>
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${s.accent}`} />
                <span className="font-display pointer-events-none absolute -right-2 -top-6 text-[7rem] leading-none text-white/[0.05] md:text-[11rem]">
                  0{i + 1}
                </span>
                {s.id === 'vip' && (
                  <span className="absolute right-6 top-6 rounded-full bg-gradient-to-r from-imperial-goldlight to-imperial-gold px-4 py-1 text-xs font-bold uppercase tracking-widest text-imperial-black">
                    Mais pedido
                  </span>
                )}
                <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-imperial-gold/15 text-imperial-gold">
                      <Icon size={22} />
                    </span>
                    <p className="mt-4 text-xs uppercase tracking-[0.3em] text-imperial-gold">{s.tagline}</p>
                    <h3 className="font-display mt-1 text-4xl tracking-wide md:text-5xl">{s.name}</h3>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/65 md:text-base">{s.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-xs text-white/80">
                          <Check size={13} className="text-imperial-gold" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-4 border-t border-white/10 pt-5 md:min-w-[220px] md:flex-col md:items-end md:border-0 md:pt-0">
                    <div className="md:text-right">
                      <p className="font-display text-4xl text-imperial-goldlight md:text-5xl">{formatPrice(s.price)}</p>
                      <p className="flex items-center gap-1.5 text-sm text-white/55 md:justify-end">
                        <Clock size={14} /> {s.durationMin} min
                      </p>
                    </div>
                    <button
                      onClick={() => onBook(s.id)}
                      className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-imperial-black transition hover:bg-imperial-gold"
                    >
                      Reservar <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}
