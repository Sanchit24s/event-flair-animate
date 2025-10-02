import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageGallery } from '@/components/ui/image-gallery';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FloatingActionButtons from '@/components/FloatingActionButtons';
import ContactFormPopup from '@/components/ContactFormPopUp';

const Gallery = () => {
    const navigate = useNavigate();
    const headerRef = useRef<HTMLDivElement>(null);
    const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

    // Immediately scroll to top before DOM paint to prevent visible scrolling
    useLayoutEffect(() => {
        // Temporarily disable smooth scrolling for instant positioning
        const originalScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';

        // Force scroll to top immediately
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.scrollTo(0, 0);

        // Restore smooth scrolling after positioning
        setTimeout(() => {
            document.documentElement.style.scrollBehavior = originalScrollBehavior;
        }, 50);
    }, []);

    useEffect(() => {
        const loadGSAP = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');

            gsap.registerPlugin(ScrollTrigger);

            // Animate header on page load
            if (headerRef.current) {
                gsap.fromTo(
                    headerRef.current,
                    { opacity: 0, y: -30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                    }
                );
            }
        };

        loadGSAP();
    }, []);

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <Navigation />

            {/* Page Header */}
            <div
                ref={headerRef}
                className="pt-32 sm:pt-36 lg:pt-40 pb-6 sm:pb-8 md:pb-12 lg:pb-16 bg-background"
            >
                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                    <div className="text-center">

                        <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-3 sm:mb-4 md:mb-6">
                            Event
                            <span className="text-gold"> Gallery</span>
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
                            Explore our complete portfolio of beautifully crafted events that showcase our commitment to excellence and attention to detail.
                        </p>
                    </div>
                </div>
            </div>

            {/* Gallery Content */}
            <ImageGallery />

            {/* Footer CTA */}
            <div className="py-12 sm:py-16 lg:py-20 bg-muted/30">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                        Ready to Create Your
                        <span className="text-gold"> Dream Event?</span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                        Let us bring your vision to life with the same attention to detail and excellence showcased in our gallery.
                    </p>
                    <Button
                        size="lg"
                        className="bg-gold hover:bg-gold/90 text-white px-6 sm:px-8 py-3 text-sm sm:text-base"
                        onClick={() => setIsContactPopupOpen(true)}
                    >
                        Start Planning Your Event
                    </Button>
                </div>
            </div>

            {/* Footer */}
            <Footer />

            {/* Floating Action Buttons */}
            <FloatingActionButtons />

            {/* Contact Form Popup */}
            <ContactFormPopup
                isOpen={isContactPopupOpen}
                onClose={() => setIsContactPopupOpen(false)}
            />
        </div>
    );
};

export default Gallery;
