

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