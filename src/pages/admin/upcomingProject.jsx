import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // Read API URL from .env

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    thumbnail: null,
  });
  const [editing, setEditing] = useState(false);

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/upcomingprojects`);
      const projectsArray = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];
      setProjects(projectsArray);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setProjects([]);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Add / Update project
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      if (formData.thumbnail) data.append("thumbnail", formData.thumbnail);

      if (editing) {
        await axios.put(`${API_URL}/api/upcomingprojects/${formData.id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`${API_URL}/api/upcomingprojects`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setFormData({ id: null, title: "", description: "", thumbnail: null });
      setEditing(false);
      fetchProjects();
    } catch (err) {
      console.error("Error submitting project:", err);
    }
  };

  // Edit project
  const handleEdit = (proj) => {
    setFormData({
      id: proj.id,
      title: proj.title,
      description: proj.description,
      thumbnail: null,
    });
    setEditing(true);
  };

  // Delete project
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/upcomingprojects/${id}`);
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Upcoming Projects</h1>

      {/* Add / Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 border p-4 rounded-lg bg-gray-50"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="file"
          name="thumbnail"
          onChange={handleChange}
          className="mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editing ? "Update" : "Add"} Project
        </button>
      </form>

      {/* Projects Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Image</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {(projects || []).map((proj) => (
            <tr key={proj.id}>
              <td className="border p-2">
                {proj.thumbnail && (
                  <img
                    src={`${API_URL}/uploads/${proj.thumbnail}`}
                    alt={proj.title}
                    className="w-20 h-20 object-cover"
                  />
                )}
              </td>
              <td className="border p-2">{proj.title}</td>
              <td className="border p-2">{proj.description}</td>
              <td className="border p-2 flex gap-2">
                <button
                  className="bg-yellow-400 px-2 py-1 rounded"
                  onClick={() => handleEdit(proj)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(proj.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {(!projects || projects.length === 0) && (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-500">
                No projects found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
