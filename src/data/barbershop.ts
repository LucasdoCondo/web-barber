import { Crown, Scissors, Sparkles, Gem, type LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  durationMin: number;
  icon: LucideIcon;
  features: string[];
  accent: string;
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  rating: number;
  cuts: string;
  avatar: string;
  available: boolean;
}

export const services: Service[] = [
  {
    id: 'corte',
    name: 'Corte Imperial',
    tagline: 'Assinatura da casa',
    description:
      'Técnica europeia de tesoura + máquina, acabamento navalha, lavagem premium e finalização com produtos importados.',
    price: 80,
    durationMin: 45,
    icon: Scissors,
    features: ['Consultoria de visagismo', 'Acabamento navalha', 'Finalização premium'],
    accent: 'from-amber-400/20 to-transparent',
  },
  {
    id: 'barba',
    name: 'Barba de Respeito',
    tagline: 'Ritual com toalha quente',
    description:
      'Toalha quente, óleos essenciais, desenho anatómico, hidratação profunda e massagem facial relaxante.',
    price: 60,
    durationMin: 35,
    icon: Crown,
    features: ['Toalha quente', 'Óleos essenciais', 'Massagem facial'],
    accent: 'from-orange-500/20 to-transparent',
  },
  {
    id: 'tratamento',
    name: 'Tratamentos Capilares',
    tagline: 'Revitalização total',
    description:
      'Hidratação, reconstrução, esfoliação do couro cabeludo e terapia anti-queda com dermaroller.',
    price: 90,
    durationMin: 50,
    icon: Sparkles,
    features: ['Diagnóstico capilar', 'Hidratação profunda', 'Massagem craniana'],
    accent: 'from-yellow-200/20 to-transparent',
  },
  {
    id: 'vip',
    name: 'Combo VIP Imperial',
    tagline: 'A experiência completa',
    description:
      'Corte + barba + tratamento + sobrancelha + massagem + whisky / café especial. Sala privada, sem espera.',
    price: 179,
    durationMin: 110,
    icon: Gem,
    features: ['Sala VIP privada', 'Open bar premium', 'Prioridade total'],
    accent: 'from-amber-300/30 to-orange-800/10',
  },
];

export const barbers: Barber[] = [
  {
    id: 'rafael',
    name: 'Rafael Imperial',
    role: 'Master Barber · Fundador',
    rating: 4.98,
    cuts: '2.4k cortes',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&auto=format&fit=crop',
    available: true,
  },
  {
    id: 'diego',
    name: 'Diego Cortez',
    role: 'Especialista em Fade',
    rating: 4.95,
    cuts: '1.8k cortes',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop',
    available: true,
  },
  {
    id: 'thiago',
    name: 'Thiago Blade',
    role: 'Barba & Navalha',
    rating: 4.97,
    cuts: '2.1k cortes',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&auto=format&fit=crop',
    available: true,
  },
  {
    id: 'lucas',
    name: 'Lucas Prado',
    role: 'Visagismo & Estilo',
    rating: 4.93,
    cuts: '1.2k cortes',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop',
    available: false,
  },
];

export const timeSlots = ['09:00', '09:45', '10:30', '11:15', '13:00', '14:00', '15:30', '16:30', '17:30', '18:30', '19:30'];

export const galleryItems = [
  {
    src: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=900&q=80&auto=format&fit=crop',
    title: 'Salão Principal',
    tag: 'Espaço',
  },
  {
    src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=900&q=80&auto=format&fit=crop',
    title: 'Fade Cirúrgico',
    tag: 'Corte',
  },
  {
    src: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=900&q=80&auto=format&fit=crop',
    title: 'Ritual de Barba',
    tag: 'Barba',
  },
  {
    src: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=900&q=80&auto=format&fit=crop',
    title: 'Detalhe Navalha',
    tag: 'Acabamento',
  },
  {
    src: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=900&q=80&auto=format&fit=crop',
    title: 'Sala VIP',
    tag: 'Espaço',
  },
  {
    src: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=900&q=80&auto=format&fit=crop',
    title: 'Estilo Clássico',
    tag: 'Corte',
  },
];

export const formatPrice = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
