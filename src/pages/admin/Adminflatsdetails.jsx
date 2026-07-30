import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminFlatDetails() {
  const [flats, setFlats] = useState([]);
  const [details, setDetails] = useState([]);
  const [form, setForm] = useState({
    property_id: "",
    title: "",
    image: null,
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState("");

  const API = import.meta.env.VITE_API_URL;

  // Fetch all flats
  const fetchFlats = async () => {
    try {
      const res = await axios.get(`${API}/api/admin/sell-flats`);
      setFlats(res.data);
    } catch (error) {
      console.error("Error fetching flats:", error);
    }
  };

  // Fetch all flat details
  const fetchDetails = async () => {
    try {
      const res = await axios.get(`${API}/api/flats-property-details`);
      setDetails(res.data);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  useEffect(() => {
    fetchFlats();
    fetchDetails();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("property_id", form.property_id);
    formDataObj.append("title", form.title);
    formDataObj.append("description", form.description);
    if (form.image) formDataObj.append("image", form.image);

    try {
      if (editingId) {
        await axios.put(`${API}/api/flats-property-details/${editingId}`, formDataObj, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditingId(null);
      } else {
        await axios.post(`${API}/api/flats-property-details`, formDataObj, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setForm({ property_id: "", title: "", image: null, description: "" });
      setPreview("");
      fetchDetails();
    } catch (err) {
      console.error("Error uploading detail:", err);
    }
  };

  // Edit
  const handleEdit = (detail) => {
    setForm({
      property_id: detail.property_id,
      title: detail.title,
      image: null,
      description: detail.description,
    });
    setPreview(`${API}${detail.image}`);
    setEditingId(detail.id);
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/api/flats-property-details/${id}`);
      fetchDetails();
    } catch (error) {
      console.error("Error deleting detail:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Flat Property Details</h2>

      {/* ---------- Form ---------- */}
      <form onSubmit={handleSubmit} className="mb-6 border p-4 rounded bg-gray-50">
        <select
          name="property_id"
          value={form.property_id}
          onChange={handleChange}
          required
          className="border p-2 mb-2 w-full rounded"
        >
          <option value="">Select Flat</option>
          {flats.map((flat) => (
            <option key={flat.id} value={flat.id}>
              {flat.sector} - {flat.flat_no}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="border p-2 mb-2 w-full rounded"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="border p-2 mb-2 w-full rounded"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="h-24 w-24 object-cover mb-2 border rounded"
          />
        )}

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          className="border p-2 mb-2 w-full rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          {editingId ? "Update Detail" : "Add Detail"}
        </button>
      </form>

      {/* ---------- Table ---------- */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="border bg-gray-100">
            <th className="border p-2">Flat</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail) => {
            const flat = flats.find((f) => f.id === detail.property_id);
            return (
              <tr key={detail.id} className="border hover:bg-gray-50">
                <td className="border p-2">{flat?.sector} - {flat?.flat_no}</td>
                <td className="border p-2">{detail.title}</td>
                <td className="border p-2 text-center">
                  {detail.image ? (
                    <img
                      src={`${API}${detail.image}`}
                      alt="Flat"
                      className="h-16 w-16 object-cover mx-auto rounded border"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="border p-2">{detail.description}</td>
                <td className="border p-2 flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(detail)}
                    className="bg-yellow-400 p-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(detail.id)}
                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
