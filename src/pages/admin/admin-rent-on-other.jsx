import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminRentOnOtherProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "";

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/rentyour/other`);
      const data = Array.isArray(res.data.data) ? res.data.data : [];

      const formatted = data.map(prop => ({
        ...prop,
        images: Array.isArray(prop.images)
          ? prop.images
          : typeof prop.images === "string"
          ? JSON.parse(prop.images || "[]")
          : [],
      }));

      setProperties(formatted);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching other properties:", err);
      setError("Failed to fetch other properties");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading properties...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Other Properties</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Approx Rent</th>
            <th className="border px-4 py-2">Anything Else</th>
            <th className="border px-4 py-2">Images</th>
            <th className="border px-4 py-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {properties.map(prop => (
            <tr key={prop.id} className="text-center">
              <td className="border px-4 py-2">{prop.id}</td>
              <td className="border px-4 py-2">{prop.name}</td>
              <td className="border px-4 py-2">{prop.phone}</td>
              <td className="border px-4 py-2">{prop.email}</td>
              <td className="border px-4 py-2">{prop.approx_rent}</td>
              <td className="border px-4 py-2">{prop.anything_else}</td>
              <td className="border px-4 py-2 flex flex-wrap justify-center gap-2">
                {prop.images.length > 0 ? (
                  prop.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={`${API_URL.replace("/api", "")}/uploads/${img}`}
                      alt={`other-${prop.id}-${idx}`}
                      className="w-20 h-20 object-cover border"
                    />
                  ))
                ) : (
                  <span>No Images</span>
                )}
              </td>
              <td className="border px-4 py-2">
                {prop.created_at ? new Date(prop.created_at).toLocaleString() : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
