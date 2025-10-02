import { Heart, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import founderImage from '@/assets/founder-image.jpg';

const AboutSection = () => {
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      }
    }
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      x: -60
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 1.2
      }
    }
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      x: 60
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.2
      }
    }
  };

  const stats = [
    { icon: Heart, number: "50+", label: "Memorable Events" },
    { icon: Users, number: "25+", label: "Happy Clients" },
    { icon: Award, number: "5+", label: "Years Experience" }
  ];

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          className="grid lg:grid-cols-2 gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >

          {/* Founder Image */}
          <motion.div
            variants={imageVariants}
            className="relative flex flex-col lg:pl-32 items-start"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl max-w-sm w-full">
              <img
                src={founderImage}
                alt="Jimish R Shah - Founder & Creative Director"
                className="w-full h-auto object-cover aspect-[3/4]"
              />
            </div>
            <div className="mt-4 text-left">
              <h4 className="font-semibold text-navy text-xl mb-1">Jimish R Shah</h4>
              <p className="text-muted-foreground">Founder</p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={contentVariants}
            className="space-y-6"
          >
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-navy leading-tight">
              Creating Moments That <span className="text-gold">Last Forever</span>
            </h2>

            <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
              <p>
                At NAMAH EVENTS, we believe every event tells a story – and we make sure yours is unforgettable. From intimate gatherings to grand celebrations, our team brings creativity, precision, and passion to every detail.
              </p>
              <p>
                With years of expertise in weddings, corporate events, social functions, and luxury celebrations, we are known for seamless planning, stunning décor, and flawless execution.
              </p>
            </div>

            <blockquote className="italic text-xl text-navy font-playfair pl-6 border-l-4 border-gold my-6">
              "Excellence is not a skill, it's an attitude we bring to every event."
              <cite className="block text-base font-inter text-muted-foreground mt-3">
                — Jimish R Shah, Founder
              </cite>
            </blockquote>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gold/10 text-gold">
                    <stat.icon size={16} />
                  </div>
                  <div>
                    <div className="font-playfair text-2xl font-bold text-navy">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;