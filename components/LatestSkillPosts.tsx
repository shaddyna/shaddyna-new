/*'use client';

import { FC } from 'react';

interface LatestSkillPostsProps {
  skills: string[];
}

const LatestSkillPosts: FC<LatestSkillPostsProps> = ({ skills }) => {
  return (
    <section className="py-12 bg-gray-50 bg-opacity-60">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-[#0f1c47]">Hub Skills</h2>
          <button className="bg-[#0f1c47] hover:bg-[#1a2a5a] text-white px-6 py-2 rounded-lg">
            Post Skill +
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div key={skill} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-8 h-8 bg-[#bf2c7e]/10 rounded-full flex items-center justify-center mb-2">
                <span className="text-[#bf2c7e]">★</span>
              </div>
              <span className="text-gray-700">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestSkillPosts;*/

'use client';

import { FC, useState } from 'react';

interface Skill {
  id: string;
  title: string;
  category: string;
  type: 'freelancer' | 'other';
  user: string;
  experience: string;
  portfolio?: string;
  likes: number;
  comments: number;
}

interface LatestSkillPostsProps {
  skills: Skill[];
}

const LatestSkillPosts: FC<LatestSkillPostsProps> = ({ skills }) => {
  const [selectedPost, setSelectedPost] = useState<Skill | null>(null);

  return (
    <section className="py-12 bg-gray-50 bg-opacity-60">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-[#0f1c47]">Hub Skills</h2>
          <button className="bg-[#0f1c47] hover:bg-[#1a2a5a] text-white px-6 py-2 rounded-lg">
            Post Skill +
          </button>
        </div>
        <div className="lg:col-span-2 space-y-3">
          {skills.map((skill) => (
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
      </div>
    </section>
  );
};

export default LatestSkillPosts;