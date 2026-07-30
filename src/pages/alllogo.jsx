import React from "react";
import { motion } from "framer-motion";

const logos = [
  { name: "Gaur", src: "/logo/gaur.png" },
  { name: "ACE", src: "/logo/logo.webp" },
  { name: "ATS", src: "/logo/ATS_LOGO.png" },
  { name: "Oasis", src: "/logo/l1.jpg" },
  { name: "Noida Authority", src: "/logo/Noida_Logo.jpg" },
  { name: "Greater Noida Authority", src: "/logo/greater-noida.png" },
  { name: "Yamuna Authority", src: "/logo/YEIDA.avif" },
];

const loopLogos = [...logos, ...logos];

export default function BuilderLogos() {
  return (
    <>
      <style>{`
        .slider-container {
          position: relative;
          overflow: hidden;
        }

        /* Soft fade edges */
        .slider-container::before,
        .slider-container::after {
          content: "";
          position: absolute;
          top: 0;
          width: 80px;
          height: 100%;
          z-index: 10;
          pointer-events: none;
        }

        .slider-container::before {
          left: 0;
          background: linear-gradient(to right, #FBF7EF, transparent);
        }

        .slider-container::after {
          right: 0;
          background: linear-gradient(to left, #FBF7EF, transparent);
        }

        .slider-track {
          display: inline-flex;
          animation: scroll 22s linear infinite;
        }

        /* Pause on hover */
        .slider-container:hover .slider-track {
          animation-play-state: paused;
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Card hover effect */
        .logo-card img {
          filter: grayscale(1) opacity(0.6);
          transition: filter 0.3s ease, transform 0.3s ease;
        }
        .logo-card:hover img {
          filter: grayscale(0) opacity(1);
          transform: scale(1.04);
        }
      `}</style>

      <div className="py-16 sm:py-20 lg:py-24">

        {/* Center heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="w-full text-center mb-10 md:mb-14"
        >
          <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3">
            Trusted Partners
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-brand-ink relative inline-block group transition-colors duration-300">
            Channel Partners
            <span className="absolute left-1/2 -bottom-2 sm:-bottom-3 w-14 h-px bg-brand-gold -translate-x-1/2 transition-all duration-300 group-hover:w-20"></span>
          </h1>
        </motion.div>

        <div className="slider-container">
          <div className="slider-track">
            {loopLogos.map((item, index) => (
              <div
                key={index}
                className="logo-card mx-6 flex flex-col items-center min-w-[150px]"
              >
                <img
                  src={item.src}
                  alt={item.name}
                  className="h-16 object-contain"
                />
                <p className="text-xs mt-3 font-medium tracking-wide uppercase text-gray-500">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
