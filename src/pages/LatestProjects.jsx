import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import PropertyCard from "../components/PropertyCard";

export default function LatestProjects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/latestprojects`);
        const dataArray = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.data)
          ? res.data.data
          : [];
        setProjects(dataArray);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setProjects([]);
      }
    };
    fetchProjects();
  }, [API_URL]);

  // Filter projects safely
  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Pagination range generator
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }
    return range;
  };

  return (
    <section className="w-full bg-brand-paperDeep py-16 sm:py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===== Heading ===== */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 md:mb-14">
          <div className="text-center sm:text-left">
            <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3">
              Fresh On The Market
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-brand-ink">
              Latest Projects
            </h2>
            <div className="w-14 h-px bg-brand-gold mt-5 mx-auto sm:mx-0"></div>
          </div>
          <p className="text-sm text-gray-500 max-w-xs text-center sm:text-right">
            Swipe or scroll through what's newest across the portfolio.
          </p>
        </div>

        {/* ===== Filter Buttons ===== */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 mb-10">
          {["All", "Commercials", "Plots", "Flats", "Villas"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                setCurrentPage(1);
              }}
              className={`px-5 sm:px-6 py-2 rounded-sm font-medium border text-sm sm:text-base transition-all duration-300 ${
                filter === cat
                  ? "bg-brand-maroon border-brand-maroon text-white shadow-md"
                  : "bg-white border-brand-ink/15 text-brand-ink hover:border-brand-maroon hover:text-brand-maroon"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ===== Project Cards — horizontal filmstrip, snaps on mobile ===== */}
        {currentProjects.length === 0 ? (
          <p className="text-center text-gray-500">No projects found.</p>
        ) : (
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:thin]">
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="snap-start shrink-0 w-[78vw] xs:w-[340px] sm:w-[calc(33.333%-1rem)]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.12 }}
              >
                <PropertyCard
                  image={project.image ? `${API_URL}${project.image}` : ""}
                  title={project.title}
                  price={project.price}
                  location={project.location}
                  href={`/LatestDetails/${project.id}`}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* ===== Pagination ===== */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 rounded-sm font-medium border text-sm sm:text-base ${
                currentPage === 1
                  ? "bg-gray-200 text-white shadow-md cursor-not-allowed"
                  : "bg-white border-brand-ink/15 text-brand-ink hover:border-brand-maroon hover:text-brand-maroon"
              }`}
            >
              Prev
            </button>

            {getPageNumbers().map((num, i) =>
              num === "..." ? (
                <span key={i} className="px-3 py-1 text-gray-500">
                  ...
                </span>
              ) : (
                <button
                  key={i}
                  onClick={() => setCurrentPage(num)}
                  className={`px-3 py-1.5 rounded-sm font-medium border text-sm sm:text-base ${
                    currentPage === num
                      ? "bg-brand-maroon border-brand-maroon text-white shadow-md"
                      : "bg-white border-brand-ink/15 text-brand-ink hover:border-brand-maroon hover:text-brand-maroon"
                  }`}
                >
                  {num}
                </button>
              )
            )}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1.5 rounded-sm font-medium border text-sm sm:text-base ${
                currentPage === totalPages
                  ? "bg-gray-200 text-white shadow-md cursor-not-allowed"
                  : "bg-white border-brand-ink/15 text-brand-ink hover:border-brand-maroon hover:text-brand-maroon"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
