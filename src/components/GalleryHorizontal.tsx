import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoveHorizontal, Images } from 'lucide-react';
import { galleryItems } from '../data/barbershop';
import RevealText from './RevealText';

gsap.registerPlugin(ScrollTrigger);

export default function GalleryHorizontal() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop: pin + scroll vertical vira horizontal
    mm.add('(min-width: 768px)', () => {
      const el = track.current;
      const section = root.current;
      if (!el || !section) return;
      const getX = () => -(el.scrollWidth - window.innerWidth);
      const tween = gsap.to(el, {
        x: getX,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${el.scrollWidth - window.innerWidth + 400}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => { tween.scrollTrigger?.kill(); tween.kill(); };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="galeria" data-bg="#2A1E12" className="relative overflow-hidden py-24 md:py-0 md:h-screen md:flex md:flex-col md:justify-center">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-imperial-gold">
          <Images size={14} /> 02 — Galeria de Estilos
        </p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <RevealText className="font-display text-5xl leading-[0.95] md:text-7xl">
            <>O NOSSO <span className="gold-text">PORTFÓLIO</span></>
          </RevealText>
          <p className="hidden items-center gap-2 text-sm text-white/50 md:flex">
            <MoveHorizontal size={16} className="text-imperial-gold" /> Continue a rolar — a galeria move-se na horizontal
          </p>
        </div>
      </div>

      {/* Mobile: scroll horizontal nativo com snap (ótimo ao toque) */}
      <div
        ref={track}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:mt-12 md:snap-none md:overflow-visible md:px-8 md:pb-0 md:w-max"
      >
        {galleryItems.map((g, i) => (
          <figure
            key={g.title + i}
            className="group relative w-[78vw] shrink-0 snap-center overflow-hidden rounded-3xl border border-white/10 sm:w-[380px] md:w-[420px]"
          >
            <img src={g.src} alt={g.title} loading="lazy" className="h-[52vh] w-full object-cover transition duration-700 group-hover:scale-105 md:h-[54vh]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[11px] uppercase tracking-widest text-imperial-gold backdrop-blur">
              {g.tag}
            </span>
            <figcaption className="absolute bottom-0 p-5">
              <p className="font-display text-3xl tracking-wide">{g.title}</p>
              <p className="text-xs uppercase tracking-[0.25em] text-white/55">Barbearia Imperial · Nº {i + 1}</p>
            </figcaption>
          </figure>
        ))}

        <div className="grid w-[70vw] shrink-0 snap-center place-items-center rounded-3xl border border-dashed border-imperial-gold/40 bg-imperial-gold/5 p-8 text-center sm:w-[300px] md:w-[320px]">
          <div>
            <p className="font-display text-4xl leading-none">O TEU<br /><span className="gold-text">CORTE AQUI</span></p>
            <a href="#agendar" className="mt-4 inline-block rounded-full bg-imperial-gold px-6 py-3 text-sm font-bold text-imperial-black">
              Ser o próximo
            </a>
          </div>
        </div>
      </div>

      <p className="mt-4 px-5 text-xs uppercase tracking-[0.3em] text-white/40 md:hidden">← Desliza para explorar →</p>
    </section>
  );
}
