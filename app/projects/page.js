'use client';

import { useEffect, useState } from 'react';
import ProjectCardsSection from '../components/Project';
import { Filter, Search } from 'lucide-react';

const Projects = () => {
  const [searchInput, setSearchInput] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [donationTypeFilter, setDonationTypeFilter] = useState('all');
  const [categories, setCategories] = useState([]); // from API

  const donationTypes = ['all', 'general', 'zakat', 'sadqa', 'interest_earnings'];

  // Fetch categories from API
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('https://wahidfoundationadmin-seven.vercel.app/api/categories');
        const data = await res.json();

        // API gives array of objects: [{ _id, name, description, ... }, ...]
        if (Array.isArray(data)) {
          setCategories(data);
        } else if (Array.isArray(data.categories)) {
          // in case it's wrapped
          setCategories(data.categories);
        }
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    }

    fetchCategories();
  }, []);

  // Clear filters
  const handleClearFilters = () => {
    setSearchInput('');
    setCategoryFilter('all');
    setDonationTypeFilter('all');
  };

  return (
    <div className="min-h-screen bg-emerald-50 text-gray-900">
      {/* Header */}
      <section className="text-center px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-emerald-800">Our Projects</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
          Discover the initiatives we're working on across India. Every project is carefully
          planned and transparently managed to maximize impact for the communities we serve.
        </p>
        <div className="h-1 w-12 bg-amber-500 mt-6 mx-auto" />
      </section>

      {/* Filter Section */}
      <section className="bg-white max-w-6xl mx-auto p-6 rounded-xl shadow mb-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search projects by name, description, or location..."
              className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="py-2 px-3 rounded-md border border-gray-300"
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
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400" />
            <select
              value={donationTypeFilter}
              onChange={(e) => setDonationTypeFilter(e.target.value)}
              className="py-2 px-3 rounded-md border border-gray-300"
            >
              {donationTypes.map((type) => (
                <option key={type} value={type}>
                  {type === 'all'
                    ? 'All Donation Types'
                    : type === 'zakat'
                    ? 'Zakat Eligible'
                    : type === 'interest_earnings'
                    ? 'Interest Earnings'
                    : type === 'sadqa'
                    ? 'Sadqa'
                    : 'General'}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          <button
            onClick={handleClearFilters}
            className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 font-semibold hover:bg-gray-50"
          >
            Clear All Filters
          </button>
        </div>
      </section>

      {/* Project Cards */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <ProjectCardsSection
          searchTerm={searchInput}
          categoryFilter={categoryFilter}
          donationTypeFilter={donationTypeFilter}
        />
      </section>
    </div>
  );
};

export default Projects;
