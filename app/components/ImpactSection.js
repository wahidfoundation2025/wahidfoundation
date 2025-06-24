"use client";

import { GraduationCap, Heart, Building, Users } from "lucide-react";

export default function ImpactStats() {
  const stats = [
    {
      icon: Users,
      title: "Lives Impacted",
      value: "25,000+",
      description: "People benefited from our projects",
      color: "text-emerald-600"
    },
    {
      icon: GraduationCap,
      title: "Education Success",
      value: "1,200+",
      description: "Students supported in education",
      color: "text-blue-600"
    },
    {
      icon: Heart,
      title: "Healthcare",
      value: "5,000+",
      description: "Lives saved through health initiatives",
      color: "text-red-600"
    },
    {
      icon: Building,
      title: "Businesses Supported",
      value: "800+",
      description: "Enterprises empowered",
      color: "text-amber-600"
    }
  ];

  return (
    <section className="py-10 px-4 bg-white">
      <div className="text-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-emerald-800 mb-2">
          Our Impact So Far
        </h2>
        <p className="text-sm lg:text-base text-gray-600">
          See how your contributions make a difference
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-3">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div className="text-xl font-bold text-gray-800">{stat.value}</div>
            <div className="font-semibold text-gray-700 text-sm mt-1">{stat.title}</div>
            <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
