import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminRentOnWarehouses() {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use API URL from .env if needed
  const API_URL = import.meta.env.VITE_API_URL || "";

  const fetchWarehouses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/rentyour/warehouse`);
      const data = Array.isArray(res.data.data) ? res.data.data : [];

      const formatted = data.map(wh => ({
        ...wh,
        images: Array.isArray(wh.images)
          ? wh.images
          : typeof wh.images === "string"
          ? JSON.parse(wh.images || "[]")
          : []
      }));

      setWarehouses(formatted);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching warehouses:", err);
      setError("Failed to fetch warehouses");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading warehouses...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Warehouses</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Plot Size</th>
            <th className="border px-4 py-2">Approx Rent</th>
            <th className="border px-4 py-2">Anything Else</th>
            <th className="border px-4 py-2">Images</th>
            <th className="border px-4 py-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {warehouses.map(wh => (
            <tr key={wh.id} className="text-center">
              <td className="border px-4 py-2">{wh.id}</td>
              <td className="border px-4 py-2">{wh.name}</td>
              <td className="border px-4 py-2">{wh.phone}</td>
              <td className="border px-4 py-2">{wh.email}</td>
              <td className="border px-4 py-2">{wh.plot_size}</td>
              <td className="border px-4 py-2">{wh.approx_rent}</td>
              <td className="border px-4 py-2">{wh.anything_else}</td>
              <td className="border px-4 py-2 flex flex-wrap justify-center gap-2">
                {wh.images.length > 0 ? (
                  wh.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={`${API_URL.replace("/api", "")}/uploads/${img}`}
                      alt={`warehouse-${wh.id}-${idx}`}
                      className="w-20 h-20 object-cover border"
                    />
                  ))
                ) : (
                  <span>No Images</span>
                )}
              </td>
              <td className="border px-4 py-2">
                {wh.created_at ? new Date(wh.created_at).toLocaleString() : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
