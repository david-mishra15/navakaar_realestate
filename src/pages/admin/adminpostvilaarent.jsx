import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminPostRentVillas() {
  const [villas, setVillas] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    sector: "",
    block_no: "",
    plot_no: "",
    plot_size: "",
    bedroom: "",
    bathroom: "",
    furnish: "",
    facing: "",
    approx_rent: "",
    authority: "",
    facilities: "",
    anything_else: "",
    images: [],
  });
  const [editingId, setEditingId] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5002";

  useEffect(() => {
    fetchVillas();
  }, []);

  // Fetch villas from backend
  const fetchVillas = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/adminrent/villa`);
      const data = res.data.data.map((villa) => {
        try {
          return {
            ...villa,
            images:
              typeof villa.images === "string"
                ? JSON.parse(villa.images)
                : villa.images || [],
          };
        } catch {
          return { ...villa, images: [] };
        }
      });
      setVillas(data);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Error fetching villas");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const files = e.target.files;
    setForm({ ...form, images: files });
    setPreviewImages(Array.from(files).map((f) => URL.createObjectURL(f)));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "images") {
          Array.from(value).forEach((file) => fd.append("images", file));
        } else {
          fd.append(key, value);
        }
      });

      if (editingId) {
        await axios.put(`${API_BASE}/api/adminrent/villa/${editingId}`, fd);
        alert("Villa updated successfully");
      } else {
        await axios.post(`${API_BASE}/api/adminrent/villa`, fd);
        alert("Villa added successfully");
      }

      resetForm();
      fetchVillas();
    } catch (err) {
      console.error("Submit error:", err);
      alert("Error submitting villa");
    }
  };

  // Edit villa
  const handleEdit = (villa) => {
    setEditingId(villa.id);
    setForm({
      ...villa,
      images: [],
    });
    setPreviewImages(
      villa.images.map((img) => `${API_BASE}/uploads/${img}`)
    );
  };

  // Delete villa
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this villa?")) return;
    try {
      await axios.delete(`${API_BASE}/api/adminrent/villa/${id}`);
      fetchVillas();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting villa");
    }
  };

  // Reset form
  const resetForm = () => {
    setForm({
      name: "",
      phone: "",
      email: "",
      sector: "",
      block_no: "",
      plot_no: "",
      plot_size: "",
      bedroom: "",
      bathroom: "",
      furnish: "",
      facing: "",
      approx_rent: "",
      authority: "",
      facilities: "",
      anything_else: "",
      images: [],
    });
    setEditingId(null);
    setPreviewImages([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        🏠 Admin – Manage Villas
      </h1>

      {/* FORM SECTION */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            "name",
            "phone",
            "email",
            "sector",
            "block_no",
            "plot_no",
            "plot_size",
            "bedroom",
            "bathroom",
            "furnish",
            "facing",
            "approx_rent",
            "authority",
            "facilities",
            "anything_else",
          ].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field.replaceAll("_", " ").toUpperCase()}
              className="border p-2 rounded-md w-full"
            />
          ))}

          <input
            type="file"
            name="images"
            multiple
            onChange={handleImageChange}
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* IMAGE PREVIEWS */}
        {previewImages.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4">
            {previewImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="preview"
                className="w-20 h-20 object-cover rounded-md border"
              />
            ))}
          </div>
        )}

        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            {editingId ? "Update Villa" : "Add Villa"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-6 py-2 rounded-md ml-3 hover:bg-gray-600"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* TABLE SECTION */}
      <div className="bg-white p-6 rounded-2xl shadow-md overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">🏘️ All Villas</h2>

        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">#</th>
              <th className="p-2">Name</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Email</th>
              <th className="p-2">Sector</th>
              <th className="p-2">Block</th>
              <th className="p-2">Plot</th>
              <th className="p-2">Size</th>
              <th className="p-2">Bedroom</th>
              <th className="p-2">Bathroom</th>
              <th className="p-2">Rent</th>
              <th className="p-2">Authority</th>
              <th className="p-2">Facilities</th>
              <th className="p-2">Anything Else</th>
              <th className="p-2">Images</th>
              <th className="p-2">Created At</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {villas.map((villa, index) => (
              <tr key={villa.id} className="border-t hover:bg-gray-50">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{villa.name}</td>
                <td className="p-2">{villa.phone}</td>
                <td className="p-2">{villa.email}</td>
                <td className="p-2">{villa.sector}</td>
                <td className="p-2">{villa.block_no}</td>
                <td className="p-2">{villa.plot_no}</td>
                <td className="p-2">{villa.plot_size}</td>
                <td className="p-2">{villa.bedroom}</td>
                <td className="p-2">{villa.bathroom}</td>
                <td className="p-2">{villa.approx_rent}</td>
                <td className="p-2">{villa.authority}</td>
                <td className="p-2">{villa.facilities}</td>
                <td className="p-2">{villa.anything_else}</td>

                {/* Images */}
                <td className="p-2 flex gap-2 flex-wrap">
                  {villa.images?.length > 0 ? (
                    villa.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={`${API_BASE}/uploads/${img}`}
                        alt="villa"
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                    ))
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </td>

                <td className="p-2">
                  {villa.created_at ? villa.created_at.slice(0, 10) : "-"}
                </td>

                <td className="p-2 text-center">
                  <button
                    onClick={() => handleEdit(villa)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md mx-1 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(villa.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md mx-1 hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {villas.length === 0 && (
              <tr>
                <td colSpan="17" className="text-center p-4 text-gray-500">
                  No villas available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
