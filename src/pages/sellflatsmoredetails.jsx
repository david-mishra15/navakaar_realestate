import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaRupeeSign,
  FaHome,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function MoreDetailsflatsProperty() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propertyRes, galleryRes] = await Promise.all([
          axios.get(`${API_URL}/api/flats/${id}`),
          axios.get(`${API_URL}/api/sellflatsgallery`),
        ]);

        setProperty(propertyRes.data);

        const filteredGallery = Array.isArray(galleryRes.data)
          ? galleryRes.data.filter((item) => item.flat_id === parseInt(id))
          : [];
        setGallery(filteredGallery);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [id, API_URL]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/enquiry`, {
        ...formData,
        property_id: id,
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting enquiry:", err);
    }
  };

  if (!property)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-muted text-lg animate-pulse">
          Loading property details...
        </p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-5 pt-24 space-y-20">
      {/* === HERO SECTION === */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        {/* Left Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="display-lg text-ink">
            Find your dream <br />
            <span className="text-ink">Flat Property</span>
          </h1>
          <p className="lead max-w-lg">
            Discover well-designed flats with comfort, luxury, and affordability —
            the perfect balance of lifestyle and value.
          </p>

          {/* ✅ Gold → Red hover button */}
          <div className="flex gap-4">
            <Link to="/contact-us">
              <motion.button
                className="btn-primary relative overflow-hidden group"
              >
                <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                  Get Started
                </span>
                <span className="absolute inset-0 bg-graphite transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 rounded-md"></span>
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative"
        >
          <div className="bg-stone rounded-sm overflow-hidden relative">
            <img
              src={
                property.image?.startsWith("http")
                  ? property.image
                  : `${API_URL}/uploads/${property.image}`
              }
              alt={property.project_name || "Flat Property"}
              className="w-full h-[400px] object-cover transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 bg-paper text-ink px-6 py-4">
              <h3 className="font-display text-xl font-medium">Featured Flat</h3>
              <p className="text-sm opacity-80">
                {property.project_name || "Project"} - {property.sector}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* === PROPERTY DETAILS + CONTACT === */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10"
      >
        {/* Property Overview */}
        <motion.div
          className="bg-white p-8 sm:p-10 rounded-sm border border-line"
        >
          <h2 className="display-md text-ink mb-8 flex items-center gap-3">
            <FaHome className="text-ink" /> Flat Overview
          </h2>

          <div className="grid grid-cols-2 gap-y-4 text-ink/80 text-sm leading-relaxed">
            {property.price && (
              <p className="col-span-2 font-display text-4xl font-medium text-ink lining-nums flex items-center gap-2 pb-4 mb-2 border-b border-line">
                <FaRupeeSign /> {property.price}
              </p>
            )}
            {property.builder && (
              <p>
                <span className="text-muted">Builder:</span> {property.builder}
              </p>
            )}
            {property.project_name && (
              <p>
                <span className="text-muted">Project:</span>{" "}
                {property.project_name}
              </p>
            )}
            {property.flat_size && (
              <p>
                <span className="text-muted">Flat Size:</span>{" "}
                {property.flat_size}
              </p>
            )}
            {property.bedroom && (
              <p>
                <span className="text-muted">Bedrooms:</span>{" "}
                {property.bedroom}
              </p>
            )}
            {property.bathroom && (
              <p>
                <span className="text-muted">Bathrooms:</span>{" "}
                {property.bathroom}
              </p>
            )}
            {property.other_facilities && (
             <p className="col-span-2 flex items-center gap-2">
  <span className="text-muted">Facilities:</span>

  <span className="px-3 py-1 bg-ink text-white rounded-sm text-sm font-semibold">
    {property.other_facilities}
  </span>
</p>

            )}
            {property.govt_authority && (
              <p>
                <span className="text-muted">Govt Authority:</span>{" "}
                {property.govt_authority}
              </p>
            )}
            {property.description && (
              <p className="col-span-2 text-muted">
                <span className="text-muted">Description:</span>{" "}
                {property.description}
              </p>
            )}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="bg-stone p-8 sm:p-10 rounded-sm border border-line"
        >
          <h2 className="display-md text-ink mb-8">
            Contact Agent
          </h2>

          {submitted ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-600 font-semibold text-center mt-3 text-sm"
            >
              ✅ Thank you! Your enquiry has been sent.
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <FaHome className="absolute left-3 top-3.5 text-subtle" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="field pl-10"
                />
              </div>

              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3.5 text-subtle" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="field pl-10"
                />
              </div>

              <div className="relative">
                <FaPhoneAlt className="absolute left-3 top-3.5 text-subtle" />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="field pl-10"
                />
              </div>

              <textarea
                name="message"
                placeholder="Message (optional)"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                className="field"
              />

              {/* ✅ Gold → Red hover button */}
              <motion.button
                type="submit"
                className="btn-primary relative w-full overflow-hidden group"
              >
                <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                  Submit Enquiry
                </span>
                <span className="absolute inset-0 bg-graphite transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 rounded-md"></span>
              </motion.button>
            </form>
          )}
        </motion.div>
      </motion.div>

      {/* === FLAT GALLERY === */}
      <div className="mt-20 flex flex-col items-center justify-center">
        <h2 className="display-lg text-ink mb-14">
          Flat Gallery
        </h2>

        {gallery.length === 0 ? (
          <p className="text-muted text-sm text-center">
            No images available.
          </p>
        ) : (
          <div className="flex flex-col gap-24 w-full max-w-6xl px-4">
            {gallery.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center gap-10 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="w-full md:w-1/2 overflow-hidden rounded-sm">
                  <img
                    src={`${API_URL}/uploads/${item.image}`}
                    alt={item.title}
                    className="w-full h-[380px] object-cover transition-transform duration-700"
                  />
                </div>

                <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
                  <h3 className="font-display text-3xl font-medium leading-tight text-ink">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-muted leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
