import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function RequiredPropertyCards() {
  const [activeTab, setActiveTab] = useState("villa");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    sector: "",
    customSector: "",
    plot_size: "",
    customPlotSize: "",
    flat_size: "",
    customFlatSize: "",
    bedroom: "",
    bathroom: "",
    furnish: "",
    authority: "", // Used for Villa, Shop, Factory, Warehouse, Other
    customAuthority: "",
    builder_name: "", // Used for Flats
    customBuilderName: "",
    facilities: [], // Changed to array for multiple selection
    customFacilities: "",
    budget: "",
    anything_else: "",
    images: [],
    pet_friendly: "", // New Field
    kitchen_available: "", // New Field for Shop
    washroom_available: "", // New Field for Shop
    purpose: "", // New Field for Factory and Warehouse
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
  const preferredSectors = Array.from({ length: 200 }, (_, i) => `Sector ${i + 1}`);
  const villaPlotSizes = [162, 180, 240, 250, 300, 450]; // Size in sq meters (m²)
  const shopPlotSizes = [250, 500, 750, 1000, 1500, 2000]; // Size in sq feet (sq. ft.)
  const factoryWarehousePlotSizes = [500, 1000, 2000, 5000, 10000]; // Size in sq meters (m²)
  const flatSizes = [500, 750, 900, 1000, 1200, 1500, 1800, 2000]; // Size in sq feet (sq. ft.)
  const villaBedroomOptions = Array.from({ length: 8 }, (_, i) => i + 1);
  const villaBathroomOptions = Array.from({ length: 8 }, (_, i) => i + 1);
  const flatBedroomOptions = [1, 2, 3, 4, 5, 6];
  const flatBathroomOptions = [1, 2, 3, 4, 5, 6];
  const furnishOptions = ["fullFurnished", "Semi-Furnished", "Unfurnished"];
  const authorityOptions = ["Yamuna Authority", "Greater Noida Authority", "Noida Authority"];
  const builderOptions = ["ATS", "ACE", "Gaur", "Bliss", "Eldeco"]; // Example builders
  // UPDATED: Added "Kitchen" and "Washroom" to facilityOptions
  const facilityOptions = [
    "Near Highway",
    "Parking Space",
    "Corner Plot",
    "Near Metro",
    "Park Facing",
    "East Facing",
    "North Facing",
    // "Pet Friendly",
    // "Kitchen", // NEW
  ];
  const factoryPurposeOptions = ["Manufacturing", "Assembly", "Storage/Logistics", "R&D"];
  const warehousePurposeOptions = ["General Storage", "Cold Storage", "E-commerce Fulfillment", "Cross-Docking"];
  const yesNoOptions = ["Yes", "No"];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (files) {
      // File upload
      setFormData((prev) => ({ ...prev, [name]: [...files] }));
    } else if (name === "facilities") {
      // Checkbox for facilities (multiple selection)
      const newFacilities = checked
        ? [...formData.facilities, value]
        : formData.facilities.filter((f) => f !== value);
      setFormData((prev) => ({ ...prev, facilities: newFacilities }));
    } else {
      // All other inputs
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const getFinalValue = (main, custom) => (main === "Custom" ? custom : main);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();

      const basePayload = {
        ...formData,
        // Resolve custom values
        sector: getFinalValue(formData.sector, formData.customSector),
        plot_size: getFinalValue(formData.plot_size, formData.customPlotSize),
        flat_size: getFinalValue(formData.flat_size, formData.customFlatSize),
        // Join facilities array into a string
        facilities: formData.facilities.join(', '),
      };

      let finalPayload = {};

      // Property type-specific resolution for authority/builder
      if (activeTab === "flats") {
        finalPayload = {
          ...basePayload,
          authority: "", // Ensure authority is empty for flats
          builder_name: getFinalValue(formData.builder_name, formData.customBuilderName),
          // pet_friendly is included in basePayload
        };
        // Clean up unneeded authority/customAuthority for Flats
        delete finalPayload.authority;
        delete finalPayload.customAuthority;
        delete finalPayload.kitchen_available; // Not applicable for flats
        delete finalPayload.washroom_available; // Not applicable for flats
        delete finalPayload.purpose; // Not applicable for flats
      } else {
        finalPayload = {
          ...basePayload,
          authority: getFinalValue(formData.authority, formData.customAuthority),
          builder_name: "", // Ensure builder_name is empty for non-flats
          // pet_friendly is included in basePayload
        };
        // Clean up unneeded builder_name/customBuilderName for non-Flats
        delete finalPayload.builder_name;
        delete finalPayload.customBuilderName;

        // Clean up pet_friendly for non-villa/non-flats
        if (activeTab !== "villa") {
          delete finalPayload.pet_friendly;
        }

        // Clean up shop-specific fields if not 'shop'
        if (activeTab !== "shop") {
          delete finalPayload.kitchen_available;
          delete finalPayload.washroom_available;
        }

        // Clean up factory/warehouse purpose if not 'factory' or 'warehouse'
        if (activeTab !== "factory" && activeTab !== "warehouse") {
          delete finalPayload.purpose;
        }
      }

      // Clean up unused custom fields for all
      delete finalPayload.customSector;
      delete finalPayload.customPlotSize;
      delete finalPayload.customFlatSize;
      delete finalPayload.customFacilities;


      Object.entries(finalPayload).forEach(([key, value]) => {
        // Ensure to skip empty builder/authority fields created above
        if (value === "") return;

        if (key === "images") {
          value.forEach((file) => data.append("images", file));
        } else {
          data.append(key, value);
        }
      });

      const routeMap = {
        villa: "/api/rent/villa",
        flats: "/api/rent/flats",
        shop: "/api/rent/shop",
        factory: "/api/rent/factory",
        warehouse: "/api/rent/warehouse",
        other: "/api/rent/other",
      };

      await axios.post(`${API_URL}${routeMap[activeTab]}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Form submitted successfully!");
      // Reset form data
      setFormData({
        name: "",
        phone: "",
        email: "",
        sector: "",
        customSector: "",
        plot_size: "",
        customPlotSize: "",
        flat_size: "",
        customFlatSize: "",
        bedroom: "",
        bathroom: "",
        furnish: "",
        authority: "",
        customAuthority: "",
        builder_name: "",
        customBuilderName: "",
        facilities: [], // Reset to empty array
        customFacilities: "",
        budget: "",
        anything_else: "",
        images: [],
        pet_friendly: "",
        kitchen_available: "",
        washroom_available: "",
        purpose: "",
      });
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      alert("Failed to submit form");
    }
  };

  const renderPlotSizeDropdown = (name, sizes, unit) => (
    <>
      <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Plot Size ({unit})</label>
      <select
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="field"
      >
        <option value="">Select Plot Size</option>
        {sizes.map((p) => (
          <option key={p} value={p}>
            {p} {unit}
          </option>
        ))}
        <option value="Custom">Custom</option>
      </select>
      {formData[name] === "Custom" && (
        <input
          type="text"
          name={`custom${name.charAt(0).toUpperCase() + name.slice(1)}`}
          value={formData[`custom${name.charAt(0).toUpperCase() + name.slice(1)}`]}
          onChange={handleChange}
          className="field mt-2"
          placeholder={`Enter custom plot size in ${unit}`}
        />
      )}
    </>
  );

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
      <div>
        <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Preferred Sector</label>
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

      {/* Authority (Skipped for Flats) / Builder Name (Only for Flats) */}
      {activeTab !== "flats" ? (
        // Authority for Villa, Shop, Factory, Warehouse, Other
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
      ) : (
        // Builder Name for Flats
        <div>
          <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Builder Name</label>
          <select
            name="builder_name"
            value={formData.builder_name}
            onChange={handleChange}
            className="field"
          >
            <option value="">Select Builder</option>
            {builderOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
            <option value="Custom">Custom</option>
          </select>
          {formData.builder_name === "Custom" && (
            <input
              type="text"
              name="customBuilderName"
              value={formData.customBuilderName}
              onChange={handleChange}
              className="field mt-2"
              placeholder="Enter custom builder name"
            />
          )}
        </div>
      )}

      {/* Facilities (Now Checkboxes, including Kitchen and Washroom) */}
      <div className="sm:col-span-2">
        <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Facilities Required (Select all that apply)</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 border border-line rounded-sm p-4 text-sm text-ink">
          {facilityOptions.map((f) => (
            <label key={f} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="facilities"
                value={f}
                checked={formData.facilities.includes(f)}
                onChange={handleChange}
                className="h-4 w-4 rounded-sm"
              />
              <span>{f}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Budget</label>
        <input
          type="text"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="field"
        />
      </div>

      {/* Any Other Choice */}
      <div className="sm:col-span-2">
        <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Additional Information if any</label>
        <textarea
          name="anything_else"
          value={formData.anything_else}
          onChange={handleChange}
          rows="3"
          className="field"
        />
      </div>
    </>
  );

  const renderPetFriendlyField = () => (
    <div>
      {/* <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Pet Friendly?</label> */}
      {/* <select
        name="pet_friendly"
        value={formData.pet_friendly}
        onChange={handleChange}
        className="field"
      >
        <option value="">Select Option</option>
        {yesNoOptions.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select> */}
    </div>
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
              {tabs.find((t) => t.id === activeTab)?.label} — Required on Rent
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              {/* Common fields for all tabs */}
              {renderCommonFields()}

              {/* Additional Villa Fields */}
              {activeTab === "villa" && (
                <>
                  {/* Plot Size (m²) */}
                  <div>
                    {renderPlotSizeDropdown("plot_size", villaPlotSizes, "m²")}
                  </div>

                  {renderPetFriendlyField()} {/* <--- PET FRIENDLY HERE */}

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
                        placeholder="Enter custom flat size in sq. ft."
                      />
                    )}
                  </div>

                  {renderPetFriendlyField()} {/* <--- PET FRIENDLY HERE */}

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
                </>
              )}

              {/* Additional Shop Fields */}
              {activeTab === "shop" && (
                <>
                  {/* Plot Size (sq. ft.) */}
                  <div>
                    {renderPlotSizeDropdown("plot_size", shopPlotSizes, "sq. ft.")}
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Kitchen Available?</label>
                    <select
                      name="kitchen_available"
                      value={formData.kitchen_available}
                      onChange={handleChange}
                      className="field"
                    >
                      <option value="">Select Option</option>
                      {yesNoOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Washroom Available?</label>
                    <select
                      name="washroom_available"
                      value={formData.washroom_available}
                      onChange={handleChange}
                      className="field"
                    >
                      <option value="">Select Option</option>
                      {yesNoOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {/* Additional Factory Fields */}
              {activeTab === "factory" && (
                <>
                  {/* Plot Size (m²) */}
                  <div>
                    {renderPlotSizeDropdown("plot_size", factoryWarehousePlotSizes, "m²")}
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Purpose</label>
                    <select
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleChange}
                      className="field"
                    >
                      <option value="">Select Purpose</option>
                      {factoryPurposeOptions.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {/* Additional Warehouse Fields */}
              {activeTab === "warehouse" && (
                <>
                  {/* Plot Size (m²) */}
                  <div>
                    {renderPlotSizeDropdown("plot_size", factoryWarehousePlotSizes, "m²")}
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium tracking-[0.04em] text-muted mb-2">Purpose</label>
                    <select
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleChange}
                      className="field"
                    >
                      <option value="">Select Purpose</option>
                      {warehousePurposeOptions.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {/* Additional Other Fields (Only Plot Size) */}
              {activeTab === "other" && (
                <>
                  {/* Plot Size (m²) - Assuming 'other' defaults to m² */}
                  <div>
                    {renderPlotSizeDropdown("plot_size", factoryWarehousePlotSizes, "m²")}
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

