"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { MapPin, Users, Calendar } from "lucide-react";

const ProjectCardsSection = ({
  searchTerm = "",
  categoryFilter = "all",
  donationTypeFilter = "all",
}) => {
  const [projects, setProjects] = useState([]);
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("https://wahidfoundationadmin.vercel.app/api/projects");
        const data = await res.json();
        setProjects(data.projects);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      }
    }
    fetchProjects();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Education: "bg-blue-100 text-blue-800",
      "Women Empowerment": "bg-pink-100 text-pink-800",
      Healthcare: "bg-red-100 text-red-800",
      "Economic Empowerment": "bg-green-100 text-green-800",
      "Rural Empowerment": "bg-amber-100 text-amber-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status) => {
    return status === "Completed"
      ? "bg-green-100 text-green-800"
      : "bg-blue-100 text-blue-800";
  };

  const handleDonateClick = (projectId) => {
    if (!isSignedIn) {
      router.push(`/login?redirect_url=/donate?project=${projectId}`);
    } else {
      router.push(`/donate?project=${projectId}`);
    }
  };

  // Strict filtering logic
  const filteredProjects = projects.filter((project) => {
    // Exclude projects with status 'Draft'
    if (!project.status || project.status === "Draft") return false;

    // Search filter
    const matchesSearch =
      !searchTerm ||
      (project.title?.toLowerCase?.().includes(searchTerm.toLowerCase?.()) ?? false) ||
      (project.description?.toLowerCase?.().includes(searchTerm.toLowerCase?.()) ?? false) ||
      (project.location?.toLowerCase?.().includes(searchTerm.toLowerCase?.()) ?? false);

    // Category filter
    const matchesCategory =
      categoryFilter === "all" || project.category === categoryFilter;

    // Donation type filter
    let matchesDonationType = true;
    if (donationTypeFilter !== "all") {
      if (donationTypeFilter === "zakat") {
        matchesDonationType = !!project.zakat_eligible;
      } else if (donationTypeFilter === "interest_earnings") {
        matchesDonationType = !!project.interest_earnings_eligible;
      } else if (donationTypeFilter === "sadqa") {
        matchesDonationType = !!project.sadqa_eligible;
      } else if (donationTypeFilter === "general") {
        matchesDonationType =
          !project.zakat_eligible &&
          !project.interest_earnings_eligible &&
          !project.sadqa_eligible;
      }
    }

    return matchesSearch && matchesCategory && matchesDonationType;
  });

  return (
    <section className="container mx-auto px-4 py-8 lg:px-8 lg:py-12 text-gray-900">
      {filteredProjects.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No projects found.</div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="overflow-hidden bg-white border-none rounded-lg shadow-sm hover:shadow-xl transition-shadow lg:hover:shadow-2xl lg:hover:scale-105 lg:transition-all lg:duration-300"
            >
              <div className="h-48 relative lg:h-56">
                <img
                  src={project.mainImage || "/globe.svg"}
                  alt={project.title || "Project"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getCategoryColor(project.category)}`}>
                    {project.category || "Uncategorized"}
                  </span>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(project.status)}`}>
                    {project.status || "Unknown"}
                  </span>
                  {project.zakat_eligible && (
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800">
                      Zakat Eligible
                    </span>
                  )}
                  {project.interest_earnings_eligible && (
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-orange-100 text-orange-800">
                      Interest Earnings
                    </span>
                  )}
                  {project.sadqa_eligible && (
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-pink-100 text-pink-800">
                      Sadqa
                    </span>
                  )}
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center space-x-1 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{project.location || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl text-emerald-800 font-semibold">
                  {project.title || "Untitled Project"}
                </h3>
                <p className="text-sm text-gray-600 mt-1.5">
                  {(project.description?.slice?.(0, 120) ?? "No description available") + "..."}
                </p>
              </div>

              <div className="p-6 pt-0 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold">{project.completion ?? 0}%</span>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full bg-emerald-600 transition-all"
                      style={{ width: `${project.completion || 0}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-600 font-semibold">
                      {formatCurrency(project.collected ?? 0)}
                    </span>
                    <span className="text-gray-600">
                      of {formatCurrency(project.totalRequired ?? 0)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-emerald-600" />
                    <span>{project.beneficiaries ?? 0} beneficiaries</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-amber-600" />
                    <span>
                      {project.status === "Completed"
                        ? "Completed"
                        : `${project.daysLeft ?? 0} days left`}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  {project.status !== "Completed" && (
                    <button
                      onClick={() => handleDonateClick(project._id)}
                      className="flex-1 text-center bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 font-semibold"
                    >
                      Donate Now
                    </button>
                  )}
                  <Link
                    href={`/projects/${project._id}`}
                    className="flex-1 text-center border border-emerald-600 text-emerald-600 py-2 px-4 rounded-lg hover:bg-emerald-50 font-semibold"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectCardsSection;