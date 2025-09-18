import { useState, useEffect } from "react";
import { Menu, X, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInHero, setIsInHero] = useState(true);
  const navigate = useNavigate();

  const navLinks = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "gallery", label: "Gallery" },
    { id: "process", label: "Process" },
    { id: "contact", label: "Contact" },
  ];

  // Scroll detection
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100);
  });

  // Active section tracking
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navLinks.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActiveSection(id);
          },
          { threshold: 0.4 }
        );
        observer.observe(section);
        observers.push(observer);
      }
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Detect hero section
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInHero(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        top: isScrolled ? 16 : 0,
        left: isScrolled ? (window.innerWidth >= 1024 ? "12.5%" : "5%") : 0,
        width: isScrolled
          ? window.innerWidth >= 1024
            ? "75%"
            : "90%"
          : "100%",
        borderRadius: isScrolled ? 40 : 0,
      }}
      animate={{
        backgroundColor: isScrolled
          ? "hsla(217, 33%, 17%, 0.2)"
          : "hsla(0, 0%, 0%, 0)",
        backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
        boxShadow: isScrolled
          ? "0 8px 32px hsla(217, 61%, 29%, 0.15)"
          : "none",
        border: isScrolled
          ? "1px solid hsla(217, 33%, 17%, 0.3)"
          : "1px solid transparent",
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo (always rendered, background animated) */}
          <div className="flex items-center gap-2 cursor-pointer">
            {/* Animated Logo Only */}
            <motion.div
              animate={{
                backgroundColor: isInHero
                  ? "rgba(255,255,255,0)"
                  : "rgba(255,255,255,0.8)",
                padding: isInHero ? "0px" : "6px",
                borderRadius: isInHero ? "0px" : "9999px",
                boxShadow: isInHero ? "none" : "0 4px 16px rgba(0,0,0,0.15)",
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex items-center justify-center"
            >
              <img
                src={logo}
                alt="Namah Events Logo"
                className="w-8 h-8 object-contain"
              />
            </motion.div>

            {/* Static Company Name */}
            <h1 className="font-playfair text-2xl lg:text-3xl font-bold">
              <span className="text-primary-foreground">Namah</span>
              <span className="text-gold"> Events</span>
            </h1>
          </div>


          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-6">
              {navLinks.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`font-inter px-2 py-2 text-sm font-medium transition-all duration-300 relative group ${activeSection === id
                    ? "text-gold"
                    : "text-primary-foreground hover:text-gold"
                    }`}
                >
                  {label}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gold transform origin-left transition-transform duration-300 ${activeSection === id
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                      }`}
                  />
                </button>
              ))}
              <Button
                onClick={() => navigate("/dashboard")}
                className="ml-4 gold-gradient text-navy font-semibold hover:scale-105 transition-all duration-300"
                size="sm"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary-foreground hover:text-gold hover:bg-[hsla(217,33%,17%,0.1)]"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;