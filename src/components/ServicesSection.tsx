import { useEffect, useRef } from 'react';
import { ArrowRight, Heart, Building2, PartyPopper, Camera, Utensils, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

      // Animate cards with stagger effect
      gsap.fromTo(cardsRef.current?.children || [],
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
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

  const mainServices = [
    {
      title: "Weddings",
      description: "From intimate ceremonies to grand celebrations, we create wedding experiences that reflect your unique love story with impeccable attention to detail.",
      image: weddingEvent,
      icon: Heart,
      features: ["Venue Selection", "Decor & Design", "Vendor Coordination", "Day-of Management"]
    },
    {
      title: "Corporate Events",
      description: "Professional gatherings that make lasting impressions. From conferences to product launches, we deliver events that align with your business objectives.",
      image: corporateEvent,
      icon: Building2,
      features: ["Conference Planning", "Team Building", "Product Launches", "Awards Ceremonies"]
    },
    {
      title: "Private Parties",
      description: "Celebrate life's special moments with style. Birthday parties, anniversaries, and milestone celebrations crafted to create unforgettable memories.",
      image: privateParty,
      icon: PartyPopper,
      features: ["Birthday Celebrations", "Anniversary Parties", "Milestone Events", "Social Gatherings"]
    }
  ];

  const additionalServices = [
    { icon: Camera, title: "Photography & Videography", description: "Professional documentation of your special moments" },
    { icon: Utensils, title: "Catering Services", description: "Exquisite culinary experiences tailored to your taste" },
    { icon: Lightbulb, title: "Lighting & Production", description: "Atmospheric lighting and technical production services" }
  ];

  return (
    <section id="services" ref={sectionRef} className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-navy mb-6">
            Our Premium 
            <span className="text-gold"> Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We specialize in creating extraordinary experiences across a range of event types, 
            each crafted with meticulous attention to detail and personalized service.
          </p>
        </div>

        {/* Main Services Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mainServices.map((service, index) => (
            <Card key={index} className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent"></div>
                <div className="absolute top-4 left-4 p-3 rounded-full bg-white/20 backdrop-blur-sm">
                  <service.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <CardHeader className="pb-4">
                <CardTitle className="font-playfair text-2xl text-navy group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mr-3"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant="ghost" 
                  className="text-gold hover:text-gold-dark group mt-4 p-0 h-auto font-semibold"
                >
                  Learn More 
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Services */}
        <div className="border-t border-border pt-16">
          <h3 className="font-playfair text-3xl font-bold text-navy text-center mb-12">
            Additional Services
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 text-gold mb-6 group-hover:bg-gold group-hover:text-white transition-all duration-300 group-hover:scale-110">
                  <service.icon size={32} />
                </div>
                <h4 className="font-playfair text-xl font-semibold text-navy mb-3 group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h4>
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;