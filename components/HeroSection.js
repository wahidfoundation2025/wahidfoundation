"use client";

import { Heart, Users, Calendar, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

const ICONS = { Calendar, Users, Heart };

const HERO_BANNER =
  "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1920&q=80";

function lightenHexColor(hex, percent = 0.2) {
  if (!hex) return "#e5e5e5";
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

function SkeletonBox({ className }) {
  return (
    <div className={clsx("animate-pulse rounded-md bg-white/20", className)} />
  );
}

export default function HeroSection({ hero }) {
  const isLoading = !hero;

  return (
    <section className="relative bg-white">
      {/* ---------------- Banner ---------------- */}
      <div className="relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={HERO_BANNER}
            alt="Wahid Foundation — transforming communities"
            className="h-full w-full object-cover"
          />
          {/* Emerald wash + darkening for legibility */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/90 via-emerald-900/78 to-emerald-800/68" />
          <div className="absolute inset-0 bg-[radial-gradient(130%_90%_at_50%_10%,transparent_30%,rgba(2,44,34,0.6)_100%)]" />
        </div>

        {/* Content */}
        <div className="relative container-x pb-24 pt-32 sm:pb-28 sm:pt-40 lg:pb-36 lg:pt-48">
          <div className="mx-auto max-w-3xl text-center">
            {isLoading ? (
              <div className="space-y-6">
                <SkeletonBox className="mx-auto h-6 w-40" />
                <SkeletonBox className="mx-auto h-14 w-3/4" />
                <SkeletonBox className="mx-auto h-6 w-2/3" />
                <SkeletonBox className="mx-auto mt-4 h-12 w-48 rounded-full" />
              </div>
            ) : (
              <>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-50 backdrop-blur-sm animate-fade-up">
                  <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                  Re.1 a day · Lasting change
                </span>

                <h1 className="mt-6 font-display text-4xl font-800 font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl animate-fade-up">
                  {hero?.title}
                </h1>

                <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-emerald-50/90 sm:text-lg animate-fade-up">
                  {hero?.subtitle}
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-up">
                  <Link
                    href="/donate"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-emerald-700 shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl active:scale-[0.98] sm:w-auto"
                  >
                    {hero?.ctaText || "Donate Now"}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/projects"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/15 sm:w-auto"
                  >
                    Explore Projects
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

      </div>

      {/* ---------------- Stats floating over banner edge ---------------- */}
      <div className="container-x relative z-10 -mt-14 sm:-mt-16">
        <div className="rounded-3xl border border-emerald-50 bg-white px-6 py-8 shadow-[0_24px_60px_-28px_rgba(4,47,34,0.5)] sm:px-10 sm:py-10">
          <div className="grid grid-cols-3 gap-4 lg:gap-8">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-2 text-center">
                    <div className="mx-auto h-8 w-16 animate-pulse rounded bg-emerald-100" />
                    <div className="mx-auto h-4 w-20 animate-pulse rounded bg-emerald-50" />
                  </div>
                ))
              : Object.values(hero.stats || {}).map((stat, i) => (
                  <div
                    key={stat.label}
                    className={clsx(
                      "text-center",
                      i === 1 && "border-x border-emerald-100"
                    )}
                  >
                    <div className="font-display text-3xl font-bold text-emerald-600 sm:text-4xl lg:text-5xl">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs font-medium text-gray-600 sm:text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>

      {/* ---------------- Impact cards ---------------- */}
      <div className="container-x py-16 sm:py-20 lg:py-24">
        <div className="grid gap-5 sm:grid-cols-3 lg:gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="card-soft flex items-center gap-5 p-6 sm:flex-col sm:p-8"
                >
                  <div className="h-14 w-14 shrink-0 animate-pulse rounded-full bg-emerald-100" />
                  <div className="w-full space-y-2">
                    <div className="h-5 w-1/2 animate-pulse rounded bg-emerald-100" />
                    <div className="h-4 w-full animate-pulse rounded bg-emerald-50" />
                    <div className="h-4 w-3/4 animate-pulse rounded bg-emerald-50" />
                  </div>
                </div>
              ))
            : hero?.cards?.map((card, idx) => {
                const Icon = ICONS[card.icon] || Heart;
                const bg = lightenHexColor(card.themeColor || "#10b981", 0.9);
                const iconBg = card.themeColor || "#059669";
                const titleColor = card.themeColor || "#065F46";
                return (
                  <div
                    key={idx}
                    className="card-soft flex items-center gap-5 p-6 sm:flex-col sm:p-8 sm:text-center"
                    style={{ background: `linear-gradient(180deg, ${bg}, #ffffff)` }}
                  >
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-sm lg:h-16 lg:w-16"
                      style={{ backgroundColor: iconBg }}
                    >
                      <Icon className="h-6 w-6 text-white lg:h-7 lg:w-7" />
                    </div>
                    <div className="space-y-1 sm:text-center">
                      <h3
                        className="font-display text-lg font-bold"
                        style={{ color: titleColor }}
                      >
                        {card.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-600 lg:text-base">
                        {card.description}
                      </p>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
