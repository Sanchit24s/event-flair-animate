import { useEffect, useRef, useState } from 'react';
import { Search, PenTool, Sparkles, MessageSquare } from 'lucide-react';
import ContactFormPopup from './ContactFormPopUp';

const ProcessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      gsap.registerPlugin(ScrollTrigger);

      // Animate connecting line
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate steps with stagger
      gsap.fromTo(stepsRef.current?.children || [],
        { opacity: 0, y: 80, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      );
    };

    loadGSAP();
  }, []);

  const steps = [
    {
      icon: Search,
      title: "Discovery",
      description: "We begin by understanding your vision, preferences, and requirements through detailed consultations.",
      details: ["Initial consultation", "Vision mapping", "Budget planning", "Timeline creation"]
    },
    {
      icon: PenTool,
      title: "Planning",
      description: "Our team crafts a comprehensive plan, handling every detail from venue selection to vendor coordination.",
      details: ["Venue selection", "Vendor sourcing", "Design concepts", "Detailed planning"]
    },
    {
      icon: Sparkles,
      title: "Execution",
      description: "On event day, we manage every aspect to ensure seamless execution and an unforgettable experience.",
      details: ["Setup coordination", "Vendor management", "Timeline execution", "Problem solving"]
    },
    {
      icon: MessageSquare,
      title: "Follow-up",
      description: "We gather feedback and provide post-event support to ensure your complete satisfaction.",
      details: ["Event recap", "Photo delivery", "Feedback collection", "Future planning"]
    }
  ];

  return (
    <section id="process" ref={sectionRef} className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-navy mb-6">
            Our
            <span className="text-gold"> Process</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We follow a proven methodology that ensures every event is planned and executed flawlessly,
            from initial concept to final celebration.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-gold via-gold to-gold transform origin-left"
            style={{ top: '6rem' }}
          />

          <div ref={stepsRef} className="grid lg:grid-cols-4 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step Number */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 lg:left-12 lg:translate-x-0">
                  <div className="w-12 h-12 rounded-full bg-gold text-white font-bold text-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                    {index + 1}
                  </div>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-2xl p-8 pt-12 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border border-transparent hover:border-gold/20">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 text-gold mb-6 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                    <step.icon size={32} />
                  </div>

                  {/* Title */}
                  <h3 className="font-playfair text-2xl font-bold text-navy mb-4 group-hover:text-gold transition-colors duration-300">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Details List */}
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 -right-6 text-gold/30">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 4L16 12L8 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <button
            onClick={() => setIsPopupOpen(true)}
            className="inline-flex items-center px-6 py-3 bg-gold/10 rounded-full text-gold font-medium mb-8 hover:bg-gold hover:text-white transition-all duration-300"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Ready to start your journey?
          </button>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's schedule a consultation to discuss your vision and see how we can bring it to life.
          </p>
          <ContactFormPopup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
          />
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;