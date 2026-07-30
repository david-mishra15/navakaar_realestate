import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminVillaGallery() {
  const [villas, setVillas] = useState([]); 
  const [gallery, setGallery] = useState([]);
  const [form, setForm] = useState({
    id: null,
    villa_id: "",
    title: "",
    description: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchVillas();
    fetchGallery();
  }, []);

  // Fetch villas list
  const fetchVillas = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/sell/villas`);
      setVillas(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching villas:", err);
      setVillas([]);
    }
  };

  // Fetch villa gallery items
  const fetchGallery = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/villa-gallery`);
      setGallery(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching gallery:", err);
      setGallery([]);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  // Add/Update submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.villa_id || !form.title) {
      alert("Villa and Title are required");
      return;
    }

    const data = new FormData();
    data.append("villa_id", form.villa_id);
    data.append("title", form.title);
    data.append("description", form.description);
    if (form.image) data.append("image", form.image);

    try {
      setLoading(true);

      if (form.id) {
        await axios.put(`${API_URL}/api/villa-gallery/${form.id}`, data);
        setMessage("Gallery item updated successfully!");
      } else {
        await axios.post(`${API_URL}/api/villa-gallery`, data);
        setMessage("Gallery item added successfully!");
      }

      setForm({
        id: null,
        villa_id: "",
        title: "",
        description: "",
        image: null,
      });

      fetchGallery();
      setTimeout(() => setMessage(null), 3000);

    } catch (err) {
      console.error("Error submitting form:", err);
      setMessage("Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  // Edit gallery item
  const handleEdit = (item) => {
    setForm({
      id: item.id,
      villa_id: item.villa_id,
      title: item.title,
      description: item.description,
      image: null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete gallery item
  const handleDelete = async (id) => {
    if (window.confirm("Delete this gallery item?")) {
      try {
        await axios.delete(`${API_URL}/api/villa-gallery/${id}`);
        setMessage("Gallery item deleted successfully!");
        fetchGallery();
        setTimeout(() => setMessage(null), 3000);
      } catch (err) {
        console.error("Error deleting gallery item:", err);
        setMessage("Error deleting gallery item");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Manage Villa Gallery</h1>

      {message && (
        <div className="mb-4 p-2 bg-green-200 text-green-800 rounded">
          {message}
        </div>
      )}

      {/* Form */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">

          <select
            name="villa_id"
            value={form.villa_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Villa</option>
            {villas.map((villa) => (
              <option key={villa.id} value={villa.id}>
                {villa.sector} - {villa.plot_no}
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
            {form.image && <p>{form.image.name}</p>}

            {form.id &&
              !form.image &&
              gallery.find((g) => g.id === form.id)?.image && (
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

      {/* Table */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Gallery Items</h2>

        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Villa</th>
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
                  <td className="border px-4 py-2">
                    {item.sector} - {item.plot_no}
                  </td>
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
