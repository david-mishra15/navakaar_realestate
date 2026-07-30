import React, { useEffect, useState } from "react";

const AdminVillaSale = () => {
  const [villas, setVillas] = useState([]);
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    thumbnail: null,
    oldThumbnail: "",
  });
  const [editingId, setEditingId] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5002";

  // Fetch villas from backend
  const fetchVillas = async () => {
    try {
      const res = await fetch(`${API_URL}/api/villas-for-sale`);
      const data = await res.json();
      setVillas(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVillas();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    if (e.target.name === "thumbnail") {
      setForm({ ...form, thumbnail: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  // Add or Update villa
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("location", form.location);
    formData.append("price", form.price);

    if (form.thumbnail) {
      formData.append("thumbnail", form.thumbnail);
    } else if (editingId) {
      formData.append("oldThumbnail", form.oldThumbnail);
    }

    try {
      const url = editingId
        ? `${API_URL}/api/villas-for-sale/${editingId}`
        : `${API_URL}/api/villas-for-sale`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, { method, body: formData });

      if (!res.ok) {
        const errorData = await res.json();
        return alert(errorData.message || "Something went wrong");
      }

      // Reset form
      setForm({ title: "", location: "", price: "", thumbnail: null, oldThumbnail: "" });
      setEditingId(null);
      fetchVillas();
    } catch (err) {
      console.error(err);
    }
  };

  // Edit villa
  const handleEdit = (villa) => {
    setForm({
      title: villa.title,
      location: villa.location,
      price: villa.price,
      thumbnail: null,
      oldThumbnail: villa.thumbnail,
    });
    setEditingId(villa.id);
  };

  // Delete villa
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this villa?")) return;
    try {
      const res = await fetch(`${API_URL}/api/villas-for-sale/${id}`, {
        method: "DELETE",
      });
      if (res.ok) fetchVillas();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">
        Admin - Manage Villas For Sale
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Villa Title"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price (₹)"
            className="border p-2 rounded"
            required
          />
          <input
            type="file"
            name="thumbnail"
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          {editingId ? "Update Villa" : "Add Villa"}
        </button>
      </form>

      {/* Villas Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3">#</th>
              <th className="p-3">Thumbnail</th>
              <th className="p-3">Title</th>
              <th className="p-3">Location</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {villas.length > 0 ? (
              villas.map((villa, idx) => (
                <tr key={villa.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">
                    {villa.thumbnail && (
                      <img
                        src={`${API_URL}/${villa.thumbnail}`}
                        alt={villa.title}
                        className="w-20 h-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="p-3">{villa.title}</td>
                  <td className="p-3">{villa.location}</td>
                  <td className="p-3 text-blue-700 font-semibold">{villa.price}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleEdit(villa)}
                      className="bg-yellow-500 px-3 py-1 rounded text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(villa.id)}
                      className="bg-red-600 px-3 py-1 rounded text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No Villas Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminVillaSale;
