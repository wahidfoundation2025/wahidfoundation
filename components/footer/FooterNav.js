"use client";

import { useEffect, useState } from "react";
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
      <div className="flex items-center justify-center py-8 bg-emerald-800 text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8 bg-emerald-800 text-white">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <nav className="bg-emerald-800 w-full border-t border-gray-200 shadow-lg z-50">
        <div className="md:pb-0 pb-10 flex flex-col lg:flex-row justify-between items-start py-8 px-6 md:px-12 xl:px-40 gap-8 md:gap-4">
          <FooterLinks footerData={footerData} />
          <div className="flex flex-col items-start gap-6">
            <FooterSocial socialLinks={footerData?.socialLinks} />
            <FooterContact />
          </div>
        </div>
        <FooterCopyright text={footerData?.copyrightText} />
      </nav>

      <FooterMobileNav />
    </>
  );
}
