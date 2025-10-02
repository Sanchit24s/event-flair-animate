import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Building2,
  PartyPopper,
  Lightbulb,
} from "lucide-react";
import weddingEvent from "@/assets/wedding-event.jpg";
import corporateEvent from "@/assets/corporate-event.jpg";
import privateParty from "@/assets/private-party.jpg";

const ServicesSection = () => {
  // Services data
  const services = [
    {
      number: "01",
      title: "Weddings & Engagements",
      description:
        "From dreamy décor to curated ceremonies, we bring your love story to life with elegance and detail.",
      image: weddingEvent,
      icon: Heart,
      features: [
        "Dreamy Décor",
        "Curated Ceremonies",
        "Entertainment",
        "Logistics & On-Ground Execution",
      ],
    },
    {
      number: "02",
      title: "Corporate Events",
      description:
        "Conferences, product launches, award nights, and team-building retreats designed to impress and inspire.",
      image: corporateEvent,
      icon: Building2,
      features: [
        "Conferences",
        "Product Launches",
        "Award Nights",
        "Team-Building Retreats",
      ],
    },
    {
      number: "03",
      title: "Social Celebrations",
      description:
        "Birthdays, anniversaries, private parties, and family functions – we make every milestone unforgettable.",
      image: privateParty,
      icon: PartyPopper,
      features: [
        "Birthdays",
        "Anniversaries",
        "Private Parties",
        "Family Functions",
      ],
    },
    {
      number: "04",
      title: "Luxury Experiences",
      description:
        "Destination weddings, celebrity events, and VIP gatherings with flawless execution and luxury at every step.",
      image: weddingEvent,
      icon: Lightbulb,
      features: [
        "Destination Weddings",
        "Celebrity Events",
        "VIP Gatherings",
        "Full-Service Execution",
      ],
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      }
    }
  };


  return (
    <section id="services" className="relative py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="font-playfair text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Our Premium
            <span className="text-gold"> Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We specialize in creating extraordinary experiences across a range
            of event types, each crafted with meticulous attention to detail and
            personalized service.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl bg-card border border-border/50 hover:border-gold/30 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/10 hover:-translate-y-2"
            >
              {/* Service Image */}
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent"></div>

                {/* Service Number */}
                <div className="absolute top-6 left-6">
                  <div className="w-12 h-12 rounded-full bg-gold text-white flex items-center justify-center font-bold text-lg shadow-lg">
                    {service.number}
                  </div>
                </div>

                {/* Icon */}
                <div className="absolute top-6 right-6">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Service Content */}
              <div className="p-8">
                <h3 className="font-playfair text-2xl font-semibold text-foreground mb-4 group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <div className="w-2 h-2 rounded-full bg-gold mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;