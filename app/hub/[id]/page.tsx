'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios'; 
import { Skill } from '@/types/skills';
import { CommentSection } from '@/components/skillComponent/commentSection';
import { UserProfile } from '@/components/skillComponent/UserProfile';
import Head from 'next/head';
import { ChatBox } from '@/components/chatComponents/ChatBox';

export default function SkillDetailPage() {
  const params = useParams();
  const id = params?.id as string; 
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        setLoading(true);
        setError(null);
  
        console.log('Extracted ID:', id); // Log the extracted ID
  
        if (!id) {
          throw new Error('No ID found in URL');
        }
  
        console.log('Fetching skill with ID:', id);
  
        // Fetch skill by ID
        const response = await axios.get(`https://shaddyna-backend.onrender.com/api/skill/${id}`);
        console.log('API Response:', response.data); // Log the API response
  
        const skillData = response.data;
  
        setSkill(skillData);
      } catch (err: any) {
        console.error('Error fetching skill:', err); // Log the error
        setError(err.response?.data?.message || 'Failed to fetch skill details');
      } finally {
        setLoading(false);
      }
    };
  
    if (id) {
      fetchSkill();
    } else {
      setError('Invalid skill ID');
      setLoading(false);
    }
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p>Loading skill...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  // Skill Not Found State
  if (!skill) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p>Skill not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>{skill.title} | Skills Marketplace</title>
        <meta name="description" content={skill.description} />
      </Head>

      <div className="bg-gradient-to-r from-[#0f1c47] to-[#bf2c7e] py-12 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">{skill.title}</h1>
          <p className="mt-2">{skill.category} • {skill.createdBy.name}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-[#0f1c47] mb-4">About This Skill</h2>
              <p className="text-gray-700 mb-6">{skill.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-medium text-[#0f1c47] mb-2">Price</h3>
                  <p className="text-gray-700">
                    {skill.price ? `Ksh ${skill.price}${skill.priceType === 'hourly' ? '/hour' : ''}` : 'Negotiable'}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-[#0f1c47] mb-2">Category</h3>
                  <p className="text-gray-700">{skill.category}</p>
                </div>
                <div>
                  <h3 className="font-medium text-[#0f1c47] mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-[#0f1c47] mb-2">Posted</h3>
                  <p className="text-gray-700">
                    {new Date(skill.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {skill.images.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-medium text-[#0f1c47] mb-4">Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {skill.images.map((image, index) => (
                      <div key={index} className="relative h-40 rounded-lg overflow-hidden">
                        <Image
                          src={image}
                          alt={`${skill.title} image ${index + 1}`}
                          fill
                          style={{ objectFit: 'cover' }}
                          className="hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>                    
          <CommentSection skillId={skill._id} />
          </div>
          

         

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <UserProfile user={skill.createdBy} />

            {/*(<div className="bg-white rounded-xl shadow-sm p-6 mt-6">
              <h3 className="font-medium text-[#0f1c47] mb-4">Contact</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#bf2c7e] text-white rounded-md hover:bg-[#a8256d] transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>*/}
          <ChatBox targetUser={skill.createdBy} />
          </div>
        </div>
      </div>
    </div>
  );
}