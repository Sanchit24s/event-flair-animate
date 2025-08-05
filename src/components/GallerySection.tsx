import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GallerySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);

      // Animate gallery items
      gsap.fromTo(galleryRef.current?.children || [],
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
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

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1519167758481-83f29c8bb5ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Elegant Wedding Reception",
      category: "Wedding"
    },
    {
      src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Corporate Gala Evening",
      category: "Corporate"
    },
    {
      src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Birthday Celebration",
      category: "Private Party"
    },
    {
      src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Garden Wedding Ceremony",
      category: "Wedding"
    },
    {
      src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Product Launch Event",
      category: "Corporate"
    },
    {
      src: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Anniversary Party",
      category: "Private Party"
    }
  ];

  const scrollGallery = (direction: 'left' | 'right') => {
    const gallery = galleryRef.current;
    if (gallery) {
      const scrollAmount = 320; // Width of one card plus gap
      gallery.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="gallery" ref={sectionRef} className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-navy mb-6">
            Event 
            <span className="text-gold"> Gallery</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of beautifully crafted events that showcase our commitment to excellence and attention to detail.
          </p>
        </div>

        {/* Gallery Controls */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-sm text-muted-foreground">
            Swipe or use arrow keys to navigate
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => scrollGallery('left')}
              className="hover:bg-gold hover:text-white hover:border-gold transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => scrollGallery('right')}
              className="hover:bg-gold hover:text-white hover:border-gold transition-all duration-300"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div 
          ref={galleryRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="flex-shrink-0 w-80 group cursor-pointer"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
                <img 
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="text-xs uppercase tracking-wide text-gold mb-2">
                      {image.category}
                    </div>
                    <h3 className="font-playfair text-xl font-semibold mb-3">
                      {image.title}
                    </h3>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-white hover:text-gold p-0 h-auto group/btn"
                    >
                      View Details 
                      <ExternalLink className="ml-2 h-3 w-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                  {image.category}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline"
            size="lg"
            className="border-gold text-gold hover:bg-gold hover:text-white px-8 py-3 transition-all duration-300"
          >
            View Full Portfolio
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

    </section>
  );
};

export default GallerySection;