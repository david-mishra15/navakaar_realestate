import { useEffect, useState } from "react";
import axios from "axios";

export default function LatestProjects() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    price: "",
    location: "",
    category: "Commercials",
    image: null,
  });
  const [editing, setEditing] = useState(false);
  const [preview, setPreview] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL;
  const API = `${BASE_URL}/api/latestprojects`;

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const res = await axios.get(API);
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
      setPreview(files[0] ? URL.createObjectURL(files[0]) : null);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Add or Update project
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("location", formData.location);
    data.append("category", formData.category);
    if (formData.image) data.append("image", formData.image);

    try {
      if (editing) {
        // PUT request for update
        await axios.put(`${API}/${formData.id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // POST request for add
        await axios.post(API, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // Reset form
      setFormData({
        id: null,
        title: "",
        price: "",
        location: "",
        category: "Commercials",
        image: null,
      });
      setPreview(null);
      setEditing(false);
      fetchProjects();
    } catch (err) {
      console.error("Error saving project:", err);
    }
  };

  // Edit project
  const handleEdit = (project) => {
    setFormData({
      id: project.id,
      title: project.title,
      price: project.price,
      location: project.location,
      category: project.category,
      image: null,
    });
    setPreview(project.image ? `${BASE_URL}${project.image}` : null);
    setEditing(true);
  };

  // Delete project
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin - Latest Projects</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow mb-8 space-y-4"
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      <select
  name="category"
  value={formData.category}
  onChange={handleChange}
  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
  required
>
  <option value="Commercials">Commercials</option>
  <option value="Plots">Plots</option>
  <option value="Flats">Flats</option>
  <option value="Villas">Villas</option>
</select>

        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full"
          accept="image/*"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="h-32 w-48 object-cover rounded shadow mt-2"
          />
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-semibold"
        >
          {editing ? "Update Project" : "Add Project"}
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Image</th>
              <th className="border p-2 text-left">Title</th>
              <th className="border p-2 text-left">Price</th>
              <th className="border p-2 text-left">Location</th>
              <th className="border p-2 text-left">Category</th>
              <th className="border p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? (
              projects.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition">
                  <td className="border p-2">
                    {p.image && (
                      <img
                        src={`${BASE_URL}${p.image}`}
                        alt={p.title}
                        className="h-16 w-24 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="border p-2">{p.title}</td>
                  <td className="border p-2">{p.price}</td>
                  <td className="border p-2">{p.location}</td>
                  <td className="border p-2">{p.category}</td>
                  <td className="border p-2 flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No projects available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
