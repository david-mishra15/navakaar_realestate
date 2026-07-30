import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminResidentialList() {
  const [plots, setPlots] = useState([]);
  const [form, setForm] = useState({
    sector: "",
    plot_no: "",
    block_no: "",
    plot_size: "",
    facing: "",
    facilities: "",
    other_facilities: "",
    authority: "",
    anything_else: "",
    expected_price: "",
  });
  const [images, setImages] = useState([]);
  const [editingPlot, setEditingPlot] = useState(null);

  const facingOptions = [

    "North East",
    "South East",
    "South West",
    "North West",
  ];

  const authorityOptions = [
    "Yamuna Authority",
    "Greater Noida Authority",
    "Noida Authority",
  ];

  // ✅ Fetch all plots
  const fetchPlots = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/residential`);
      setPlots(res.data);
    } catch (err) {
      console.error("Error fetching plots:", err);
    }
  };

  useEffect(() => {
    fetchPlots();
  }, []);

  // ✅ Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Add or Update plot
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    for (let i = 0; i < images.length; i++) formData.append("image", images[i]);

    try {
      if (editingPlot) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/admin/residential/${editingPlot}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Plot updated successfully!");
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/admin/residential`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Plot added successfully!");
      }

      // Reset form
      setForm({
        sector: "",
        plot_no: "",
        block_no: "",
        plot_size: "",
        facing: "",
        facilities: "",
        other_facilities: "",
        authority: "",
        anything_else: "",
        expected_price: "",
      });
      setImages([]);
      setEditingPlot(null);
      fetchPlots();
    } catch (err) {
      console.error("Error saving plot:", err);
      alert("Something went wrong!");
    }
  };

  // ✅ Edit existing plot
  const handleEdit = (plot) => {
    setEditingPlot(plot.id);
    setForm({
      sector: plot.sector || "",
      plot_no: plot.plot_no || "",
      block_no: plot.block_no || "",
      plot_size: plot.plot_size || "",
      facing: plot.facing || "",
      facilities: plot.facilities || "",
      other_facilities: plot.other_facilities || "",
      authority: plot.authority || "",
      anything_else: plot.anything_else || "",
      expected_price: plot.expected_price || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Delete plot
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this plot?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/residential/${id}`);
        alert("Plot deleted successfully!");
        fetchPlots();
      } catch (err) {
        console.error("Error deleting plot:", err);
      }
    }
  };

  // ✅ Cancel editing
  const handleCancel = () => {
    setEditingPlot(null);
    setForm({
      sector: "",
      plot_no: "",
      block_no: "",
      plot_size: "",
      facing: "",
      facilities: "",
      other_facilities: "",
      authority: "",
      anything_else: "",
      expected_price: "",
    });
    setImages([]);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        {editingPlot ? "Edit Industrial Plot" : "Add Residential Plot"}
      </h2>

      {/* ✅ Form Section */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid md:grid-cols-2 gap-3">
          <input
            name="sector"
            value={form.sector}
            onChange={handleChange}
            placeholder="Sector"
            className="border p-2 rounded w-full"
          />
          <input
            name="plot_no"
            value={form.plot_no}
            onChange={handleChange}
            placeholder="Plot Number"
            className="border p-2 rounded w-full"
          />
          <input
            name="block_no"
            value={form.block_no}
            onChange={handleChange}
            placeholder="Block Number"
            className="border p-2 rounded w-full"
          />
          <input
            name="plot_size"
            value={form.plot_size}
            onChange={handleChange}
            placeholder="Plot Size"
            className="border p-2 rounded w-full"
          />
          <select
            name="facing"
            value={form.facing}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Facing</option>
            {facingOptions.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
          <input
            name="facilities"
            value={form.facilities}
            onChange={handleChange}
            placeholder="Facilities"
            className="border p-2 rounded w-full"
          />
          <input
            name="other_facilities"
            value={form.other_facilities}
            onChange={handleChange}
            placeholder="Other Facilities"
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
              <option key={a} value={a}>{a}</option>
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
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {editingPlot ? "Update Plot" : "Add Plot"}
          </button>
          {editingPlot && (
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

      {/* ✅ Plots Table */}
      <h3 className="text-xl font-semibold mb-3">All Industrial Plots</h3>
      {plots.length === 0 ? (
        <p>No plots found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Sector</th>
                <th className="p-2 border">Plot No</th>
                <th className="p-2 border">Block</th>
                <th className="p-2 border">Size</th>
                <th className="p-2 border">Facing</th>
                <th className="p-2 border">Facilities</th>
                <th className="p-2 border">Other Facilities</th>
                <th className="p-2 border">Authority</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plots.map((plot) => (
                <tr key={plot.id}>
                  <td className="p-2 border">{plot.sector}</td>
                  <td className="p-2 border">{plot.plot_no}</td>
                  <td className="p-2 border">{plot.block_no}</td>
                  <td className="p-2 border">{plot.plot_size}</td>
                  <td className="p-2 border">{plot.facing}</td>
                  <td className="p-2 border">{plot.facilities}</td>
                  <td className="p-2 border">{plot.other_facilities}</td>
                  <td className="p-2 border">{plot.authority}</td>
                  <td className="p-2 border">₹{plot.expected_price}</td>
                  <td className="p-2 border">
                    {plot.image && plot.image.split(",").map((img, i) => (
                      <img
                        key={i}
                        src={`${import.meta.env.VITE_API_URL}/uploads/${img}`}
                        alt="Plot"
                        className="w-20 h-20 object-cover mr-1"
                      />
                    ))}
                  </td>
                  <td className="p-2 border flex gap-2">
                    <button
                      onClick={() => handleEdit(plot)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(plot.id)}
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
