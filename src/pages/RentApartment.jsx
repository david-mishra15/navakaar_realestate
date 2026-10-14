import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5002";

const RentApartment = () => {
  const [apartments, setApartments] = useState([]);
  const [currentPage] = useState(1);
  const apartmentsPerPage = 6;

  const fetchApartments = async (page = 1) => {
    try {
      const res = await fetch(
        `${API_URL}/api/apartments?page=${page}&limit=${apartmentsPerPage}`
      );
      const data = await res.json();
      setApartments(data.data || []);
    } catch (error) {
      console.error("Error fetching apartments:", error);
    }
  };

  useEffect(() => {
    fetchApartments(currentPage);
  }, [currentPage]);

  return (
    <div className="w-full bg-stone">
      {/* Banner */}


      {/* Apartments list */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {apartments.map((apt) => (
          <div
            key={apt.id}
            className="bg-white shadow-md rounded-sm overflow-hidden hover:shadow-md transition"
          >
            <img
              src={`${API_URL}${apt.thumbnail}`}
              alt={apt.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-ink">
                {apt.title}
              </h2>
              <p className="text-muted text-sm">📍 {apt.location}</p>
              <p className="text-ink font-medium mt-1">{apt.rent}</p>

              <Link
                to={`/rent-apartments/${apt.id}`}
                className="mt-3 block text-center bg-ink hover:bg-graphite text-white text-sm font-medium py-2 px-4 rounded-sm"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}

        {apartments.length === 0 && (
          <p className="col-span-3 text-center text-muted">
            No apartments available.
          </p>
        )}
      </div>
    </div>
  );
};

export default RentApartment;
