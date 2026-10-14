import { useState } from "react";
import { Phone, X, MessageSquareText } from "lucide-react";
import axios from "axios";

export default function ContactPopupOnScroll() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5002";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.phone.trim()) {
      alert("Phone number is required!");
      return;
    }
    console.log("Form submitted ✅", formData);
    // Reset form if needed
    setFormData({ name: "", phone: "", subject: "", message: "" });
    const res = await axios.post(`${API_URL}/api/contact`, formData);
    if (res.status === 200) {
      alert("Message sent successfully!");
    } else {
      alert("Failed to send message");
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating trigger — the only way this popup opens now */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-40 flex items-center gap-2.5 bg-ink hover:bg-graphite text-white pl-4 pr-5 py-3 rounded-full ring-1 ring-white/20 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] transition-colors duration-300"
      >
        <MessageSquareText size={16} strokeWidth={1.5} />
        <span className="text-[13px] font-medium tracking-[0.04em]">Enquire Now</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-night/75 backdrop-blur-[2px] flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-title"
            className="bg-paper rounded-sm w-full max-w-xl max-h-[calc(100svh-2rem)] overflow-y-auto relative animate-fadeInUp border border-line"
          >
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 p-1 text-muted hover:text-ink transition-colors"
            >
              <X size={22} strokeWidth={1.5} />
            </button>

            <div className="p-7 sm:p-10">
              {/* Title */}
              <p className="eyebrow mb-4">Enquire Now</p>
              <h2 id="enquiry-title" className="display-md text-ink">
                Let’s Get In Touch
              </h2>
              <p className="mt-3 mb-8 text-sm text-muted">
                We’d love to hear from you — send us a quick message!
              </p>

              {/* Form */}
              <form className="space-y-3" onSubmit={handleSubmit}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    aria-label="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="field"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone *"
                    aria-label="Your Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="field"
                    required
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  aria-label="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="field"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  aria-label="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="field resize-none"
                ></textarea>

                <button type="submit" className="btn-primary w-full !mt-5">
                  Send Message
                </button>
              </form>
            </div>

            {/* Only Phone Info */}
            <div className="border-t border-line px-7 sm:px-10 py-5 text-sm">
              <p className="flex items-center gap-2.5 text-ink tabular-nums">
                <Phone size={15} strokeWidth={1.5} className="text-muted" /> +91-9996663035
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
