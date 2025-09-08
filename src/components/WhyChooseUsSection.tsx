import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import elegantEventImage from '@/assets/elegant-event-moment.jpg';

const WhyChooseUsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAnimations = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      gsap.registerPlugin(ScrollTrigger);

      if (sectionRef.current) {
        const image = sectionRef.current.querySelector('.event-image');
        const content = sectionRef.current.querySelector('.content-section');
        const features = sectionRef.current.querySelectorAll('.feature-item');
        
        // Animate image
        gsap.fromTo(image, 
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            }
          }
        );

        // Animate content section
        gsap.fromTo(content, 
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
            delay: 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            }
          }
        );

        // Animate features
        gsap.fromTo(features, 
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.5,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
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
      className="section-padding bg-background"
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Image */}
          <div className="event-image">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img 
                src={elegantEventImage} 
                alt="Elegant wedding celebration with beautiful decor and happy guests" 
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent"></div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="content-section">
            {/* Section Heading */}
            <div className="mb-8">
              <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-navy mb-3">
                Why Choose Us?
              </h2>
              <p className="font-inter text-muted-foreground text-lg">
                Your vision, our commitment - here's what sets us apart.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="feature-item bg-card rounded-xl p-4 shadow-sm border border-border/50 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-4">
                    {/* Check Icon */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                      <Check className="w-4 h-4 text-gold" strokeWidth={2.5} />
                    </div>

                    {/* Feature Text */}
                    <span className="font-inter text-foreground text-base font-medium group-hover:text-navy transition-colors duration-300">
                      {feature}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;