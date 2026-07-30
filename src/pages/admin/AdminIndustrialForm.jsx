import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function AdminIndustrialForm() {
  const [plots, setPlots] = useState([]);
  const [formData, setFormData] = useState({
    sector: "",
    plot_no: "",
    block_no: "",
    plot_size: "",
    facing: "",
    other_facilities: "", // ⭐ comma string
    govt_authority: "",
    price: "",
    image: ""
  });

  const [selectedFacilities, setSelectedFacilities] = useState([]); // ⭐ array handling
  const [customFacility, setCustomFacility] = useState("");
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const fileInputRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL;

  // Options
  const facingOptions = [
    "East",
    "West",
    "North",
    "South",
    "North East",
    "South East",
    "South West",
    "North West",
  ];
  const facilityOptions = ["Corner Plot", "Park Facing", "Green Belt", "24 M Road", "45 M Road"];
  const authorityOptions = ["Noida Authority", "Greater Noida Authority", "Yamuna Authority"];
  const sectorOptions = Array.from({ length: 200 }, (_, i) => `Sector ${i + 1}`);

  const fetchPlots = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/industrial`);
      setPlots(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching plots");
    }
  };

  useEffect(() => {
    fetchPlots();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImage = (e) => setImage(e.target.files[0]);

  // ⭐ handle checkbox select
  const toggleFacility = (value) => {
    let updated = [...selectedFacilities];
    if (updated.includes(value)) updated = updated.filter((item) => item !== value);
    else updated.push(value);

    setSelectedFacilities(updated);
    setFormData({ ...formData, other_facilities: updated.join(", ") });
  };

  // ⭐ add custom facility
  const addCustomFacility = () => {
    if (!customFacility.trim()) return;
    const updated = [...selectedFacilities, customFacility.trim()];
    setSelectedFacilities(updated);
    setFormData({ ...formData, other_facilities: updated.join(", ") });
    setCustomFacility("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (image) data.append("image", image);

    try {
      if (editingId) await axios.put(`${API_URL}/api/industrial/${editingId}`, data);
      else await axios.post(`${API_URL}/api/industrial`, data);

      // Reset
      setEditingId(null);
      setSelectedFacilities([]);
      setFormData({
        sector: "",
        plot_no: "",
        block_no: "",
        plot_size: "",
        facing: "",
        other_facilities: "",
        govt_authority: "",
        price: "",
        image: ""
      });
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      fetchPlots();
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };

  // ⭐ load selected facilities for Edit
  const handleEdit = (plot) => {
    setEditingId(plot.id);
    const facilitiesArray = plot.other_facilities
      ? plot.other_facilities.split(",").map((f) => f.trim())
      : [];
    setSelectedFacilities(facilitiesArray);

    setFormData({
      sector: plot.sector,
      plot_no: plot.plot_no,
      block_no: plot.block_no,
      plot_size: plot.plot_size,
      facing: plot.facing,
      other_facilities: plot.other_facilities,
      govt_authority: plot.govt_authority,
      price: plot.price,
      image: plot.image
    });

    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API_URL}/api/industrial/${id}`);
      fetchPlots();
    } catch (err) {
      console.error(err);
      alert("Error deleting plot");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Industrial Plots Admin</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md">
        {/* ⭐ Sector Select */}
        <select
          name="sector"
          value={formData.sector}
          onChange={handleChange}
          className="border p-2"
        >
          <option value="">Select Sector</option>
          {sectorOptions.map((sector) => (
            <option key={sector} value={sector}>{sector}</option>
          ))}
        </select>

        {/* Plot No */}
        <input
          type="text"
          name="plot_no"
          placeholder="Plot No"
          value={formData.plot_no}
          onChange={handleChange}
          className="border p-2"
        />

        {/* Block No */}
        <input
          type="text"
          name="block_no"
          placeholder="Block No"
          value={formData.block_no}
          onChange={handleChange}
          className="border p-2"
        />

        {/* Plot Size */}
        <input
          type="text"
          name="plot_size"
          placeholder="Plot Size"
          value={formData.plot_size}
          onChange={handleChange}
          className="border p-2"
        />

        {/* Facing */}
        {/* <input
          type="text"
          name="facing"
          placeholder="Facing"
          value={formData.facing}
          onChange={handleChange}
          className="border p-2"
        /> */}
        <select
          name="facing"
          value={formData.facing}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Facing</option>
          {facingOptions.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
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

        {/* ⭐ MULTIPLE CHECKBOXES FOR OTHER FACILITIES */}
        <label className="font-semibold mt-2">Other Facilities</label>
        <div className="flex flex-col gap-1 border p-2">
          {facilityOptions.map((item) => (
            <label key={item} className="flex gap-2">
              <input
                type="checkbox"
                checked={selectedFacilities.includes(item)}
                onChange={() => toggleFacility(item)}
              />
              {item}
            </label>
          ))}
        </div>

        {/* ⭐ CUSTOM FACILITY ADD */}
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="Add Custom Facility"
            value={customFacility}
            onChange={(e) => setCustomFacility(e.target.value)}
            className="border p-2 flex-1"
          />
          <button
            type="button"
            onClick={addCustomFacility}
            className="bg-green-600 text-white px-3"
          >
            Add
          </button>
        </div>

        {/* SHOW SELECTED FACILITIES */}
        {selectedFacilities.length > 0 && (
          <div className="text-sm text-gray-700">
            Selected: {selectedFacilities.join(", ")}
          </div>
        )}

        {/* File Input */}
        <input type="file" ref={fileInputRef} onChange={handleImage} />

        {(image || formData.image) && (
          <img
            src={image ? URL.createObjectURL(image) : `${API_URL}/uploads/${formData.image}`}
            width="100"
            className="mt-2"
          />
        )}

        <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* TABLE */}
      <h3 className="text-lg font-bold mt-6">All Plots</h3>

      <table className="border mt-2 w-full">
        <thead>
          <tr>
            <th>Sector</th>
            <th>Plot No</th>
            <th>Block</th>
            <th>Size</th>
            <th>Facing</th>
            <th>Facilities</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {plots.map((plot) => (
            <tr key={plot.id}>
              <td>{plot.sector}</td>
              <td>{plot.plot_no}</td>
              <td>{plot.block_no}</td>
              <td>{plot.plot_size}</td>
              <td>{plot.facing}</td>
              <td>{plot.other_facilities}</td>
              <td>{plot.price}</td>

              <td>
                {plot.image && (
                  <img src={`${API_URL}/uploads/${plot.image}`} width="80" alt="plot" />
                )}
              </td>

              <td>
                <button
                  onClick={() => handleEdit(plot)}
                  className="mr-2 bg-yellow-500 p-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(plot.id)}
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
