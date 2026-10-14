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
      data-theme="dark"
      className="section bg-night text-white overflow-hidden"
    >
      <style>{`
        .why-choose-swiper .swiper-pagination {
          bottom: 20px !important;
          text-align: left;
          padding-left: 24px;
        }
        .why-choose-swiper .swiper-pagination-bullet {
          background: #fff;
          opacity: 0.4;
          width: 20px;
          height: 1px;
          border-radius: 0;
          margin: 0 4px 0 0 !important;
          transition: width .5s, opacity .5s;
        }
        .why-choose-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 40px;
        }
      `}</style>
      <div className="container-site">
        {/* Heading row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 mb-14 lg:mb-20">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">The Navkaar Difference</p>
            <h2 className="display-lg text-white">
              Why Choose{" "}
              <span className="italic text-mist">NAVKAAR – A Real Estate Co.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start">
          {/* Left Side - Image Slider */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            style={{ y: parallaxY }}
            className="relative w-full lg:col-span-6"
          >
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              loop={true}
              spaceBetween={0}
              slidesPerView={1}
              className="why-choose-swiper rounded-sm overflow-hidden"
            >
              {[img1, img2, img3].map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="img-mono w-full aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Credential plate */}
            <div className="absolute -bottom-px right-0 z-10 bg-paper text-ink px-6 py-5 sm:px-8 sm:py-6">
              <p className="font-display text-4xl sm:text-5xl font-medium leading-none lining-nums">16+</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted mt-2">Years of Trusted Service</p>
            </div>
          </motion.div>

          {/* Right Side - Reasons List */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 lg:col-start-8 lg:pt-6"
          >
            <ol className="border-t border-white/15">
              {points.map((point, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group grid grid-cols-[3rem_1fr] gap-4 py-8 sm:py-10 border-b border-white/15"
                >
                  {/* Numeral */}
                  <span className="font-display italic text-2xl text-white/40 group-hover:text-white transition-colors duration-500 leading-none pt-1">
                    {NUMERALS[idx]}
                  </span>

                  {/* Text */}
                  <div>
                    <h3 className="font-display text-2xl sm:text-[28px] font-medium leading-tight mb-3 text-white">
                      {point.title}
                    </h3>
                    <p className="text-mist text-[15px] leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
