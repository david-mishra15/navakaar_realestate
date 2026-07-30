import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminCommercialForm() {
  const [spaces, setSpaces] = useState([]);
  const [formData, setFormData] = useState({
    sector: "",
    plot_no: "",
    block_no: "",
    plot_size: "",
    facing: "",
    other_facilities: "",
    // govt_authority: "",
    // price: ""
  });
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const authorityOptions = ["Noida Authority", "Greater Noida Authority", "Yamuna Authority"];

  const fetchSpaces = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/commercial`);
      setSpaces(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching commercial spaces");
    }
  };

  useEffect(() => {
    fetchSpaces();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleImage = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (image) data.append("image", image);

    try {
      if (editingId) {
        await axios.put(`${API_URL}/api/commercial/${editingId}`, data);
        setEditingId(null);
      } else {
        await axios.post(`${API_URL}/api/commercial`, data);
      }

      setFormData({
        sector: "",
        plot_no: "",
        block_no: "",
        plot_size: "",
        facing: "",
        other_facilities: "",
        govt_authority: "",
        price: ""
      });
      setImage(null);
      fetchSpaces();
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };

  const handleEdit = (space) => {
    setFormData({ ...space });
    setEditingId(space.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API_URL}/api/commercial/${id}`);
      fetchSpaces();
    } catch (err) {
      console.error(err);
      alert("Error deleting space");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Commercial Spaces Admin</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md">
        {[
          "sector",
          "plot_no",
          "block_no",
          "plot_size",
          "facing",
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
          <img src={URL.createObjectURL(image)} alt="preview" width="100" />
        )}

        <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <h3 className="text-lg font-bold mt-6">All Commercial Spaces</h3>

      <table className="border mt-2 w-full">
        <thead>
          <tr>
            <th>Sector</th>
            <th>Plot No</th>
            <th>Block No</th>
            <th>Size</th>
            <th>Facing</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {spaces.map((space) => (
            <tr key={space.id}>
              <td>{space.sector}</td>
              <td>{space.plot_no}</td>
              <td>{space.block_no}</td>
              <td>{space.plot_size}</td>
              <td>{space.facing}</td>
              <td>{space.price}</td>
              <td>
                {space.image && (
                  <img
                    src={`${API_URL}/uploads/${space.image}?v=${Date.now()}`}
                    width="80"
                    alt="space"
                  />
                )}
              </td>

              <td>
                <button
                  onClick={() => handleEdit(space)}
                  className="mr-2 bg-yellow-500 p-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(space.id)}
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
