"use client";

import { useMemo, useState } from "react";
import { useUser } from "@clerk/nextjs";
import useSWR from "swr";
import {
  MapPin,
  Mail,
  Phone,
  Heart,
  Gift,
  Coins,
  Target,
  Target as ImpactIcon,
  Calendar,
  Layers,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IoPerson } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import { PiBookOpenTextFill } from "react-icons/pi";

import dynamic from "next/dynamic";
import ShareButton from "./ShareButton";
import Image from "next/image";

const ProjectGallery = dynamic(() => import("./PhotoGallery"), { ssr: false });
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProjectDetailsPage({ slug, projectId }) {
  const { isSignedIn } = useUser();
  const [activeTab, setActiveTab] = useState("impact");
  const [checkedDonationType, setCheckedDonationType] = useState();
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("One Time");

  const {
    data: projectRaw,
    error,
    isLoading,
    mutate,
  } = useSWR(
    projectId
      ? `${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`
      : null,
    fetcher
  );

  const project = projectRaw
    ? {
        ...projectRaw,
        category: Array.isArray(projectRaw?.category)
          ? projectRaw.category.join(", ")
          : projectRaw?.category || "Unknown",
        impact: Array.isArray(projectRaw?.impact) ? projectRaw.impact : [],
        scheme: Array.isArray(projectRaw?.scheme) ? projectRaw.scheme : [],
        updates: Array.isArray(projectRaw?.updates) ? projectRaw.updates : [],
        donationOptions: Array.isArray(projectRaw?.donationOptions)
          ? projectRaw.donationOptions
          : [
              { type: "General Donation", isEnabled: false },
              { type: "Zakat", isEnabled: false },
              { type: "Sadqa", isEnabled: false },
              { type: "Interest Earnings", isEnabled: false },
            ],
      }
    : null;

  const percentageRaised = useMemo(() => {
    if (!project?.totalRequired) return 0;
    return Math.min(
      Math.round((project?.collected / project?.totalRequired) * 100),
      100
    );
  }, [project]);

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
    project?.donationOptions?.some(
      (opt) => opt?.type === category.title && opt?.isEnabled
    )
  );

  const checkedCategory = useMemo(() => {
    return donationCategories.length > 0 ? donationCategories[0].title : null;
  }, [donationCategories]);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white text-gray-600">
        <p className="mb-6 text-lg font-medium text-red-500">
          Failed to load project details. Please try again.
        </p>
        <button
          onClick={() => mutate()}
          className="rounded-full bg-emerald-600 px-6 py-2.5 font-semibold text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  if (isLoading || !project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white text-gray-600">
        <p className="mb-6 text-lg font-medium">Loading project details…</p>
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-3 w-3 rounded-full bg-emerald-500"
              animate={{ y: [0, -10, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    );
  }

  const enabledTypes = [
    "General Donation",
    "Zakat",
    "Sadqa",
    "Interest Earnings",
  ];

  return (
    <main className="bg-gradient-to-b from-emerald-50/40 to-white pb-20 pt-24 sm:pt-28">
      <div className="container-x px-4 lg:px-8">
        {/* Back link */}
        <Link
          href="/projects"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 transition-colors hover:text-emerald-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        {/* Hero image */}
        {project?.mainImage && (
          <div className="relative h-64 w-full overflow-hidden rounded-3xl sm:h-80 lg:h-[26rem]">
            <Image
              src={project?.mainImage}
              alt={project?.title || "Project Image"}
              className="h-full w-full object-cover"
              fill
              priority={true}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute right-3 top-3">
              <ShareButton slug={project?.slug} />
            </div>
            <div className="absolute inset-x-0 bottom-0 space-y-2 p-5 text-white sm:p-7">
              <span className="inline-block rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold text-white">
                {project?.category || "Uncategorized"}
              </span>
              <h1 className="font-display text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                {project?.title || "Untitled Project"}
              </h1>
              <div className="flex items-center gap-2 text-sm text-white/90">
                <MapPin className="h-4 w-4" />
                <span>{project?.location || "Unknown Location"}</span>
              </div>
            </div>
          </div>
        )}

        {/* ---- Two-column layout ---- */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3 lg:items-start">
          {/* LEFT — content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Stats + progress card */}
            <div className="card-soft p-6 sm:p-8" style={{ transform: "none" }}>
              <div className="grid grid-cols-3 divide-x divide-emerald-100 text-center">
                <div className="px-2">
                  <p className="font-display text-2xl font-bold text-emerald-700 sm:text-3xl">
                    {percentageRaised}%
                  </p>
                  <p className="text-xs text-gray-500">Complete</p>
                </div>
                <div className="px-2">
                  <p className="font-display text-2xl font-bold text-emerald-700 sm:text-3xl">
                    {project?.daysLeft || 0}
                  </p>
                  <p className="text-xs text-gray-500">Days Left</p>
                </div>
                <div className="px-2">
                  <p className="font-display text-2xl font-bold text-emerald-700 sm:text-3xl">
                    {project?.beneficiaries || 0}
                  </p>
                  <p className="text-xs text-gray-500">Beneficiaries</p>
                </div>
              </div>

              <div className="mt-6 border-t border-emerald-50 pt-5">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-600">
                    Total Required
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    ₹
                    {project?.totalRequired
                      ? project?.totalRequired.toLocaleString()
                      : "0"}
                  </p>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-emerald-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700"
                    style={{ width: `${percentageRaised}%` }}
                  ></div>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <p className="font-semibold text-emerald-600">
                    ₹
                    {project?.collected
                      ? project?.collected.toLocaleString()
                      : "0"}{" "}
                    raised
                  </p>
                  <p className="text-gray-600">{percentageRaised}% of goal</p>
                </div>
              </div>
            </div>

            {/* Tabs: Impact / About / Updates */}
            {(project?.impact?.length > 0 ||
              project?.description ||
              project?.updates?.length > 0) && (
              <div className="card-soft p-6 sm:p-8" style={{ transform: "none" }}>
                <div className="mb-6 flex flex-wrap gap-1 rounded-full bg-emerald-50 p-1">
                  {project?.impact?.length > 0 && (
                    <button
                      className={`flex-1 cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition ${
                        activeTab === "impact"
                          ? "bg-white text-emerald-700 shadow-sm"
                          : "text-gray-600 hover:text-emerald-700"
                      }`}
                      onClick={() => setActiveTab("impact")}
                    >
                      Impact
                    </button>
                  )}
                  {project?.description && (
                    <button
                      className={`flex-1 cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition ${
                        activeTab === "about"
                          ? "bg-white text-emerald-700 shadow-sm"
                          : "text-gray-600 hover:text-emerald-700"
                      }`}
                      onClick={() => setActiveTab("about")}
                    >
                      About
                    </button>
                  )}
                  {project?.updates?.length > 0 && (
                    <button
                      className={`flex-1 cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition ${
                        activeTab === "updates"
                          ? "bg-white text-emerald-700 shadow-sm"
                          : "text-gray-600 hover:text-emerald-700"
                      }`}
                      onClick={() => setActiveTab("updates")}
                    >
                      Updates
                    </button>
                  )}
                </div>

                {activeTab === "impact" && project?.impact?.length > 0 && (
                  <div className="space-y-4">
                    {project?.impact
                      .slice()
                      .sort((a, b) => {
                        const order = { Direct: 1, Indirect: 2, "Long-term": 3 };
                        return (order[a.type] || 99) - (order[b.type] || 99);
                      })
                      .map((impact, idx) => {
                        let Icon = ImpactIcon;
                        if (impact.type === "Indirect") Icon = Layers;
                        if (impact.type === "Long-term") Icon = Calendar;

                        const bgColors = [
                          "bg-emerald-50",
                          "bg-blue-50",
                          "bg-amber-50",
                        ];
                        const iconColors = [
                          "text-emerald-600",
                          "text-blue-500",
                          "text-amber-500",
                        ];

                        return (
                          <div
                            key={idx}
                            className={`rounded-2xl p-5 ${bgColors[idx] || "bg-gray-50"}`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="rounded-full bg-white p-3 shadow-sm">
                                <Icon
                                  className={`h-6 w-6 ${
                                    iconColors[idx] || "text-gray-700"
                                  }`}
                                />
                              </div>
                              <div>
                                <h3 className="font-display text-lg font-bold text-gray-800">
                                  {impact.type || "Impact Type"} Impact
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {impact.title || "Impact Title"}
                                </p>
                              </div>
                            </div>
                            <p className="mt-2 text-sm text-gray-700">
                              {impact.description || "Impact description"}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                )}

                {activeTab === "impact" &&
                  (!project?.impact || project?.impact?.length === 0) && (
                    <p className="text-center text-gray-600">
                      No impact details available.
                    </p>
                  )}

                {activeTab === "about" && (
                  <div className="space-y-6">
                    <h3 className="font-display text-lg font-bold text-gray-800">
                      About this Project
                    </h3>
                    <div
                      className="whitespace-pre-line text-sm leading-relaxed text-gray-700"
                      dangerouslySetInnerHTML={{ __html: project?.description }}
                    />

                    {/* Timeline */}
                    {project?.timeline?.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="font-display text-lg font-bold text-gray-800">
                          Project Timeline
                        </h3>
                        <div className="space-y-6">
                          {project?.timeline.map((event, idx) => {
                            let styles = {
                              icon: AlertCircle,
                              badgeBg: "bg-gray-100",
                              badgeText: "text-gray-700",
                            };

                            if (event.status === "Completed") {
                              styles = {
                                icon: CheckCircle2,
                                badgeBg: "bg-emerald-100",
                                badgeText: "text-emerald-700",
                              };
                            } else if (event.status === "In Progress") {
                              styles = {
                                icon: Clock,
                                badgeBg: "bg-blue-100",
                                badgeText: "text-blue-700",
                              };
                            }

                            return (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="flex flex-col items-center">
                                  <div
                                    className={`flex h-6 w-6 items-center justify-center rounded-full ${styles.badgeText}`}
                                  >
                                    <styles.icon />
                                  </div>
                                  {idx !== project.timeline.length - 1 && (
                                    <div className="h-full w-0.5 bg-gray-200"></div>
                                  )}
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-800">
                                    {event.title}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    {event.date
                                      ? new Date(
                                          event.date
                                        ).toLocaleDateString()
                                      : "No date"}
                                  </p>
                                  <span
                                    className={`mt-1 inline-block rounded-full px-2 py-1 text-xs ${styles.badgeBg} ${styles.badgeText}`}
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

                {activeTab === "updates" && project?.updates?.length > 0 && (
                  <div className="space-y-4">
                    {project?.updates.map((update, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="rounded-full bg-emerald-100 p-3">
                              <span className="text-xl text-emerald-600">
                                <PiBookOpenTextFill />
                              </span>
                            </div>
                            <h3 className="font-display text-lg font-bold text-gray-800">
                              {update.version || "Update Title"}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-500">
                            {update.date
                              ? new Date(update.date).toLocaleDateString()
                              : "Date"}
                          </p>
                        </div>
                        <p className="mt-3 text-sm text-gray-700">
                          {update.content || "Update description"}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "updates" &&
                  (!project?.updates || project?.updates.length === 0) && (
                    <p className="text-center text-gray-600">
                      No updates available.
                    </p>
                  )}
              </div>
            )}

            {/* Project Manager */}
            <div className="card-soft p-6 sm:p-8" style={{ transform: "none" }}>
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <IoPerson />
                </span>
                <h3 className="font-display text-xl font-bold text-gray-800">
                  Project Manager
                </h3>
              </div>

              <div className="grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <span className="text-gray-400">Name</span>
                  <p className="font-semibold text-gray-800">
                    {project?.projectManager?.name || "Unknown"}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-gray-400">Email</span>
                    <p className="truncate font-semibold text-gray-800">
                      {project?.projectManager?.email || "Not provided"}
                    </p>
                  </div>
                  {project?.projectManager?.email && (
                    <a
                      href={`mailto:${project?.projectManager?.email}`}
                      className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-200 px-3 py-1.5 font-semibold text-emerald-700 transition hover:bg-emerald-50"
                    >
                      <Mail className="h-4 w-4" />
                      Email
                    </a>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-gray-400">Phone</span>
                    <p className="truncate font-semibold text-gray-800">
                      {project?.projectManager?.phone || "Not provided"}
                    </p>
                  </div>
                  {project?.projectManager?.phone && (
                    <a
                      href={`tel:${project?.projectManager?.phone}`}
                      className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-200 px-3 py-1.5 font-semibold text-emerald-700 transition hover:bg-emerald-50"
                    >
                      <Phone className="h-4 w-4" />
                      Call
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — sticky donation card */}
          <div className="lg:sticky lg:top-24">
            {donationCategories.length > 0 ? (
              <div
                className="card-soft space-y-5 p-6"
                style={{ transform: "none" }}
              >
                <div className="flex items-center gap-2">
                  <FaHeart className="h-5 w-5 text-emerald-600" />
                  <h3 className="font-display text-xl font-bold text-gray-800">
                    Make a Donation
                  </h3>
                </div>

                {/* Donation Type */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700">
                    Donation Type
                  </p>
                  <div className="space-y-2">
                    {enabledTypes.map((category) => {
                      const isEnabled = donationCategories.find(
                        (cat) => cat.title === category
                      );
                      const isChecked = checkedDonationType
                        ? checkedDonationType === category
                        : checkedCategory === category;
                      return (
                        <label
                          key={category}
                          className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition ${
                            isChecked
                              ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                              : "border-gray-200 text-gray-700"
                          } ${!isEnabled ? "cursor-not-allowed opacity-40" : ""}`}
                        >
                          <input
                            type="radio"
                            name="donationType"
                            value={category}
                            className="accent-emerald-600"
                            disabled={!isEnabled}
                            checked={isChecked}
                            onChange={(e) =>
                              setCheckedDonationType(e.target.value)
                            }
                          />
                          {category}
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Donation Amount */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700">
                    Donation Amount
                  </p>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount (Min: ₹365)"
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                {/* Frequency */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700">Frequency</p>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-black outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/20"
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
                      type: checkedDonationType || checkedCategory,
                      amount,
                      frequency,
                    },
                  }}
                  className="block"
                >
                  <button className="w-full rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 py-3 font-semibold text-white shadow-[0_10px_24px_-10px_rgba(5,150,105,0.6)] transition-transform duration-300 hover:-translate-y-0.5">
                    Donate Now
                  </button>
                </Link>
              </div>
            ) : (
              <div className="card-soft p-6 text-center text-gray-600" style={{ transform: "none" }}>
                No donation options available for this project.
              </div>
            )}
          </div>
        </div>

        {/* Photo Gallery */}
        {project?.photoGallery?.length > 0 && (
          <div className="mt-12">
            <ProjectGallery images={project?.photoGallery} />
          </div>
        )}

        {/* Video */}
        {project?.youtubeIframe && (
          <section className="mt-12">
            <h2 className="mb-5 text-center font-display text-2xl font-bold text-emerald-900">
              Project Video
            </h2>
            <div className="h-[300px] w-full overflow-hidden rounded-3xl shadow-lg lg:h-[500px]">
              <iframe
                src={
                  project?.youtubeIframe.includes("youtu.be")
                    ? `https://www.youtube.com/embed/${
                        project?.youtubeIframe
                          .split("youtu.be/")[1]
                          .split("?")[0]
                      }`
                    : project?.youtubeIframe
                }
                title="Project Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              ></iframe>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
