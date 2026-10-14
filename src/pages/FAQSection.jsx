import { useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What are the key considerations when buying property?",
    answer:
      "Key considerations include location, developer reputation, payment plans, property type, and community amenities. It's also important to check legal ownership rights. NAVKAAR – A Real Estate Co. can guide you through the process.",
  },
  {
    question: "How long does it take to purchase property?",
    answer:
      "Typically, it can take between 2 to 6 weeks depending on whether it’s an off-plan or ready property and the financing arrangements. NAVKAAR – A Real Estate Co. helps streamline this process.",
  },
  {
    question: "What fees are associated with purchasing property?",
    answer:
      "Common fees include registration fees, agent commission (usually 2%), and possible service charges. NAVKAAR – A Real Estate Co. provides transparent guidance on all costs.",
  },
  {
    question: "Can I buy a property as a non-resident?",
    answer:
      "Yes, non-residents can purchase property in designated areas. NAVKAAR – A Real Estate Co. assists international clients throughout the process.",
  },
  {
    question: "Can I list my property for sale or rent with NAVKAAR?",
    answer:
      "Yes, NAVKAAR – A Real Estate Co. can assist you with selling or renting your property through their expert brokerage services.",
  },
  {
    question: "How can I find the best investment opportunities?",
    answer:
      "The best investment opportunities can be found by analyzing location demand, rental yields, upcoming developments, and consulting with NAVKAAR – A Real Estate Co.’s property experts.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-paper border-t border-line section">
      <div className="container-site grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Heading */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow mb-5">Good To Know</p>
            <h2 className="display-lg text-ink">
              Frequently Asked <span className="italic">Questions</span>
            </h2>
          </div>
        </div>

        {/* FAQ List */}
        <div className="lg:col-span-8 border-t border-ink">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
                className="border-b border-line"
              >
                {/* Question Button */}
                <button
                  className="group w-full grid grid-cols-[2.5rem_1fr_auto] items-start gap-2 sm:gap-4 py-6 sm:py-7 text-left"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className="pt-1.5 text-[11px] tabular-nums text-subtle">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl sm:text-2xl font-medium leading-snug text-ink">
                    {faq.question}
                  </span>
                  <span
                    className={`mt-0.5 flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300 ${
                      isOpen
                        ? "bg-ink border-ink text-white"
                        : "border-line text-ink group-hover:border-ink"
                    }`}
                  >
                    <Plus
                      size={16}
                      strokeWidth={1.5}
                      className={`transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    />
                  </span>
                </button>

                {/* Animated Answer */}
                <div
                  id={panelId}
                  className={`grid transition-all duration-500 ease-editorial ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pl-[3rem] sm:pl-[3.5rem] pr-12 pb-7 text-muted text-[15px] sm:text-base leading-relaxed max-w-2xl">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
