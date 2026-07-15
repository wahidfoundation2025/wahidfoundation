import { Heart, Gift, Coins, Target } from "lucide-react";
import Link from "next/link";

export default function MobileDonationCategories() {
  const categories = [
    {
      icon: Heart,
      title: "General Donation",
      description: "Support our overall mission and let us allocate funds where they're needed most",
      color: "#059669",
      tint: "#ecfdf5",
    },
    {
      icon: Gift,
      title: "Zakat",
      description: "Fulfill your Islamic obligation of Zakat through our verified and transparent programs",
      color: "#2563eb",
      tint: "#eff6ff",
    },
    {
      icon: Coins,
      title: "Sadqa",
      description: "Give voluntary charity (Sadqa) to earn rewards and help those in need",
      color: "#d97706",
      tint: "#fffbeb",
    },
    {
      icon: Target,
      title: "Interest Earnings",
      description: "Donate your interest earnings to purify your wealth according to Islamic principles",
      color: "#7c3aed",
      tint: "#f5f3ff",
    }
  ];

  return (
    <section className="bg-white px-5 py-16 sm:px-8 sm:py-24">
      <div className="container-x">
        {/* Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <span className="eyebrow justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Ways to Give
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-emerald-900 sm:text-4xl">
            Choose Your Donation Type
          </h2>
          <p className="mt-3 text-sm text-gray-600 sm:text-lg">
            Select the category that aligns with your intention and Islamic principles
          </p>
        </div>

        {/* Categories */}
        <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:mb-14 lg:grid-cols-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="card-soft flex flex-col p-6 text-center sm:p-7"
            >
              <div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl sm:h-18 sm:w-18"
                style={{ backgroundColor: category.tint }}
              >
                <category.icon className="h-8 w-8" style={{ color: category.color }} />
              </div>
              <h3 className="font-display text-lg font-bold text-emerald-900 sm:text-xl">
                {category.title}
              </h3>
              <p className="mt-2 flex-grow text-sm leading-relaxed text-gray-600">
                {category.description}
              </p>
              <Link
                href={{
                  pathname: "/projects",
                  query: {
                    title:
                      category.title === "General Donation"
                        ? "general"
                        : category.title === "Zakat"
                        ? "zakat"
                        : category.title === "Sadqa"
                        ? "sadqa"
                        : "interest_earnings",
                  },
                }}
                className="mt-5 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: category.color }}
              >
                Donate Now
              </Link>
            </div>
          ))}
        </div>

        {/* Daily Giving Section */}
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-600 to-emerald-800 p-8 text-center sm:p-12">
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Start Your Daily Giving Journey
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-emerald-50 sm:text-base">
              Commit to a daily amount and make a lasting impact. Every rupee counts!
            </p>
            <Link
              href="/projects/general-sadqa-fund"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-bold text-emerald-700 shadow-lg transition-transform hover:-translate-y-0.5 sm:w-auto sm:px-12"
            >
              Begin with ₹1/Day
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
