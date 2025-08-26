"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";

export default function Headers() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/impact", label: "Our Impact" },
    { href: "/about", label: "About" },
    { href: "/donate", label: "Donate" },
    { href: "/volunteer", label: "Volunteer" },
    { href: "/blogs", label: "Blogs" },
  ];

  return (
    <header className="bg-white border-b border-emerald-100 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-8 py-4 flex items-center justify-between">
        {/* Left: Logo + Nav */}
        <div className="flex items-center space-x-6">
          <div className="flex flex-row gap-2 items-center">
            <img src={"/logo.png"} alt="Wahid Foundation Logo" className="h-10 w-auto" />
            <Link href="/" className="flex items-center space-x-1">
              <span className="text-xl font-bold text-emerald-800">Wahid</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-emerald-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: Auth Actions */}
        <div className="hidden xl:flex items-center space-x-4">
          <SignedOut>
            <Link
              href="/login"
              className="px-6 py-2 border border-emerald-700 rounded-lg hover:bg-emerald-50 text-emerald-700"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Sign Up
            </Link>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center space-x-2">
              {/* ✅ Wrapped profile in a Link */}
              <Link href="/profile" className="flex items-center space-x-2">
                <img
                  src={user?.imageUrl}
                  alt="Profile"
                  className="h-10 w-10 rounded-full border hover:ring-2 hover:ring-emerald-400"
                />
                <span className="text-sm text-gray-700">{user?.firstName}</span>
              </Link>
            </div>
          </SignedIn>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="xl:hidden text-gray-700"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden px-4 pb-4">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-emerald-600"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-3 space-y-2">
              <SignedOut>
                <Link
                  href="/login"
                  className="block text-center border border-emerald-300 rounded px-4 py-2 text-emerald-700 hover:bg-emerald-50"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block text-center rounded px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </SignedOut>

              <SignedIn>
                {/* ✅ Wrapped profile in a Link for mobile too */}
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 justify-center"
                  onClick={() => setIsOpen(false)}
                >
                  <img
                    src={user?.imageUrl}
                    alt="Profile"
                    className="h-10 w-10 rounded-full border hover:ring-2 hover:ring-emerald-400"
                  />
                  <span className="text-sm text-gray-700">{user?.firstName}</span>
                </Link>
              </SignedIn>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
