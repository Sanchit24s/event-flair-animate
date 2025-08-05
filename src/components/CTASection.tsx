import { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    };

    loadGSAP();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding bg-navy relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-gold blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-gold blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-rose blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div ref={sectionRef} className="text-center max-w-4xl mx-auto">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/20 text-gold mb-8 animate-pulse">
            <Sparkles size={40} />
          </div>

          {/* Headline */}
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Create Your
            <span className="block text-gold"> Perfect Event?</span>
          </h2>

          {/* Description */}
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Let's turn your vision into an unforgettable experience. Our team is ready to craft 
            something extraordinary just for you.
          </p>

          {/* CTA Button */}
          <Button 
            onClick={scrollToContact}
            size="lg"
            className="gold-gradient text-navy font-semibold px-10 py-4 text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-gold/50 group"
          >
            Start Planning Today
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>

          {/* Trust Elements */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-12 pt-8 border-t border-white/20">
            <div className="flex items-center text-white/80">
              <div className="w-2 h-2 rounded-full bg-gold mr-3"></div>
              <span className="text-sm">Free Initial Consultation</span>
            </div>
            <div className="flex items-center text-white/80">
              <div className="w-2 h-2 rounded-full bg-gold mr-3"></div>
              <span className="text-sm">Personalized Planning</span>
            </div>
            <div className="flex items-center text-white/80">
              <div className="w-2 h-2 rounded-full bg-gold mr-3"></div>
              <span className="text-sm">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;