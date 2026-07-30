import React, { useEffect, useState } from "react";

const AdminVilla = () => {
  const [villas, setVillas] = useState([]);
  const [form, setForm] = useState({
    title: "",
    location: "",
    rent: "",
    thumbnail: null,
  });
  const [editingId, setEditingId] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch Villas
  const fetchVillas = async () => {
    try {
      const res = await fetch(`${API_URL}/api/villas`);
      const data = await res.json();
      setVillas(data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVillas();
  }, []);

  // Handle Input Change (text)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle File Change
  const handleFileChange = (e) => {
    setForm({ ...form, thumbnail: e.target.files[0] });
  };

  // Add or Update Villa
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("location", form.location);
      formData.append("rent", form.rent);
      if (form.thumbnail) formData.append("thumbnail", form.thumbnail);

      let res;
      if (editingId) {
        res = await fetch(`${API_URL}/api/villas/${editingId}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        res = await fetch(`${API_URL}/api/villas`, {
          method: "POST",
          body: formData,
        });
      }

      if (res.ok) {
        setForm({ title: "", location: "", rent: "", thumbnail: null });
        setEditingId(null);
        fetchVillas();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Edit Villa
  const handleEdit = (villa) => {
    setForm({
      title: villa.title,
      location: villa.location,
      rent: villa.rent,
      thumbnail: null,
    });
    setEditingId(villa.id);
  };

  // Delete Villa
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this villa?")) return;

    try {
      const res = await fetch(`${API_URL}/api/villas/${id}`, { method: "DELETE" });
      if (res.ok) fetchVillas();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">
        Admin - Manage Villas
      </h1>

      {/* Add / Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-8"
        encType="multipart/form-data"
      >
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
            name="rent"
            value={form.rent}
            onChange={handleChange}
            placeholder="Rent (e.g., ₹2,00,000/month)"
            className="border p-2 rounded"
            required
          />
          <input
            type="file"
            name="thumbnail"
            onChange={handleFileChange}
            className="border p-2 rounded"
            accept="image/*"
            required={!editingId}
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
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Thumbnail</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Rent</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {villas.map((villa, index) => (
              <tr key={villa.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">
                  <img
                    src={`${API_URL}${villa.thumbnail}`}
                    alt={villa.title}
                    className="w-20 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-3">{villa.title}</td>
                <td className="p-3">{villa.location}</td>
                <td className="p-3 text-blue-700 font-semibold">{villa.rent}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleEdit(villa)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(villa.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {villas.length === 0 && (
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

export default AdminVilla;
