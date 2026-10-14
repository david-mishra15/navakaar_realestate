// src/components/OurTeam.jsx
import React from "react";
import teamBg from "../assets/ourTeam.jpg";

// Team members data (no photos provided — cards show an initials avatar)
const teamMembers = [
  { name: "SS MAJITHIA" },
  { name: "Rajendra Singh" },
];

// "Rajendra Singh" -> "RS"
const getInitials = (name) => {
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
};

export default function OurTeam() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div
        className="relative h-[70vh] md:h-[80vh] w-full bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${teamBg})` }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <h1 className="font-display relative text-white text-4xl md:text-5xl lg:text-6xl font-semibold z-10 tracking-wide drop-shadow-lg">
          Our Team
        </h1>
      </div>

      {/* Intro Section */}
      <section className="py-12 px-4 md:px-16 bg-white text-center">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 text-brand-ink">
          When property matters , Trust Navkaar
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed text-base sm:text-lg">
          Navkaar a brand who is specially working in yamuna expressway
          properties
        </p>
      </section>

      {/* Management Section */}
      <section className="py-16 px-4 md:px-16 bg-gray-50">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold mb-12 text-center text-brand-ink">
          Meet Our Management
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 max-w-3xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
            >
              {/* Initials avatar */}
              <div
                role="img"
                aria-label={member.name}
                className="relative w-full h-[300px] md:h-[340px] overflow-hidden bg-brand-paperDeep flex items-center justify-center"
              >
                <span className="font-display text-6xl md:text-7xl font-semibold text-brand-maroon tracking-wide transition-transform duration-700 group-hover:scale-110">
                  {getInitials(member.name)}
                </span>
              </div>

              {/* Info */}
              <div className="p-6 text-center">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {member.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
