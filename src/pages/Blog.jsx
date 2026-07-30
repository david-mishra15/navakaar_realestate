import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch blogs from backend
  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/blogs`);
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div
        className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-center relative flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://wallpaperaccess.com/full/2355738.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        <div className="text-center text-white px-4 md:px-10 relative z-20">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
            Welcome To Our Blogs
          </h1>
          <p className="text-sm sm:text-md md:text-lg mb-6 max-w-2xl mx-auto">
            Stay updated with the latest insights, market trends, investment tips,
            and real estate news with NAVKAAR A Real Estate Co. Explore expert advice
            to guide your property journey.
          </p>
        </div>
      </div>

      {/* Blog Section */}
      <div className="container mx-auto px-4 sm:px-6 md:px-16 py-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
          Our Latest Blogs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {currentBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={`${API_URL}${blog.image}`}
                alt={blog.title}
                className="w-full h-40 sm:h-48 md:h-56 object-cover"
              />
              <div className="p-4 sm:p-5">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-4">
                  {blog.description}
                </p>
                <Link
                  to={`/BlogDetails/${blog.id}`}
                  className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white text-sm sm:text-base rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10 space-x-2 items-center flex-wrap">
          <button
            onClick={prevPage}
            className="px-3 sm:px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm sm:text-base"
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {getPageNumbers().map((page, idx) =>
            page === "..." ? (
              <span
                key={idx}
                className="px-2 py-2 text-gray-700 text-sm sm:text-base"
              >
                ...
              </span>
            ) : (
              <button
                key={idx}
                onClick={() => paginate(page)}
                className={`px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={nextPage}
            className="px-3 sm:px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm sm:text-base"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
