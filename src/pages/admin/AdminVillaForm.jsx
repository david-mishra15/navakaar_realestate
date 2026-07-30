import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminVillaForm() {
  const [villas, setVillas] = useState([]);
  const [formData, setFormData] = useState({
    sector: "",
    builder: "",
    project_name: "",
    villa_size: "",
    bedroom: "",
    bathroom: "",
    other_facilities: "",
    // govt_authority: "",
    // price: ""
  });
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const authorityOptions = ["Noida Authority", "Greater Noida Authority", "Yamuna Authority"];

  // Fetch all villas
  const fetchVillas = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/sell/villas`);

      // 💥 FIX: Ensure villas is always an array
      const data = Array.isArray(res.data) ? res.data : [];

      setVillas(data);
    } catch (err) {
      console.error("Error fetching villas:", err);
      alert("Error fetching villas");
    }
  };

  useEffect(() => {
    fetchVillas();
  }, []);

  // Handle input change
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImage = (e) => setImage(e.target.files[0]);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (image) data.append("image", image);

    try {
      if (editingId) {
        await axios.put(`${API_URL}/api/sell/villas/${editingId}`, data);
        setEditingId(null);
      } else {
        await axios.post(`${API_URL}/api/sell/villas`, data);
      }

      setFormData({
        sector: "",
        builder: "",
        project_name: "",
        villa_size: "",
        bedroom: "",
        bathroom: "",
        other_facilities: "",
        govt_authority: "",
        price: ""
      });
      setImage(null);
      fetchVillas();
    } catch (err) {
      console.error("Error saving villa:", err);
      alert("Error saving villa");
    }
  };

  // Edit
  const handleEdit = (villa) => {
    setFormData({ ...villa });
    setEditingId(villa.id);
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(`${API_URL}/api/sell/villas/${id}`);
      fetchVillas();
    } catch (err) {
      console.error("Error deleting villa:", err);
      alert("Error deleting villa");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Villas Admin</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md">
        {[
          "sector",
          "builder",
          "project_name",
          "villa_size",
          "bedroom",
          "bathroom",
          "other_facilities",
          // "govt_authority",
          // "price"
        ].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field}
            value={formData[field]}
            onChange={handleChange}
            className="border p-2"
          />
        ))}
        {/* ⭐ Authority Select */}
        <select
          name="govt_authority"
          value={formData.govt_authority}
          onChange={handleChange}
          className="border p-2"
        >
          <option value="">Select Authority</option>
          {authorityOptions.map((auth) => (
            <option key={auth} value={auth}>{auth}</option>
          ))}
        </select>

        {/* Price */}
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2"
        />
        <input type="file" onChange={handleImage} />

        {image && (
          <img src={URL.createObjectURL(image)} width="100" alt="preview" />
        )}

        <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
          {editingId ? "Update Villa" : "Add Villa"}
        </button>
      </form>

      {/* Table */}
      <h3 className="text-lg font-bold mt-6">All Villas</h3>
      <table className="border mt-2 w-full">
        <thead>
          <tr>
            <th>Sector</th>
            <th>Builder</th>
            <th>Project</th>
            <th>Size</th>
            <th>Bedroom</th>
            <th>Bathroom</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {villas.map((villa) => (
            <tr key={villa.id}>
              <td>{villa.sector}</td>
              <td>{villa.builder}</td>
              <td>{villa.project_name}</td>
              <td>{villa.villa_size}</td>
              <td>{villa.bedroom}</td>
              <td>{villa.bathroom}</td>
              <td>{villa.price}</td>
              <td>
                {villa.image && (
                  <img
                    src={`${API_URL}/uploads/${villa.image}`}
                    width="80"
                    alt="villa"
                  />
                )}
              </td>
              <td>
                <button
                  onClick={() => handleEdit(villa)}
                  className="mr-2 bg-yellow-500 p-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(villa.id)}
                  className="bg-red-500 p-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
