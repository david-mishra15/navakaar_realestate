import React, { useState, useEffect } from "react";
import { FaArrowUp, FaPhone } from "react-icons/fa";

const SideBar = () => {
  const [isVisible, setIsVisible] = useState(false);

  // ✅ Scroll hone par button show kare
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // ✅ Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-3">
      {/* Scroll To Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="flex items-center justify-center w-12 h-12 bg-white text-ink border border-line rounded-full shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)] hover:border-ink transition-colors duration-300"
        >
          <FaArrowUp className="text-sm" />
        </button>
      )}

      {/* Call Button */}
      <a
        href="tel:+919996663035" // ✅ Call karne ke liye tel: + country code
        aria-label="Call +919996663035"
        className="flex items-center justify-center w-12 h-12 bg-ink text-white rounded-full ring-1 ring-white/20 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)] hover:bg-graphite transition-colors duration-300"
      >
        <FaPhone className="text-sm" />
      </a>
    </div>
  );
};

export default SideBar;
