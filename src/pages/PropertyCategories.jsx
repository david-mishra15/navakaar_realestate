// src/components/PropertyCategories.jsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function PropertyCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const BASE_URL = import.meta.env.VITE_API_URL;

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/categories`);

        const dataArray = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.data)
          ? res.data.data
          : [];

        setCategories(dataArray);
      } catch (err) {
        console.error(err);
        setError("Failed to load categories.");
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [BASE_URL]);

  // Pagination logic
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = Array.isArray(categories)
    ? categories.slice(startIndex, startIndex + itemsPerPage)
    : [];

  const goToPrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  // Loading & Error
  if (loading)
    return <p className="text-center mt-10">Loading categories...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16 md:mb-20">
        <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3">
          Explore By Category
        </p>
        <h2 className="text-3xl md:text-4xl font-display font-semibold text-brand-ink mb-4">
          Find Your Dream Home with NAVKAAR
        </h2>
        <div className="w-14 h-px bg-brand-gold mb-5"></div>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl">
          Explore exclusive real estate opportunities in prime locations with
          NAVKAAR.
        </p>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-12">
        {currentData.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No categories available.
          </p>
        )}

        {currentData.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
          >
            <Link
              to={`/DreamDetails/${cat.id}`}
              className="relative block rounded-md overflow-hidden group ring-1 ring-brand-ink/[0.06] hover:ring-brand-ink/0 hover:shadow-xl transition-all duration-500"
            >
              <div className="aspect-[4/5] sm:aspect-square overflow-hidden">
                <img
                  src={`${BASE_URL}/uploads/${cat.image}`}
                  alt={cat.title}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/10 to-transparent flex flex-col justify-end p-4 text-white">
                <h3 className="font-display text-base sm:text-lg font-semibold transition-colors duration-300">
                  {cat.title}
                </h3>
                <p className="hidden sm:block text-xs text-gray-200/90 mt-1 transition-colors duration-300 line-clamp-2">
                  {cat.description}
                </p>
                <span className="mt-2.5 inline-flex w-fit items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-brand-goldSoft group-hover:text-white transition-all duration-300">
                  View
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-sm border transition-all duration-300 ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-brand-ink border-brand-ink/20 hover:border-brand-maroon hover:text-brand-maroon"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-sm border transition-all duration-300 ${
                currentPage === index + 1
                  ? "bg-brand-maroon text-white border-brand-maroon"
                  : "bg-white text-brand-ink border-brand-ink/20 hover:border-brand-maroon hover:text-brand-maroon"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-sm border transition-all duration-300 ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-brand-ink border-brand-ink/20 hover:border-brand-maroon hover:text-brand-maroon"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
