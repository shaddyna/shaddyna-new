/*"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import { SkillCard } from "@/components/skillComponent/skillCard";
import { SkillsFilter } from "@/components/skillComponent/SkillsFilter";
import { Skill } from "@/types/skills";
import AddSkillButton from "@/components/skillComponent/addSkillButton";
import ManageSkillsButton from "@/components/skillComponent/manageSkillButton";

const categories = ["Design", "Development", "Marketing", "Writing", "Business"];
const priceTypes = ["hourly", "fixed", "negotiable"];

const SkillsPage = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState({
    category: "",
    priceRange: [0, 1000] as [number, number],
    priceType: "",
    searchQuery: "",
    page: 1,
    limit: 10,
    sortBy: "createdAt:desc",
  });

  const [pagination, setPagination] = useState({
    total: 0,
    pages: 0,
  });

  // Fetch skills from the API
  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (filter.category) params.append("category", filter.category);
      if (filter.searchQuery) params.append("search", filter.searchQuery);
      params.append("page", filter.page.toString());
      params.append("limit", filter.limit.toString());
      params.append("sortBy", filter.sortBy);

      const response = await axios.get(`https://shaddyna-backend.onrender.com/api/skill/`, {
        params,
      });

      const { total, pages, skills: fetchedSkills } = response.data;

      setSkills(fetchedSkills);
      setPagination({ total, pages });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch skills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [filter]);

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Skills Marketplace | Find Professionals</title>
        <meta name="description" content="Browse and connect with skilled professionals" />
      </Head>

      <div className="bg-gradient-to-r from-[#0f1c47] to-[#bf2c7e] py-16 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Find the Perfect Skill</h1>
          <p className="text-xl max-w-2xl">
            Connect with talented professionals offering their expertise. Get your projects done right.
          </p>
        </div>
      </div>

    {/* Buttons for adding and managing skills *
      <div className="container mx-auto px-4 py-8">
    <div className="flex justify-between items-center mb-0 gap-4">
      <AddSkillButton />
      <ManageSkillsButton />
    </div>
      </div>

      <div className="container mx-auto px-4 py-0">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters *
          <div className="lg:w-1/4">
            <SkillsFilter
              categories={categories}
              priceTypes={priceTypes}
              filter={filter}
              setFilter={setFilter}
            />
          </div>

          {/* Skills List *
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#0f1c47]">
                {filter.category || "All"} Skills
              </h2>
              <div className="text-gray-500">{pagination.total} results</div>
            </div>

            {/* Loading State *
            {loading && (
              <div className="col-span-2 bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500">Loading...</p>
              </div>
            )}

            {/* Error State *
            {error && (
              <div className="col-span-2 bg-red-50 rounded-lg p-8 text-center">
                <p className="text-red-600">Error: {error}</p>
              </div>
            )}

            {/* Skills Grid *
            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.length > 0 ? (
                  skills.map((skill) => (
                    <SkillCard key={skill._id} skill={skill} />
                  ))
                ) : (
                  <div className="col-span-2 bg-gray-50 rounded-lg p-8 text-center">
                    <p className="text-gray-500">No skills found matching your criteria</p>
                  </div>
                )}
              </div>
            )}

            {/* Pagination Controls *
            {pagination.pages > 1 && (
              <div className="flex justify-center mt-8 space-x-4">
                <button
                  onClick={() =>
                    setFilter((prev) => ({
                      ...prev,
                      page: Math.max(prev.page - 1, 1),
                    }))
                  }
                  disabled={filter.page === 1}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
                >
                  Previous
                </button>
                <span className="text-gray-600">
                  Page {filter.page} of {pagination.pages}
                </span>
                <button
                  onClick={() =>
                    setFilter((prev) => ({
                      ...prev,
                      page: Math.min(prev.page + 1, pagination.pages),
                    }))
                  }
                  disabled={filter.page === pagination.pages}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;*/

"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import { SkillCard } from "@/components/skillComponent/skillCard";
import { SkillsFilter } from "@/components/skillComponent/SkillsFilter";
import { Skill } from "@/types/skills";
import AddSkillButton from "@/components/skillComponent/addSkillButton";
import ManageSkillsButton from "@/components/skillComponent/manageSkillButton";
import { FiFilter, FiX } from "react-icons/fi";

const categories = ["Design", "Development", "Marketing", "Writing", "Business"];
const priceTypes = ["hourly", "fixed", "negotiable"];

const SkillsPage = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [filter, setFilter] = useState({
    category: "",
    priceRange: [0, 1000] as [number, number],
    priceType: "",
    searchQuery: "",
    page: 1,
    limit: 10,
    sortBy: "createdAt:desc",
  });

  const [pagination, setPagination] = useState({
    total: 0,
    pages: 0,
  });

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (filter.category) params.append("category", filter.category);
      if (filter.searchQuery) params.append("search", filter.searchQuery);
      params.append("page", filter.page.toString());
      params.append("limit", filter.limit.toString());
      params.append("sortBy", filter.sortBy);

      const response = await axios.get(`https://shaddyna-backend.onrender.com/api/skill/`, {
        params,
      });

      const { total, pages, skills: fetchedSkills } = response.data;

      setSkills(fetchedSkills);
      setPagination({ total, pages });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch skills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [filter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Skills Marketplace | Find Professionals</title>
        <meta name="description" content="Browse and connect with skilled professionals" />
      </Head>

      {/* Modern Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0f1c47] via-[#3a1b6b] to-[#bf2c7e]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Find <span className="text-[#bf2c7e]">Top Talent</span> for Your Projects
            </h1>
            <p className="text-base md:text-lg text-white/90 mb-8">
              Connect with skilled professionals offering their expertise. Get your projects done right with our curated marketplace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => document.getElementById('search-input')?.focus()}
                className="px-4 py-2 md:px-6 md:py-3 bg-white text-[#0f1c47] rounded-lg font-medium hover:bg-opacity-90 transition-all"
              >
                Browse Skills
              </button>
              <AddSkillButton />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block lg:w-1/4">
            <SkillsFilter
              categories={categories}
              priceTypes={priceTypes}
              filter={filter}
              setFilter={setFilter}
            />
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#0f1c47]">
              {filter.category || "All"} Skills
            </h2>
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <FiFilter className="text-[#bf2c7e]" />
              <span>Filters</span>
            </button>
          </div>

          {/* Mobile Filter Sidebar */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto lg:hidden">
              <div className="flex min-h-screen">
                <div 
                  className="fixed inset-0 bg-black/30" 
                  onClick={() => setMobileFiltersOpen(false)}
                />
                <div className="relative ml-auto w-full max-w-xs h-screen bg-white shadow-xl">
                  <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-bold text-[#0f1c47]">Filters</h3>
                    <button 
                      onClick={() => setMobileFiltersOpen(false)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <FiX className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
                    <SkillsFilter
                      categories={categories}
                      priceTypes={priceTypes}
                      filter={filter}
                      setFilter={(newFilter) => {
                        setFilter(newFilter);
                        setMobileFiltersOpen(false);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Skills List */}
          <div className="lg:w-3/4">
            {/* Search and Results Count */}
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6 lg:mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-grow max-w-2xl">
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Search skills (e.g. 'web design', 'marketing')..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
                    value={filter.searchQuery}
                    onChange={(e) => setFilter({...filter, searchQuery: e.target.value})}
                  />
                  <svg
                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden sm:block text-gray-600 whitespace-nowrap">
                    {pagination.total} {pagination.total === 1 ? 'result' : 'results'}
                  </div>
                  <ManageSkillsButton />
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-200" />
                    <div className="p-6 space-y-4">
                      <div className="h-6 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-full" />
                      <div className="h-4 bg-gray-200 rounded w-5/6" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="col-span-2 bg-red-50 rounded-xl p-8 text-center">
                <p className="text-red-600">Error: {error}</p>
                <button
                  onClick={fetchSkills}
                  className="mt-4 px-4 py-2 bg-[#bf2c7e] text-white rounded-lg hover:bg-[#a6246d]"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Skills Grid */}
            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.length > 0 ? (
                  skills.map((skill) => (
                    <SkillCard key={skill._id} skill={skill} />
                  ))
                ) : (
                  <div className="col-span-2 bg-white rounded-xl p-8 text-center shadow-sm">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-[#0f1c47]">
                      No skills found
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Try adjusting your search or filter criteria
                    </p>
                    <button
                      onClick={() => setFilter({
                        ...filter,
                        searchQuery: "",
                        category: "",
                        priceType: "",
                        priceRange: [0, 1000]
                      })}
                      className="mt-4 px-4 py-2 bg-[#0f1c47] text-white rounded-lg hover:bg-[#1a2b6b]"
                    >
                      Reset filters
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-6">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{(filter.page - 1) * filter.limit + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(filter.page * filter.limit, pagination.total)}
                      </span>{' '}
                      of <span className="font-medium">{pagination.total}</span> results
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFilter(prev => ({ ...prev, page: Math.max(prev.page - 1, 1) }))}
                      disabled={filter.page === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setFilter(prev => ({ ...prev, page: Math.min(prev.page + 1, pagination.pages) }))}
                      disabled={filter.page === pagination.pages}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;
