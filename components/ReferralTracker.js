"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

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

// Captures ?ref=<code> from the landing URL, stores it (last-touch, 30 days),
// AND keeps ?ref=<code> in the address bar as the user navigates the site, so
// the referral tag stays visible until they complete the donation.
// Attribution itself relies on the stored code, not the URL — so it works even
// if the param is ever stripped.
export default function ReferralTracker() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const fromUrl = (params.get("ref") || params.get("utm_ref") || "")
        .trim()
        .toLowerCase();

      // If the URL carries a ref, (re)store it as the active referral.
      if (fromUrl) {
        localStorage.setItem(
          KEY,
          JSON.stringify({ code: fromUrl, ts: Date.now() })
        );
      }

      const code = fromUrl || getReferralCode();
      if (!code) return;

      // Keep ?ref= present in the address bar after client-side navigation.
      // history.replaceState only rewrites the URL — it does NOT trigger a
      // Next navigation, so it can't race with in-flight Link clicks.
      if (params.get("ref") !== code) {
        params.set("ref", code);
        const qs = params.toString();
        window.history.replaceState(
          window.history.state,
          "",
          `${pathname}${qs ? `?${qs}` : ""}`
        );
      }
    } catch {
      /* ignore */
    }
  }, [pathname]);

  return null;
}
