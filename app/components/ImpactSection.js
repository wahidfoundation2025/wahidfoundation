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
        const res = await fetch("https://wahidfoundationadmin.vercel.app/api/homeimpactsection");
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
      <section className="py-10 px-4 bg-white min-h-[200px] flex items-center justify-center">
        <span className="text-gray-400">Loading...</span>
      </section>
    );
  }

  return (
    <section className="lg:py-32 py-10 px-4 bg-slate-50">
      <div className="text-center mb-8">
        <h2 className="text-2xl lg:text-4xl font-bold text-emerald-800 mb-2">
          {impact.title}
        </h2>
        <p className="text-sm lg:text-base text-gray-600">
          {impact.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 px-36 mx-auto">
        {impact.stats?.map((stat, index) => {
          const Icon = ICONS[stat.icon] || Users;
          return (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 p-10 text-center shadow-sm hover:shadow-md transition-shadow duration-200 lg:mt-8"
            >
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-3">
                <Icon className="h-8 w-8" style={{ color: stat.color }} />
              </div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="font-semibold text-gray-700 text-base mt-1">{stat.title}</div>
              <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
