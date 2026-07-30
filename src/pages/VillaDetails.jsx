import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5002";

const VillaDetails = () => {
  const { id } = useParams();
  const [villa, setVilla] = useState(null);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    // Fetch single villa
    const fetchVilla = async () => {
      try {
        const res = await fetch(`${API_URL}/api/villas-for-sale/${id}`);
        const data = await res.json();
        setVilla(data?.data || data);
      } catch (err) {
        console.error("Villa fetch error:", err);
      }
    };

    // Fetch villa extra details
    const fetchDetails = async () => {
      try {
        const res = await fetch(`${API_URL}/api/admin/villa-details/${id}`);
        const data = await res.json();
        setDetails(Array.isArray(data?.data) ? data.data : []);
      } catch (err) {
        console.error("Details fetch error:", err);
        setDetails([]);
      }
    };

    fetchVilla();
    fetchDetails();
  }, [id]);

  if (!villa) {
    return (
      <div className="w-full h-screen flex items-center justify-center px-4">
        <p className="text-gray-600 text-lg text-center">
          Villa details not found.
        </p>
      </div>
    );
  }

  const imageUrl = villa?.thumbnail?.startsWith("http")
    ? villa.thumbnail
    : `${API_URL}${villa.thumbnail}`;

  return (
    <div className="w-full bg-gray-50">
      {/* Hero Section */}
      <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[650px]">
        <img
          src={imageUrl}
          alt={villa.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
            {villa.title}
          </h1>
          <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl mt-2">
            {villa.location}
          </p>
        </div>
      </div>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to="/villa"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          ← Back to all villas
        </Link>
      </div>

      {/* Extra Details Section */}
      {details.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
          {details.map((d, i) => (
            <div
              key={d.id}
              className={`flex flex-col md:flex-row gap-8 items-center ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              {d.image && (
                <div className="md:w-1/2 w-full h-[80vh] md:h-[500px] lg:h-[600px]">
                  <img
                    src={`${API_URL}${d.image}`}
                    alt={d.heading}
                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                  />
                </div>
              )}

              {/* Text */}
              <div className="md:w-1/2 w-full flex flex-col justify-center p-6">
                <h3 className="text-3xl font-bold mb-4 text-gray-800">
                  {d.heading}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {d.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VillaDetails;
