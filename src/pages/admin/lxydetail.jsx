import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminPropertyGallery() {
  const BASE_URL = import.meta.env.VITE_API_URL;

  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [gallery, setGallery] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", image: null });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
//319918
  // Fetch all properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/properties`);
        setProperties(res.data);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
      }
    };
    fetchProperties();
  }, []);

  // Fetch gallery when property changes
  useEffect(() => {
    if (selectedProperty) {
      fetchGallery(selectedProperty);
    } else {
      setGallery([]);
      setEditingItem(null);
      setForm({ title: "", description: "", image: null });
      setPreview(null);
    }
  }, [selectedProperty]);

  const fetchGallery = async (propertyId) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/gallery/${propertyId}`);
      setGallery(res.data);
    } catch (err) {
      console.error("Failed to fetch gallery:", err);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  // Upload or update image
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProperty) return alert("Select a property first!");

    if (!form.image && !editingItem) return alert("Please upload an image!");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (form.image) formData.append("image", form.image);
    if (!editingItem) formData.append("property_id", selectedProperty);

    try {
      setLoading(true);
      if (editingItem) {
        await axios.put(`${BASE_URL}/api/gallery/${editingItem.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`${BASE_URL}/api/gallery`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setForm({ title: "", description: "", image: null });
      setPreview(null);
      setEditingItem(null);
      fetchGallery(selectedProperty);
    } catch (err) {
      console.error("Failed to submit gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setForm({ title: item.title || "", description: item.description || "", image: null });
    setPreview(item.image ? `${BASE_URL}${item.image}` : null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/gallery/${id}`);
      fetchGallery(selectedProperty);
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Property Gallery</h2>

      {/* Property Select */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Select Property</label>
        <select
          value={selectedProperty}
          onChange={(e) => setSelectedProperty(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="">-- Select Property --</option>
          {properties.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

      {/* Upload / Edit Form */}
      {selectedProperty && (
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded mb-6 space-y-4">
          <h3 className="text-xl font-semibold">
            {editingItem ? "Edit Gallery Image" : "Add New Gallery Image"}
          </h3>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="border p-2 w-full rounded"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="border p-2 w-full rounded"
            rows={3}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 w-full rounded"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="h-32 w-48 object-cover rounded shadow mt-2"
            />
          )}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded text-white ${
                editingItem ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (editingItem ? "Updating..." : "Uploading...") : editingItem ? "Update" : "Upload"}
            </button>
            {editingItem && (
              <button
                type="button"
                onClick={() => {
                  setEditingItem(null);
                  setForm({ title: "", description: "", image: null });
                  setPreview(null);
                }}
                className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      {/* Gallery Display */}
      {gallery.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <div key={item.id} className="bg-white shadow rounded overflow-hidden">
              <img
                src={`${BASE_URL}${item.image}`}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : selectedProperty ? (
        <p className="text-gray-500">No gallery images found for this property.</p>
      ) : null}
    </div>
  );
}
