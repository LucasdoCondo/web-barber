import { Star } from 'lucide-react';
import { barbers } from '../data/barbershop';

export default function BookingTeaser({ onBook }: { onBook: () => void }) {
  return (
    <section id="agendar" data-bg="#0E0D0B" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <p className="mb-3 text-xs uppercase tracking-[0.35em] text-imperial-gold">03 — Os Mestres</p>
      <h2 className="font-display text-5xl md:text-7xl">ESCOLHE O TEU <span className="gold-text">BARBEIRO</span></h2>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {barbers.map((b) => (
          <article key={b.id} className="metallic-card group overflow-hidden rounded-3xl">
            <div className="relative h-64 overflow-hidden">
              <img src={b.avatar} alt={b.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-imperial-coal via-transparent to-transparent" />
              <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[11px] text-imperial-gold">
                {b.available ? '● Disponível' : '○ Férias'}
              </span>
            </div>
            <div className="p-5">
              <h4 className="font-display text-2xl">{b.name}</h4>
              <p className="text-xs uppercase tracking-widest text-imperial-gold">{b.role}</p>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-white/60">
                <Star size={13} className="text-imperial-gold" fill="currentColor" /> {b.rating} · {b.cuts}
              </p>
              <button onClick={onBook} disabled={!b.available} className="mt-4 w-full rounded-full bg-white/10 py-2.5 text-sm font-semibold hover:bg-imperial-gold hover:text-black disabled:opacity-40">
                Agendar com {b.name.split(' ')[0]}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
