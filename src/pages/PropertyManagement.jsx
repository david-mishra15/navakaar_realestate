import React from "react";
import {
  FaUserTie,
  FaChartLine,
  FaGlobe,
  FaClock,
  FaBuilding,
  FaFileSignature,
  FaMoneyBillWave,
  FaHandsHelping,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const PropertyManagement = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <img
          src="https://tse1.mm.bing.net/th/id/OIP.txO0WO_d_b_WGXSzweqYpQHaCn?pid=Api&P=0&h=180"
          alt="Buying a Property"
          className="w-full h-100 md:h-[32rem] object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide">
            NAVKAAR
          </h1>
          <p className="text-lg md:text-2xl mt-2 font-light">
            A Real Estate Co.
          </p>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-gray-200">
            Explore a wide range of properties — from luxurious apartments to
            waterfront villas. Our expert team is here to guide you through
            every step of the buying process with confidence.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 leading-relaxed">
        <p className="mb-4 text-gray-700 text-base md:text-lg">
          NAVKAAR is a fantastic company to invest with, offering high
          standards, transparent processes, exclusive locations, and a strong
          legacy in real estate excellence.
        </p>
        <p className="text-gray-700 text-base md:text-lg">
          With flexible terms and customer-focused service, NAVKAAR ensures that
          every property deal — whether residential or commercial — is a smooth
          and rewarding experience.
        </p>
      </section>

      {/* Checklist Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            An Investor’s Checklist when Buying a Property
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaUserTie className="text-orange-600 text-2xl" />,
                title: "Are You Working With The Right Broker?",
                text: "Work with licensed professionals who understand NAVKAAR’s property standards.",
              },
              {
                icon: <FaChartLine className="text-orange-600 text-2xl" />,
                title: "What Is The Potential Return?",
                text: "Expect rental returns between 5% to 10%, depending on the property type.",
              },
              {
                icon: <FaGlobe className="text-orange-600 text-2xl" />,
                title: "Can Foreigners Own Property?",
                text: "Yes, freehold ownership is available in approved areas for non-citizens.",
              },
              {
                icon: <FaClock className="text-orange-600 text-2xl" />,
                title: "How Much Time Does It Take?",
                text: "Ownership transfer usually takes a few weeks, with NAVKAAR guiding every step.",
              },
              {
                icon: <FaBuilding className="text-orange-600 text-2xl" />,
                title: "What Are The Amenities?",
                text: "Our projects are surrounded by schools, hospitals, malls, and premium villas.",
              },
              {
                icon: <FaFileSignature className="text-orange-600 text-2xl" />,
                title: "When Will I Get Proof Of Ownership?",
                text: "Ownership documents are provided quickly after transaction completion.",
              },
              {
                icon: <FaMoneyBillWave className="text-orange-600 text-2xl" />,
                title: "What Are The Extra Charges?",
                text: "Registration fees, agency charges, and maintenance costs may apply.",
              },
              {
                icon: <FaHandsHelping className="text-orange-600 text-2xl" />,
                title: "The NAVKAAR Advantage",
                text: "We collaborate with top developers to ensure maximum ROI for our clients.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 shadow-md rounded-lg hover:shadow-xl transition"
              >
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.text}</p>
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
            <div className="flex gap-4 mt-4 text-orange-500">
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
        <div className="text-center mt-8 text-sm text-gray-500">
          © {new Date().getFullYear()} NAVKAAR – A Real Estate Co.
        </div>
      </footer>
    </div>
  );
};

export default PropertyManagement;
