import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogsAdmin = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    oldImage: "",
  });
  const [editingBlog, setEditingBlog] = useState(null);

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/blogs`);
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Add or Update Blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (formData.image) data.append("image", formData.image);
    if (editingBlog) data.append("oldImage", formData.oldImage);

    try {
      if (editingBlog) {
        await axios.put(
          `${API_URL}/api/blogs/${editingBlog.id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setEditingBlog(null);
      } else {
        await axios.post(
          `${API_URL}/api/blogs/add`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      setFormData({ title: "", description: "", image: null, oldImage: "" });
      fetchBlogs();
    } catch (err) {
      console.error("Error saving blog:", err);
    }
  };

  // Edit blog
  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      description: blog.description,
      image: null,
      oldImage: blog.image,
    });
  };

  // Delete blog
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`${API_URL}/api/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Blog Panel</h1>

      {/* Add/Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md mb-10 max-w-xl mx-auto"
      >
        <h2 className="text-2xl font-semibold mb-4">
          {editingBlog ? "Edit Blog" : "Add Blog"}
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          rows="4"
          required
        />

        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        {editingBlog && formData.oldImage && (
          <img
            src={`${API_URL}${formData.oldImage}`}
            alt="Current"
            className="w-32 h-20 mb-3 object-cover rounded"
          />
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingBlog ? "Update Blog" : "Add Blog"}
          </button>

          {editingBlog && (
            <button
              type="button"
              onClick={() => {
                setEditingBlog(null);
                setFormData({
                  title: "",
                  description: "",
                  image: null,
                  oldImage: "",
                });
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Blog List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded shadow p-4 flex flex-col justify-between"
          >
            <img
              src={`${API_URL}${blog.image}`}
              alt={blog.title}
              className="w-full h-40 object-cover mb-3 rounded"
            />
            <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
            <p className="text-gray-600 mb-3">{blog.description}</p>

            <div className="flex justify-between mt-auto">
              <button
                onClick={() => handleEdit(blog)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsAdmin;
