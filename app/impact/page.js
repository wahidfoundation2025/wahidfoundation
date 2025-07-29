"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { GraduationCap, Heart, Users, Calculator, ArrowRight, ChevronRight } from "lucide-react";

// Map icon string to Lucide icon component
const ICON_MAP = {
  GraduationCap,
  Heart,
  Users,
  Calculator,
};

const Impact = () => {
  const [showAllStories, setShowAllStories] = useState(false);
  const [activeTab, setActiveTab] = useState("education");
  const [stories, setStories] = useState([]);
  const [loadingStories, setLoadingStories] = useState(true);

  useEffect(() => {
    // Replace with your actual API endpoint
    fetch("https://wahidfoundationadmin-seven.vercel.app/api/impact-stories")
      .then(res => res.json())
      .then(data => {
        setStories(data);
        setLoadingStories(false);
      })
      .catch(() => setLoadingStories(false));
  }, []);

  const visibleStories = showAllStories ? stories : stories.slice(0, 2);

  const tabContent = {
    education: {
      color: "blue",
      title: "Education Impact",
      subtitle: "Empowering through knowledge",
      stats: [
        { label: "Schools Built/Renovated", value: "24", progress: 80 },
        { label: "Students Supported", value: "1,200+", progress: 60 },
        { label: "Digital Labs Established", value: "18", progress: 40 },
      ],
      description:
        "Our education initiatives have helped over 1,200 students complete their education, with 120 students now pursuing higher education in medicine, engineering, and other professional fields.",
      link: "/projects?category=Education",
    },
    healthcare: {
      color: "red",
      title: "Healthcare Impact",
      subtitle: "Improving lives through better health",
      stats: [
        { label: "Medical Camps Conducted", value: "156", progress: 85 },
        { label: "Patients Treated", value: "5,000+", progress: 70 },
        { label: "Health Centers Established", value: "12", progress: 45 },
      ],
      description:
        "Our healthcare initiatives have provided medical care to over 5,000 patients, conducted 156 medical camps, and established 12 health centers in underserved communities. We've also trained 45 local healthcare workers.",
      link: "/projects?category=Healthcare",
    },
    women: {
      color: "pink",
      title: "Women Empowerment Impact",
      subtitle: "Empowering women, transforming communities",
      stats: [
        { label: "Women Trained", value: "2,500+", progress: 75 },
        { label: "Businesses Started", value: "450+", progress: 60 },
        { label: "Self-Help Groups", value: "85", progress: 55 },
      ],
      description:
        "Our women empowerment programs have trained over 2,500 women in various skills, helped establish 450+ women-led businesses, and formed 85 self-help groups. These initiatives have created sustainable livelihoods and fostered community leadership.",
      link: "/projects?category=Women Empowerment",
    },
    economic: {
      color: "amber",
      title: "Economic Impact",
      subtitle: "Building sustainable livelihoods",
      stats: [
        { label: "Micro-enterprises Supported", value: "800+", progress: 65 },
        { label: "Loans Disbursed", value: "₹2.5Cr+", progress: 80 },
        { label: "Jobs Created", value: "1,200+", progress: 70 },
      ],
      description:
        "Our economic development initiatives have supported over 800 micro-enterprises, disbursed more than ₹2.5 crores in loans, and created over 1,200 jobs. These efforts have helped build sustainable livelihoods and boost local economies.",
      link: "/projects?category=Economic Empowerment",
    },
  };

  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
        <div
          className="absolute inset-0 opacity-10 bg-center bg-cover"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80')",
            backgroundBlendMode: "overlay",
          }}
        />
        <div className="relative px-5 pt-12 pb-8 lg:px-8 lg:py-16">
          <div className="max-w-md mx-auto lg:max-w-4xl space-y-6 lg:space-y-8">
            <div className="lg:text-center">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight">Our Impact</h1>
              <p className="text-emerald-50 text-lg lg:text-xl leading-relaxed lg:max-w-2xl lg:mx-auto">
                Transforming Lives Across India Through Collective Action
              </p>
            </div>
            {/* Stats bar */}
            <div className="grid grid-cols-3 gap-4 lg:gap-8 bg-white/10 backdrop-blur-sm rounded-xl p-4 lg:p-8 lg:max-w-3xl lg:mx-auto">
              <div className="text-center">
                <div className="text-2xl lg:text-4xl font-bold mb-1">25K+</div>
                <div className="text-xs lg:text-sm text-emerald-100">Lives Changed</div>
              </div>
              <div className="text-center border-x border-white/20">
                <div className="text-2xl lg:text-4xl font-bold mb-1">14</div>
                <div className="text-xs lg:text-sm text-emerald-100">States</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-4xl font-bold mb-1">112</div>
                <div className="text-xs lg:text-sm text-emerald-100">Projects</div>
              </div>
            </div>
            {/* CTA button */}
            <div className="lg:flex lg:justify-center">
              <Link
                href="/donate"
                className="block w-full lg:w-auto lg:px-10 bg-white text-emerald-600 hover:bg-emerald-50 py-5 lg:py-4 text-lg lg:text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] text-center rounded-lg flex items-center justify-center gap-2"
              >
                Start Making Impact
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
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2 lg:mb-4">Impact By Category</h2>
            <p className="text-gray-600 lg:text-lg lg:max-w-2xl lg:mx-auto">Explore how we're making a difference across different areas</p>
          </div>

          {/* Tab navigation */}
          <div className="overflow-x-auto pb-2 -mx-5 px-5 lg:mx-0 lg:px-0 lg:overflow-visible lg:pb-0">
            <div className="inline-flex h-12 lg:h-16 items-center justify-center rounded-lg bg-gray-100 p-1 text-gray-600 lg:grid lg:w-full lg:grid-cols-4">
              {Object.keys(tabContent).map((tab) => (
                <label
                  key={tab}
                  className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-6 py-2 lg:px-10 lg:py-3 text-sm lg:text-base font-medium cursor-pointer transition-all ${
                    activeTab === tab ? "bg-white text-emerald-600 shadow-sm" : "hover:bg-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="impact-tab"
                    value={tab}
                    checked={activeTab === tab}
                    onChange={() => setActiveTab(tab)}
                    className="hidden"
                  />
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="mt-6 lg:mt-12 space-y-6">
            {Object.entries(tabContent).map(([tab, { color, title, subtitle, stats, description, link }]) => (
              <div key={tab} className={`${activeTab === tab ? "block" : "hidden"} space-y-6`}>
                <div className={`border-0 bg-gradient-to-br from-${color}-50 to-${color}-100/50 shadow-sm hover:shadow-lg transition-all duration-300 rounded-lg`}>
                  <div className="p-6 lg:p-12">
                    <div className="flex items-center gap-4 lg:gap-8 mb-6 lg:mb-12">
                      <div className={`bg-${color}-600 w-12 h-12 lg:w-20 lg:h-20 rounded-xl flex items-center justify-center flex-shrink-0`}>
                        {tab === "education" && <GraduationCap className="h-6 w-6 lg:h-10 lg:w-10 text-white" />}
                        {tab === "healthcare" && <Heart className="h-6 w-6 lg:h-10 lg:w-10 text-white" />}
                        {tab === "women" && <Users className="h-6 w-6 lg:h-10 lg:w-10 text-white" />}
                        {tab === "economic" && <Calculator className="h-6 w-6 lg:h-10 lg:w-10 text-white" />}
                      </div>
                      <div>
                        <h3 className="text-xl lg:text-3xl font-bold text-gray-900">{title}</h3>
                        <p className="text-sm lg:text-lg text-gray-600">{subtitle}</p>
                      </div>
                    </div>
                    <div className="space-y-4 lg:space-y-8">
                      {stats.map((stat, index) => (
                        <div key={index} className="space-y-2 lg:space-y-4">
                          <div className="flex justify-between text-sm lg:text-lg">
                            <span className="font-medium text-gray-700">{stat.label}</span>
                            <span className={`font-bold text-${color}-600`}>{stat.value}</span>
                          </div>
                          <div className={`relative h-2 lg:h-4 w-full overflow-hidden rounded-full bg-${color}-100`}>
                            <div
                              className={`h-full bg-${color}-600 transition-all`}
                              style={{ width: `${stat.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className={`mt-6 lg:mt-12 pt-6 lg:pt-12 border-t border-${color}-200`}>
                      <p className="text-sm lg:text-lg text-gray-700 leading-relaxed lg:max-w-4xl">{description}</p>
                      <Link
                        href={link}
                        className={`mt-4 lg:mt-8 text-${color}-600 hover:text-${color}-700 hover:bg-${color}-50 px-0 lg:text-lg inline-flex items-center`}
                      >
                        View {title.split(" ")[0]} Projects
                        <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact stories section */}
      <section className="px-5 py-8 lg:px-8 lg:py-16 bg-gray-50">
        <div className="max-w-md mx-auto lg:max-w-6xl">
          <div className="mb-6 lg:mb-12 lg:text-center">
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2 lg:mb-4">Impact Stories</h2>
            <p className="text-gray-600 lg:text-lg lg:max-w-2xl lg:mx-auto">Real stories of transformation from our beneficiaries</p>
          </div>
          <div className="space-y-4 lg:space-y-8 lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-12">
            {loadingStories ? (
              <div className="col-span-2 text-center text-gray-500">Loading stories...</div>
            ) : visibleStories.length === 0 ? (
              <div className="col-span-2 text-center text-gray-500">No stories available right now.</div>
            ) : (
              visibleStories.map((story) => {
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
                          <p className="text-gray-700 lg:text-lg leading-relaxed">"{story.quote}"</p>
                          <div className="flex items-center gap-2 lg:gap-4">
                            <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm lg:text-lg font-bold">
                              {story.initials}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 lg:text-lg">{story.name}</p>
                              <p className="text-sm lg:text-base text-gray-600">{story.location}</p>
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
          <h2 className="text-2xl lg:text-4xl font-bold">Ready to Create Impact?</h2>
          <p className="text-emerald-50 text-lg lg:text-xl leading-relaxed lg:max-w-2xl lg:mx-auto">
            Join thousands of donors making a real difference. Start with just ₹1 per day.
          </p>
          <div className="lg:flex lg:justify-center">
            <Link
              href="/donate"
              className="block w-full lg:w-auto lg:px-12 bg-white text-emerald-600 hover:bg-emerald-50 py-6 lg:py-4 text-lg lg:text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] text-center rounded-lg flex items-center justify-center gap-2"
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