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

export default function MoreresidentialDetailsProperty() {
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
          axios.get(`${API_URL}/api/residential/${id}`),
          axios.get(`${API_URL}/api/residential-sell-gallery`),
        ]);
        setProperty(propertyRes.data);

        const filteredGallery = Array.isArray(galleryRes.data)
          ? galleryRes.data.filter((item) => item.plot_id === parseInt(id))
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
        <p className="text-gray-500 text-lg animate-pulse">
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
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-5xl font-bold leading-snug text-gray-900">
            Find Your Dream{" "}
            <span className="text-[#CA8B06]">Residential Property</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Explore premium homes designed for comfort, luxury, and lasting
            value. Get the best deals from trusted listings with NAVKAAR.
          </p>

          <div className="flex gap-4">
            <Link to="/contact-us">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-[#CA8B06] hover:bg-[#9A0000] text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-xl transition-all"
              >
                Get Started
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
          <div className="bg-[#002B5B] rounded-3xl shadow-2xl overflow-hidden relative">
            <img
              src={
                property.image?.startsWith("http")
                  ? property.image
                  : `${API_URL}/uploads/${property.image}`
              }
              alt={property.sector}
              className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-6 left-6 bg-white/90 text-[#002B5B] px-5 py-3 rounded-xl shadow-lg backdrop-blur-sm">
              <h3 className="text-lg font-semibold">Latest Property</h3>
              <p className="text-sm opacity-80">
                {property.sector} - {property.block_no}
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
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="bg-white/95 backdrop-blur-lg p-10 rounded-3xl shadow-lg border border-gray-100"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <FaHome className="text-[#CA8B06]" /> Property Overview
          </h2>

          <div className="grid grid-cols-2 gap-y-4 text-gray-700 text-sm leading-relaxed">
            {property.price && (
              <p className="col-span-2 text-2xl font-bold text-[#9A0000] flex items-center gap-2">
                <FaRupeeSign /> {property.price}
              </p>
            )}
          
            {property.sector && (
              <p>
                <span className="font-medium text-gray-800">Sector:</span>{" "}
                {property.sector}
              </p>
            )}
           
            {property.plot_size && (
              <p>
                <span className="font-medium text-gray-800">Plot Size:</span>{" "}
                {property.plot_size}
              </p>
            )}
            {property.facing && (
              <p>
                <span className="font-medium text-gray-800">Facing:</span>{" "}
                {property.facing}
              </p>
            )}
            {property.govt_authority && (
              <p>
                <span className="font-medium text-gray-800">Authority:</span>{" "}
                {property.govt_authority}
              </p>
            )}
            {property.other_facilities && (
             <p className="col-span-2 flex items-center gap-2">
  <span className="font-medium text-gray-800">Facilities:</span>

  <span className="px-3 py-1 bg-orange-500 text-white rounded-lg text-sm font-semibold">
    {property.other_facilities}
  </span>
</p>

            )}
            {property.description && (
              <p className="col-span-2 text-gray-600">
                <span className="font-medium text-gray-800">Description:</span>{" "}
                {property.description}
              </p>
            )}
          </div>
        </motion.div>

        {/* Contact Agent */}
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="bg-gradient-to-br from-yellow-50 to-rose-50 p-10 rounded-3xl shadow-lg border border-[#CA8B06]/30"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
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
                <FaHome className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#CA8B06] text-sm"
                />
              </div>

              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#CA8B06] text-sm"
                />
              </div>

              <div className="relative">
                <FaPhoneAlt className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#CA8B06] text-sm"
                />
              </div>

              <textarea
                name="message"
                placeholder="Message (optional)"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#CA8B06] text-sm"
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="relative w-full overflow-hidden rounded-xl border bg-[#CA8B06] py-3 font-medium text-white shadow-md hover:shadow-lg transition-all duration-500 group"
              >
                <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                  Submit Enquiry
                </span>
                <span className="absolute inset-0 bg-[#9A0000] transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 rounded-xl"></span>
              </motion.button>
            </form>
          )}
        </motion.div>
      </motion.div>

      {/* === PROPERTY GALLERY === */}
      <div className="mt-20 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-14 border-b-4 border-[#CA8B06] pb-3">
          Property Gallery
        </h2>

        {gallery.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">
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
                {/* Image */}
                <div className="w-full md:w-1/2 overflow-hidden rounded-3xl shadow-xl">
                  <img
                    src={`${API_URL}/uploads/${item.image}`}
                    alt={item.title}
                    className="w-full h-[380px] object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                {/* Text */}
                <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
                  <h3 className="text-2xl font-semibold text-[#CA8B06]">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-gray-600 leading-relaxed tracking-wide">
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
