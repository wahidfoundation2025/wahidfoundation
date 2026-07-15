"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import ProjectCardsSection from "./ProjectCardsSection";
import { Filter, Search } from "lucide-react";

import useResponsiveLimit from "../app/hooks/useResponsiveLimit";
import useDebounce from "../app/hooks/useDebounce";

function Projects({ title }) {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput);

  const [categoryFilter, setCategoryFilter] = useState("all");
  const [donationTypeFilter, setDonationTypeFilter] = useState(title || "all");
  const [categories, setCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const donationTypes = useMemo(
    () => ["all", "general", "zakat", "sadqa", "interest_earnings"],
    []
  );

  // Fetch categories with cleanup
  useEffect(() => {
    const controller = new AbortController();

    async function fetchCategories() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`,
          { signal: controller.signal }
        );
        const data = await res.json();

        const cats = Array.isArray(data)
          ? data
          : Array.isArray(data.categories)
          ? data.categories
          : [];

        setCategories(cats);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Failed to fetch categories", error);
        }
      }
    }

    fetchCategories();

    return () => controller.abort();
  }, []);

  // Clear filters handler
  const handleClearFilters = useCallback(() => {
    setSearchInput("");
    setCategoryFilter("all");
    setDonationTypeFilter("all");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white text-gray-900">
      {/* Header */}
      <section className="container-x px-4 pb-10 pt-32 text-center sm:pt-40">
        <span className="eyebrow justify-center">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Our Work
        </span>
        <h1 className="mt-3 font-display text-4xl font-bold text-emerald-900 md:text-5xl">
          Our Projects
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
          Discover the initiatives we're working on across India. Every project
          is carefully planned and transparently managed to maximize impact for
          the communities we serve.
        </p>
      </section>

      {/* Filter Section */}
      <section className="container-x">
        <div className="card-soft mb-4 p-4 sm:p-6" style={{ transform: "none" }}>
          <div className="flex flex-col gap-4 lg:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="flex min-w-full flex-row gap-2 lg:min-w-0">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-emerald-400" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search projects by name, description, or location..."
                  className="w-full rounded-full border border-emerald-100 bg-emerald-50/40 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 sm:text-base lg:w-auto"
                />
              </div>

              <button
                onClick={() => setShowFilters((prev) => !prev)}
                aria-label="Toggle filters"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-emerald-100 text-emerald-600 transition hover:bg-emerald-50 md:hidden"
              >
                <Filter className="h-5 w-5" />
              </button>
            </div>

            {/* Filters */}
            <div
              className={`${
                showFilters ? "flex md:flex" : "hidden md:flex"
              } w-full flex-col gap-3 sm:flex-row`}
            >
              {/* Category Filter */}
              <div className="flex flex-1 items-center gap-2">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="flex-1 cursor-pointer appearance-none rounded-full border border-emerald-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Donation Filter */}
              <div className="flex flex-1 items-center gap-2">
                <select
                  value={donationTypeFilter}
                  onChange={(e) => setDonationTypeFilter(e.target.value)}
                  className="flex-1 cursor-pointer appearance-none rounded-full border border-emerald-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-500/20"
                >
                  {donationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type === "all"
                        ? "All Donation Types"
                        : type === "zakat"
                        ? "Zakat Eligible"
                        : type === "interest_earnings"
                        ? "Interest Earnings"
                        : type === "sadqa"
                        ? "Sadqa"
                        : "General"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={handleClearFilters}
                className="flex-1 cursor-pointer rounded-full bg-emerald-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-950"
              >
                <span className="hidden md:block">Clear All Filters</span>
                <span className="block md:hidden">Clear</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Project Cards */}
      <section className="w-full pb-20">
        {(() => {
          const responsiveLimit = useResponsiveLimit();
          return (
            <ProjectCardsSection
              searchTerm={debouncedSearch}
              categoryFilter={categoryFilter}
              donationTypeFilter={donationTypeFilter}
              initialLimit={responsiveLimit}
              infiniteScroll={true}
            />
          );
        })()}
      </section>
    </div>
  );
}

export default Projects;
