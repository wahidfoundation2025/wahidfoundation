"use client"; // only if you're using Next.js App Router

import { Heart, Gift, Coins, Target } from "lucide-react";
import Link from "next/link";

export const MobileDonationCategories = () => {
  const categories = [
    {
      icon: Heart,
      title: "General Donation",
      description:
        "Support our overall mission and let us allocate funds where they're needed most",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      buttonColor: "bg-emerald-600 hover:bg-emerald-700",
    },
    {
      icon: Gift,
      title: "Zakat",
      description:
        "Fulfill your Islamic obligation of Zakat through our verified and transparent programs",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      icon: Coins,
      title: "Sadqa",
      description:
        "Give voluntary charity (Sadqa) to earn rewards and help those in need",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      buttonColor: "bg-amber-600 hover:bg-amber-700",
    },
    {
      icon: Target,
      title: "Interest Earnings",
      description:
        "Donate your interest earnings to purify your wealth according to Islamic principles",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
    },
  ];

  return (
    <section className="py-8 px-4 bg-white lg:py-16 lg:px-8">
      <div className="lg:max-w-6xl lg:mx-auto">
        {/* Heading */}
        <div className="mb-6 lg:mb-12 lg:text-center">
          <h2 className="text-2xl font-bold text-emerald-800 mb-2 lg:text-4xl lg:mb-4">
            Choose Your Donation Type
          </h2>
          <p className="text-sm text-gray-600 lg:text-xl lg:max-w-2xl lg:mx-auto">
            Select the category that aligns with your intention and Islamic principles
          </p>
          <div className="h-1 w-12 bg-amber-500 mt-2 lg:w-24 lg:mx-auto"></div>
        </div>

        {/* Cards */}
        <div className="space-y-4 mb-6 lg:grid lg:grid-cols-2 xl:grid-cols-4 lg:gap-6 lg:space-y-0 lg:mb-12">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`${category.bgColor} rounded-lg p-4 hover:shadow-md transition-shadow lg:hover:shadow-xl lg:hover:scale-105 lg:transition-all lg:duration-300`}
            >
              <div className="text-center">
                <div className="w-14 h-14 lg:w-20 lg:h-20 rounded-full bg-white flex items-center justify-center mx-auto mb-3 lg:mb-4 shadow-sm">
                  <category.icon className={`h-7 w-7 lg:h-10 lg:w-10 ${category.color}`} />
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-2">
                  {category.title}
                </h3>
                <p className="text-xs lg:text-sm text-gray-600 leading-relaxed mb-4">
                  {category.description}
                </p>
                <Link
                  href={`/donate?category=${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`block text-center w-full text-white text-xs lg:text-base font-semibold py-2 lg:py-3 rounded-md ${category.buttonColor}`}
                >
                  Donate Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="text-center p-4 bg-emerald-50 rounded-lg lg:p-8 lg:rounded-2xl">
          <h3 className="text-lg font-semibold text-emerald-800 mb-2 lg:text-2xl lg:mb-4">
            Start Your Daily Giving Journey
          </h3>
          <p className="text-xs text-gray-600 mb-3 lg:text-base lg:mb-6 lg:max-w-2xl lg:mx-auto">
            Commit to a daily amount and make a lasting impact. Every rupee counts!
          </p>
          <Link
            href="/donate"
            className="inline-block w-full lg:w-auto bg-emerald-600 hover:bg-emerald-700 text-white text-sm lg:text-lg font-semibold py-2 lg:py-3 px-6 rounded-md transition-all"
          >
            Begin with ₹1/Day
          </Link>
        </div>
      </div>
    </section>
  );
};
