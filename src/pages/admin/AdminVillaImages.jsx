import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AdminVillaImages = () => {
  const [villas, setVillas] = useState([]);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    villa_id: "",
    description: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch villas for dropdown
  const fetchVillas = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/villas`);
      setVillas(res.data.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch villas.");
      setLoading(false);
    }
  };

  // Fetch villa images for table
  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/villa-images`);
      setImages(res.data.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch villa images.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVillas();
    fetchImages();
  }, []);

  // Handle add image
  const handleAddImage = async (e) => {
    e.preventDefault();
    if (!formData.villa_id || !formData.image) {
      setError("Villa and image are required.");
      return;
    }

    const data = new FormData();
    data.append("villa_id", formData.villa_id);
    data.append("description", formData.description);
    data.append("image", formData.image);

    try {
      setLoading(true);
      await axios.post(`${API_URL}/api/villa-images`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData({ villa_id: "", description: "", image: null });
      fetchImages();
      setLoading(false);
      setError("");
    } catch (err) {
      setError("Failed to add image.");
      setLoading(false);
    }
  };

  // Handle delete image
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/api/villa-images/${id}`);
      fetchImages();
      setLoading(false);
    } catch (err) {
      setError("Failed to delete image.");
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin: Manage Villa Images</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading && <p className="text-gray-600 mb-4">Loading...</p>}

      {/* Add Image Form */}
      <form
        onSubmit={handleAddImage}
        className="mb-6 flex flex-col gap-2 max-w-md"
      >
        <select
          required
          value={formData.villa_id}
          onChange={(e) =>
            setFormData({ ...formData, villa_id: e.target.value })
          }
          className="border p-2 rounded"
        >
          <option value="">Select Villa</option>
          {villas.map((v) => (
            <option key={v.id} value={v.id}>
              {v.title}
            </option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*"
          required
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
        />

        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Image
        </button>
      </form>

      {/* Images Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Villa</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {images.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  No images found.
                </td>
              </tr>
            ) : (
              images.map((img) => (
                <tr key={img.id}>
                  <td className="border p-2 text-center">{img.id}</td>
                  <td className="border p-2">{img.villa_title}</td>
                  <td className="border p-2 text-center">
                    <img
                      src={`${API_URL}${img.img_url}`} // ✅ Correct field
                      alt={img.description}
                      className="w-20 h-16 object-cover mx-auto"
                    />
                  </td>
                  <td className="border p-2">{img.description}</td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => handleDelete(img.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminVillaImages;
