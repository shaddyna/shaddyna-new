/*"use client"
import { useState } from 'react';
import Head from 'next/head';

type User = {
  id: string;
  name: string;
  avatar: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: Date;
};

type Post = {
  id: string;
  title: string;
  description: string;
  type: 'product' | 'service' | 'investment';
  price?: number;
  currency?: string;
  images: string[];
  createdAt: Date;
  createdBy: User;
  status: 'active' | 'sold' | 'closed';
  tags: string[];
  stats: {
    views: number;
    saves: number;
    inquiries: number;
  };
};

type Shelf = {
  id: string;
  name: string;
  description: string;
  bannerImage: string;
  createdBy: User;
  members: User[];
  createdAt: Date;
  types: ('products' | 'services' | 'investments')[];
  visibility: 'public' | 'private' | 'unlisted';
  rules: string;
  tags: string[];
  stats: {
    totalPosts: number;
    activeMembers: number;
  };
};

const ShelfDetailPage = () => {
  // Dummy data
  const currentUser: User = {
    id: 'user-1',
    name: 'You',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: 'owner',
    joinedAt: new Date('2023-01-15'),
  };

  const shelf: Shelf = {
    id: 'shelf-1',
    name: 'Tech Entrepreneurs Hub',
    description: 'A community for tech entrepreneurs to collaborate, share products, services, and investment opportunities.',
    bannerImage: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    createdBy: currentUser,
    members: [
      currentUser,
      {
        id: 'user-2',
        name: 'Alex Johnson',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        role: 'admin',
        joinedAt: new Date('2023-02-10'),
      },
      {
        id: 'user-3',
        name: 'Maria Garcia',
        avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
        role: 'member',
        joinedAt: new Date('2023-03-05'),
      },
      {
        id: 'user-4',
        name: 'Sam Wilson',
        avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
        role: 'member',
        joinedAt: new Date('2023-04-20'),
      },
    ],
    createdAt: new Date('2023-01-10'),
    types: ['products', 'services', 'investments'],
    visibility: 'public',
    rules: '1. Be respectful\n2. No spam\n3. Only post relevant content\n4. Clearly describe your offerings',
    tags: ['technology', 'startups', 'innovation', 'networking'],
    stats: {
      totalPosts: 24,
      activeMembers: 4,
    },
  };

  const posts: Post[] = [
    {
      id: 'post-1',
      title: 'AI Content Generator SaaS',
      description: 'A cutting-edge AI platform that generates high-quality content for blogs, social media, and marketing materials.',
      type: 'product',
      price: 299,
      currency: 'USD',
      images: [
        'https://images.unsplash.com/photo-1677442135136-760c813a743d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      ],
      createdAt: new Date('2023-05-15'),
      createdBy: shelf.members[1],
      status: 'active',
      tags: ['AI', 'SaaS', 'content creation'],
      stats: {
        views: 142,
        saves: 28,
        inquiries: 9,
      },
    },
    {
      id: 'post-2',
      title: 'Blockchain Development Services',
      description: 'Expert blockchain developers available for smart contract development, dApps, and consulting.',
      type: 'service',
      price: 150,
      currency: 'USD/hr',
      images: [
        'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      ],
      createdAt: new Date('2023-06-02'),
      createdBy: shelf.members[2],
      status: 'active',
      tags: ['blockchain', 'development', 'web3'],
      stats: {
        views: 89,
        saves: 15,
        inquiries: 4,
      },
    },
    {
      id: 'post-3',
      title: 'Seed Round Investment Opportunity',
      description: 'Looking for investors for our innovative health-tech startup. $500k seed round open with 10% equity.',
      type: 'investment',
      images: [
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      ],
      createdAt: new Date('2023-06-18'),
      createdBy: shelf.members[3],
      status: 'active',
      tags: ['investment', 'health-tech', 'startup'],
      stats: {
        views: 203,
        saves: 42,
        inquiries: 17,
      },
    },
  ];

  // State
  const [activeTab, setActiveTab] = useState<'posts' | 'members' | 'about'>('posts');
  const [postTypeFilter, setPostTypeFilter] = useState<'all' | 'product' | 'service' | 'investment'>('all');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  // Filter posts based on selected type
  const filteredPosts = postTypeFilter === 'all' 
    ? posts 
    : posts.filter(post => post.type === postTypeFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{shelf.name} | Shelf</title>
        <meta name="description" content={shelf.description} />
      </Head>

      {/* Banner *
      <div className="relative h-64 w-full overflow-hidden">
        <img 
          src={shelf.bannerImage} 
          alt={shelf.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c47] to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl font-bold">{shelf.name}</h1>
          <p className="mt-2 max-w-2xl">{shelf.description}</p>
        </div>
      </div>

      {/* Shelf Header *
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-2">
              {shelf.members.slice(0, 4).map((member, index) => (
                <img 
                  key={member.id}
                  src={member.avatar}
                  alt={member.name}
                  className="w-10 h-10 rounded-full border-2 border-white"
                  style={{ zIndex: 4 - index }}
                />
              ))}
              {shelf.members.length > 4 && (
                <div className="w-10 h-10 rounded-full bg-[#0f1c47] text-white flex items-center justify-center text-xs font-bold border-2 border-white">
                  +{shelf.members.length - 4}
                </div>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-600">{shelf.stats.activeMembers} members</p>
              <p className="text-sm text-gray-600">{shelf.stats.totalPosts} posts</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            {currentUser.role === 'owner' || currentUser.role === 'admin' ? (
              <>
                <button 
                  onClick={() => setShowInviteModal(true)}
                  className="px-4 py-2 bg-[#bf2c7e] text-white rounded-md hover:bg-[#a8256d] transition-colors"
                >
                  Invite Members
                </button>
                <button className="px-4 py-2 bg-[#0f1c47] text-white rounded-md hover:bg-[#0a142f] transition-colors">
                  Manage Shelf
                </button>
              </>
            ) : null}
            <button className="px-4 py-2 border border-[#0f1c47] text-[#0f1c47] rounded-md hover:bg-gray-100 transition-colors">
              Share Shelf
            </button>
          </div>
        </div>
      </div>

      {/* Main Content *
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar *
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-[#0f1c47] mb-4">Shelf Navigation</h2>
              <nav>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveTab('posts')}
                      className={`w-full text-left px-3 py-2 rounded-md ${activeTab === 'posts' ? 'bg-[#0f1c47] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      Posts
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('members')}
                      className={`w-full text-left px-3 py-2 rounded-md ${activeTab === 'members' ? 'bg-[#0f1c47] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      Members
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('about')}
                      className={`w-full text-left px-3 py-2 rounded-md ${activeTab === 'about' ? 'bg-[#0f1c47] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      About & Rules
                    </button>
                  </li>
                </ul>
              </nav>

              <div className="mt-8">
                <h3 className="font-medium text-[#0f1c47] mb-3">Post Types</h3>
                <div className="space-y-2">
                  {['all', 'product', 'service', 'investment'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setPostTypeFilter(type as any)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm ${postTypeFilter === type ? 'bg-[#bf2c7e] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      {type === 'all' ? 'All Posts' : `${type.charAt(0).toUpperCase() + type.slice(1)}s`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-medium text-[#0f1c47] mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {shelf.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area *
          <div className="lg:w-3/4">
            {activeTab === 'posts' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#0f1c47]">
                    {postTypeFilter === 'all' ? 'All Posts' : `${postTypeFilter.charAt(0).toUpperCase() + postTypeFilter.slice(1)}s`}
                  </h2>
                  <button className="px-4 py-2 bg-[#bf2c7e] text-white rounded-md hover:bg-[#a8256d] transition-colors">
                    Create Post
                  </button>
                </div>

                <div className="space-y-6">
                  {filteredPosts.map((post) => (
                    <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="p-6">
                        <div className="flex justify-between">
                          <div className="flex items-center space-x-3">
                            <img src={post.createdBy.avatar} alt={post.createdBy.name} className="w-10 h-10 rounded-full" />
                            <div>
                              <p className="font-medium">{post.createdBy.name}</p>
                              <p className="text-sm text-gray-500">
                                {post.createdAt.toLocaleDateString()} • {post.type}
                              </p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            post.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {post.status}
                          </span>
                        </div>

                        <h3 className="mt-4 text-xl font-semibold text-[#0f1c47]">{post.title}</h3>
                        <p className="mt-2 text-gray-700">{post.description}</p>

                        {post.images.length > 0 && (
                          <div className="mt-4">
                            <img 
                              src={post.images[0]} 
                              alt={post.title} 
                              className="w-full h-64 object-cover rounded-lg"
                            />
                          </div>
                        )}

                        <div className="mt-4 flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {post.price && (
                          <div className="mt-4">
                            <span className="text-xl font-bold text-[#0f1c47]">
                              {post.price} {post.currency}
                            </span>
                          </div>
                        )}

                        <div className="mt-6 flex justify-between items-center">
                          <div className="flex space-x-4 text-sm text-gray-500">
                            <span>{post.stats.views} views</span>
                            <span>{post.stats.saves} saves</span>
                            <span>{post.stats.inquiries} inquiries</span>
                          </div>
                          <div className="flex space-x-3">
                            <button className="text-[#bf2c7e] hover:text-[#a8256d]">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                              </svg>
                            </button>
                            <button className="text-[#bf2c7e] hover:text-[#a8256d]">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                              </svg>
                            </button>
                            <button className="text-[#bf2c7e] hover:text-[#a8256d]">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'members' && (
              <div>
                <h2 className="text-2xl font-bold text-[#0f1c47] mb-6">Shelf Members</h2>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Member
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Role
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Joined
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {shelf.members.map((member) => (
                            <tr key={member.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10">
                                    <img className="h-10 w-10 rounded-full" src={member.avatar} alt={member.name} />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                    <div className="text-sm text-gray-500">{member.id}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  member.role === 'owner' ? 'bg-purple-100 text-purple-800' :
                                  member.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {member.role}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {member.joinedAt.toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                {(currentUser.role === 'owner' || currentUser.role === 'admin') && member.role !== 'owner' && (
                                  <div className="flex space-x-2">
                                    {member.role !== 'admin' && (
                                      <button className="text-[#0f1c47] hover:text-[#0a142f]">
                                        Make Admin
                                      </button>
                                    )}
                                    {member.role === 'admin' && (
                                      <button className="text-[#0f1c47] hover:text-[#0a142f]">
                                        Remove Admin
                                      </button>
                                    )}
                                    <button className="text-[#bf2c7e] hover:text-[#a8256d]">
                                      Remove
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div>
                <h2 className="text-2xl font-bold text-[#0f1c47] mb-6">About This Shelf</h2>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-[#0f1c47] mb-3">Description</h3>
                      <p className="text-gray-700">{shelf.description}</p>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-[#0f1c47] mb-3">Shelf Rules</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        {shelf.rules.split('\n').map((rule, i) => (
                          <p key={i} className="text-gray-700 mb-2">{rule}</p>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#0f1c47] mb-3">Shelf Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Created</p>
                          <p className="text-gray-700">{shelf.createdAt.toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Visibility</p>
                          <p className="text-gray-700 capitalize">{shelf.visibility}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Post Types</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {shelf.types.map((type) => (
                              <span key={type} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Tags</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {shelf.tags.map((tag) => (
                              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Invite Modal *
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#0f1c47]">Invite Members</h3>
              <button 
                onClick={() => setShowInviteModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mb-4">
              <label htmlFor="invite-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="invite-email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
                placeholder="Enter email address"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <div className="space-y-2">
                {['member', 'admin'].map((role) => (
                  <div key={role} className="flex items-center">
                    <input
                      id={`role-${role}`}
                      name="role"
                      type="radio"
                      defaultChecked={role === 'member'}
                      className="h-4 w-4 text-[#bf2c7e] focus:ring-[#bf2c7e] border-gray-300"
                    />
                    <label htmlFor={`role-${role}`} className="ml-2 block text-sm text-gray-700 capitalize">
                      {role}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle invite logic
                  setShowInviteModal(false);
                  setInviteEmail('');
                }}
                className="px-4 py-2 bg-[#bf2c7e] text-white rounded-md hover:bg-[#a8256d]"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShelfDetailPage;*/

"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useParams } from 'next/navigation';

interface User {
  id: string;
  userId: string;
  name: string;
  avatar?: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: Date;
}

interface Post {
  id: string;
  title: string;
  description: string;
  type: 'product' | 'service' | 'investment';
  price?: number;
  currency?: string;
  images: string[];
  createdAt: Date;
  createdBy: User;
  status: 'active' | 'sold' | 'closed';
  tags: string[];
  stats: {
    views: number;
    saves: number;
    inquiries: number;
  };
}

interface Shelf {
  _id: string;
  name: string;
  description: string;
  bannerImage: string;
  createdBy: User;
  members: User[];
  createdAt: Date;
  type: ('products' | 'services' | 'investments')[];
  visibility: 'public' | 'private' | 'unlisted';
  rules: string;
  tags: string[];
  stats: {
    totalPosts: number;
    activeMembers: number;
  };
}

const ShelfDetailPage = () => {
  const params = useParams();
  const id = params?.id as string;

//const ShelfDetailPage = () => {
  //const router = useRouter();
  //const { id } = router.query;

  const [shelf, setShelf] = useState<Shelf | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI State
  const [activeTab, setActiveTab] = useState<'posts' | 'members' | 'about'>('posts');
  const [postTypeFilter, setPostTypeFilter] = useState<'all' | 'product' | 'service' | 'investment'>('all');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchShelfData = async () => {
      try {
        setLoading(true);
        // Fetch shelf details
        const shelfResponse = await axios.get(`https://shaddyna-backend.onrender.com/api/shelf/${id}`);
        setShelf(shelfResponse.data);

        // In a real app, you'd fetch posts for this shelf and current user data
        // For now, we'll use dummy data similar to your example
        setPosts(generateDummyPosts(shelfResponse.data));
        setCurrentUser({
          id: 'current-user',
          userId: 'current-user',
          name: 'You',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          role: 'owner', // This would be determined by the API response
          joinedAt: new Date(),
        });
      } catch (err) {
        setError('Failed to fetch shelf data');
        console.error('Error fetching shelf:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchShelfData();
  }, [id]);

  // Helper function to generate dummy posts (replace with actual API call)
  const generateDummyPosts = (shelf: Shelf): Post[] => {
    if (!shelf) return [];
    
    return [
      {
        id: 'post-1',
        title: 'AI Content Generator SaaS',
        description: 'A cutting-edge AI platform that generates high-quality content for blogs, social media, and marketing materials.',
        type: 'product',
        price: 299,
        currency: 'USD',
        images: [
          'https://images.unsplash.com/photo-1677442135136-760c813a743d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        ],
        createdAt: new Date('2023-05-15'),
        createdBy: shelf.members?.[0] || {
          id: 'user-2',
          userId: 'user-2',
          name: 'Alex Johnson',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          role: 'admin',
          joinedAt: new Date('2023-02-10'),
        },
        status: 'active',
        tags: ['AI', 'SaaS', 'content creation'],
        stats: {
          views: 142,
          saves: 28,
          inquiries: 9,
        },
      },
      {
        id: 'post-2',
        title: 'Blockchain Development Services',
        description: 'Expert blockchain developers available for smart contract development, dApps, and consulting.',
        type: 'service',
        price: 150,
        currency: 'USD/hr',
        images: [
          'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        ],
        createdAt: new Date('2023-06-02'),
        createdBy: shelf.members?.[1] || {
          id: 'user-3',
          userId: 'user-3',
          name: 'Maria Garcia',
          avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
          role: 'member',
          joinedAt: new Date('2023-03-05'),
        },
        status: 'active',
        tags: ['blockchain', 'development', 'web3'],
        stats: {
          views: 89,
          saves: 15,
          inquiries: 4,
        },
      },
    ];
  };

  // Filter posts based on selected type
  const filteredPosts = postTypeFilter === 'all' 
    ? posts 
    : posts.filter(post => post.type === postTypeFilter);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading shelf...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!shelf) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Shelf not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{shelf.name} | Shelf</title>
        <meta name="description" content={shelf.description} />
      </Head>

      {/* Banner */}
      <div className="relative h-64 w-full overflow-hidden">
        <img 
          src={shelf.bannerImage || '/default-banner.jpg'} 
          alt={shelf.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c47] to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl font-bold">{shelf.name}</h1>
          <p className="mt-2 max-w-2xl">{shelf.description}</p>
        </div>
      </div>

      {/* Shelf Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-2">
              {shelf.members.slice(0, 4).map((member, index) => (
                <img 
                  key={member.userId}
                  src={member.avatar || '/default-avatar.jpg'}
                  alt={member.name}
                  className="w-10 h-10 rounded-full border-2 border-white"
                  style={{ zIndex: 4 - index }}
                />
              ))}
              {shelf.members.length > 4 && (
                <div className="w-10 h-10 rounded-full bg-[#0f1c47] text-white flex items-center justify-center text-xs font-bold border-2 border-white">
                  +{shelf.members.length - 4}
                </div>
              )}
            </div>
            <div>
              {/*<p className="text-sm text-gray-600">{shelf.stats.activeMembers} members</p>
              <p className="text-sm text-gray-600">{shelf.stats.totalPosts} posts</p>*/}
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            {currentUser && (currentUser.role === 'owner' || currentUser.role === 'admin') ? (
              <>
                <button 
                  onClick={() => setShowInviteModal(true)}
                  className="px-4 py-2 bg-[#bf2c7e] text-white rounded-md hover:bg-[#a8256d] transition-colors"
                >
                  Invite Members
                </button>
                <button className="px-4 py-2 bg-[#0f1c47] text-white rounded-md hover:bg-[#0a142f] transition-colors">
                  Manage Shelf
                </button>
              </>
            ) : null}
            <button className="px-4 py-2 border border-[#0f1c47] text-[#0f1c47] rounded-md hover:bg-gray-100 transition-colors">
              Share Shelf
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-[#0f1c47] mb-4">Shelf Navigation</h2>
              <nav>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveTab('posts')}
                      className={`w-full text-left px-3 py-2 rounded-md ${activeTab === 'posts' ? 'bg-[#0f1c47] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      Posts
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('members')}
                      className={`w-full text-left px-3 py-2 rounded-md ${activeTab === 'members' ? 'bg-[#0f1c47] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      Members
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('about')}
                      className={`w-full text-left px-3 py-2 rounded-md ${activeTab === 'about' ? 'bg-[#0f1c47] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      About & Rules
                    </button>
                  </li>
                </ul>
              </nav>

              <div className="mt-8">
                <h3 className="font-medium text-[#0f1c47] mb-3">Post Types</h3>
                <div className="space-y-2">
                  {['all', 'product', 'service', 'investment'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setPostTypeFilter(type as any)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm ${postTypeFilter === type ? 'bg-[#bf2c7e] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      {type === 'all' ? 'All Posts' : `${type.charAt(0).toUpperCase() + type.slice(1)}s`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-medium text-[#0f1c47] mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {shelf.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:w-3/4">
            {activeTab === 'posts' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#0f1c47]">
                    {postTypeFilter === 'all' ? 'All Posts' : `${postTypeFilter.charAt(0).toUpperCase() + postTypeFilter.slice(1)}s`}
                  </h2>
                  <button className="px-4 py-2 bg-[#bf2c7e] text-white rounded-md hover:bg-[#a8256d] transition-colors">
                    Create Post
                  </button>
                </div>

                <div className="space-y-6">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="p-6">
                          <div className="flex justify-between">
                            <div className="flex items-center space-x-3">
                              <img 
                                src={post.createdBy.avatar || '/default-avatar.jpg'} 
                                alt={post.createdBy.name} 
                                className="w-10 h-10 rounded-full" 
                              />
                              <div>
                                <p className="font-medium">{post.createdBy.name}</p>
                                <p className="text-sm text-gray-500">
                                  {post.createdAt.toLocaleDateString()} • {post.type}
                                </p>
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              post.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {post.status}
                            </span>
                          </div>

                          <h3 className="mt-4 text-xl font-semibold text-[#0f1c47]">{post.title}</h3>
                          <p className="mt-2 text-gray-700">{post.description}</p>

                          {post.images.length > 0 && (
                            <div className="mt-4">
                              <img 
                                src={post.images[0]} 
                                alt={post.title} 
                                className="w-full h-64 object-cover rounded-lg"
                              />
                            </div>
                          )}

                          <div className="mt-4 flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>

                          {post.price && (
                            <div className="mt-4">
                              <span className="text-xl font-bold text-[#0f1c47]">
                                {post.price} {post.currency}
                              </span>
                            </div>
                          )}

                          <div className="mt-6 flex justify-between items-center">
                            <div className="flex space-x-4 text-sm text-gray-500">
                              <span>{post.stats.views} views</span>
                              <span>{post.stats.saves} saves</span>
                              <span>{post.stats.inquiries} inquiries</span>
                            </div>
                            <div className="flex space-x-3">
                              <button className="text-[#bf2c7e] hover:text-[#a8256d]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                              </button>
                              <button className="text-[#bf2c7e] hover:text-[#a8256d]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                                </svg>
                              </button>
                              <button className="text-[#bf2c7e] hover:text-[#a8256d]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                      <p className="text-gray-500">No posts found matching your criteria</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'members' && (
              <div>
                <h2 className="text-2xl font-bold text-[#0f1c47] mb-6">Shelf Members</h2>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Member
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Role
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Joined
                            </th>
                            {currentUser && (currentUser.role === 'owner' || currentUser.role === 'admin') && (
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            )}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {shelf.members.map((member) => (
                            <tr key={member.userId}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10">
                                    <img 
                                      className="h-10 w-10 rounded-full" 
                                      src={member.avatar || '/default-avatar.jpg'} 
                                      alt={member.name} 
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                    <div className="text-sm text-gray-500">{member.userId}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  member.role === 'owner' ? 'bg-purple-100 text-purple-800' :
                                  member.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {member.role}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(member.joinedAt).toLocaleDateString()}
                              </td>
                              {currentUser && (currentUser.role === 'owner' || currentUser.role === 'admin') && (
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  {member.role !== 'owner' && (
                                    <div className="flex space-x-2">
                                      {member.role !== 'admin' && (
                                        <button className="text-[#0f1c47] hover:text-[#0a142f]">
                                          Make Admin
                                        </button>
                                      )}
                                      {member.role === 'admin' && (
                                        <button className="text-[#0f1c47] hover:text-[#0a142f]">
                                          Remove Admin
                                        </button>
                                      )}
                                      <button className="text-[#bf2c7e] hover:text-[#a8256d]">
                                        Remove
                                      </button>
                                    </div>
                                  )}
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div>
                <h2 className="text-2xl font-bold text-[#0f1c47] mb-6">About This Shelf</h2>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-[#0f1c47] mb-3">Description</h3>
                      <p className="text-gray-700">{shelf.description}</p>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-[#0f1c47] mb-3">Shelf Rules</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        {shelf.rules.split('\n').map((rule, i) => (
                          <p key={i} className="text-gray-700 mb-2">{rule}</p>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#0f1c47] mb-3">Shelf Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Created</p>
                          <p className="text-gray-700">{new Date(shelf.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Visibility</p>
                          <p className="text-gray-700 capitalize">{shelf.visibility}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Post Types</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {shelf.type?.map((type) => (
                              <span key={type} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Tags</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {shelf.tags.map((tag) => (
                              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#0f1c47]">Invite Members</h3>
              <button 
                onClick={() => setShowInviteModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mb-4">
              <label htmlFor="invite-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="invite-email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
                placeholder="Enter email address"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <div className="space-y-2">
                {['member', 'admin'].map((role) => (
                  <div key={role} className="flex items-center">
                    <input
                      id={`role-${role}`}
                      name="role"
                      type="radio"
                      defaultChecked={role === 'member'}
                      className="h-4 w-4 text-[#bf2c7e] focus:ring-[#bf2c7e] border-gray-300"
                    />
                    <label htmlFor={`role-${role}`} className="ml-2 block text-sm text-gray-700 capitalize">
                      {role}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle invite logic
                  setShowInviteModal(false);
                  setInviteEmail('');
                }}
                className="px-4 py-2 bg-[#bf2c7e] text-white rounded-md hover:bg-[#a8256d]"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShelfDetailPage;
