import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function RentyourPropertyCards() {
  const [activeTab, setActiveTab] = useState("villa");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    sector: "",
    customSector: "",
    blockNo: "",
    customBlockNo: "",
    plotNo: "",
    customPlotNo: "",
    plot_size: "",
    customPlotSize: "",
    flat_size: "",
    facing: "",
    customFacing: "",
    approxRent: "",
    customFlatSize: "",
    bedroom: "",
    bathroom: "",
    furnish: "",
    authority: "",
    customAuthority: "",
    facilities: "",
    customFacilities: "",
    towerNo: "",
    flatNo: "",
    floor: "",
    builderProjectName: "",
    address: "",
    typeOfProperty: "",
    anything_else: "",
    images: [],
  });

  const API_URL = import.meta.env.VITE_API_URL;

  const tabs = [
    { id: "villa", label: "Independent House / Villa" },
    { id: "flats", label: "Flats" },
    { id: "shop", label: "Shop" },
    { id: "factory", label: "Factory" },
    { id: "warehouse", label: "Warehouse" },
    { id: "other", label: "Other" },
  ];

  // Dropdown options
  const preferredSectors = Array.from(
    { length: 200 },
    (_, i) => `Sector ${i + 1}`
  );
  const villaPlotSizes = [162, 180, 240, 250, 300, 450];
  const flatSizes = [500, 750, 900, 1000, 1200, 1500, 1800, 2000];
  const villaBedroomOptions = Array.from({ length: 8 }, (_, i) => i + 1);
  const villaBathroomOptions = Array.from({ length: 8 }, (_, i) => i + 1);
  const flatBedroomOptions = [1, 2, 3, 4, 5, 6];
  const flatBathroomOptions = [1, 2, 3, 4, 5, 6];
  const furnishOptions = ["Furnished", "Semi-Furnished", "Unfurnished"];
  const authorityOptions = ["Yamuna Authority", "Greater Noida Authority"];
  const facilityOptions = [
    "Near Highway",
    "Parking Space",
    "Corner Plot",
    "Near Metro",
    "Park Facing",

    "Near Expressway",
  ];
  const blockNumbers = ["A", "B", "C", "D"];
  const plotNumbers = ["101", "102", "103", "104"];
  const facingOptions = ["East", "West", "North", "South", "North East", "South East", "South West", "North West"];
  const shopTypes = ["Shop", "Showroom", "Office","Restaurant","Storage","Other"];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: [...files] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const getFinalValue = (main, custom) => (main === "Custom" ? custom : main);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();


      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        sector: getFinalValue(formData.sector, formData.customSector),
        block_no: getFinalValue(formData.blockNo, formData.customBlockNo),
        plot_no: getFinalValue(formData.plotNo, formData.customPlotNo),
        plot_size: getFinalValue(formData.plot_size, formData.customPlotSize),
        bedroom: formData.bedroom,
        bathroom: formData.bathroom,
        furnish: formData.furnish,
        facing: getFinalValue(formData.facing, formData.customFacing),
        approx_rent: formData.approxRent,
        authority: getFinalValue(formData.authority, formData.customAuthority),
        facilities: getFinalValue(formData.facilities, formData.customFacilities),
        anything_else: formData.anything_else,
        images: formData.images,
        tower_no: formData.towerNo,
        flat_no: formData.flatNo,
        floor: formData.floor,
        builder_project_name: formData.builderProjectName,
        flat_size: getFinalValue(formData.flat_size, formData.customFlatSize),
        address: formData.address,
        type_of_property: formData.typeOfProperty,

      };



      Object.entries(payload).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((file) => data.append("images", file));
        } else {
          data.append(key, value);
        }
      });

      const routeMap = {
        villa: "/api/rentyour/villa",
        flats: "/api/rentyour/flats",
        shop: "/api/rentyour/shop",
        factory: "/api/rentyour/factory",
        warehouse: "/api/rentyour/warehouse",
        other: "/api/rentyour/other",
      };

      await axios.post(`${API_URL}${routeMap[activeTab]}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Form submitted successfully!");
      setFormData({
        name: "",
        phone: "",
        email: "",
        sector: "",
        customSector: "",
        blockNo: "",
        customBlockNo: "",
        plotNo: "",
        customPlotNo: "",
        plot_size: "",
        customPlotSize: "",
        flat_size: "",
        customFlatSize: "",
        facing: "",
        customFacing: "",
        approxRent: "",
        bedroom: "",
        bathroom: "",
        furnish: "",
        authority: "",
        customAuthority: "",
        facilities: "",
        customFacilities: "",
        towerNo: "",
        flatNo: "",
        floor: "",
        builderProjectName: "",
        address: "",
        typeOfProperty: "",
        anything_else: "",
        images: [],
      });
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      alert("Failed to submit form");
    }
  };

  const renderCommonFields = () => (
    <>
      {/* Contact Info */}
      <div>
        <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Contact Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="field"
          required
        />
      </div>
      <div>
        <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Contact No.</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="field"
          required
        />
      </div>
      <div>
        <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Email (optional)</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="field"
        />
      </div>

      {/* Sector */}
      {/* <div>
        <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2"> Sector</label>
        <select
          name="sector"
          value={formData.sector}
          onChange={handleChange}
          className="field"
        >
          <option value="">Select Sector</option>
          {preferredSectors.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
          <option value="Custom">Custom</option>
        </select>
        {formData.sector === "Custom" && (
          <input
            type="text"
            name="customSector"
            value={formData.customSector}
            onChange={handleChange}
            className="field mt-2"
            placeholder="Enter your preferred sector"
          />
        )}
      </div> */}

      {/* Facing */}
      <div className="mt-0">
        <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Facing</label>
        <select
          name="facing"
          value={formData.facing}
          onChange={handleChange}
          className="field"
        >
          <option value="">Select Facing</option>
          {facingOptions.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
          <option value="Custom">Custom</option>
        </select>
        {formData.facing === "Custom" && (
          <input
            type="text"
            name="customFacing"
            value={formData.customFacing}
            onChange={handleChange}
            className="field mt-2"
            placeholder="Enter facing direction"
          />
        )}
      </div>

      {/* Approx Rent */}
      <div className="mt-0">
        <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Approx Rent (₹)</label>
        <input
          type="number"
          name="approxRent"
          value={formData.approxRent}
          onChange={handleChange}
          className="field"
          placeholder="Enter approximate rent"
        />
      </div>
      {/* Authority */}
      <div>
        <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Govt. Authority</label>
        <select
          name="authority"
          value={formData.authority}
          onChange={handleChange}
          className="field"
        >
          <option value="">Select Authority</option>
          {authorityOptions.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
          <option value="Custom">Custom</option>
        </select>
        {formData.authority === "Custom" && (
          <input
            type="text"
            name="customAuthority"
            value={formData.customAuthority}
            onChange={handleChange}
            className="field mt-2"
            placeholder="Enter custom authority"
          />
        )}
      </div>

      {/* Facilities */}
      <div>
        <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Facilities provided</label>
        <select
          name="facilities"
          value={formData.facilities}
          onChange={handleChange}
          className="field"
        >
          <option value="">Select Facility</option>
          {facilityOptions.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
          <option value="Custom">Custom</option>
        </select>
        {formData.facilities === "Custom" && (
          <input
            type="text"
            name="customFacilities"
            value={formData.customFacilities}
            onChange={handleChange}
            className="field mt-2"
            placeholder="Enter your custom facility"
          />
        )}
      </div>

      {/* Any Other Choice */}
      <div className="sm:col-span-2">
        <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Any Other Choice</label>
        <textarea
          name="anything_else"
          value={formData.anything_else}
          onChange={handleChange}
          rows="3"
          className="field"
        />
      </div>

      {/* Images */}
      <div className="sm:col-span-2">
        <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Attach Photos</label>
        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="field"
        />
      </div>


      <div>
        <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2"> Sector</label>
        <select
          name="sector"
          value={formData.sector}
          onChange={handleChange}
          className="field"
        >
          <option value="">Select Sector</option>
          {preferredSectors.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
          <option value="Custom">Custom</option>
        </select>
        {formData.sector === "Custom" && (
          <input
            type="text"
            name="customSector"
            value={formData.customSector}
            onChange={handleChange}
            className="field mt-2"
            placeholder="Enter your preferred sector"
          />
        )}
      </div>
    </>
  );

  return (
    <div className="container-site pt-24 sm:pt-32 pb-16 sm:pb-24 flex flex-col lg:flex-row gap-6 lg:gap-12">
      {/* Sidebar Tabs */}
      <div className="sticky top-16 lg:top-28 z-20 -mx-5 px-5 sm:mx-0 sm:px-0 py-3 lg:py-0 bg-paper/95 backdrop-blur lg:bg-transparent lg:backdrop-blur-none h-fit w-auto lg:w-60 shrink-0">
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

      {/* ===== FORM ===== */}
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
              {tabs.find((t) => t.id === activeTab)?.label} — Rent your property
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5"
            >
              {/* Common fields for all tabs */}
              {renderCommonFields()}

              {/* Additional Villa Fields */}
              {activeTab === "villa" && (
                <>
                  <div>
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Bedroom</label>
                    <select
                      name="bedroom"
                      value={formData.bedroom}
                      onChange={handleChange}
                      className="field"
                    >
                      <option value="">Select Bedroom</option>
                      {villaBedroomOptions.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Bathroom</label>
                    <select
                      name="bathroom"
                      value={formData.bathroom}
                      onChange={handleChange}
                      className="field"
                    >
                      <option value="">Select Bathroom</option>
                      {villaBathroomOptions.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Furnish Status</label>
                    <select
                      name="furnish"
                      value={formData.furnish}
                      onChange={handleChange}
                      className="field"
                    >
                      <option value="">Select Furnish Status</option>
                      {furnishOptions.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Block No. */}
                  <div>
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">
                      Block No.
                    </label>
                    <select
                      name="blockNo"
                      value={formData.blockNo}
                      onChange={handleChange}
                      className="field"
                    >
                      <option value="">Select Block No.</option>
                      {blockNumbers.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                      <option value="Custom">Custom</option>
                    </select>
                    {formData.blockNo === "Custom" && (
                      <input
                        type="text"
                        name="customBlockNo"
                        value={formData.customBlockNo}
                        onChange={handleChange}
                        className="field mt-2"
                        placeholder="Enter your block number"
                      />
                    )}
                  </div>

                  {/* Plot No. */}
                  <div className="mt-4">
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Plot No.</label>
                    <select
                      name="plotNo"
                      value={formData.plotNo}
                      onChange={handleChange}
                      className="field"
                    >
                      <option value="">Select Plot No.</option>
                      {plotNumbers.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                      <option value="Custom">Custom</option>
                    </select>
                    {formData.plotNo === "Custom" && (
                      <input
                        type="text"
                        name="customPlotNo"
                        value={formData.customPlotNo}
                        onChange={handleChange}
                        className="field mt-2"
                        placeholder="Enter your plot number"
                      />
                    )}
                  </div>

                  {/* Plot Size */}
                  <div>
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Plot Size (m²)</label>
                    <select
                      name="plot_size"
                      value={formData.plot_size}
                      onChange={handleChange}
                      className="field"
                    >
                      <option value="">Select Plot Size</option>
                      {villaPlotSizes.map((p) => (
                        <option key={p} value={p}>
                          {p} m²
                        </option>
                      ))}
                      <option value="Custom">Custom</option>
                    </select>
                    {formData.plot_size === "Custom" && (
                      <input
                        type="text"
                        name="customPlotSize"
                        value={formData.customPlotSize}
                        onChange={handleChange}
                        className="field mt-2"
                        placeholder="Enter custom plot size"
                      />
                    )}
                  </div>
                </>
              )}

              {/* Additional Flats Fields */}
              {activeTab === "flats" && (
                <>
                  <div>
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Flat Size (sq. ft.)</label>
                    <select
                      name="flat_size"
                      value={formData.flat_size}
                      onChange={handleChange}
                      className="field"
                    >
                      <option value="">Select Flat Size</option>
                      {flatSizes.map((f) => (
                        <option key={f} value={f}>
                          {f} sq. ft.
                        </option>
                      ))}
                      <option value="Custom">Custom</option>
                    </select>
                    {formData.flat_size === "Custom" && (
                      <input
                        type="text"
                        name="customFlatSize"
                        value={formData.customFlatSize}
                        onChange={handleChange}
                        className="field mt-2"
                        placeholder="Enter custom flat size"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Bedroom</label>
                    <select
                      name="bedroom"
                      value={formData.bedroom}
                      onChange={handleChange}
                      className="field"
                    >
                      <option value="">Select Bedroom</option>
                      {flatBedroomOptions.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Bathroom</label>
                    <select
                      name="bathroom"
                      value={formData.bathroom}
                      onChange={handleChange}
                      className="field"
                    >
                      <option value="">Select Bathroom</option>
                      {flatBathroomOptions.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Furnish Status</label>
                    <select
                      name="furnish"
                      value={formData.furnish}
                      onChange={handleChange}
                      className="field"
                    >
                      <option value="">Select Furnish Status</option>
                      {furnishOptions.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Tower No. */}
                  <div className="mt-4">
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">
                      Tower No.
                    </label>
                    <input
                      type="text"
                      name="towerNo"
                      value={formData.towerNo}
                      onChange={handleChange}
                      className="field"
                      placeholder="Enter tower number"
                    />
                  </div>

                  {/* Flat No. */}
                  <div className="mt-4">
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Flat No.</label>
                    <input
                      type="text"
                      name="flatNo"
                      value={formData.flatNo}
                      onChange={handleChange}
                      className="field"
                      placeholder="Enter flat number"
                    />
                  </div>

                  {/* Floor */}
                  <div className="mt-4">
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Floor</label>
                    <input
                      type="text"
                      name="floor"
                      value={formData.floor}
                      onChange={handleChange}
                      className="field"
                      placeholder="Enter floor"
                    />
                  </div>

                  {/* Builder Project Name */}
                  <div className="mt-4">
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">
                      Builder Project Name
                    </label>
                    <input
                      type="text"
                      name="builderProjectName"
                      value={formData.builderProjectName}
                      onChange={handleChange}
                      className="field"
                      placeholder="Enter builder project name"
                    />
                  </div>
                </>
              )}

              {/* Additional Shop Fields */}
              {activeTab === "shop" && (
                <>
                  <div>
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Plot Size (Mtr.)</label>
                    <input
                      type="text"
                      name="plot_size"
                      value={formData.plot_size}
                      onChange={handleChange}
                      className="field"
                      placeholder="Enter plot size"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Floor</label>
                    <input
                      type="text"
                      name="floor"
                      value={formData.floor}
                      onChange={handleChange}
                      className="field"
                      placeholder="Enter floor"
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
                      placeholder="Enter address"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Type of Property</label>
                    <select
                      name="typeOfProperty"
                      value={formData.typeOfProperty}
                      onChange={handleChange}
                      className="field"
                    >
                      <option value="">Select Type</option>
                      {shopTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Builder Project Name</label>
                    <input
                      type="text"
                      name="builderProjectName"
                      value={formData.builderProjectName}
                      onChange={handleChange}
                      className="field"
                      placeholder="Enter builder project name"
                    />
                  </div>
                </>
              )}

              {/* Additional Factory Fields */}
              {activeTab === "factory" && (
                <>
                  <div>
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Plot Size (Mtr.)</label>
                    <input
                      type="text"
                      name="plot_size"
                      value={formData.plot_size}
                      onChange={handleChange}
                      className="field"
                      placeholder="Enter plot size"
                    />
                  </div>
                </>
              )}

              {/* Additional Warehouse Fields */}
              {activeTab === "warehouse" && (
                <>
                  <div>
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Plot Size (Mtr.)</label>
                    <input
                      type="text"
                      name="plot_size"
                      value={formData.plot_size}
                      onChange={handleChange}
                      className="field"
                      placeholder="Enter plot size"
                    />
                  </div>
                </>
              )}

              {/* Submit */}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="btn-primary w-full mt-2"
                >
                  Submit {tabs.find((t) => t.id === activeTab)?.label} Rent Form
                </button>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}