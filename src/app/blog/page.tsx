"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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

// Skeleton Card Component - Single unified design
function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      {/* Image Skeleton */}
      <div className="aspect-[16/9] bg-gradient-to-br from-gray-200 to-gray-100 animate-pulse" />

      {/* Content Skeleton */}
      <div className="p-5">
        <div className="flex gap-2 mb-3">
          <div className="h-5 w-14 bg-gray-200 rounded-full animate-pulse" />
        </div>
        <div className="h-6 bg-gray-200 rounded w-full mb-2 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
            <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// Blog Card Component - Single unified design for all posts
function BlogCard({
  slug,
  title,
  excerpt,
  coverImage,
  author,
  createdAt,
  readingTime = 5,
  tags = [],
  index,
}: BlogPost & { index: number }) {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link href={`/blog/${slug}`} className="group block h-full">
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
          {/* Cover Image */}
          <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
            {coverImage ? (
              <Image
                src={coverImage}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h2 className="text-lg font-bold text-[#242424] mb-2 font-serif group-hover:text-blue-600 transition-colors line-clamp-2">
              {title}
            </h2>

            {excerpt && (
              <p className="text-[#6b6b6b] text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                {excerpt}
              </p>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  {author.avatar ? (
                    <Image
                      src={author.avatar}
                      alt={author.name}
                      width={24}
                      height={24}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white text-xs font-medium">
                      {author.name.charAt(0)}
                    </div>
                  )}
                </div>
                <span className="text-sm text-[#6b6b6b]">{author.name}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#6b6b6b]">
                <span>{formattedDate}</span>
                <span>·</span>
                <span>{readingTime} min</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
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
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
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
            <span className="hidden sm:inline font-medium">Back</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-sm text-[#6b6b6b] hidden sm:inline">
              {blogs.length} {blogs.length === 1 ? "story" : "stories"}
            </span>
            <Link
              href="/blog/create"
              className="px-5 py-2.5 bg-[#242424] text-white rounded-full text-sm font-medium hover:bg-black transition-colors cursor-pointer flex items-center gap-2"
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
              Write
            </Link>
          </div>
        </div>
      </header>

      <div className="pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Content */}
          {loading ? (
            // Skeleton Grid - Same card design
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-red-500"
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
              <h3 className="text-xl font-bold text-[#242424] mb-2 font-serif">
                Something went wrong
              </h3>
              <p className="text-[#6b6b6b] mb-6">{error}</p>
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
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-[#6b6b6b]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#242424] mb-3 font-serif">
                No stories yet
              </h3>
              <p className="text-[#6b6b6b] mb-8 max-w-md mx-auto">
                Start sharing your thoughts and experiences. Your first story
                awaits!
              </p>
              <Link
                href="/blog/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white rounded-full font-medium hover:bg-[#1D4ED8] transition-colors"
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
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Write your first story
              </Link>
            </motion.div>
          ) : (
            // Blog Posts Grid - Unified card design
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog, index) => (
                <BlogCard key={blog.slug} {...blog} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
