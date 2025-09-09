import { Heart, Gift, Coins, Target } from "lucide-react";
import Link from "next/link";

export default function MobileDonationCategories() {
  const categories = [
    {
      icon: Heart,
      title: "General Donation",
      description: "Support our overall mission and let us allocate funds where they're needed most",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      buttonColor: "bg-emerald-600 hover:bg-emerald-700"
    },
    {
      icon: Gift,
      title: "Zakat",
      description: "Fulfill your Islamic obligation of Zakat through our verified and transparent programs",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      icon: Coins,
      title: "Sadqa",
      description: "Give voluntary charity (Sadqa) to earn rewards and help those in need",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      buttonColor: "bg-amber-600 hover:bg-amber-700"
    },
    {
      icon: Target,
      title: "Interest Earnings",
      description: "Donate your interest earnings to purify your wealth according to Islamic principles",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      buttonColor: "bg-purple-600 hover:bg-purple-700"
    }
  ];

  return (
    <section className="py-10 px-4 bg-white sm:py-16 sm:px-8">
      <div className="sm:max-w-6xl sm:mx-auto">
        {/* Heading */}
        <div className="mb-6 sm:mb-12 sm:text-center">
          <h2 className="text-2xl font-bold text-emerald-800 mb-2 sm:text-4xl sm:mb-4">
            Choose Your Donation Type
          </h2>
          <p className="text-sm text-gray-600 sm:text-xl sm:max-w-2xl sm:mx-auto">
            Select the category that aligns with your intention and Islamic principles
          </p>
          <div className="h-1 w-12 bg-amber-500 mt-2 sm:w-24 sm:mx-auto"></div>
        </div>

        {/* Categories */}
        <div className="gap-4 sm:gap-6 mb-6 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 sm:space-y-0 sm:mb-12">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`${category.bgColor} border-0 rounded-lg shadow-sm hover:shadow-md transition-shadow sm:hover:shadow-md sm:hover:scale-101 sm:transition-all sm:duration-300`}
            >
              {/* Card Header */}
              <div className="text-center p-4 sm:p-6">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mx-auto mb-3 shadow-sm sm:w-20 sm:h-20 sm:mb-4">
                  <category.icon className={`h-7 w-7 ${category.color} sm:h-10 sm:w-10`} />
                </div>
                <h3 className="text-lg text-gray-800 sm:text-xl font-semibold">
                  {category.title}
                </h3>
              </div>

              {/* Card Content */}
              <div className="text-center space-y-3 p-4 pt-0 sm:p-6 sm:pt-0 sm:space-y-4">
                <p className="text-xs text-gray-600 leading-relaxed sm:text-sm sm:leading-relaxed">
                  {category.description}
                </p>
                <Link
                  href={{
                    pathname: "/projects",
                    query:
                    {
                      title: category.title === "General Donation"
                        ? "general"
                        : category.title === "Zakat"
                          ? "zakat"
                          : category.title === "Sadqa" ?
                            "sadqa"
                            : "interest_earnings"
                    },
                  }}
                  className={`w-full inline-flex items-center justify-center px-4 py-2 text-white rounded-md text-xs h-8 ${category.buttonColor} sm:h-11 sm:text-base sm:font-semibold transition-colors`}
                >
                  Donate Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Daily Giving Section */}
        <div className="text-center p-4 bg-emerald-50 rounded-lg sm:p-8 sm:rounded-2xl">
          <h3 className="text-lg font-semibold text-emerald-800 mb-2 sm:text-2xl sm:mb-4">
            Start Your Daily Giving Journey
          </h3>
          <p className="text-xs text-gray-600 mb-3 sm:text-base sm:mb-6 sm:max-w-2xl sm:mx-auto">
            Commit to a daily amount and make a lasting impact. Every rupee counts!
          </p>
          <Link
            href="/projects/general-sadqa-fund"
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-4 py-2 text-sm w-full inline-flex items-center justify-center sm:w-auto sm:px-12 sm:py-4 sm:text-lg sm:font-semibold"
          >
            Begin with ₹1/Day
          </Link>
        </div>
      </div>
    </section>
  );
}
