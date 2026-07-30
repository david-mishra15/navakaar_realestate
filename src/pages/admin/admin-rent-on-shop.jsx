import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminRentOnShops() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ API URL from .env
  const API_URL = import.meta.env.VITE_API_URL || "";

  const fetchShops = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/rentyour/shop`);
      const data = Array.isArray(res.data.data) ? res.data.data : [];

      // ✅ Parse images safely
      const formatted = data.map(shop => {
        let images = [];
        try {
          if (Array.isArray(shop.images)) images = shop.images;
          else if (typeof shop.images === "string") {
            images = JSON.parse(shop.images || "[]");
          }
        } catch (err) {
          console.error("JSON parse error for shop images:", shop.images);
          images = [];
        }

        return { ...shop, images };
      });

      setShops(formatted);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching shops:", err);
      setError("Failed to fetch shops");
      setLoading(false);
    }
  };

  useEffect(() => { fetchShops(); }, []);

  if (loading) return <p className="text-center mt-10">Loading shops...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Shops</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Plot Size</th>
            <th className="border px-4 py-2">Floor</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Builder Project</th>
            <th className="border px-4 py-2">Approx Rent</th>
            <th className="border px-4 py-2">Anything Else</th>
            <th className="border px-4 py-2">Images</th>
            <th className="border px-4 py-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {shops.map(shop => (
            <tr key={shop.id} className="text-center">
              <td className="border px-4 py-2">{shop.id}</td>
              <td className="border px-4 py-2">{shop.name}</td>
              <td className="border px-4 py-2">{shop.phone}</td>
              <td className="border px-4 py-2">{shop.email}</td>
              <td className="border px-4 py-2">{shop.plot_size}</td>
              <td className="border px-4 py-2">{shop.floor}</td>
              <td className="border px-4 py-2">{shop.address}</td>
              <td className="border px-4 py-2">{shop.type_of_property}</td>
              <td className="border px-4 py-2">{shop.builder_project_name}</td>
              <td className="border px-4 py-2">{shop.approx_rent}</td>
              <td className="border px-4 py-2">{shop.anything_else}</td>
              <td className="border px-4 py-2 flex flex-wrap justify-center gap-2">
                {shop.images.length > 0
                  ? shop.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={`${API_URL}/uploads/${img}`}
                        alt={`shop-${shop.id}-${idx}`}
                        className="w-20 h-20 object-cover border"
                      />
                    ))
                  : <span>No Images</span>}
              </td>
              <td className="border px-4 py-2">{shop.created_at ? new Date(shop.created_at).toLocaleString() : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
