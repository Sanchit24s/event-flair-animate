import { useEffect, useRef } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
// Using uploaded image directly

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Import GSAP dynamically to avoid SSR issues
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);

      // Hero entrance animation
      const tl = gsap.timeline({ delay: 0.5 });
      
      tl.fromTo(headlineRef.current, 
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      )
      .fromTo(sublineRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(buttonsRef.current?.children || [],
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.2, ease: "back.out(1.7)" },
        "-=0.4"
      );

      // Parallax effect for background
      gsap.to(heroRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    };

    loadGSAP();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        ref={heroRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(/lovable-uploads/51be29fe-c0bf-4b38-9209-5b733c9fc311.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 
          ref={headlineRef}
          className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight"
          style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
        >
          Crafting Experiences
          <span className="block text-gold">That Inspire</span>
        </h1>
        
        <p 
          ref={sublineRef}
          className="font-inter text-lg sm:text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
        >
          Weddings, Corporate Events, and Celebrations — Planned to Perfection
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => scrollToSection('contact')}
            size="lg"
            className="gold-gradient text-navy font-semibold px-8 py-4 text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-gold/50"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            onClick={() => scrollToSection('services')}
            variant="outline"
            size="lg"
            className="border-2 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-navy px-8 py-4 text-lg transition-all duration-300 shadow-xl"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Explore Services
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll to discover</span>
          <div className="w-1 h-8 bg-white/30 rounded-full relative">
            <div className="w-1 h-3 bg-gold rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;