// src/pages/AdminRentOnFactories.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminRentOnFactories() {
  const [factories, setFactories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use API URL from .env
  const API_URL = import.meta.env.VITE_API_URL || "";

  const fetchFactories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/rentyour/factory`);
      const data = Array.isArray(res.data.data) ? res.data.data : [];

      // ✅ Parse images safely
      const formatted = data.map(factory => {
        let images = [];
        try {
          if (Array.isArray(factory.images)) images = factory.images;
          else if (typeof factory.images === "string") images = JSON.parse(factory.images || "[]");
        } catch (err) {
          console.error("JSON parse error for factory images:", factory.images);
          images = [];
        }
        return { ...factory, images };
      });

      setFactories(formatted);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching factories:", err);
      setError("Failed to fetch factories");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFactories();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading factories...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Factories</h1>
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
          {factories.map(factory => (
            <tr key={factory.id} className="text-center">
              <td className="border px-4 py-2">{factory.id}</td>
              <td className="border px-4 py-2">{factory.name}</td>
              <td className="border px-4 py-2">{factory.phone}</td>
              <td className="border px-4 py-2">{factory.email}</td>
              <td className="border px-4 py-2">{factory.plot_size}</td>
              <td className="border px-4 py-2">{factory.approx_rent}</td>
              <td className="border px-4 py-2">{factory.anything_else}</td>
              <td className="border px-4 py-2 flex flex-wrap justify-center gap-2">
                {factory.images.length > 0 ? (
                  factory.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={`${API_URL.replace("/api", "")}/uploads/${img}`}
                      alt={`factory-${factory.id}-${idx}`}
                      className="w-20 h-20 object-cover border"
                    />
                  ))
                ) : (
                  <span>No Images</span>
                )}
              </td>
              <td className="border px-4 py-2">
                {factory.created_at ? new Date(factory.created_at).toLocaleString() : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
