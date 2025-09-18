import { useEffect, useRef, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
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

  const testimonials = [
    {
      name: "Sarah & Michael Johnson",
      event: "Wedding",
      rating: 5,
      text: "Elegant Events made our dream wedding come true. Every detail was perfect, from the stunning floral arrangements to the seamless coordination. Our guests are still talking about how magical the evening was.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "David Chen",
      event: "Corporate Gala",
      rating: 5,
      text: "The professionalism and attention to detail exceeded our expectations. The team managed our annual gala for 500 attendees flawlessly. The event was sophisticated, engaging, and perfectly executed.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Maria Rodriguez",
      event: "50th Birthday Party",
      rating: 5,
      text: "My birthday celebration was absolutely incredible! The team transformed the venue into a magical space that perfectly captured my vision. Every guest was amazed by the elegance and beauty of the event.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Robert & Emma Wilson",
      event: "25th Anniversary",
      rating: 5,
      text: "Celebrating our silver anniversary with Elegant Events was the best decision we made. They created an intimate yet grand celebration that honored our journey together. Simply unforgettable.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-gold fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section id="testimonials" ref={sectionRef} className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-navy mb-6">
            What Our Clients
            <span className="text-gold"> Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about their experiences with Elegant Events.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 p-12">
                  <div className="text-center">
                    {/* Quote Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 text-gold mb-8">
                      <Quote size={32} />
                    </div>

                    {/* Rating */}
                    <div className="flex justify-center items-center mb-6">
                      {renderStars(testimonial.rating)}
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-xl lg:text-2xl text-navy font-playfair italic leading-relaxed mb-8 max-w-3xl mx-auto">
                      "{testimonial.text}"
                    </blockquote>

                    {/* Client Info */}
                    <div className="flex items-center justify-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-gold/20 mr-4"
                      />
                      <div className="text-left">
                        <div className="font-semibold text-navy text-lg">
                          {testimonial.name}
                        </div>
                        <div className="text-muted-foreground">
                          {testimonial.event}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="sm"
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full w-12 h-12 p-0 hover:bg-gold hover:text-white hover:border-gold transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full w-12 h-12 p-0 hover:bg-gold hover:text-white hover:border-gold transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                    ? 'bg-gold scale-125'
                    : 'bg-gray-300 hover:bg-gold/50'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-border">
          <div className="text-center">
            <div className="text-3xl font-playfair font-bold text-navy mb-2">50+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">Events Planned</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-playfair font-bold text-navy mb-2">98%</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-playfair font-bold text-navy mb-2">5+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-playfair font-bold text-navy mb-2">24/7</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;