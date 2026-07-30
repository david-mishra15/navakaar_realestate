import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminApartmentGallery = () => {
  const [apartments, setApartments] = useState([]); // all apartments
  const [selectedApartment, setSelectedApartment] = useState("");
  const [gallery, setGallery] = useState([]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  // Base API URL from .env
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch apartments for dropdown
  const fetchApartments = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/apartments-for-sale`);
      setApartments(res.data.data); // { id, title } assumed
    } catch (err) {
      console.error(err);
      alert("Error fetching apartments");
    }
  };

  // Fetch gallery for selected apartment
  const fetchGallery = async () => {
    if (!selectedApartment) return;
    try {
      const res = await axios.get(
        `${API_URL}/api/appartmentsellgallery/${selectedApartment}`
      );
      setGallery(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching gallery");
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  useEffect(() => {
    fetchGallery();
  }, [selectedApartment]);

  // Add new gallery item
  const handleAddGallery = async (e) => {
    e.preventDefault();

    if (!selectedApartment || !description || !image) {
      alert("All fields are required");
      return;
    }

    const apartmentObj = apartments.find(
      (a) => a.id.toString() === selectedApartment.toString()
    );

    if (!apartmentObj) {
      alert("Invalid apartment selected");
      return;
    }

    const formData = new FormData();
    formData.append("apartment_id", selectedApartment);
    formData.append("title", apartmentObj.title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      await axios.post(`${API_URL}/api/appartmentsellgallery`, formData);
      setDescription("");
      setImage(null);
      fetchGallery();
    } catch (err) {
      console.error(err);
      alert("Error adding gallery item");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API_URL}/api/appartmentsellgallery/${id}`);
      fetchGallery();
    } catch (err) {
      console.error(err);
      alert("Error deleting gallery item");
    }
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        Apartment Gallery Admin
      </h2>

      {/* Select Apartment */}
      <div
        style={{
          marginBottom: "30px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <label style={{ fontWeight: "bold" }}>Select Apartment:</label>
        <select
          value={selectedApartment}
          onChange={(e) => setSelectedApartment(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">-- Choose Apartment --</option>
          {apartments.map((apt) => (
            <option key={apt.id} value={apt.id}>
              {apt.title}
            </option>
          ))}
        </select>
      </div>

      {/* Add Gallery Form */}
      <form
        onSubmit={handleAddGallery}
        style={{
          marginBottom: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          background: "#f9f9f9",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ marginBottom: "10px" }}>Add New Gallery Item</h3>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            resize: "none",
            minHeight: "60px",
          }}
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ padding: "5px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            background: "#007BFF",
            color: "#fff",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#0056b3")}
          onMouseOut={(e) => (e.target.style.background = "#007BFF")}
        >
          Add Gallery Item
        </button>
      </form>

      {/* Gallery Items */}
      <h3 style={{ marginBottom: "15px" }}>Gallery Items</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {gallery.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
              background: "#fff",
            }}
          >
            <img
              src={`${API_URL}${item.image}`}
              alt={item.title}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <div style={{ padding: "10px" }}>
              <h4
                style={{
                  margin: "0 0 5px 0",
                  fontSize: "16px",
                  color: "#333",
                }}
              >
                {item.title}
              </h4>
              <p style={{ fontSize: "14px", color: "#666" }}>
                {item.description}
              </p>
              <button
                onClick={() => handleDelete(item.id)}
                style={{
                  padding: "5px 10px",
                  border: "none",
                  borderRadius: "5px",
                  background: "#DC3545",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "12px",
                  marginTop: "10px",
                  transition: "0.3s",
                }}
                onMouseOver={(e) => (e.target.style.background = "#a71d2a")}
                onMouseOut={(e) => (e.target.style.background = "#DC3545")}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminApartmentGallery;
