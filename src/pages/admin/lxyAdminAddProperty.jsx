import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminProperties() {
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({
    title: "",
    type: "Plots",
    price: "",
    location: "",
    image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL;

  // Fetch properties
  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/properties`);
      setProperties(res.data);
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files) {
      setForm({ ...form, image: files[0] });
      setPreview(files[0] ? URL.createObjectURL(files[0]) : null);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Submit form (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("type", form.type);
    formData.append("price", form.price);
    formData.append("location", form.location);
    if (form.image) formData.append("image", form.image);

    try {
      if (editingId) {
        await axios.put(`${BASE_URL}/api/properties/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("Property updated successfully!");
      } else {
        await axios.post(`${BASE_URL}/api/properties`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("Property added successfully!");
      }
      setForm({ title: "", type: "Plots", price: "", location: "", image: null });
      setPreview(null);
      setEditingId(null);
      fetchProperties();
    } catch (err) {
      console.error("Error saving property:", err);
      setMessage("Error occurred while saving property.");
    }
  };

  // Edit property
  const handleEdit = (property) => {
    setEditingId(property.id);
    setForm({
      title: property.title,
      type: property.type,
      price: property.price,
      location: property.location,
      image: null,
    });
    setPreview(property.image ? `${BASE_URL}${property.image}` : null);
  };

  // Delete property
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/properties/${id}`);
      fetchProperties();
    } catch (err) {
      console.error("Error deleting property:", err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Properties</h1>

      {message && <p className="mb-4 text-green-500">{message}</p>}

      <form onSubmit={handleSubmit} className="mb-6 space-y-4 bg-white p-6 rounded shadow">
        <input
          type="text"
          name="title"
          placeholder="Property Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
     <select
  name="type"
  value={form.type}
  onChange={handleChange}
  className="border p-2 w-full rounded"
>
  <option value="Plots">Plots</option>
  <option value="Flats">Flats</option>
  <option value="Villas">Villas</option>
  <option value="Commercials">Commercials</option>
</select>

        <input
          type="text"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
          className="border p-2 w-full rounded"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="h-32 w-48 object-cover rounded shadow mt-2"
          />
        )}
        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          {editingId ? "Update Property" : "Add Property"}
        </button>
      </form>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Image</th>
              <th className="border p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.length > 0 ? (
              properties.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition">
                  <td className="border p-2">{p.id}</td>
                  <td className="border p-2">{p.title}</td>
                  <td className="border p-2">{p.type}</td>
                  <td className="border p-2">{p.price}</td>
                  <td className="border p-2">{p.location}</td>
                  <td className="border p-2">
                    {p.image && (
                      <img
                        src={`${BASE_URL}${p.image}`}
                        alt={p.title}
                        className="w-24 h-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="border p-2 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-yellow-500 px-3 py-1 rounded text-white hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center p-4 text-gray-500">
                  No properties available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
