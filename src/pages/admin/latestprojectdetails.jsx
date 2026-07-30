import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminLatestProjectsGallery() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [formGallery, setFormGallery] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [editingItem, setEditingItem] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [preview, setPreview] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL;

  // Fetch all latest projects
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/latestprojects`);
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  // Fetch gallery for selected project
  const fetchGallery = async (projectId) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/latest-gallery/${projectId}`);
      setGallery(res.data);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      fetchGallery(selectedProject);
    } else {
      setGallery([]);
    }
    setEditingItem(null);
    setFormGallery({ title: "", description: "", image: null });
    setPreview(null);
  }, [selectedProject]);

  // Handle gallery form changes
  const handleGalleryChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormGallery((prev) => ({ ...prev, image: files[0] }));
      setPreview(files[0] ? URL.createObjectURL(files[0]) : null);
    } else {
      setFormGallery((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit gallery form
  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    if (!selectedProject) return alert("Select a project first!");

    const data = new FormData();
    data.append("title", formGallery.title);
    data.append("description", formGallery.description);
    if (formGallery.image) data.append("image", formGallery.image);
    data.append("latest_id", selectedProject);

    try {
      if (editingItem) {
        await axios.put(`${BASE_URL}/api/latest-gallery/${editingItem.id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditingItem(null);
      } else {
        await axios.post(`${BASE_URL}/api/latest-gallery`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setFormGallery({ title: "", description: "", image: null });
      setPreview(null);
      fetchGallery(selectedProject);
    } catch (err) {
      console.error("Error saving gallery:", err);
    }
  };

  // Edit gallery item
  const handleEditGallery = (item) => {
    setEditingItem(item);
    setFormGallery({
      title: item.title || "",
      description: item.description || "",
      image: null,
    });
    setPreview(item.image ? `${BASE_URL}${item.image}` : null);
  };

  // Delete gallery item
  const handleDeleteGallery = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/latest-gallery/${id}`);
      fetchGallery(selectedProject);
    } catch (err) {
      console.error("Error deleting gallery item:", err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Latest Projects Gallery</h1>

      {/* Select Project */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Select Project</label>
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="">-- Select Project --</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

      {/* Add/Edit Gallery */}
      {selectedProject && (
        <form
          onSubmit={handleGallerySubmit}
          className="bg-white p-6 shadow rounded mb-6 space-y-4"
          encType="multipart/form-data"
        >
          <h3 className="font-bold mb-2 text-lg">
            {editingItem ? "Edit Gallery Image" : "Add New Gallery Image"}
          </h3>

          <input
            type="text"
            name="title"
            placeholder="Image Title"
            value={formGallery.title}
            onChange={handleGalleryChange}
            className="border p-2 rounded w-full"
            required
          />
          <textarea
            name="description"
            placeholder="Image Description"
            value={formGallery.description}
            onChange={handleGalleryChange}
            className="border p-2 rounded w-full"
            rows={3}
          />
          <input
            type="file"
            name="image"
            onChange={handleGalleryChange}
            className="border p-2 rounded w-full"
            accept="image/*"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="h-32 w-48 object-cover rounded shadow mt-2"
            />
          )}
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {editingItem ? "Update Image" : "Add Image"}
            </button>
            {editingItem && (
              <button
                type="button"
                onClick={() => {
                  setEditingItem(null);
                  setFormGallery({ title: "", description: "", image: null });
                  setPreview(null);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      {/* Gallery Table */}
      {selectedProject && gallery.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <div key={item.id} className="bg-white shadow rounded overflow-hidden">
              <img
                src={`${BASE_URL}${item.image}`}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEditGallery(item)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteGallery(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : selectedProject ? (
        <p className="text-gray-500">No gallery images found for this project.</p>
      ) : null}
    </div>
  );
}
