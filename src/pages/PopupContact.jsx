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
        className="fixed bottom-24 sm:bottom-6 left-4 sm:left-6 z-40 flex items-center gap-2 bg-brand-maroon hover:bg-brand-maroonDeep text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
      >
        <MessageSquareText size={18} />
        <span className="text-sm font-semibold">Enquire Now</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-brand-charcoalDeep/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-2xl relative animate-fadeIn border border-brand-gold/30">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-brand-maroon transition"
            >
              <X size={24} />
            </button>

            {/* Title */}
            <h2 className="font-display text-3xl font-semibold mb-2 text-center text-brand-maroon">
              Let’s Get In Touch
            </h2>
            <p className="text-center text-brand-gold mb-6">
              We’d love to hear from you — send us a quick message!
            </p>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-brand-gold/50 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-brand-maroon/40 outline-none"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone *"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-brand-gold/50 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-brand-maroon/40 outline-none"
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border border-brand-gold/50 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-brand-maroon/40 outline-none"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full border border-brand-gold/50 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-brand-maroon/40 outline-none"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-brand-maroon text-white py-3 rounded-lg font-semibold tracking-wide hover:bg-brand-maroonDeep transition transform hover:scale-[1.02]"
              >
                Send Message
              </button>
            </form>

            {/* Only Phone Info */}
            <div className="mt-8 text-gray-700 text-sm text-center">
              <p className="flex items-center justify-center gap-2 text-brand-maroon">
                <Phone size={16} /> +91-9996663035
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
