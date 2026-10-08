import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Revelação sincronizada com o scroll (scrub): opacidade + deslocamento por palavra. */
export default function RevealText({ children, className = '', delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll('.rv-word');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.08, y: 28, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.06,
          ease: 'power2.out',
          delay,
          scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 35%', scrub: 1 },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [delay]);

  // divide texto em palavras preservando elementos simples
  const renderWords = (node: ReactNode): ReactNode => {
    if (typeof node === 'string') {
      return node.split(' ').map((w, i) => (
        <span key={i} className="rv-word inline-block will-change-transform" style={{ whiteSpace: 'pre' }}>
          {w}{' '}
        </span>
      ));
    }
    return node;
  };

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children) ? children.map((c, i) => <span key={i}>{renderWords(c)}</span>) : renderWords(children)}
    </div>
  );
}
