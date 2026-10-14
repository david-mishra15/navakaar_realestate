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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {/* Scroll To Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="flex items-center justify-center w-12 h-12 bg-white border border-gray-300 rounded-full shadow-md hover:bg-red-100 transition-all duration-300"
        >
          <FaArrowUp className="text-red-500 text-xl" />
        </button>
      )}

      {/* Call Button */}
      <a
        href="tel:+919996663035" // ✅ Call karne ke liye tel: + country code
        aria-label="Call +919996663035"
        className="flex items-center justify-center w-12 h-12 bg-blue-500 border border-blue-600 rounded-full shadow-md hover:bg-blue-600 transition-all duration-300"
      >
        <FaPhone className="text-white text-xl" />
      </a>
    </div>
  );
};

export default SideBar;
