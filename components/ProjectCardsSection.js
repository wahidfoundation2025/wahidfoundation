"use client";

import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Users, Calendar } from "lucide-react";
import Image from "next/image";

import ShareButton from "./ShareButton";

// Utils
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

// Skeleton Loader
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

export default function ProjectCardsSection({
  searchTerm = "",
  categoryFilter = "all",
  donationTypeFilter = "all",
  infiniteScroll = false, // homepage=false, projects page=true
  initialLimit = 4, // how many to load per API call
}) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { isSignedIn } = useUser();
  const observerRef = useRef(null);
  const hasMoreRef = useRef(hasMore);
  const loadingRef = useRef(loading);
  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);
  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  // Fetch data
  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);

        const [projectsRes, donationsRes] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/projects?limit=${initialLimit}&page=${page}`,
            { signal: controller.signal }
          ),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/donations/summary`, {
            signal: controller.signal,
          }),
        ]);

        console.log(`${process.env.NEXT_PUBLIC_API_URL}/projects?limit=${initialLimit}&page=${page}`)

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

        // If page=1, reset list, else append
        setProjects((prev) => (page === 1 ? merged : [...prev, ...merged]));

        // Stop if no more pages
        if (page >= (projectsData?.totalPages || 1)) {
          setHasMore(false);
        }
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
  }, [page, initialLimit]);

  // Infinite scroll: callback ref attaches the observer when the sentinel
  // mounts. Reads live values from refs so it isn't recreated on each render
  // (which would re-fire immediately and chain-load every page at once).
  const loaderRef = useCallback(
    (node) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (!node || !infiniteScroll) return;
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            hasMoreRef.current &&
            !loadingRef.current
          ) {
            setPage((prev) => prev + 1);
          }
        },
        { rootMargin: "200px", threshold: 0 }
      );
      observerRef.current.observe(node);
    },
    [infiniteScroll]
  );

  // Filtering
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

  return (
    <section className="flex flex-col items-center w-full px-4 py-4 sm:px-12 text-gray-900">
      {loading && page === 1 ? (
        <div className="grid w-full md:gap-8 gap-4 sm:[grid-template-columns:repeat(auto-fit,minmax(330px,1fr))] [grid-template-columns:repeat(auto-fit,minmax(290px,1fr))]">
          {Array.from({ length: infiniteScroll ? initialLimit : 3 }).map(
            (_, i) => (
              <ProjectCardSkeleton key={i} />
            )
          )}
        </div>
      ) : (
        <>
          {/* Projects Grid */}
          <div className="grid w-full md:gap-8 gap-4 sm:[grid-template-columns:repeat(auto-fit,minmax(330px,1fr))] [grid-template-columns:repeat(auto-fit,minmax(290px,1fr))]">
            {filteredProjects.map((project) => (
              <div
                key={project?._id}
                className="card-soft group flex flex-col overflow-hidden"
              >
                {/* Image & Share */}
                <div className="relative h-48 overflow-hidden lg:h-56">
                  <Image
                    src={project?.cardImage || project?.mainImage}
                    alt={project?.title || "Project"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"></div>
                  {project?.status === "Completed" && (
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur-sm">
                      Completed
                    </span>
                  )}
                  <div className="absolute right-3 top-3">
                    <ShareButton slug={project?.slug || ""} />
                  </div>
                </div>

                {/* Title & Description */}
                <div className="p-6 pb-3">
                  <h3 className="min-h-[56px] font-display text-xl font-bold text-emerald-900">
                    {project?.title || "Untitled Project"}
                  </h3>
                  <p
                    className="mt-1.5 line-clamp-3 min-h-[60px] text-sm leading-relaxed text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html:
                        project?.description || "No description available",
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

                  {/* Action Buttons */}
                  <div className="mt-auto flex flex-col gap-2 pt-1 sm:flex-row">
                    {project?.status !== "Completed" && (
                      <Link
                        href={
                          !isSignedIn
                            ? "/login"
                            : `/donate/${project?.slug || ""}`
                        }
                        className="w-full rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-[0_8px_18px_-8px_rgba(5,150,105,0.6)] transition-transform hover:-translate-y-0.5 sm:flex-1"
                      >
                        Donate Now
                      </Link>
                    )}
                    <Link
                      href={`/projects/${project?.slug || ""}`}
                      className="w-full rounded-full border border-emerald-200 px-4 py-2.5 text-center text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50 sm:flex-1"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Infinite scroll: skeletons only while a page is actually loading,
              plus a lightweight sentinel that triggers the next page. */}
          {infiniteScroll && hasMore && (
            <div className="mt-6 w-full">
              {loading && (
                <div className="grid w-full md:gap-8 gap-4 sm:[grid-template-columns:repeat(auto-fit,minmax(330px,1fr))] [grid-template-columns:repeat(auto-fit,minmax(290px,1fr))]">
                  {Array.from({ length: initialLimit }).map((_, i) => (
                    <ProjectCardSkeleton key={`skeleton-${i}`} />
                  ))}
                </div>
              )}
              <div ref={loaderRef} aria-hidden className="h-8 w-full" />
            </div>
          )}
        </>
      )}
    </section>
  );
}
