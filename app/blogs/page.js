"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// revalidate every minute and not on every request
const revalidate = 60;

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
          next: { revalidate: revalidate },
        });
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
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-800 to-emerald-950 px-4 pb-20 pt-36 text-center text-white lg:pt-44">
        <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="relative">
          <span className="eyebrow justify-center text-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
            Stories &amp; Insights
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">Our Blog</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-50/90">
            Knowledge is power. Sharing it is the first step towards change.
          </p>
        </div>
      </section>

      {/* Blog Cards */}
      <section className="container-x max-w-7xl py-16">
        {loading ? (
          <p className="text-center text-emerald-400 animate-pulse">Loading blogs…</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="card-soft group flex flex-col overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={blog.imageUrl || "/placeholder.png"}
                    alt={blog.title}
                    fill
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {blog.category && (
                    <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur-sm">
                      {blog.category}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="line-clamp-2 font-display text-lg font-bold text-emerald-900">
                    {blog.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>

                  <div
                    className="mt-3 line-clamp-3 text-sm text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(blog.content),
                    }}
                  ></div>

                  <div className="mt-auto pt-5">
                    <Link
                      href={`/blogs/${blog._id}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_18px_-8px_rgba(5,150,105,0.6)] transition-transform hover:-translate-y-0.5"
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
