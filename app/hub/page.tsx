/*"use client";
import TopNavModified from '@/components/TopNavModified';
import { useState, useEffect } from 'react';
import AddSkillForm from "@/components/AddSkillForm";
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Skill {
  _id: string;
  name: string;
  level: number;
  rating: number;
  description: string;
  price: number;
  image: string;
  pimage: string;
  portfolio: {
    title: string;
    description: string;
    image: string;
  }[];
  createdAt: string;
}

interface Opportunity {
  id: number;
  title: string;
  company: string;
  type: 'full-time' | 'freelance' | 'project';
  location: string;
}

export default function HubPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch skills from backend
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get('https://shaddyna-backend.onrender.com/api/skill');
        setSkills(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch skills');
        setLoading(false);
        console.error('Error fetching skills:', err);
      }
    };

    fetchSkills();
  }, []);

  const handleMenuItemClick = (item: string) => {
    if (item === "Add Skill") {
      setShowSkillForm(true);
    } else if (item === "Add Opportunity") {
      // Handle opportunity form
    }
  };

  const handleViewDetails = (skillId: string) => {
    router.push(`/hub/${skillId}`);
  };

  // Filter skills based on search query and active filter
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-[#0f1c47]">Loading skills...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <TopNavModified 
        menuItems={["Add Skill", "Add Opportunity"]} 
        onMenuItemClick={handleMenuItemClick} 
      />

      {showSkillForm && (
        <AddSkillForm 
          onClose={() => {
            setShowSkillForm(false);
            axios.get('https://shaddyna-backend.onrender.com/api/skill')
              .then(response => setSkills(response.data.data))
              .catch(err => console.error('Error refreshing skills:', err));
          }} 
        />
      )}

      {/* Header Section *
      <div className="bg-white py-4 px-3">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold text-[#0f1c47] mb-3">Skills Hub</h1>

          {/* Search and Filters *
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

      {/* Main Content *
      <div className="container mx-auto py-4 px-3">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Skills Grid *
          <div className="lg:col-span-2 space-y-3">
            {filteredSkills.length > 0 ? (
              filteredSkills.map((skill) => (
                <div
                  key={skill._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-[#0f1c47]/10"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#0f1c47]">{skill.name}</h3>
                      <p className="text-[#bf2c7e] text-sm">Level: {skill.level}/10</p>
                    </div>
                    <span className="px-3 py-1 text-sm rounded-full bg-[#0f1c47]/10 text-[#0f1c47]">
                      Rating: {skill.rating}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-[#0f1c47] mb-4">
                    <span>💰 KES {skill.price}</span>
                    <span>📅 Added: {new Date(skill.createdAt).toLocaleDateString()}</span>
                  </div>

                  <p className="text-[#0f1c47] mb-4">{skill.description}</p>

                  {skill.portfolio.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-[#0f1c47] mb-2">Portfolio:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {skill.portfolio.map((item, index) => (
                          <div key={index} className="border rounded-lg p-2">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-24 object-cover rounded-md mb-1"
                            />
                            <p className="text-sm font-medium">{item.title}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <button className="flex items-center gap-2 text-[#0f1c47] hover:text-[#bf2c7e]">
                        ♥ Like
                      </button>
                      <button className="flex items-center gap-2 text-[#0f1c47] hover:text-[#bf2c7e]">
                        💬 Comment
                      </button>
                      <button className="text-[#0f1c47] hover:text-[#bf2c7e]">
                        📌 Bookmark
                      </button>
                    </div>
                    <button
                      onClick={() => handleViewDetails(skill._id)}
                      className="text-[#bf2c7e] hover:underline"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-[#0f1c47]">
                No skills found matching your search
              </div>
            )}
          </div>

          {/* Opportunities Sidebar *
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-[#0f1c47]">Opportunities</h2>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#0f1c47]/10">
              <p className="text-[#0f1c47]">Opportunities feature coming soon!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

*/

"use client"

import { useState } from 'react';
import Head from 'next/head';
import { SkillCard } from '@/components/skillComponent/skillCard';
import { SkillsFilter } from '@/components/skillComponent/SkillsFilter';
import { Skill } from '@/types/skills';

const categories = ['Design', 'Development', 'Marketing', 'Writing', 'Business'];
const priceTypes = ['hourly', 'fixed', 'negotiable'];

const SkillsPage = () => {
  //const [skills, setSkills] = useState<Skill[]>([]);
  const [filter, setFilter] = useState({
    category: '',
    priceRange: [0, 1000] as [number, number],
    priceType: '',
    searchQuery: '',
  });

  const [skills, setSkills] = useState<Skill[]>([
    {
      id: 'skill1',
      title: 'UI/UX Design for Mobile Apps',
      description: 'Crafting intuitive and engaging app designs for startups and agencies.',
      category: 'Design',
      tags: ['Figma', 'Prototyping', 'User Flow'],
      price: 45,
      priceType: 'hourly',
      images: ['/images/skills/uiux-1.jpg'],
      createdAt: new Date('2024-12-01'),
      createdBy: {
        id: 'user1',
        name: 'Alice Mwende',
        avatar: '/images/users/alice.jpg',
        bio: 'Passionate designer with 5+ years experience in mobile interfaces.',
        location: 'Nairobi, Kenya',
        skills: ['UI Design', 'UX Research'],
        joinedAt: new Date('2022-05-14'),
      },
      likes: ['user2', 'user3', 'user4'],
      stats: {
        views: 320,
        inquiries: 18,
      },
    },
    {
      id: 'skill2',
      title: 'Full Stack Web Development',
      description: 'Building modern web apps using React, Node.js and MongoDB.',
      category: 'Development',
      tags: ['React', 'Node.js', 'MongoDB'],
      price: 1000,
      priceType: 'fixed',
      images: ['/images/skills/dev-1.jpg'],
      createdAt: new Date('2024-11-21'),
      createdBy: {
        id: 'user2',
        name: 'Brian Karanja',
        avatar: '/images/users/brian.jpg',
        bio: 'MERN stack engineer helping clients build scalable platforms.',
        location: 'Eldoret, Kenya',
        skills: ['React', 'Express', 'MongoDB'],
        joinedAt: new Date('2021-09-10'),
      },
      likes: ['user1', 'user3'],
      stats: {
        views: 540,
        inquiries: 29,
      },
    },
    {
      id: 'skill3',
      title: 'SEO Content Writing',
      description: 'SEO-optimized blogs and web copy that drive traffic and conversions.',
      category: 'Writing',
      tags: ['SEO', 'Blogging', 'Content Marketing'],
      price: 75,
      priceType: 'negotiable',
      images: ['/images/skills/writing-1.jpg'],
      createdAt: new Date('2024-10-10'),
      createdBy: {
        id: 'user3',
        name: 'Cynthia Njeri',
        avatar: '/images/users/cynthia.jpg',
        bio: 'Creative writer & strategist for blogs, landing pages, and ads.',
        location: 'Mombasa, Kenya',
        skills: ['Writing', 'Copywriting'],
        joinedAt: new Date('2023-01-25'),
      },
      likes: ['user1'],
      stats: {
        views: 210,
        inquiries: 12,
      },
    },
  ]);
  
  

  // In a real app, you would fetch skills from your API
  // useEffect(() => {
  //   fetchSkills();
  // }, [filter]);

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

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <SkillsFilter 
              categories={categories}
              priceTypes={priceTypes}
              filter={filter}
              setFilter={setFilter}
            />
          </div>

          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#0f1c47]">
                {filter.category || 'All'} Skills
              </h2>
              <div className="text-gray-500">
                {skills.length} results
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))
              ) : (
                <div className="col-span-2 bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-500">No skills found matching your criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;