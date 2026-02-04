"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

interface CommentsSectionProps {
  slug: string;
}

export function CommentsSection({ slug }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const authorStorageKey = `blog-comment-author`;

  // Fetch comments and restore saved author name
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/blog/${slug}/comments`);
        if (res.ok) {
          const data = await res.json();
          setComments(data.comments || []);
        }
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Restore saved author name
    const savedAuthor = localStorage.getItem(authorStorageKey);
    if (savedAuthor) {
      setAuthor(savedAuthor);
    }

    fetchComments();
  }, [slug, authorStorageKey]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!author.trim() || !content.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (author.length > 50) {
      setError("Name is too long (max 50 characters)");
      return;
    }

    if (content.length > 1000) {
      setError("Comment is too long (max 1000 characters)");
      return;
    }

    setIsSubmitting(true);

    // Optimistic update
    const tempComment: Comment = {
      id: `temp-${Date.now()}`,
      author: author.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };
    setComments((prev) => [...prev, tempComment]);
    setContent("");

    try {
      const res = await fetch(`/api/blog/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: author.trim(),
          content: content.trim(),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        // Replace temp comment with real one
        setComments((prev) =>
          prev.map((c) => (c.id === tempComment.id ? data.comment : c)),
        );
        // Save author name for future use
        localStorage.setItem(authorStorageKey, author.trim());
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Failed to submit comment");
        // Remove optimistically added comment
        setComments((prev) => prev.filter((c) => c.id !== tempComment.id));
        setContent(content); // Restore content
      }
    } catch (error) {
      console.error("Failed to submit comment:", error);
      setError("Failed to submit comment. Please try again.");
      setComments((prev) => prev.filter((c) => c.id !== tempComment.id));
      setContent(content);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-100">
      <h3 className="text-2xl font-serif font-bold text-[#242424] mb-6">
        Comments ({comments.length})
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-[#6b6b6b] mb-1"
          >
            Your Name
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter your name"
            maxLength={50}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[#242424] placeholder:text-gray-400"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-[#6b6b6b] mb-1"
          >
            Your Comment
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            rows={4}
            maxLength={1000}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none text-[#242424] placeholder:text-gray-400"
          />
          <p className="text-xs text-gray-400 mt-1 text-right">
            {content.length}/1000
          </p>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`px-6 py-3 bg-[#2563EB] text-white font-medium rounded-lg transition-all ${
            isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-[#1d4ed8] cursor-pointer"
          }`}
        >
          {isSubmitting ? "Posting..." : "Post Comment"}
        </motion.button>
      </form>

      {/* Comments List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="h-4 w-24 bg-gray-200 rounded" />
              </div>
              <div className="h-16 bg-gray-100 rounded-lg" />
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <p className="text-center text-[#6b6b6b] py-8">
          No comments yet. Be the first to share your thoughts!
        </p>
      ) : (
        <AnimatePresence>
          <div className="space-y-6">
            {comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                    {comment.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-[#242424]">
                      {comment.author}
                    </p>
                    <p className="text-xs text-[#6b6b6b]">
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                </div>
                <p className="text-[#242424] leading-relaxed whitespace-pre-wrap">
                  {comment.content}
                </p>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
