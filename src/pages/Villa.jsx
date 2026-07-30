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
    <div className="w-full bg-gray-50">


      {/* Villas List */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {villas.map((villa) => (
          <div
            key={villa.id}
            className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={`${API_URL}${villa.thumbnail}`}
              alt={villa.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {villa.title}
              </h2>
              <p className="text-gray-600 text-sm mt-1">📍 {villa.location}</p>
              <p className="text-blue-700 font-semibold mt-1">{villa.price}</p>

              {/* Link to Villa Details */}
              <Link
                to={`/villa-for-sale/${villa.id}`}
                className="mt-4 block text-center bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}

        {villas.length === 0 && (
          <p className="text-center col-span-3 text-gray-500">
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
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
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
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Villa;
