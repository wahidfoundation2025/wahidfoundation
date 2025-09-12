"use client";
import React, { useState, useEffect } from "react";
import {
  Star,
  Award,
  Landmark,
  Users,
  Heart,
  BookOpen,
  ArrowRight,
  MapPin,
  Calendar,
  Building2,
  GraduationCap,
  Target,
  CheckCircle2,
  Medal,
} from "lucide-react";

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

  const fetchHeroSectionContent = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/aboutherosection`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Hero: ", data);
        setHero(data);
        setLoadingHero(false);
      })
      .catch(() => setLoadingHero(false));
  };

  const fetchVisionSectionContent = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/aboutvisionsection`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Vision and Mission: ", data);
        setVision(data);
        setLoadingVision(false);
      })
      .catch(() => setLoadingVision(false));
  };

  const fetchValuesSectionContent = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/aboutvaluesection`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Values: ", data);
        setValues(data);
        setLoadingValues(false);
      })
      .catch(() => setLoadingValues(false));
  };

  const fetchStorySectionContent = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/aboutstorysection`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Story: ", data);
        setStory(data);
        setLoadingStory(false);
      })
      .catch(() => setLoadingStory(false));
  };

  useEffect(() => {
    fetchHeroSectionContent();
    fetchVisionSectionContent();
    fetchValuesSectionContent();
    fetchStorySectionContent();
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
      <section className="relative bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
        <div
          className="absolute inset-0 opacity-10 bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80')",
            backgroundBlendMode: "overlay",
          }}
        />
        <div className="relative px-5 py-12 lg:px-8 lg:py-20">
          <div className="max-w-md mx-auto lg:max-w-4xl space-y-6 lg:space-y-8">
            <div className="space-y-2 lg:space-y-4 lg:text-center">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight">
                {hero?.title}
              </h1>
              <p className="text-emerald-50 text-lg lg:text-xl leading-relaxed lg:max-w-2xl lg:mx-auto">
                {hero?.subtitle}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 lg:gap-8 bg-white/10 backdrop-blur-sm rounded-xl p-4 lg:p-8 lg:max-w-3xl lg:mx-auto">
              <div className="text-center">
                <div className="text-2xl lg:text-4xl font-bold mb-1">
                  {hero?.stats?.yearsOfImpact?.value}
                </div>
                <div className="text-xs lg:text-sm text-emerald-100">
                  {hero?.stats?.yearsOfImpact?.label}
                </div>
              </div>
              <div className="text-center border-x border-white/20">
                <div className="text-2xl lg:text-4xl font-bold mb-1">
                  {hero?.stats?.livesChanged?.value}
                </div>
                <div className="text-xs lg:text-sm text-emerald-100">
                  {hero?.stats?.livesChanged?.label}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-4xl font-bold mb-1">
                  {hero?.stats?.states?.value}
                </div>
                <div className="text-xs lg:text-sm text-emerald-100">
                  {hero?.stats?.states?.label}
                </div>
              </div>
            </div>

            <div className="lg:flex lg:justify-center">
              <a
                href="/donate"
                className="w-full lg:w-auto lg:px-12 bg-white text-emerald-600 hover:bg-emerald-50 py-6 lg:py-4 text-lg lg:text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 rounded-md"
              >
                {hero?.ctaText}
                <ArrowRight className="h-5 w-5 lg:h-6 lg:w-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-5 py-12 lg:px-8 lg:py-20">
        <div className="max-w-md mx-auto lg:max-w-6xl space-y-8 lg:space-y-12">
          <div className="text-center space-y-2 lg:space-y-4">
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-900">
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
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
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
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
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
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-900">
              {values?.title}
            </h2>
            <p className="text-gray-600 lg:text-lg lg:max-w-2xl lg:mx-auto">
              {values?.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:gap-8 lg:grid-cols-4">
            {values?.cards?.map((card, idx) => (
              <div
                key={card?.id}
                className="border-0 bg-white shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl"
              >
                <div className="p-4 lg:p-8">
                  <div className="flex flex-col items-center text-center space-y-3 lg:space-y-6">
                    <div
                      className={`bg-${
                        idx % 2 === 0 ? "emerald" : "amber"
                      }-100 w-12 h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center`}
                    >
                      {card.icon && (
                        <span
                          className={`h-6 w-6 lg:h-8 lg:w-8 flex items-center justify-center m-0 p-0 text-${
                            idx % 2 === 0 ? "emerald" : "amber"
                          }-600`}
                        >
                          {ICON_MAP[card.icon]}
                        </span>
                      )}
                    </div>
                    <div className="space-y-1 lg:space-y-2">
                      <h3 className="font-semibold lg:text-xl text-gray-900">
                        {card?.title}
                      </h3>
                      <p className="text-sm lg:text-base text-gray-600">
                        {card?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="px-5 py-12 lg:px-8 lg:py-20">
        <div className="max-w-md mx-auto lg:max-w-6xl space-y-8 lg:space-y-12">
          <div className="text-center space-y-2 lg:space-y-4">
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-900">
              {story?.title}
            </h2>
            <p className="text-gray-600 lg:text-lg lg:max-w-2xl lg:mx-auto">
              {story?.subtitle}
            </p>
          </div>

          {/* Tabs */}
          <div>
            <div className="inline-flex h-12 lg:h-16 items-center justify-center rounded-lg bg-gray-100 p-1 text-gray-600 lg:grid lg:w-full lg:grid-cols-3">
              {availableTabs.map((tab) => (
                <button
                  key={tab.value}
                  className={`rounded-md px-6 py-2 lg:px-10 lg:py-3 text-sm lg:text-base font-medium transition-all ${
                    activeTab === tab.value
                      ? "bg-white text-emerald-600 shadow-sm"
                      : "hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveTab(tab.value)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-6 lg:mt-12 space-y-6">
              {activeTab === "journey" && (
                <div className="border-0 bg-white shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl">
                  <div className="p-6 lg:p-12 space-y-4 lg:space-y-8">
                    {story?.journey?.map((item, idx) => (
                      <div className="flex items-start gap-4 lg:gap-6">
                        <div
                          className={`bg-${
                            idx % 2 === 0 ? "emerald" : "amber"
                          }-100 w-12 h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center flex-shrink-0`}
                        >
                          <span
                            className={`h-6 w-6 lg:h-8 lg:w-8 text-${
                              idx % 2 === 0 ? "emerald" : "amber"
                            }-600 flex items-center justify-center`}
                          >
                            {JOURNEY_ICONS[idx]}
                          </span>
                        </div>
                        <div className="space-y-2 lg:space-y-4">
                          <h3 className="font-semibold lg:text-xl text-gray-900">
                            {item?.title}
                          </h3>
                          <p className="text-gray-600 lg:text-lg leading-relaxed">
                            {item?.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "impact" && (
                <div className="border-0 bg-white shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl">
                  <div className="p-6 lg:p-12 space-y-4 lg:space-y-8">
                    {story?.impact?.map((item, idx) => (
                      <div className="flex items-start gap-4 lg:gap-6">
                        <div
                          className={`bg-${
                            idx % 2 === 0 ? "emerald" : "amber"
                          }-100 w-12 h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center flex-shrink-0`}
                        >
                          <span
                            className={`h-6 w-6 lg:h-8 lg:w-8 text-${
                              idx % 2 === 0 ? "emerald" : "amber"
                            }-600 flex items-center justify-center`}
                          >
                            {IMPACT_ICONS[idx]}
                          </span>
                        </div>
                        <div className="space-y-2 lg:space-y-4">
                          <h3 className="font-semibold lg:text-xl text-gray-900">
                            {item?.title}
                          </h3>
                          <p className="text-gray-600 lg:text-lg leading-relaxed">
                            {item?.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "future" && (
                <div className="border-0 bg-white shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl">
                  <div className="p-6 lg:p-12 space-y-4 lg:space-y-8">
                    {story?.future?.map((item, idx) => (
                      <div className="flex items-start gap-4 lg:gap-6">
                        <div
                          className={`bg-${
                            idx % 2 === 0 ? "emerald" : "amber"
                          }-100 w-12 h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center flex-shrink-0`}
                        >
                          <span
                            className={`h-6 w-6 lg:h-8 lg:w-8 text-${
                              idx % 2 === 0 ? "emerald" : "amber"
                            }-600 flex items-center justify-center`}
                          >
                            {FUTURE_ICONS[idx]}
                          </span>
                        </div>
                        <div className="space-y-2 lg:space-y-4">
                          <h3 className="font-semibold lg:text-xl text-gray-900">
                            {item?.title}
                          </h3>
                          <p className="text-gray-600 lg:text-lg leading-relaxed">
                            {item?.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 py-12 lg:px-8 lg:py-20 bg-gradient-to-br from-emerald-50 to-emerald-100/50">
        <div className="max-w-md mx-auto lg:max-w-4xl text-center space-y-6 lg:space-y-8">
          <h2 className="text-2xl lg:text-4xl font-bold text-gray-900">
            {hero?.secondaryCTATitle}
          </h2>
          <p className="text-gray-600 lg:text-xl leading-relaxed lg:max-w-2xl lg:mx-auto">
            {hero?.secondaryCTASubtitle}
          </p>
          <div className="lg:flex lg:justify-center">
            <a
              href={hero?.secondaryCTA?.link}
              className="w-full lg:w-auto lg:px-12 bg-emerald-600 hover:bg-emerald-700 text-white py-6 lg:py-4 text-lg lg:text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] rounded-md flex items-center justify-center gap-2"
            >
              {hero?.secondaryCTA?.text}
              <ArrowRight className="h-5 w-5 lg:h-6 lg:w-6 ml-2" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
