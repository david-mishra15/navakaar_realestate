import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
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
    <section className="max-w-5xl mx-auto py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 border-t border-brand-ink/10">
      {/* Heading */}
      <div className="text-center mb-12 md:mb-14">
        <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3">
          Good To Know
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold text-brand-ink">
          Frequently Asked{" "}
          <span className="italic text-brand-maroon">
            Questions
          </span>
        </h2>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: (index % 6) * 0.06 }}
              className={`border rounded-md shadow-sm transition-all duration-300 ease-in-out ${
                isOpen
                  ? "bg-brand-maroon/5 border-brand-maroon/15"
                  : "bg-white border-brand-ink/10 hover:shadow-md"
              }`}
            >
              {/* Question Button */}
              <button
                className="w-full flex justify-between items-center px-5 sm:px-6 py-4 sm:py-5 text-left font-semibold text-brand-ink focus:outline-none"
                onClick={() => toggleFAQ(index)}
                aria-expanded={isOpen}
              >
                <span className="text-base sm:text-lg">{faq.question}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-brand-maroon transition-transform duration-300" />
                ) : (
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 transition-transform duration-300" />
                )}
              </button>

              {/* Animated Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "max-h-[300px] opacity-100 px-5 sm:px-6 pb-4"
                    : "max-h-0 opacity-0 px-5 sm:px-6"
                }`}
              >
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
