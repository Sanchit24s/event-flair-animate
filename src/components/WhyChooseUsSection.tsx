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
        const heading = sectionRef.current.querySelector('.section-title');
        const subtitle = sectionRef.current.querySelector('.section-subtitle');
        const features = sectionRef.current.querySelectorAll('.feature-item');
        
        // Create a timeline for smoother sequenced animations
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse",
          }
        });

        // Animate image with smooth slide and scale
        tl.fromTo(image, 
          { 
            opacity: 0, 
            x: -60, 
            scale: 0.95,
            rotationY: 5
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            rotationY: 0,
            duration: 1.2,
            ease: "power3.out",
          }
        )
        
        // Animate heading
        .fromTo(heading,
          { 
            opacity: 0, 
            y: 30,
            scale: 0.98
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
          }, 
          "-=0.6"
        )
        
        // Animate subtitle
        .fromTo(subtitle,
          { 
            opacity: 0, 
            y: 20 
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          }, 
          "-=0.4"
        )
        
        // Animate features with smooth stagger
        .fromTo(features, 
          { 
            opacity: 0, 
            y: 30,
            x: 20,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration: 0.8,
            stagger: {
              amount: 0.4,
              ease: "power2.out"
            },
            ease: "back.out(1.2)",
          }, 
          "-=0.3"
        );

        // Add hover animations for features
        features.forEach((feature) => {
          const icon = feature.querySelector('.feature-icon');
          const text = feature.querySelector('.feature-text');
          
          feature.addEventListener('mouseenter', () => {
            gsap.to(feature, {
              scale: 1.02,
              y: -2,
              duration: 0.3,
              ease: "power2.out"
            });
            gsap.to(icon, {
              scale: 1.1,
              rotation: 5,
              duration: 0.3,
              ease: "back.out(1.7)"
            });
          });
          
          feature.addEventListener('mouseleave', () => {
            gsap.to(feature, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out"
            });
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        });
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
              <h2 className="section-title font-playfair text-3xl lg:text-4xl font-bold text-navy mb-3">
                Why Choose Us?
              </h2>
              <p className="section-subtitle font-inter text-muted-foreground text-lg">
                Your vision, our commitment - here's what sets us apart.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="feature-item bg-card rounded-xl p-4 shadow-sm border border-border/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    {/* Check Icon */}
                    <div className="feature-icon flex-shrink-0 w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center transition-all duration-300">
                      <Check className="w-4 h-4 text-gold" strokeWidth={2.5} />
                    </div>

                    {/* Feature Text */}
                    <span className="feature-text font-inter text-foreground text-base font-medium transition-colors duration-300">
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