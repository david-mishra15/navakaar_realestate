import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminSellCommercial() {
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({
    sector: "",
    plot_no: "",
    block_no: "",
    plot_size: "",
    facing: "",
    facilities: "",
    authority: "",
    anything_else: "",
    expected_price: "",
  });
  const [images, setImages] = useState([]);
  const [editingProperty, setEditingProperty] = useState(null);

  const authorityOptions = ["Yamuna Authority", "Greater Noida Authority", "Noida Authority"];
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch all properties
  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/sell-commercial`);
      setProperties(res.data);
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    for (let i = 0; i < images.length; i++) formData.append("image", images[i]);

    try {
      if (editingProperty) {
        await axios.put(
          `${API_URL}/api/admin/sell-commercial/${editingProperty}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Property updated successfully!");
      } else {
        await axios.post(
          `${API_URL}/api/admin/sell-commercial`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Property added successfully!");
      }

      setForm({
        sector: "",
        plot_no: "",
        block_no: "",
        plot_size: "",
        facing: "",
        facilities: "",
        authority: "",
        anything_else: "",
        expected_price: "",
      });
      setImages([]);
      setEditingProperty(null);
      fetchProperties();
    } catch (err) {
      console.error("Error saving property:", err);
      alert("Something went wrong!");
    }
  };

  const handleEdit = (property) => {
    setEditingProperty(property.id);
    setForm({
      sector: property.sector || "",
      plot_no: property.plot_no || "",
      block_no: property.block_no || "",
      plot_size: property.plot_size || "",
      facing: property.facing || "",
      facilities: property.facilities || "",
      authority: property.authority || "",
      anything_else: property.anything_else || "",
      expected_price: property.expected_price || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this property?")) {
      try {
        await axios.delete(`${API_URL}/api/admin/sell-commercial/${id}`);
        alert("Property deleted successfully!");
        fetchProperties();
      } catch (err) {
        console.error("Error deleting property:", err);
      }
    }
  };

  const handleCancel = () => {
    setEditingProperty(null);
    setForm({
      sector: "",
      plot_no: "",
      block_no: "",
      plot_size: "",
      facing: "",
      facilities: "",
      authority: "",
      anything_else: "",
      expected_price: "",
    });
    setImages([]);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        {editingProperty ? "Edit Commercial Property" : "Add Commercial Property"}
      </h2>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid md:grid-cols-2 gap-3">
          <input name="sector" value={form.sector} onChange={handleChange} placeholder="Sector" className="border p-2 rounded w-full" />
          <input name="plot_no" value={form.plot_no} onChange={handleChange} placeholder="Plot Number" className="border p-2 rounded w-full" />
          <input name="block_no" value={form.block_no} onChange={handleChange} placeholder="Block Number" className="border p-2 rounded w-full" />
          <input name="plot_size" value={form.plot_size} onChange={handleChange} placeholder="Plot Size" className="border p-2 rounded w-full" />
          <input name="facing" value={form.facing} onChange={handleChange} placeholder="Facing" className="border p-2 rounded w-full" />
          <input name="facilities" value={form.facilities} onChange={handleChange} placeholder="Facilities" className="border p-2 rounded w-full" />
          <select name="authority" value={form.authority} onChange={handleChange} className="border p-2 rounded w-full">
            <option value="">Select Authority</option>
            {authorityOptions.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          <input name="anything_else" value={form.anything_else} onChange={handleChange} placeholder="Anything Else" className="border p-2 rounded w-full" />
          <input name="expected_price" value={form.expected_price} onChange={handleChange} placeholder="Expected Price" className="border p-2 rounded w-full" />
        </div>

        <input type="file" multiple onChange={(e) => setImages([...e.target.files])} className="border p-2 rounded w-full mt-3" />

        <div className="flex gap-3 mt-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {editingProperty ? "Update Property" : "Add Property"}
          </button>
          {editingProperty && (
            <button type="button" onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Properties Table */}
      <h3 className="text-xl font-semibold mb-3">All Properties</h3>
      {properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Sector</th>
                <th className="p-2 border">Plot No</th>
                <th className="p-2 border">Block No</th>
                <th className="p-2 border">Plot Size</th>
                <th className="p-2 border">Facing</th>
                <th className="p-2 border">Facilities</th>
                <th className="p-2 border">Authority</th>
                <th className="p-2 border">Anything Else</th>
                <th className="p-2 border">Expected Price</th>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property.id}>
                  <td className="p-2 border">{property.sector}</td>
                  <td className="p-2 border">{property.plot_no}</td>
                  <td className="p-2 border">{property.block_no}</td>
                  <td className="p-2 border">{property.plot_size}</td>
                  <td className="p-2 border">{property.facing}</td>
                  <td className="p-2 border">{property.facilities}</td>
                  <td className="p-2 border">{property.authority}</td>
                  <td className="p-2 border">{property.anything_else}</td>
                  <td className="p-2 border">₹{property.expected_price}</td>
                  <td className="p-2 border">
                    {property.image &&
                      property.image.split(",").map((img, i) => (
                        <img key={i} src={`${API_URL}/uploads/${img}`} alt="Property" className="w-20 h-20 object-cover mr-1" />
                      ))}
                  </td>
                  <td className="p-2 border flex gap-2">
                    <button onClick={() => handleEdit(property)} className="bg-yellow-500 text-white px-2 py-1 rounded">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(property.id)} className="bg-red-600 text-white px-2 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
