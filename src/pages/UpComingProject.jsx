import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // Read API URL from .env

const UpComingProjectUser = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 6; // Projects per page

  // Fetch projects from backend
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/upcomingprojects`);
      const projectsArray = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];
      setProjects(projectsArray);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setProjects([]);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Pagination logic
  const indexOfLast = currentPage * dataPerPage;
  const indexOfFirst = indexOfLast - dataPerPage;
  const currentData = projects.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(projects.length / dataPerPage);

  return (
    <div className="w-full">
      {/* Hero Section */}


      {/* Projects Grid */}
      <div className="max-w-6xl mx-auto p-4 sm:p-6 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {currentData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-md shadow-sm overflow-hidden hover:shadow-md transition duration-300"
          >
            {item.thumbnail && (
              <img
                src={`${API_URL}/uploads/${item.thumbnail}`}
                alt={item.title}
                className="w-full h-40 sm:h-48 md:h-52 object-cover"
              />
            )}
            <div className="p-3 sm:p-4">
              <h2 className="text-base sm:text-lg font-semibold text-ink">
                {item.title}
              </h2>
              <p className="text-xs sm:text-sm text-muted mt-2">
                {item.description}
              </p>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <p className="text-center col-span-full text-muted mt-4">
            No projects found.
          </p>
        )}
      </div>

      {/* Pagination */}
      {projects.length > dataPerPage && (
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 my-6">
          <button
            className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-sm disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <span className="text-ink/80 text-sm sm:text-base">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded-sm disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default UpComingProjectUser;
