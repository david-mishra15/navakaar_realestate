import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function AdminflatsForm() {
  const [flats, setFlats] = useState([]);
  const [formData, setFormData] = useState({
    sector: "",
    builder: "",
    project_name: "",
    flat_size: "",
    bedroom: "",
    bathroom: "",
    other_facilities: "",
    govt_authority: "",
    price: "",
    image: "" // ⭐ store old image name
  });

  const authorityOptions = ["Noida Authority", "Greater Noida Authority", "Yamuna Authority"];

  const [image, setImage] = useState(null); // new upload
  const [editingId, setEditingId] = useState(null);

  const fileInputRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL;

  // 🟢 Fetch all flats
  const fetchFlats = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/flats`);
      setFlats(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching flats");
    }
  };

  useEffect(() => {
    fetchFlats();
  }, []);

  // 🟢 Input change
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImage = (e) => setImage(e.target.files[0]);

  // 🟢 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    if (image) data.append("image", image);

    try {
      if (editingId) {
        await axios.put(`${API_URL}/api/flats/${editingId}`, data);
      } else {
        await axios.post(`${API_URL}/api/flats`, data);
      }

      // Reset after submit
      setEditingId(null);
      setFormData({
        sector: "",
        builder: "",
        project_name: "",
        flat_size: "",
        bedroom: "",
        bathroom: "",
        other_facilities: "",
        govt_authority: "",
        price: "",
        image: ""
      });

      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      fetchFlats();
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };

  // 🟢 Edit flat → show old image
  const handleEdit = (flat) => {
    setEditingId(flat.id);

    setFormData({
      sector: flat.sector,
      builder: flat.builder,
      project_name: flat.project_name,
      flat_size: flat.flat_size,
      bedroom: flat.bedroom,
      bathroom: flat.bathroom,
      other_facilities: flat.other_facilities,
      govt_authority: flat.govt_authority,
      price: flat.price,
      image: flat.image // ⭐ store old image
    });

    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // 🟢 Delete flat
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(`${API_URL}/api/flats/${id}`);
      fetchFlats();
    } catch (err) {
      console.error(err);
      alert("Error deleting flat");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Flats Admin Panel</h2>

      {/* 🏗️ Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md">
        {[
          "sector",
          "builder",
          "project_name",
          "flat_size",
          "bedroom",
          "bathroom",
          "other_facilities",
          // "govt_authority",
          // "price"
        ].map((field) => (
          <input
            key={field}
            type={field === "price" ? "number" : "text"}
            name={field}
            placeholder={field.replace("_", " ")}
            value={formData[field]}
            onChange={handleChange}
            className="border p-2 rounded"
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

        <input type="file" ref={fileInputRef} onChange={handleImage} />

        {/* ⭐ Show image preview */}
        {(image || formData.image) && (
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : `${API_URL}/uploads/${formData.image}`
            }
            width="100"
            className="mt-2 rounded"
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 mt-2 rounded hover:bg-blue-700 transition-all"
        >
          {editingId ? "Update Flat" : "Add Flat"}
        </button>
      </form>

      {/* 📋 Flats Table */}
      <h3 className="text-lg font-bold mt-6">All Flats</h3>

      <table className="border mt-2 w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Sector</th>
            <th className="border p-2">Builder</th>
            <th className="border p-2">Project</th>
            <th className="border p-2">Size</th>
            <th className="border p-2">Bed</th>
            <th className="border p-2">Bath</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {flats.map((flat) => (
            <tr key={flat.id}>
              <td className="border p-2">{flat.sector}</td>
              <td className="border p-2">{flat.builder}</td>
              <td className="border p-2">{flat.project_name}</td>
              <td className="border p-2">{flat.flat_size}</td>
              <td className="border p-2">{flat.bedroom}</td>
              <td className="border p-2">{flat.bathroom}</td>
              <td className="border p-2">{flat.price}</td>

              <td className="border p-2">
                {flat.image && (
                  <img
                    src={`${API_URL}/uploads/${flat.image}`}
                    width="80"
                    className="rounded"
                  />
                )}
              </td>

              <td className="border p-2">
                <button
                  onClick={() => handleEdit(flat)}
                  className="mr-2 bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(flat.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
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
