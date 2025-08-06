import React, { useEffect, useRef } from 'react';
import { Heart, Building2, Palette, Star } from 'lucide-react';
import weddingEvent from '@/assets/wedding-event.jpg';
import corporateEvent from '@/assets/corporate-event.jpg';
import privateParty from '@/assets/private-party.jpg';

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);

      // Animate service cards on scroll
      if (cardsRef.current?.children) {
        gsap.fromTo(cardsRef.current.children,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    };

    loadGSAP();
  }, []);

  const services = [
    {
      title: "WEDDING PLANNING",
      image: weddingEvent,
      icon: Heart,
    },
    {
      title: "CORPORATE EVENTS",
      image: corporateEvent,
      icon: Building2,
    },
    {
      title: "DECOR STYLING",
      image: privateParty,
      icon: Palette,
    },
    {
      title: "ENTERTAINMENT",
      image: weddingEvent,
      icon: Star,
    }
  ];

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="font-playfair text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Our Services
          </h2>
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-3xl h-[400px] shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300"></div>
              
              {/* Curved Gold Accent */}
              <div className="absolute top-0 left-0 w-2/3 h-full">
                <div className="relative w-full h-full bg-black/80 rounded-r-[100px] flex items-center justify-start pl-8 pr-16">
                  {/* Gold curved border */}
                  <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-gold via-gold to-transparent rounded-full"></div>
                  
                  <div className="text-white">
                    {/* Icon */}
                    <div className="mb-6">
                      <service.icon className="h-12 w-12 text-gold" strokeWidth={1.5} />
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-bold text-2xl lg:text-3xl leading-tight tracking-wide">
                      {service.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;