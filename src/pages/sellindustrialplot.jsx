import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function SellPropertyCards() {
  const [activeTab, setActiveTab] = useState("industrial");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    sector: "",
    plot_no: "",
    block_no: "",
    plot_size: "",
    facing: "",
    facilities: "",
    builder_name: "", // Changed from authority to builder_name
    anything_else: "",
    expected_price: "",
    images: [],
    flat_no: "",
    flat_size: "",
    bedroom: "",
    bathroom: "",
    furnish: "",
    status: "",
    address: "",
    // pet_friendly: "", // Added new field
  });

  const API_URL = import.meta.env.VITE_API_URL;

  const tabs = [
    { id: "industrial", label: "Industrial Plot" },
    { id: "residential", label: "Residential Plot" },
    { id: "flats", label: "Flats" },
    { id: "commercial", label: "Commercial Spaces" },
  ];

  const facingOptions = [
    "North",
    "South",
    "East",
    "West",
    "North East",
    "South East",
    "South West",
    "North West",
  ];

  const furnishOptions = ["Furnished", "Semi-Furnished", "Unfurnished"];

  const petFriendlyOptions = ["Yes", "No"]; // Options for new field

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: [...files] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      // Ensure all fields, including the new ones, are correctly appended
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((file) => data.append("images", file));
        } else {
          data.append(key, value);
        }
      });

      const routeMap = {
        industrial: "sell/industrial",
        residential: "sell/residential",
        flats: "sell/flats",
        commercial: "sell/commercial",
      };

      await axios.post(`${API_URL}/api/${routeMap[activeTab]}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Form submitted successfully!");

      // Reset form data including new/renamed fields
      setFormData({
        name: "",
        phone: "",
        email: "",
        sector: "",
        plot_no: "",
        block_no: "",
        plot_size: "",
        facing: "",
        facilities: "",
        builder_name: "", // Reset builder_name
        anything_else: "",
        expected_price: "",
        images: [],
        flat_no: "",
        flat_size: "",
        bedroom: "",
        bathroom: "",
        furnish: "",
        status: "",
        address: "",
        pet_friendly: "", // Reset pet_friendly
      });
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      alert("Failed to submit form");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-12 flex flex-col lg:flex-row gap-6 pt-20 px-4">
      {/* ===== Sidebar / Tabs ===== */}
      <div className="bg-white p-3 rounded-xl shadow-lg h-fit w-full lg:w-1/4 sticky top-24">
        {/* --- Desktop Vertical Tabs --- */}
        {/* ===== Desktop Vertical Tabs ===== */}
        <div className="hidden lg:flex flex-col space-y-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all duration-300 ${activeTab === t.id
                ? "bg-[#CA8B06] text-white shadow-md"      // Golden for active
                : "bg-gray-100 text-gray-700 hover:bg-[#9A0000]" // Dark red on hover
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ===== Mobile Horizontal Tabs ===== */}
        <div className="flex lg:hidden overflow-x-auto space-x-2 pb-2 scrollbar-hide">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${activeTab === t.id
                ? "bg-[#CA8B06] text-white shadow-md"      // Golden for active
                : "bg-gray-100 text-gray-700 hover:bg-[#9A0000]" // Dark red on hover
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>

      </div>

      {/* ===== Form Content ===== */}
      <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 sm:p-8 border">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-6  text-[#2A2513] capitalize text-center sm:text-left">
              {activeTab.replace("_", " ")} Details Form
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {/* ===== Basic Info ===== */}
              <div>
                <label className="block font-semibold mb-1 text-sm sm:text-base">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm sm:text-base"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-sm sm:text-base">
                  Phone / WhatsApp
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm sm:text-base"
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-sm sm:text-base">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm sm:text-base"
                  placeholder="Enter email (optional)"
                />
              </div>

              {/* ===== Plots & Commercial Tabs (Fields specific to plots/commercial) ===== */}
              {(activeTab === "industrial" ||
                activeTab === "residential" ||
                activeTab === "commercial") && (
                  <>
                    <div>
                      <label className="block font-semibold mb-1">Sector</label>
                      <input
                        type="text"
                        name="sector"
                        value={formData.sector}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2"
                        placeholder="Enter Sector"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Plot No.</label>
                      <input
                        type="text"
                        name="plot_no"
                        value={formData.plot_no}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2"
                        placeholder="Enter Plot Number"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">
                        Block No.
                      </label>
                      <input
                        type="text"
                        name="block_no"
                        value={formData.block_no}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2"
                        placeholder="Enter Block Number"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">
                        Plot Size
                      </label>
                      <input
                        type="text"
                        name="plot_size"
                        value={formData.plot_size}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2"
                        placeholder="Enter Plot Size (e.g. 200 Sq.Yds)"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Facing</label>
                      <select
                        name="facing"
                        value={formData.facing}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2"
                      >
                        <option value="">Select Facing</option>
                        {facingOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

              {/* ===== Flats Section (Fields specific to flats) ===== */}
              {activeTab === "flats" && (
                <>
                  <div>
                    <label className="block font-semibold mb-1">Sector</label>
                    <input
                      type="text"
                      name="sector"
                      value={formData.sector}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2"
                      placeholder="Enter Sector"
                    />
                  </div>

                  <div>
                    {/* Updated: Replaced "Govt. Authority" with "Builder Name" */}
                    <label className="block font-semibold mb-1">
                      Builder Name
                    </label>
                    <input
                      type="text"
                      name="builder_name" // Changed name to builder_name
                      value={formData.builder_name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2"
                      placeholder="Enter Builder Name"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Flat No.</label>
                    <input
                      type="text"
                      name="flat_no"
                      value={formData.flat_no}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2"
                      placeholder="Enter Flat Number"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">
                      Flat Size (sq.ft)
                    </label>
                    <input
                      type="text"
                      name="flat_size"
                      value={formData.flat_size}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2"
                      placeholder="e.g. 1200 Sq.Ft"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Bedroom</label>
                    <input
                      type="number"
                      name="bedroom"
                      value={formData.bedroom}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2"
                      placeholder="Enter Bedroom Count"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Bathroom</label>
                    <input
                      type="number"
                      name="bathroom"
                      value={formData.bathroom}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2"
                      placeholder="Enter Bathroom Count"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Furnish</label>
                    <select
                      name="furnish"
                      value={formData.furnish}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2"
                    >
                      <option value="">Select Furnish Type</option>
                      {furnishOptions.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Status</label>
                    <input
                      type="text"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2"
                      placeholder="Ready to Move / Under Construction"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2"
                      placeholder="Enter Full Address"
                    />
                  </div>

                  {/* New: Pet Friendly Field - Only for Flats */}
                  {/* <div>
                    <label className="block font-semibold mb-1">Pet Friendly</label>
                    <select
                      name="pet_friendly"
                      value={formData.pet_friendly}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2"
                    >
                      <option value="">Select Option</option>
                      {petFriendlyOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div> */}
                </>
              )}

              {/* ===== Common Fields (Appearing in all forms) ===== */}
              <div>
                <label className="block font-semibold mb-1">
                  Other Facilities
                </label>
                <input
                  type="text"
                  name="facilities"
                  value={formData.facilities}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="e.g. Near Market, School, Metro etc."
                />
              </div>


              <div className="sm:col-span-2">
                <label className="block font-semibold mb-1">
                  Anything Else
                </label>
                <textarea
                  name="anything_else"
                  value={formData.anything_else}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Add any additional information"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  Expected Price
                </label>
                <input
                  type="text"
                  name="expected_price"
                  value={formData.expected_price}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter Expected Price"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold mb-1">
                  Attach Photos
                </label>
                <input
                  type="file"
                  name="images"
                  multiple
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="bg-[#CA8B06] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#9A0000] transition-all duration-300 w-full"
                >
                  Submit{" "}
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Form
                </button>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}