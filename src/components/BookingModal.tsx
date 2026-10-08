import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { X, Scissors } from 'lucide-react';
import { services, barbers, timeSlots, formatPrice } from '../data/barbershop';

interface Props { open: boolean; preselectedService: string | null; onClose: () => void; }
export const bookingSteps = ['Serviço', 'Barbeiro', 'Data & Hora', 'Confirmar'];
export const next7Days = () => { const o: Date[] = []; const d = new Date(); for (let i = 0; i < 7; i++) { const c = new Date(d); c.setDate(d.getDate() + i); o.push(c); } return o; };

export default function BookingModal({ open, preselectedService, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState(services[0].id);
  const [barberId, setBarberId] = useState<string | null>(null);
  const [dayIdx, setDayIdx] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [done, setDone] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const days = useMemo(next7Days, []);
  useEffect(() => {
    if (open) {
      setStep(0); setDone(false); setSlot(null);
      if (preselectedService) setServiceId(preselectedService);
      document.body.style.overflow = 'hidden';
      if (box.current) gsap.fromTo(box.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' });
    } else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open, preselectedService]);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onClose]);
  if (!open) return null;
  const service = services.find((s) => s.id === serviceId)!;
  const barber = barbers.find((b) => b.id === barberId);
  const canNext = (step === 0 && !!serviceId) || (step === 1 && !!barberId) || (step === 2 && !!slot) || step === 3;
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div ref={box} className="relative flex max-h-[92svh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl sm:rounded-3xl border border-imperial-gold/20 bg-imperial-coal">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div><p className="text-[11px] uppercase tracking-[0.3em] text-imperial-gold">Agendamento</p><h3 className="font-display text-2xl">RESERVA O TEU HORÁRIO</h3></div>
          <button onClick={onClose} className="rounded-full border border-white/15 p-2" aria-label="Fechar"><X size={18} /></button>
        </div>
        {!done ? (
          <>
            <div className="flex px-5 pt-4 gap-1">{bookingSteps.map((s, i) => (<div key={s} className="flex flex-1 items-center gap-1"><span className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${i <= step ? 'bg-imperial-gold text-black' : 'bg-white/10 text-white/50'}`}>{i + 1}</span><span className="hidden sm:block text-[11px] uppercase">{s}</span></div>))}</div>
            <div className="overflow-y-auto px-5 py-5" style={{ maxHeight: '52svh' }}>
              {step === 0 && (<div className="grid gap-3">{services.map((s) => (
                <button key={s.id} onClick={() => setServiceId(s.id)} className={`flex justify-between rounded-2xl border p-4 text-left ${serviceId === s.id ? 'border-imperial-gold bg-imperial-gold/10' : 'border-white/10'}`}>
                  <span className="flex gap-3 items-center"><span className="grid h-11 w-11 place-items-center rounded-xl bg-imperial-gold/15 text-imperial-gold"><Scissors size={19} /></span><span><span className="block font-semibold">{s.name}</span><span className="text-xs text-white/50">{s.durationMin} min</span></span></span>
                  <span className="font-display text-2xl text-imperial-goldlight">{formatPrice(s.price)}</span>
                </button>))}</div>)}
              {step === 1 && (<div className="grid gap-2 sm:grid-cols-2">
                <button onClick={() => setBarberId('any')} className={`rounded-2xl border p-4 text-left ${barberId === 'any' ? 'border-imperial-gold bg-imperial-gold/10' : 'border-white/10'}`}><span className="font-semibold">Sem preferência</span><span className="block text-xs text-white/50">Primeiro disponível</span></button>
                {barbers.map((b) => (<button key={b.id} disabled={!b.available} onClick={() => setBarberId(b.id)} className={`flex gap-3 items-center rounded-2xl border p-3 text-left ${barberId === b.id ? 'border-imperial-gold bg-imperial-gold/10' : 'border-white/10'} ${!b.available ? 'opacity-40' : ''}`}>
                  <img src={b.avatar} alt={b.name} className="h-12 w-12 rounded-full object-cover" />
                  <span><span className="block font-semibold text-sm">{b.name}</span><span className="block text-xs text-white/50">{b.available ? b.role : 'Em férias'}</span></span>
                </button>))}
              </div>)}
              {step === 2 && (<div>
                <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">{days.map((d, i) => (<button key={i} onClick={() => { setDayIdx(i); setSlot(null); }} className={`min-w-[68px] rounded-xl border py-2 text-center ${dayIdx === i ? 'border-imperial-gold bg-imperial-gold text-black' : 'border-white/10'}`}><span className="block text-[11px] uppercase">{d.toLocaleDateString('pt-BR', { weekday: 'short' })}</span><span className="font-display block text-xl">{d.getDate()}</span></button>))}</div>
                <div className="mt-3 grid grid-cols-3 gap-2">{timeSlots.map((t, i) => { const taken = (i + dayIdx) % 4 === 0; return (<button key={t} disabled={taken} onClick={() => setSlot(t)} className={`rounded-xl border py-2.5 text-sm font-semibold ${taken ? 'opacity-25 line-through' : slot === t ? 'border-imperial-gold bg-imperial-gold text-black' : 'border-white/10'}`}>{t}</button>); })}</div>
              </div>)}
              {step === 3 && (<div className="grid gap-3">
                <div className="rounded-2xl border border-imperial-gold/30 bg-imperial-gold/5 p-4 text-sm"><p className="font-semibold text-imperial-goldlight">{service.name} · {formatPrice(service.price)}</p><p className="text-white/60">{barberId === 'any' ? 'Equipa' : barber?.name} · {days[dayIdx].toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })} às {slot}</p></div>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome completo" className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-imperial-gold" />
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(11) 99999-9999" inputMode="tel" className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-imperial-gold" />
              </div>)}
            </div>
            <div className="flex justify-between border-t border-white/10 px-5 py-4">
              <button onClick={() => (step === 0 ? onClose() : setStep(step - 1))} className="rounded-full border border-white/15 px-5 py-2.5 text-sm">{step === 0 ? 'Cancelar' : 'Voltar'}</button>
              {step < 3 ? (<button disabled={!canNext} onClick={() => setStep(step + 1)} className="rounded-full bg-imperial-gold px-6 py-2.5 text-sm font-bold text-black disabled:opacity-30">Continuar</button>)
              : (<button disabled={!name.trim() || !phone.trim()} onClick={() => setDone(true)} className="rounded-full bg-imperial-gold px-6 py-2.5 text-sm font-bold text-black disabled:opacity-30">Confirmar</button>)}
            </div>
          </>
        ) : (
          <div className="px-6 py-10 text-center"><h4 className="font-display text-4xl">CONFIRMADO</h4><p className="text-white/60">{name} · {service.name} · {slot}</p><button onClick={onClose} className="mt-6 rounded-full bg-imperial-gold px-8 py-3 font-bold text-black">Fechar</button></div>
        )}
      </div>
    </div>
  );
}
