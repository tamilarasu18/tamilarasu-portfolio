"use client";

import { useState } from "react";

interface ShareButtonProps {
  className?: string;
  variant?: "primary" | "secondary";
}

export function ShareButton({
  className,
  variant = "primary",
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Copy this link: " + window.location.href);
    }
  };

  if (variant === "secondary") {
    return (
      <button
        onClick={handleShare}
        className={`flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-[#6b6b6b] hover:border-[#242424] hover:text-[#242424] transition-colors cursor-pointer ${className}`}
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
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
        {copied ? "Copied!" : "Share"}
      </button>
    );
  }

  return (
    <button
      onClick={handleShare}
      className={`px-4 py-2 bg-[#2563EB] text-white rounded-full text-sm font-medium hover:bg-[#1D4ED8] transition-colors cursor-pointer flex items-center gap-2 ${className}`}
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
          strokeWidth={1.5}
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
        />
      </svg>
      {copied ? "Copied!" : "Share"}
    </button>
  );
}
