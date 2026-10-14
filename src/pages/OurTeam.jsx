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
      <header
        data-theme="dark"
        className="relative overflow-hidden bg-night h-[62vh] min-h-[440px] max-h-[640px]"
      >
        <img
          src={teamBg}
          alt=""
          className="img-mono absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-night/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/20 to-night/40" />
        <div className="relative h-full flex items-end">
          <div className="container-site pb-14 sm:pb-20">
            <p className="eyebrow !text-white/70 mb-6">About Navkaar</p>
            <h1 className="display-xl text-white">Our Team</h1>
          </div>
        </div>
      </header>

      {/* Intro Section */}
      <section className="bg-white border-b border-line">
        <div className="container-site section grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 lg:items-end">
          <h2 className="lg:col-span-7 display-lg text-ink">
            When property matters , <span className="italic">Trust Navkaar</span>
          </h2>
          <p className="lg:col-span-5 lead max-w-md">
            Navkaar a brand who is specially working in yamuna expressway
            properties
          </p>
        </div>
      </section>

      {/* Management Section */}
      <section className="bg-paper">
        <div className="container-site section grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-5">Leadership</p>
            <h2 className="display-lg text-ink">
              Meet Our <span className="italic">Management</span>
            </h2>
          </div>

          <ul className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {teamMembers.map((member, index) => (
              <li key={index} className="group">
                {/* Initials avatar */}
                <div
                  role="img"
                  aria-label={member.name}
                  className="relative aspect-[4/5] overflow-hidden rounded-sm border border-line bg-white flex items-center justify-center transition-colors duration-500 group-hover:bg-night group-hover:border-night"
                >
                  <span className="absolute top-5 left-5 text-[11px] tabular-nums tracking-[0.2em] text-subtle transition-colors duration-500 group-hover:text-mist">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display font-medium text-[88px] sm:text-[104px] leading-none tracking-[0.02em] text-ink transition-colors duration-500 group-hover:text-white">
                    {getInitials(member.name)}
                  </span>
                </div>

                {/* Info */}
                <div className="pt-5 pb-5 border-b border-ink/15">
                  <h3 className="font-display text-2xl sm:text-[28px] font-medium leading-tight text-ink">
                    {member.name}
                  </h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
