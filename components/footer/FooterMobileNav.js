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
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-3 md:hidden">
      <nav className="glass w-full max-w-md rounded-full px-2 py-1.5">
        <ul className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive =
              item.path === "/"
                ? pathname === "/"
                : pathname.startsWith(item.path);
            const Icon = item.icon;
            return (
              <li key={item.path} className="flex-1">
                <Link
                  href={item.path}
                  className={`flex flex-col items-center gap-0.5 rounded-full px-1 py-1.5 transition-colors ${
                    isActive ? "text-emerald-700" : "text-gray-500"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                      isActive ? "bg-emerald-600 text-white" : ""
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="text-[10px] font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
