import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import whyChooseUsBg from '@/assets/why-choose-us-compact-bg.jpg';

const WhyChooseUsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAnimations = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      gsap.registerPlugin(ScrollTrigger);

      if (sectionRef.current) {
        const cards = sectionRef.current.querySelectorAll('.feature-card');
        
        gsap.fromTo(cards, 
          { 
            opacity: 0, 
            y: 50,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 30%",
            }
          }
        );

        // Animate heading
        gsap.fromTo(sectionRef.current.querySelector('.section-heading'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            }
          }
        );
      }
    };

    loadAnimations();
  }, []);

  const features = [
    "Personalized planning",
    "Creative & innovative concepts", 
    "Reliable vendor network",
    "Transparent pricing",
    "End-to-end event solutions"
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={whyChooseUsBg} 
          alt="Elegant bokeh background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy/60 via-navy/40 to-gold/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom">
        <div className="max-w-2xl mx-auto text-center">
          {/* Section Heading */}
          <div className="mb-12 section-heading">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-3">
              Why Choose Us?
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto"></div>
          </div>

          {/* Features List */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card flex items-center justify-center group"
              >
                <div className="flex items-center space-x-4 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  {/* Check Icon */}
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold/20 border border-gold flex items-center justify-center group-hover:bg-gold/30 transition-colors duration-300">
                    <Check className="w-3 h-3 text-gold" strokeWidth={3} />
                  </div>

                  {/* Feature Text */}
                  <span className="font-inter text-white text-lg font-medium group-hover:text-gold transition-colors duration-300">
                    {feature}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;