import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);

      // Animate form from left
      gsap.fromTo(formRef.current,
        { opacity: 0, x: -80 },
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

      // Animate info from right
      gsap.fromTo(infoRef.current,
        { opacity: 0, x: 80 },
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Message Sent!",
      description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 123-4568"],
      link: "tel:+15551234567"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@elegantevents.com", "planning@elegantevents.com"],
      link: "mailto:info@elegantevents.com"
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["123 Elegant Boulevard", "Suite 456, New York, NY 10001"],
      link: "https://maps.google.com"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
      link: null
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-navy mb-6">
            Let's Start 
            <span className="text-gold"> Planning</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your vision to life? Contact us today for a free consultation 
            and let's create something extraordinary together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div ref={formRef}>
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
              <h3 className="font-playfair text-2xl font-bold text-navy mb-6">
                Send us a message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      First Name *
                    </label>
                    <Input 
                      required
                      className="border-2 border-border focus:border-gold rounded-xl h-12"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Last Name *
                    </label>
                    <Input 
                      required
                      className="border-2 border-border focus:border-gold rounded-xl h-12"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Email Address *
                  </label>
                  <Input 
                    type="email"
                    required
                    className="border-2 border-border focus:border-gold rounded-xl h-12"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Phone Number
                  </label>
                  <Input 
                    type="tel"
                    className="border-2 border-border focus:border-gold rounded-xl h-12"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Event Type *
                  </label>
                  <Select required>
                    <SelectTrigger className="border-2 border-border focus:border-gold rounded-xl h-12">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="corporate">Corporate Event</SelectItem>
                      <SelectItem value="private">Private Party</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Tell us about your event *
                  </label>
                  <Textarea 
                    required
                    className="border-2 border-border focus:border-gold rounded-xl min-h-32 resize-none"
                    placeholder="Describe your vision, expected guest count, preferred date, and any special requirements..."
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full gold-gradient text-navy font-semibold h-12 text-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div ref={infoRef} className="space-y-8">
            <div>
              <h3 className="font-playfair text-2xl font-bold text-navy mb-6">
                Get in touch
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                We're here to help make your event dreams come true. Reach out to us through 
                any of the following channels, and we'll respond promptly.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 text-gold flex items-center justify-center mr-4 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy mb-1">{item.title}</h4>
                    {item.details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground">
                        {item.link && idx === 0 ? (
                          <a 
                            href={item.link}
                            className="hover:text-gold transition-colors duration-300"
                            target={item.link.startsWith('http') ? '_blank' : undefined}
                            rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          >
                            {detail}
                          </a>
                        ) : (
                          detail
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="h-64 bg-muted rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Office Location"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;