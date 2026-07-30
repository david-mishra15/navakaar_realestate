import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminSelladdFlats() {
  const [flats, setFlats] = useState([]);
  const [form, setForm] = useState({
    sector: "",
    flat_no: "",
    flat_size: "",
    bedroom: "",
    bathroom: "",
    furnish: "",
    status: "",
    address: "",
    facilities: "",
    authority: "",
    anything_else: "",
    expected_price: "",
  });
  const [images, setImages] = useState([]);
  const [editingFlat, setEditingFlat] = useState(null);

  const furnishOptions = ["Furnished", "Semi-Furnished", "Unfurnished"];
  const statusOptions = ["Available", "Sold", "Pending"];
  const authorityOptions = [
    "Yamuna Authority",
    "Greater Noida Authority",
    "Noida Authority",
  ];

  // Fetch all flats
  const fetchFlats = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/sell-flats`
      );
      setFlats(res.data);
    } catch (err) {
      console.error("Error fetching flats:", err);
    }
  };

  useEffect(() => {
    fetchFlats();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) =>
      formData.append(key, value)
    );
    for (let i = 0; i < images.length; i++)
      formData.append("image", images[i]);

    try {
      if (editingFlat) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/admin/sell-flats/${editingFlat}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Flat updated successfully!");
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/admin/sell-flats`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Flat added successfully!");
      }

      setForm({
        sector: "",
        flat_no: "",
        flat_size: "",
        bedroom: "",
        bathroom: "",
        furnish: "",
        status: "",
        address: "",
        facilities: "",
        authority: "",
        anything_else: "",
        expected_price: "",
      });
      setImages([]);
      setEditingFlat(null);
      fetchFlats();
    } catch (err) {
      console.error("Error saving flat:", err);
      alert("Something went wrong!");
    }
  };

  const handleEdit = (flat) => {
    setEditingFlat(flat.id);
    setForm({
      sector: flat.sector || "",
      flat_no: flat.flat_no || "",
      flat_size: flat.flat_size || "",
      bedroom: flat.bedroom || "",
      bathroom: flat.bathroom || "",
      furnish: flat.furnish || "",
      status: flat.status || "",
      address: flat.address || "",
      facilities: flat.facilities || "",
      authority: flat.authority || "",
      anything_else: flat.anything_else || "",
      expected_price: flat.expected_price || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this flat?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/admin/sell-flats/${id}`
        );
        alert("Flat deleted successfully!");
        fetchFlats();
      } catch (err) {
        console.error("Error deleting flat:", err);
      }
    }
  };

  const handleCancel = () => {
    setEditingFlat(null);
    setForm({
      sector: "",
      flat_no: "",
      flat_size: "",
      bedroom: "",
      bathroom: "",
      furnish: "",
      status: "",
      address: "",
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
        {editingFlat ? "Edit Flat" : "Add Flat"}
      </h2>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <div className="grid md:grid-cols-2 gap-3">
          <input
            name="sector"
            value={form.sector}
            onChange={handleChange}
            placeholder="Sector"
            className="border p-2 rounded w-full"
          />
          <input
            name="flat_no"
            value={form.flat_no}
            onChange={handleChange}
            placeholder="Flat Number"
            className="border p-2 rounded w-full"
          />
          <input
            name="flat_size"
            value={form.flat_size}
            onChange={handleChange}
            placeholder="Flat Size"
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            name="bedroom"
            value={form.bedroom}
            onChange={handleChange}
            placeholder="Bedrooms"
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            name="bathroom"
            value={form.bathroom}
            onChange={handleChange}
            placeholder="Bathrooms"
            className="border p-2 rounded w-full"
          />
          <select
            name="furnish"
            value={form.furnish}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Furnish</option>
            {furnishOptions.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Status</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="border p-2 rounded w-full"
          />
          <input
            name="facilities"
            value={form.facilities}
            onChange={handleChange}
            placeholder="Facilities"
            className="border p-2 rounded w-full"
          />
          <select
            name="authority"
            value={form.authority}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Authority</option>
            {authorityOptions.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          <input
            name="anything_else"
            value={form.anything_else}
            onChange={handleChange}
            placeholder="Anything Else"
            className="border p-2 rounded w-full"
          />
          <input
            name="expected_price"
            value={form.expected_price}
            onChange={handleChange}
            placeholder="Expected Price"
            className="border p-2 rounded w-full"
          />
        </div>

        <input
          type="file"
          multiple
          onChange={(e) => setImages([...e.target.files])}
          className="border p-2 rounded w-full mt-3"
        />

        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editingFlat ? "Update Flat" : "Add Flat"}
          </button>
          {editingFlat && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Flats Table */}
      <h3 className="text-xl font-semibold mb-3">All Flats</h3>
      {flats.length === 0 ? (
        <p>No flats found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Sector</th>
                <th className="p-2 border">Flat No</th>
                <th className="p-2 border">Size</th>
                <th className="p-2 border">Bedroom</th>
                <th className="p-2 border">Bathroom</th>
                <th className="p-2 border">Furnish</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Address</th>
                <th className="p-2 border">Facilities</th>
                <th className="p-2 border">Authority</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {flats.map((flat) => (
                <tr key={flat.id}>
                  <td className="p-2 border">{flat.sector}</td>
                  <td className="p-2 border">{flat.flat_no}</td>
                  <td className="p-2 border">{flat.flat_size}</td>
                  <td className="p-2 border">{flat.bedroom}</td>
                  <td className="p-2 border">{flat.bathroom}</td>
                  <td className="p-2 border">{flat.furnish}</td>
                  <td className="p-2 border">{flat.status}</td>
                  <td className="p-2 border">{flat.address}</td>
                  <td className="p-2 border">{flat.facilities}</td>
                  <td className="p-2 border">{flat.authority}</td>
                  <td className="p-2 border">₹{flat.expected_price}</td>
                  <td className="p-2 border">
                    {flat.image &&
                      flat.image.split(",").map((img, i) => (
                        <img
                          key={i}
                          src={`${import.meta.env.VITE_API_URL}/uploads/${img}`}
                          alt="Flat"
                          className="w-20 h-20 object-cover mr-1"
                        />
                      ))}
                  </td>
                  <td className="p-2 border flex gap-2">
                    <button
                      onClick={() => handleEdit(flat)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(flat.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
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
