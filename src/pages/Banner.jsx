import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useIntroDone } from "../context/IntroContext";
import fallbackBannerImg from "../assets/banner.jpg";

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

const pad = (n) => String(n).padStart(2, "0");

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

  // Auto-advance; restarts whenever the slide changes (incl. manual picks)
  useEffect(() => {
    if (banners.length < 2) return;
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearTimeout(timer);
  }, [banners, currentIndex]);

  const heroHeight =
    "h-[100svh] min-h-[620px] max-h-[1000px]";

  if (loading)
    return <div className={`w-full ${heroHeight} bg-night`} />;

  if (banners.length === 0) return null;

  return (
    <section
      data-theme="dark"
      className={`relative w-full ${heroHeight} overflow-hidden bg-night text-white`}
      aria-roledescription="carousel"
    >
      {banners.map((banner, index) => {
        const isCurrent = index === currentIndex;
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
              isCurrent ? "opacity-100 z-20" : "opacity-0 z-0"
            }`}
            aria-hidden={!isCurrent}
          >
            {/* Banner Image — monochrome, slow ambient zoom */}
            {banner.isFallback || banner.image ? (
              <div className="w-full h-full overflow-hidden">
                <img
                  src={
                    banner.isFallback
                      ? fallbackBannerImg
                      : `${API_URL}/uploads/${banner.image}`
                  }
                  alt={banner.title || `Banner ${index + 1}`}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                  sizes="100vw"
                  className={`img-mono w-full h-full object-cover ${
                    isCurrent ? "animate-kenburns" : ""
                  }`}
                />
              </div>
            ) : (
              <div className="w-full h-full bg-coal" />
            )}

            {/* Overlays: overall dim + weighted toward the text corner */}
            <div className="absolute inset-0 z-10 bg-night/45" />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-night/90 via-night/20 to-night/40" />
            <div className="absolute inset-0 z-10 hidden md:block bg-gradient-to-r from-night/60 via-transparent to-transparent" />

            {/* Text Content */}
            <div className="absolute inset-0 z-20 flex items-end">
              <div className="container-site pb-28 sm:pb-32 lg:pb-36">
                <p className={`eyebrow !text-white/70 mb-6 sm:mb-8 ${fade}`}>
                  Yamuna Expressway &middot; Since 2008
                </p>
                <h1 className={`display-xl max-w-5xl text-white ${fade}`}>
                  {banner.title || "Your Property. Our Priority."}
                </h1>

                {banner.subtitle && (
                  <p className={`mt-6 sm:mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-white/75 ${fadeDelay}`}>
                    {banner.subtitle}
                  </p>
                )}

                {/* Calls to action: one primary, one secondary, one quiet link */}
                <div className={`mt-10 sm:mt-12 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 ${fadeDelay}`}>
                  <Link to="/buy-property" className="btn-light group" tabIndex={isCurrent ? 0 : -1}>
                    Buy Property
                    <ArrowRight size={16} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link to="/sell-industrial-plot" className="btn-outline-light" tabIndex={isCurrent ? 0 : -1}>
                    Sell Property
                  </Link>
                  <Link
                    to="/rent-on-property"
                    className="link-line self-center sm:self-auto sm:ml-4 mt-3 sm:mt-0 text-white/85 hover:text-white"
                    tabIndex={isCurrent ? 0 : -1}
                  >
                    Rent Property
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Bottom rail: scroll cue + slide index */}
      <div className="absolute inset-x-0 bottom-0 z-30">
        <div className="container-site">
          {/* Centred so it never collides with the floating corner buttons */}
          <div className="flex items-center justify-center min-h-[64px] border-t border-white/15 py-4 text-[11px] uppercase tracking-eyebrow text-white/60">
            {banners.length > 1 ? (
              <div className="flex items-center gap-4">
                <span className="tabular-nums text-white">
                  {pad(currentIndex + 1)}
                  <span className="text-white/40"> / {pad(banners.length)}</span>
                </span>
                <div className="flex items-center gap-2">
                  {banners.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrentIndex(i)}
                      aria-label={`Show slide ${i + 1}`}
                      aria-current={i === currentIndex}
                      className="group py-3"
                    >
                      <span
                        className={`block h-px transition-all duration-500 ease-editorial ${
                          i === currentIndex
                            ? "w-10 bg-white"
                            : "w-5 bg-white/35 group-hover:bg-white/70"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <span className="hidden sm:flex flex-col items-center gap-2">
                Scroll to explore
                <span className="h-6 w-px bg-white/40" />
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
