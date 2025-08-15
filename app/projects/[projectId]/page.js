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
} from "lucide-react";
import { motion } from "framer-motion";
import { IoPerson } from "react-icons/io5";
import Link from "next/link";

export default function ProjectDetailsPage() {
  const params = useParams();
  const projectId = params?.projectId;
  const { isSignedIn } = useUser();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("impact"); // State for tabbed interface
  const router = useRouter();

  useEffect(() => {
    async function fetchProject() {
      try {
        if (!projectId) throw new Error("Project ID is missing");
        const res = await fetch(
          `https://wahidfoundationadmin-seven.vercel.app/api/projects/${projectId}`
        );
        if (!res.ok) throw new Error("Failed to fetch project");
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

    if (projectId) fetchProject();
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

  const handleDonateClick = (projectId, donationType) => {
    if (!isSignedIn) {
      router.push(
        `/login?redirect_url=/donate?project=${projectId}&type=${donationType}`
      );
    } else {
      router.push(`/donate?project=${projectId}&type=${donationType}`);
    }
  };

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

  return (
    <main className="space-y-8 bg-white pb-16 px-4 lg:px-8">
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
            <div className="flex justify-center gap-6 flex-wrap mb-6 lg:mb-12">
              {donationCategories.map((category, index) => (
                <div
                  key={index}
                  className={`${category.bgColor} border-0 rounded-lg shadow-sm hover:shadow-md transition-shadow lg:hover:shadow-xl lg:hover:scale-105 lg:transition-all lg:duration-300 w-64`}
                >
                  <div className="text-center p-4 lg:p-6">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mx-auto mb-3 shadow-sm lg:w-20 lg:h-20 lg:mb-4">
                      <category.icon
                        className={`h-7 w-7 ${category.color} lg:h-10 lg:w-10`}
                      />
                    </div>
                    <h3 className="text-lg text-gray-800 lg:text-xl font-semibold">
                      {category.title}
                    </h3>
                  </div>
                  <div className="text-center space-y-3 p-4 pt-0 lg:p-6 lg:pt-0 lg:space-y-4">
                    <p className="text-xs text-gray-600 leading-relaxed lg:text-sm lg:leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link
                href={`/donate?project=${projectId}`}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 inline-block"
              >
                Donate Now
              </Link>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600">
            No donation options available for this project.
          </p>
        )}
      </section>

      <section className="flex flex-col md:flex-row justify-center items-start gap-6 px-4 lg:max-w-6xl lg:mx-auto">
        <div className="bg-gray-50 p-6 rounded-xl shadow max-w-xl w-full flex-1">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 text-center md:text-left">
            About the Project
          </h2>
          <p className="text-gray-700 whitespace-pre-line text-center md:text-left">
            {project.description || "No description available."}
          </p>
        </div>
        {project.projectManager && (
          <div className="bg-gray-50 border rounded-xl p-6 shadow max-w-sm w-full flex-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center md:text-left">
              Project Manager
            </h2>
            <div className="space-y-4 text-gray-700 text-sm text-center md:text-left">
              <div className="flex items-center font-semibold justify-center md:justify-start">
                <span className="mr-2">
                  <IoPerson />
                </span>
                {project.projectManager.name || "Unknown"}
              </div>
              <p className="flex justify-center md:justify-start items-center space-x-2">
                <Mail className="w-4 h-4" />
                <a
                  href={`mailto:${project.projectManager.email || ""}`}
                  className="text-blue-600 hover:underline"
                >
                  {project.projectManager.email || "No email provided"}
                </a>
              </p>
              <p className="flex justify-center md:justify-start items-center space-x-2">
                <Phone className="w-4 h-4" />
                <a
                  href={`tel:${project.projectManager.phone || ""}`}
                  className="text-blue-600 hover:underline"
                >
                  {project.projectManager.phone || "No phone provided"}
                </a>
              </p>
            </div>
          </div>
        )}
      </section>

      {(project.impact?.length > 0 || project.updates?.length > 0) && (
        <section className="px-4 lg:max-w-6xl lg:mx-auto">
          <div className="flex border-b border-gray-200 mb-6">
            {project.impact?.length > 0 && (
              <button
                className={`px-4 py-2 text-sm font-medium lg:text-base lg:px-6 ${
                  activeTab === "impact"
                    ? "border-b-2 border-emerald-600 text-emerald-600"
                    : "text-gray-600 hover:text-emerald-600"
                }`}
                onClick={() => setActiveTab("impact")}
              >
                Project Impact
              </button>
            )}
            {project.updates?.length > 0 && (
              <button
                className={`px-4 py-2 text-sm font-medium lg:text-base lg:px-6 ${
                  activeTab === "updates"
                    ? "border-b-2 border-emerald-600 text-emerald-600"
                    : "text-gray-600 hover:text-emerald-600"
                }`}
                onClick={() => setActiveTab("updates")}
              >
                Project Updates
              </button>
            )}
          </div>

          {activeTab === "impact" && project.impact?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.impact.map((impact, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  {impact.icon && (
                    <img
                      src={impact.icon}
                      alt={impact.title || "Impact"}
                      className="w-12 h-12 object-cover rounded-full mb-3 mx-auto"
                    />
                  )}
                  <h3 className="text-lg font-semibold text-gray-800 text-center">
                    {impact.title || "Untitled Impact"}
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    {impact.description || "No description available."}
                  </p>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Type: {impact.type || "Unknown"}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "impact" &&
            (!project.impact || project.impact.length === 0) && (
              <p className="text-center text-gray-600">
                No impact details available.
              </p>
            )}

          {activeTab === "updates" && project.updates?.length > 0 && (
            <div className="space-y-4">
              {project.updates.map((update, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {update.version || "Update"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {update.content || "No content available."}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Date:{" "}
                    {update.date
                      ? new Date(update.date).toLocaleDateString()
                      : "Unknown"}
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
        <section className="px-4 lg:max-w-6xl lg:mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center space-x-2">
            <ImageIcon className="w-5 h-5" />
            <span>Project Gallery</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {project.photoGallery.map((url, idx) => (
              <img
                key={idx}
                src={url}
                className="rounded-lg w-full h-40 lg:h-60 object-cover"
                alt={`Gallery Image ${idx + 1}`}
              />
            ))}
          </div>
        </section>
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
