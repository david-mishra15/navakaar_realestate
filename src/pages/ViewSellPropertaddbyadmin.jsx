import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaIndustry, FaHome, FaBuilding, FaStore } from "react-icons/fa";

export default function SellPropertyCards() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("industrial");
  const [industrialData, setIndustrialData] = useState([]);
  const [residentialData, setResidentialData] = useState([]);
  const [flatsData, setFlatsData] = useState([]);
  const [commercialData, setCommercialData] = useState([]);
  const [blockSearch, setBlockSearch] = useState("");
  const [search, setSearch] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const tabs = [
    { id: "industrial", label: "Industrial", icon: <FaIndustry size={18} /> },
    { id: "residential", label: "Residential", icon: <FaHome size={18} /> },
    { id: "flats", label: "Flats", icon: <FaBuilding size={18} /> },
    { id: "commercial", label: "Commercial", icon: <FaStore size={18} /> },
  ];

  const tabClass = (tab) =>
    `flex flex-col items-center justify-center gap-1 p-2 rounded-lg cursor-pointer transition-all duration-300 border ${
      activeTab === tab
        ? "bg-blue-600 text-white shadow-md scale-105"
        : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700"
    }`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [industrialRes, residentialRes, flatsRes, commercialRes] =
          await Promise.all([
            axios.get(`${API_URL}/api/admin/industrial`),
            axios.get(`${API_URL}/api/admin/residential`),
            axios.get(`${API_URL}/api/admin/sell-flats`),
            axios.get(`${API_URL}/api/admin/sell-commercial`),
          ]);

        setIndustrialData(Array.isArray(industrialRes.data) ? industrialRes.data : []);
        setResidentialData(Array.isArray(residentialRes.data) ? residentialRes.data : []);
        setFlatsData(Array.isArray(flatsRes.data) ? flatsRes.data : []);
        setCommercialData(Array.isArray(commercialRes.data) ? commercialRes.data : []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [API_URL]);

  const currentData =
    activeTab === "industrial"
      ? industrialData
      : activeTab === "residential"
      ? residentialData
      : activeTab === "flats"
      ? flatsData
      : commercialData;

  const filteredData = currentData.filter((item) => {
    const lowerBlock = blockSearch.toLowerCase();
    const lowerSearch = search.toLowerCase();

    const matchesBlock =
      !blockSearch ||
      (item.block_no && item.block_no.toLowerCase().includes(lowerBlock)) ||
      (item.plot_no && item.plot_no.toString().toLowerCase().includes(lowerBlock));

    const matchesSearch =
      !search ||
      (item.title && item.title.toLowerCase().includes(lowerSearch)) ||
      (item.sector && item.sector.toLowerCase().includes(lowerSearch)) ||
      (item.flat && item.flat.toLowerCase().includes(lowerSearch));

    return matchesBlock && matchesSearch;
  });

  const getMoreDetailsRoute = (itemId) => {
    switch (activeTab) {
      case "industrial":
        return `/property-industrial-details/${itemId}`;
      case "residential":
        return `/property-residentiallist-detailss/${itemId}`;
      case "flats":
        return `/property-flatslist-details/${itemId}`;
      case "commercial":
        return `/property-comrsial-details/${itemId}`;
      default:
        return `/property-details/${itemId}`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-12 flex flex-col lg:flex-row gap-6 pt-20 px-4">
      {/* Sidebar / Top Controls */}
      <div
        className="w-full lg:w-60 flex flex-col bg-gray-50 p-5 rounded-2xl shadow-lg 
                   h-fit lg:sticky lg:top-24 z-10"
      >
        <input
          type="text"
          placeholder="Search by Block/Plot..."
          className="mb-3 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition text-sm"
          value={blockSearch}
          onChange={(e) => setBlockSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by title, sector, flat..."
          className="mb-4 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Tabs */}
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-2 gap-2">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className={tabClass(t.id)}>
              {t.icon}
              <span className="text-xs font-medium">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Property Cards */}
      <div className="flex-1 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pb-10">
        <AnimatePresence>
          {filteredData.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300"
            >
              <div className="relative group overflow-hidden">
                <img
                  src={
                    item.image?.startsWith("http")
                      ? item.image
                      : `${API_URL}/uploads/${item.image}`
                  }
                  alt={item.title || `Plot ${item.plot_no || item.flat}`}
                  className="w-full h-52 sm:h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-2 sm:p-3 space-y-0.5 text-gray-700 text-sm">
                {item.title && <p className="font-semibold">{item.title}</p>}
                {item.flat && <p className="font-semibold">{item.flat}</p>}
                {item.block_no && (
                  <p className="font-medium text-gray-500">Block: {item.block_no}</p>
                )}
                {item.price && (
                  <p className="text-blue-600 font-bold text-base">₹ {item.price}</p>
                )}
                {item.sector && <p className="text-gray-500">{item.sector}</p>}
              </div>

              <button
                onClick={() => navigate(getMoreDetailsRoute(item.id))}
                className="m-2 sm:m-3 w-[calc(100%-0.75rem)] border border-gray-300 rounded-lg py-2 text-sm font-medium text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                More Details
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
