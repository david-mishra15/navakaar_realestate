// src/pages/MapSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { Navigation2, FileText } from "lucide-react";

// Configurable rather than hardcoded — set the real document/URL in .env as
// VITE_YEIDA_MASTER_PLAN_URL. Falls back to a search link if unset so the
// button is never a dead end.
const YEIDA_MASTER_PLAN_URL =
  import.meta.env.VITE_YEIDA_MASTER_PLAN_URL ||
  "https://www.google.com/search?q=YEIDA+Master+Plan+2031+official+document";

export default function YamunaExpresswayMap() {
  return (
    <section className="w-full bg-brand-paper py-20 sm:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3">
            The Location Thesis
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-brand-ink leading-tight">
            Explore <span className="italic text-brand-maroon">Yamuna Expressway</span> Infrastructure
          </h2>
          <div className="w-14 h-px bg-brand-gold mx-auto mt-5"></div>
          <p className="mt-5 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            India's fastest-growing real estate corridor — Jewar Airport, Film City, Metro & more coming soon.
          </p>
        </motion.div>

        {/* Interactive Google Map (Embed API) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-6xl mx-auto rounded-md overflow-hidden ring-1 ring-brand-ink/[0.08] shadow-xl mb-12 group"
        >
          <iframe
            title="Yamuna Expressway & Upcoming Projects"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3512.7336819924176!2d77.5581965!3d28.3063905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cc78c9ddb3371%3A0x83771ee1ff42634!2sNavkaar%20Real%20Estate!5e0!3m2!1sen!2sin!4v1762406288423!5m2!1sen!2sin"
            className="w-full h-96 sm:h-[500px] lg:h-[600px] transition-all duration-500 group-hover:brightness-105"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          {/* Floating Badge */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-brand-paper/95 backdrop-blur-sm rounded-md px-5 py-3 shadow-lg">
            <p className="font-display text-lg sm:text-xl font-bold text-brand-maroon">
              Navkaar Real Estate
            </p>
            <p className="text-xs sm:text-sm text-gray-600">Yamuna Expressway Authority Approved</p>
          </div>

          {/* Hover Instruction */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-brand-charcoal/80 text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Scroll to zoom &middot; Drag to explore
          </div>
        </motion.div>

        {/* CTA */}
        <div className="flex justify-center mt-12 mb-12">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Navkaar+Real+Estate,+Yamuna+Expressway"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-brand-gold hover:bg-brand-goldSoft text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-sm shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            <Navigation2 size={16} />
            Get Directions
          </a>
        </div>

        {/* Master Plan CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-br from-brand-charcoal to-brand-charcoalDeep rounded-md px-6 py-12 sm:px-12 sm:py-16"
        >
          <FileText className="mx-auto text-brand-goldSoft" size={32} strokeWidth={1.5} />
          <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white mt-5">
            Official Master Plan <span className="italic text-brand-goldSoft">2031</span>
          </h3>
          <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto mt-4">
            Jewar International Airport &middot; Film City &middot; Medical Device Park &middot; Olympic Sports City — see the full development roadmap directly from YEIDA.
          </p>
          <a
            href={YEIDA_MASTER_PLAN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-brand-gold hover:bg-brand-goldSoft text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-sm shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 mt-8"
          >
            View Official YEIDA Master Plan
          </a>
        </motion.div>

      </div>
    </section>
  );
}
