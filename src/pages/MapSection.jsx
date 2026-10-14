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

const MASTER_PLAN_ITEMS = [
  "Jewar International Airport",
  "Film City",
  "Medical Device Park",
  "Olympic Sports City",
];

export default function YamunaExpresswayMap() {
  return (
    <section className="w-full bg-paper section">
      <div className="container-site">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-end mb-12 lg:mb-16"
        >
          <div className="lg:col-span-8">
            <p className="eyebrow mb-5">The Location Thesis</p>
            <h2 className="display-lg text-ink">
              Explore <span className="italic">Yamuna Expressway</span> Infrastructure
            </h2>
          </div>
          <p className="lg:col-span-4 lead">
            India's fastest-growing real estate corridor — Jewar Airport, Film City, Metro & more coming soon.
          </p>
        </motion.div>

        {/* Interactive Google Map (Embed API) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative w-full rounded-sm overflow-hidden border border-line group"
        >
          <iframe
            title="Yamuna Expressway & Upcoming Projects"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3512.7336819924176!2d77.5581965!3d28.3063905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cc78c9ddb3371%3A0x83771ee1ff42634!2sNavkaar%20Real%20Estate!5e0!3m2!1sen!2sin!4v1762406288423!5m2!1sen!2sin"
            className="block w-full h-[420px] sm:h-[500px] lg:h-[600px] grayscale contrast-[1.05] transition-[filter] duration-700 group-hover:grayscale-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          {/* Hover Instruction */}
          <div className="hidden sm:block absolute bottom-5 left-1/2 -translate-x-1/2 bg-night/85 text-white px-5 py-2 rounded-full text-[12px] tracking-[0.04em] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Scroll to zoom &middot; Drag to explore
          </div>
        </motion.div>

        {/* Caption + CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mt-6">
          <div>
            <p className="font-display text-2xl font-medium text-ink leading-tight">
              Navkaar Real Estate
            </p>
            <p className="text-sm text-muted mt-1">Yamuna Expressway Authority Approved</p>
          </div>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Navkaar+Real+Estate,+Yamuna+Expressway"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full sm:w-auto"
          >
            <Navigation2 size={15} strokeWidth={1.5} />
            Get Directions
          </a>
        </div>

        {/* Master Plan CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-20 lg:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-10 border-t border-ink pt-10 lg:pt-12"
        >
          <div className="lg:col-span-5">
            <FileText className="text-ink mb-6" size={28} strokeWidth={1.25} />
            <h3 className="display-md text-ink">
              Official Master Plan <span className="italic">2031</span>
            </h3>
          </div>
          <div className="lg:col-span-7">
            <ul className="grid grid-cols-1 sm:grid-cols-2 border-t border-line">
              {MASTER_PLAN_ITEMS.map((item, i) => (
                <li
                  key={item}
                  className="flex items-baseline gap-4 py-4 border-b border-line sm:odd:pr-6 text-ink"
                >
                  <span className="text-[11px] tabular-nums text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-muted text-[15px] mt-6 max-w-xl">
              See the full development roadmap directly from YEIDA.
            </p>
            <a
              href={YEIDA_MASTER_PLAN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary mt-8"
            >
              View Official YEIDA Master Plan
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
