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
    <section className="w-full bg-paper section">
      <div className="container-site">

        {/* Heading + filters */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 md:mb-16">
          <div>
            <p className="eyebrow mb-5">Our Portfolio</p>
            <h2 className="display-lg text-ink max-w-2xl">
              Premium Luxury <span className="italic">Developments</span>
            </h2>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter developments">
            {["All", "Plots", "Flats", "Commercials", "Villas"].map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                aria-pressed={activeType === type}
                className={`chip ${activeType === type ? "chip-active" : ""}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Property Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-14">
          {filteredProperties.length === 0 && (
            <p className="col-span-full border-t border-line pt-8 text-muted">
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
