import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import GallerySection from '@/components/GallerySection';
import ProcessSection from '@/components/ProcessSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import TrustIndicators from '@/components/TrustIndicators';
import FloatingActionButtons from '@/components/FloatingActionButtons';
import ContactFormPopup from '@/components/ContactFormPopUp';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';

const Index = () => {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  // Automatic visitor tracking
  const { isTracking, counts, isNewVisitor, error } = useVisitorTracking();

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const initSmoothScrolling = async () => {
      const Lenis = (await import('lenis')).default;
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.2,
      });

      // the loop stops with the page; it used to keep running after Lenis was destroyed
      let frame = 0;
      function raf(time: number) {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      }

      frame = requestAnimationFrame(raf);

      // Update ScrollTrigger on scroll
      lenis.on('scroll', ScrollTrigger.update);

      // Cleanup function
      return () => {
        cancelAnimationFrame(frame);
        lenis.destroy();
      };
    };

    const cleanup = initSmoothScrolling();

    return () => {
      cleanup.then(cleanupFn => cleanupFn?.());
    };
  }, []);


  return (
    <div className="min-h-screen bg-background">
      <Navigation onContactClick={() => setIsContactPopupOpen(true)} />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <GallerySection />
        <ProcessSection />
        <WhyChooseUsSection />
        {/* <TestimonialsSection /> */}
        <TrustIndicators />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingActionButtons />

      <ContactFormPopup
        isOpen={isContactPopupOpen}
        onClose={() => setIsContactPopupOpen(false)}
      />
    </div>
  );
};

export default Index;
