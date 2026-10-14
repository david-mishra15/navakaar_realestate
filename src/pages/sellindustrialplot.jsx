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
    <div className="container-site pt-24 sm:pt-32 pb-16 sm:pb-24 flex flex-col lg:flex-row gap-6 lg:gap-12">
      {/* ===== Sidebar / Tabs ===== */}
      <div className="sticky top-16 lg:top-28 z-20 -mx-5 px-5 sm:mx-0 sm:px-0 py-3 lg:py-0 bg-paper/95 backdrop-blur lg:bg-transparent lg:backdrop-blur-none h-fit w-auto lg:w-60 shrink-0">
        {/* --- Desktop Vertical Tabs --- */}
        {/* ===== Desktop Vertical Tabs ===== */}
        <div className="hidden lg:flex flex-col border-t border-ink">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`w-full text-left py-4 border-b border-line text-[15px] transition-colors duration-300 ${activeTab === t.id
                ? "text-ink font-medium pl-3 border-l-2 border-l-ink"
                : "text-muted hover:text-ink"
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ===== Mobile Horizontal Tabs ===== */}
        <div className="flex lg:hidden overflow-x-auto gap-2 scrollbar-hide">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`chip flex-shrink-0 whitespace-nowrap ${activeTab === t.id
                ? "chip-active"
                : ""
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>

      </div>

      {/* ===== Form Content ===== */}
      <div className="flex-1 min-w-0 bg-white rounded-sm border border-line p-6 sm:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="display-md text-ink capitalize mb-8 sm:mb-10">
              {activeTab.replace("_", " ")} Details Form
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5"
            >
              {/* ===== Basic Info ===== */}
              <div>
                <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="field"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">
                  Phone / WhatsApp
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="field"
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="field"
                  placeholder="Enter email (optional)"
                />
              </div>

              {/* ===== Plots & Commercial Tabs (Fields specific to plots/commercial) ===== */}
              {(activeTab === "industrial" ||
                activeTab === "residential" ||
                activeTab === "commercial") && (
                  <>
                    <div>
                      <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Sector</label>
                      <input
                        type="text"
                        name="sector"
                        value={formData.sector}
                        onChange={handleChange}
                        className="field"
                        placeholder="Enter Sector"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Plot No.</label>
                      <input
                        type="text"
                        name="plot_no"
                        value={formData.plot_no}
                        onChange={handleChange}
                        className="field"
                        placeholder="Enter Plot Number"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">
                        Block No.
                      </label>
                      <input
                        type="text"
                        name="block_no"
                        value={formData.block_no}
                        onChange={handleChange}
                        className="field"
                        placeholder="Enter Block Number"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">
                        Plot Size
                      </label>
                      <input
                        type="text"
                        name="plot_size"
                        value={formData.plot_size}
                        onChange={handleChange}
                        className="field"
                        placeholder="Enter Plot Size (e.g. 200 Sq.Yds)"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Facing</label>
                      <select
                        name="facing"
                        value={formData.facing}
                        onChange={handleChange}
                        className="field"
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
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Sector</label>
                    <input
                      type="text"
                      name="sector"
                      value={formData.sector}
                      onChange={handleChange}
                      className="field"
                      placeholder="Enter Sector"
                    />
                  </div>

                  <div>
                    {/* Updated: Replaced "Govt. Authority" with "Builder Name" */}
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">
                      Builder Name
                    </label>
                    <input
                      type="text"
                      name="builder_name" // Changed name to builder_name
                      value={formData.builder_name}
                      onChange={handleChange}
                      className="field"
                      placeholder="Enter Builder Name"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Flat No.</label>
                    <input
                      type="text"
                      name="flat_no"
                      value={formData.flat_no}
                      onChange={handleChange}
                      className="field"
                      placeholder="Enter Flat Number"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">
                      Flat Size (sq.ft)
                    </label>
                    <input
                      type="text"
                      name="flat_size"
                      value={formData.flat_size}
                      onChange={handleChange}
                      className="field"
                      placeholder="e.g. 1200 Sq.Ft"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Bedroom</label>
                    <input
                      type="number"
                      name="bedroom"
                      value={formData.bedroom}
                      onChange={handleChange}
                      className="field"
                      placeholder="Enter Bedroom Count"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Bathroom</label>
                    <input
                      type="number"
                      name="bathroom"
                      value={formData.bathroom}
                      onChange={handleChange}
                      className="field"
                      placeholder="Enter Bathroom Count"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Furnish</label>
                    <select
                      name="furnish"
                      value={formData.furnish}
                      onChange={handleChange}
                      className="field"
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
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Status</label>
                    <input
                      type="text"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="field"
                      placeholder="Ready to Move / Under Construction"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="field"
                      placeholder="Enter Full Address"
                    />
                  </div>

                  {/* New: Pet Friendly Field - Only for Flats */}
                  {/* <div>
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Pet Friendly</label>
                    <select
                      name="pet_friendly"
                      value={formData.pet_friendly}
                      onChange={handleChange}
                      className="field"
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
                <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">
                  Other Facilities
                </label>
                <input
                  type="text"
                  name="facilities"
                  value={formData.facilities}
                  onChange={handleChange}
                  className="field"
                  placeholder="e.g. Near Market, School, Metro etc."
                />
              </div>


              <div className="sm:col-span-2">
                <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">
                  Anything Else
                </label>
                <textarea
                  name="anything_else"
                  value={formData.anything_else}
                  onChange={handleChange}
                  rows="3"
                  className="field"
                  placeholder="Add any additional information"
                ></textarea>
              </div>

              <div>
                <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">
                  Expected Price
                </label>
                <input
                  type="text"
                  name="expected_price"
                  value={formData.expected_price}
                  onChange={handleChange}
                  className="field"
                  placeholder="Enter Expected Price"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">
                  Attach Photos
                </label>
                <input
                  type="file"
                  name="images"
                  multiple
                  accept="image/*"
                  onChange={handleChange}
                  className="field"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="btn-primary w-full mt-2"
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