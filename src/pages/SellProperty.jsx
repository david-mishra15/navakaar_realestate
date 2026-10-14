import React from "react";
import {
  FaUsers,
  FaHandshake,
  FaLightbulb,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Save from "../assets/savelarg.jpeg";

const SellProperty = () => {
  return (
    <div className="font-sans text-ink">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <img
          src={Save}
          alt="Selling a Property"
          className="w-full h-100 md:h-[32rem] object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide">
            Selling A Property
          </h1>
          <p className="mt-4 max-w-2xl text-gray-200 text-sm md:text-base">
            Looking to sell your property? Our expert team ensures maximum
            exposure and the best market value. From valuation to closing, we
            handle the process with transparency.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-6xl mx-auto px-6 py-12 text-center">
        <p className="text-ink/80 text-base md:text-lg">
          NAVKAAR is an award-winning real estate brokerage agency offering a
          wide variety of residential properties — apartments, penthouses,
          townhouses, villas, and mansions, among many others.
        </p>
      </section>

      {/* Our Features */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center mb-12">
        <div className="bg-white shadow-md p-6 rounded-sm hover:shadow-md transition">
          <FaUsers className="text-ink text-3xl mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Our Network</h3>
          <p className="text-sm text-muted">
            With 50+ agents, NAVKAAR has a unique global network, ensuring fast
            property sales by connecting you to potential buyers.
          </p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-sm hover:shadow-md transition">
          <FaHandshake className="text-ink text-3xl mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Our Services</h3>
          <p className="text-sm text-muted">
            Comprehensive selling assistance with valuation, consultation, and
            documentation to ensure a smooth transaction.
          </p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-sm hover:shadow-md transition">
          <FaLightbulb className="text-ink text-3xl mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Our Expertise</h3>
          <p className="text-sm text-muted">
            Our agents bring years of experience in handling property sales,
            negotiations, and closing deals with confidence.
          </p>
        </div>
      </section>

      {/* Marketing Way */}
      <section className="bg-stone py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-medium text-center mb-8">
            The NAVKAAR Way of Marketing a Property
          </h2>
          <ul className="grid md:grid-cols-2 gap-6 text-ink/80 text-sm md:text-base">
            <li>
              ✅ In-depth discussions with expert advisors for accurate property
              pricing.
            </li>
            <li>
              ✅ Aggressive marketing on social media platforms like Facebook,
              Instagram, LinkedIn, YouTube & more.
            </li>
            <li>
              ✅ Multiple open houses & leveraging agent networks to maximize
              visibility.
            </li>
            <li>
              ✅ Transparent communication with sellers to keep them updated.
            </li>
          </ul>
          <div className="text-center mt-8">
            <button className="px-6 py-2 bg-ink text-white rounded-sm shadow hover:bg-graphite transition">
              Explore All Areas
            </button>
          </div>
        </div>
      </section>

      {/* User Guide */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-medium text-center mb-10">
            A User’s Guide to Selling Real Estate
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Find A Real Estate Agent You Trust",
                text: "Work with a licensed NAVKAAR agent who understands the local market and has a strong track record.",
              },
              {
                title: "Market Your Property Effectively",
                text: "We use digital platforms, targeted ads, and social channels to maximize your property’s visibility.",
              },
              {
                title: "Conduct Viewings",
                text: "Our team arranges professional property viewings, ensuring buyers see the best features of your home.",
              },
              {
                title: "Sales Offers, Negotiations & Contract Signing",
                text: "We handle negotiations and contracts with transparency, ensuring smooth transactions.",
              },
              {
                title: "Sales Progression",
                text: "Regular updates and assistance with paperwork to keep the selling process stress-free.",
              },
              {
                title: "Transfer Of The Property",
                text: "From valuation to handover, NAVKAAR ensures complete assistance in the property transfer process.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 shadow-md rounded-sm hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
                <p className="text-sm text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm">
              <li>Buy a Property</li>
              <li>Sell a Property</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>About NAVKAAR</li>
              <li>Contact Us</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-sm">
              Office 104, 105 & 106 Bay Square, Building 2
            </p>
            <p className="text-sm">Business Bay, Dubai, UAE</p>
            <p className="text-sm">Email: info@navkaar.com</p>
            <p className="text-sm">Phone: +971 54 581 6583</p>
            {/* Social Icons */}
            <div className="flex gap-4 mt-4 text-ink">
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-muted">
          © {new Date().getFullYear()} NAVKAAR – A Real Estate Co.
        </div>
      </footer>
    </div>
  );
};

export default SellProperty;
