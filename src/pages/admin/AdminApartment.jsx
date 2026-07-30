import React, { useEffect, useState } from "react";

const AdminApartment = () => {
  const [apartments, setApartments] = useState([]);
  const [form, setForm] = useState({ title: "", location: "", rent: "", thumbnail: null });
  const [editingId, setEditingId] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL; // use env variable

  const fetchApartments = async () => {
    try {
      const res = await fetch(`${API_URL}/api/apartments`);
      const data = await res.json();
      setApartments(data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, thumbnail: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("location", form.location);
    formData.append("rent", form.rent);
    if (form.thumbnail) formData.append("thumbnail", form.thumbnail);

    try {
      const res = editingId
        ? await fetch(`${API_URL}/api/apartments/${editingId}`, { method: "PUT", body: formData })
        : await fetch(`${API_URL}/api/apartments`, { method: "POST", body: formData });

      if (res.ok) {
        setForm({ title: "", location: "", rent: "", thumbnail: null });
        setEditingId(null);
        fetchApartments();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (apartment) => {
    setForm({ title: apartment.title, location: apartment.location, rent: apartment.rent, thumbnail: null });
    setEditingId(apartment.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this apartment?")) return;
    try {
      const res = await fetch(`${API_URL}/api/apartments/${id}`, { method: "DELETE" });
      if (res.ok) fetchApartments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">Admin - Manage Apartments</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8" encType="multipart/form-data">
        <div className="grid gap-4 md:grid-cols-2">
          <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 rounded" required />
          <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="Location" className="border p-2 rounded" required />
          <input type="text" name="rent" value={form.rent} onChange={handleChange} placeholder="Rent" className="border p-2 rounded" required />
          <input type="file" name="thumbnail" onChange={handleFileChange} accept="image/*" className="border p-2 rounded" required={!editingId} />
        </div>
        <button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
          {editingId ? "Update Apartment" : "Add Apartment"}
        </button>
      </form>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Thumbnail</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Rent</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {apartments.map((apt, idx) => (
              <tr key={apt.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{idx + 1}</td>
                <td className="p-3">
                  <img src={`${API_URL}${apt.thumbnail}`} alt={apt.title} className="w-20 h-16 object-cover rounded" />
                </td>
                <td className="p-3">{apt.title}</td>
                <td className="p-3">{apt.location}</td>
                <td className="p-3 text-blue-700 font-semibold">{apt.rent}</td>
                <td className="p-3 space-x-2">
                  <button onClick={() => handleEdit(apt)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(apt.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
            {apartments.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">No Apartments Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminApartment;
