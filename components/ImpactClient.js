"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  GraduationCap,
  Heart,
  Users,
  Calculator,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const ICON_MAP = {
  GraduationCap,
  Heart,
  Users,
  Calculator,
};

const Impact = () => {
  const [hero, setHero] = useState(null);
  const [loadingHero, setLoadingHero] = useState(true);
  const [stories, setStories] = useState([]);
  const [loadingStories, setLoadingStories] = useState(true);
  const [tabContent, setTabContent] = useState({});
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [showAllStories, setShowAllStories] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    async function fetchContent() {
      try {
        const [heroRes, storiesRes, categoriesRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/impactherosection`, {
            cache: "force-cache",
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/impact-stories`, {
            cache: "force-cache",
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/impactcategories`, {
            cache: "force-cache",
          }),
        ]);

        const [heroData, storiesData, categoriesData] = await Promise.all([
          heroRes.json(),
          storiesRes.json(),
          categoriesRes.json(),
        ]);

        setHero(heroData);
        setStories(storiesData);
        setTabContent(categoriesData);
      } catch (err) {
        console.error("Failed to fetch about page data:", err);
      } finally {
        setLoadingHero(false);
        setLoadingStories(false);
        setLoadingCategories(false);
      }
    }

    fetchContent();
  }, []);

  useEffect(() => {
    if (tabContent?.categories?.length > 0 && !activeTab) {
      setActiveTab(tabContent.categories[0].key);
    }
  }, [tabContent, activeTab]);

  const visibleStories = showAllStories ? stories : stories.slice(0, 2);

  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
        <div
          className="absolute inset-0 opacity-10 bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80')",
            backgroundBlendMode: "overlay",
          }}
        />
        <div className="relative px-5 pt-12 pb-8 lg:px-8 lg:py-16">
          <div className="max-w-md mx-auto lg:max-w-4xl space-y-6 lg:space-y-8">
            <div className="lg:text-center">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight">
                {hero?.title}
              </h1>
              <p className="text-emerald-50 text-lg lg:text-xl leading-relaxed lg:max-w-2xl lg:mx-auto">
                {hero?.subtitle}
              </p>
            </div>
            {/* Stats bar */}
            <div className="grid grid-cols-3 gap-4 lg:gap-8 bg-white/10 backdrop-blur-sm rounded-xl p-4 lg:p-8 lg:max-w-3xl lg:mx-auto">
              <div className="text-center">
                <div className="text-2xl lg:text-4xl font-bold mb-1">
                  {hero?.stats?.livesChanged?.value}
                </div>
                <div className="text-xs lg:text-sm text-emerald-100">
                  {hero?.stats?.livesChanged?.label}
                </div>
              </div>
              <div className="text-center border-x border-white/20">
                <div className="text-2xl lg:text-4xl font-bold mb-1">
                  {hero?.stats?.states?.value}
                </div>
                <div className="text-xs lg:text-sm text-emerald-100">
                  {hero?.stats?.states?.label}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-4xl font-bold mb-1">
                  {hero?.stats?.projects?.value}
                </div>
                <div className="text-xs lg:text-sm text-emerald-100">
                  {hero?.stats?.projects?.label}
                </div>
              </div>
            </div>
            {/* CTA button */}
            <div className="lg:flex lg:justify-center">
              <Link
                href="/donate"
                className="w-full lg:w-auto lg:px-10 bg-white text-emerald-600 hover:bg-emerald-50 py-5 lg:py-4 text-lg lg:text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] text-center rounded-lg flex items-center justify-center gap-2"
              >
                {hero?.ctaText}
                <ArrowRight className="h-5 w-5 lg:h-6 lg:w-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact categories section */}
      <section className="px-5 py-8 lg:px-8 lg:py-16">
        <div className="max-w-md mx-auto lg:max-w-6xl">
          <div className="mb-6 lg:mb-12 lg:text-center">
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2 lg:mb-4">
              {tabContent?.section?.title || "Impact By Category"}
            </h2>
            <p className="text-gray-600 lg:text-lg lg:max-w-2xl lg:mx-auto">
              {tabContent?.section?.subtitle ||
                "Explore how we're making a difference across different areas"}
            </p>
          </div>

          {/* Tab navigation */}
          <div className="overflow-x-auto pb-2 -mx-5 px-5 lg:mx-0 lg:px-0 lg:overflow-visible lg:pb-0">
            <div className="inline-flex h-12 lg:h-16 items-center justify-center rounded-lg bg-gray-100 p-1 text-gray-600 lg:grid lg:w-full lg:grid-cols-4">
              {tabContent?.categories?.map((cat) => (
                <label
                  key={cat.key}
                  className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-6 py-2 lg:px-10 lg:py-3 text-sm lg:text-base font-medium cursor-pointer transition-all ${
                    activeTab === cat.key
                      ? "bg-white text-emerald-600 shadow-sm"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="impact-tab"
                    value={cat.key}
                    checked={activeTab === cat.key}
                    onChange={() => setActiveTab(cat.key)}
                    className="hidden"
                  />
                  {cat.title}
                </label>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="mt-6 lg:mt-12 space-y-6">
            {tabContent?.categories?.map(
              ({ key, color, title, subtitle, stats, description, link }) =>
                activeTab === key && (
                  <div key={key} className="space-y-6">
                    <div className="border-0 bg-white shadow-sm hover:shadow-lg transition-all duration-300 rounded-lg">
                      <div className="p-6 lg:p-12">
                        <div className="flex items-center gap-4 lg:gap-8 mb-6 lg:mb-12">
                          <div className="bg-emerald-600 w-12 h-12 lg:w-20 lg:h-20 rounded-xl flex items-center justify-center flex-shrink-0">
                            {key === "education" && (
                              <GraduationCap className="h-6 w-6 lg:h-10 lg:w-10 text-white" />
                            )}
                            {key === "healthcare" && (
                              <Heart className="h-6 w-6 lg:h-10 lg:w-10 text-white" />
                            )}
                            {key === "women" && (
                              <Users className="h-6 w-6 lg:h-10 lg:w-10 text-white" />
                            )}
                            {key === "economic" && (
                              <Calculator className="h-6 w-6 lg:h-10 lg:w-10 text-white" />
                            )}
                          </div>
                          <div>
                            <h3 className="text-xl lg:text-3xl font-bold text-gray-900">
                              {title}
                            </h3>
                            <p className="text-sm lg:text-lg text-gray-600">
                              {subtitle}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-4 lg:space-y-8">
                          {stats?.map((stat, index) => (
                            <div key={index} className="space-y-2 lg:space-y-4">
                              <div className="flex justify-between text-sm lg:text-lg">
                                <span className="font-medium text-gray-700">
                                  {stat.label}
                                </span>
                                <span className="font-bold text-emerald-600">
                                  {stat.value}
                                </span>
                              </div>
                              <div className="relative h-2 lg:h-4 w-full overflow-hidden rounded-full bg-gray-100">
                                <div
                                  className="h-full bg-emerald-600 transition-all"
                                  style={{ width: `${stat.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 lg:mt-12 pt-6 lg:pt-12 border-t border-gray-200">
                          <p className="text-sm lg:text-lg text-gray-700 leading-relaxed lg:max-w-4xl">
                            {description}
                          </p>
                          {typeof link === "string" && (
                            <Link
                              href={link}
                              className="mt-4 lg:mt-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 px-0 lg:text-lg inline-flex items-center"
                            >
                              View {title ? title.split(" ")[0] : ""} Projects
                              <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5 ml-1" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </section>

      {/* Impact stories section */}
      <section className="px-5 py-8 lg:px-8 lg:py-16 bg-gray-50">
        <div className="max-w-md mx-auto lg:max-w-6xl">
          <div className="mb-6 lg:mb-12 lg:text-center">
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2 lg:mb-4">
              Impact Stories
            </h2>
            <p className="text-gray-600 lg:text-lg lg:max-w-2xl lg:mx-auto">
              Real stories of transformation from our beneficiaries
            </p>
          </div>
          <div className="space-y-4 lg:space-y-8 lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-12">
            {loadingStories ? (
              <div className="col-span-2 text-center text-gray-500">
                Loading stories...
              </div>
            ) : visibleStories.length === 0 ? (
              <div className="col-span-2 text-center text-gray-500">
                No stories available right now.
              </div>
            ) : (
              visibleStories?.map((story) => {
                const Icon = ICON_MAP[story.icon] || GraduationCap;
                return (
                  <div
                    key={story._id || story.id}
                    className="border-0 bg-white shadow-sm hover:shadow-lg transition-all duration-300 rounded-lg"
                  >
                    <div className="p-6 lg:p-10">
                      <div className="flex items-start gap-4 lg:gap-6">
                        <div className="bg-emerald-100 w-12 h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 lg:h-8 lg:w-8 text-emerald-600" />
                        </div>
                        <div className="space-y-2 lg:space-y-4">
                          <p className="text-gray-700 lg:text-lg leading-relaxed">
                            "{story.quote}"
                          </p>
                          <div className="flex items-center gap-2 lg:gap-4">
                            <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm lg:text-lg font-bold">
                              {story.initials}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 lg:text-lg">
                                {story.name}
                              </p>
                              <p className="text-sm lg:text-base text-gray-600">
                                {story.location}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="lg:flex lg:justify-center lg:mt-12">
            <button
              onClick={() => setShowAllStories(!showAllStories)}
              className="w-full lg:w-auto lg:px-12 mt-6 lg:mt-0 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 py-4 lg:py-4 lg:text-lg font-semibold text-center rounded-lg"
            >
              {showAllStories ? "Show Less Stories" : "View More Stories"}
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA section */}
      <section className="px-5 py-12 lg:px-8 lg:py-20 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
        <div className="max-w-md mx-auto lg:max-w-4xl text-center space-y-6 lg:space-y-8">
          <h2 className="text-2xl lg:text-4xl font-bold">
            Ready to Create Impact?
          </h2>
          <p className="text-emerald-50 text-lg lg:text-xl leading-relaxed lg:max-w-2xl lg:mx-auto">
            Join thousands of donors making a real difference. Start with just
            ₹1 per day.
          </p>
          <div className="lg:flex lg:justify-center">
            <Link
              href="/donate"
              className="w-full lg:w-auto lg:px-12 bg-white text-emerald-600 hover:bg-emerald-50 py-6 lg:py-4 text-lg lg:text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] text-center rounded-lg flex items-center justify-center gap-2"
            >
              Start Giving Now
              <ArrowRight className="h-5 w-5 lg:h-6 lg:w-6 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impact;
