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
    `flex flex-col lg:flex-row items-center lg:justify-start gap-1.5 lg:gap-3 px-2 py-3 lg:px-0 lg:py-3.5 rounded-sm lg:rounded-none lg:border-0 lg:border-b border lg:border-line transition-colors duration-300 ${
      activeTab === tab
        ? "bg-ink text-white border-ink lg:bg-transparent lg:text-ink lg:font-medium"
        : "bg-white border-line text-muted hover:text-ink hover:border-ink lg:bg-transparent lg:hover:border-line"
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
    <div className="container-site pt-24 sm:pt-32 pb-16 sm:pb-24 flex flex-col lg:flex-row gap-8 lg:gap-12">
      <div className="w-full lg:w-64 shrink-0 flex flex-col lg:sticky lg:top-28 h-fit">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 lg:gap-0 lg:grid-cols-1 lg:border-t lg:border-ink mb-8">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={tabClass(t.id)}
            >
              {t.icon}
              <span className="text-xs lg:text-[15px]">{t.label}</span>
            </button>
          ))}
        </div>

        <select
          value={authorityFilter}
          onChange={(e) => setAuthorityFilter(e.target.value)}
          className="field mb-3"
        >
          <option value="">Filter by Authority</option>
          {authorityOptions.map((auth) => (
            <option key={auth} value={auth}>{auth}</option>
          ))}
        </select>

        <select
          value={sectorFilter}
          onChange={(e) => setSectorFilter(e.target.value)}
          className="field mb-3"
        >
          <option value="">Filter by Sector</option>
          {sectorOptions.map((sector) => (
            <option key={sector} value={sector}>{sector}</option>
          ))}
        </select>

        <select
          value={sizeFilter}
          onChange={(e) => setSizeFilter(e.target.value)}
          className="field mb-3"
        >
          <option value="">Filter by Property Size</option>
          {sizeOptions.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>

        <select
          value={budgetFilter}
          onChange={(e) => setBudgetFilter(e.target.value)}
          className="field mb-3"
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
          className="link-line self-start mt-3 text-ink"
        >
          Clear All Filters
        </button>
      </div>

      <div className="flex-1 min-w-0 grid gap-x-6 gap-y-10 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 content-start">
        {loading ? (
          <div className="col-span-full border-t border-line pt-10 text-muted text-lg">
            Loading Properties...
          </div>
        ) : filteredData.length === 0 ? (
          <div className="col-span-full border-t border-line pt-10 text-muted text-lg">
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
                className="group/card flex flex-col bg-white rounded-sm overflow-hidden border border-line hover:border-ink transition-colors duration-300"
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
                    className="w-full aspect-[4/3] object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms] ease-editorial"
                  />
                  <div className="absolute top-4 left-4 bg-paper text-ink px-3 py-1.5 rounded-full text-[10px] font-medium uppercase tracking-[0.14em]">
                    {item.govt_authority || item.authority || item.builder_name || "Authority"}
                  </div>
                </div>

                <div className="p-6 space-y-2 flex-1">
                  <h3 className="font-display font-medium text-2xl leading-tight text-ink">
                    {item.sector} {getPlotNo(item) ? `• ${getPlotNo(item)}` : ""}
                  </h3>
                  <p className="text-sm text-muted">
                    Size: <span className="text-ink">{getPlotSize(item) || "N/A"}</span>
                  </p>
                  {item.price && (
                    <p className="pt-3 text-lg font-medium text-ink tabular-nums">₹ {item.price}</p>
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
                  className="w-full flex items-center justify-between border-t border-line px-6 py-4 text-[12px] font-medium uppercase tracking-[0.16em] text-ink group-hover/card:bg-ink group-hover/card:text-white transition-colors duration-300"
                >
                  Contact Agent
                  <span aria-hidden="true">→</span>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
