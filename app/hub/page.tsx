"use client";
import TopNavModified from '@/components/TopNavModified';
import { useState } from 'react';

interface SkillPost {
  id: number;
  title: string;
  category: string;
  user: string;
  experience: string;
  likes: number;
  comments: number;
  type: 'freelancer' | 'job-seeker';
  portfolio?: string;
}

interface Opportunity {
  id: number;
  title: string;
  company: string;
  type: 'full-time' | 'freelance' | 'project';
  location: string;
}

const dummySkills: SkillPost[] = [
  {
    id: 1,
    title: 'UI/UX Design Specialist',
    category: 'Design',
    user: 'Sarah Johnson',
    experience: '5+ years',
    likes: 45,
    comments: 12,
    type: 'freelancer',
    portfolio: 'sarahdesigns.dribbble.com',
  },
  // Add more skill posts...
];

const dummyOpportunities: Opportunity[] = [
  {
    id: 1,
    title: 'Mobile App Developer Needed',
    company: 'TechInnovate',
    type: 'project',
    location: 'Remote',
  },
  // Add more opportunities...
];

export default function HubPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<SkillPost | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="min-h-screen bg-white">
      <TopNavModified menuItems={["Add Skill", "Add Opportunity"]} />

      {/* Header Section */}
      <div className="bg-white py-4 px-3">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold text-[#0f1c47] mb-3">Skills Hub</h1>

          {/* Search and Filters */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Search skills, professionals, or topics..."
              className="w-full p-4 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="flex flex-wrap gap-2">
              {['all', 'design', 'development', 'writing', 'marketing'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === filter
                      ? 'bg-[#bf2c7e] text-white'
                      : 'bg-[#0f1c47]/10 text-[#0f1c47] hover:bg-[#bf2c7e]/10 hover:text-[#bf2c7e]'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-4 px-3">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Skills Grid */}
          <div className="lg:col-span-2 space-y-3">
            {dummySkills.map((skill) => (
              <div
                key={skill.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-[#0f1c47]/10"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#0f1c47]">{skill.title}</h3>
                    <p className="text-[#bf2c7e] text-sm">{skill.category}</p>
                  </div>
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      skill.type === 'freelancer'
                        ? 'bg-[#bf2c7e]/10 text-[#bf2c7e]'
                        : 'bg-[#0f1c47]/10 text-[#0f1c47]'
                    }`}
                  >
                    {skill.type}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-[#0f1c47] mb-4">
                  <span>👤 {skill.user}</span>
                  <span>📅 {skill.experience} experience</span>
                </div>

                {skill.portfolio && (
                  <div className="mb-4">
                    <a
                      href={`https://${skill.portfolio}`}
                      className="text-[#bf2c7e] hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Portfolio ↗
                    </a>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-[#0f1c47] hover:text-[#bf2c7e]">
                      ♥ {skill.likes}
                    </button>
                    <button className="flex items-center gap-2 text-[#0f1c47] hover:text-[#bf2c7e]">
                      💬 {skill.comments}
                    </button>
                    <button className="text-[#0f1c47] hover:text-[#bf2c7e]">
                      📌 Bookmark
                    </button>
                  </div>
                  <button
                    onClick={() => setSelectedPost(skill)}
                    className="text-[#bf2c7e] hover:underline"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Opportunities Sidebar */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-[#0f1c47]">Opportunities</h2>

            {dummyOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="bg-white rounded-2xl shadow-lg p-6 border border-[#0f1c47]/10"
              >
                <h3 className="text-lg font-semibold text-[#0f1c47]">{opp.title}</h3>
                <div className="flex items-center gap-2 text-sm text-[#0f1c47] mt-2">
                  <span>🏢 {opp.company}</span>
                  <span>📍 {opp.location}</span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      opp.type === 'freelance'
                        ? 'bg-[#bf2c7e]/10 text-[#bf2c7e]'
                        : 'bg-[#0f1c47]/10 text-[#0f1c47]'
                    }`}
                  >
                    {opp.type}
                  </span>
                  <button className="bg-[#bf2c7e] text-white px-4 py-2 rounded-full hover:bg-[#a02468] transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skill Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
          <div className="container mx-auto p-4 h-full flex items-center justify-center">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Content */}
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-[#0f1c47]">{selectedPost.title}</h2>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-gray-500 hover:text-[#bf2c7e]"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm text-gray-500">Posted by</h4>
                    <p className="text-[#0f1c47] font-medium">{selectedPost.user}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500">Experience</h4>
                    <p className="text-[#0f1c47] font-medium">{selectedPost.experience}</p>
                  </div>
                </div>

                {selectedPost.portfolio && (
                  <div>
                    <h4 className="text-sm text-gray-500 mb-2">Portfolio</h4>
                    <a
                      href={`https://${selectedPost.portfolio}`}
                      className="text-[#bf2c7e] hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {selectedPost.portfolio}
                    </a>
                  </div>
                )}

                {/* Comments Section */}
                <div>
                  <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">
                    Comments ({selectedPost.comments})
                  </h3>
                  <div className="space-y-4">
                    <textarea
                      className="w-full p-4 border border-[#0f1c47]/10 rounded-xl focus:border-[#bf2c7e] focus:ring-0"
                      placeholder="Add a comment..."
                      rows={3}
                    />
                    <button className="bg-[#bf2c7e] text-white px-6 py-2 rounded-full hover:bg-[#a02468] transition-colors">
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}