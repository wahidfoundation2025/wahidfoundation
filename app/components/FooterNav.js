"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BarChart4,
  Heart,
  Info,
  TrendingUp,
} from "lucide-react";

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
]

export default function FooterNav() {
  const pathname = usePathname();

  return (
    <>
      <nav className="bg-emerald-800 hidden w-full border-t border-gray-200 shadow-lg z-50 md:block">
        <div className="flex flex-row items-start gap-20 py-14 px-56">
          <div className="flex flex-col gap-2 items-start">
            {navItems.map((item) => (
              <Link
                href={item.path}
                key={item.path}>
                <button className="cursor-pointer hover:underline">{item.label}</button>
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {Others.map((item) => (
              <Link
                href={item.path}
                key={item.path}>
                <button className="cursor-pointer hover:underline">{item.label}</button>
              </Link>
            ))}
          </div>
        </div>

        <p className="text-center pb-4 text-white">All rights reserved - &copy; {new Date().getFullYear()}</p>
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
                  className={`flex flex-col items-center pt-2 pb-1 px-1 transition-colors ${isActive ? "text-emerald-600" : "text-gray-500"
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
