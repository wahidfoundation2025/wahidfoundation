"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import FooterLinks from "./FooterLinks";
import FooterSocial from "./FooterSocial";
import FooterContact from "./FooterContact";
import FooterCopyright from "./FooterCopyright";
import FooterMobileNav from "./FooterMobileNav";

export default function FooterNav() {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/footer`);
        if (!res.ok) throw new Error("Failed to fetch footer data");
        const data = await res.json();
        setFooterData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFooterData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-emerald-900 py-10 text-emerald-200">
        <span className="animate-pulse">Loading…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center bg-emerald-900 py-10 text-emerald-200">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <footer className="relative z-40 w-full overflow-hidden bg-gradient-to-b from-emerald-900 to-emerald-950 text-white">
        {/* Donate CTA band */}
        <div className="border-b border-white/10">
          <div className="container-x flex flex-col items-center justify-between gap-5 py-10 text-center md:flex-row md:text-left">
            <div>
              <h3 className="font-display text-2xl font-bold sm:text-3xl">
                Your generosity changes lives.
              </h3>
              <p className="mt-1 text-sm text-emerald-100/80">
                Join our mission today — every contribution counts.
              </p>
            </div>
            <Link
              href="/donate"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-bold text-emerald-700 shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Heart className="h-4 w-4" fill="currentColor" />
              Donate Now
            </Link>
          </div>
        </div>

        {/* Main footer */}
        <div className="container-x flex flex-col justify-between gap-10 py-12 lg:flex-row">
          <FooterLinks footerData={footerData} />
          <div className="flex flex-col items-start gap-6">
            <FooterSocial socialLinks={footerData?.socialLinks} />
            <FooterContact />
          </div>
        </div>

        <div className="border-t border-white/10 pb-24 md:pb-0">
          <FooterCopyright text={footerData?.copyrightText} />
        </div>
      </footer>

      <FooterMobileNav />
    </>
  );
}
