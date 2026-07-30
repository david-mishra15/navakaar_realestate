import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminViewVillas() {
  const [villas, setVillas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchVillas();
  }, []);

  const fetchVillas = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/rentyour/villa`);
      const formattedData = (res.data?.data || []).map((villa) => ({
        ...villa,
        images: (() => {
          if (!villa.images) return [];
          if (Array.isArray(villa.images)) return villa.images;
          try {
            const parsed = JSON.parse(villa.images);
            return Array.isArray(parsed) ? parsed : [];
          } catch {
            return [];
          }
        })(),
      }));
      setVillas(formattedData);
    } catch (err) {
      console.error("Error fetching villas:", err);
      setError("Failed to load villas.");
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVillas = villas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(villas.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  if (loading) return <p className="text-center mt-10">Loading villas...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Villas List</h1>

      <div className="border border-gray-200 max-h-[600px] overflow-auto rounded-lg shadow-sm">
        <div className="min-w-[1200px]">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 sticky top-0">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Sector</th>
                <th className="border px-4 py-2">Block No</th>
                <th className="border px-4 py-2">Plot No</th>
                <th className="border px-4 py-2">Plot Size</th>
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
              {currentVillas.map((villa) => (
                <tr key={villa.id} className="text-center hover:bg-gray-50 transition">
                  <td className="border px-4 py-2">{villa.id}</td>
                  <td className="border px-4 py-2">{villa.name}</td>
                  <td className="border px-4 py-2">{villa.phone}</td>
                  <td className="border px-4 py-2">{villa.email || "-"}</td>
                  <td className="border px-4 py-2">{villa.sector || "-"}</td>
                  <td className="border px-4 py-2">{villa.block_no || "-"}</td>
                  <td className="border px-4 py-2">{villa.plot_no || "-"}</td>
                  <td className="border px-4 py-2">{villa.plot_size || "-"}</td>
                  <td className="border px-4 py-2">{villa.bedroom || "-"}</td>
                  <td className="border px-4 py-2">{villa.bathroom || "-"}</td>
                  <td className="border px-4 py-2">{villa.furnish || "-"}</td>
                  <td className="border px-4 py-2">{villa.facing || "-"}</td>
                  <td className="border px-4 py-2">{villa.approx_rent || "-"}</td>
                  <td className="border px-4 py-2">{villa.authority || "-"}</td>
                  <td className="border px-4 py-2">{villa.facilities || "-"}</td>
                  <td className="border px-4 py-2">{villa.anything_else || "-"}</td>
                  <td className="border px-4 py-2">
                    {villa.images.length > 0 ? (
                      <div className="flex gap-2 justify-center flex-wrap">
                        {villa.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={`${API_URL}/uploads/${img}`}
                            alt="villa"
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
