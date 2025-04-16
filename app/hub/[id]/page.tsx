/*"use client";
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
  );
}*/



/*"use client"
import Head from 'next/head';
import Image from 'next/image';
import { CommentSection } from '@/components/skillComponent/commentSection';
import { UserProfile } from '@/components/skillComponent/UserProfile';
import { Skill } from '@/types/skills';
import { useState } from 'react';
import { useParams } from 'next/navigation';



const SkillDetailPage = () => {
  const params = useParams();
  const id = params?.id;
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);

  // In a real app, you would fetch the skill by ID
  // useEffect(() => {
  //   if (id) {
  //     fetchSkill(id as string);
  //   }
  // }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p>Loading skill...</p>
      </div>
    );
  }

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
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-[#0f1c47] mb-4">About This Skill</h2>
              <p className="text-gray-700 mb-6">{skill.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-medium text-[#0f1c47] mb-2">Price</h3>
                  <p className="text-gray-700">
                    {skill.price ? `$${skill.price}${skill.priceType === 'hourly' ? '/hour' : ''}` : 'Negotiable'}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-[#0f1c47] mb-2">Category</h3>
                  <p className="text-gray-700">{skill.category}</p>
                </div>
                <div>
                  <h3 className="font-medium text-[#0f1c47] mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
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
                          layout="fill"
                          objectFit="cover"
                          className="hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <CommentSection skillId={skill.id} />
          </div>

          <div className="lg:w-1/3">
            <UserProfile user={skill.createdBy} />
            
            <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDetailPage;
*/
// app/hub/[id]/page.tsx
'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Skill } from '@/types/skills';
import { CommentSection } from '@/components/skillComponent/commentSection';
import { UserProfile } from '@/components/skillComponent/UserProfile';
import Head from 'next/head';

// Mock data moved outside component
const sampleSkills: Skill[] = [
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
  // ... other sample skills
];

export default function SkillDetailPage() {
  const params = useParams();
  const id = params?.id;
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Simulate API call with 1s delay
      setTimeout(() => {
        const foundSkill = sampleSkills.find(skill => skill.id === id);
        setSkill(foundSkill || null);
        setLoading(false);
      }, 1000);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p>Loading skill...</p>
      </div>
    );
  }

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
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-[#0f1c47] mb-4">About This Skill</h2>
              <p className="text-gray-700 mb-6">{skill.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-medium text-[#0f1c47] mb-2">Price</h3>
                  <p className="text-gray-700">
                    {skill.price ? `$${skill.price}${skill.priceType === 'hourly' ? '/hour' : ''}` : 'Negotiable'}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-[#0f1c47] mb-2">Category</h3>
                  <p className="text-gray-700">{skill.category}</p>
                </div>
                <div>
                  <h3 className="font-medium text-[#0f1c47] mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
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
                          layout="fill"
                          objectFit="cover"
                          className="hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <CommentSection skillId={skill.id} />
          </div>

          <div className="lg:w-1/3">
            <UserProfile user={skill.createdBy} />
            
            <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}