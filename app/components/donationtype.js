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

        {/* Categories */}
        <div className="space-y-4 mb-6 lg:grid lg:grid-cols-2 xl:grid-cols-4 lg:gap-6 lg:space-y-0 lg:mb-12">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`${category.bgColor} border-0 rounded-lg shadow-sm hover:shadow-md transition-shadow lg:hover:shadow-xl lg:hover:scale-105 lg:transition-all lg:duration-300`}
            >
              {/* Card Header */}
              <div className="text-center p-4 lg:p-6">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mx-auto mb-3 shadow-sm lg:w-20 lg:h-20 lg:mb-4">
                  <category.icon className={`h-7 w-7 ${category.color} lg:h-10 lg:w-10`} />
                </div>
                <h3 className="text-lg text-gray-800 lg:text-xl font-semibold">
                  {category.title}
                </h3>
              </div>

              {/* Card Content */}
              <div className="text-center space-y-3 p-4 pt-0 lg:p-6 lg:pt-0 lg:space-y-4">
                <p className="text-xs text-gray-600 leading-relaxed lg:text-sm lg:leading-relaxed">
                  {category.description}
                </p>
                <Link
                  href={`/donations/${category.title}`}
                  className={`w-full inline-flex items-center justify-center px-4 py-2 text-white rounded-md text-xs h-8 ${category.buttonColor} lg:h-11 lg:text-base lg:font-semibold`}
                >
                  Donate Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Daily Giving Section */}
        <div className="text-center p-4 bg-emerald-50 rounded-lg lg:p-8 lg:rounded-2xl">
          <h3 className="text-lg font-semibold text-emerald-800 mb-2 lg:text-2xl lg:mb-4">
            Start Your Daily Giving Journey
          </h3>
          <p className="text-xs text-gray-600 mb-3 lg:text-base lg:mb-6 lg:max-w-2xl lg:mx-auto">
            Commit to a daily amount and make a lasting impact. Every rupee counts!
          </p>
          <Link
            href="/donate"
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-md px-4 py-2 text-sm w-full inline-flex items-center justify-center lg:w-auto lg:px-12 lg:py-6 lg:text-lg lg:font-semibold"
          >
            Begin with ₹1/Day
          </Link>
        </div>
      </div>
    </section>
  );
}
