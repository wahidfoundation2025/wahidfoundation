"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  MapPin,
  Mail,
  Phone,
  ImageIcon,
  Heart,
  Gift,
  Coins,
  Target,
  Calendar,
  Target as ImpactIcon,
  Layers,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { IoPerson } from "react-icons/io5";
import Link from "next/link";
import { FaHeart } from "react-icons/fa6";
import { PiBookOpenTextFill } from "react-icons/pi";

import ProjectGallery from "./PhotoGallery";
import ShareButton from "./ShareButton";

export default function ProjectDetailsPage({ slug, projectId }) {
  const { isSignedIn } = useUser();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("impact"); // State for tabbed interface
  const [checkedDonationType, setCheckedDonationType] = useState();
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("One Time");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`
        );
        if (!res.ok) throw new Error("Failed to fetch project details");
        const data = await res.json();

        setProject({
          ...data,
          category: Array.isArray(data.category)
            ? data.category.join(", ")
            : data.category || "Unknown",
          impact: Array.isArray(data.impact) ? data.impact : [],
          scheme: Array.isArray(data.scheme) ? data.scheme : [],
          updates: Array.isArray(data.updates) ? data.updates : [],
          donationOptions: Array.isArray(data.donationOptions)
            ? data.donationOptions
            : [
                { type: "General Donation", isEnabled: false },
                { type: "Zakat", isEnabled: false },
                { type: "Sadqa", isEnabled: false },
                { type: "Interest Earnings", isEnabled: false },
              ],
        });
      } catch (error) {
        console.error("Error fetching project:", error);
        setError("Failed to load project details. Please try again.");
      }
    }

    fetchData();
  }, [projectId]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-600">
        <p className="text-lg font-medium mb-6 text-red-500">{error}</p>
        <button
          onClick={() => {
            setError(null);
            setProject(null);
            if (projectId) fetchProject();
          }}
          className="px-4 py-2 bg-emerald-600 text-white rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-600">
        <p className="text-lg font-medium mb-6">Loading project details...</p>
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-emerald-500"
              animate={{ y: [0, -10, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    );
  }

  const percentageRaised = project.totalRequired
    ? Math.min(
        Math.round((project.collected / project.totalRequired) * 100),
        100
      )
    : 0;

  const donationCategories = [
    {
      icon: Heart,
      title: "General Donation",
      description:
        "Support our overall mission and let us allocate funds where they're needed most",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      buttonColor: "bg-emerald-600 hover:bg-emerald-700",
    },
    {
      icon: Gift,
      title: "Zakat",
      description:
        "Fulfill your Islamic obligation of Zakat through our verified and transparent programs",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      icon: Coins,
      title: "Sadqa",
      description:
        "Give voluntary charity (Sadqa) to earn rewards and help those in need",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      buttonColor: "bg-amber-600 hover:bg-amber-700",
    },
    {
      icon: Target,
      title: "Interest Earnings",
      description:
        "Donate your interest earnings to purify your wealth according to Islamic principles",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
    },
  ].filter((category) =>
    project.donationOptions.some(
      (opt) => opt.type === category.title && opt.isEnabled
    )
  );

  const checkedCategory = donationCategories[0].title;

  return (
    <main className="space-y-8 bg-white pb-16 px-4 py-4 lg:px-8">
      {project.mainImage && (
        <div className="relative h-80 w-full overflow-hidden rounded-xl">
          <img
            src={project.mainImage}
            alt={project.title || "Project Image"}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 text-white flex items-center space-x-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <Link
              href="/projects"
              className="text-sm font-medium hover:underline"
            >
              Go back to Projects
            </Link>
          </div>

          <div className="absolute top-2 right-2">
            <ShareButton slug={project.slug} />
          </div>

          <div className="absolute bottom-4 left-4 text-white space-y-1 px-4 py-3 rounded-xl max-w-[90%] backdrop-blur-sm bg-black/30">
            <span className="text-xs bg-blue-100 text-blue-800 font-medium px-2 py-0.5 rounded">
              {project.category || "Uncategorized"}
            </span>
            <h1 className="text-xl lg:text-2xl font-bold leading-tight">
              {project.title || "Untitled Project"}
            </h1>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="w-4 h-4 text-white" />
              <span>{project.location || "Unknown Location"}</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center text-center text-gray-800 text-sm divide-x divide-gray-200">
        <div className="px-4">
          <p className="text-lg font-bold">{percentageRaised}%</p>
          <p className="text-xs text-gray-500">Complete</p>
        </div>
        <div className="px-4">
          <p className="text-lg font-bold">{project.daysLeft || 0}</p>
          <p className="text-xs text-gray-500">Days Left</p>
        </div>
        <div className="px-4">
          <p className="text-lg font-bold">{project.beneficiaries || 0}</p>
          <p className="text-xs text-gray-500">Beneficiaries</p>
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-6 max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-600 font-bold">Total Required</p>
          <p className="text-sm font-semibold text-gray-900">
            ₹
            {project.totalRequired
              ? project.totalRequired.toLocaleString()
              : "0"}
          </p>
        </div>
        <div className="w-full bg-blue-100 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0f172a] rounded-full"
            style={{ width: `${percentageRaised}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center text-sm mt-2">
          <p className="text-blue-600 font-semibold">
            ₹{project.collected ? project.collected.toLocaleString() : "0"}{" "}
            raised
          </p>
          <p className="text-gray-600">{percentageRaised}% of goal</p>
        </div>
      </div>

      <section className="py-8 lg:max-w-6xl lg:mx-auto">
        {/* Section Heading */}
        <div className="mb-6 lg:mb-12 lg:text-center">
          <h2 className="text-2xl font-bold text-emerald-800 mb-2 lg:text-4xl lg:mb-4">
            Donation Type
          </h2>
          <p className="text-sm text-gray-600 lg:text-xl lg:max-w-2xl lg:mx-auto">
            Select the category that aligns with your intention and Islamic
            principles
          </p>
          <div className="h-1 w-12 bg-amber-500 mt-2 lg:w-24 lg:mx-auto"></div>
        </div>

        {/* Cards */}
        {donationCategories.length > 0 ? (
          <>
            <div className="max-w-sm mx-auto w-full bg-emerald-50 border border-emerald-100 rounded-xl shadow-sm p-6 space-y-6">
              {/* Title */}
              <div className="flex items-center gap-2">
                <FaHeart className="text-emerald-600 w-5 h-5" />
                <h2 className="text-lg font-semibold text-gray-800">
                  Make a Donation
                </h2>
              </div>

              {/* Donation Type */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  Donation Type
                </p>
                <div className="space-y-2 text-sm text-gray-900">
                  {[
                    "General Donation",
                    "Zakat",
                    "Sadqa",
                    "Interest Earnings",
                  ].map((category) => (
                    <label key={category} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="donationType"
                        value={category}
                        disabled={
                          !donationCategories.find(
                            (cat) => cat.title === category
                          )
                        }
                        checked={
                          checkedDonationType
                            ? checkedDonationType === category
                            : checkedCategory === category
                        }
                        onChange={(e) => setCheckedDonationType(e.target.value)}
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              {/* Donation Amount */}
              <div className="space-y-2 text-black">
                <p className="text-sm font-medium text-gray-700">
                  Donation Amount
                </p>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount (Min: Rs. 365)"
                  className="w-full border border-gray-300 placeholder-zinc-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              {/* Frequency */}
              <div className="space-y-2 text-black">
                <p className="text-sm font-medium text-gray-700">Frequency</p>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full border border-gray-300 placeholder-zinc-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option>One Time</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Yearly</option>
                </select>
              </div>

              {/* Button */}
              <Link
                href={{
                  pathname: !isSignedIn ? "/login" : `/donate/${slug}`,
                  query: {
                    type: checkedDonationType || checkedCategory, // fallback
                    amount,
                    frequency,
                  },
                }}
              >
                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg transition duration-300">
                  Donate
                </button>
              </Link>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600">
            No donation options available for this project.
          </p>
        )}
      </section>

      <section className="text-black flex flex-col space-y-3 max-w-sm w-full mx-auto p-6 rounded-2xl bg-gray-100">
        <div className="flex justify-start items-center space-x-3">
          <span className="mr-2 text-xl">
            <IoPerson />
          </span>
          <h3 className="text-xl">Project Manager</h3>
        </div>

        <div className="flex flex-col gap-2 items-start justify-between text-gray-700 text-sm text-center md:text-left">
          <div className="flex flex-col items-start font-medium">
            <span className="text-gray-400 font-normal">Name</span>
            <span className="text-sm lg:text-md font-semibold">
              {project.projectManager.name || "Unknown"}
            </span>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col items-start font-medium">
              <span className="text-gray-400 font-normal">Email</span>
              <span className="text-sm lg:text-md font-semibold">
                {project.projectManager.email || "No email provided"}
              </span>
            </div>
            {project.projectManager.email ? (
              <button className="flex items-center justify-center space-x-2 bg-white border-1 border-gray-200 hover:bg-slate-200 p-2 rounded-lg">
                <Mail className="w-4 h-4" />
                <span>
                  <a
                    href={`mailto:${project.projectManager.email || ""}`}
                    className="font-semibold"
                  >
                    Email
                  </a>
                </span>
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col items-start font-medium">
              <span className="text-gray-400 font-normal">Phone</span>
              <span className="text-sm lg:text-md font-semibold">
                {project.projectManager.phone || "No phone number provided"}
              </span>
            </div>
            {project.projectManager.phone ? (
              <button className="flex items-center justify-center space-x-2 bg-white border-1 border-gray-200 hover:bg-slate-200 p-2 rounded-lg">
                <Phone className="w-4 h-4" />
                <span>
                  <a
                    href={`tel:${project.projectManager.phone || ""}`}
                    className="font-semibold"
                  >
                    Call
                  </a>
                </span>
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>

      {(project.impact?.length > 0 || project.updates?.length > 0) && (
        <section className="px-4 max-w-sm mx-auto">
          <div className="flex bg-gray-100 mb-6 rounded-lg p-1">
            {project.impact?.length > 0 && (
              <button
                className={`flex-1 px-4 cursor-pointer py-2 my-1 text-sm font-medium ${
                  activeTab === "impact"
                    ? "bg-white text-blue-600 rounded-sm"
                    : "text-gray-600 hover:cursor-pointer"
                }`}
                onClick={() => setActiveTab("impact")}
              >
                Impact
              </button>
            )}
            {project.description && (
              <button
                className={`flex-1 px-4 cursor-pointer py-2 my-1 text-sm font-medium ${
                  activeTab === "about"
                    ? "bg-white text-blue-600 rounded-sm"
                    : "text-gray-600 hover:cursor-pointer"
                }`}
                onClick={() => setActiveTab("about")}
              >
                About
              </button>
            )}
            {project.updates?.length > 0 && (
              <button
                className={`flex-1 px-4 cursor-pointer py-2 my-1 text-sm font-medium ${
                  activeTab === "updates"
                    ? "bg-white text-blue-600 rounded-sm"
                    : "text-gray-600 hover:cursor-pointer"
                }`}
                onClick={() => setActiveTab("updates")}
              >
                Updates
              </button>
            )}
          </div>

          {activeTab === "impact" && project.impact?.length > 0 && (
            <div className="space-y-4">
              {project.impact
                // ✅ Sort impacts in fixed order
                .slice() // copy to avoid mutating original
                .sort((a, b) => {
                  const order = { Direct: 1, Indirect: 2, "Long-term": 3 };
                  return (order[a.type] || 99) - (order[b.type] || 99);
                })
                .map((impact, idx) => {
                  // ✅ Pick correct icon
                  let Icon = ImpactIcon;
                  if (impact.type === "Indirect") Icon = Layers;
                  if (impact.type === "Long-term") Icon = Calendar;

                  const bgColors = [
                    "bg-green-100",
                    "bg-blue-100",
                    "bg-amber-100",
                  ];
                  const iconColors = [
                    "text-green-500",
                    "text-blue-500",
                    "text-amber-500",
                  ];

                  return (
                    <div
                      key={idx}
                      className={`p-5 rounded-2xl shadow-sm ${
                        bgColors[idx] || ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-3 rounded-full bg-white shadow-sm">
                          <Icon
                            className={`w-6 h-6 ${
                              iconColors[idx] || "text-gray-700"
                            }`}
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {impact.type || "Impact Type"} Impact
                          </h3>
                          <p className="text-sm text-gray-500">
                            {impact.title || "Impact Title"}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mt-2">
                        {impact.description || "Impact description"}
                      </p>
                    </div>
                  );
                })}
            </div>
          )}

          {activeTab === "impact" &&
            (!project.impact || project.impact.length === 0) && (
              <p className="text-center text-gray-600">
                No impact details available.
              </p>
            )}

          {activeTab === "about" && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-800">
                About this Project
              </h3>
              <div
                className="text-gray-700 text-sm px-2 whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />

              {/* Timeline */}
              {project.timeline?.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">
                    Project Timeline
                  </h3>
                  <div className="space-y-6">
                    {project.timeline.map((event, idx) => {
                      let styles = {
                        icon: AlertCircle,
                        bg: "bg-gray-200",
                        badgeBg: "bg-gray-200",
                        badgeText: "text-gray-700",
                      };

                      if (event.status === "Completed") {
                        styles = {
                          icon: CheckCircle2,
                          bg: "bg-green-100",
                          badgeBg: "bg-green-100",
                          badgeText: "text-green-700",
                        };
                      } else if (event.status === "In Progress") {
                        styles = {
                          icon: Clock,
                          bg: "bg-blue-100",
                          badgeBg: "bg-blue-100",
                          badgeText: "text-blue-700",
                        };
                      }

                      return (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-6 h-6 rounded-full ${styles.badgeText} flex items-center justify-center`}
                            >
                              <styles.icon />
                            </div>
                            {/* vertical line unless last item */}
                            {idx !== project.timeline.length - 1 && (
                              <div className="w-0.5 bg-gray-300 h-full"></div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">
                              {event.title}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {event.date
                                ? new Date(event.date).toLocaleDateString()
                                : "No date"}
                            </p>
                            <span
                              className={`inline-block text-xs mt-1 px-2 py-1 rounded-full ${styles.badgeBg} ${styles.badgeText}`}
                            >
                              {event.status}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "updates" && project.updates?.length > 0 && (
            <div className="space-y-4">
              {project.updates.map((update, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-white"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-full bg-blue-100">
                        <span className="text-blue-600 text-xl">
                          <PiBookOpenTextFill />
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {update.version || "Update Title"}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500">
                      {update.date
                        ? new Date(update.date).toLocaleDateString()
                        : "Date"}
                    </p>
                  </div>
                  <p className="text-sm text-gray-700 mt-3">
                    {update.content || "Update description"}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "updates" &&
            (!project.updates || project.updates.length === 0) && (
              <p className="text-center text-gray-600">No updates available.</p>
            )}
        </section>
      )}

      {project.scheme?.length > 0 && (
        <section className="px-4 lg:max-w-6xl lg:mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center space-x-2">
            <Layers className="w-5 h-5" />
            <span>Project Schemes</span>
          </h2>
          <div className="space-y-4">
            {project.scheme.map((scheme, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {scheme.name || "Untitled Scheme"}
                </h3>
                <p className="text-sm text-gray-600">
                  {scheme.description || "No description available."}
                </p>
                {scheme.link && (
                  <a
                    href={scheme.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                  >
                    Learn More
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {project.photoGallery?.length > 0 && (
        <ProjectGallery images={project.photoGallery} />
      )}

      {project.youtubeIframe && (
        <section className="w-full px-4 my-8 lg:max-w-6xl lg:mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Project Video
          </h2>
          <div className="w-full h-[300px] lg:h-[500px]">
            <iframe
              src={
                project.youtubeIframe.includes("youtu.be")
                  ? `https://www.youtube.com/embed/${
                      project.youtubeIframe.split("youtu.be/")[1].split("?")[0]
                    }`
                  : project.youtubeIframe
              }
              title="Project Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-xl shadow-lg"
            ></iframe>
          </div>
        </section>
      )}
    </main>
  );
}
