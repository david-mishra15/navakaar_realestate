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
    return <p className="container-site py-16 text-muted">Loading categories...</p>;
  if (error)
    return <p className="container-site py-16 text-red-700">{error}</p>;

  return (
    <section className="bg-white section">
      <div className="container-site">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-end mb-12 md:mb-16">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">Explore By Category</p>
            <h2 className="display-lg text-ink">
              Find Your Dream Home with <span className="italic">NAVKAAR</span>
            </h2>
          </div>
          <p className="lg:col-span-5 lg:justify-self-end lead max-w-md">
            Explore exclusive real estate opportunities in prime locations with
            NAVKAAR.
          </p>
        </div>

        {/* Category Cards — the first tile leads at double size on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-12">
          {currentData.length === 0 && (
            <p className="col-span-full border-t border-line pt-8 text-muted">
              No categories available.
            </p>
          )}

          {currentData.map((cat, index) => {
            const feature = index === 0 && currentData.length >= 3;
            return (
              <motion.div
                key={cat.id}
                className={feature ? "sm:col-span-2 lg:row-span-2" : ""}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
              >
                <Link
                  to={`/DreamDetails/${cat.id}`}
                  className="relative block h-full rounded-sm overflow-hidden group bg-coal"
                >
                  <div
                    className={`h-full overflow-hidden ${
                      feature ? "aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto" : "aspect-[4/5] sm:aspect-square"
                    }`}
                  >
                    <img
                      src={`${BASE_URL}/uploads/${cat.image}`}
                      alt={cat.title}
                      loading="lazy"
                      decoding="async"
                      sizes={feature ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
                      className="img-mono w-full h-full object-cover transition-[transform,filter] duration-[1200ms] ease-editorial group-hover:scale-[1.03] group-hover:[filter:none]"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/15 to-transparent flex flex-col justify-end p-5 sm:p-6 text-white">
                    <h3 className={`font-display font-medium leading-tight ${feature ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
                      {cat.title}
                    </h3>
                    {cat.description && (
                      <p className={`text-sm text-white/75 mt-2 line-clamp-2 max-w-md ${feature ? "" : "hidden sm:block"}`}>
                        {cat.description}
                      </p>
                    )}
                    <span className="mt-4 inline-flex w-fit items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/80 group-hover:text-white transition-colors duration-300">
                      View
                      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center items-center gap-2">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="chip disabled:opacity-40 disabled:hover:border-line disabled:hover:text-muted disabled:cursor-not-allowed"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                aria-current={currentPage === index + 1 ? "page" : undefined}
                className={`chip !px-4 tabular-nums ${currentPage === index + 1 ? "chip-active" : ""}`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="chip disabled:opacity-40 disabled:hover:border-line disabled:hover:text-muted disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
