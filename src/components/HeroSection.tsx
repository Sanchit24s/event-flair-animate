import { useEffect, useRef } from 'react';
import { ArrowRight, Calendar, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
// Using uploaded luxury venue image

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);

      // Hero entrance animation timeline
      const tl = gsap.timeline({ delay: 0.8 });
      
      // Animate headline with split effect
      tl.fromTo(headlineRef.current, 
        { opacity: 0, y: 100, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 1.4, 
          ease: "power3.out",
        }
      )
      // Animate subheading
      .fromTo(sublineRef.current,
        { opacity: 0, y: 60 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power3.out" 
        },
        "-=0.8"
      )
      // Animate buttons with stagger
      .fromTo(buttonsRef.current?.children || [],
        { opacity: 0, y: 40, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: "back.out(1.4)" 
        },
        "-=0.6"
      )
      // Animate scroll indicator
      .fromTo(scrollIndicatorRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: "power2.out" 
        },
        "-=0.4"
      );

      // Parallax effect for background
      gsap.to(heroRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });

      // Scroll indicator fade out
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          if (scrollIndicatorRef.current) {
            gsap.to(scrollIndicatorRef.current, {
              opacity: 1 - self.progress,
              duration: 0.3
            });
          }
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
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        ref={heroRef}
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          backgroundImage: `url('/lovable-uploads/10d21a65-ac44-445e-af10-4a712e93815b.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      />

      {/* Left-side gradient overlay for contrast */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center lg:text-left lg:max-w-3xl flex items-center min-h-[80vh]">
          <div className="w-full">
            {/* Main Headline */}
            <h1 
              ref={headlineRef}
              className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              style={{ 
                textShadow: '0 6px 24px rgba(0,0,0,0.8), 0 3px 12px rgba(0,0,0,0.6)' 
              }}
            >
              Extraordinary Events
              <span className="block text-gold-light mt-2">Crafted to Perfection</span>
            </h1>
            
            {/* Subheading */}
            <p 
              ref={sublineRef}
              className="font-inter text-lg sm:text-xl md:text-2xl font-semibold text-white/90 mb-12 max-w-2xl leading-relaxed"
              style={{ 
                textShadow: '0 4px 16px rgba(0,0,0,0.7)',
                filter: 'blur(0.3px)'
              }}
            >
              Luxury weddings, corporate galas, and celebrations that exceed every expectation
            </p>

            {/* CTA Buttons */}
            <div 
              ref={buttonsRef} 
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center"
            >
              <Button 
                onClick={() => scrollToSection('contact')}
                size="lg"
                className="gold-gradient text-navy font-medium px-12 py-7 text-lg tracking-wide hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-gold/50 border-0 uppercase"
              >
                Get Started
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              
              <Button 
                onClick={() => scrollToSection('services')}
                variant="outline"
                size="lg"
                className="border-2 border-white/90 text-white bg-white/5 backdrop-blur-sm hover:bg-white hover:text-navy px-12 py-7 text-lg font-medium tracking-wide transition-all duration-300 shadow-xl hover:scale-105 hover:shadow-white/30 uppercase"
              >
                <Calendar className="mr-3 h-5 w-5" />
                Explore Services
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 cursor-pointer group"
        onClick={() => scrollToSection('about')}
      >
        <div className="flex flex-col items-center animate-bounce">
          <span className="font-inter text-sm mb-3 group-hover:text-gold transition-colors duration-300">
            Scroll to discover
          </span>
          <div className="w-6 h-10 border-2 border-white/60 rounded-full relative group-hover:border-gold transition-colors duration-300">
            <div className="w-1 h-3 bg-white/80 rounded-full absolute left-1/2 top-2 transform -translate-x-1/2 animate-pulse group-hover:bg-gold transition-colors duration-300"></div>
          </div>
          <ChevronDown className="mt-2 h-5 w-5 text-white/60 group-hover:text-gold transition-colors duration-300" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;