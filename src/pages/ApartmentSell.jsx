import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ApartmentSell = () => {
  const [apartments, setApartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const apartmentsPerPage = 6;

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchApartments = async (page = 1) => {
    try {
      const res = await fetch(
        `${API_URL}/api/apartments-for-sale?page=${page}&limit=${apartmentsPerPage}`
      );
      const data = await res.json();
      setApartments(data.data || []);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.page || 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApartments(currentPage);
  }, [currentPage]);

  return (
    <div className="w-full bg-gray-50">
      {/* Apartment Cards Section */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {apartments.map((apt) => (
          <div
            key={apt.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={`${API_URL}${apt.thumbnail}`}
              alt={apt.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {apt.title}
              </h2>
              <p className="text-gray-600 text-sm">📍 {apt.location}</p>
              <p className="text-blue-700 font-medium mt-1">{apt.price}</p>

              <Link
                to={`/apartment-for-sale/${apt.id}`}
                className="mt-3 block text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}

        {apartments.length === 0 && (
          <p className="col-span-3 text-center text-gray-500">
            No apartments available.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 py-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            currentPage === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
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
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ApartmentSell;
