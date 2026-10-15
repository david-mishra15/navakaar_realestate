// src/components/Footer.jsx
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import logo from "../assets/logoFooter.png";

const SERVICES = [
  { label: "Buy a Property", path: "/buy-property" },
  { label: "Sell a Property", path: "/sell-property" },
  { label: "Rent a Property", path: "/rent-property" },
];

const QUICK_LINKS = [
  { label: "Contact Us", path: "/Contact-Us" },
  { label: "Our Team", path: "/about-us" },
  { label: "Careers", path: "/careers" },
  { label: "Privacy Policy", path: "/privacy-policy" },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/18BF8BNXCR/",
    Icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/navkaarrealestate?igsh=cmJ0Mm1kbWczOGU3",
    Icon: FaInstagram,
  },
];

export default function Footer() {
  const navigate = useNavigate();

  // Scroll to top helper for internal links
  const handleLinkClick = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const renderLinks = (title, items) => (
    <div>
      <h3 className="text-[11px] font-medium uppercase tracking-eyebrow text-mist mb-6">
        {title}
      </h3>
      <ul className="space-y-3.5">
        {items.map((item) => (
          <li key={item.label}>
            <button
              onClick={() => handleLinkClick(item.path)}
              className="group inline-flex items-center gap-1.5 text-[15px] text-white/80 hover:text-white transition-colors duration-300"
            >
              {item.label}
              <ArrowUpRight
                size={14}
                strokeWidth={1.5}
                className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer data-theme="dark" className="bg-night text-white font-sans">
      <div className="container-site pt-20 sm:pt-24 lg:pt-28">
        {/* Brand + statement */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 pb-14 sm:pb-16 border-b border-white/10">
          <div className="flex items-center gap-5">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-sm bg-white p-2">
              <img src={logo} alt="Navkaar Logo" className="h-full w-full object-contain" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-3xl font-semibold">Navkaar</span>
              <span className="mt-2 text-[10px] uppercase tracking-[0.28em] text-mist">
                A Real Estate Co.
              </span>
            </span>
          </div>
          <p className="display-md max-w-xl text-white/90 lg:text-right">
            Your Property. <span className="italic text-mist">Our Priority.</span>
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 py-14 sm:py-16">
          <div className="lg:col-span-3">{renderLinks("Our Services", SERVICES)}</div>
          <div className="lg:col-span-3">{renderLinks("Quick Links", QUICK_LINKS)}</div>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-6 lg:pl-12 lg:border-l lg:border-white/10">
            <h3 className="text-[11px] font-medium uppercase tracking-eyebrow text-mist mb-6">
              Contact Us
            </h3>
            <address className="not-italic text-[15px] leading-relaxed text-white/80 max-w-md">
              FF 37, 38, The Hub Runway Suits, Gaur Yamuna City, Sector 19, Greater Noida, UP 203201
            </address>
            <div className="mt-6 grid gap-2 text-[15px]">
              <p className="text-white">navkaarnoida@gmail.com</p>
            </div>

            {/* Consultant contact */}
            <div className="mt-6 pt-6 border-t border-white/10 max-w-md">
              <p className="font-display text-xl text-white leading-snug">
                Property Legal &amp; Due Diligence Consultant
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-mist">
                Real Estate Advisory | Property Chain Verification | Title Due Diligence | Property Litigation Coordination
              </p>
              <a
                href="tel:+919996663239"
                className="mt-3 inline-block text-[15px] text-white tabular-nums hover:text-mist transition-colors duration-300"
              >
                +91-9996663239
              </a>
            </div>

            <div className="flex gap-3 mt-8">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 hover:bg-white hover:text-night hover:border-white transition-colors duration-300"
                >
                  <social.Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-site pt-6 pb-24 lg:pb-6 text-center text-[12px] text-mist">
          © {new Date().getFullYear()}{" "}
          <span className="text-white">NAVKAAR – A Real Estate Co.</span>{" "}
          — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
