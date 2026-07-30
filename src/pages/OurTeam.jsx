// src/components/OurTeam.jsx
import React from "react";
import { Link } from "react-router-dom";
import teamBg from "../assets/ourTeam.jpg";

// Icons
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPhoneAlt,
} from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";

// Static images (replace with actual images if available)
import masroorImg from "../assets/men.jpg";
import farooqImg from "../assets/men.jpg";
import osmanImg from "../assets/men.jpg";
import abdullahImg from "../assets/men.jpg";

// Team members data
const teamMembers = [
  {
    name: "Masroor Syed",
    position: "Chairman",
    image: masroorImg,
    route: "/team/masroor",
    socials: {
      facebook: "#",
      instagram: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Farooq Syed",
    position: "Chief Executive Officer",
    image: farooqImg,
    route: "/team/farooq",
    socials: {
      facebook: "#",
      instagram: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Osman Syed",
    position: "Managing Director",
    image: osmanImg,
    route: "/team/osman",
    socials: {
      facebook: "#",
      instagram: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Abdullah Syed",
    position: "Managing Partner",
    image: abdullahImg,
    route: "/team/abdullah",
    socials: {
      facebook: "#",
      instagram: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
];

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
            >
              {/* Image with link */}
              <Link to={member.route}>
                <div className="relative w-full h-[300px] md:h-[340px] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
                </div>
              </Link>

              {/* Info */}
              <div className="p-6 text-center">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{member.position}</p>

                {/* Social Icons */}
                <div className="flex justify-center space-x-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <a
                    href={member.socials.facebook}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaFacebookF className="text-gray-600 hover:text-blue-600 text-lg" />
                  </a>
                  <a
                    href={member.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaInstagram className="text-gray-600 hover:text-pink-500 text-lg" />
                  </a>
                  <a
                    href={member.socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaTwitter className="text-gray-600 hover:text-blue-400 text-lg" />
                  </a>
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaLinkedinIn className="text-gray-600 hover:text-blue-700 text-lg" />
                  </a>
                  <Link to="/contact">
                    <BsWhatsapp className="text-gray-600 hover:text-green-500 text-lg" />
                  </Link>
                  <Link to="/contact">
                    <FaPhoneAlt className="text-gray-600 hover:text-blue-500 text-lg" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
