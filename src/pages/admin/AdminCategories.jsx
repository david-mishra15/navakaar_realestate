import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [editing, setEditing] = useState(false);

  // ✅ Use environment variable from Vite
  const BASE_URL = import.meta.env.VITE_API_URL;
  const API_URL = `${BASE_URL}/api/categories`;

  // 🔹 Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(API_URL);
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 🔹 Handle Input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 🔹 Add / Update Category
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (formData.image) data.append("image", formData.image);

    try {
      if (editing) {
        await axios.put(`${API_URL}/${formData.id}`, data);
      } else {
        await axios.post(API_URL, data);
      }
      fetchCategories();
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Delete Category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Edit Category
  const handleEdit = (cat) => {
    setFormData({
      id: cat.id,
      title: cat.title,
      description: cat.description,
      image: null,
    });
    setPreview(cat.image ? `${BASE_URL}/uploads/${cat.image}` : null);
    setEditing(true);
  };

  // 🔹 Reset Form
  const resetForm = () => {
    setFormData({ id: null, title: "", description: "", image: null });
    setPreview(null);
    setEditing(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        Admin: Manage Categories
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full mt-4"
        ></textarea>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-4 h-40 object-cover rounded"
          />
        )}

        <div className="mt-4 flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {editing ? "Update Category" : "Add Category"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Categories List */}
      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {cat.image && (
              <img
                src={`${BASE_URL}/uploads/${cat.image}`}
                alt={cat.title}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-bold">{cat.title}</h3>
              <p className="text-sm text-gray-600">{cat.description}</p>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleEdit(cat)}
                  className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
