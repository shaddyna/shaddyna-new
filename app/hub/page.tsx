"use client";

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

    {/* Buttons for adding and managing skills */}
      <div className="container mx-auto px-4 py-8">
    <div className="flex justify-between items-center mb-0 gap-4">
      <AddSkillButton />
      <ManageSkillsButton />
    </div>
      </div>

      <div className="container mx-auto px-4 py-0">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <div className="lg:w-1/4">
            <SkillsFilter
              categories={categories}
              priceTypes={priceTypes}
              filter={filter}
              setFilter={setFilter}
            />
          </div>

          {/* Skills List */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#0f1c47]">
                {filter.category || "All"} Skills
              </h2>
              <div className="text-gray-500">{pagination.total} results</div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="col-span-2 bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500">Loading...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="col-span-2 bg-red-50 rounded-lg p-8 text-center">
                <p className="text-red-600">Error: {error}</p>
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
                  <div className="col-span-2 bg-gray-50 rounded-lg p-8 text-center">
                    <p className="text-gray-500">No skills found matching your criteria</p>
                  </div>
                )}
              </div>
            )}

            {/* Pagination Controls */}
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

export default SkillsPage;

