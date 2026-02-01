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
    <main className="min-h-screen bg-[#FAFAFA] pt-32 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#71717A] hover:text-[#2563EB] transition-colors mb-6"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Portfolio
          </Link>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#09090B] mb-4 font-[family-name:var(--font-archivo)]">
            Blog
          </h1>
          <p className="text-[#71717A] text-lg max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about development and technology
          </p>
        </motion.div>

        {/* Blog List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-[#E4E4E7] animate-pulse"
              >
                <div className="h-6 bg-[#E4E4E7] rounded w-3/4 mb-3" />
                <div className="h-4 bg-[#E4E4E7] rounded w-1/4" />
              </div>
            ))}
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-[#EF4444] mb-4">{error}</p>
            <button
              onClick={fetchBlogs}
              className="px-6 py-3 bg-[#2563EB] text-white rounded-xl font-semibold hover:bg-[#1D4ED8] transition-colors cursor-pointer"
            >
              Try Again
            </button>
          </motion.div>
        ) : blogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-[#EFF6FF] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-[#2563EB]"
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
            </div>
            <h3 className="text-xl font-semibold text-[#09090B] mb-2">
              No blog posts yet
            </h3>
            <p className="text-[#71717A] mb-6">
              Check back later for new content!
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
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

        {/* Create Post Link (hidden for now, accessible via URL) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/blog/create"
            className="text-[#71717A] hover:text-[#2563EB] text-sm transition-colors"
          >
            Create a new post →
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
