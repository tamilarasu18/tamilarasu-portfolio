"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface BlogCardProps {
  id: string;
  title: string;
  createdAt: string;
  index: number;
}

export default function BlogCard({
  id,
  title,
  createdAt,
  index,
}: BlogCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Calculate reading time estimate (assuming avg words)
  const readTime = Math.max(3, Math.ceil(title.split(" ").length / 2));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link href={`/blog/${id}`}>
        <div className="relative bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-[#E4E4E7] hover:shadow-xl hover:border-[#2563EB]/30 transition-all duration-300 cursor-pointer group overflow-hidden">
          {/* Decorative gradient corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#EFF6FF] to-transparent rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500" />

          {/* Accent line */}
          <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-[#2563EB] to-[#60A5FA] rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="flex-1 pl-2 group-hover:pl-4 transition-all duration-300">
              {/* Date and read time */}
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 text-[#71717A] text-sm">
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {formattedDate}
                </span>
                <span className="w-1 h-1 bg-[#D4D4D8] rounded-full" />
                <span className="inline-flex items-center gap-1.5 text-[#71717A] text-sm">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {readTime} min read
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl lg:text-2xl font-semibold text-[#09090B] group-hover:text-[#2563EB] transition-colors duration-200 line-clamp-2 font-[family-name:var(--font-archivo)]">
                {title}
              </h3>

              {/* Read more indicator */}
              <p className="mt-3 text-[#2563EB] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                Read article
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
              </p>
            </div>

            {/* Arrow icon */}
            <div className="w-12 h-12 bg-[#EFF6FF] rounded-xl flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300 flex-shrink-0 shadow-sm group-hover:shadow-md">
              <svg
                className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
