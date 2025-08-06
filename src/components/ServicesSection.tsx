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
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl h-[280px] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Curved Dark Overlay */}
              <div className="absolute top-0 left-0 w-3/5 h-full">
                <div className="relative w-full h-full bg-black/85 flex items-center justify-start pl-6 pr-8"
                     style={{
                       clipPath: 'polygon(0 0, 75% 0, 85% 100%, 0 100%)'
                     }}>
                  
                  <div className="text-white">
                    {/* Icon */}
                    <div className="mb-4">
                      <service.icon className="h-8 w-8 text-gold" strokeWidth={1.5} />
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-bold text-xl lg:text-2xl leading-tight tracking-wide">
                      {service.title}
                    </h3>
                  </div>
                </div>
              </div>
              
              {/* Gold accent line */}
              <div 
                className="absolute top-0 left-0 w-3/5 h-full border-r-2 border-gold/30"
                style={{
                  clipPath: 'polygon(0 0, 75% 0, 85% 100%, 0 100%)'
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;