"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TopNavModified from '@/components/TopNavModified';

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

export default function SkillDetailPage() {
  const params = useParams();
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const response = await axios.get(`https://shaddyna-backend.onrender.com/api/skill/${params.id}`);
        setSkill(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch skill details');
        setLoading(false);
        console.error('Error fetching skill:', err);
      }
    };

    fetchSkill();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-[#0f1c47]">Loading skill details...</div>
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

  if (!skill) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-[#0f1c47]">Skill not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <TopNavModified 
        menuItems={["Add Skill", "Add Opportunity"]} 
        onMenuItemClick={() => {}} 
      />

      <div className="container mx-auto p-4 py-8">
        <div className="bg-white rounded-2xl p-8 max-w-4xl mx-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-[#0f1c47]">{skill.name}</h2>
              <div className="flex gap-4 mt-2">
                <span className="text-[#bf2c7e]">Level: {skill.level}/10</span>
                <span className="text-[#bf2c7e]">Rating: {skill.rating}/5</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <h4 className="text-sm text-gray-500">Price</h4>
                <p className="text-[#0f1c47] font-medium">KES {skill.price}</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-500">Created</h4>
                <p className="text-[#0f1c47] font-medium">
                  {new Date(skill.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-sm text-gray-500 mb-2">Description</h4>
              <p className="text-[#0f1c47]">{skill.description}</p>
            </div>

            {skill.portfolio.length > 0 && (
              <div>
                <h4 className="text-sm text-gray-500 mb-2">Portfolio</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skill.portfolio.map((item, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-48 object-cover rounded-md mb-2"
                      />
                      <h5 className="font-medium text-[#0f1c47]">{item.title}</h5>
                      <p className="text-sm text-[#0f1c47]">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Section */}
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
  );
}