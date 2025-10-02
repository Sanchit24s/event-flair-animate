'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';
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
        const columns: typeof eventImages[] = [[], [], []];
        eventImages.forEach((image, index) => {
            columns[index % 3].push(image);
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
            {/* Loading Progress Bar */}
            {!isAllImagesLoaded && totalImages > 0 && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gold transition-all duration-300 ease-out"
                                style={{ width: `${(imagesLoaded / totalImages) * 100}%` }}
                            />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                            {Math.round((imagesLoaded / totalImages) * 100)}%
                        </span>
                    </div>
                </div>
            )}

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
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
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
}

function AnimatedImage({ alt, src, ratio, title, category, onLoad }: AnimatedImageProps) {
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
            className="bg-accent relative size-full rounded-lg sm:rounded-xl lg:rounded-2xl border group cursor-pointer overflow-hidden shadow-md hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
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
