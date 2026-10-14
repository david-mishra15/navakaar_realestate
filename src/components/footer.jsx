// src/components/Footer.jsx
import { Link, useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import logo from "../assets/logoFooter.png";

export default function Footer() {
  const navigate = useNavigate();

  // Scroll to top helper for internal links
  const handleLinkClick = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-b from-brand-charcoal to-brand-charcoalDeep text-white py-16 sm:py-20 font-sans tracking-wide">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
        {/* Left - Services */}
        <div>
          <img src={logo} alt="Navkaar Logo" className="h-14 mb-6" />
          <h3 className="font-display font-bold mb-4 text-lg md:text-xl text-brand-goldSoft">Our Services</h3>
          <ul className="space-y-2 text-gray-300 text-base leading-relaxed">
            <li>
              <button
                onClick={() => handleLinkClick("/buy-property")}
                className="hover:text-white transition-colors duration-300"
              >
                Buy a Property
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick("/sell-property")}
                className="hover:text-white transition-colors duration-300"
              >
                Sell a Property
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick("/rent-property")}
                className="hover:text-white transition-colors duration-300"
              >
                Rent a Property
              </button>
            </li>
          </ul>
        </div>

        {/* Middle - Quick Links */}
        <div>
          <h3 className="font-display font-bold mb-4 text-lg md:text-xl text-brand-goldSoft">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-base leading-relaxed">
            <li>
              <button
                onClick={() => handleLinkClick("/Contact-Us")}
                className="hover:text-white transition-colors duration-300"
              >
                Contact Us
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick("/about-us")}
                className="hover:text-white transition-colors duration-300"
              >
                Our Team
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick("/careers")}
                className="hover:text-white transition-colors duration-300"
              >
                Careers
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick("/privacy-policy")}
                className="hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </button>
            </li>
          </ul>
        </div>

        {/* Right - Contact Us */}
        <div>
          <h3 className="font-display font-bold mb-4 text-lg md:text-xl text-brand-goldSoft">Contact Us</h3>
          <p className="text-gray-300 text-base leading-relaxed mb-3">
            <strong>
              FF 37, 38, The Hub Runway Suits, Gaur Yamuna City, Sector 19, Greater Noida, UP 203201
            </strong>
          </p>
          <p className="text-gray-300 text-base">navkaarnoida@gmail.com</p>
          <p className="text-gray-300 text-base mb-4">+91-9996663035</p>

          <div className="flex space-x-4 text-gray-300 text-2xl mt-3">
            <a
              href="https://www.facebook.com/share/18BF8BNXCR/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-goldSoft transition-colors duration-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/navkaarrealestate?igsh=cmJ0Mm1kbWczOGU3"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-colors duration-300"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 mt-10 pt-5 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="font-display font-medium text-white">
          NAVKAAR – A Real Estate Co.
        </span>{" "}
        — All Rights Reserved.
      </div>
    </footer>
  );
}
