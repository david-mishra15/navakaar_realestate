import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const RentVillaDetails = () => {
  const { id } = useParams();
  const [villa, setVilla] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch villa details
  useEffect(() => {
    const fetchVilla = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/villas`);
        const selectedVilla = res.data.data.find(
          (v) => String(v.id) === String(id)
        );
        setVilla(selectedVilla || null);
      } catch (err) {
        console.error("API fetch error:", err);
        setVilla(null);
      }
    };
    fetchVilla();
  }, [id]);

  // ✅ Fetch villa images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${API_URL}/api/villa-images?villa_id=${id}`
        );
        setImages(res.data.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch villa images:", err);
        setError("Failed to fetch villa images.");
        setLoading(false);
      }
    };
    fetchImages();
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

  const bannerImage = villa.thumbnail?.startsWith("http")
    ? villa.thumbnail
    : `${API_URL}${villa.thumbnail}`;

  return (
    <div className="w-full bg-gray-50">
      {/* ✅ Hero / Banner */}
      <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[650px]">
        <img
          src={bannerImage}
          alt={villa.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/50 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
            {villa.title}
          </h1>
          <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl mt-2">
            {villa.location}
          </p>
        </div>
      </div>

      {/* ✅ Back Button */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <Link
          to="/rent-villa"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          ← Back to all apartments
        </Link>
      </div>

      {/* ✅ Gallery Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold mb-10 text-gray-800 text-center">
          Villa Gallery
        </h3>

        {loading && <p className="text-gray-600 mb-4">Loading images...</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {images.length === 0 ? (
          <p className="text-gray-600 text-center">
            No images available for this villa.
          </p>
        ) : (
          <div className="space-y-10">
            {images.map((img, index) => (
              <div
                key={img.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
              >
                <div
                  className={`flex flex-col md:flex-row ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image */}
                  <div className="md:w-1/2 w-full">
                    <img
                      src={
                        img.img_url?.startsWith("http")
                          ? img.img_url
                          : `${API_URL}${img.img_url}`
                      }
                      alt={img.description || villa.title}
                      className="w-full h-80 md:h-full object-cover"
                    />
                  </div>

                  {/* Text */}
                  <div className="md:w-1/2 w-full flex flex-col justify-center p-6">
                    <h4 className="text-2xl font-semibold text-gray-900 mb-4">
                      {villa.title}
                    </h4>
                    <p className="text-gray-700 text-base leading-relaxed">
                      {img.description || "No description available."}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RentVillaDetails;
