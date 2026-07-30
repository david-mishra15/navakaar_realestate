import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminResidentialPlots() {
  const [plots, setPlots] = useState([]);
  const [details, setDetails] = useState([]);
  const [form, setForm] = useState({
    property_id: "",
    title: "",
    image: null,
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState("");

  // ✅ Use environment variable instead of hardcoded URL
  const API = import.meta.env.VITE_API_URL;

  // -------------------- Fetch All Plots --------------------
  const fetchPlots = async () => {
    try {
      const res = await axios.get(`${API}/api/admin/residential`);
      setPlots(res.data);
    } catch (error) {
      console.error("Error fetching plots:", error);
    }
  };

  // -------------------- Fetch Plot Details --------------------
  const fetchDetails = async () => {
    try {
      const res = await axios.get(`${API}/api/plot-residential-details`);
      setDetails(res.data);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  useEffect(() => {
    fetchPlots();
    fetchDetails();
  }, []);

  // -------------------- Handle Input --------------------
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // -------------------- Handle Submit --------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("property_id", form.property_id);
    formDataObj.append("title", form.title);
    formDataObj.append("description", form.description);
    if (form.image) formDataObj.append("image", form.image);

    try {
      if (editingId) {
        // Update existing detail
        await axios.put(`${API}/api/plot-residential-details/${editingId}`, formDataObj, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditingId(null);
      } else {
        // Add new detail
        await axios.post(`${API}/api/plot-residential-details`, formDataObj, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // Reset form & reload data
      setForm({ property_id: "", title: "", image: null, description: "" });
      setPreview("");
      fetchDetails();
    } catch (err) {
      console.error("Error uploading detail:", err);
    }
  };

  // -------------------- Handle Edit --------------------
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

  // -------------------- Handle Delete --------------------
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/api/plot-residential-details/${id}`);
      fetchDetails();
    } catch (error) {
      console.error("Error deleting detail:", error);
    }
  };

  // -------------------- Render --------------------
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">
        Manage Residential Plot Details
      </h2>

      {/* ---------- Form ---------- */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 border p-4 rounded bg-gray-50 shadow-sm"
      >
        {/* Select Plot */}
        <select
          name="property_id"
          value={form.property_id}
          onChange={handleChange}
          required
          className="border p-2 mb-3 w-full rounded"
        >
          <option value="">Select Plot</option>
          {plots.map((plot) => (
            <option key={plot.id} value={plot.id}>
              {plot.sector} - {plot.plot_no}
            </option>
          ))}
        </select>

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="border p-2 mb-3 w-full rounded"
        />

        {/* Image */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="border p-2 mb-3 w-full rounded"
        />

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="h-24 w-24 object-cover mb-3 border rounded"
          />
        )}

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          className="border p-2 mb-3 w-full rounded"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition w-full"
        >
          {editingId ? "Update Detail" : "Add Detail"}
        </button>
      </form>

      {/* ---------- Details Table ---------- */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border shadow-sm">
          <thead>
            <tr className="border bg-gray-100 text-gray-700">
              <th className="border p-2">Plot</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {details.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No details found.
                </td>
              </tr>
            ) : (
              details.map((detail) => {
                const plot = plots.find((p) => p.id === detail.property_id);
                return (
                  <tr key={detail.id} className="border hover:bg-gray-50">
                    <td className="border p-2">
                      {plot?.sector} - {plot?.plot_no}
                    </td>
                    <td className="border p-2">{detail.title}</td>
                    <td className="border p-2 text-center">
                      {detail.image ? (
                        <img
                          src={`${API}${detail.image}`}
                          alt="Plot"
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
                        className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(detail.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
