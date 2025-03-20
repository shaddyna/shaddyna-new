'use client';

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

export default LatestSkillPosts;