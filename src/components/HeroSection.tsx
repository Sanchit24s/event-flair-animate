"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ContactFormPopup from "./ContactFormPopUp";

import casinoImage from "@/assets/casino-hero.webp";
import weddingImage from "@/assets/wedding-hero.webp";
import corporateImage from "@/assets/corporate-hero.webp";
import eventImage from "@/assets/event-hero.webp";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const images = [
    { src: weddingImage, alt: "Wedding Event" },
    { src: corporateImage, alt: "Corporate Event" },
    { src: casinoImage, alt: "Casino Event" },
    { src: eventImage, alt: "Luxury Celebration" },
  ];

  const [activeImage, setActiveImage] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Preload images to prevent loading delays
  useEffect(() => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image.src;
    });
  }, [images]);

  // Auto-cycle logic with restart functionality
  const startAutoCycle = (startFrom: number = activeImage) => {
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start new interval from the specified image
    intervalRef.current = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % images.length);
    }, 5000); // 5s per image
  };

  // Handle image click - Enhanced for better functionality
  const handleImageClick = (index: number, event: React.MouseEvent) => {
    // Prevent event bubbling
    event.stopPropagation();

    // Only allow clicks on desktop (when images are visible as strips)
    if (window.innerWidth >= 1024 && index !== activeImage) {
      console.log(`Clicking image ${index}`); // Debug log
      setActiveImage(index);
      // Clear current interval and start fresh from clicked image
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // Set a small delay before starting new cycle to let animation complete
      setTimeout(() => {
        startAutoCycle(index);
      }, 100);
    }
  };

  // Initial auto-cycle setup
  useEffect(() => {
    startAutoCycle();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length]);

  // GSAP animations
  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({ delay: 0.8 });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 100, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: "power3.out" }
      )
        .fromTo(
          sublineRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.8"
        )
        .fromTo(
          buttonsRef.current?.children || [],
          { opacity: 0, y: 40, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.4)",
          },
          "-=0.6"
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        );

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          if (scrollIndicatorRef.current) {
            gsap.to(scrollIndicatorRef.current, {
              opacity: 1 - self.progress,
              duration: 0.3,
            });
          }
        },
      });
    };

    loadGSAP();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center overflow-hidden"
    >
      {/* Mobile View: Smooth Rotating Background Images */}
      <div className="lg:hidden absolute inset-0 w-full h-full z-0">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out`}
            style={{
              backgroundImage: `url(${img.src})`,
              opacity: index === activeImage ? 1 : 0,
              zIndex: index === activeImage ? 1 : 0,
            }}
          />
        ))}
      </div>

      {/* Desktop View: Auto-expanding Background Images with Click Functionality */}
      <div className="hidden lg:flex absolute inset-0 w-full h-full justify-center items-center gap-2 z-[1]" style={{ boxSizing: "border-box", flexShrink: 0 }}>
        {images.map((image, index) => (
          <motion.div
            key={index}
            className={cn(
              "relative overflow-hidden rounded-2xl will-change-[width,transform] group",
              activeImage === index ? "cursor-default" : "cursor-pointer"
            )}
            initial={{ width: "5rem", height: "100%" }}
            animate={{
              width: activeImage === index ? "80%" : "calc(6rem - 0.25rem)",
              height: "100%",
            }}
            transition={{
              duration: 1.4,
              ease: [0.645, 0.045, 0.355, 1],
              type: "tween",
            }}
            style={{
              backfaceVisibility: "hidden",
              transform: "translateZ(0)",
              cursor: activeImage === index ? "default" : "pointer",
              zIndex: activeImage === index ? 1 : 5,
              position: 'relative'
            }}
            onClick={(e) => handleImageClick(index, e)}
            onMouseDown={(e) => e.stopPropagation()}
            whileHover={{
              scale: activeImage === index ? 1 : 1.02,
            }}
            whileTap={{
              scale: activeImage === index ? 1 : 0.98
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover object-center transition-all duration-300"
              style={{
                transformOrigin: "center",
                pointerEvents: "none"
              }}
            />
            <AnimatePresence>
              {activeImage === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1.4,
                    ease: [0.645, 0.045, 0.355, 1],
                  }}
                  className="absolute inset-0 bg-black pointer-events-none"
                />
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Overlay Gradient (Adjusted for responsiveness) */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/80 via-black/60 to-transparent to-[60%] lg:from-black/60 lg:via-black/40 lg:to-transparent lg:to-[70%] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-3xl ml-4 md:ml-24 lg:ml-32 px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center lg:text-left lg:max-w-xl flex items-center min-h-[50vh]">
          <div className="w-full">
            <h1
              ref={headlineRef}
              className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-3 leading-snug"
              style={{
                textShadow: '0 4px 16px rgba(0,0,0,0.7), 0 2px 6px rgba(0,0,0,0.5)',
              }}
            >
              Designing Experiences
              <span className="block text-gold-light mt-2">That Last Forever</span>
            </h1>
            <p
              ref={sublineRef}
              className="font-inter text-sm sm:text-base md:text-lg font-normal text-white/80 mb-8 max-w-lg leading-relaxed"
              style={{
                textShadow: '0 3px 12px rgba(0,0,0,0.5)',
                filter: 'blur(0.2px)',
              }}
            >
              From weddings to corporate galas, from intimate gatherings to luxury celebrations — we make every moment unforgettable
            </p>
            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center"
            >
              <Button
                onClick={() => setIsPopupOpen(true)}
                size="sm"
                className="gold-gradient text-navy font-medium px-6 py-3 text-sm tracking-wide transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-gold/40 border-0 uppercase"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                onClick={() => scrollToSection("services")}
                variant="outline"
                size="sm"
                className="border border-white/70 text-white bg-white/5 backdrop-blur-sm hover:bg-white hover:text-navy px-6 py-3 text-sm font-medium tracking-wide transform transition-all duration-300 shadow hover:scale-105 hover:shadow-white/20 uppercase"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Explore Services
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 cursor-pointer group z-10"
        onClick={() => scrollToSection("about")}
      >
        <div className="flex flex-col items-center animate-bounce">
          <span className="font-inter text-sm mb-3 group-hover:text-gold transition-colors duration-300">
            Scroll to discover
          </span>
          <div className="w-6 h-10 border-2 border-white/60 rounded-full relative group-hover:border-gold transition-colors duration-300">
            <div className="w-1 h-3 bg-white/80 rounded-full absolute left-1/2 top-2 transform -translate-x-1/2 animate-pulse group-hover:bg-gold transition-colors duration-300"></div>
          </div>
          <ChevronDown className="mt-2 h-5 w-5 text-white/60 group-hover:text-gold transition-colors duration-300" />
        </div>
      </div>

      {/* Contact Form Popup */}
      <ContactFormPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </section>
  );
};

export default HeroSection;