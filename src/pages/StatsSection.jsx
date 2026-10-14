// src/components/StatsSection.jsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function useCountUp(target, shouldStart, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let raf;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [shouldStart, target, duration]);

  return value;
}

function StatItem({ target, prefix = "", suffix = "", comma, subtitle, description, inView, index }) {
  const value = useCountUp(target, inView);
  const display = comma ? value.toLocaleString("en-IN") : value;

  return (
    <div className="h-full border-t border-line pt-6 pb-8 sm:pr-8">
      <span className="block text-[11px] tabular-nums tracking-[0.2em] text-subtle mb-6">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="font-display font-medium text-5xl sm:text-6xl leading-none tracking-[-0.02em] text-ink lining-nums whitespace-nowrap">
        {prefix}
        {display}
        {suffix}
      </div>
      <p className="mt-5 text-[12px] font-medium uppercase tracking-[0.18em] text-ink">
        {subtitle}
      </p>
      <p className="mt-2 text-sm text-muted leading-relaxed max-w-[28ch]">
        {description}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      target: 3,
      prefix: "AED ",
      suffix: "B+",
      subtitle: "Properties Sold",
      description: "Sold every year across the expressway corridor",
    },
    {
      target: 140,
      suffix: "+",
      subtitle: "Professionals",
      description: "Realtors and marketing specialists on staff",
    },
    {
      target: 16,
      suffix: " yrs",
      subtitle: "Experience",
      description: "In business on Yamuna Expressway since 2008",
    },
    {
      target: 5000,
      suffix: "+",
      comma: true,
      subtitle: "Happy Clients",
      description: "Served since the company's founding",
    },
  ];

  return (
    <section ref={sectionRef} className="bg-white border-b border-line">
      <div className="container-site section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Section Heading */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-display italic text-lg text-muted mb-4">
              Sixteen years, one street
            </p>
            <h2 className="display-md text-ink max-w-sm">
              The Most Followed Real Estate Brand – NAVKAAR
            </h2>
          </motion.div>

          {/* Stats Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <StatItem {...stat} index={index} inView={inView} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
