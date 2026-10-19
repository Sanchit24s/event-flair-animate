import { useEffect, useRef, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { googleReviews, averageRating, reviewCount, initials } from '@/data/googleReviews';

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

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

  // Real Google reviews, in the clients' own words (see src/data/googleReviews.ts).
  // The longest few carry the carousel; the full set is on /reviews.
  const testimonials = googleReviews
    .filter((r) => r.text.length > 60)
    .slice(0, 6)
    .map((r) => ({ name: r.author, event: "Google review", rating: r.rating, text: r.text }));

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
            Rated {averageRating.toFixed(1)} from {reviewCount} reviews on Google. Here is what our clients wrote, in their own words.
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
                    <blockquote className="text-lg lg:text-xl text-navy font-playfair italic leading-relaxed mb-8 max-w-3xl mx-auto whitespace-pre-line line-clamp-[8]">
                      "{testimonial.text}"
                    </blockquote>

                    {/* Client Info */}
                    <div className="flex items-center justify-center">
                      <div
                        aria-hidden="true"
                        className="w-16 h-16 rounded-full bg-navy text-white flex items-center justify-center text-xl font-semibold border-4 border-gold/20 mr-4"
                      >
                        {initials(testimonial.name)}
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-navy text-lg capitalize">
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

          {/* All the reviews */}
          <div className="flex justify-center mt-6">
            <Button
              variant="outline"
              onClick={() => navigate('/reviews')}
              className="border-gold/40 hover:bg-gold hover:text-white"
            >
              Read all {reviewCount} Google reviews
            </Button>
          </div>

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