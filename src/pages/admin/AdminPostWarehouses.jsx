import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminPostWarehouses() {
  const [warehouses, setWarehouses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    plot_size: "",
    approx_rent: "",
    anything_else: "",
    images: [],
  });
  const [editingId, setEditingId] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5002";

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/adminrent/house`);
      const data = res.data.data.map(w => ({
        ...w,
        images: typeof w.images === "string" ? JSON.parse(w.images) : w.images || [],
      }));
      setWarehouses(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching warehouses");
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const files = e.target.files;
    setForm({ ...form, images: files });
    setPreviewImages(Array.from(files).map(f => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "images") {
          Array.from(value).forEach(file => fd.append("images", file));
        } else {
          fd.append(key, value);
        }
      });

      if (editingId) {
        await axios.put(`${API_BASE}/api/adminrent/house/${editingId}`, fd);
        alert("Warehouse updated successfully");
      } else {
        await axios.post(`${API_BASE}/api/adminrent/house`, fd);
        alert("Warehouse added successfully");
      }

      resetForm();
      fetchWarehouses();
    } catch (err) {
      console.error(err);
      alert("Error submitting warehouse");
    }
  };

  const handleEdit = (w) => {
    setEditingId(w.id);
    setForm({ ...w, images: [] });
    setPreviewImages(w.images.map(img => `${API_BASE}/uploads/${img}`));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this warehouse?")) return;
    try {
      await axios.delete(`${API_BASE}/api/adminrent/house/${id}`);
      fetchWarehouses();
    } catch (err) {
      console.error(err);
      alert("Error deleting warehouse");
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      phone: "",
      email: "",
      plot_size: "",
      approx_rent: "",
      anything_else: "",
      images: [],
    });
    setEditingId(null);
    setPreviewImages([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        🏭 Admin – Manage Warehouses
      </h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["name","phone","email","plot_size","approx_rent","anything_else"].map(field => (
            <input
              key={field}
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field.replaceAll("_"," ").toUpperCase()}
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
              <img key={idx} src={img} alt="preview" className="w-20 h-20 object-cover rounded-md border" />
            ))}
          </div>
        )}

        <div className="mt-4">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            {editingId ? "Update Warehouse" : "Add Warehouse"}
          </button>

          {editingId && (
            <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-6 py-2 rounded-md ml-3 hover:bg-gray-600">
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">🏭 All Warehouses</h2>
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">#</th>
                <th className="p-2">Name</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Email</th>
                <th className="p-2">Plot Size</th>
                <th className="p-2">Rent</th>
                <th className="p-2">Anything Else</th>
                <th className="p-2">Images</th>
                <th className="p-2">Created At</th>
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {warehouses.map((w, idx) => (
                <tr key={w.id} className="border-t hover:bg-gray-50">
                  <td className="p-2">{idx+1}</td>
                  <td className="p-2">{w.name}</td>
                  <td className="p-2">{w.phone}</td>
                  <td className="p-2">{w.email}</td>
                  <td className="p-2">{w.plot_size}</td>
                  <td className="p-2">{w.approx_rent}</td>
                  <td className="p-2">{w.anything_else}</td>
                  <td className="p-2 flex gap-2 flex-wrap">
                    {w.images?.length > 0 ? w.images.map((img, i) => (
                      <img key={i} src={`${API_BASE}/uploads/${img}`} alt="warehouse" className="w-14 h-14 object-cover rounded-md border"/>
                    )) : <span className="text-gray-400">No Image</span>}
                  </td>
                  <td className="p-2">{w.created_at?.slice(0,10)}</td>
                  <td className="p-2 text-center">
                    <button onClick={() => handleEdit(w)} className="bg-yellow-500 text-white px-3 py-1 rounded-md mx-1 hover:bg-yellow-600">Edit</button>
                    <button onClick={() => handleDelete(w.id)} className="bg-red-600 text-white px-3 py-1 rounded-md mx-1 hover:bg-red-700">Delete</button>
                  </td>
                </tr>
              ))}
              {warehouses.length === 0 && (
                <tr>
                  <td colSpan="10" className="text-center p-4 text-gray-500">No warehouses available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
