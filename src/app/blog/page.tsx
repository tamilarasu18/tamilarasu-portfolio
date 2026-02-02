"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";

interface BlogPost {
  slug: string;
  title: string;
  excerpt?: string;
  coverImage?: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  readingTime?: number;
  tags?: string[];
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

  const featuredPost = blogs[0];
  const otherPosts = blogs.slice(1);

  return (
    <main className="min-h-screen bg-white">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-40">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-[#6b6b6b] hover:text-[#242424] transition-colors flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="hidden sm:inline">Back</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-sm text-[#6b6b6b]">Blog</span>
            <Link
              href="/blog/create"
              className="px-4 py-2 bg-[#2563EB] text-white rounded-full text-sm font-medium hover:bg-[#1D4ED8] transition-colors cursor-pointer"
            >
              Write
            </Link>
          </div>
        </div>
      </header>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Page Title */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#242424] mb-4 font-serif">
              Blog
            </h1>
            <p className="text-[#6b6b6b] text-lg leading-relaxed max-w-xl">
              Thoughts on software development, technology, and building digital
              products.
            </p>
          </motion.header>

          {/* Blog List */}
          {loading ? (
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex gap-6 py-6 border-b border-gray-100"
                >
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-100 rounded w-32 animate-pulse" />
                    <div className="h-6 bg-gray-100 rounded w-3/4 animate-pulse" />
                    <div className="h-4 bg-gray-100 rounded w-full animate-pulse" />
                    <div className="h-4 bg-gray-100 rounded w-40 animate-pulse" />
                  </div>
                  <div className="w-32 h-32 bg-gray-100 rounded-lg animate-pulse flex-shrink-0" />
                </div>
              ))}
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={fetchBlogs}
                className="px-6 py-3 bg-[#242424] text-white rounded-full font-medium hover:bg-black transition-colors cursor-pointer"
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
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-[#6b6b6b]"
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
              <h3 className="text-xl font-bold text-[#242424] mb-2 font-serif">
                No stories yet
              </h3>
              <p className="text-[#6b6b6b] mb-6">
                Check back soon for new posts.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[#2563EB] font-medium hover:underline"
              >
                Back to Portfolio
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </motion.div>
          ) : (
            <div>
              {/* Featured Post */}
              {featuredPost && (
                <div className="mb-12 pb-12 border-b border-gray-200">
                  <BlogCard
                    slug={featuredPost.slug}
                    title={featuredPost.title}
                    excerpt={featuredPost.excerpt}
                    coverImage={featuredPost.coverImage}
                    author={featuredPost.author}
                    createdAt={featuredPost.createdAt}
                    readingTime={featuredPost.readingTime}
                    tags={featuredPost.tags}
                    index={0}
                    featured
                  />
                </div>
              )}

              {/* Other Posts */}
              {otherPosts.length > 0 && (
                <div>
                  <h2 className="text-sm font-medium text-[#6b6b6b] uppercase tracking-wider mb-4">
                    More Stories
                  </h2>
                  {otherPosts.map((blog, index) => (
                    <BlogCard
                      key={blog.slug}
                      slug={blog.slug}
                      title={blog.title}
                      excerpt={blog.excerpt}
                      coverImage={blog.coverImage}
                      author={blog.author}
                      createdAt={blog.createdAt}
                      readingTime={blog.readingTime}
                      tags={blog.tags}
                      index={index + 1}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
