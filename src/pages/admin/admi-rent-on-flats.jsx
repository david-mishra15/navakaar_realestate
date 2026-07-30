import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminViewFlats() {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchFlats();
  }, []);

  const fetchFlats = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/rentyour/flats`);
      const formattedData = (res.data?.data || []).map((flat) => ({
        ...flat,
        images: (() => {
          if (!flat.images) return [];
          if (Array.isArray(flat.images)) return flat.images;
          try {
            const parsed = JSON.parse(flat.images);
            return Array.isArray(parsed) ? parsed : [];
          } catch {
            return [];
          }
        })(),
      }));
      setFlats(formattedData);
    } catch (err) {
      console.error("Error fetching flats:", err);
      setError("Failed to load flats.");
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFlats = flats.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(flats.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  if (loading) return <p className="text-center mt-10">Loading flats...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Flats List</h1>

      <div className="overflow-auto max-h-[600px] border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 sticky top-0">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Sector</th>
              <th className="border px-4 py-2">Tower No</th>
              <th className="border px-4 py-2">Flat No</th>
              <th className="border px-4 py-2">Floor</th>
              <th className="border px-4 py-2">Builder Project</th>
              <th className="border px-4 py-2">Flat Size</th>
              <th className="border px-4 py-2">Bedroom</th>
              <th className="border px-4 py-2">Bathroom</th>
              <th className="border px-4 py-2">Furnish</th>
              <th className="border px-4 py-2">Facing</th>
              <th className="border px-4 py-2">Approx Rent</th>
              <th className="border px-4 py-2">Authority</th>
              <th className="border px-4 py-2">Facilities</th>
              <th className="border px-4 py-2">Anything Else</th>
              <th className="border px-4 py-2">Images</th>
            </tr>
          </thead>
          <tbody>
            {currentFlats.map((flat) => (
              <tr key={flat.id} className="text-center hover:bg-gray-50 transition">
                <td className="border px-4 py-2">{flat.id}</td>
                <td className="border px-4 py-2">{flat.name}</td>
                <td className="border px-4 py-2">{flat.phone}</td>
                <td className="border px-4 py-2">{flat.email || "-"}</td>
                <td className="border px-4 py-2">{flat.sector || "-"}</td>
                <td className="border px-4 py-2">{flat.tower_no || "-"}</td>
                <td className="border px-4 py-2">{flat.flat_no || "-"}</td>
                <td className="border px-4 py-2">{flat.floor || "-"}</td>
                <td className="border px-4 py-2">{flat.builder_project_name || "-"}</td>
                <td className="border px-4 py-2">{flat.flat_size || "-"}</td>
                <td className="border px-4 py-2">{flat.bedroom || "-"}</td>
                <td className="border px-4 py-2">{flat.bathroom || "-"}</td>
                <td className="border px-4 py-2">{flat.furnish || "-"}</td>
                <td className="border px-4 py-2">{flat.facing || "-"}</td>
                <td className="border px-4 py-2">{flat.approx_rent || "-"}</td>
                <td className="border px-4 py-2">{flat.authority || "-"}</td>
                <td className="border px-4 py-2">{flat.facilities || "-"}</td>
                <td className="border px-4 py-2">{flat.anything_else || "-"}</td>
                <td className="border px-4 py-2">
                  {flat.images.length > 0 ? (
                    <div className="flex gap-2 justify-center flex-wrap">
                      {flat.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={`${API_URL}/uploads/${img}`}
                          alt="flat"
                          className="w-20 h-20 object-cover border rounded"
                        />
                      ))}
                    </div>
                  ) : (
                    "No Images"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
