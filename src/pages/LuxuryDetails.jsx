// src/pages/LuxuryDetails.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function LuxuryDetails() {
  const { id } = useParams(); // property id from URL
  const [property, setProperty] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  // Backend URL from .env
  const BASE_URL = import.meta.env.VITE_API_URL;

  // Fetch property details
  const fetchProperty = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/properties/${id}`);
      setProperty(res.data);
    } catch (err) {
      console.error("Failed to fetch property:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch gallery
  const fetchGallery = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/gallery/${id}`);
      setGallery(res.data);
    } catch (err) {
      console.error("Failed to fetch gallery:", err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProperty();
      fetchGallery();
    }
  }, [id]);

  if (loading) {
    return <p className="text-center py-16 text-muted">Loading...</p>;
  }

  if (!property) {
    return (
      <p className="text-center py-16 text-red-500">Property not found.</p>
    );
  }

  // Fix image path (if /uploads missing)
  const imageUrl = property.image?.startsWith("/uploads")
    ? `${BASE_URL}${property.image}`
    : `${BASE_URL}/uploads/${property.image}`;

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <div className="relative w-full h-[500px] md:h-[600px]">
        <img
          src={imageUrl}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="font-display text-4xl md:text-6xl font-medium mb-4">
            {property.title}
          </h1>
          <p className="text-lg md:text-2xl max-w-3xl leading-relaxed opacity-90">
            📍 {property.location} | 💰 {property.price}
          </p>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="max-w-7xl mx-auto py-16 px-6 space-y-16">
        <h2 className="font-display text-3xl md:text-4xl font-medium text-center text-ink mb-10">
          Property Gallery
        </h2>

        {gallery.length > 0 ? (
          gallery.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col md:flex-row items-center gap-10 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2 overflow-hidden rounded-sm">
                <img
                  src={`${BASE_URL}${item.image}`}
                  alt={item.title}
                  className="w-full h-80 object-cover transform transition duration-700 hover:scale-110"
                />
              </div>

              {/* Text */}
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="font-display text-2xl font-medium text-ink">
                  {item.title}
                </h3>
                <p className="text-muted text-lg leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">
            No gallery images available.
          </p>
        )}
      </div>
    </div>
  );
}
