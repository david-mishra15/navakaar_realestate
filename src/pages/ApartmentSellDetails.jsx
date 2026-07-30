import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5002";

const ApartmentSellDetails = () => {
  const { id } = useParams();
  const [apartment, setApartment] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApartmentData = async () => {
      try {
        setLoading(true);

        // Apartment Details
        const res = await fetch(`${API_URL}/api/apartments-for-sale/${id}`);
        if (!res.ok) throw new Error("Apartment not found");
        const data = await res.json();
        setApartment(data.data || data);

        // Apartment Gallery
        const galleryRes = await fetch(
          `${API_URL}/api/appartmentsellgallery/${id}`
        );
        if (!galleryRes.ok) throw new Error("Gallery not found");
        const galleryData = await galleryRes.json();
        setGallery(galleryData.data || galleryData);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchApartmentData();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading apartment details...</p>
      </div>
    );
  }

  if (error || !apartment) {
    return (
      <div className="w-full h-screen flex items-center justify-center px-4">
        <p className="text-red-500 text-lg text-center">
          {error || "Apartment not found"}
        </p>
      </div>
    );
  }

  const imageUrl = apartment.thumbnail?.startsWith("http")
    ? apartment.thumbnail
    : `${API_URL}${apartment.thumbnail}`;

  return (
    <div className="w-full bg-gray-50">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
        <img
          src={imageUrl}
          alt={apartment.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg">
            {apartment.title}
          </h1>
          <p className="text-white text-lg md:text-2xl mt-2">
            {apartment.location}
          </p>
          <p className="text-white text-md md:text-lg mt-1">
            {apartment.price}
          </p>
        </div>
      </div>

      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Link
          to="/apartmentSell"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          ← Back to all apartments
        </Link>
      </div>

      {/* Gallery / Details Section */}
      {gallery.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
          {gallery.map((item, index) => (
            <div
              key={item.id}
              className={`grid grid-cols-1 md:grid-cols-2 gap-6 items-center ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {item.image && (
                <div className="w-full h-[80vh] md:h-[500px] lg:h-[600px]">
                  <img
                    src={
                      item.image.startsWith("http")
                        ? item.image
                        : `${API_URL}${item.image}`
                    }
                    alt={item.title}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
              )}
              {/* Left: Text */}
              <div className="flex flex-col justify-center">
                <h3 className="text-3xl font-bold mb-4 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-lg">{item.description}</p>
              </div>

              {/* Right: Image */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApartmentSellDetails;
