import React, { useEffect, useRef, useState } from "react";
import {
  Heart,
  Building2,
  PartyPopper,
  Camera,
  Utensils,
  Lightbulb,
} from "lucide-react";
import weddingEvent from "@/assets/wedding-event.jpg";
import corporateEvent from "@/assets/corporate-event.jpg";
import privateParty from "@/assets/private-party.jpg";

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const serviceCardsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const mobileServiceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      // Animate mobile service cards
      if (window.innerWidth < 1024 && mobileServiceRefs.current.length) {
        mobileServiceRefs.current.forEach((card) => {
          if (card) {
            gsap.fromTo(
              card,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  end: "bottom 10%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        });
      }

      // Animate service cards on initial load
      if (serviceCardsRef.current?.children) {
        gsap.fromTo(
          serviceCardsRef.current.children,
          { opacity: 0, x: -50, y: 30 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: serviceCardsRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Pin image and update on service scroll
      if (imageRef.current && serviceCardsRef.current) {
        const services = Array.from(serviceCardsRef.current.children);
        const totalServices = services.length;

        services.forEach((service, index) => {
          ScrollTrigger.create({
            trigger: service,
            start: "top 60%", // Start when service enters viewport
            end: "bottom 60%",
            onEnter: () => updateImage(index),
            onEnterBack: () => updateImage(index),
            onLeave: () => { }, // Handle leaving if needed
            onLeaveBack: () => { }, // Handle leaving back if needed
            // markers: true
          });
        });

        // Pin the image during service scroll
        ScrollTrigger.create({
          trigger: serviceCardsRef.current,
          start: "top 20%", // Start pinning when services enter
          end: () => `+=${serviceCardsRef.current.offsetHeight / 1.4}`, // End after all services
          pin: imageRef.current,
          pinSpacing: true,
          scrub: true,
          anticipatePin: 1,
        });

        // Animate image on scroll
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.9, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 80%", // Start animation when top of image hits 80% of viewport
              end: "top 20%", // End when image is near the top
              toggleActions: "play none none reverse", // Play on enter, reverse on leave
            },
          }
        );

        // Function to handle smooth image transition
        function updateImage(index: any) {
          gsap.to(imageRef.current, {
            opacity: 0,
            scale: 0.95,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
              setActiveService(index); // Update active service after fade out
              gsap.fromTo(
                imageRef.current,
                { opacity: 0, scale: 0.95 },
                {
                  opacity: 1,
                  scale: 1,
                  duration: 0.5,
                  ease: "power2.inOut",
                }
              );
            },
          });
        }
      }
    };

    loadGSAP();
  }, []);

  const services = [
    {
      number: "01",
      title: "Weddings & Engagements",
      description:
        "From dreamy décor to curated ceremonies, we bring your love story to life with elegance and detail.",
      image: weddingEvent,
      icon: Heart,
      features: [
        "Dreamy Décor",
        "Curated Ceremonies",
        "Entertainment",
        "Logistics & On-Ground Execution",
      ],
    },
    {
      number: "02",
      title: "Corporate Events",
      description:
        "Conferences, product launches, award nights, and team-building retreats designed to impress and inspire.",
      image: corporateEvent,
      icon: Building2,
      features: [
        "Conferences",
        "Product Launches",
        "Award Nights",
        "Team-Building Retreats",
      ],
    },
    {
      number: "03",
      title: "Social Celebrations",
      description:
        "Birthdays, anniversaries, private parties, and family functions – we make every milestone unforgettable.",
      image: privateParty,
      icon: PartyPopper,
      features: [
        "Birthdays",
        "Anniversaries",
        "Private Parties",
        "Family Functions",
      ],
    },
    {
      number: "04",
      title: "Luxury Experiences",
      description:
        "Destination weddings, celebrity events, and VIP gatherings with flawless execution and luxury at every step.",
      image: weddingEvent,
      icon: Lightbulb,
      features: [
        "Destination Weddings",
        "Celebrity Events",
        "VIP Gatherings",
        "Full-Service Execution",
      ],
    },
  ];

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="font-playfair text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Our Premium
            <span className="text-gold"> Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We specialize in creating extraordinary experiences across a range
            of event types, each crafted with meticulous attention to detail and
            personalized service.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Service Cards */}
          <div ref={serviceCardsRef} className="space-y-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group cursor-pointer transition-all duration-500 ${activeService === index ? "scale-105" : "hover:scale-102"
                  }`}
              >
                <div className="flex items-start space-x-6 p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
                  {/* Service Number */}
                  <div
                    className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl transition-all duration-300 ${activeService === index
                      ? "bg-gold text-white shadow-lg shadow-gold/25"
                      : "bg-muted text-muted-foreground group-hover:bg-gold/20 group-hover:text-gold"
                      }`}
                  >
                    {service.number}
                  </div>

                  {/* Service Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <service.icon
                        className={`h-6 w-6 transition-colors duration-300 ${activeService === index
                          ? "text-gold"
                          : "text-muted-foreground group-hover:text-gold"
                          }`}
                      />
                      <h3
                        className={`font-playfair text-2xl font-semibold transition-colors duration-300 ${activeService === index
                          ? "text-gold"
                          : "text-foreground group-hover:text-gold"
                          }`}
                      >
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <div
                            className={`w-1.5 h-1.5 rounded-full mr-3 transition-colors duration-300 ${activeService === index
                              ? "bg-gold"
                              : "bg-muted-foreground group-hover:bg-gold"
                              }`}
                          ></div>
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Preview Image */}
          <div className="lg:sticky lg:top-8">
            <div
              ref={imageRef}
              className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src={services[activeService].image}
                alt={services[activeService].title}
                className="w-full h-full object-cover transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"></div>

              {/* Overlay Content */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    {React.createElement(services[activeService].icon, {
                      className: "h-6 w-6 text-white",
                    })}
                  </div>
                  <div className="text-white font-playfair text-3xl font-bold">
                    {services[activeService].title}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Stacked */}
        <div className="lg:hidden mt-16">
          <div className="space-y-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="space-y-6"
                ref={(el) => (mobileServiceRefs.current[index] = el)}
              >
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        {React.createElement(service.icon, {
                          className: "h-5 w-5 text-white",
                        })}
                      </div>
                      <div className="text-white font-playfair text-xl font-bold">
                        {service.title}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-card rounded-2xl border border-border/50">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold mr-3"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
