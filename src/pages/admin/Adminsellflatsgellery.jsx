import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminFlatsGallery() {
  const [flats, setFlats] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [form, setForm] = useState({
    id: null,
    flat_id: "",
    title: "",
    description: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Base API URL from .env
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchFlats();
    fetchGallery();
  }, []);

  // Fetch all flats
  const fetchFlats = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/flats`);
      setFlats(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setFlats([]);
    }
  };

  // Fetch gallery items
  const fetchGallery = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/sellflatsgallery`);
      setGallery(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setGallery([]);
    }
  };

  // Handle form inputs
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  // Submit form (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.flat_id || !form.title) {
      alert("Flat and Title are required");
      return;
    }

    const data = new FormData();
    data.append("flat_id", form.flat_id);
    data.append("title", form.title);
    data.append("description", form.description);
    if (form.image) data.append("image", form.image);

    try {
      setLoading(true);
      if (form.id) {
        await axios.put(`${API_URL}/api/sellflatsgallery/${form.id}`, data);
        setMessage("Gallery item updated successfully!");
      } else {
        await axios.post(`${API_URL}/api/sellflatsgallery`, data);
        setMessage("Gallery item added successfully!");
      }

      setForm({ id: null, flat_id: "", title: "", description: "", image: null });
      fetchGallery();
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  // Edit gallery item
  const handleEdit = (item) => {
    setForm({
      id: item.id,
      flat_id: item.flat_id,
      title: item.title,
      description: item.description,
      image: null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete gallery item
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this gallery item?")) {
      try {
        await axios.delete(`${API_URL}/api/sell-flats-gallery/${id}`);
        setMessage("Gallery item deleted successfully!");
        fetchGallery();
        setTimeout(() => setMessage(null), 3000);
      } catch (err) {
        console.error(err);
        setMessage("Error deleting gallery item");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Manage Flats Gallery</h1>

      {message && (
        <div className="mb-4 p-2 bg-green-200 text-green-800 rounded">{message}</div>
      )}

      {/* Form */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="flat_id"
            value={form.flat_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Flat</option>
            {flats.map((flat) => (
              <option key={flat.id} value={flat.id}>
                {flat.sector} - {flat.project_name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 border rounded"
            required
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
            rows={3}
          />

          <div>
            <label className="block mb-1 font-medium">Upload Image</label>
            <input type="file" name="image" onChange={handleChange} />
            {form.image && <p className="mt-1">{form.image.name}</p>}
            {form.id && !form.image && gallery.find((g) => g.id === form.id)?.image && (
              <img
                src={`${API_URL}/uploads/${gallery.find((g) => g.id === form.id).image}`}
                alt="Current"
                className="w-32 h-32 object-cover mt-2 rounded"
              />
            )}
          </div>

          <button
            type="submit"
            className={`px-4 py-2 rounded text-white ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : form.id ? "Update" : "Add"} Gallery Item
          </button>
        </form>
      </div>

      {/* Gallery Table */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Gallery Items</h2>
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Flat</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {gallery.length === 0 ? (
              <tr>
                <td className="border px-4 py-2 text-center" colSpan={6}>
                  No gallery items yet.
                </td>
              </tr>
            ) : (
              gallery.map((item) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{item.id}</td>
                  <td className="border px-4 py-2">{item.sector} - {item.project_name}</td>
                  <td className="border px-4 py-2">{item.title}</td>
                  <td className="border px-4 py-2">{item.description}</td>
                  <td className="border px-4 py-2">
                    {item.image && (
                      <img
                        src={`${API_URL}/uploads/${item.image}`}
                        alt={item.title}
                        className="w-20 h-20 object-cover"
                      />
                    )}
                  </td>
                  <td className="border px-4 py-2 flex gap-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
