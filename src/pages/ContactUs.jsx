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

  const contactRows = [
    {
      Icon: MapPin,
      label: "Head Office",
      value:
        "FF-37, The Hub Runway Suits, Gaur Yamuna City, Sector-19, Greater Noida, 203201, UP, INDIA",
    },
    { Icon: Mail, label: "E-Mail", value: "navkaarnoida@gmail.com" },
    {
      Icon: Phone,
      label: "Telephone",
      value: "+91-9996663239",
      title: "Property Legal & Due Diligence Consultant",
      note: "Real Estate Advisory | Property Chain Verification | Title Due Diligence | Property Litigation Coordination",
    },
    { Icon: Mail, label: "Post Box", value: "128270" },
  ];

  const hours = [
    { day: "Monday", hours: "09:00 AM - 07:00 PM" },
    { day: "Tuesday", hours: "09:00 AM - 07:00 PM" },
    { day: "Wednesday", hours: "09:00 AM - 07:00 PM" },
    { day: "Thursday", hours: "09:00 AM - 07:00 PM" },
    { day: "Friday", hours: "09:00 AM - 07:00 PM" },
    { day: "Saturday", hours: "09:00 AM - 07:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ];

  const fieldLabel = "block text-[12px] font-medium text-muted mb-2";

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      {/* Header Banner */}
      <header
        data-theme="dark"
        className="relative overflow-hidden bg-night h-[62vh] min-h-[440px] max-h-[640px]"
      >
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80"
          alt=""
          className="img-mono absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-night/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/20 to-night/40" />
        <div className="relative h-full flex items-end">
          <div className="container-site pb-14 sm:pb-20">
            <p className="eyebrow !text-white/70 mb-6">Contact Us</p>
            <h1 className="display-xl text-white max-w-4xl">
              Get in Touch <span className="italic">With Us</span>
            </h1>
            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-white/75">
              Have questions or want to collaborate? We're here to help. Send us a
              message anytime.
            </p>
          </div>
        </div>
      </header>

      <main className="flex-grow container-site section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start">
          {/* Contact Info + Operation Hours */}
          <section className="lg:col-span-5">
            <p className="eyebrow mb-5">Contact Details</p>
            <h2 className="display-md text-ink mb-10">Let’s Get In Touch</h2>

            <dl className="border-t border-ink">
              {contactRows.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[2.25rem_1fr] gap-3 py-5 border-b border-line"
                >
                  <row.Icon className="w-[18px] h-[18px] mt-0.5 text-muted" strokeWidth={1.5} />
                  <div>
                    <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                      {row.label}
                    </dt>
                    <dd className="mt-1.5 text-[15px] leading-relaxed text-ink">{row.value}</dd>
                    {row.title && (
                      <dd className="mt-3 font-display text-lg leading-snug text-ink">{row.title}</dd>
                    )}
                    {row.note && (
                      <dd className="mt-1 text-[13px] leading-relaxed text-muted">{row.note}</dd>
                    )}
                  </div>
                </div>
              ))}
            </dl>

            {/* Operation Hours */}
            <div data-theme="dark" className="mt-12 bg-night text-white rounded-sm p-7 sm:p-9">
              <h3 className="flex items-center gap-3 font-display text-2xl font-medium mb-6">
                <Clock className="w-5 h-5 text-mist" strokeWidth={1.5} /> Operation Hours
              </h3>
              <ul className="text-[14px]">
                {hours.map(({ day, hours }) => (
                  <li
                    key={day}
                    className="flex justify-between gap-4 py-3 border-b border-white/10 last:border-0"
                  >
                    <span className="text-white">{day}</span>
                    <span className={`tabular-nums ${hours === "Closed" ? "text-mist" : "text-white/80"}`}>
                      {hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Contact Form */}
          <section className="lg:col-span-7 lg:sticky lg:top-28">
            <div className="bg-white border border-line rounded-sm p-7 sm:p-10 lg:p-12">
              <p className="eyebrow mb-5">Enquiry</p>
              <h2 className="display-md text-ink mb-8 sm:mb-10">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className={fieldLabel}>Your Name</span>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="field"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className={fieldLabel}>Your phone</span>
                    <input
                      type="phone"
                      name="phone"
                      placeholder="Your phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="field"
                      required
                    />
                  </label>
                </div>

                <label className="block">
                  <span className={fieldLabel}>Subject</span>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="field"
                    required
                  />
                </label>

                <label className="block">
                  <span className={fieldLabel}>Your Message</span>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="field resize-y"
                    required
                  ></textarea>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full sm:w-auto !mt-7"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </section>
        </div>

        {/* Google Map */}
        <div className="mt-20 lg:mt-28 rounded-sm overflow-hidden border border-line">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.891987370681!2d77.58368141505902!3d28.34721688252969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cddd8b8c42f3b%3A0x3a7ff2db4f6b6d1d!2sYamuna%20Expressway!5e0!3m2!1sen!2sin!4v1694171750000!5m2!1sen!2sin"
            width="100%"
            height="300"
            className="block sm:h-[350px] md:h-[400px] lg:h-[500px] grayscale contrast-[1.05] hover:grayscale-0 transition-[filter] duration-700"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </main>

      {/* Footer */}
      <footer className="container-site text-center py-6 text-subtle text-xs border-t border-line">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
}
