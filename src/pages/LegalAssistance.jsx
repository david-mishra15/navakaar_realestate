import React from "react";

const LegalAssistance = () => {
  return (
    <div className="font-sans text-ink">
      {/* Hero Section */}
      <div className="relative bg-black">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="Legal Assistance"
          className="w-full h-100 md:h-[32rem] object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="font-display text-4xl font-medium mb-4">Legal Assistance</h1>
          <p className="text-lg max-w-2xl">
            At NAVKAAR – A Real Estate Co., our expert team ensures transparency
            and security in every transaction, offering you peace of mind while
            buying or selling property.
          </p>
        </div>
      </div>

      {/* Company Intro */}
      <section className="max-w-6xl mx-auto px-4 py-12 text-center">
        <p className="text-lg leading-relaxed">
          NAVKAAR – A Real Estate Co. is a trusted real estate consultancy
          providing a wide variety of residential and commercial services,
          including apartments, penthouses, townhouses, luxury villas, and
          mansions. Our legal experts ensure all documentation and compliance
          are handled smoothly.
        </p>
      </section>

      {/* Sell / Assist Section */}
      <section className="bg-stone py-12">
        <h2 className="font-display text-3xl font-medium text-center mb-10">
          Legal Assistance with NAVKAAR
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          <div className="bg-white shadow-sm p-6 rounded-sm text-center">
            <h3 className="font-semibold text-xl mb-3">Our Network</h3>
            <p>
              NAVKAAR collaborates with leading legal experts and property
              consultants to maximize compliance and client security.
            </p>
          </div>
          <div className="bg-white shadow-sm p-6 rounded-sm text-center">
            <h3 className="font-semibold text-xl mb-3">Our Services</h3>
            <p>
              From contract drafting to due diligence, we provide full legal
              support to ensure a safe transaction process.
            </p>
          </div>
          <div className="bg-white shadow-sm p-6 rounded-sm text-center">
            <h3 className="font-semibold text-xl mb-3">Our Expertise</h3>
            <p>
              Our legal team has years of experience handling property
              documentation, ownership transfer, and RERA compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Marketing Way */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="font-display text-3xl font-medium text-center mb-10">
          The NAVKAAR Way of Legal Support
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-4">
            <span className="text-ink text-2xl">①</span>
            <p>
              In-depth consultation with legal advisors to assess and validate
              property documents.
            </p>
          </div>
          <div className="flex items-start space-x-4">
            <span className="text-ink text-2xl">②</span>
            <p>
              Verification of ownership records and compliance with government
              regulations.
            </p>
          </div>
          <div className="flex items-start space-x-4">
            <span className="text-ink text-2xl">③</span>
            <p>
              Assistance with drafting, reviewing, and finalizing sale
              agreements.
            </p>
          </div>
          <div className="flex items-start space-x-4">
            <span className="text-ink text-2xl">④</span>
            <p>
              Support throughout the property transfer process to ensure
              seamless handover.
            </p>
          </div>
        </div>
      </section>

      {/* User Guide */}
      <section className="bg-stone py-12">
        <h2 className="font-display text-3xl font-medium text-center mb-10">
          A User's Guide to Legal Assistance
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
          <div className="bg-white p-6 rounded-sm shadow">
            <h3 className="font-semibold text-xl mb-3">
              Find a Trusted Legal Advisor
            </h3>
            <p>
              Always consult a licensed professional who understands property
              laws and compliance.
            </p>
          </div>
          <div className="bg-white p-6 rounded-sm shadow">
            <h3 className="font-semibold text-xl mb-3">Verify Documentation</h3>
            <p>
              Ensure property papers are authentic, including NOCs, title deeds,
              and approval certificates.
            </p>
          </div>
          <div className="bg-white p-6 rounded-sm shadow">
            <h3 className="font-semibold text-xl mb-3">
              Conduct Due Diligence
            </h3>
            <p>
              Verify ownership history, pending dues, or any disputes before
              entering into agreements.
            </p>
          </div>
          <div className="bg-white p-6 rounded-sm shadow">
            <h3 className="font-semibold text-xl mb-3">Contract & Transfer</h3>
            <p>
              Get legal help in drafting sale agreements and transferring
              ownership securely.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 mt-10">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-3 text-lg">Our Services</h3>
            <ul className="space-y-2">
              <li>Buy a Property</li>
              <li>Sell a Property</li>
              <li>Legal Assistance</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>About NAVKAAR</li>
              <li>Contact Us</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3 text-lg">Contact Us</h3>
            <p>
              Office 101, Business Bay, Dubai, UAE <br />
              info@navkaar.com <br />
              +971 54 581 6583
            </p>
          </div>
        </div>
        <div className="text-center mt-6 text-sm text-subtle">
          Copyright © 2025 – NAVKAAR Real Estate Co.
        </div>
      </footer>
    </div>
  );
};

export default LegalAssistance;
