import { useEffect, useRef, useCallback } from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import bdayImage from "@/assets/birthday.jpg";
import casinoImage from "@/assets/Casino-night.jpg";
import floralWeddingImage from "@/assets/Floral-Wedding-stage.jpg";
import annualKickoffImage from "@/assets/Annual-Kickoff.jpg";
import techConference from "@/assets/Tech-Conference.jpg";
import corporatePerformanceImage from "@/assets/Corporate Performance.jpg";
import yellowThemeFloralStageImage from "@/assets/Yellow-Themed-Floral-Stage.jpg";
import tropicalWeddingImage from "@/assets/Tropical-Wedding-Mandap.jpg";
import pockerNightImage from "@/assets/Poker-night-event.jpg";

const GallerySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<any>(null);
  const carouselApi = useRef<any>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      gsap.registerPlugin(ScrollTrigger);

      // Animate section header
      gsap.fromTo(sectionRef.current?.querySelector('.gallery-header'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate gallery container
      gsap.fromTo(sectionRef.current?.querySelector('.gallery-container'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    };

    loadGSAP();
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (galleryRef.current?.api) {
        galleryRef.current.api.scrollNext();
      }
    }, 4000); // Auto-scroll every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const galleryImages = [
    {
      src: tropicalWeddingImage,
      title: "Tropical Wedding Mandap",
      category: "Wedding"
    },
    {
      src: floralWeddingImage,
      title: "Floral Wedding Stage",
      category: "Wedding"
    },
    {
      src: pockerNightImage,
      title: "Poker Night Event",
      category: "Private Party"
    },
    {
      src: casinoImage,
      title: "Casino Night Entrance",
      category: "Private Party"
    },
    {
      src: yellowThemeFloralStageImage,
      title: "Yellow Themed Floral Stage",
      category: "Haldi"
    },
    {
      src: corporatePerformanceImage,
      title: "Corporate Performance Review",
      category: "Corporate Event"
    },
    {
      src: techConference,
      title: "Tech Conference Entrance",
      category: "Corporate Event"
    },
    {
      src: annualKickoffImage,
      title: "Annual Kickoff Interview",
      category: "Corporate Event"
    },
    {
      src: bdayImage,
      title: "Birthday Celebration",
      category: "Private Party"
    }
  ];

  const setApi = useCallback((api: any) => {
    carouselApi.current = api;
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselApi.current) {
        carouselApi.current.scrollNext(); // ✅ embla API method
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="gallery-header text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-6">
            Event
            <span className="text-gold"> Gallery</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Explore our portfolio of beautifully crafted events that showcase our commitment to excellence and attention to detail.
          </p>
        </div>

        {/* Gallery Carousel */}
        <div className="gallery-container">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {galleryImages.map((image, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="group cursor-pointer">
                    <div className="relative h-60 md:h-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                          <div className="text-xs uppercase tracking-wide text-gold mb-2">
                            {image.category}
                          </div>
                          <h3 className="font-playfair text-lg md:text-xl font-semibold mb-3">
                            {image.title}
                          </h3>

                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                        {image.category}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 border-gold text-gold hover:bg-gold hover:text-white" />
            <CarouselNext className="hidden md:flex -right-12 border-gold text-gold hover:bg-gold hover:text-white" />
          </Carousel>
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