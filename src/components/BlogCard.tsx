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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link href={`/blog/${id}`}>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E4E4E7] hover:shadow-lg hover:border-[#2563EB]/30 transition-all duration-300 cursor-pointer group">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-[#09090B] group-hover:text-[#2563EB] transition-colors duration-200 line-clamp-2">
                {title}
              </h3>
              <p className="text-[#71717A] text-sm mt-2">{formattedDate}</p>
            </div>
            <div className="w-10 h-10 bg-[#EFF6FF] rounded-xl flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-200">
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
