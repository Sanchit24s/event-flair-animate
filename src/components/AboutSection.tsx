import { useEffect, useRef } from 'react';
import { Heart, Users, Award } from 'lucide-react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);

      // Animate content on scroll
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 0.8, x: -100 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(contentRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
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

  const stats = [
    { icon: Heart, number: "500+", label: "Events Planned" },
    { icon: Users, number: "10K+", label: "Happy Clients" },
    { icon: Award, number: "15+", label: "Years Experience" }
  ];

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1519167758481-83f29c8bb5ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Elegant event setup"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent"></div>
            </div>
            
            {/* Floating stats */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 max-w-xs glass-effect">
              <div className="text-center">
                <div className="text-3xl font-playfair font-bold text-navy">500+</div>
                <div className="text-sm text-muted-foreground">Memorable Events</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-navy mb-6 leading-tight">
                Creating Moments That 
                <span className="text-gold"> Last Forever</span>
              </h2>
              
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  For over 15 years, Elegant Events has been the trusted partner for those who 
                  demand excellence in event planning. We believe that every celebration deserves 
                  to be extraordinary.
                </p>
                
                <p>
                  Our team of experienced professionals brings creativity, attention to detail, 
                  and flawless execution to every project. From intimate gatherings to grand 
                  celebrations, we craft experiences that reflect your unique vision.
                </p>
              </div>

              <blockquote className="italic text-xl text-navy font-playfair mt-8 pl-6 border-l-4 border-gold">
                "Excellence is not a skill, it's an attitude we bring to every event."
                <cite className="block text-base font-inter font-normal text-muted-foreground mt-2">
                  — Sarah Mitchell, Founder & Creative Director
                </cite>
              </blockquote>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 text-gold mb-3 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                    <stat.icon size={20} />
                  </div>
                  <div className="font-playfair text-2xl font-bold text-navy mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
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

export default AboutSection;