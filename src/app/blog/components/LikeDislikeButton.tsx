"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface LikeDislikeButtonProps {
  slug: string;
}

type VoteType = "like" | "dislike" | null;

export function LikeDislikeButton({ slug }: LikeDislikeButtonProps) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userVote, setUserVote] = useState<VoteType>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVoting, setIsVoting] = useState(false);

  const storageKey = `blog-vote-${slug}`;

  // Fetch initial engagement data
  useEffect(() => {
    const fetchEngagement = async () => {
      try {
        const res = await fetch(`/api/blog/${slug}/engagement`);
        if (res.ok) {
          const data = await res.json();
          setLikes(data.likes || 0);
          setDislikes(data.dislikes || 0);
        }
      } catch (error) {
        console.error("Failed to fetch engagement:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Check localStorage for existing vote
    const storedVote = localStorage.getItem(storageKey) as VoteType;
    if (storedVote) {
      setUserVote(storedVote);
    }

    fetchEngagement();
  }, [slug, storageKey]);

  const handleVote = async (action: "like" | "dislike") => {
    if (isVoting) return;

    const previousVote = userVote;

    // If clicking the same button, don't do anything (already voted)
    if (previousVote === action) {
      return;
    }

    setIsVoting(true);

    // Optimistic update
    if (action === "like") {
      setLikes((prev) => prev + 1);
      if (previousVote === "dislike") {
        setDislikes((prev) => Math.max(0, prev - 1));
      }
    } else {
      setDislikes((prev) => prev + 1);
      if (previousVote === "like") {
        setLikes((prev) => Math.max(0, prev - 1));
      }
    }
    setUserVote(action);

    try {
      const res = await fetch(`/api/blog/${slug}/engagement`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, previousAction: previousVote }),
      });

      if (res.ok) {
        const data = await res.json();
        setLikes(data.likes);
        setDislikes(data.dislikes);
        localStorage.setItem(storageKey, action);
      } else {
        // Revert on failure
        setUserVote(previousVote);
        if (action === "like") {
          setLikes((prev) => prev - 1);
          if (previousVote === "dislike") {
            setDislikes((prev) => prev + 1);
          }
        } else {
          setDislikes((prev) => prev - 1);
          if (previousVote === "like") {
            setLikes((prev) => prev + 1);
          }
        }
      }
    } catch (error) {
      console.error("Failed to vote:", error);
      // Revert on error
      setUserVote(previousVote);
    } finally {
      setIsVoting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-4">
        <div className="w-20 h-10 bg-gray-100 rounded-full animate-pulse" />
        <div className="w-20 h-10 bg-gray-100 rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Like Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleVote("like")}
        disabled={isVoting}
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
          userVote === "like"
            ? "bg-blue-100 text-blue-600 border-2 border-blue-500"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent"
        } ${isVoting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <svg
          className="w-5 h-5"
          fill={userVote === "like" ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
          />
        </svg>
        <span className="font-medium">{likes}</span>
      </motion.button>

      {/* Dislike Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleVote("dislike")}
        disabled={isVoting}
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
          userVote === "dislike"
            ? "bg-red-100 text-red-600 border-2 border-red-500"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent"
        } ${isVoting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <svg
          className="w-5 h-5"
          fill={userVote === "dislike" ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
          />
        </svg>
        <span className="font-medium">{dislikes}</span>
      </motion.button>
    </div>
  );
}
