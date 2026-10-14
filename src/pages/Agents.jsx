import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";
import { motion } from "framer-motion";
import agent1 from "../assets/ag1.jpg";
import agent2 from "../assets/ag2.jpg";
import agent3 from "../assets/ag3.jpg";
import agent4 from "../assets/ag1.jpg";

const agents = [
  {
    name: "Sonia Gulistani",
    role: "Associate Director",
    img: agent1,
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    twitter: "https://twitter.com/",
    linkedin: "https://linkedin.com/",
    phone: "+919876543210",
    whatsapp: "https://wa.me/919876543210",
  },
  {
    name: "Adilet Chynystanov",
    role: "Associate Director",
    img: agent2,
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    twitter: "https://twitter.com/",
    linkedin: "https://linkedin.com/",
    phone: "+919123456789",
    whatsapp: "https://wa.me/919123456789",
  },
  {
    name: "Anjal Singhvi",
    role: "Associate Director",
    img: agent3,
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    twitter: "https://twitter.com/",
    linkedin: "https://linkedin.com/",
    phone: "+918765432109",
    whatsapp: "https://wa.me/918765432109",
  },
  {
    name: "Taghrid Ibrahim",
    role: "Sales Advisor",
    img: agent4,
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    twitter: "https://twitter.com/",
    linkedin: "https://linkedin.com/",
    phone: "+919876543211",
    whatsapp: "https://wa.me/919876543211",
  },
];

export default function Agents() {
  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-brand-paperDeep">
      <div className="container mx-auto px-6 lg:px-20 text-center">
        <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3">
          Our People
        </p>
        <h2 className="font-display text-3xl lg:text-4xl font-medium mb-6 text-brand-ink">
          Meet Our Top{" "}
          <span className="italic text-brand-maroon">
            Real Estate Agents
          </span>
        </h2>

        <p className="max-w-2xl mx-auto text-muted mb-16">
          Our expert team is here to guide you in finding your dream property and
          ensuring a smooth buying or selling experience.
        </p>

        {/* Agents Grid */}
        <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
          {agents.map((agent, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative bg-white rounded-md ring-1 ring-brand-ink/[0.06] overflow-hidden hover:ring-brand-ink/0 hover:shadow-md transition duration-500"
            >
              {/* Agent Image */}
              <div className="relative">
                <img
                  src={agent.img}
                  alt={agent.name}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="w-full h-[300px] object-cover transform group-hover:scale-105 transition duration-500"
                />
                {/* Overlay Social Icons */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-4 text-white text-xl opacity-0 group-hover:opacity-100 transition duration-500">
                  <a href={agent.facebook} target="_blank" rel="noopener noreferrer">
                    <FaFacebookF className="hover:text-brand-goldSoft cursor-pointer" />
                  </a>
                  <a href={agent.instagram} target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="hover:text-ink cursor-pointer" />
                  </a>
                  <a href={agent.twitter} target="_blank" rel="noopener noreferrer">
                    <FaTwitter className="hover:text-brand-goldSoft cursor-pointer" />
                  </a>
                  <a href={agent.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedinIn className="hover:text-brand-goldSoft cursor-pointer" />
                  </a>
                  <a href={`tel:${agent.phone}`}>
                    <FaPhone className="hover:text-ink cursor-pointer" />
                  </a>
                  <a href={agent.whatsapp} target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className="hover:text-ink cursor-pointer" />
                  </a>
                </div>
              </div>

              {/* Agent Info */}
              <div className="p-6 text-center">
                <h3 className="font-semibold text-lg text-ink">
                  {agent.name}
                </h3>
                <p className="text-muted text-sm">{agent.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
