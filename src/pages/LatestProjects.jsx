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
    <section className="w-full bg-stone section overflow-hidden">
      <div className="container-site">
        {/* ===== Heading ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-end mb-10 md:mb-14">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">Fresh On The Market</p>
            <h2 className="display-lg text-ink">Latest Projects</h2>
          </div>
          <p className="lg:col-span-5 lg:justify-self-end text-muted max-w-sm">
            Swipe or scroll through what's newest across the portfolio.
          </p>
        </div>

        {/* ===== Filter Buttons ===== */}
        <div className="flex flex-wrap gap-2 mb-10 pb-10 border-b border-ink/10" role="group" aria-label="Filter projects">
          {["All", "Commercials", "Plots", "Flats", "Villas"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                setCurrentPage(1);
              }}
              aria-pressed={filter === cat}
              className={`chip ${filter === cat ? "chip-active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ===== Project Cards — horizontal filmstrip, snaps on mobile ===== */}
        {currentProjects.length === 0 ? (
          <p className="text-muted">No projects found.</p>
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
              className="chip disabled:opacity-40 disabled:hover:border-line disabled:hover:text-muted disabled:cursor-not-allowed"
            >
              Prev
            </button>

            {getPageNumbers().map((num, i) =>
              num === "..." ? (
                <span key={i} className="px-2 text-subtle">
                  ...
                </span>
              ) : (
                <button
                  key={i}
                  onClick={() => setCurrentPage(num)}
                  aria-current={currentPage === num ? "page" : undefined}
                  className={`chip !px-4 tabular-nums ${currentPage === num ? "chip-active" : ""}`}
                >
                  {num}
                </button>
              )
            )}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
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
