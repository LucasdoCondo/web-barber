import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesStack from './components/ServicesStack';
import GalleryHorizontal from './components/GalleryHorizontal';
import BookingModal from './components/BookingModal';
import BookingTeaser from './components/BookingTeaser';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preselected, setPreselected] = useState<string | null>(null);

  const openBooking = (serviceId?: string) => {
    setPreselected(serviceId ?? null);
    setBookingOpen(true);
  };

  // 1) Background Color Morphing por secção (data-bg)
  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>('[data-bg]');
    sections.forEach((sec) => {
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => {
          if (self.isActive) {
            gsap.to('body', {
              backgroundColor: sec.dataset.bg,
              duration: 0.9,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }
        },
      });
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div className="grain min-h-screen">
      <Navbar onBook={() => openBooking()} />
      <main>
        <Hero onBook={() => openBooking()} />
        <ServicesStack onBook={(id) => openBooking(id)} />
        <GalleryHorizontal />
        <BookingTeaser onBook={() => openBooking()} />
      </main>
      <Footer onBook={() => openBooking()} />
      <BookingModal open={bookingOpen} preselectedService={preselected} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
