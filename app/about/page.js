"use client";
import React, { useState } from "react";
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
  CheckCircle2
} from "lucide-react";

const TABS = [
  { value: "journey", label: "Journey" },
  { value: "impact", label: "Impact" },
  { value: "future", label: "Future" },
];

const About = () => {
  const [activeTab, setActiveTab] = useState("journey");

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
                About Wahid Foundation
              </h1>
              <p className="text-emerald-50 text-lg lg:text-xl leading-relaxed lg:max-w-2xl lg:mx-auto">
                Empowering Communities, One Rupee at a Time
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 lg:gap-8 bg-white/10 backdrop-blur-sm rounded-xl p-4 lg:p-8 lg:max-w-3xl lg:mx-auto">
              <div className="text-center">
                <div className="text-2xl lg:text-4xl font-bold mb-1">5+</div>
                <div className="text-xs lg:text-sm text-emerald-100">
                  Years of Impact
                </div>
              </div>
              <div className="text-center border-x border-white/20">
                <div className="text-2xl lg:text-4xl font-bold mb-1">25K+</div>
                <div className="text-xs lg:text-sm text-emerald-100">
                  Lives Changed
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-4xl font-bold mb-1">14</div>
                <div className="text-xs lg:text-sm text-emerald-100">
                  States Reached
                </div>
              </div>
            </div>

            <div className="lg:flex lg:justify-center">
              <a
                href="/donate"
                className="w-full lg:w-auto lg:px-12 bg-white text-emerald-600 hover:bg-emerald-50 py-6 lg:py-4 text-lg lg:text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 rounded-md"
              >
                Join Our Mission
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
              Our Vision & Mission
            </h2>
            <p className="text-gray-600 lg:text-lg lg:max-w-2xl lg:mx-auto">
              Guiding principles that drive our impact
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
                      To create an equitable society where every individual, regardless of their
                      socio-economic background, has access to education, healthcare, and
                      opportunities for growth and self-sufficiency.
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
                      To mobilize microdonations starting from just ₹1 per day to fund sustainable
                      development projects in education, healthcare, women empowerment, and economic
                      growth across India, with full transparency and community involvement.
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
              Our Values
            </h2>
            <p className="text-gray-600 lg:text-lg lg:max-w-2xl lg:mx-auto">
              The principles that guide our work
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:gap-8 lg:grid-cols-4">
            <div className="border-0 bg-white shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl">
              <div className="p-4 lg:p-8">
                <div className="flex flex-col items-center text-center space-y-3 lg:space-y-6">
                  <div className="bg-emerald-100 w-12 h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center">
                    <Heart className="h-6 w-6 lg:h-8 lg:w-8 text-emerald-600" />
                  </div>
                  <div className="space-y-1 lg:space-y-2">
                    <h3 className="font-semibold lg:text-xl text-gray-900">
                      Compassion
                    </h3>
                    <p className="text-sm lg:text-base text-gray-600">
                      We lead with empathy and act with kindness
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-0 bg-white shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl">
              <div className="p-4 lg:p-8">
                <div className="flex flex-col items-center text-center space-y-3 lg:space-y-6">
                  <div className="bg-amber-100 w-12 h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 lg:h-8 lg:w-8 text-amber-600" />
                  </div>
                  <div className="space-y-1 lg:space-y-2">
                    <h3 className="font-semibold lg:text-xl text-gray-900">
                      Community
                    </h3>
                    <p className="text-sm lg:text-base text-gray-600">
                      We build bridges across diverse groups
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-0 bg-white shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl">
              <div className="p-4 lg:p-8">
                <div className="flex flex-col items-center text-center space-y-3 lg:space-y-6">
                  <div className="bg-emerald-100 w-12 h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center">
                    <Award className="h-6 w-6 lg:h-8 lg:w-8 text-emerald-600" />
                  </div>
                  <div className="space-y-1 lg:space-y-2">
                    <h3 className="font-semibold lg:text-xl text-gray-900">
                      Excellence
                    </h3>
                    <p className="text-sm lg:text-base text-gray-600">
                      We strive for the highest standards
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-0 bg-white shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl">
              <div className="p-4 lg:p-8">
                <div className="flex flex-col items-center text-center space-y-3 lg:space-y-6">
                  <div className="bg-amber-100 w-12 h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center">
                    <BookOpen className="h-6 w-6 lg:h-8 lg:w-8 text-amber-600" />
                  </div>
                  <div className="space-y-1 lg:space-y-2">
                    <h3 className="font-semibold lg:text-xl text-gray-900">
                      Transparency
                    </h3>
                    <p className="text-sm lg:text-base text-gray-600">
                      We operate with complete openness
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="px-5 py-12 lg:px-8 lg:py-20">
        <div className="max-w-md mx-auto lg:max-w-6xl space-y-8 lg:space-y-12">
          <div className="text-center space-y-2 lg:space-y-4">
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-900">
              Our Story
            </h2>
            <p className="text-gray-600 lg:text-lg lg:max-w-2xl lg:mx-auto">
              From humble beginnings to nationwide impact
            </p>
          </div>

          {/* Tabs */}
          <div>
            <div className="overflow-x-auto pb-2 -mx-5 px-5 lg:mx-0 lg:px-0 lg:overflow-visible lg:pb-0">
              <div className="inline-flex h-12 lg:h-16 items-center justify-center rounded-lg bg-gray-100 p-1 text-gray-600 lg:grid lg:w-full lg:grid-cols-3">
                {TABS.map((tab) => (
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
            </div>

            <div className="mt-6 lg:mt-12 space-y-6">
              {activeTab === "journey" && (
                <div className="border-0 bg-white shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl">
                  <div className="p-6 lg:p-12 space-y-4 lg:space-y-8">
                    <div className="flex items-start gap-4 lg:gap-6">
                      <div className="bg-emerald-100 w-12 h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-6 w-6 lg:h-8 lg:w-8 text-emerald-600" />
                      </div>
                      <div className="space-y-2 lg:space-y-4">
                        <h3 className="font-semibold lg:text-xl text-gray-900">
                          2018: The Beginning
                        </h3>
                        <p className="text-gray-600 lg:text-lg leading-relaxed">
                          Wahid Foundation was established with a simple yet powerful idea: if every Muslim in India contributed just ₹1 per day, we could create a substantial fund for community development and social welfare.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 lg:gap-6">
                      <div className="bg-amber-100 w-12 h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 lg:h-8 lg:w-8 text-amber-600" />
                      </div>
                      <div className="space-y-2 lg:space-y-4">
                        <h3 className="font-semibold lg:text-xl text-gray-900">
                          2019: First Steps
                        </h3>
                        <p className="text-gray-600 lg:text-lg leading-relaxed">
                          Starting with just 50 donors in Mumbai, we began our journey of community transformation, focusing on education and healthcare initiatives.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 lg:gap-6">
                      <div className="bg-emerald-100 w-12 h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Building2 className="h-6 w-6 lg:h-8 lg:w-8 text-emerald-600" />
                      </div>
                      <div className="space-y-2 lg:space-y-4">
                        <h3 className="font-semibold lg:text-xl text-gray-900">
                          2020-2023: Growth & Impact
                        </h3>
                        <p className="text-gray-600 lg:text-lg leading-relaxed">
                          Expanded across India, funding over 100 projects and impacting more than 25,000 lives through our innovative microdonation model.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "impact" && (
                <div className="border-0 bg-white shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl">
                  <div className="p-6 lg:p-12 space-y-4 lg:space-y-8">
                    <div className="flex items-start gap-4 lg:gap-6">
                      <div className="bg-emerald-100 w-12 h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="h-6 w-6 lg:h-8 lg:w-8 text-emerald-600" />
                      </div>
                      <div className="space-y-2 lg:space-y-4">
                        <h3 className="font-semibold lg:text-xl text-gray-900">
                          Education Impact
                        </h3>
                        <p className="text-gray-600 lg:text-lg leading-relaxed">
                          Established digital education centers in rural areas, providing access to quality education and technology skills to over 5,000 students.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 lg:gap-6">
                      <div className="bg-amber-100 w-12 h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Heart className="h-6 w-6 lg:h-8 lg:w-8 text-amber-600" />
                      </div>
                      <div className="space-y-2 lg:space-y-4">
                        <h3 className="font-semibold lg:text-xl text-gray-900">
                          Healthcare Reach
                        </h3>
                        <p className="text-gray-600 lg:text-lg leading-relaxed">
                          Launched mobile health clinics serving remote tribal areas, providing essential healthcare services to over 10,000 community members.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 lg:gap-6">
                      <div className="bg-emerald-100 w-12 h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Users className="h-6 w-6 lg:h-8 lg:w-8 text-emerald-600" />
                      </div>
                      <div className="space-y-2 lg:space-y-4">
                        <h3 className="font-semibold lg:text-xl text-gray-900">
                          Women Empowerment
                        </h3>
                        <p className="text-gray-600 lg:text-lg leading-relaxed">
                          Trained and supported over 2,000 women entrepreneurs through skill development and micro-finance initiatives.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "future" && (
                <div className="border-0 bg-white shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl">
                  <div className="p-6 lg:p-12 space-y-4 lg:space-y-8">
                    <div className="flex items-start gap-4 lg:gap-6">
                      <div className="bg-emerald-100 w-12 h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Target className="h-6 w-6 lg:h-8 lg:w-8 text-emerald-600" />
                      </div>
                      <div className="space-y-2 lg:space-y-4">
                        <h3 className="font-semibold lg:text-xl text-gray-900">
                          Expanding Reach
                        </h3>
                        <p className="text-gray-600 lg:text-lg leading-relaxed">
                          Planning to extend our impact to 20 states by 2025, focusing on underserved communities and innovative development solutions.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 lg:gap-6">
                      <div className="bg-amber-100 w-12 h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-6 w-6 lg:h-8 lg:w-8 text-amber-600" />
                      </div>
                      <div className="space-y-2 lg:space-y-4">
                        <h3 className="font-semibold lg:text-xl text-gray-900">
                          New Initiatives
                        </h3>
                        <p className="text-gray-600 lg:text-lg leading-relaxed">
                          Launching sustainable livelihood programs and digital literacy campaigns to create lasting change in rural communities.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 lg:gap-6">
                      <div className="bg-emerald-100 w-12 h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Landmark className="h-6 w-6 lg:h-8 lg:w-8 text-emerald-600" />
                      </div>
                      <div className="space-y-2 lg:space-y-4">
                        <h3 className="font-semibold lg:text-xl text-gray-900">
                          Community Growth
                        </h3>
                        <p className="text-gray-600 lg:text-lg leading-relaxed">
                          Aiming to grow our donor community to 100,000 members, making microdonations accessible to everyone who wants to make a difference.
                        </p>
                      </div>
                    </div>
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
            Join Our Mission
          </h2>
          <p className="text-gray-600 lg:text-xl leading-relaxed lg:max-w-2xl lg:mx-auto">
            Be part of a movement that's transforming lives across India. Start with just ₹1 per day.
          </p>
          <div className="lg:flex lg:justify-center">
            <a
              href="/donate"
              className="w-full lg:w-auto lg:px-12 bg-emerald-600 hover:bg-emerald-700 text-white py-6 lg:py-4 text-lg lg:text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] rounded-md flex items-center justify-center gap-2"
            >
              Start Giving Now
              <ArrowRight className="h-5 w-5 lg:h-6 lg:w-6 ml-2" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;