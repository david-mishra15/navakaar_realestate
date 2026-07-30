import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5002";

const RentApartmentDetails = () => {
  const { id } = useParams();
  const [apartment, setApartment] = useState(null);
  const [bannerApartment, setBannerApartment] = useState(null);
  const [details, setDetails] = useState([]);

  // Fetch single apartment
  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const res = await fetch(`${API_URL}/api/apartments`);
        const data = await res.json();
        if (data?.data?.length > 0) {
          const selected = data.data.find((a) => String(a.id) === String(id));
          if (selected) {
            setApartment(selected);
            setBannerApartment(selected);
          }
        }
      } catch (err) {
        console.error("Error fetching apartment:", err);
      }
    };

    fetchApartment();
  }, [id]);

  // Fetch details added by admin
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/apartment-details/apartment/${id}`
        );
        const data = await res.json();
        setDetails(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching apartment details:", err);
      }
    };

    fetchDetails();
  }, [id]);

  if (!apartment) {
    return (
      <div className="w-full h-screen flex items-center justify-center px-4">
        <p className="text-gray-600 text-lg text-center">
          Apartment details not found.
        </p>
      </div>
    );
  }

  const imageUrl = bannerApartment?.thumbnail?.startsWith("http")
    ? bannerApartment.thumbnail
    : bannerApartment
    ? `${API_URL}${bannerApartment.thumbnail}`
    : apartment.thumbnail;

  return (
    <div className="w-full bg-gray-50">
      {/* Banner Section */}
      <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px]">
        <img
          src={imageUrl}
          alt={apartment.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/50 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-white text-2xl sm:text-3xl md:text-5xl font-bold drop-shadow-lg">
            {bannerApartment?.title}
          </h1>
          <p className="text-white text-sm sm:text-base md:text-lg mt-2">
            {bannerApartment?.location}
          </p>
        </div>
      </div>

      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Link
          to="/rent-apartment"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          ← Back to all apartments
        </Link>
      </div>

      {/* Apartment Details Section */}
      {details.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h3 className="text-2xl font-bold mb-10 text-center md:text-left text-gray-800">
            Apartment Features / Details
          </h3>

          <div className="space-y-10">
            {details.map((d) => (
              <div
                key={d.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col md:flex-row gap-8"
              >
                {/* Left Image */}
                {d.image && (
                  <div className="w-full md:w-1/2">
                    <img
                      src={
                        d.image.startsWith("http")
                          ? d.image
                          : `${API_URL}/uploads/${d.image}`
                      }
                      alt={d.heading}
                      className="w-full h-72 md:h-80 object-cover rounded-2xl shadow-lg"
                    />
                  </div>
                )}

                {/* Right Text */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-2xl font-semibold text-gray-900 mb-4">
                      {d.heading}
                    </h4>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {d.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RentApartmentDetails;
