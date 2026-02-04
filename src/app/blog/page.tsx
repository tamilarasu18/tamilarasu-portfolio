import Link from "next/link";
import { fetchBlogs } from "@/lib/blog";
import { BlogCard } from "./components/BlogCard";

export const revalidate = 60; // Revalidate every minute

export default async function BlogPage() {
  const blogs = await fetchBlogs();

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
          {blogs.length === 0 ? (
            <div className="text-center py-20">
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
              <h2 className="text-2xl font-bold text-[#242424] mb-3 font-serif">
                No stories yet
              </h2>
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
            </div>
          ) : (
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
