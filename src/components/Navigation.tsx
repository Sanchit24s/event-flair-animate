import { useState, useEffect } from 'react';
import { Menu, X, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logo from "@/assets/logo.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'process', label: 'Process' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  // Framer Motion Scroll detection
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 100);
  });

  // Active section tracking using IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navLinks.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          },
          {
            root: null,
            threshold: 0.4,
          }
        );
        observer.observe(section);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        top: isScrolled ? 16 : 0,
        left: isScrolled ? (window.innerWidth >= 1024 ? '12.5%' : '5%') : 0,
        width: isScrolled ? (window.innerWidth >= 1024 ? '75%' : '90%') : '100%',
        borderRadius: isScrolled ? 40 : 0,
      }}
      animate={{
        backgroundColor: isScrolled
          ? 'hsla(217, 33%, 17%, 0.2)'
          : 'hsla(0, 0%, 0%, 0)',
        backdropFilter: isScrolled ? 'blur(16px)' : 'blur(0px)',
        boxShadow: isScrolled
          ? '0 8px 32px hsla(217, 61%, 29%, 0.15)'
          : 'none',
        border: isScrolled
          ? '1px solid hsla(217, 33%, 17%, 0.3)'
          : '1px solid transparent',
      }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-1 cursor-pointer">
            <img src={logo} alt="Namah Events Logo" className="w-9 h-9 object-contain" />
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
                    ? 'text-gold'
                    : 'text-primary-foreground hover:text-gold'
                    }`}
                >
                  {label}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gold transform origin-left transition-transform duration-300 ${activeSection === id
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                  />
                </button>
              ))}

              {/* Dashboard Button */}
              <Button
                onClick={() => navigate('/dashboard')}
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

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: '0%', opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="mobile-menu lg:hidden absolute top-full left-0 right-0 bg-[hsla(217,33%,17%,0.25)] backdrop-blur-lg border-t border-[hsla(217,33%,17%,0.3)]"
        >
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`block w-full text-left px-3 py-3 font-inter text-base font-medium transition-colors duration-300 ${activeSection === id
                  ? 'text-gold bg-gold/10'
                  : 'text-primary-foreground hover:text-gold hover:bg-[hsla(217,33%,17%,0.1)]'
                  }`}
              >
                {label}
              </button>
            ))}

            {/* Mobile Dashboard Button */}
            <Button
              onClick={() => {
                navigate('/dashboard');
                setIsMenuOpen(false);
              }}
              className="w-full mt-4 gold-gradient text-navy font-semibold"
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Dashboard
            </Button>

          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navigation;