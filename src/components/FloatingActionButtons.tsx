import React, { useState } from "react";
import { MessageCircle, Star } from "lucide-react";
import ContactFormPopup from "./ContactFormPopUp";

const FloatingActionButtons = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);

    return (
        <>
            {/* Floating Action Buttons - Desktop Only */}
            <div className="hidden lg:flex fixed right-6 top-1/2 transform -translate-y-1/2 z-40 flex-col gap-4">
                {/* Contact Us Button */}
                <div
                    className="relative group"
                    onMouseEnter={() => setHoveredButton('contact')}
                    onMouseLeave={() => setHoveredButton(null)}
                >
                    <button
                        onClick={() => setIsPopupOpen(true)}
                        className="w-14 h-14 bg-gold text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-125 hover:rotate-3 active:scale-110 flex items-center justify-center group-hover:bg-gold/90 group-hover:shadow-gold/25"
                    >
                        <MessageCircle className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                    </button>

                    {/* Expandable Text */}
                    <div
                        className={`absolute right-16 top-1/2 transform -translate-y-1/2 bg-white text-navy px-4 py-2 rounded-lg shadow-xl whitespace-nowrap transition-all duration-500 ease-out ${hoveredButton === 'contact'
                            ? "opacity-100 translate-x-0 scale-100"
                            : "opacity-0 translate-x-4 scale-95 pointer-events-none"
                            }`}
                    >
                        <span className="text-sm font-semibold">Contact Us</span>
                        <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-0 h-0 border-l-4 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                    </div>
                </div>

                {/* Leave a Review Button */}
                <div
                    className="relative group"
                    onMouseEnter={() => setHoveredButton('review')}
                    onMouseLeave={() => setHoveredButton(null)}
                >
                    <a
                        href="https://g.page/r/CT6dFN7jWajOEBM/review"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 bg-navy text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-125 hover:rotate-3 active:scale-110 flex items-center justify-center group-hover:bg-navy/90 group-hover:shadow-navy/25"
                    >
                        <Star className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                    </a>

                    {/* Expandable Text */}
                    <div
                        className={`absolute right-16 top-1/2 transform -translate-y-1/2 bg-white text-navy px-4 py-2 rounded-lg shadow-xl whitespace-nowrap transition-all duration-500 ease-out ${hoveredButton === 'review'
                            ? "opacity-100 translate-x-0 scale-100"
                            : "opacity-0 translate-x-4 scale-95 pointer-events-none"
                            }`}
                    >
                        <span className="text-sm font-semibold">Leave a Review</span>
                        <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-0 h-0 border-l-4 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                    </div>
                </div>
            </div>

            {/* Contact Form Popup */}
            <ContactFormPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
            />
        </>
    );
};

export default FloatingActionButtons;