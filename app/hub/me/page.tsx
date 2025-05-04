"use client"
import { useState } from 'react';
import Head from 'next/head';
import { SkillForm } from '@/components/skillComponent/skillForm';
import { SkillCard } from '@/components/skillComponent/skillCard';
import { User } from '@/types/skills';

interface Skill {
    _id: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    price?: number;
    priceType?: 'hourly' | 'fixed' | 'negotiable';
    images: string[];
    createdAt: Date;
    createdBy: User;
    likes: string[]; // user IDs who liked
    stats: {
      views: number;
      inquiries: number;
    };
  }

const UserProfilePage = () => {
  const [user, setUser] = useState<User>({
    id: 'current-user',
    name: 'Your Name',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Full-stack developer specializing in modern web applications',
    location: 'Nairobi, Kenya',
    skills: ['React', 'Node.js', 'TypeScript', 'GraphQL'],
    joinedAt: new Date(),
  });

  const [skills, setSkills] = useState<Skill[]>([]);
  const [activeTab, setActiveTab] = useState<'profile' | 'skills'>('profile');

  const handleSkillSubmit = (newSkill: Omit<Skill, 'id' | 'createdAt' | 'createdBy' | 'likes' | 'stats'>) => {
    const fullSkill: Skill = {
      ...newSkill,
      id: `skill-${Date.now()}`,
      createdAt: new Date(),
      createdBy: user,
      likes: [],
      stats: {
        views: 0,
        inquiries: 0,
      },
    };
    setSkills([fullSkill, ...skills]);
  };

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>My Profile | Skills Portfolio</title>
      </Head>

      <div className="bg-gradient-to-r from-[#0f1c47] to-[#bf2c7e] py-16 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">My Profile</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold text-[#0f1c47]">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.location}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    activeTab === 'profile' ? 'bg-[#bf2c7e] text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Profile Settings
                </button>
                <button
                  onClick={() => setActiveTab('skills')}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    activeTab === 'skills' ? 'bg-[#bf2c7e] text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  My Skills ({skills.length})
                </button>
              </nav>
            </div>
          </div>

          <div className="lg:w-3/4">
            {activeTab === 'profile' ? (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-[#0f1c47] mb-6">Profile Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#0f1c47] mb-1">Name</label>
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) => setUser({...user, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0f1c47] mb-1">Bio</label>
                    <textarea
                      value={user.bio}
                      onChange={(e) => setUser({...user, bio: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0f1c47] mb-1">Location</label>
                    <input
                      type="text"
                      value={user.location}
                      onChange={(e) => setUser({...user, location: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <button className="px-4 py-2 bg-[#bf2c7e] text-white rounded-md hover:bg-[#a8256d]">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-[#0f1c47] mb-6">Add New Skill</h2>
                  <SkillForm onSubmit={handleSkillSubmit} />
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {skills.map((skill) => (
                    <SkillCard key={skill.id} skill={skill} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;