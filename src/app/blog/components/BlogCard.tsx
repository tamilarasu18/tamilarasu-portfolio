"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { BlogPostMeta } from "@/lib/blog";

interface BlogCardProps extends BlogPostMeta {
  index: number;
}

export function BlogCard({
  slug,
  title,
  excerpt,
  coverImage,
  author,
  createdAt,
  readingTime = 5,
  tags = [],
  index,
}: BlogCardProps) {
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
            {tags && tags.length > 0 && (
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

export function SkeletonCard() {
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
