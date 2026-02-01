"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
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
  index: number;
  featured?: boolean;
}

export default function BlogCard({
  slug,
  title,
  excerpt,
  coverImage,
  author,
  createdAt,
  readingTime = 5,
  tags = [],
  index,
  featured = false,
}: BlogCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.4 }}
      >
        <Link href={`/blog/${slug}`} className="group block">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Cover Image */}
            {coverImage && (
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={coverImage}
                  alt={title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            {/* Content */}
            <div className="flex flex-col justify-center">
              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-[#2563EB] uppercase tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h2 className="text-2xl md:text-3xl font-bold text-[#242424] mb-3 font-serif group-hover:text-[#2563EB] transition-colors line-clamp-2">
                {title}
              </h2>

              {excerpt && (
                <p className="text-[#6b6b6b] text-lg leading-relaxed mb-4 line-clamp-3">
                  {excerpt}
                </p>
              )}

              {/* Author & Meta */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  {author.avatar ? (
                    <Image
                      src={author.avatar}
                      alt={author.name}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#2563EB] text-white text-sm font-medium">
                      {author.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex items-center text-sm text-[#6b6b6b]">
                  <span className="font-medium text-[#242424]">
                    {author.name}
                  </span>
                  <span className="mx-2">·</span>
                  <span>{formattedDate}</span>
                  <span className="mx-2">·</span>
                  <span>{readingTime} min read</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link href={`/blog/${slug}`} className="group block">
        <div className="flex gap-6 py-6 border-b border-gray-100">
          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Author & Meta - Top */}
            <div className="flex items-center gap-2 mb-2">
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
                  <div className="w-full h-full flex items-center justify-center bg-[#2563EB] text-white text-xs font-medium">
                    {author.name.charAt(0)}
                  </div>
                )}
              </div>
              <span className="text-sm font-medium text-[#242424]">
                {author.name}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-[#242424] mb-2 font-serif group-hover:text-[#2563EB] transition-colors line-clamp-2">
              {title}
            </h2>

            {/* Excerpt */}
            {excerpt && (
              <p className="text-[#6b6b6b] leading-relaxed mb-3 line-clamp-2 hidden sm:block">
                {excerpt}
              </p>
            )}

            {/* Meta - Bottom */}
            <div className="flex items-center gap-3 text-sm text-[#6b6b6b]">
              <span>{formattedDate}</span>
              <span>·</span>
              <span>{readingTime} min read</span>
              {tags.length > 0 && (
                <>
                  <span>·</span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">
                    {tags[0]}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Cover Image */}
          {coverImage && (
            <div className="w-24 h-24 sm:w-32 sm:h-32 relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <Image
                src={coverImage}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
