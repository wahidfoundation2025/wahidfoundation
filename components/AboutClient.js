"use client";
import React, { useState, useEffect } from "react";
import {
  Star,
  Landmark,
  Users,
  Heart,
  ArrowRight,
  MapPin,
  Calendar,
  Building2,
  GraduationCap,
  Target,
  CheckCircle2,
  Medal,
} from "lucide-react";

import { StorySection } from "./StorySection";

const ICON_MAP = {
  Heart: <Heart />,
  Users: <Users />,
  Medal: <Medal />,
  Building2: <Building2 />,
};

const JOURNEY_ICONS = [<Calendar />, <MapPin />, <Building2 />];
const IMPACT_ICONS = [<GraduationCap />, <Heart />, <Users />];
const FUTURE_ICONS = [<Target />, <CheckCircle2 />, <Landmark />];

const About = () => {
  const [activeTab, setActiveTab] = useState("journey");

  const [hero, setHero] = useState(null);
  const [loadingHero, setLoadingHero] = useState(true);
  const [vision, setVision] = useState(null);
  const [loadingVision, setLoadingVision] = useState(true);
  const [values, setValues] = useState(null);
  const [loadingValues, setLoadingValues] = useState(true);
  const [story, setStory] = useState(null);
  const [loadingStory, setLoadingStory] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const [heroRes, visionRes, valuesRes, storyRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/aboutherosection`, {
            cache: "force-cache",
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/aboutvisionsection`, {
            cache: "force-cache",
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/aboutvaluesection`, {
            cache: "force-cache",
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/aboutstorysection`, {
            cache: "force-cache",
          }),
        ]);

        const [heroData, visionData, valuesData, storyData] = await Promise.all(
          [heroRes.json(), visionRes.json(), valuesRes.json(), storyRes.json()]
        );

        setHero(heroData);
        setVision(visionData);
        setValues(valuesData);
        setStory(storyData);
      } catch (err) {
        console.error("Failed to fetch about page data:", err);
      } finally {
        setLoadingHero(false);
        setLoadingVision(false);
        setLoadingValues(false);
        setLoadingStory(false);
      }
    }

    fetchContent();
  }, []);

  const availableTabs = [
    story?.journey?.length ? { value: "journey", label: "Journey" } : null,
    story?.impact?.length ? { value: "impact", label: "Impact" } : null,
    story?.future?.length ? { value: "future", label: "Future" } : null,
  ].filter(Boolean);

  useEffect(() => {
    if (story && activeTab) {
      if (
        availableTabs?.length > 0 &&
        !availableTabs?.find((t) => t.value === activeTab)
      ) {
        setActiveTab(availableTabs[0].value);
      }
    }
  }, [story]);

  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-800 to-emerald-950 text-white">
        <div
          className="absolute inset-0 opacity-15 bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80')",
          }}
        />
        <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="relative px-5 pb-16 pt-32 lg:px-8 lg:pb-24 lg:pt-44">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="space-y-4 text-center">
              <span className="eyebrow justify-center text-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                Who We Are
              </span>
              <h1 className="font-display text-4xl font-bold leading-tight tracking-tight lg:text-6xl">
                {hero?.title}
              </h1>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-emerald-50/90 lg:text-xl">
                {hero?.subtitle}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="mx-auto grid max-w-3xl grid-cols-3 gap-4 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-md lg:gap-8 lg:p-8">
              <div className="text-center">
                <div className="font-display text-2xl font-bold lg:text-4xl">
                  {hero?.stats?.yearsOfImpact?.value}
                </div>
                <div className="mt-1 text-xs text-emerald-100 lg:text-sm">
                  {hero?.stats?.yearsOfImpact?.label}
                </div>
              </div>
              <div className="border-x border-white/20 text-center">
                <div className="font-display text-2xl font-bold lg:text-4xl">
                  {hero?.stats?.livesChanged?.value}
                </div>
                <div className="mt-1 text-xs text-emerald-100 lg:text-sm">
                  {hero?.stats?.livesChanged?.label}
                </div>
              </div>
              <div className="text-center">
                <div className="font-display text-2xl font-bold lg:text-4xl">
                  {hero?.stats?.states?.value}
                </div>
                <div className="mt-1 text-xs text-emerald-100 lg:text-sm">
                  {hero?.stats?.states?.label}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <a
                href="/donate"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-emerald-700 shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl active:scale-[0.98] lg:w-auto lg:px-12"
              >
                {hero?.ctaText}
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-5 py-12 lg:px-8 lg:py-20">
        <div className="max-w-md mx-auto lg:max-w-6xl space-y-8 lg:space-y-12">
          <div className="text-center space-y-2 lg:space-y-4">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-emerald-900">
              {vision?.title}
            </h2>
            <p className="text-gray-600 lg:text-lg lg:max-w-2xl lg:mx-auto">
              {vision?.subtitle}
            </p>
          </div>

          <div className="grid gap-6 lg:gap-12 lg:grid-cols-2">
            <div className="border-0 bg-gradient-to-br from-amber-50 to-amber-100/50 shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl">
              <div className="p-6 lg:p-10">
                <div className="flex items-start gap-4 lg:gap-6">
                  <div className="bg-amber-600 w-12 h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Star className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                  </div>
                  <div className="space-y-2 lg:space-y-4">
                    <h3 className="font-display text-xl lg:text-2xl font-bold text-emerald-900">
                      Vision
                    </h3>
                    <p className="text-gray-700 lg:text-lg leading-relaxed">
                      {vision?.vision}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-0 bg-gradient-to-br from-emerald-50 to-emerald-100/50 shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl">
              <div className="p-6 lg:p-10">
                <div className="flex items-start gap-4 lg:gap-6">
                  <div className="bg-emerald-600 w-12 h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                  </div>
                  <div className="space-y-2 lg:space-y-4">
                    <h3 className="font-display text-xl lg:text-2xl font-bold text-emerald-900">
                      Mission
                    </h3>
                    <p className="text-gray-700 lg:text-lg leading-relaxed">
                      {vision?.mission}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="px-5 py-12 lg:px-8 lg:py-20 bg-gray-50">
        <div className="max-w-md mx-auto lg:max-w-6xl space-y-8 lg:space-y-12">
          <div className="text-center space-y-2 lg:space-y-4">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-emerald-900">
              {values?.title}
            </h2>
            <p className="text-gray-600 lg:text-lg lg:max-w-2xl lg:mx-auto">
              {values?.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:gap-6 lg:grid-cols-4">
            {values?.cards?.map((card, idx) => {
              const isEmerald = idx % 2 === 0;
              return (
                <div key={card?.id || idx} className="card-soft p-5 lg:p-8">
                  <div className="flex flex-col items-center space-y-3 text-center lg:space-y-5">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl lg:h-16 lg:w-16 ${
                        isEmerald ? "bg-emerald-100" : "bg-amber-100"
                      }`}
                    >
                      {card.icon && (
                        <span
                          className={`flex h-6 w-6 items-center justify-center lg:h-8 lg:w-8 ${
                            isEmerald ? "text-emerald-600" : "text-amber-600"
                          }`}
                        >
                          {ICON_MAP[card.icon]}
                        </span>
                      )}
                    </div>
                    <div className="space-y-1 lg:space-y-2">
                      <h3 className="font-display font-bold text-emerald-900 lg:text-xl">
                        {card?.title}
                      </h3>
                      <p className="text-sm text-gray-600 lg:text-base">
                        {card?.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="px-5 py-12 lg:px-8 lg:py-20">
        <div className="max-w-md mx-auto lg:max-w-6xl space-y-8 lg:space-y-12">
          <div className="text-center space-y-2 lg:space-y-4">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-emerald-900">
              {story?.title}
            </h2>
            <p className="text-gray-600 lg:text-lg lg:max-w-2xl lg:mx-auto">
              {story?.subtitle}
            </p>
          </div>

          {/* Tabs */}
          <div>
            <div className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-50 p-1 text-gray-600 lg:grid lg:h-16 lg:w-full lg:grid-cols-3">
              {availableTabs?.map((tab, idx) => (
                <button
                  key={tab?.value || idx}
                  className={`rounded-full px-6 py-2 text-sm font-semibold transition-all lg:px-10 lg:py-3 lg:text-base ${
                    activeTab === tab.value
                      ? "bg-white text-emerald-700 shadow-sm"
                      : "hover:bg-emerald-100/60"
                  }`}
                  onClick={() => setActiveTab(tab.value)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-6 lg:mt-12 space-y-6">
              {activeTab === "journey" && (
                <StorySection items={story?.journey} icons={JOURNEY_ICONS} />
              )}
              {activeTab === "impact" && (
                <StorySection items={story?.impact} icons={IMPACT_ICONS} />
              )}
              {activeTab === "future" && (
                <StorySection items={story?.future} icons={FUTURE_ICONS} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 py-16 lg:px-8 lg:py-24">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-50 to-emerald-100 px-6 py-14 text-center lg:py-20">
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-emerald-200/50 blur-2xl" />
            <div className="relative mx-auto max-w-3xl space-y-6">
              <h2 className="font-display text-3xl font-bold text-emerald-900 lg:text-4xl">
                {hero?.secondaryCTATitle}
              </h2>
              <p className="mx-auto max-w-2xl leading-relaxed text-gray-600 lg:text-xl">
                {hero?.secondaryCTASubtitle}
              </p>
              <div className="flex justify-center">
                <a
                  href={hero?.secondaryCTA?.link}
                  className="btn-primary w-full text-lg sm:w-auto"
                >
                  {hero?.secondaryCTA?.text}
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
