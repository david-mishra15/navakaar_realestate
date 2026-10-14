import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import latestBg from "../assets/savelarg.jpeg"; // hero background

const BlogDetails = () => {
  const { id } = useParams(); // get blog id from URL
  const [blog, setBlog] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL; // backend URL from .env

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_URL}/api/blogs/${id}`);
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };

    fetchBlog();
  }, [id, API_URL]);

  if (!blog) {
    return (
      <div className="text-center py-20 text-muted text-lg animate-pulse">
        Loading Blog...
      </div>
    );
  }

  return (
    <div className="font-sans text-ink">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px]">
        <img
          src={latestBg}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-6">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg animate-fadeIn">
            {blog.title}
          </h1>
        </div>
      </div>

      {/* Blog Details Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        {/* Blog Card */}
        <div className="bg-white rounded-md shadow-sm p-4 sm:p-6 md:p-10 lg:p-12">
          {/* Blog Image */}
          <div className="mb-8 md:mb-10">
            <img
              src={`${API_URL}${blog.image}`}
              alt={blog.title}
              className="w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[450px] object-cover rounded-md shadow-sm transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>

          {/* Blog Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-snug mb-4 md:mb-6 text-ink">
            {blog.title}
          </h1>

          {/* Author & Date */}
          <div className="flex flex-wrap items-center text-xs sm:text-sm md:text-base text-muted mb-6 md:mb-8">
            <span className="flex items-center gap-1"></span>
          </div>

          {/* Blog Content */}
          <div className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-none text-ink/80 leading-relaxed">
            {blog.description.split("\n").map((paragraph, index) => (
              <p
                key={index}
                className="mb-4 sm:mb-5 text-sm sm:text-base md:text-lg lg:text-xl"
              >
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
