"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Home, BarChart4, Heart, Info, TrendingUp } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";
import { IoLogoLinkedin } from "react-icons/io5";
import { RiTwitterXFill } from "react-icons/ri";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/projects", icon: BarChart4, label: "Projects" },
  { path: "/donate", icon: Heart, label: "Donate" },
  { path: "/impact", icon: TrendingUp, label: "Impact" },
  { path: "/about", icon: Info, label: "About" },
];

export default function FooterNav() {
  const pathname = usePathname();
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch footer data from API
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const res = await fetch("https://wahidfoundationadmin-seven.vercel.app/api/footer");
        if (!res.ok) {
          throw new Error("Failed to fetch footer data");
        }
        const data = await res.json();
        setFooterData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start py-8 px-6 md:px-20 lg:px-40 gap-8 md:gap-0">
          {/* Left Side: Logo + Links */}
          <div className="flex flex-col md:flex-row items-start md:items-start gap-8 md:gap-20 w-full md:w-auto">
            {/* Logo */}
            <div className="flex flex-row items-center gap-2">
              <img
                src="/logo.png"
                alt={`${footerData?.orgName || "Wahid Foundation"} Logo`}
                className="h-10 w-auto"
              />
              <Link href="/" className="flex items-center space-x-1">
                <span className="text-xl font-bold text-white">
                  {footerData?.orgName || "Wahid"}
                </span>
              </Link>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-2 items-start">
              <h1 className="text-lg font-semibold mb-2 text-white">Quick Links</h1>
              {(footerData?.quickLinks?.length > 0 ? footerData.quickLinks : navItems).map(
                (item) => (
                  <Link
                    href={item.path}
                    key={item.path}
                    className="text-white hover:underline"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            {/* Terms */}
            <div className="flex flex-col gap-2 items-start">
              <h1 className="text-lg font-semibold mb-2 text-white">Terms</h1>
              {(footerData?.termsLinks?.length > 0 ? footerData.termsLinks : Others).map(
                (item) => (
                  <Link
                    href={item.path}
                    key={item.path}
                    className="text-white hover:underline"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            {/* Volunteering */}
            <div className="flex flex-col gap-2 items-start">
              <h1 className="text-lg font-semibold mb-2 text-white">
                {footerData?.volunteering?.heading || "Volunteering"}
              </h1>
              <Link
                href={footerData?.volunteering?.linkPath || "/volunteer"}
                className="text-white hover:underline"
              >
                {footerData?.volunteering?.linkLabel || "Do you want to join?"}
              </Link>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex flex-row gap-4 items-center self-center md:self-start">
            {footerData?.socialLinks?.facebook && (
              <a
                href={footerData.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-white hover:text-gray-200"
              >
                <FaFacebook />
              </a>
            )}
            {footerData?.socialLinks?.instagram && (
              <a
                href={footerData.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-white hover:text-gray-200"
              >
                <LuInstagram />
              </a>
            )}
            {footerData?.socialLinks?.linkedin && (
              <a
                href={footerData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-white hover:text-gray-200"
              >
                <IoLogoLinkedin />
              </a>
            )}
            {footerData?.socialLinks?.twitter && (
              <a
                href={footerData.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-white hover:text-gray-200"
              >
                <RiTwitterXFill />
              </a>
            )}
          </div>
        </div>

        <p className="text-center pb-4 text-white text-sm md:text-base">
          {footerData?.copyrightText || `All rights reserved - &copy; ${new Date().getFullYear()}`}
        </p>
      </nav>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden">
        <ul className="flex justify-around items-center h-16">
          {(footerData?.quickLinks?.length > 0 ? footerData.quickLinks : navItems).map(
            (item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon || Home; // Fallback to Home icon if none provided
              return (
                <li key={item.path} className="flex-1">
                  <Link
                    href={item.path}
                    className={`flex flex-col items-center pt-2 pb-1 px-1 transition-colors ${
                      isActive ? "text-emerald-600" : "text-gray-500"
                    }`}
                  >
                    <Icon className="w-6 h-6 mb-1" />
                    <span className="text-xs">{item.label}</span>
                  </Link>
                </li>
              );
            }
          )}
        </ul>
      </nav>
    </>
  );
}