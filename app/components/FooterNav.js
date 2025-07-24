"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

const Others = [
  { path: "/terms", label: "Terms & Conditions" },
  { path: "/policy", label: "Policy" },
];

export default function FooterNav() {
  const pathname = usePathname();

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
                alt="Wahid Foundation Logo"
                className="h-10 w-auto"
              />
              <Link href="/" className="flex items-center space-x-1">
                <span className="text-xl font-bold text-white">Wahid</span>
              </Link>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-2 items-start">
              <h1 className="text-lg font-semibold mb-2 text-white">
                Quick Links
              </h1>
              {navItems.map((item) => (
                <Link
                  href={item.path}
                  key={item.path}
                  className="text-white hover:underline"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Terms */}
            <div className="flex flex-col gap-2 items-start">
              <h1 className="text-lg font-semibold mb-2 text-white">Terms</h1>
              {Others.map((item) => (
                <Link
                  href={item.path}
                  key={item.path}
                  className="text-white hover:underline"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Volunteering */}
            <div className="flex flex-col gap-2 items-start">
              <h1 className="text-lg font-semibold mb-2 text-white">
                Volunteering
              </h1>
              <Link href="/volunteer" className="text-white hover:underline">
                Do you want to join?
              </Link>
              <Link
                href="/volunteer#faq"
                className="text-white hover:underline"
              >
                FAQ
              </Link>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex flex-row gap-4 items-center self-center md:self-start">
            <button className="text-2xl text-white hover:text-gray-200">
              <FaFacebook />
            </button>
            <button className="text-2xl text-white hover:text-gray-200">
              <LuInstagram />
            </button>
            <button className="text-2xl text-white hover:text-gray-200">
              <IoLogoLinkedin />
            </button>
            <button className="text-2xl text-white hover:text-gray-200">
              <RiTwitterXFill />
            </button>
          </div>
        </div>

        <p className="text-center pb-4 text-white text-sm md:text-base">
          All rights reserved - &copy; {new Date().getFullYear()}
        </p>
      </nav>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden">
        <ul className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
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
          })}
        </ul>
      </nav>
    </>
  );
}
