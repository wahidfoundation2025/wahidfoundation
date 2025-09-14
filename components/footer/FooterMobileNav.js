"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart4, Heart, Info, TrendingUp } from "lucide-react";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/projects", icon: BarChart4, label: "Projects" },
  { path: "/donate", icon: Heart, label: "Donate" },
  { path: "/impact", icon: TrendingUp, label: "Impact" },
  { path: "/about", icon: Info, label: "About" },
];

export default function FooterMobileNav() {
  const pathname = usePathname();

  return (
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
  );
}
