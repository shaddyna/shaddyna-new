"use client";
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

          {/* Opportunities Sidebar */}
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

{/*"use client";
import TopNavModified from '@/components/TopNavModified';
import { useState, useEffect } from 'react';
import AddSkillForm from "@/components/AddSkillForm";
import axios from 'axios';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
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

  // Filter skills based on search query and active filter
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // You can add more sophisticated filtering logic here based on your needs
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
            // Optionally refresh skills after adding a new one
            axios.get('http://localhost:5000/api/skills')
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
                      onClick={() => setSelectedSkill(skill)}
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

      {/* Skill Detail Modal *
      {selectedSkill && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
          <div className="container mx-auto p-4 h-full flex items-center justify-center">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-[#0f1c47]">{selectedSkill.name}</h2>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="text-gray-500 hover:text-[#bf2c7e]"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm text-gray-500">Level</h4>
                    <p className="text-[#0f1c47] font-medium">{selectedSkill.level}/10</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500">Rating</h4>
                    <p className="text-[#0f1c47] font-medium">{selectedSkill.rating}/5</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500">Price</h4>
                    <p className="text-[#0f1c47] font-medium">KES {selectedSkill.price}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500">Created</h4>
                    <p className="text-[#0f1c47] font-medium">
                      {new Date(selectedSkill.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm text-gray-500 mb-2">Description</h4>
                  <p className="text-[#0f1c47]">{selectedSkill.description}</p>
                </div>

                {selectedSkill.portfolio.length > 0 && (
                  <div>
                    <h4 className="text-sm text-gray-500 mb-2">Portfolio</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedSkill.portfolio.map((item, index) => (
                        <div key={index} className="border rounded-lg p-3">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-32 object-cover rounded-md mb-2"
                          />
                          <h5 className="font-medium text-[#0f1c47]">{item.title}</h5>
                          <p className="text-sm text-[#0f1c47]">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comments Section *
                <div>
                  <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">
                    Comments
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
*/}