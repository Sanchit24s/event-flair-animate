"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ✅ Use your images here
import casinoImage from "@/assets/casino-hero.jpg";
import weddingImage from "@/assets/wedding-hero.jpg";
import corporateImage from "@/assets/corporate-hero.webp";
import eventImage from "@/assets/event-hero.webp";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const images = [
    { src: weddingImage, alt: "Wedding Event" },
    { src: corporateImage, alt: "Corporate Event" },
    { src: casinoImage, alt: "Casino Event" },
    { src: eventImage, alt: "Luxury Celebration" },
  ];

  const [activeImage, setActiveImage] = useState(0);

  // ✅ Auto-cycle logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % images.length);
    }, 5000); // 5s per image
    return () => clearInterval(interval);
  }, [images.length]);

  // ✅ GSAP animations
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
      {/* ✅ Auto-expanding background images */}
      <div className="absolute inset-0 flex w-full h-full justify-center items-center gap-2 z-0" style={{ boxSizing: "border-box", flexShrink: 0 }}>
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-2xl will-change-[width,transform]"
            initial={{ width: "5rem", height: "100%" }}
            animate={{
              width: activeImage === index ? "80%" : "calc(6rem - 0.25rem)", // Refined inactive width
              height: "100%",
            }}
            transition={{
              duration: 1.4, // Exact duration from second code
              ease: [0.645, 0.045, 0.355, 1], // Exact easing from second code
              type: "tween", // Exact tween type from second code
            }}
            style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }} // Enhanced rendering
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover object-center"
              style={{ transformOrigin: "center" }} // Keep original centering
            />
            <AnimatePresence>
              {activeImage === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1.4, // Exact duration from second code
                    ease: [0.645, 0.045, 0.355, 1], // Exact easing from second code
                  }}
                  className="absolute inset-0 bg-black"
                />
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Overlay gradient for contrast (lighter version) */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/60 via-black/40 to-transparent to-[70%]"></div>


      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center lg:text-left lg:max-w-3xl flex items-center min-h-[80vh]">
          <div className="w-full">
            <h1
              ref={headlineRef}
              className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-3 leading-snug"
            >
              Designing Experiences
              <span className="block text-gold-light mt-2">
                That Last Forever
              </span>
            </h1>
            <p
              ref={sublineRef}
              className="font-inter text-sm sm:text-base md:text-lg font-normal text-white/80 mb-8 max-w-lg leading-relaxed"
            >
              From weddings to corporate galas, from intimate gatherings to
              luxury celebrations — we make every moment unforgettable
            </p>
            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center"
            >
              <Button
                onClick={() => scrollToSection("contact")}
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
    </section>
  );
};

export default HeroSection;