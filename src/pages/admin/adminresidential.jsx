import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function AdminresidentialForm() {
  const [plots, setPlots] = useState([]);
  const [formData, setFormData] = useState({
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

  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const facingOptions = [
    "North",
    "South",
    "East",
    "West",
    "North East",
    "South East",
    "South West",
    "North West",
    // "Corner Plot",
    // "Park Facing",
    // "Green Belt",
    // "24 M Road",
    // "45 M Road"
  ];

  const facilitiesOptions = [
    "Corner Plot",
    "Park Facing",
    "Green Belt",
    "24 M Road",
    "45 M Road",
    "45 Meter Road",
    "Completion",
    "Plot on Stay",
    "Corner + Park Facing",
    "45 Meter Road + Green Belt"
  ];
  const authorityOptions = ["Noida Authority", "Greater Noida Authority", "Yamuna Authority"];

  const fetchPlots = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/residential`);
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

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  // ⭐ MULTI CHECKBOX HANDLER
  const handleFacilitiesChange = (facility) => {
    const current = formData.other_facilities
      ? formData.other_facilities.split(", ").filter(Boolean)
      : [];
    const updated = current.includes(facility)
      ? current.filter((f) => f !== facility)
      : [...current, facility];
    setFormData({ ...formData, other_facilities: updated.join(", ") });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (image) data.append("image", image);

    try {
      if (editingId) {
        await axios.put(`${API_URL}/api/residential/${editingId}`, data);
      } else {
        await axios.post(`${API_URL}/api/residential`, data);
      }

      setEditingId(null);
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

  const handleEdit = (plot) => {
    setEditingId(plot.id);
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
      await axios.delete(`${API_URL}/api/residential/${id}`);
      fetchPlots();
    } catch (err) {
      console.error(err);
      alert("Error deleting plot");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Residential Plots Admin</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md">

        {/* NORMAL INPUTS */}
        {["sector", "plot_no", "block_no", "plot_size"].map(
          (field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field}
              value={formData[field]}
              onChange={handleChange}
              className="border p-2"
            />
          )
        )}

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

        {/* ⭐ FACING DROPDOWN + CUSTOM */}
        <select
          name="facing"
          value={formData.facing}
          onChange={handleChange}
          className="border p-2"
        >
          <option value="">Select Facing</option>
          {facingOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Custom Facing (Optional)"
          className="border p-2"
          onChange={(e) =>
            setFormData({ ...formData, facing: e.target.value })
          }
        />

        {/* ⭐ MULTIPLE FACILITIES CHECKBOXES + CUSTOM */}
        <div className="border p-2">
          <p className="font-semibold mb-1">Select Facilities</p>
          <div className="flex flex-wrap gap-3">
            {facilitiesOptions.map((f) => (
              <label key={f} className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={
                    formData.other_facilities
                      ? formData.other_facilities.split(", ").includes(f)
                      : false
                  }
                  onChange={() => handleFacilitiesChange(f)}
                />
                {f}
              </label>
            ))}
          </div>
        </div>

        <input
          type="text"
          placeholder="Custom Facility (Optional)"
          className="border p-2"
          onChange={(e) =>
            setFormData({
              ...formData,
              other_facilities:
                formData.other_facilities +
                (formData.other_facilities ? ", " : "") +
                e.target.value
            })
          }
        />

        {/* IMAGE UPLOAD */}
        <input type="file" ref={fileInputRef} onChange={handleImage} />

        {(image || formData.image) && (
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : `${API_URL}/uploads/${formData.image}`
            }
            width="100"
            className="mt-2"
          />
        )}

        <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <h3 className="text-lg font-bold mt-6">All Plots</h3>
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
          {plots.map((plot) => (
            <tr key={plot.id}>
              <td>{plot.sector}</td>
              <td>{plot.plot_no}</td>
              <td>{plot.block_no}</td>
              <td>{plot.plot_size}</td>
              <td>{plot.facing}</td>
              <td>{plot.price}</td>

              <td>
                {plot.image && (
                  <img
                    src={`${API_URL}/uploads/${plot.image}`}
                    width="80"
                    alt="plot"
                  />
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
