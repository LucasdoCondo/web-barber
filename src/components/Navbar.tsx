import { useEffect, useState } from 'react';
import { Crown, Menu, X, CalendarCheck } from 'lucide-react';

interface Props {
  onBook: () => void;
}

const links = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Barbeiros', href: '#agendar' },
  { label: 'Contacto', href: '#footer' },
];

export default function Navbar({ onBook }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-imperial-black/85 backdrop-blur-xl border-b border-imperial-gold/15 py-3' : 'bg-transparent py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-imperial-goldlight via-imperial-gold to-imperial-bronze text-imperial-black shadow-lg shadow-imperial-gold/30">
            <Crown size={20} strokeWidth={2.2} />
          </span>
          <span className="leading-tight">
            <span className="font-display block text-xl tracking-widest">BARBEARIA IMPERIAL</span>
            <span className="text-[11px] uppercase tracking-[0.3em] text-imperial-gold">Est. 2012 · Elite</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm uppercase tracking-widest text-white/70 transition hover:text-imperial-gold">
              {l.label}
            </a>
          ))}
          <button
            onClick={onBook}
            className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-imperial-goldlight via-imperial-gold to-imperial-bronze px-6 py-2.5 font-semibold text-imperial-black transition hover:shadow-xl hover:shadow-imperial-gold/30"
          >
            <CalendarCheck size={17} /> Agendar Horário
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-imperial-black/95 backdrop-blur-xl border-t border-white/10 px-6 py-6 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-lg font-display tracking-widest">
              {l.label}
            </a>
          ))}
          <button
            onClick={() => { setOpen(false); onBook(); }}
            className="rounded-full bg-imperial-gold py-3 font-bold text-imperial-black"
          >
            Agendar Horário
          </button>
        </div>
      )}
    </header>
  );
}
