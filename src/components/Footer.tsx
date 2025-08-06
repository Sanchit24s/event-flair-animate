import { Heart, MapPin, Phone, Mail, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
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
    'Wedding Planning',
    'Corporate Events',
    'Private Parties',
    'Event Design',
    'Venue Selection',
    'Catering Services'
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
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
        <div className="container-custom py-16">
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <button
                  onClick={() => scrollToSection('hero')}
                  className="text-2xl font-playfair font-bold text-white hover:text-gold transition-colors duration-300"
                >
                  Namah <span className="text-gold">Events</span>
                </button>
              </div>

              <p className="text-white/80 mb-6 leading-relaxed">
                Creating extraordinary experiences through meticulous planning and flawless execution.
                Your vision, our expertise, unforgettable memories.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-playfair text-lg font-semibold mb-6 text-gold">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-white/80 hover:text-gold transition-colors duration-300 text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-playfair text-lg font-semibold mb-6 text-gold">
                Services
              </h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service} className="text-white/80 hover:text-gold transition-colors duration-300 cursor-pointer">
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-playfair text-lg font-semibold mb-6 text-gold">
                Contact Info
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gold mt-1 mr-3 flex-shrink-0" />
                  <div className="text-white/80">
                    <p>123 Elegant Boulevard</p>
                    <p>Suite 456, New York, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gold mr-3" />
                  <a
                    href="tel:+15551234567"
                    className="text-white/80 hover:text-gold transition-colors duration-300"
                  >
                    +1 (555) 123-4567
                  </a>
                </div>

                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gold mr-3" />
                  <a
                    href="mailto:info@elegantevents.com"
                    className="text-white/80 hover:text-gold transition-colors duration-300"
                  >
                    info@elegantevents.com
                  </a>
                </div>
              </div>

              {/* Newsletter */}
              <div className="mt-8">
                <h4 className="font-semibold mb-3 text-white">Stay Updated</h4>
                <p className="text-white/60 text-sm mb-4">
                  Subscribe to our newsletter for event tips and exclusive offers.
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-l-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-gold"
                  />
                  <Button className="gold-gradient text-navy px-6 rounded-l-none rounded-r-lg font-semibold hover:scale-105 transition-all duration-300">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20">
          <div className="container-custom py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center text-white/60 text-sm mb-4 md:mb-0">
                <span>© 2024 Elegant Events. Made with</span>
                <Heart className="w-4 h-4 text-gold mx-1 fill-current" />
                <span>for creating memorable experiences.</span>
              </div>

              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-white/60 hover:text-gold transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#" className="text-white/60 hover:text-gold transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="#" className="text-white/60 hover:text-gold transition-colors duration-300">
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