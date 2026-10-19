import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ExternalLink, PenLine } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FloatingActionButtons from '@/components/FloatingActionButtons';
import ContactFormPopup from '@/components/ContactFormPopUp';
import { Button } from '@/components/ui/button';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import {
  googleReviews,
  averageRating,
  reviewCount,
  initials,
  GOOGLE_REVIEWS_URL,
  GOOGLE_WRITE_REVIEW_URL,
} from '@/data/googleReviews';

const Stars = ({ rating, size = 'w-4 h-4' }: { rating: number; size?: string }) => (
  <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`${size} ${i < Math.round(rating) ? 'text-gold fill-current' : 'text-gray-300'}`} />
    ))}
  </div>
);

/* Google's own "G", drawn inline so the page needs no external asset. */
const GoogleG = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
  </svg>
);

const Reviews = () => {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  useVisitorTracking();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Client Reviews | Namah Events';
  }, []);

  const written = googleReviews.filter((r) => r.text);
  const ratingOnly = googleReviews.filter((r) => !r.text);

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Navigation onContactClick={() => setIsContactPopupOpen(true)} />

      {/* Header and rating summary */}
      <header className="pt-32 sm:pt-36 lg:pt-40 pb-10 sm:pb-14 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            What Our Clients <span className="text-gold">Say</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Every review on this page is from our Google Business profile, in the client's own words.
          </p>

          <div className="mt-8 inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 rounded-2xl border border-border bg-white px-6 py-5 shadow-md">
            <div className="flex items-center gap-3">
              <GoogleG className="w-9 h-9" />
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="font-playfair text-3xl font-bold text-navy">{averageRating.toFixed(1)}</span>
                  <Stars rating={averageRating} size="w-5 h-5" />
                </div>
                <div className="text-sm text-muted-foreground">{reviewCount} Google reviews</div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2 border-gold/40 hover:bg-gold hover:text-white">
                  See them on Google <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
              <a href={GOOGLE_WRITE_REVIEW_URL} target="_blank" rel="noopener noreferrer">
                <Button className="gap-2 bg-gold hover:bg-gold/90 text-white">
                  Write a review <PenLine className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Written reviews */}
      <section className="pb-16 sm:pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
            {written.map((r, i) => (
              <motion.figure
                key={r.author}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: Math.min(i, 6) * 0.05 }}
                className="mb-5 break-inside-avoid rounded-2xl border border-border bg-white p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-navy text-white flex items-center justify-center font-semibold" aria-hidden="true">
                      {initials(r.author)}
                    </div>
                    <figcaption>
                      <div className="font-semibold text-navy capitalize">{r.author}</div>
                      <Stars rating={r.rating} />
                    </figcaption>
                  </div>
                  <GoogleG className="w-5 h-5 shrink-0" />
                </div>
                <blockquote className="text-foreground/85 leading-relaxed whitespace-pre-line text-[0.95rem]">
                  {r.text}
                </blockquote>
              </motion.figure>
            ))}
          </div>

          {ratingOnly.length > 0 && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Plus {ratingOnly.length} more five-star ratings from{' '}
              {ratingOnly.map((r) => r.author).join(', ')}.
            </p>
          )}
        </div>
      </section>

      {/* Invitation */}
      <section className="py-14 sm:py-16 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Planning something <span className="text-gold">worth celebrating?</span>
          </h2>
          <p className="text-muted-foreground mb-7">Tell us about your event and we'll take it from there.</p>
          <Button size="lg" className="bg-gold hover:bg-gold/90 text-white px-8" onClick={() => setIsContactPopupOpen(true)}>
            Start Planning Your Event
          </Button>
        </div>
      </section>

      <Footer />
      <FloatingActionButtons />
      <ContactFormPopup isOpen={isContactPopupOpen} onClose={() => setIsContactPopupOpen(false)} />
    </motion.div>
  );
};

export default Reviews;
