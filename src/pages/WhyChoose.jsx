// src/components/WhyChoose.jsx
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion, useScroll, useTransform } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

import img1 from "../assets/banner2.jpg";
import img2 from "../assets/banner5.jpg";
import img3 from "../assets/banner4.jpg";

const NUMERALS = ["I", "II", "III"];

export default function WhyChoose() {
  const points = [
    {
      title: "Market Expertise",
      desc: "In-depth knowledge of the real estate market, helping clients find ideal properties tailored to their needs with NAVKAAR – A Real Estate Co.",
    },
    {
      title: "Comprehensive Services",
      desc: "From property buying and selling to leasing and management, NAVKAAR – A Real Estate Co. offers a full suite of real estate services.",
    },
    {
      title: "Client-Centric Approach",
      desc: "Transparent and customer-focused service with a goal to build long-term relationships and ensure a smooth experience with NAVKAAR – A Real Estate Co.",
    },
  ];

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-24, 24]);

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-brand-paperDeep to-brand-paper overflow-hidden"
    >
      <style>{`
        .why-choose-swiper .swiper-pagination-bullet {
          background: #FBF7EF;
          opacity: 0.6;
          width: 7px;
          height: 7px;
        }
        .why-choose-swiper .swiper-pagination-bullet-active {
          background: #CA8B06;
          opacity: 1;
        }
      `}</style>
      <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        {/* Left Side - Image Slider */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          style={{ y: parallaxY }}
          className="relative w-full max-w-xl mx-auto"
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop={true}
            spaceBetween={20}
            slidesPerView={1}
            className="why-choose-swiper rounded-md shadow-2xl overflow-hidden"
          >
            {[img1, img2, img3].map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[350px] sm:h-[420px] lg:h-[450px] object-cover transition-transform duration-700 hover:scale-105"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Floating credential badge */}
          <div className="hidden sm:block absolute -bottom-6 -right-6 z-10 bg-gradient-to-br from-brand-charcoal to-brand-charcoalDeep text-white rounded-md px-6 py-4 shadow-xl">
            <p className="font-display text-3xl font-bold text-brand-goldSoft leading-none">16+</p>
            <p className="text-[11px] uppercase tracking-wider text-white/70 mt-1">Years of Trusted Service</p>
          </div>
        </motion.div>

        {/* Right Side - Reasons List */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-xl"
        >
          <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3 text-center lg:text-left">
            The Navkaar Difference
          </p>
          <h2 className="text-3xl lg:text-4xl font-display font-semibold mb-10 text-brand-ink leading-snug text-center lg:text-left">
            Why Choose{" "}
            <span className="italic text-brand-maroon">
              NAVKAAR – A Real Estate Co.
            </span>
          </h2>

          <div className="divide-y divide-brand-ink/10">
            {points.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex items-start gap-6 py-6 first:pt-0 last:pb-0"
              >
                {/* Numeral */}
                <span className="font-display italic font-semibold text-2xl text-brand-gold/70 group-hover:text-brand-gold transition-colors duration-500 leading-none pt-1">
                  {NUMERALS[idx]}
                </span>

                {/* Text */}
                <div>
                  <h3 className="text-lg font-semibold mb-1.5 text-brand-ink group-hover:text-brand-maroon transition-colors duration-300">
                    {point.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
