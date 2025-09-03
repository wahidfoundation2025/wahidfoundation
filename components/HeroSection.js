"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Users, Calendar, ArrowRight } from "lucide-react";
import ProjectCardsSection from "./Project";

const ICONS = {
  Calendar: Calendar,
  Users: Users,
  Heart: Heart,
};

function lightenHexColor(hex, percent = 0.2) {
  // Remove # if present
  hex = hex.replace(/^#/, '');

  // Parse r, g, b values
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Calculate lighter shade by blending with white
  r = Math.round(r + (255 - r) * percent);
  g = Math.round(g + (255 - g) * percent);
  b = Math.round(b + (255 - b) * percent);

  // Ensure 2-digit hex format
  return `#${r.toString(16).padStart(2, '0')}${g
    .toString(16)
    .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

const HeroSection = () => {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    async function fetchHero() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/homeherosection`);
        const data = await res.json();
        setHero(data);
      } catch (e) {
        setHero(null);
      }
    }
    fetchHero();
  }, []);

  if (!hero) {
    return (
      <section className="relative bg-white min-h-[400px] flex items-center justify-center">
        <span className="text-gray-400">Loading...</span>
      </section>
    );
  }

  return (
    <section className="relative bg-white">
      <div className="relative">
        {/* Top CTA */}
        <div className="bg-emerald-600 text-white px-5 lg:py-40 py-20">
          <div className="max-w-md mx-auto lg:max-w-4xl space-y-6 lg:space-y-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-center lg:text-5xl lg:leading-tight">
              {hero.title}
            </h1>
            <p className="text-emerald-50 text-base leading-relaxed lg:text-xl lg:max-w-2xl lg:mx-auto lg:text-center">
              {hero.subtitle}
            </p>

            <div className="lg:flex lg:justify-center">
              <Link
                href="/donate"
                className="bg-white text-emerald-600 hover:bg-emerald-50 w-full lg:w-auto lg:px-12 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 mt-2 rounded-xl"
              >
                {hero.ctaText}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="px-5 py-20 bg-white lg:px-8 lg:py-32">
          <div className="mx-auto space-y-8 lg:space-y-12 xl:px-36">
            <div className="grid grid-cols-3 gap-4 lg:gap-8 lg:mx-auto">
              {Object.values(hero.stats).map((stat, i) => (
                <div
                  className={`text-center${i === 1 ? " border-x border-gray-100" : ""
                    }`}
                  key={stat.label}
                >
                  <div className="text-2xl font-bold text-emerald-600 mb-1.5 sm:text-4xl sm:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-600 font-medium sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Impact Cards */}
            <div className="gap-4 grid sm:grid-cols-3 grid-cols-1 lg:gap-6 lg:space-y-0">
              {hero.cards?.map((card, idx) => {
                const Icon = ICONS[card.icon] || Heart;
                const bg = lightenHexColor(card.themeColor || "#10b981", 0.85);
                const iconBg = card.themeColor || "#059669";
                const titleColor = card.themeColor || "#065F46"; // fallback to emerald-800
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl shadow-sm hover:shadow-md transition duration-200 active:scale-[0.98] sm:p-8 p-4 flex sm:flex-col items-center gap-5 lg:text-center lg:gap-4`}
                    style={{ backgroundColor: bg }}
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center lg:w-16 lg:h-16"
                      style={{ backgroundColor: iconBg }}
                    >
                      <Icon className="h-6 w-6 text-white lg:h-8 lg:w-8" />
                    </div>
                    <div className="text-left space-y-1 lg:text-center">
                      <h3 className="font-semibold lg:text-lg" style={{ color: titleColor }}>
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

            {/* Secondary CTA */}

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
