import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import whyChooseUsBg from '@/assets/why-choose-us-bg.jpg';

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
    {
      title: "Personalized Planning",
      description: "Every event is uniquely crafted to reflect your vision and style"
    },
    {
      title: "Creative & Innovative Concepts", 
      description: "Fresh ideas and cutting-edge designs that set your event apart"
    },
    {
      title: "Reliable Vendor Network",
      description: "Trusted partnerships with premium vendors and suppliers"
    },
    {
      title: "Transparent Pricing",
      description: "No hidden costs - clear, honest pricing from start to finish"
    },
    {
      title: "End-to-End Event Solutions",
      description: "Complete service from initial concept to final execution"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={whyChooseUsBg} 
          alt="Elegant event background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy/60 via-navy/30 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-16 section-heading">
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Why Choose Us?
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card group relative"
              >
                {/* Glass Card */}
                <div className="relative h-full p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-gold/20">
                  {/* Gold Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Check Icon */}
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 border-2 border-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Check className="w-8 h-8 text-gold" strokeWidth={3} />
                    </div>

                    {/* Title */}
                    <h3 className="font-playfair text-2xl font-semibold text-white mb-4 group-hover:text-gold transition-colors duration-300">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="font-inter text-white/80 leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>

                  {/* Subtle Border Glow */}
                  <div className="absolute inset-0 rounded-2xl border border-gold/0 group-hover:border-gold/30 transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Accent */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
              <span className="font-inter text-white/90 text-sm font-medium">
                Creating unforgettable moments since 2010
              </span>
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;