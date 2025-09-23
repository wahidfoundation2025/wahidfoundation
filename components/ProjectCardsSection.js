"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { MapPin, Users, Calendar } from "lucide-react";
import Image from "next/image";

import ShareButton from "./ShareButton";

const categoryColors = {
  Education: "bg-blue-100 text-blue-800",
  "Women Empowerment": "bg-pink-100 text-pink-800",
  Healthcare: "bg-red-100 text-red-800",
  "Economic Empowerment": "bg-green-100 text-green-800",
  "Rural Empowerment": "bg-amber-100 text-amber-800",
};

const statusColors = {
  Completed: "bg-green-100 text-green-800",
  Active: "bg-blue-100 text-blue-800",
};

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);

const formatNumber = (num) => {
  if (num >= 1_000_000) return Math.floor(num / 1_000_000) + "M";
  if (num >= 1_000) return Math.floor(num / 1_000) + "K";
  return num?.toString() || "0";
};

// Skeleton Loader Component
const ProjectCardSkeleton = () => (
  <div className="overflow-hidden bg-white rounded-xl shadow-sm animate-pulse flex flex-col">
    <div className="h-48 lg:h-56 bg-gray-200"></div>
    <div className="p-6 space-y-3">
      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
    <div className="p-6 pt-0 space-y-3">
      <div className="h-2 bg-gray-200 rounded w-full"></div>
      <div className="h-2 bg-gray-200 rounded w-2/3"></div>
      <div className="flex gap-2">
        <div className="h-10 bg-gray-200 rounded w-1/2"></div>
        <div className="h-10 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

const ProjectCardsSection = ({
  searchTerm = "",
  categoryFilter = "all",
  donationTypeFilter = "all",
  maxCards,
}) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isSignedIn } = useUser();

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        const [projectsRes, donationsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
            signal: controller.signal,
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/donations/summary`, {
            signal: controller.signal,
          }),
        ]);

        const projectsData = await projectsRes.json();
        const donationsData = await donationsRes.json();

        const donationsMap = {};
        donationsData?.data?.forEach((d) => {
          donationsMap[d._id] = {
            totalCollected: d.totalCollected,
            totalDonors: d.totalDonors,
          };
        });

        const merged = Array.isArray(projectsData?.projects)
          ? projectsData.projects.map((p) => ({
              ...p,
              donationSummary: donationsMap[p._id] || {
                totalCollected: 0,
                totalDonors: 0,
              },
            }))
          : [];

        setProjects(merged);
      } catch (err) {
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          console.error("Failed to fetch projects/donations", err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, []);

  // normalize maxCards to number
  const max = typeof maxCards === "string" ? parseInt(maxCards, 10) : maxCards;

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (!project?.status || project.status === "Draft") return false;

      const matchesSearch =
        !searchTerm ||
        project?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project?.description
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        project?.location?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" ||
        (Array.isArray(project?.category) &&
          project.category.includes(categoryFilter));

      let matchesDonationType = true;
      if (donationTypeFilter !== "all") {
        matchesDonationType = project?.donationOptions?.some((opt) => {
          if (!opt?.isEnabled) return false;
          const type = opt.type?.toLowerCase();
          return (
            (donationTypeFilter === "zakat" && type === "zakat") ||
            (donationTypeFilter === "interest_earnings" &&
              type === "interest earnings") ||
            (donationTypeFilter === "sadqa" && type === "sadqa") ||
            (donationTypeFilter === "general" && type === "general donation")
          );
        });
      }

      return matchesSearch && matchesCategory && matchesDonationType;
    });
  }, [projects, searchTerm, categoryFilter, donationTypeFilter]);

  const displayedProjects = useMemo(
    () =>
      typeof max === "number"
        ? filteredProjects.slice(0, max)
        : filteredProjects,
    [filteredProjects, max]
  );

  return (
    <section className="flex justify-center w-full px-4 py-4 sm:px-12 text-gray-900">
      {loading ? (
        <div className="grid w-full md:gap-8 gap-4 sm:[grid-template-columns:repeat(auto-fit,minmax(330px,1fr))] [grid-template-columns:repeat(auto-fit,minmax(290px,1fr))]">
          {Array.from({ length: max || 4 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div
          className={`grid w-full md:gap-8 gap-4 ${
            displayedProjects.length > 2
              ? "sm:[grid-template-columns:repeat(auto-fit,minmax(330px,1fr))]"
              : "lg:[grid-template-columns:repeat(auto-fit,minmax(300px,400px))] sm:[grid-template-columns:repeat(auto-fit,minmax(330px,1fr))]"
          } [grid-template-columns:repeat(auto-fit,minmax(290px,1fr))]`}
        >
          {/* ✅ Render Actual Projects */}
          {displayedProjects.map((project) => (
            <div
              key={project?._id}
              className="overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-xl transition lg:hover:scale-105 flex flex-col"
            >
              {/* Image & Labels */}
              <div className="h-48 lg:h-56 relative">
                <Image
                  src={project?.cardImage || project?.mainImage}
                  alt={project?.title || "Project"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                <div className="absolute top-2 right-2">
                  <ShareButton slug={project?.slug || ""} />
                </div>
              </div>

              {/* Title & Description */}
              <div className="p-6">
                <h3 className="text-xl text-emerald-800 font-semibold min-h-[56px]">
                  {project?.title || "Untitled Project"}
                </h3>
                <p
                  className="text-sm text-gray-600 mt-1.5 min-h-[60px] line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: project?.description || "No description available",
                  }}
                />
              </div>

              {/* Stats & Buttons */}
              <div className="p-6 pt-0 flex flex-col flex-grow space-y-4">
                {project?.totalRequired > 0 ? (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-semibold">
                          {project?.completion ?? 0}%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 transition-all"
                          style={{ width: `${project?.completion || 0}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-emerald-600 font-semibold">
                          {formatCurrency(project?.collected ?? 0)}
                        </span>
                        <span className="text-gray-600">
                          of {formatCurrency(project?.totalRequired ?? 0)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-emerald-600" />
                        <span className="truncate">
                          {formatNumber(project?.beneficiaries ?? 0)}{" "}
                          beneficiaries
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-amber-600" />
                        <span>
                          {project?.status === "Completed"
                            ? "Completed"
                            : `${project?.daysLeft ?? 0} days left`}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between bg-white p-4">
                    <div className="flex flex-col items-center font-bold text-center">
                      <span className="text-xs uppercase text-gray-500">
                        Total Collected
                      </span>
                      <span className="text-lg text-emerald-600">
                        {formatCurrency(
                          project?.donationSummary?.totalCollected ?? 0
                        )}
                      </span>
                    </div>
                    <div className="flex flex-col items-center font-bold text-center">
                      <span className="text-xs uppercase text-gray-500">
                        Total Donors
                      </span>
                      <span className="text-lg text-gray-800">
                        {project?.donationSummary?.totalDonors ?? 0}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                  {project?.status !== "Completed" && (
                    <Link
                      href={
                        !isSignedIn
                          ? "/login"
                          : `/donate/${project?.slug || ""}`
                      }
                      className="w-full sm:flex-1 text-center bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 font-semibold"
                    >
                      Donate Now
                    </Link>
                  )}
                  <Link
                    href={`/projects/${project?.slug || ""}`}
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
