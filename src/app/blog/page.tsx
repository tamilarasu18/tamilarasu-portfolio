"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";

interface BlogPost {
  id: string;
  title: string;
  createdAt: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blog");
      if (!response.ok) throw new Error("Failed to fetch blogs");
      const data = await response.json();
      setBlogs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-32 pb-16 px-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#EFF6FF] to-transparent rounded-full transform translate-x-48 -translate-y-48 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#EFF6FF] to-transparent rounded-full transform -translate-x-32 translate-y-32 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#71717A] hover:text-[#2563EB] transition-colors mb-8 group"
          >
            <svg
              className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Portfolio
          </Link>

          {/* Icon badge */}
          <div className="w-20 h-20 bg-gradient-to-br from-[#2563EB] to-[#60A5FA] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-[#09090B] mb-4 font-[family-name:var(--font-archivo)]">
            Blog
          </h1>
          <p className="text-[#71717A] text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Thoughts, tutorials, and insights about development and technology
          </p>

          {/* Stats bar */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-[#71717A]">
              <svg
                className="w-5 h-5 text-[#2563EB]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="font-medium">{blogs.length} Articles</span>
            </div>
          </div>
        </motion.div>

        {/* Blog List */}
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-[#E4E4E7] shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-4 bg-gradient-to-r from-[#E4E4E7] to-[#F4F4F5] rounded w-24 animate-pulse" />
                  <div className="w-1 h-1 bg-[#D4D4D8] rounded-full" />
                  <div className="h-4 bg-gradient-to-r from-[#E4E4E7] to-[#F4F4F5] rounded w-20 animate-pulse" />
                </div>
                <div className="h-7 bg-gradient-to-r from-[#E4E4E7] to-[#F4F4F5] rounded w-3/4 mb-3 animate-pulse" />
                <div className="h-4 bg-gradient-to-r from-[#E4E4E7] to-[#F4F4F5] rounded w-1/3 animate-pulse" />
              </motion.div>
            ))}
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-[#FEF2F2] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-[#EF4444]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <p className="text-[#EF4444] text-lg font-medium mb-4">{error}</p>
            <button
              onClick={fetchBlogs}
              className="px-8 py-4 bg-[#2563EB] text-white rounded-xl font-semibold hover:bg-[#1D4ED8] transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl"
            >
              Try Again
            </button>
          </motion.div>
        ) : blogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="relative inline-block mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] rounded-3xl flex items-center justify-center mx-auto shadow-lg">
                <svg
                  className="w-16 h-16 text-[#2563EB]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#60A5FA] rounded-full opacity-50" />
              <div className="absolute -bottom-1 -left-3 w-6 h-6 bg-[#93C5FD] rounded-full opacity-40" />
            </div>

            <h3 className="text-2xl font-bold text-[#09090B] mb-3 font-[family-name:var(--font-archivo)]">
              No blog posts yet
            </h3>
            <p className="text-[#71717A] text-lg mb-8 max-w-md mx-auto">
              New articles are coming soon. Check back later for fresh content!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-6 py-3 border-2 border-[#E4E4E7] text-[#3F3F46] rounded-xl font-semibold hover:border-[#2563EB] hover:text-[#2563EB] transition-all duration-200"
              >
                Back to Portfolio
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {blogs.map((blog, index) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                createdAt={blog.createdAt}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Create Post Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <Link
            href="/blog/create"
            className="inline-flex items-center gap-2 px-6 py-3 text-[#71717A] hover:text-[#2563EB] text-sm transition-colors group"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create a new post
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
