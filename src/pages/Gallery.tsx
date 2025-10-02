import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageGallery } from '@/components/ui/image-gallery';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FloatingActionButtons from '@/components/FloatingActionButtons';
import ContactFormPopup from '@/components/ContactFormPopUp';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = () => {
    const navigate = useNavigate();
    const headerRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

    useEffect(() => {
        const loadGSAP = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');

            gsap.registerPlugin(ScrollTrigger);

            // Create a timeline for smooth sequential animations
            const tl = gsap.timeline({ delay: 0.2 });

            // Animate header
            if (headerRef.current) {
                tl.fromTo(
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

            // Animate gallery content
            if (galleryRef.current) {
                tl.fromTo(
                    galleryRef.current,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    "-=0.4" // Start 0.4s before previous animation ends
                );
            }

            // Animate CTA section
            if (ctaRef.current) {
                tl.fromTo(
                    ctaRef.current,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power3.out",
                    },
                    "-=0.3" // Start 0.3s before previous animation ends
                );
            }
        };

        loadGSAP();
    }, []);

    // Page transition variants
    const pageVariants = {
        initial: { opacity: 0 },
        in: { opacity: 1 },
        out: { opacity: 0 }
    };

    const pageTransition = {
        type: "tween" as const,
        ease: "anticipate" as const,
        duration: 0.5
    };

    return (
        <motion.div
            className="min-h-screen bg-background"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            {/* Navigation */}
            <Navigation />

            {/* Page Header */}
            <div
                ref={headerRef}
                className="pt-32 sm:pt-36 lg:pt-40 pb-6 sm:pb-8 md:pb-12 lg:pb-16 bg-background"
                style={{ opacity: 0 }} // Start hidden for GSAP animation
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
            <div
                ref={galleryRef}
                style={{ opacity: 0 }} // Start hidden for GSAP animation
            >
                <ImageGallery />
            </div>

            {/* Footer CTA */}
            <div
                ref={ctaRef}
                className="py-12 sm:py-16 lg:py-20 bg-muted/30"
                style={{ opacity: 0 }} // Start hidden for GSAP animation
            >
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

            {/* Floating Action Buttons - Always visible */}
            <FloatingActionButtons />

            {/* Contact Form Popup - Always available */}
            <ContactFormPopup
                isOpen={isContactPopupOpen}
                onClose={() => setIsContactPopupOpen(false)}
            />
        </motion.div>
    );
};

export default Gallery;
