import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5002";

const AdminVillaDetails = () => {
  const [villas, setVillas] = useState([]);
  const [selectedVillaId, setSelectedVillaId] = useState("");
  const [villaDetails, setVillaDetails] = useState([]);
  const [formData, setFormData] = useState({
    image: null,
    heading: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch all villas for dropdown
  const fetchVillas = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/villas-for-sale`);
      if (res.data.data) setVillas(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch villa details
  const fetchVillaDetails = async (villaId) => {
    if (!villaId) return;
    try {
      const res = await axios.get(`${API_URL}/api/admin/villa-details/${villaId}`);
      if (res.data.success) setVillaDetails(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVillas();
  }, []);

  useEffect(() => {
    fetchVillaDetails(selectedVillaId);
  }, [selectedVillaId]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleAddDetail = async (e) => {
    e.preventDefault();
    if (!selectedVillaId) return alert("Select a villa first");

    try {
      setLoading(true);
      const data = new FormData();
      data.append("villa_id", selectedVillaId);
      data.append("heading", formData.heading);
      data.append("description", formData.description);
      if (formData.image) data.append("image", formData.image);

      const res = await axios.post(`${API_URL}/api/admin/villa-details`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setFormData({ image: null, heading: "", description: "" });
        fetchVillaDetails(selectedVillaId);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDetail = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await axios.delete(`${API_URL}/api/admin/villa-details/${id}`);
      if (res.data.success) fetchVillaDetails(selectedVillaId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Manage Villa Details</h2>

      <div className="mb-6">
        <label className="block font-medium mb-2">Select Villa</label>
        <select
          value={selectedVillaId}
          onChange={(e) => setSelectedVillaId(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">-- Select Villa --</option>
          {villas.map((v) => (
            <option key={v.id} value={v.id}>{v.title}</option>
          ))}
        </select>
      </div>

      {selectedVillaId && (
        <form className="bg-white p-6 rounded-lg shadow mb-10 grid gap-4" onSubmit={handleAddDetail}>
          <input type="file" name="image" onChange={handleChange} required />
          <input type="text" name="heading" value={formData.heading} onChange={handleChange} placeholder="Heading" required />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows={4} required />
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
            {loading ? "Adding..." : "Add Detail"}
          </button>
        </form>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {villaDetails.map((detail) => (
          <div key={detail.id} className="bg-white rounded-lg shadow overflow-hidden relative">
            <img src={`${API_URL}${detail.image}`} alt={detail.heading} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold">{detail.heading}</h3>
              <p className="text-gray-700 mt-2">{detail.description}</p>
            </div>
            <button onClick={() => handleDeleteDetail(detail.id)} className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminVillaDetails;
