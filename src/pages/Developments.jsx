import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import PropertyCard from "../components/PropertyCard";

export default function Developments() {
  const [properties, setProperties] = useState([]);
  const [activeType, setActiveType] = useState("All"); // Default = All

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/properties`);
        const dataArray = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.data)
          ? res.data.data
          : [];
        setProperties(dataArray);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
        setProperties([]);
      }
    };
    fetchProperties();
  }, [API_URL]);

  // Updated Filter Logic
  const filteredProperties =
    activeType === "All"
      ? properties
      : properties.filter((p) => p.type === activeType);

  return (
    <section className="w-full bg-brand-paper py-16 sm:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3">
            Our Portfolio
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-brand-ink">
            Premium Luxury Developments
          </h2>
          <div className="w-14 h-px bg-brand-gold mx-auto mt-5"></div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center md:justify-end gap-3 sm:gap-4 mb-10 md:mb-12 tracking-wide">
          {["All", "Plots", "Flats", "Commercials", "Villas"].map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`border px-5 sm:px-7 py-2 rounded-sm text-sm sm:text-base font-medium transition-all duration-300 ${
                activeType === type
                  ? "bg-brand-maroon border-brand-maroon text-white shadow-md"
                  : "bg-white border-brand-ink/15 text-brand-ink hover:border-brand-maroon hover:text-brand-maroon"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Property Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProperties.length === 0 && (
            <p className="text-center col-span-full text-gray-500">
              No properties found.
            </p>
          )}

          {filteredProperties.map((property, index) => {
            const imageUrl = property.image?.startsWith("/uploads")
              ? `${API_URL}${property.image}`
              : `${API_URL}/uploads/${property.image}`;

            return (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.12 }}
              >
                <PropertyCard
                  image={imageUrl}
                  title={property.title}
                  price={property.price}
                  location={property.location}
                  tag={property.type}
                  href={`/LuxuryDetails/${property.id}`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
