// src/components/StatsSection.jsx
import { useEffect, useRef, useState } from "react";
import { Building2, Trophy, Briefcase, Smile } from "lucide-react";
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

function StatItem({ icon, target, prefix = "", suffix = "", comma, subtitle, description, inView }) {
  const value = useCountUp(target, inView);
  const display = comma ? value.toLocaleString("en-IN") : value;

  return (
    <div className="relative text-center px-4 sm:px-6 first:before:hidden before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-white/10">
      <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4 bg-white/5 text-brand-goldSoft">
        {icon}
      </div>
      <div className="font-display font-bold text-3xl sm:text-4xl text-white tabular-nums">
        {prefix}
        {display}
        {suffix}
      </div>
      <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-goldSoft mt-2">
        {subtitle}
      </p>
      <p className="text-xs sm:text-sm text-white/60 mt-2 leading-relaxed max-w-[22ch] mx-auto">
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
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      icon: <Building2 className="w-6 h-6" />,
      target: 3,
      prefix: "AED ",
      suffix: "B+",
      subtitle: "Properties Sold",
      description: "Sold every year across the expressway corridor",
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      target: 140,
      suffix: "+",
      subtitle: "Professionals",
      description: "Realtors and marketing specialists on staff",
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      target: 16,
      suffix: " yrs",
      subtitle: "Experience",
      description: "In business on Yamuna Expressway since 2008",
    },
    {
      icon: <Smile className="w-6 h-6" />,
      target: 5000,
      suffix: "+",
      comma: true,
      subtitle: "Happy Clients",
      description: "Served since the company's founding",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-brand-charcoal to-brand-charcoalDeep"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-display italic font-semibold text-brand-goldSoft mb-2">
            Sixteen years, one street
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-white">
            The Most Followed Real Estate Brand – NAVKAAR
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 mt-12 sm:mt-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <StatItem {...stat} inView={inView} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
