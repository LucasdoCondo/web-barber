import { Crown, MapPin, Phone, Clock, Instagram, Facebook, MessageCircle } from 'lucide-react';

export default function Footer({ onBook }: { onBook: () => void }) {
  return (
    <footer id="footer" data-bg="#0A0A0B" className="border-t border-imperial-gold/15">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4 md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-imperial-goldlight to-imperial-bronze text-black"><Crown size={19} /></span>
            <span className="font-display text-xl tracking-widest">BARBEARIA IMPERIAL</span>
          </div>
          <p className="mt-4 text-sm text-white/55">O templo do estilo masculino desde 2012. Corte, barba e ritual — ao nível da realeza.</p>
          <div className="mt-4 flex gap-2">
            {[Instagram, Facebook, MessageCircle].map((I, i) => (
              <a key={i} href="#top" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-imperial-gold hover:text-imperial-gold">
                <I size={17} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h5 className="text-xs uppercase tracking-[0.3em] text-imperial-gold">Horário</h5>
          <ul className="mt-3 space-y-2 text-sm text-white/60">
            <li className="flex items-center gap-2"><Clock size={14} /> Seg – Sáb · 09:00 – 20:00</li>
            <li className="flex items-center gap-2"><Clock size={14} /> Domingo · Fechado</li>
          </ul>
        </div>
        <div>
          <h5 className="text-xs uppercase tracking-[0.3em] text-imperial-gold">Contacto</h5>
          <ul className="mt-3 space-y-2 text-sm text-white/60">
            <li className="flex items-center gap-2"><MapPin size={14} /> Av. Central 480, Centro</li>
            <li className="flex items-center gap-2"><Phone size={14} /> (11) 99999-4800</li>
          </ul>
        </div>
        <div>
          <h5 className="text-xs uppercase tracking-[0.3em] text-imperial-gold">Pronto para o trono?</h5>
          <p className="mt-3 text-sm text-white/60">Vagas VIP esgotam ao fim de semana. Garante já a tua.</p>
          <button onClick={onBook} className="mt-4 w-full rounded-full bg-gradient-to-r from-imperial-goldlight to-imperial-gold py-3 font-bold text-black">
            Agendar Agora
          </button>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © 2026 Barbearia Imperial · Feito com navalha afiada e código limpo.
      </div>
    </footer>
  );
}
