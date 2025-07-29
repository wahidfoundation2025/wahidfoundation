"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch(
          "https://wahidfoundationadmin-seven.vercel.app/api/blogs"
        ); // 👈 adjust to your endpoint if needed
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* ✅ Hero Section */}
      <section className="bg-emerald-600 text-white py-32 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          “Knowledge is power. Sharing it is the first step towards change.” ✨
        </p>
      </section>

      {/* ✅ Blog Cards */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <p className="text-center text-gray-500">Loading blogs…</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={blog.imageUrl || "/placeholder.png"}
                    alt={blog.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {blog.category && (
                    <div className="absolute top-2 left-2 bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {blog.category}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>

                  {/* Preview of HTML content */}
                  <div
                    className="text-sm text-gray-600 mt-3 line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: blog.content,
                    }}
                  ></div>

                  {/* Read More */}
                  <div className="mt-auto pt-4">
                    <Link
                      href={`/blogs/${blog._id}`}
                      className="inline-block bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
