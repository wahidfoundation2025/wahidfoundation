"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Heart } from "lucide-react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";

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
    { href: "/terms", label: "Terms & Conditions" },
    { href: "/policy", label: "Policy" },
  ];

  return (
    <header className="bg-white border-b border-emerald-100 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-2 py-4 flex items-center justify-between">
        {/* Left: Logo + Nav */}
        <div className="flex items-center space-x-6">
          <img src={"/logo.png"} alt="Wahid Foundation Logo" className="h-10 w-auto" />
          <Link href="/" className="flex items-center space-x-1">
            <span className="text-xl font-bold text-emerald-800">Wahid</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
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
        <div className="hidden md:flex items-center space-x-4">
          <SignedOut>
            <Link
              href="/login"
              className="px-4 py-2 border border-emerald-200 rounded hover:bg-emerald-50 text-emerald-700"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Sign Up
            </Link>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center space-x-2">
              <UserButton afterSignOutUrl="/" />
              <span className="text-sm text-gray-700">
                {user?.firstName}
              </span>
            </div>
          </SignedIn>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
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
                  className="block text-center border border-emerald-200 rounded px-4 py-2 text-emerald-700 hover:bg-emerald-50"
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
                <div className="flex items-center space-x-2 justify-center">
                  <UserButton afterSignOutUrl="/" />
                  <span className="text-sm text-gray-700">
                    {user?.firstName}
                  </span>
                </div>
              </SignedIn>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}