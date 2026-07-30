import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaRupeeSign, FaHome } from "react-icons/fa";

export default function MoreDetailsVilla() {
  const { id } = useParams();
  const [villa, setVilla] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5002";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [villaRes, galleryRes] = await Promise.all([
          axios.get(`${API_URL}/api/sell/villas/${id}`),
          axios.get(`${API_URL}/api/villa-gallery`),
        ]);

        setVilla(villaRes.data);

        const filteredGallery = Array.isArray(galleryRes.data)
          ? galleryRes.data.filter((item) => item.villa_id === parseInt(id))
          : [];

        setGallery(filteredGallery);
      } catch (err) {
        console.error("Error fetching villa details:", err);
      }
    };

    fetchData();
  }, [id]);

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
      console.error("Error sending enquiry:", err);
    }
  };

  if (!villa)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-gray-500 text-lg animate-pulse">Loading villa details...</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-5 pt-24 space-y-20 bg-gray-50 pb-24 ">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">
            Premium{" "}
            <span className="bg-gradient-to-r from-[#CA8B06] to-[#9A0000] bg-clip-text text-transparent">
              Luxury Villas
            </span>
          </h1>

          <p className="text-gray-600 text-lg">
            Find your dream villa with luxury features and stunning locations.
          </p>

          <Link to="/contact-us">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-xl bg-[#CA8B06] text-white shadow-md hover:bg-[#9A0000]"
            >
              Get Started
            </motion.button>
          </Link>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="rounded-3xl overflow-hidden shadow-xl border bg-white"
        >
          <img
            src={
              villa.image?.startsWith("http")
                ? villa.image
                : `${API_URL}/uploads/${villa.image}`
            }
            alt="Villa"
            className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
          />
        </motion.div>
      </motion.div>

      {/* OVERVIEW + CONTACT FORM */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* OVERVIEW CARD */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-10 rounded-3xl shadow-md border"
        >
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-5">
            <FaHome className="text-[#9A0000]" /> Villa Overview
          </h2>

          <div className="grid grid-cols-2 gap-y-4 text-gray-700">
            <p className="col-span-2 text-2xl font-bold text-[#CA8B06] flex items-center gap-2">
              <FaRupeeSign /> {villa.price}
            </p>

            <p>
              <strong>Sector:</strong> {villa.sector}
            </p>
            <p>
              <strong>Builder:</strong> {villa.builder}
            </p>
            <p>
              <strong>Project:</strong> {villa.project_name}
            </p>
            <p>
              <strong>Size:</strong> {villa.villa_size}
            </p>
            <p>
              <strong>Bedrooms:</strong> {villa.bedroom}
            </p>
            <p>
              <strong>Bathrooms:</strong> {villa.bathroom}
            </p>

            {villa.govt_authority && (
              <p className="col-span-2">
                <strong>Authority:</strong> {villa.govt_authority}
              </p>
            )}

            {villa.other_facilities && (
              <p className="col-span-2">
                <strong>Facilities:</strong> {villa.other_facilities}
              </p>
            )}
          </div>
        </motion.div>

        {/* CONTACT FORM */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-10 rounded-3xl shadow-md border"
        >
          <h2 className="text-2xl font-bold mb-5 text-center">Contact Agent</h2>

          {submitted ? (
            <p className="text-green-600 font-semibold text-center">
              Thank you! Your enquiry has been sent.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-xl"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-xl"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-xl"
              />

              <textarea
                name="message"
                placeholder="Message (optional)"
                rows="3"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
              />

              <button
                type="submit"
                className="w-full bg-[#CA8B06] text-white py-3 rounded-xl hover:bg-[#9A0000]"
              >
                Submit Enquiry
              </button>
            </form>
          )}
        </motion.div>
      </div>

      {/* GALLERY */}
      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold mb-10">Villa Gallery</h2>

        {gallery.length === 0 ? (
          <p className="text-gray-500">No images available.</p>
        ) : (
          <div className="flex flex-col gap-20 max-w-6xl mx-auto">
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
                <div className="w-full md:w-1/2 rounded-3xl overflow-hidden shadow-xl border bg-white">
                  <img
                    src={`${API_URL}/uploads/${item.image}`}
                    alt={item.title}
                    className="w-full h-[380px] object-cover hover:scale-105 transition-transform"
                  />
                </div>

                <div className="w-full md:w-1/2 text-center md:text-left space-y-3">
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
