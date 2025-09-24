"use client";

import { Heart, Users, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

const ICONS = { Calendar, Users, Heart };

function lightenHexColor(hex, percent = 0.2) {
  if (!hex) return "#e5e5e5"; // fallback gray
  hex = hex.replace(/^#/, "");
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  r = Math.round(r + (255 - r) * percent);
  g = Math.round(g + (255 - g) * percent);
  b = Math.round(b + (255 - b) * percent);
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

// 🔹 Skeleton Component
function SkeletonBox({ className }) {
  return (
    <div className={clsx("animate-pulse bg-gray-100 rounded-md", className)} />
  );
}

export default function HeroSection({ hero }) {
  const isLoading = !hero;

  return (
    <section className="relative bg-white">
      <div className="relative">
        {/* Top CTA */}
        <div className="bg-emerald-600 text-white px-5 lg:py-40 py-20">
          <div className="max-w-md mx-auto lg:max-w-4xl space-y-6 lg:space-y-8">
            {isLoading ? (
              <>
                <SkeletonBox className="h-10 w-3/4 mx-auto" />
                <SkeletonBox className="h-6 w-2/3 mx-auto mt-4" />
                <SkeletonBox className="h-12 w-40 mx-auto mt-6 rounded-xl" />
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-center lg:text-5xl">
                  {hero?.title}
                </h1>
                <p className="text-emerald-50 text-base lg:text-xl lg:max-w-2xl lg:mx-auto lg:text-center">
                  {hero?.subtitle}
                </p>
                <div className="lg:flex lg:justify-center">
                  <Link
                    href="/donate"
                    className="bg-white text-emerald-600 hover:bg-emerald-50 w-full lg:w-auto lg:px-12 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 mt-2 rounded-xl"
                  >
                    {hero?.ctaText}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="px-5 py-20 bg-white lg:px-8 lg:py-32">
          <div className="mx-auto space-y-8 lg:space-y-12 xl:px-36">
            <div className="grid grid-cols-3 gap-4 lg:gap-8">
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="text-center space-y-2">
                      <SkeletonBox className="h-8 w-16 mx-auto" />
                      <SkeletonBox className="h-4 w-20 mx-auto" />
                    </div>
                  ))
                : Object.values(hero.stats || {}).map((stat, i) => (
                    <div
                      key={stat.label}
                      className={`text-center${
                        i === 1 ? " border-x border-gray-100" : ""
                      }`}
                    >
                      <div className="text-2xl font-bold text-emerald-600 sm:text-4xl">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-600 font-medium sm:text-sm">
                        {stat.label}
                      </div>
                    </div>
                  ))}
            </div>

            {/* Impact Cards */}
            <div className="grid sm:grid-cols-3 gap-4 lg:gap-6">
              {isLoading
                ? Array.from({ length: 3 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl shadow-sm sm:p-8 p-4 flex sm:flex-col items-center gap-5"
                    >
                      <SkeletonBox className="w-14 h-14 rounded-full" />
                      <div className="space-y-2 w-full">
                        <SkeletonBox className="h-5 w-1/2" />
                        <SkeletonBox className="h-4 w-full" />
                        <SkeletonBox className="h-4 w-3/4" />
                      </div>
                    </div>
                  ))
                : hero?.cards?.map((card, idx) => {
                    const Icon = ICONS[card.icon] || Heart;
                    const bg = lightenHexColor(
                      card.themeColor || "#10b981",
                      0.85
                    );
                    const iconBg = card.themeColor || "#059669";
                    const titleColor = card.themeColor || "#065F46";
                    return (
                      <div
                        key={idx}
                        className="rounded-2xl shadow-sm hover:shadow-md transition duration-200 active:scale-[0.98] sm:p-8 p-4 flex sm:flex-col items-center gap-5 lg:text-center lg:gap-4"
                        style={{ backgroundColor: bg }}
                      >
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center lg:w-16 lg:h-16"
                          style={{ backgroundColor: iconBg }}
                        >
                          <Icon className="h-6 w-6 text-white lg:h-8 lg:w-8" />
                        </div>
                        <div className="text-left space-y-1 lg:text-center">
                          <h3
                            className="font-semibold lg:text-lg"
                            style={{ color: titleColor }}
                          >
                            {card.title}
                          </h3>
                          <p className="text-sm text-gray-600 lg:text-base leading-relaxed">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}