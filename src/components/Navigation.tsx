import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'process', label: 'Process' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      gsap.registerPlugin(ScrollTrigger);

      // Navigation entrance animation
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );

      // Navbar background on scroll
      ScrollTrigger.create({
        trigger: document.body,
        start: "100px top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (navRef.current) {
            navRef.current.style.backgroundColor = self.progress > 0
              ? 'rgba(10, 14, 35, 0.95)'
              : 'rgba(10, 14, 35, 0.7)';
          }
        }
      });

      // Active section tracking
      navLinks.forEach(({ id }) => {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: "top 20%",
          end: "bottom 20%",
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        });
      });
    };

    loadGSAP();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = async () => {
    const { gsap } = await import('gsap');
    setIsMenuOpen(!isMenuOpen);

    if (!isMenuOpen) {
      gsap.fromTo('.mobile-menu',
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.4, ease: "power3.out" }
      );
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: 'rgba(10, 14, 35, 0.7)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="font-playfair text-2xl lg:text-3xl font-bold text-white">
              Namah <span className="text-gold">Events</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`font-inter px-3 py-2 text-sm font-medium transition-all duration-300 relative group ${activeSection === id
                      ? 'text-gold'
                      : 'text-white hover:text-gold'
                    }`}
                >
                  {label}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gold transform origin-left transition-transform duration-300 ${activeSection === id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}></span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="text-white hover:text-gold hover:bg-white/10"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mobile-menu lg:hidden absolute top-full left-0 right-0 bg-navy/95 backdrop-blur-lg border-t border-white/10">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`block w-full text-left px-3 py-3 font-inter text-base font-medium transition-colors duration-300 ${activeSection === id
                    ? 'text-gold bg-gold/10'
                    : 'text-white hover:text-gold hover:bg-white/5'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;