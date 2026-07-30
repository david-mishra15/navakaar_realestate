import { useState, useEffect } from "react";
import { Plus, Trash2, X } from "lucide-react";
import axios from "axios";

export default function BannerPage() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // error handling
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [zoomImage, setZoomImage] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`${BASE_URL}/api/banners`);

      // ✅ Ensure banners is always an array
      const bannersArray = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.data)
        ? res.data.data
        : [];

      setBanners(bannersArray);
    } catch (err) {
      console.error("Error fetching banners:", err);
      setError("Failed to load banners.");
      setBanners([]); // fallback empty array
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!newTitle || !newImage) {
      alert("Please provide both title and image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newTitle);
    formData.append("image", newImage);

    try {
      const res = await axios.post(`${BASE_URL}/api/banners`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ Append the new banner safely
      const newBanner = Array.isArray(res.data)
        ? res.data[0]
        : res.data.data || res.data;

      setBanners([...banners, newBanner]);
      setShowModal(false);
      setNewTitle("");
      setNewImage(null);
    } catch (err) {
      console.error("Error adding banner:", err);
      alert("Failed to add banner.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;

    try {
      await axios.delete(`${BASE_URL}/api/banners/${id}`);
      setBanners(banners.filter((b) => (b.id || b.banner_id) !== id));
    } catch (err) {
      console.error("Error deleting banner:", err);
      alert("Failed to delete banner.");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Banner Management</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          <Plus size={18} className="mr-2" />
          Add Banner
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        {loading ? (
          <p className="p-6 text-center text-gray-500">Loading banners...</p>
        ) : error ? (
          <p className="p-6 text-center text-red-500">{error}</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {banners.length > 0 ? (
                banners.map((banner) => (
                  <tr key={banner.id || banner.banner_id}>
                    <td className="px-6 py-4">
                      <img
                        src={`${BASE_URL}/uploads/${banner.image}`}
                        alt={banner.title}
                        className="h-16 w-32 object-cover rounded cursor-pointer hover:scale-105 transition"
                        onClick={() =>
                          setZoomImage(`${BASE_URL}/uploads/${banner.image}`)
                        }
                      />
                    </td>
                    <td className="px-6 py-4 text-gray-800 font-medium">{banner.title}</td>
                    <td className="px-6 py-4 flex justify-center space-x-3">
                      <button
                        onClick={() => handleDelete(banner.id || banner.banner_id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                    No banners available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Banner Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-4">Add Banner</h3>
            <form onSubmit={handleAddSubmit}>
              <input
                type="text"
                placeholder="Banner Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-3"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewImage(e.target.files[0])}
                className="w-full border rounded px-3 py-2 mb-3"
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Zoom Modal */}
      {zoomImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-fadeIn">
          <button
            className="absolute top-6 right-6 text-white hover:text-gray-300"
            onClick={() => setZoomImage(null)}
          >
            <X size={30} />
          </button>
          <img
            src={zoomImage}
            alt="Zoomed banner"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-lg animate-zoomUp"
          />
        </div>
      )}

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes zoomUp {
            0% { transform: scale(0.7); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-zoomUp { animation: zoomUp 0.4s ease-out forwards; }
          .animate-fadeIn { animation: fadeIn 0.3s ease-in; }
        `}
      </style>
    </div>
  );
}
