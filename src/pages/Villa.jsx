import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Villa = () => {
  const [villas, setVillas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const villasPerPage = 6;

  const API_URL = import.meta.env.VITE_API_URL; // use env variable

  const fetchVillas = async (page = 1) => {
    try {
      const res = await fetch(
        `${API_URL}/api/villas-for-sale?page=${page}&limit=${villasPerPage}`
      );
      const data = await res.json();
      setVillas(data.data || []);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.page || 1);
    } catch (err) {
      console.error("Failed to fetch villas:", err);
    }
  };

  useEffect(() => {
    fetchVillas(currentPage);
  }, [currentPage]);

  return (
    <div className="w-full bg-stone">


      {/* Villas List */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {villas.map((villa) => (
          <div
            key={villa.id}
            className="bg-white border border-line shadow-sm rounded-md overflow-hidden hover:shadow-md transition"
          >
            <img
              src={`${API_URL}${villa.thumbnail}`}
              alt={villa.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-ink">
                {villa.title}
              </h2>
              <p className="text-muted text-sm mt-1">📍 {villa.location}</p>
              <p className="text-ink font-semibold mt-1">{villa.price}</p>

              {/* Link to Villa Details */}
              <Link
                to={`/villa-for-sale/${villa.id}`}
                className="mt-4 block text-center bg-ink hover:bg-graphite text-white text-sm font-medium py-2 px-4 rounded-sm transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}

        {villas.length === 0 && (
          <p className="text-center col-span-3 text-muted">
            No Villas Found
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 py-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
            currentPage === 1
              ? "bg-gray-300 text-muted cursor-not-allowed"
              : "bg-ink text-white hover:bg-graphite"
          }`}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition ${
              currentPage === index + 1
                ? "bg-ink text-white"
                : "bg-gray-200 text-ink/80 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
            currentPage === totalPages
              ? "bg-gray-300 text-muted cursor-not-allowed"
              : "bg-ink text-white hover:bg-graphite"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Villa;
