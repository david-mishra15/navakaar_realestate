import React, { useEffect, useState } from "react";

const AdminsellGallery = () => {
  const API_URL = import.meta.env.VITE_API_URL || "";

  const [apartments, setApartments] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState("");
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ title: "", description: "", image: null });

  // Fetch apartments
  const fetchApartments = async () => {
    try {
      const res = await fetch(`${API_URL}/api/apartments-for-sale`);
      const data = await res.json();
      const list = data.data || data;
      setApartments(list);
      if (list.length > 0 && !selectedApartment) setSelectedApartment(list[0].id);
    } catch {
      setError("Could not load apartments");
    }
  };

  // Fetch gallery
  const fetchGallery = async (apartmentId) => {
    if (!apartmentId) return setGallery([]);
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/appartmentsellgallery/${apartmentId}`);
      const data = await res.json();
      setGallery(data.data || data);
    } catch {
      setError("Could not load gallery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApartments(); }, []);
  useEffect(() => { if (selectedApartment) fetchGallery(selectedApartment); }, [selectedApartment]);

  // Add gallery item
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.image) return setError("All fields are required");

    try {
      const formData = new FormData();
      formData.append("apartment_id", selectedApartment);
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("image", form.image);

      const res = await fetch(`${API_URL}/api/appartmentsellgallery`, { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add item");

      setForm({ title: "", description: "", image: null });
      fetchGallery(selectedApartment);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete gallery item
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await fetch(`${API_URL}/api/appartmentsellgallery/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");
      fetchGallery(selectedApartment);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Gallery Management</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Select Apartment */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700">Select Apartment</label>
        <select
          value={selectedApartment}
          onChange={(e) => setSelectedApartment(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        >
          <option value="">-- Select Apartment --</option>
          {apartments.map((apt) => (
            <option key={apt.id} value={apt.id}>{apt.title}</option>
          ))}
        </select>
      </div>

      {/* Add Gallery Form */}
      <form onSubmit={handleAdd} className="mb-8 bg-white p-4 rounded shadow-md space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Add New Gallery Item</h3>
        <input
          type="text"
          placeholder="Title"
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          className="border p-2 w-full rounded"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Gallery
        </button>
      </form>

      {/* Gallery Grid */}
      {loading ? (
        <p>Loading gallery...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <div key={item.id} className="bg-white rounded shadow-md overflow-hidden">
              <img src={`${API_URL}${item.image}`} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h4 className="font-bold text-gray-800">{item.title}</h4>
                <p className="text-gray-600">{item.description}</p>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="mt-3 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminsellGallery;
