// components/ShareButton.jsx
"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

export default function ShareButton({ slug }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const baseUrl = window.location.origin; // always gives https://domain.com
      const url = `${baseUrl}/projects/${slug}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 rounded-full bg-white/90 text-gray-700 shadow-md hover:bg-white transition-all"
      aria-label="Share project link"
    >
      {copied ? (
        <Check className="w-3 h-3 text-green-600 transition-all duration-300" />
      ) : (
        <Share2 className="w-3 h-3 transition-all duration-300" />
      )}
    </button>
  );
}
