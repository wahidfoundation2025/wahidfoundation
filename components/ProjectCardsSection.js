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
  maxCards,
}) => {
  const [projects, setProjects] = useState([]);
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsRes, donationsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/donations/summary`),
        ]);

        const projectsData = await projectsRes.json();
        const donationsData = await donationsRes.json();

        // Create a lookup map for donation summaries
        const donationsMap = {};
        if (donationsData?.data) {
          donationsData.data.forEach((d) => {
            donationsMap[d._id] = {
              totalCollected: d.totalCollected,
              totalDonors: d.totalDonors,
            };
          });
        }

        // Merge donation info into projects
        const mergedProjects = projectsData.projects.map((p) => ({
          ...p,
          donationSummary: donationsMap[p._id] || {
            totalCollected: 0,
            totalDonors: 0,
          },
        }));

        setProjects(mergedProjects);
      } catch (error) {
        console.error("Failed to fetch projects/donations", error);
      }
    }
    fetchData();
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

  const formatNumber = (num) => {
    if (num >= 1_000_000) {
      return Math.floor(num / 1_000_000) + "M";
    } else if (num >= 1_000) {
      return Math.floor(num / 1_000) + "K";
    }
    return num.toString();
  };

  const filteredProjects = projects.filter((project) => {
    if (!project.status || project.status === "Draft") return false;

    const matchesSearch =
      !searchTerm ||
      (project.title?.toLowerCase?.().includes(searchTerm.toLowerCase?.()) ??
        false) ||
      (project.description
        ?.toLowerCase?.()
        .includes(searchTerm.toLowerCase?.()) ??
        false) ||
      (project.location?.toLowerCase?.().includes(searchTerm.toLowerCase?.()) ??
        false);

    const matchesCategory =
      categoryFilter === "all" ||
      (Array.isArray(project.category) &&
        project.category.includes(categoryFilter));

    let matchesDonationType = true;

    if (donationTypeFilter !== "all") {
      matchesDonationType = project.donationOptions?.some((option) => {
        if (!option.isEnabled) return false;

        if (donationTypeFilter === "zakat") {
          return option.type.toLowerCase() === "zakat";
        } else if (donationTypeFilter === "interest_earnings") {
          return option.type.toLowerCase() === "interest earnings";
        } else if (donationTypeFilter === "sadqa") {
          return option.type.toLowerCase() === "sadqa";
        } else if (donationTypeFilter === "general") {
          return option.type.toLowerCase() === "general donation";
        }

        return false;
      });
    }

    return matchesSearch && matchesCategory && matchesDonationType;
  });

  const displayedProjects =
    typeof maxCards === "number"
      ? filteredProjects.slice(0, maxCards)
      : filteredProjects;

  return (
    <section className="flex justify-center w-full px-4 py-4 sm:px-12 text-gray-900">
      {displayedProjects.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No projects found.
        </div>
      ) : (
        <div
          className={
            `${
              displayedProjects.length > 2
                ? "sm:[grid-template-columns:repeat(auto-fit,minmax(330px,1fr))] "
                : "lg:[grid-template-columns:repeat(auto-fit,minmax(300px,400px))] sm:[grid-template-columns:repeat(auto-fit,minmax(330px,1fr))]"
            } ` +
            " [grid-template-columns:repeat(auto-fit,minmax(290px,1fr))] w-full grid md:gap-8 gap-4"
          }
        >
          {displayedProjects.map((project) => (
            <div
              key={project._id}
              className="overflow-hidden bg-white border-none rounded-xl shadow-sm hover:shadow-xl transition-shadow lg:hover:shadow-xl lg:hover:scale-101 lg:transition-all lg:duration-300 flex flex-col"
            >
              {/* Image & Labels */}
              <div className="h-48 relative lg:h-56">
                <img
                  src={project.cardImage || project.mainImage}
                  alt={project.title || "Project"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                  {project.category?.length > 0 ? (
                    project.category.map((cat, index) => (
                      <span
                        key={index}
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getCategoryColor(
                          cat
                        )}`}
                      >
                        {cat}
                      </span>
                    ))
                  ) : (
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-gray-200 text-gray-700">
                      Uncategorized
                    </span>
                  )}

                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status || "Unknown"}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center space-x-1 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{project.location || "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="p-6">
                <h3 className="text-xl text-emerald-800 font-semibold min-h-[56px]">
                  {project.title || "Untitled Project"}
                </h3>
                <p className="text-sm text-gray-600 mt-1.5 min-h-[60px]">
                  {(project.description?.slice?.(0, 120) ??
                    "No description available") + "..."}
                </p>
              </div>

              {/* Stats */}
              <div className="p-6 pt-0 space-y-4 flex flex-col flex-grow">
                {project.totalRequired > 0 ? (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-semibold">
                          {project.completion ?? 0}%
                        </span>
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
                        <span className="max-w-[106px] truncate">
                          {formatNumber(project.beneficiaries ?? 0)}{" "}
                          beneficiaries
                        </span>
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
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between bg-white p-4">
                      {/* Total Collected */}
                      <div className="flex flex-col items-center text-center font-bold">
                        <span className="text-xs uppercase tracking-wide text-gray-500">
                          Total Collected
                        </span>
                        <span className="text-lg text-emerald-600">
                          {formatCurrency(
                            project.donationSummary?.totalCollected ?? 0
                          )}
                        </span>
                      </div>

                      {/* Total Donors */}
                      <div className="flex flex-col items-center text-center font-bold">
                        <span className="text-xs uppercase tracking-wide text-gray-500">
                          Total Donors
                        </span>
                        <span className="text-lg text-gray-800">
                          {project.donationSummary?.totalDonors ?? 0}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                  {project.status !== "Completed" && (
                    <Link
                      href={{
                        pathname: !isSignedIn ? "/login" : "/donate",
                        query: { project: project._id },
                      }}
                      className="w-full sm:flex-1 text-center bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 font-semibold"
                    > Donate Now
                    </Link>
                  )}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="w-full sm:flex-1 text-center border border-emerald-600 text-emerald-600 py-2 px-4 rounded-lg hover:bg-emerald-50 font-semibold"
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
