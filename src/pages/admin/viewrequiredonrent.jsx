import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ViewRequiredonrent() {
  const [activeTab, setActiveTab] = useState("villa");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const API_URL = import.meta.env.VITE_API_URL;

  const tabs = [
    { id: "villa", label: "Villas" },
    { id: "flats", label: "Flats" },
    { id: "shop", label: "Shops" },
    { id: "factory", label: "Factories" },
    { id: "warehouse", label: "Warehouses" },
    { id: "other", label: "Other Properties" },
  ];

  const routeMap = {
    villa: "/api/rent/villa",
    flats: "/api/rent/flats",
    shop: "/api/rent/shop",
    factory: "/api/rent/factory",
    warehouse: "/api/rent/warehouse",
    other: "/api/rent/other",
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}${routeMap[activeTab]}`);
      setData(res.data);
      setCurrentPage(1); // Reset page when tab changes
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-full mx-auto p-6 pt-20">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">
        Admin Dashboard — Rent Requests
      </h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
              activeTab === t.id
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Data Table */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <>
          <div className="relative border border-gray-300 rounded-lg shadow-sm overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse">
              <thead className="bg-blue-600 text-white sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Phone</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Sector</th>

                  {(activeTab === "villa" || activeTab === "flats") && (
                    <>
                      <th className="px-4 py-2 border">Flat Size</th>
                      <th className="px-4 py-2 border">Bedrooms</th>
                      <th className="px-4 py-2 border">Bathrooms</th>
                      <th className="px-4 py-2 border">Furnish</th>
                      <th className="px-4 py-2 border">Authority</th>
                      <th className="px-4 py-2 border">Facilities</th>
                      <th className="px-4 py-2 border">Budget</th>
                      <th className="px-4 py-2 border">Other Info</th>
                      <th className="px-4 py-2 border">Created At</th>
                    </>
                  )}

                  {(activeTab === "warehouse" ||
                    activeTab === "factory" ||
                    activeTab === "shop" ||
                    activeTab === "other") && (
                    <>
                      <th className="px-4 py-2 border">Plot Size</th>
                      <th className="px-4 py-2 border">Authority</th>
                      <th className="px-4 py-2 border">Facilities</th>
                      <th className="px-4 py-2 border">Budget</th>
                      <th className="px-4 py-2 border">Other Info</th>
                      <th className="px-4 py-2 border">Created At</th>
                    </>
                  )}
                </tr>
              </thead>

              <tbody>
                {currentData.length === 0 ? (
                  <tr>
                    <td
                      colSpan="12"
                      className="text-center py-4 text-gray-500 bg-gray-50"
                    >
                      No data available
                    </td>
                  </tr>
                ) : (
                  currentData.map((item, index) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-2 py-1 border text-center">
                        {indexOfFirstItem + index + 1}
                      </td>
                      <td className="px-2 py-1 border">{item.name}</td>
                      <td className="px-2 py-1 border">{item.phone}</td>
                      <td className="px-2 py-1 border">{item.email}</td>
                      <td className="px-2 py-1 border">{item.sector}</td>

                      {(activeTab === "villa" || activeTab === "flats") && (
                        <>
                          <td className="px-2 py-1 border">
                            {item.flat_size || "-"}
                          </td>
                          <td className="px-2 py-1 border">
                            {item.bedroom || "-"}
                          </td>
                          <td className="px-2 py-1 border">
                            {item.bathroom || "-"}
                          </td>
                          <td className="px-2 py-1 border">
                            {item.furnish || "-"}
                          </td>
                          <td className="px-2 py-1 border">{item.authority}</td>
                          <td className="px-2 py-1 border">
                            {item.facilities}
                          </td>
                          <td className="px-2 py-1 border">{item.budget}</td>
                          <td className="px-2 py-1 border">
                            {item.anything_else}
                          </td>
                          <td className="px-2 py-1 border">
                            {new Date(item.created_at).toLocaleString()}
                          </td>
                        </>
                      )}

                      {(activeTab === "warehouse" ||
                        activeTab === "factory" ||
                        activeTab === "shop" ||
                        activeTab === "other") && (
                        <>
                          <td className="px-2 py-1 border">
                            {item.plot_size}
                          </td>
                          <td className="px-2 py-1 border">{item.authority}</td>
                          <td className="px-2 py-1 border">
                            {item.facilities}
                          </td>
                          <td className="px-2 py-1 border">{item.budget}</td>
                          <td className="px-2 py-1 border">
                            {item.anything_else}
                          </td>
                          <td className="px-2 py-1 border">
                            {new Date(item.created_at).toLocaleString()}
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {data.length > itemsPerPage && (
            <div className="flex justify-center mt-4 gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded-md border transition-colors ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-blue-100"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
