import { useEffect, useRef, useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import emailjs from "@emailjs/browser";
import { createContactSubmission } from "@/services/contactService";

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      // Animate form from left
      gsap.fromTo(
        formRef.current,
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
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate info from right
      gsap.fromTo(
        infoRef.current,
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
            toggleActions: "play none none reverse",
          },
        }
      );
    };

    loadGSAP();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const formPayload = {
        first_name: formData.get("firstName") as string,
        last_name: formData.get("lastName") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        event_type: formData.get("eventType") as string,
        message: formData.get("message") as string,
      };

      await createContactSubmission({
        ...formPayload,
        event_type: formPayload.event_type as "wedding" | "corporate" | "private" | "other",
      });

      toast({
        title: "Message Sent!",
        description:
          "Thank you for your inquiry. We'll get back to you within 24 hours.",
      });

      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 89836 10687", "+91 98691 23601"],
      link: null,
    },
    {
      icon: Mail,
      title: "Email",
      details: ["namaheventsofficial@gmail.com"],
      link: "mailto:namaheventsofficial@gmail.com",
    },
    {
      icon: MapPin,
      title: "Address",
      details: [
        "601, Crystal Heights",
        "Carter Rd Number 5, Khande Rao Dongari, Borivali East, Mumbai, Maharashtra 400066",
      ],
      link: "https://www.google.com/maps/place/Crystal+Heights,+Carter+Rd+Number+5,+Khande+Rao+Dongari,+Borivali+East,+Mumbai,+Maharashtra+400066",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
      link: null,
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding bg-muted/30"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-navy mb-6">
            Let's Start
            <span className="text-gold"> Planning</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your vision to life? Contact us today for a free
            consultation and let's create something extraordinary together.
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
                      name="firstName"
                      required
                      className="border-2 border-border focus:border-gold rounded-xl h-12"
                      placeholder="Amit"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Last Name *
                    </label>
                    <Input
                      name="lastName"
                      required
                      className="border-2 border-border focus:border-gold rounded-xl h-12"
                      placeholder="Sharma"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Email Address *
                  </label>
                  <Input
                    name="email"
                    type="email"
                    required
                    className="border-2 border-border focus:border-gold rounded-xl h-12"
                    placeholder="amit.sharma@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Phone Number
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    className="border-2 border-border focus:border-gold rounded-xl h-12"
                    placeholder="98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Event Type *
                  </label>
                  <Select name="eventType" required>
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
                    name="message"
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
                We're here to help make your event dreams come true. Reach out
                to us through any of the following channels, and we'll respond
                promptly.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 text-gold flex items-center justify-center mr-4 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy mb-1">
                      {item.title}
                    </h4>
                    {item.details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground">
                        {item.title === "Phone" ? (
                          <a
                            href={`tel:${detail.replace(/\s+/g, "")}`}
                            className="hover:text-gold transition-colors duration-300"
                          >
                            {detail}
                          </a>
                        ) : item.link && idx === 0 ? (
                          <a
                            href={item.link}
                            className="hover:text-gold transition-colors duration-300"
                            target={item.link.startsWith("http") ? "_blank" : undefined}
                            rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
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

            {/* Interactive Map */}
            <div
              className="h-64 bg-muted rounded-2xl overflow-hidden shadow-lg cursor-pointer"
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/place/Namah+Events/@19.2261619,72.8602555,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7b19cc92b2021:0xcea859e3de149d3e!8m2!3d19.2261619!4d72.8628304!16s%2Fg%2F11yk6bh_c3?entry=ttu&g_ep=EgoyMDI1MDkxNi4wIKXMDSoASAFQAw%3D%3D",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <MapContainer
                center={[19.2261, 72.8626]} // Coordinates for Borivali East, Mumbai
                zoom={16}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%", pointerEvents: "none" }} // disable direct map interaction
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[19.2261, 72.8626]}>
                  <Popup>
                    <div className="text-center">
                      <strong>Crystal Heights (601)</strong>
                      <br />
                      Carter Road No. 5, Borivali East
                      <br />
                      Mumbai 400066
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
