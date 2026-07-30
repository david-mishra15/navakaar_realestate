import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Home, Tag, KeyRound } from "lucide-react";
import { useIntroDone } from "../context/IntroContext";
import fallbackBannerImg from "../assets/banner.jpg";

const CTA_ICONS = { "Buy Property": Home, "Sell Property": Tag, "Rent Property": KeyRound };

// Shown only when the API returns no banners (or is unreachable) so the
// hero never renders empty — mirrors what a real deployment should do too.
const FALLBACK_BANNERS = [
  {
    title: "Your Property. Our Priority.",
    subtitle:
      "Premium plots, apartments and villas along India's fastest-growing real estate corridor.",
    isFallback: true,
  },
];

export default function Banner() {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Waits for the one-time opening splash (if it's playing) before starting
  // the hero's own entrance animation — instant on repeat visits.
  const introDone = useIntroDone();
  const fade = introDone ? "animate-fadeInUp" : "opacity-0";
  const fadeDelay = introDone ? "animate-fadeInUp delay-200" : "opacity-0";

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch banners
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/banners`);
        const dataArray = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.data)
          ? res.data.data
          : [];
        setBanners(dataArray.length > 0 ? dataArray : FALLBACK_BANNERS);
      } catch (err) {
        console.error("Error fetching banners:", err);
        setBanners(FALLBACK_BANNERS);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, [API_URL]);

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners]);

  if (loading)
    return (
      <div className="w-full mt-[80px] h-[350px] sm:h-[450px] md:h-[600px] lg:h-[650px] xl:h-[700px] bg-brand-paperDeep animate-pulse" />
    );

  if (banners.length === 0) return null;

  return (
    <div className="relative w-full mt-[80px] h-[350px] sm:h-[450px] md:h-[600px] lg:h-[650px] xl:h-[700px] overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-20" : "opacity-0 z-0"
          }`}
        >
          {/* Banner Image */}
          {banner.isFallback ? (
            <div className="w-full h-full overflow-hidden">
              <img
                src={fallbackBannerImg}
                alt={banner.title}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
                className={`w-full h-full object-cover ${
                  index === currentIndex ? "animate-kenburns" : ""
                }`}
              />
            </div>
          ) : banner.image ? (
            <div className="w-full h-full overflow-hidden">
              <img
                src={`${API_URL}/uploads/${banner.image}`}
                alt={banner.title || `Banner ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
                sizes="100vw"
                className={`w-full h-full object-cover ${
                  index === currentIndex ? "animate-kenburns" : ""
                }`}
              />
            </div>
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
              No Image
            </div>
          )}

          {/* Overlay: linear depth + radial vignette for a more editorial, higher-contrast look */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/15 via-brand-charcoal/35 to-brand-charcoal/80 z-10"></div>
          <div className="absolute inset-0 z-10 [background:radial-gradient(ellipse_at_center,transparent_30%,rgba(15,12,8,0.45)_100%)]"></div>

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4 sm:px-6 md:px-10">
            <p className={`font-sans text-[11px] sm:text-xs font-medium tracking-[0.28em] uppercase text-brand-goldSoft mb-4 ${fade}`}>
              Yamuna Expressway &middot; Since 2008
            </p>
            <h1 className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold bg-gradient-to-b from-white to-brand-goldSoft/80 bg-clip-text text-transparent drop-shadow-lg mb-3 sm:mb-4 ${fade}`}>
              {banner.title || "Your Property. Our Priority."}
            </h1>
            <div className={`w-14 h-px bg-brand-gold ${fadeDelay}`}></div>

            {banner.subtitle && (
              <p className={`mt-5 text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-[90%] sm:max-w-[75%] md:max-w-[65%] leading-relaxed ${fadeDelay}`}>
                {banner.subtitle}
              </p>
            )}

            {/* Desktop Buttons */}
            <div className={`hidden sm:flex sm:flex-wrap justify-center gap-5 mt-12 ${fadeDelay}`}>
              {[
                { label: "Buy Property", to: "/buy-property", variant: "gold" },
                { label: "Sell Property", to: "/sell-industrial-plot", variant: "ghost" },
                { label: "Rent Property", to: "/rent-on-property", variant: "ghost" },
              ].map((btn, i) => {
                const Icon = CTA_ICONS[btn.label];
                return (
                  <Link
                    key={i}
                    to={btn.to}
                    className={`inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm sm:text-base font-semibold tracking-wide rounded-sm transition-all duration-300 hover:-translate-y-0.5 ${
                      btn.variant === "gold"
                        ? "bg-brand-gold text-white hover:bg-brand-goldSoft hover:shadow-lg hover:shadow-brand-gold/30"
                        : "border border-white/50 text-white hover:bg-white/10 hover:border-white"
                    }`}
                  >
                    {Icon && <Icon size={16} strokeWidth={2} />}
                    {btn.label}
                  </Link>
                );
              })}
            </div>

            {/* Scroll cue */}
            <div className={`hidden sm:flex flex-col items-center gap-2 absolute bottom-8 left-1/2 -translate-x-1/2 ${fadeDelay}`}>
              <span className="w-px h-8 bg-white/40"></span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/60">Scroll</span>
            </div>
          </div>
        </div>
      ))}

      {/* MOBILE BUTTONS (Simple Rectangular, Below Banner Corner) */}
      <div className="sm:hidden absolute bottom-4 left-3 right-3 z-30 flex justify-between gap-2">
        {[
          { label: "Buy Property", to: "/buy-property" },
          { label: "Sell Property", to: "/sell-industrial-plot" },
          { label: "Rent Property", to: "/rent-on-property" },
        ].map((btn, i) => (
          <Link
            key={i}
            to={btn.to}
            className="flex-1 bg-brand-gold text-white text-center py-2 rounded text-sm font-semibold"
          >
            {btn.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
