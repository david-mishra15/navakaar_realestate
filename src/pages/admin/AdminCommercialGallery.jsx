import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminCommercialGalleryy() {
  const [gallery, setGallery] = useState([]);
  const [properties, setProperties] = useState([]); // ✅ New state for dropdown
  const [form, setForm] = useState({
    property_id: "",
    title: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchGallery = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/commercial-property-details`);
      setGallery(res.data);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    }
  };

  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/sell-commercial`);
      setProperties(res.data);
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
  };

  useEffect(() => {
    fetchGallery();
    fetchProperties(); // ✅ Load all commercial plots for dropdown
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("property_id", form.property_id);
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (image) formData.append("image", image);

    try {
      if (editingId) {
        await axios.put(`${API_URL}/api/commercial-property-details/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Gallery item updated!");
      } else {
        await axios.post(`${API_URL}/api/commercial-property-details`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Gallery item added!");
      }
      setForm({ property_id: "", title: "", description: "" });
      setImage(null);
      setEditingId(null);
      fetchGallery();
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({
      property_id: item.property_id,
      title: item.title,
      description: item.description,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`${API_URL}/api/commercial-property-details/${id}`);
        alert("Gallery item deleted!");
        fetchGallery();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ property_id: "", title: "", description: "" });
    setImage(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">{editingId ? "Edit Gallery Item" : "Add Gallery Item"}</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid md:grid-cols-2 gap-3">
          {/* ✅ Dropdown for property selection */}
          <select
            name="property_id"
            value={form.property_id}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Select Property</option>
            {properties.map((plot) => (
              <option key={plot.id} value={plot.id}>
                {plot.sector} - {plot.plot_no} ({plot.plot_size})
              </option>
            ))}
          </select>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="border p-2 rounded w-full"
            required
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 rounded w-full"
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="flex gap-3 mt-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Gallery Table */}
      <h3 className="text-xl font-semibold mb-3">All Gallery Items</h3>
      {gallery.length === 0 ? (
        <p>No gallery items found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Property ID</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {gallery.map((item) => (
                <tr key={item.id}>
                  <td className="p-2 border">{item.property_id}</td>
                  <td className="p-2 border">{item.title}</td>
                  <td className="p-2 border">{item.description}</td>
                  <td className="p-2 border">
                    {item.image && (
                      <img
                        src={`${API_URL}/uploads/${item.image}`}
                        alt={item.title}
                        className="w-20 h-20 object-cover"
                      />
                    )}
                  </td>
                  <td className="p-2 border flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
