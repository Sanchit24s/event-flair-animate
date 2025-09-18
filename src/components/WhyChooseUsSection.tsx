import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import elegantEventImage from '@/assets/elegant-event-moment.jpg';
import corporateEventImage from '@/assets/corporate-event.jpg';

const WhyChooseUsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const loadAnimations = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (sectionRef.current) {
        const imageContainer = sectionRef.current.querySelector('.event-images');
        const images = sectionRef.current.querySelectorAll('.single-image');
        const heading = sectionRef.current.querySelector('.section-title');
        const subtitle = sectionRef.current.querySelector('.section-subtitle');
        const features = sectionRef.current.querySelectorAll('.feature-item');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse",
          }
        });

        tl.fromTo(images,
          { opacity: 0, x: -60, scale: 0.95, rotationY: 5 },
          { opacity: 1, x: 0, scale: 1, rotationY: 0, duration: 1.2, stagger: 0.2, ease: "power3.out" }
        )
          .fromTo(heading,
            { opacity: 0, y: 30, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" },
            "-=0.6"
          )
          .fromTo(subtitle,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.4"
          )
          .fromTo(features,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" },
            "-=0.3"
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
      className="relative py-20 lg:py-28 bg-gradient-to-b from-background via-background/95 to-background overflow-hidden"
    >
      {/* Subtle patterned background */}
      <div className="absolute inset-0 bg-pattern opacity-5 pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Images */}
          <div className="event-images relative flex flex-col sm:flex-row lg:flex-col gap-6 lg:gap-10">
            <div className="single-image relative rounded-3xl overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-all duration-500">
              <img
                src={elegantEventImage}
                alt="Elegant wedding celebration with beautiful decor and happy guests"
                className="w-full h-[300px] sm:h-[400px] lg:h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent"></div>
            </div>
            <div className="single-image relative rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500 sm:w-2/3 lg:w-full sm:ml-auto">
              <img
                src={corporateEventImage}
                alt="Professional corporate event with elegant setup"
                className="w-full h-[220px] sm:h-[280px] lg:h-[320px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent"></div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="content-section relative z-10">
            <div className="mb-10">
              <h2 className="section-title font-playfair text-4xl lg:text-5xl font-extrabold text-navy mb-4 tracking-tight leading-snug">
                Why Choose Us?
              </h2>
              <p className="section-subtitle font-inter text-muted-foreground text-lg lg:text-xl max-w-xl">
                Transforming your vision into unforgettable moments with our expertise.
              </p>
            </div>

            <div className="space-y-5">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="feature-item group bg-card rounded-2xl p-6 shadow-lg border border-border/20 
                             hover:border-gold/40 hover:shadow-xl transition-all duration-500 cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className="feature-icon flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-gold/10 border border-gold/40 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Check className="w-6 h-6 text-gold" strokeWidth={2.5} />
                    </div>
                    <span className="feature-text font-inter text-foreground text-lg font-semibold group-hover:text-navy transition-colors">
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
