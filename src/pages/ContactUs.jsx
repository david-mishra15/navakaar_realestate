import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });
  const API_URL = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", phone: "", subject: "", message: "" });
      } else {
        alert(data.error || "Failed to send message");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-paper flex flex-col">
      {/* Header Banner */}
      <header
        className="relative bg-cover bg-center bg-no-repeat h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/40 to-brand-charcoal/80 flex flex-col justify-center items-center text-center px-4">
          <h1 className="font-display text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold drop-shadow-lg tracking-wide">
            Get in Touch With Us
          </h1>
          <p className="text-gray-200 mt-3 sm:mt-4 max-w-2xl md:max-w-3xl text-sm sm:text-base md:text-lg lg:text-xl font-light drop-shadow-md leading-relaxed">
            Have questions or want to collaborate? We're here to help. Send us a
            message anytime.
          </p>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 py-10 md:py-16">
        {/* Contact Info + Operation Hours */}
        <section className="max-w-6xl mx-auto mb-12 md:mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {/* Left: Contact Info */}
          <div className="bg-white shadow-xl hover:shadow-2xl transition rounded-2xl p-6 sm:p-8 md:p-10">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-brand-ink tracking-wide">
              Let’s Get In Touch
            </h2>
            <div className="space-y-6 sm:space-y-8 text-gray-700">
              {/* Address */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="bg-brand-maroon rounded-full p-2 sm:p-3">
                  <MapPin className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Head Office:</p>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    FF-37, The Hub Runway Suits, Gaur Yamuna City, Sector-19,
                    Greater Noida, 203201, UP, INDIA
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="bg-brand-maroon rounded-full p-2 sm:p-3">
                  <Mail className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">E-Mail:</p>
                  <p className="text-sm sm:text-base text-gray-600">
                    navkaarnoida@gmail.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="bg-brand-maroon rounded-full p-2 sm:p-3">
                  <Phone className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Telephone:</p>
                  <p className="text-sm sm:text-base text-gray-600">
                    +91-9996663035
                  </p>
                </div>
              </div>

              {/* Post Box */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="bg-brand-maroon rounded-full p-2 sm:p-3">
                  <Mail className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Post Box:</p>
                  <p className="text-sm sm:text-base text-gray-600">128270</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Operation Hours */}
          <div className="bg-gradient-to-br from-brand-charcoal to-brand-charcoalDeep rounded-2xl p-6 sm:p-8 md:p-10 text-white shadow-xl">
            <h3 className="font-display text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 flex items-center justify-center gap-2 sm:gap-3 tracking-wide">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6" /> Operation Hours
            </h3>
            <ul className="space-y-3 sm:space-y-4 text-gray-200">
              {[
                { day: "Monday", hours: "09:00 AM - 07:00 PM" },
                { day: "Tuesday", hours: "09:00 AM - 07:00 PM" },
                { day: "Wednesday", hours: "09:00 AM - 07:00 PM" },
                { day: "Thursday", hours: "09:00 AM - 07:00 PM" },
                { day: "Friday", hours: "09:00 AM - 07:00 PM" },
                { day: "Saturday", hours: "09:00 AM - 07:00 PM" },
                { day: "Sunday", hours: "Closed" },
              ].map(({ day, hours }) => (
                <li
                  key={day}
                  className="flex justify-between border-b border-white/20 pb-1 sm:pb-2 text-sm sm:text-base"
                >
                  <span className="font-medium">{day}</span>
                  <span>{hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Contact Form */}
        <section className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition p-6 sm:p-8 md:p-10 max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-brand-ink text-center tracking-wide">
            Send us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-gray-800 focus:ring-2 focus:ring-brand-maroon/40 focus:border-brand-maroon outline-none text-sm sm:text-base"
              required
            />

            <input
              type="phone"
              name="phone"
              placeholder="Your phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-gray-800 focus:ring-2 focus:ring-brand-maroon/40 focus:border-brand-maroon outline-none text-sm sm:text-base"
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-gray-800 focus:ring-2 focus:ring-brand-maroon/40 focus:border-brand-maroon outline-none text-sm sm:text-base"
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-gray-800 focus:ring-2 focus:ring-brand-maroon/40 focus:border-brand-maroon outline-none text-sm sm:text-base"
              required
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-maroon text-white py-2 sm:py-3 rounded-lg font-semibold tracking-wide hover:bg-brand-maroonDeep transition transform hover:scale-[1.02] text-sm sm:text-base disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </section>

        {/* Google Map */}
        <div className="rounded-2xl overflow-hidden shadow-xl max-w-6xl mx-auto">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.891987370681!2d77.58368141505902!3d28.34721688252969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cddd8b8c42f3b%3A0x3a7ff2db4f6b6d1d!2sYamuna%20Expressway!5e0!3m2!1sen!2sin!4v1694171750000!5m2!1sen!2sin"
            width="100%"
            height="300"
            className="sm:h-[350px] md:h-[400px] lg:h-[500px]"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 sm:py-8 text-gray-500 text-xs sm:text-sm border-t border-gray-200">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
}
