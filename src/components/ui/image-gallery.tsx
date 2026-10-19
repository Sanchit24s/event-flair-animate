'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { useInView, AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Import actual event images
import bdayImage from "@/assets/birthday.jpg";
import bdayImage2 from "@/assets/birthday-2.jpg";
import casinoImage from "@/assets/Casino-night.jpg";
import floralWeddingImage from "@/assets/Floral-Wedding-stage.jpg";
import annualKickoffImage from "@/assets/Annual-Kickoff.jpg";
import techConference from "@/assets/Tech-Conference.jpg";
import corporatePerformanceImage from "@/assets/Corporate Performance.jpg";
import yellowThemeFloralStageImage from "@/assets/Yellow-Themed-Floral-Stage.jpg";
import tropicalWeddingImage from "@/assets/Tropical-Wedding-Mandap.jpg";
import pockerNightImage from "@/assets/Poker-night-event.jpg";
import anniversaryImage from "@/assets/anniversary.jpg";
import anniversaryImage2 from "@/assets/anniversary-2.jpg";
import christmasImage from "@/assets/christmas.jpg";
import corporateEventImage from "@/assets/corporate-event.jpg";
import corporateImage from "@/assets/corporate.jpg";
import elegantEventImage from "@/assets/elegant-event-moment.jpg";
import entranceImage from "@/assets/entrance.jpg";
import haldiImage from "@/assets/Haldi.jpg";
import privatePartyImage from "@/assets/private-party.jpg";
import receptionImage from "@/assets/Reception.jpg";
import receptionImage2 from "@/assets/Reception-2.jpg";
import sportEventImage from "@/assets/sport-event.jpg";
import weddingImage from "@/assets/wedding.jpg";
import weddingImage3 from "@/assets/wedding-3.jpg";
import weddingEventImage from "@/assets/wedding-event.jpg";

export function ImageGallery() {
    const [windowWidth, setWindowWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
    const [imagesLoaded, setImagesLoaded] = React.useState(0);
    const [totalImages, setTotalImages] = React.useState(0);
    // which photo is open in the viewer, by its place in eventImages
    const [openIndex, setOpenIndex] = React.useState<number | null>(null);
    const lastTile = React.useRef<HTMLElement | null>(null);

    React.useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Real event images with proper metadata
    const eventImages = [
        // Wedding Events
        {
            src: tropicalWeddingImage,
            title: "Tropical Wedding Mandap",
            category: "Wedding",
            isPortrait: false
        },
        {
            src: floralWeddingImage,
            title: "Floral Wedding Stage",
            category: "Wedding",
            isPortrait: true
        },
        {
            src: weddingImage,
            title: "Classic Wedding Ceremony",
            category: "Wedding",
            isPortrait: false
        },
        {
            src: weddingImage3,
            title: "Elegant Wedding Reception",
            category: "Wedding",
            isPortrait: true
        },
        {
            src: weddingEventImage,
            title: "Grand Wedding Event",
            category: "Wedding",
            isPortrait: false
        },
        {
            src: receptionImage,
            title: "Wedding Reception Hall",
            category: "Wedding",
            isPortrait: true
        },
        {
            src: receptionImage2,
            title: "Luxury Reception Setup",
            category: "Wedding",
            isPortrait: false
        },
        {
            src: elegantEventImage,
            title: "Elegant Wedding Moment",
            category: "Wedding",
            isPortrait: true
        },

        // Corporate Events
        {
            src: corporatePerformanceImage,
            title: "Corporate Performance Review",
            category: "Corporate Event",
            isPortrait: true
        },
        {
            src: techConference,
            title: "Tech Conference Setup",
            category: "Corporate Event",
            isPortrait: false
        },
        {
            src: annualKickoffImage,
            title: "Annual Kickoff Meeting",
            category: "Corporate Event",
            isPortrait: true
        },
        {
            src: corporateEventImage,
            title: "Corporate Gala Night",
            category: "Corporate Event",
            isPortrait: false
        },
        {
            src: corporateImage,
            title: "Business Conference",
            category: "Corporate Event",
            isPortrait: true
        },
        {
            src: entranceImage,
            title: "Corporate Event Entrance",
            category: "Corporate Event",
            isPortrait: false
        },

        // Private Parties & Celebrations
        {
            src: pockerNightImage,
            title: "Poker Night Event",
            category: "Private Party",
            isPortrait: false
        },
        {
            src: casinoImage,
            title: "Casino Night Theme",
            category: "Private Party",
            isPortrait: true
        },
        {
            src: bdayImage,
            title: "Birthday Celebration",
            category: "Private Party",
            isPortrait: false
        },
        {
            src: bdayImage2,
            title: "Special Birthday Party",
            category: "Private Party",
            isPortrait: true
        },
        {
            src: privatePartyImage,
            title: "Exclusive Private Party",
            category: "Private Party",
            isPortrait: false
        },
        {
            src: christmasImage,
            title: "Christmas Celebration",
            category: "Private Party",
            isPortrait: true
        },

        // Anniversary Events
        {
            src: anniversaryImage,
            title: "Anniversary Celebration",
            category: "Anniversary",
            isPortrait: false
        },
        {
            src: anniversaryImage2,
            title: "Golden Anniversary Event",
            category: "Anniversary",
            isPortrait: true
        },

        // Traditional & Cultural Events
        {
            src: yellowThemeFloralStageImage,
            title: "Yellow Themed Floral Stage",
            category: "Haldi",
            isPortrait: false
        },
        {
            src: haldiImage,
            title: "Traditional Haldi Ceremony",
            category: "Haldi",
            isPortrait: true
        },

        // Sports & Special Events
        {
            src: sportEventImage,
            title: "Sports Award Ceremony",
            category: "Sports Event",
            isPortrait: false
        }
    ];

    // Distribute images into 3 columns
    const distributeImages = () => {
        const columns: (typeof eventImages[number] & { index: number })[][] = [[], [], []];
        eventImages.forEach((image, index) => {
            columns[index % 3].push({ ...image, index });
        });
        return columns;
    };

    const imageColumns = distributeImages();

    // Set total images count
    React.useEffect(() => {
        setTotalImages(eventImages.length);
    }, [eventImages.length]);

    const handleImageLoad = React.useCallback(() => {
        setImagesLoaded(prev => prev + 1);
    }, []);

    const isAllImagesLoaded = imagesLoaded >= totalImages;

    return (
        <div className="relative w-full py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 px-3 sm:px-4 md:px-6 lg:px-8 bg-background">

            {/* Mobile: Single column, Tablet: 2 columns, Desktop: 3 columns */}
            <div className="mx-auto grid w-full max-w-7xl gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {imageColumns.map((column, colIndex) => (
                    <div key={colIndex} className="grid gap-3 sm:gap-4 md:gap-6">
                        {column.map((image, index) => {
                            // Responsive ratio adjustments for better mobile experience
                            const ratio = image.isPortrait ?
                                (windowWidth < 640 ? 3 / 4 : windowWidth < 1024 ? 4 / 5 : 9 / 16) : // More square on mobile, balanced on tablet
                                (windowWidth < 640 ? 4 / 3 : windowWidth < 1024 ? 3 / 2 : 16 / 9); // Less wide on mobile/tablet
                            return (
                                <AnimatedImage
                                    key={`${colIndex}-${index}`}
                                    alt={image.title}
                                    src={image.src}
                                    ratio={ratio}
                                    title={image.title}
                                    category={image.category}
                                    onLoad={handleImageLoad}
                                    onOpen={(el) => { lastTile.current = el; setOpenIndex(image.index); }}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>

            <Lightbox
                images={eventImages}
                index={openIndex}
                onIndex={setOpenIndex}
                onClose={() => {
                    setOpenIndex(null);
                    lastTile.current?.focus();
                }}
            />
        </div>
    );
}

/* THE VIEWER. Opens the photo that was tapped, full screen, over everything.
   Arrows, swipe or the keyboard move through the set; Escape, the close
   button or a tap on the backdrop closes it. It is rendered into <body>,
   because the gallery sits inside an animated (transformed) container, and a
   fixed element inside a transformed one is not fixed to the screen. */
interface LightboxProps {
    images: { src: string; title: string; category: string }[];
    index: number | null;
    onIndex: (i: number) => void;
    onClose: () => void;
}

function Lightbox({ images, index, onIndex, onClose }: LightboxProps) {
    const open = index !== null;
    const closeRef = React.useRef<HTMLButtonElement>(null);
    const touchX = React.useRef<number | null>(null);
    const n = images.length;
    const go = React.useCallback((d: number) => {
        if (index === null) return;
        onIndex((index + d + n) % n);
    }, [index, n, onIndex]);

    // lock the page behind it, and listen for keys, only while open
    React.useEffect(() => {
        if (!open) return;
        const root = document.documentElement;
        const before = root.style.overflow;
        root.style.overflow = 'hidden';
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            else if (e.key === 'ArrowRight') go(1);
            else if (e.key === 'ArrowLeft') go(-1);
        };
        window.addEventListener('keydown', onKey);
        closeRef.current?.focus();
        return () => {
            root.style.overflow = before;
            window.removeEventListener('keydown', onKey);
        };
    }, [open, go, onClose]);

    // fetch the neighbours so the next photo is ready
    React.useEffect(() => {
        if (index === null) return;
        [1, -1].forEach((d) => { const img = new Image(); img.src = images[(index + d + n) % n].src; });
    }, [index, images, n]);

    if (typeof document === 'undefined') return null;
    const image = index !== null ? images[index] : null;

    return createPortal(
        <AnimatePresence>
            {open && image && (
                <motion.div
                    key="lightbox"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${image.title}, photo ${index! + 1} of ${n}`}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onClick={onClose}
                    onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
                    onTouchEnd={(e) => {
                        if (touchX.current === null) return;
                        const dx = e.changedTouches[0].clientX - touchX.current;
                        touchX.current = null;
                        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
                    }}
                >
                    <motion.figure
                        key={image.src}
                        className="relative flex max-h-full max-w-full flex-col items-center px-4 sm:px-16"
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.25 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={image.src}
                            alt={image.title}
                            className="max-h-[78vh] sm:max-h-[84vh] max-w-[94vw] sm:max-w-[86vw] rounded-lg object-contain shadow-2xl select-none"
                            draggable={false}
                        />
                        <figcaption className="mt-4 text-center text-white">
                            <div className="text-xs uppercase tracking-wide text-gold">{image.category}</div>
                            <div className="font-playfair text-lg sm:text-xl">{image.title}</div>
                            <div className="mt-1 text-xs text-white/60">{index! + 1} / {n}</div>
                        </figcaption>
                    </motion.figure>

                    <button
                        ref={closeRef}
                        type="button"
                        aria-label="Close"
                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                        className="absolute right-3 top-3 sm:right-6 sm:top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                    >
                        <X className="h-6 w-6" />
                    </button>
                    <button
                        type="button"
                        aria-label="Previous photo"
                        onClick={(e) => { e.stopPropagation(); go(-1); }}
                        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                        type="button"
                        aria-label="Next photo"
                        onClick={(e) => { e.stopPropagation(); go(1); }}
                        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body,
    );
}

interface AnimatedImageProps {
    alt: string;
    src: string;
    className?: string;
    ratio: number;
    title: string;
    category: string;
    onLoad?: () => void;
    onOpen?: (el: HTMLElement) => void;
}

function AnimatedImage({ alt, src, ratio, title, category, onLoad, onOpen }: AnimatedImageProps) {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });
    const [isLoading, setIsLoading] = React.useState(true);

    const handleImageLoad = React.useCallback(() => {
        setIsLoading(false);
        onLoad?.();
    }, [onLoad]);

    return (
        <AspectRatio
            ref={ref}
            ratio={ratio}
            role="button"
            tabIndex={0}
            aria-label={`Open photo: ${title}`}
            onClick={(e) => onOpen?.(e.currentTarget as HTMLElement)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen?.(e.currentTarget as HTMLElement); }
            }}
            className="bg-accent relative size-full rounded-lg sm:rounded-xl lg:rounded-2xl border group cursor-pointer overflow-hidden shadow-md hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
        >
            <img
                alt={alt}
                src={src}
                className={cn(
                    'size-full rounded-lg sm:rounded-xl lg:rounded-2xl object-cover opacity-0 transition-all duration-1000 ease-in-out group-hover:scale-110',
                    {
                        'opacity-100': isInView && !isLoading,
                    },
                )}
                onLoad={handleImageLoad}
                loading="lazy"
            />

            {/* Hover Overlay - Responsive */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg sm:rounded-xl lg:rounded-2xl">
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-6 text-white">
                    <div className="text-xs sm:text-xs uppercase tracking-wide text-gold mb-1 sm:mb-2">
                        {category}
                    </div>
                    <h3 className="font-playfair text-sm sm:text-base lg:text-lg xl:text-xl font-semibold mb-2 sm:mb-3 line-clamp-2">
                        {title}
                    </h3>
                </div>
            </div>

            {/* Category Badge - Responsive */}
            <div className="absolute top-2 sm:top-3 lg:top-4 left-2 sm:left-3 lg:left-4 px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                {category}
            </div>

            {/* Loading skeleton */}
            {isLoading && (
                <div className="absolute inset-0 bg-muted animate-pulse rounded-lg sm:rounded-xl lg:rounded-2xl" />
            )}
        </AspectRatio>
    );
}
