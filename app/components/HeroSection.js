"use client";

import Link from "next/link";
import { Heart, Users, Calendar, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-white">
      <div className="relative">
        {/* Top CTA */}
        <div className="bg-emerald-600 text-white px-5 pt-8 pb-10 lg:py-16">
          <div className="max-w-md mx-auto lg:max-w-4xl space-y-6 lg:space-y-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-center lg:text-5xl lg:leading-tight">
              Transform Lives with Just ₹1/day
            </h1>
            <p className="text-emerald-50 text-base leading-relaxed lg:text-xl lg:max-w-2xl lg:mx-auto lg:text-center">
              Join 10,000+ donors making a real difference across India. Start your impact journey today.
            </p>
            <div className="lg:flex lg:justify-center">
              <Link
                href="/donate"
                className="bg-white text-emerald-600 hover:bg-emerald-50 w-full lg:w-auto lg:px-12 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 mt-2 rounded-lg"
              >
                Start Giving Now
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="px-5 py-8 bg-white lg:px-8 lg:py-12">
          <div className="max-w-md mx-auto lg:max-w-4xl space-y-8 lg:space-y-12">
            <div className="grid grid-cols-3 gap-4 lg:gap-8 lg:max-w-2xl lg:mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600 mb-1.5 lg:text-4xl lg:mb-2">₹1</div>
                <div className="text-xs text-gray-600 font-medium lg:text-sm">Per Day</div>
              </div>
              <div className="text-center border-x border-gray-100">
                <div className="text-2xl font-bold text-emerald-600 mb-1.5 lg:text-4xl lg:mb-2">25K+</div>
                <div className="text-xs text-gray-600 font-medium lg:text-sm">Lives Changed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600 mb-1.5 lg:text-4xl lg:mb-2">14</div>
                <div className="text-xs text-gray-600 font-medium lg:text-sm">States</div>
              </div>
            </div>

            {/* Impact Cards */}
            <div className="space-y-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
              <div className="rounded-lg bg-emerald-50 shadow-sm hover:shadow-md transition duration-200 active:scale-[0.98] p-5 flex items-center gap-5 lg:flex-col lg:text-center lg:gap-4">
                <div className="bg-emerald-600 w-14 h-14 rounded-full flex items-center justify-center lg:w-16 lg:h-16">
                  <Calendar className="h-7 w-7 text-white lg:h-8 lg:w-8" />
                </div>
                <div className="text-left space-y-1 lg:text-center">
                  <h3 className="font-semibold text-emerald-800 lg:text-lg">Daily Impact</h3>
                  <p className="text-sm text-gray-600 lg:text-base leading-relaxed">
                    Your ₹1 creates lasting change every day
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-amber-50 shadow-sm hover:shadow-md transition duration-200 active:scale-[0.98] p-5 flex items-center gap-5 lg:flex-col lg:text-center lg:gap-4">
                <div className="bg-amber-600 w-14 h-14 rounded-full flex items-center justify-center lg:w-16 lg:h-16">
                  <Users className="h-7 w-7 text-white lg:h-8 lg:w-8" />
                </div>
                <div className="text-left space-y-1 lg:text-center">
                  <h3 className="font-semibold text-amber-800 lg:text-lg">Community Power</h3>
                  <p className="text-sm text-gray-600 lg:text-base leading-relaxed">
                    Join thousands making a difference
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-emerald-50 shadow-sm hover:shadow-md transition duration-200 active:scale-[0.98] p-5 flex items-center gap-5 lg:flex-col lg:text-center lg:gap-4">
                <div className="bg-emerald-600 w-14 h-14 rounded-full flex items-center justify-center lg:w-16 lg:h-16">
                  <Heart className="h-7 w-7 text-white lg:h-8 lg:w-8" />
                </div>
                <div className="text-left space-y-1 lg:text-center">
                  <h3 className="font-semibold text-emerald-800 lg:text-lg">Real Results</h3>
                  <p className="text-sm text-gray-600 lg:text-base leading-relaxed">
                    Track your impact in real-time
                  </p>
                </div>
              </div>
            </div>

            {/* Secondary CTA */}
           <div className="pt-2 w-full flex justify-center">
  <Link
    href="/projects"
    className="w-full max-w-md lg:w-auto text-center px-6 lg:px-12 py-4 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold transition-all duration-200 active:scale-[0.98] rounded-lg"
  >
    See Our Projects
  </Link>
</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
