// src/pages/DreamDetails.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function DreamDetails() {
  const { id } = useParams(); // URL se id fetch karenge
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Use environment variable from Vite
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/categories/${id}`);
        setCategory(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load category details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id, BASE_URL]);

  if (loading) return <p className="text-center py-20">Loading details...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
  if (!category)
    return <p className="text-center py-20 text-muted">No details found.</p>;

  return (
    <div className="bg-stone min-h-screen">
      {/* 🔹 Fullscreen Hero Section */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
        <img
          src={`${BASE_URL}/uploads/${category.image}`} // backend se image
          alt={category.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-center justify-center p-4 sm:p-6 md:p-10">
          <h1 className="font-display text-2xl sm:text-3xl md:text-5xl font-medium text-white max-w-2xl text-center">
            {category.title}
          </h1>
        </div>
      </div>

      {/* 🔹 Content Section */}
      <div className="px-4 sm:px-6 md:px-12 py-8 md:py-12">
        <div className="bg-white p-4 sm:p-6 md:p-10 rounded-md shadow-sm">
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-ink mb-4">
            {category.title}
          </h2>
          <p className="text-ink/80 text-sm sm:text-base leading-relaxed mb-6">
            {category.description}
          </p>

          {/* 🔹 CTA Link */}
          <Link
            to="/contact-us"
            className="inline-block px-5 sm:px-6 py-2 bg-ink text-white font-medium rounded-sm hover:bg-graphite transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
