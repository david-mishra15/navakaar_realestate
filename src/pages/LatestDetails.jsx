// src/components/LatestDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function LatestDetails() {
  const { id } = useParams(); // project id from URL
  const [project, setProject] = useState(null);
  const [gallery, setGallery] = useState([]);

  // Backend URL from .env
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch project details
  const fetchProject = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/latestprojects/${id}`);
      setProject(res.data);
    } catch (err) {
      console.error("Failed to fetch project:", err);
    }
  };

  // Fetch gallery images for this project
  const fetchGallery = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/latest-gallery/${id}`);
      setGallery(res.data);
    } catch (err) {
      console.error("Failed to fetch gallery:", err);
    }
  };

  useEffect(() => {
    fetchProject();
    fetchGallery();
  }, [id]);

  if (!project) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="font-sans">
      {/* ✅ Hero Section */}
      <div className="relative w-full h-[350px] sm:h-[550px] md:h-[550px] lg:h-[650px]">
        {/* Background Image */}
        <img
          src={`${API_URL}${project.image}`}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        {/* Centered Text */}
        <div className="relative z-10 flex items-center justify-center h-full text-center px-4 sm:px-6">
          <h1 className="text-2xl mt-[55px] sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
            {project.title}
          </h1>
        </div>
      </div>

      {/* ✅ Gallery Section */}
      {gallery.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20 space-y-10 sm:space-y-12 lg:space-y-16">
          {gallery.map((img, index) => (
            <div
              key={img.id}
              className={`flex flex-col md:flex-row items-center gap-6 sm:gap-8 lg:gap-12 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2 overflow-hidden rounded-xl shadow-lg">
                <img
                  src={`${API_URL}${img.image}`}
                  alt={img.title}
                  className="w-full h-60 sm:h-72 md:h-80 lg:h-96 object-cover transform transition duration-700 hover:scale-110"
                />
              </div>

              {/* Text */}
              <div className="w-full md:w-1/2 space-y-3 sm:space-y-4">
                <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                  {img.title}
                </h4>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  {img.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-10">
          No gallery images available.
        </p>
      )}
    </div>
  );
}
