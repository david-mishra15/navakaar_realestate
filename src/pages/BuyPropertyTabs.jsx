import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaIndustry, FaHome, FaBuilding, FaStore } from "react-icons/fa";

export default function BuyPropertyCards() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "industrial"
  );
  const [industrialData, setIndustrialData] = useState([]);
  const [residentialData, setResidentialData] = useState([]);
  const [flatsData, setFlatsData] = useState([]);
  const [commercialData, setCommercialData] = useState([]);
  const [villasData, setVillasData] = useState([]);

  // Filters with localStorage persistence
  const [sectorFilter, setSectorFilter] = useState(
    localStorage.getItem("sectorFilter") || ""
  );
  const [authorityFilter, setAuthorityFilter] = useState(
    localStorage.getItem("authorityFilter") || ""
  );
  const [sizeFilter, setSizeFilter] = useState(
    localStorage.getItem("sizeFilter") || ""
  );
  const [budgetFilter, setBudgetFilter] = useState(
    localStorage.getItem("budgetFilter") || ""
  );

  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);
  useEffect(() => {
    localStorage.setItem("sectorFilter", sectorFilter);
  }, [sectorFilter]);
  useEffect(() => {
    localStorage.setItem("authorityFilter", authorityFilter);
  }, [authorityFilter]);
  useEffect(() => {
    localStorage.setItem("sizeFilter", sizeFilter);
  }, [sizeFilter]);
  useEffect(() => {
    localStorage.setItem("budgetFilter", budgetFilter);
  }, [budgetFilter]);

  const getNumericPrice = (price) => {
    if (!price) return null;
    let p = price.toString().trim().toLowerCase();
    if (p.includes("contact") || p.includes("ask")) return null;
    if (p.includes("crore")) return parseFloat(p.replace(/[^0-9.]/g, "")) * 10000000;
    if (p.includes("lakh")) return parseFloat(p.replace(/[^0-9.]/g, "")) * 100000;
    return parseFloat(p.replace(/[^0-9.]/g, ""));
  };

  const tabs = [
    { id: "industrial", label: "Industrial", icon: <FaIndustry size={18} /> },
    { id: "residential", label: "Residential", icon: <FaHome size={18} /> },
    { id: "flats", label: "Flats", icon: <FaBuilding size={18} /> },
    { id: "commercial", label: "Commercial", icon: <FaStore size={18} /> },
    { id: "villas", label: "Villas", icon: <FaHome size={18} /> },
  ];

  const tabClass = (tab) =>
    `flex flex-col items-center justify-center gap-1 p-2 rounded-lg cursor-pointer transition-all duration-300 border ${
      activeTab === tab
        ? "bg-[#9A0000] text-white shadow-md scale-105"
        : "bg-white text-black hover:bg-[#9A0000]/60 hover:text-white shadow-md"
    }`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let res;
        switch (activeTab) {
          case "industrial":
            res = await axios.get(`${API_URL}/api/industrial`);
            setIndustrialData(Array.isArray(res.data) ? res.data : []);
            break;
          case "residential":
            res = await axios.get(`${API_URL}/api/residential`);
            setResidentialData(Array.isArray(res.data) ? res.data : []);
            break;
          case "flats":
            res = await axios.get(`${API_URL}/api/flats`);
            setFlatsData(Array.isArray(res.data) ? res.data : []);
            break;
          case "commercial":
            res = await axios.get(`${API_URL}/api/commercial`);
            setCommercialData(Array.isArray(res.data) ? res.data : []);
            break;
          case "villas":
            res = await axios.get(`${API_URL}/api/sell/villas`);
            setVillasData(Array.isArray(res.data) ? res.data : []);
            break;
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab, API_URL]);

  const currentData =
    activeTab === "industrial"
      ? industrialData
      : activeTab === "residential"
      ? residentialData
      : activeTab === "flats"
      ? flatsData
      : activeTab === "commercial"
      ? commercialData
      : villasData;

  const getPlotSize = (item) =>
    item.plot_size || item.size || item.plot_size_sqft || item.area || item.flat_size || null;

  const getPlotNo = (item) =>
    item.plot_no || item.flat || item.plot || item.plot_number || item.flat_no || null;

  const authorityOptions = ["Noida Authority", "Greater Noida Authority", "Yamuna Authority"];
  const sectorOptions = Array.from({ length: 200 }, (_, i) => `Sector ${i + 1}`);
  const sizeOptions = [...new Set(currentData.map((i) => getPlotSize(i)).filter(Boolean))];
  const budgetOptions = [
    { label: "Under 50 Lakh", value: "5000000" },
    { label: "51 Lakh to 1.50 Crore", value: "15000000" },
    { label: "1.51 Crore to 5 Crore", value: "50000000" },
    { label: "Above 5 Crore", value: "999999999999" },
  ];

  // ⭐ Fixed filter: use correct keys for industrial/residential etc.
  const filteredData = currentData.filter((item) => {
    const sector = item.sector || item.sector_name || "";
    const authority = item.govt_authority || item.authority || item.builder_name || "";

    const matchesSector = !sectorFilter || sector.toString() === sectorFilter;
    const matchesAuthority = !authorityFilter || authority === authorityFilter;

    const matchesSize = !sizeFilter || (getPlotSize(item) && getPlotSize(item).toString() === sizeFilter);

    const numericPrice = getNumericPrice(item.price || item.expected_price);
    let matchesBudget = true;
    if (budgetFilter && numericPrice !== null) {
      const budget = Number(budgetFilter);
      if (budget === 5000000) matchesBudget = numericPrice <= 5000000;
      else if (budget === 15000000) matchesBudget = numericPrice > 5000000 && numericPrice <= 15000000;
      else if (budget === 50000000) matchesBudget = numericPrice > 15000000 && numericPrice <= 50000000;
      else if (budget === 999999999999) matchesBudget = numericPrice > 50000000;
    }

    return matchesSector && matchesAuthority && matchesSize && matchesBudget;
  });

  return (
    <div className="max-w-7xl mx-auto mt-12 flex flex-col lg:flex-row gap-6 pt-20 px-4">
      <div className="w-full lg:w-60 flex flex-col bg-gray-50 p-5 rounded-2xl shadow-lg lg:sticky lg:top-24 h-fit">
        <div className="grid grid-cols-4 gap-2 lg:grid-cols-1 mb-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={tabClass(t.id)}
            >
              {t.icon}
              <span className="text-xs font-medium">{t.label}</span>
            </button>
          ))}
        </div>

        <select
          value={authorityFilter}
          onChange={(e) => setAuthorityFilter(e.target.value)}
          className="mb-3 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#CA8B06]"
        >
          <option value="">Filter by Authority</option>
          {authorityOptions.map((auth) => (
            <option key={auth} value={auth}>{auth}</option>
          ))}
        </select>

        <select
          value={sectorFilter}
          onChange={(e) => setSectorFilter(e.target.value)}
          className="mb-3 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#CA8B06]"
        >
          <option value="">Filter by Sector</option>
          {sectorOptions.map((sector) => (
            <option key={sector} value={sector}>{sector}</option>
          ))}
        </select>

        <select
          value={sizeFilter}
          onChange={(e) => setSizeFilter(e.target.value)}
          className="mb-3 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#CA8B06]"
        >
          <option value="">Filter by Property Size</option>
          {sizeOptions.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>

        <select
          value={budgetFilter}
          onChange={(e) => setBudgetFilter(e.target.value)}
          className="mb-3 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#CA8B06]"
        >
          <option value="">Filter by Budget</option>
          {budgetOptions.map((b) => (
            <option key={b.value} value={b.value}>{b.label}</option>
          ))}
        </select>

        <button
          onClick={() => {
            setSectorFilter("");
            setAuthorityFilter("");
            setSizeFilter("");
            setBudgetFilter("");
          }}
          className="text-sm text-[#9A0000] hover:underline"
        >
          Clear All Filters
        </button>
      </div>

      <div className="flex-1 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading ? (
          <div className="col-span-full text-center py-16 text-gray-500 text-xl">
            Loading Properties...
          </div>
        ) : filteredData.length === 0 ? (
          <div className="col-span-full text-center py-16 text-gray-500 text-xl">
            No properties found matching your filters.
          </div>
        ) : (
          <AnimatePresence>
            {filteredData.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative group overflow-hidden">
                  <img
                    src={
                      item.images?.[0]
                        ? item.images[0].startsWith("http")
                          ? item.images[0]
                          : `${API_URL}/uploads/${item.images[0]}`
                        : item.image?.startsWith("http")
                        ? item.image
                        : `${API_URL}/uploads/${item.image}`
                    }
                    alt={item.sector || "Property"}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 bg-[#CA8B06] text-white px-3 py-1 rounded-full text-xs font-bold">
                    {item.govt_authority || item.authority || item.builder_name || "Authority"}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-lg text-[#2A2513]">
                    {item.sector} {getPlotNo(item) ? `• ${getPlotNo(item)}` : ""}
                  </h3>
                  <p className="text-gray-600">
                    Size: <span className="font-semibold">{getPlotSize(item) || "N/A"}</span>
                  </p>
                  {item.price && (
                    <p className="text-2xl font-bold text-[#CA8B06]">₹ {item.price}</p>
                  )}
                </div>

                <button
                  onClick={() =>
                    navigate(
                      activeTab === "residential"
                        ? `/property-residential-details/${item.id}`
                        : activeTab === "flats"
                        ? `/property-flats-details/${item.id}`
                        : activeTab === "commercial"
                        ? `/commercial-details/${item.id}`
                        : activeTab === "villas"
                        ? `/moredetailsvilla/${item.id}`
                        : `/property-details/${item.id}`
                    )
                  }
                  className="w-full bg-[#CA8B06] hover:bg-[#9A0000] text-white font-bold py-4 text-center transition-all duration-300"
                >
                  Contact Agent
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
