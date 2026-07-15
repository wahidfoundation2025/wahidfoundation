"use client";

import { useEffect, useState } from "react";
import { GraduationCap, Heart, Building, Users } from "lucide-react";

const ICONS = {
  Users,
  GraduationCap,
  Heart,
  Building,
};

export default function ImpactStats() {
  const [impact, setImpact] = useState(null);

  useEffect(() => {
    async function fetchImpact() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/homeimpactsection`,
          {
            cache: "force-cache",
          }
        );
        const data = await res.json();
        setImpact(data);
      } catch (e) {
        setImpact(null);
      }
    }
    fetchImpact();
  }, []);

  if (!impact) {
    return (
      <section className="flex min-h-[200px] items-center justify-center bg-emerald-50/40 p-4 py-20">
        <span className="animate-pulse text-emerald-400">Loading impact…</span>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-emerald-50/50 to-white px-5 py-20 lg:px-8 lg:py-28">
      <div className="container-x">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Our Impact
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-emerald-900 lg:text-4xl">
            {impact.title}
          </h2>
          <p className="mt-3 text-sm text-gray-600 lg:text-base">
            {impact.subtitle}
          </p>
        </div>

        <div className="mx-auto grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {impact.stats?.map((stat, index) => {
            const Icon = ICONS[stat.icon] || Users;
            return (
              <div
                key={index}
                className="card-soft group p-8 text-center"
              >
                <div
                  className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${stat.color}1a` }}
                >
                  <Icon className="h-7 w-7" style={{ color: stat.color }} />
                </div>
                <div className="font-display text-3xl font-bold text-emerald-900">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm font-semibold text-gray-800 sm:text-base">
                  {stat.title}
                </div>
                <p className="mt-1.5 text-xs text-gray-500 sm:text-sm">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
