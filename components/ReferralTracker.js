"use client";

import { useEffect } from "react";

const KEY = "wf_ref";
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30-day attribution window

// Read the stored referral (influencer) code, if still within the window.
export function getReferralCode() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const { code, ts } = JSON.parse(raw);
    if (!code || !ts || Date.now() - ts > MAX_AGE_MS) return null;
    return code;
  } catch {
    return null;
  }
}

// Captures ?ref=<code> from the landing URL and stores it (last-touch).
// Rendered once in the root layout so it runs on every entry to the site.
export default function ReferralTracker() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("ref") || params.get("utm_ref");
      if (code && code.trim()) {
        localStorage.setItem(
          KEY,
          JSON.stringify({ code: code.trim().toLowerCase(), ts: Date.now() })
        );
      }
    } catch {
      /* ignore */
    }
  }, []);

  return null;
}
