import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AdminApartmentDetails = () => {
  const [apartments, setApartments] = useState([]);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    apartment_id: "",
    heading: "",
    description: "",
    image: null,
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  // Fetch all apartments
  const fetchApartments = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/apartments?page=1&limit=1000`); // get all apartments
      setApartments(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load apartments.");
    }
  };

  // Fetch all apartment details
  const fetchDetails = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/apartment-details`);
      setDetails(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load apartment details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApartments();
    fetchDetails();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle add/update form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("apartment_id", formData.apartment_id);
    data.append("heading", formData.heading);
    data.append("description", formData.description);
    if (formData.image) data.append("image", formData.image);

    try {
      if (editId) {
        await axios.put(`${API_URL}/api/apartment-details/update/${editId}`, data);
        setEditId(null);
      } else {
        await axios.post(`${API_URL}/api/apartment-details/add`, data);
      }
      setFormData({ apartment_id: "", heading: "", description: "", image: null });
      fetchDetails();
    } catch (err) {
      console.error(err);
      setError("Failed to submit data.");
    }
  };

  // Handle edit button click
  const handleEdit = (detail) => {
    setEditId(detail.id);
    setFormData({
      apartment_id: detail.apartment_id,
      heading: detail.heading,
      description: detail.description,
      image: null,
    });
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this detail?")) return;
    try {
      await axios.delete(`${API_URL}/api/apartment-details/delete/${id}`);
      fetchDetails();
    } catch (err) {
      console.error(err);
      setError("Failed to delete detail.");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Apartment Details Admin</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded">
        <div className="mb-2">
          <label className="block mb-1">Select Apartment</label>
          <select
            name="apartment_id"
            value={formData.apartment_id}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          >
            <option value="">-- Select Apartment --</option>
            {apartments.map((apt) => (
              <option key={apt.id} value={apt.id}>
                {apt.title} {/* only show title */}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label className="block mb-1">Heading</label>
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-2">
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-2">
          <label className="block mb-1">Image</label>
          <input type="file" name="image" onChange={handleChange} />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editId ? "Update Detail" : "Add Detail"}
        </button>
      </form>

      {/* Details Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Apartment Title</th>
            <th className="border p-2">Heading</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {details.length > 0 ? (
            details.map((d) => {
              const apt = apartments.find((a) => a.id === d.apartment_id);
              return (
                <tr key={d.id}>
                  <td className="border p-2">{apt ? apt.title : "N/A"}</td>
                  <td className="border p-2">{d.heading}</td>
                  <td className="border p-2">{d.description}</td>
                  <td className="border p-2">
                    {d.image && (
                      <img
                        src={`${API_URL}/uploads/${d.image}`}
                        alt={d.heading}
                        className="w-20 h-20 object-cover"
                      />
                    )}
                  </td>
                  <td className="border p-2">
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                      onClick={() => handleEdit(d)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(d.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No details found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminApartmentDetails;
