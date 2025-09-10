import { useEffect, useRef } from 'react';
import { Heart, Users, Award } from 'lucide-react';
import founderImage from '@/assets/founder-image.jpg';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 0.9, x: -60 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(contentRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    };

    loadGSAP();
  }, []);

  const stats = [
    { icon: Heart, number: "500+", label: "Memorable Events" },
    { icon: Users, number: "10K+", label: "Happy Clients" },
    { icon: Award, number: "15+", label: "Years Experience" }
  ];

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8 items-center">

          {/* Founder Image */}
          <div ref={imageRef} className="relative flex flex-col lg:pl-32 items-start">
            <div className="rounded-2xl overflow-hidden shadow-xl max-w-sm w-full">
              <img
                src={founderImage}
                alt="Jimish R Shah - Founder & Creative Director"
                className="w-full h-auto object-cover aspect-[3/4]"
              />
            </div>
            <div className="mt-4 text-left">
              <h4 className="font-semibold text-navy text-xl mb-1">Jimish R Shah</h4>
              <p className="text-muted-foreground">Founder & Creative Director</p>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-6">
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-navy leading-tight">
              Creating Moments That <span className="text-gold">Last Forever</span>
            </h2>

            <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
              <p>
                At NAMAH EVENTS, we believe every event tells a story – and we make sure yours is unforgettable. From intimate gatherings to grand celebrations, our team brings creativity, precision, and passion to every detail.
              </p>
              <p>
                With years of expertise in weddings, corporate events, social functions, and luxury celebrations, we are known for seamless planning, stunning décor, and flawless execution.
              </p>
            </div>

            <blockquote className="italic text-xl text-navy font-playfair pl-6 border-l-4 border-gold my-6">
              "Excellence is not a skill, it's an attitude we bring to every event."
              <cite className="block text-base font-inter text-muted-foreground mt-3">
                — Jimish R Shah, Founder & Creative Director
              </cite>
            </blockquote>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gold/10 text-gold">
                    <stat.icon size={16} />
                  </div>
                  <div>
                    <div className="font-playfair text-2xl font-bold text-navy">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
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