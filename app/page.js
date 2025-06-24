import HeroSection from "./components/HeroSection";
import ImpactStats from "./components/ImpactSection";
import { MobileDonationCategories} from "./components/MobileDonationCategories";

import Link from "next/link";

export default function Home() {
  return (
     <div className="flex flex-col bg-white">
      <HeroSection />
        <div className="border-t border-gray-100">
        <ImpactStats />
      </div>
       <section className="py-10 px-5 lg:py-16 lg:px-8 bg-gradient-to-br from-amber-50 to-amber-100 text-center border-y border-amber-100">
        <div className="max-w-sm mx-auto lg:max-w-2xl space-y-4 lg:space-y-6">
          <div className="w-16 h-1 bg-amber-300 rounded-full mx-auto lg:w-24"></div>
          <p className="italic text-amber-900 font-medium text-base leading-relaxed lg:text-xl lg:leading-relaxed">
            "Whoever saves one life - it is as if he had saved mankind entirely."
          </p>
          <p className="text-sm text-amber-700 lg:text-base">— Surah Al-Ma'idah 5:32</p>
          <div className="w-16 h-1 bg-amber-300 rounded-full mx-auto lg:w-24"></div>
        </div>
      </section>
      <div className="border-b border-gray-100">
        <MobileDonationCategories />
      </div>
       <section className="py-12 px-5 lg:py-20 lg:px-8 text-center bg-gradient-to-br from-emerald-50 to-emerald-100">
      <div className="max-w-md mx-auto lg:max-w-2xl space-y-4 lg:space-y-6">
        <h2 className="text-2xl font-bold text-emerald-800 lg:text-3xl">
          Ready to Make a Difference?
        </h2>
        <p className="text-gray-600 text-base leading-relaxed lg:text-lg lg:leading-relaxed">
          Start with just ₹1 per day and join thousands of donors in creating lasting change.
        </p>
        <div className="lg:flex lg:justify-center">
          <Link
            href="/donate"
            className="w-full lg:w-auto text-center px-6 lg:px-12 py-3 bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl text-white text-lg font-semibold rounded-md transition-all duration-200 active:scale-[0.98] mt-2 inline-flex items-center justify-center"
          >
            Donate Now
          </Link>
        </div>
      </div>
    </section>
    </div>
  );
}
