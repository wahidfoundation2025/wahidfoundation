"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Heart } from "lucide-react";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/impact", label: "Our Impact" },
  { href: "/about", label: "About" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/blogs", label: "Blogs" },
];

export default function Headers() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useUser();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4">
        <div
          className={`glass flex w-full max-w-6xl items-center justify-between gap-3 rounded-full pl-3 pr-3 transition-all duration-300 ${
            scrolled ? "py-1.5 sm:py-2" : "py-2 sm:py-2.5"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2 pl-1">
            <img
              src="/logo.png"
              alt="Wahid Foundation"
              className="h-8 w-auto sm:h-9"
            />
            <span className="font-display text-lg font-800 font-bold tracking-tight text-emerald-900 sm:text-xl">
              Wahid
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 xl:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-emerald-900/80 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/donate"
              className="hidden items-center gap-1.5 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(5,150,105,0.7)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
            >
              <Heart className="h-4 w-4" fill="currentColor" />
              Donate
            </Link>

            <SignedOut>
              <Link
                href="/login"
                className="hidden rounded-full px-4 py-2 text-sm font-medium text-emerald-800 transition-colors hover:bg-emerald-50 xl:inline-flex"
              >
                Login
              </Link>
            </SignedOut>

            <SignedIn>
              <Link
                href="/profile"
                className="hidden items-center gap-2 rounded-full p-0.5 pr-3 transition-colors hover:bg-emerald-50 xl:flex"
              >
                <img
                  src={user?.imageUrl}
                  alt="Profile"
                  className="h-8 w-8 rounded-full border border-emerald-100 object-cover"
                />
                <span className="text-sm font-medium text-emerald-900">
                  {user?.firstName}
                </span>
              </Link>
            </SignedIn>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-full text-emerald-800 transition-colors hover:bg-emerald-50 xl:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-[60] xl:hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setIsOpen(false)}
          className={`absolute inset-0 bg-emerald-950/40 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Sheet */}
        <div
          className={`absolute inset-x-3 top-3 origin-top rounded-3xl bg-white p-5 shadow-2xl transition-all duration-300 ${
            isOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "-translate-y-4 scale-95 opacity-0"
          }`}
        >
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2"
            >
              <img src="/logo.png" alt="Wahid" className="h-9 w-auto" />
              <span className="font-display text-xl font-bold text-emerald-900">
                Wahid
              </span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-full text-emerald-800 hover:bg-emerald-50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-5 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-2xl px-4 py-3 text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-emerald-600 text-white"
                    : "text-emerald-900 hover:bg-emerald-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 space-y-2 border-t border-emerald-50 pt-4">
            <Link
              href="/donate"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 px-4 py-3 text-base font-semibold text-white"
            >
              <Heart className="h-4 w-4" fill="currentColor" />
              Donate Now
            </Link>

            <SignedOut>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center rounded-full border border-emerald-200 px-4 py-3 text-base font-medium text-emerald-800 hover:bg-emerald-50"
              >
                Login
              </Link>
            </SignedOut>

            <SignedIn>
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-emerald-200 px-4 py-3 text-base font-medium text-emerald-900 hover:bg-emerald-50"
              >
                <img
                  src={user?.imageUrl}
                  alt="Profile"
                  className="h-7 w-7 rounded-full border border-emerald-100 object-cover"
                />
                {user?.firstName || "Profile"}
              </Link>
            </SignedIn>
          </div>
        </div>
      </div>
    </>
  );
}
