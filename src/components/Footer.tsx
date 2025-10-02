import { Heart, MapPin, Phone, Mail, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import logo from "@/assets/logo.png";

const Footer = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate to home first
    if (window.location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { label: 'About Us', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Portfolio', id: 'gallery' },
    { label: 'Process', id: 'process' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Contact', id: 'contact' }
  ];

  const services = [
    'Weddings & Engagements',
    'Corporate Events',
    'Social Celebrations',
    'Luxury Experiences',
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/namaheventsofficial', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/share/1BPSqcQfGJ/?mibextid=wwXIfr', label: 'Facebook' },
  ];

  return (
    <footer className="bg-navy text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gold blur-3xl"></div>
        <div className="absolute bottom-40 right-40 w-48 h-48 rounded-full bg-rose blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container-custom py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="md:col-span-2 lg:col-span-1 text-center md:text-left">
              <div className="flex items-center justify-center gap-1 md:justify-start mb-6">
                <button
                  onClick={() => scrollToSection('hero')}
                  className="flex items-center gap-1 text-xl md:text-2xl font-playfair font-bold text-white hover:text-gold transition-colors duration-300"
                >
                  <img src={logo} alt="Namah Events Logo" className="w-6 h-6 object-contain" />
                  <span className="text-primary-foreground">Namah</span>
                  <span className="text-gold"> Events</span>
                </button>
              </div>

              <p className="text-white/80 mb-6 leading-relaxed text-sm md:text-base">
                Creating extraordinary experiences through meticulous planning and flawless execution.
                Your vision, our expertise, unforgettable memories.
              </p>

              {/* Social Links */}
              <div className="flex justify-center md:justify-start space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="font-playfair text-lg font-semibold mb-6 text-gold">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-white/80 hover:text-gold transition-colors duration-300 text-left text-sm md:text-base"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="text-center md:text-left">
              <h3 className="font-playfair text-lg font-semibold mb-6 text-gold">
                Services
              </h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service} className="text-white/80 hover:text-gold transition-colors duration-300 cursor-pointer text-sm md:text-base">
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="md:col-span-2 lg:col-span-1 text-center md:text-left">
              <h3 className="font-playfair text-lg font-semibold mb-6 text-gold">
                Contact Info
              </h3>
              <div className="space-y-4">
                <div className="flex items-start justify-center md:justify-start">
                  <MapPin className="w-5 h-5 text-gold mt-1 mr-3 flex-shrink-0" />
                  <div className="text-white/80 text-sm md:text-base">
                    <p>601, Crystal Heights</p>
                    <p>Karter Road No 5, Borivali East, Mumbai 400066</p>
                  </div>
                </div>

                <div className="flex items-center justify-center md:justify-start">
                  <Phone className="w-5 h-5 text-gold mr-3" />
                  <div className="flex flex-col space-y-1 text-sm md:text-base">
                    <a
                      href="tel:+918983610687"
                      className="text-white/80 hover:text-gold transition-colors duration-300"
                    >
                      +91 89836 10687
                    </a>
                    <a
                      href="tel:++919869123601"
                      className="text-white/80 hover:text-gold transition-colors duration-300"
                    >
                      +91 9869123601
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-center md:justify-start">
                  <Mail className="w-5 h-5 text-gold mr-3" />
                  <a
                    href="mailto:namaheventsofficial@gmail.com"
                    className="text-white/80 hover:text-gold transition-colors duration-300 text-sm md:text-base"
                  >
                    namaheventsofficial@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20">
          <div className="container-custom py-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4 md:gap-0">

              {/* Left Section */}
              <div className="flex flex-col items-center md:items-start text-white/60 text-xs md:text-sm space-y-1">
                <div className="flex flex-wrap items-center justify-center md:justify-start">
                  <span>© 2025 Namah Events. Made with</span>
                  <Heart className="w-4 h-4 text-gold mx-1 fill-current" />
                  <span>for creating memorable experiences.</span>
                </div>
                <div className="text-center lg:pl-64 md:text-left">
                  <a
                    href="https://finzarc.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:underline"
                  >
                    by Finzarc
                  </a>
                </div>
              </div>


              {/* Right Section */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm">
                <a
                  href="#"
                  className="text-white/60 hover:text-gold transition-colors duration-300"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-white/60 hover:text-gold transition-colors duration-300"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-white/60 hover:text-gold transition-colors duration-300"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;