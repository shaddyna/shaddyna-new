/*"use client"
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const dummyShelves = [
  {
    id: 1,
    name: "Tech Innovators",
    logo: "https://via.placeholder.com/50",
    description: "A hub for cutting-edge technology solutions.",
    members: 25,
    type: "Product-based",
  },
  {
    id: 2,
    name: "Wellness Gurus",
    logo: "https://via.placeholder.com/50",
    description: "Health & wellness services and collaborations.",
    members: 40,
    type: "Service-based",
  },
  {
    id: 3,
    name: "Green Investors",
    logo: "https://via.placeholder.com/50",
    description: "Investment opportunities in sustainability.",
    members: 18,
    type: "Investment-focused",
  },
];

export default function ShelvesPage() {
  const [search, setSearch] = useState("");
  
  const filteredShelves = dummyShelves.filter((shelf) =>
    shelf.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-[#0f1c47] p-6 md:p-12">
      <h1 className="text-3xl font-bold text-center mb-8">Explore Shelves</h1>
      
      {/* Search & Filter *
      <div className="flex items-center max-w-xl mx-auto bg-gray-100 p-3 rounded-lg mb-6">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search shelves..."
          className="bg-transparent outline-none ml-2 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      {/* Shelves List *
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredShelves.map((shelf) => (
          <div key={shelf.id} className="p-5 bg-[#bf2c7e] text-white rounded-lg shadow-md">
            <div className="flex items-center gap-4 mb-3">
              <img src={shelf.logo} alt={shelf.name} className="w-12 h-12 rounded-full" />
              <h2 className="text-lg font-semibold">{shelf.name}</h2>
            </div>
            <p className="text-sm mb-2">{shelf.description}</p>
            <p className="text-xs">👥 {shelf.members} members | {shelf.type}</p>
            <button className="mt-3 bg-white text-[#bf2c7e] py-2 px-4 rounded-md font-semibold hover:bg-[#f2f2f2]">
              View Shelf
            </button>
          </div>
        ))}
      </div>
      
      {/* CTA: Create Shelf *
      <div className="text-center mt-12">
        <button className="bg-[#0f1c47] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#142a63]">
          + Start a Shelf
        </button>
      </div>
    </div>
  );
}
*/

/*'use client';

import { useState } from 'react';
import { FaUsers, FaSearch } from 'react-icons/fa';
import { IoAddCircleOutline } from 'react-icons/io5';

const dummyShelves = [
  {
    id: 1,
    name: 'Tech Innovators',
    logo: '/shelf1.png',
    description: 'A group for cutting-edge technology products and services.',
    members: 120,
    category: 'Product-based',
    acceptingMembers: true,
  },
  {
    id: 2,
    name: 'Creative Designers',
    logo: '/shelf2.png',
    description: 'A community of designers collaborating on innovative projects.',
    members: 85,
    category: 'Service-based',
    acceptingMembers: false,
  },
];

export default function ShelvesPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  return (
    <div className="bg-white min-h-screen p-6 text-[#0f1c47]">
      {/* Header & Search *
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#bf2c7e]">Explore Shelves</h1>
        <div className="flex items-center gap-2 mt-4">
          <input
            type="text"
            placeholder="Search shelves..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bf2c7e]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-[#bf2c7e] text-white p-3 rounded-lg">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Shelves List *
      <div className="max-w-5xl mx-auto mt-6 grid md:grid-cols-2 gap-6">
        {dummyShelves.map((shelf) => (
          <div
            key={shelf.id}
            className="p-5 bg-white border rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-4">
              <img src={shelf.logo} alt={shelf.name} className="w-16 h-16 rounded-full" />
              <div>
                <h2 className="text-xl font-semibold">{shelf.name}</h2>
                <p className="text-sm text-gray-600">{shelf.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <FaUsers className="text-[#bf2c7e]" />
                  <span>{shelf.members} members</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action *
      <div className="flex justify-center mt-10">
        <button className="flex items-center gap-2 bg-[#0f1c47] text-white py-3 px-6 rounded-lg hover:bg-[#bf2c7e] transition-all">
          <IoAddCircleOutline size={20} /> Start a Shelf
        </button>
      </div>
    </div>
  );
}
*/
"use client"
import TopNavModified from '@/components/TopNavModified';
import { useState } from 'react';

interface Shelf {
  id: number;
  name: string;
  type: 'product' | 'service' | 'investment';
  members: number;
  description: string;
  products: string[];
  investments?: number;
  openForMembers: boolean;
}

const dummyShelves: Shelf[] = [
  {
    id: 1,
    name: 'EcoTech Innovations',
    type: 'product',
    members: 45,
    description: 'Developing sustainable tech solutions for urban environments',
    products: ['Solar Chargers', 'Smart Recycling Bins', 'Air Quality Sensors'],
    openForMembers: true
  },
  {
    id: 2,
    name: 'Future Fashion Collective',
    type: 'service',
    members: 28,
    description: 'Revolutionizing sustainable fashion through collaborative design',
    products: ['Custom Tailoring', 'Fabric Upcycling Service', 'Virtual Try-On'],
    investments: 15000,
    openForMembers: false
  },
  // Add more shelves...
];

export default function ShelvesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShelf, setSelectedShelf] = useState<Shelf | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="min-h-screen bg-white">
       <TopNavModified menuItems={["Add Shelf","My Shelves"]} />
      {/* Header Section */}
      <div className="bg-white py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-[#0f1c47] mb-6">Collaborative Shelves</h1>
          
          {/* Search and Filters */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Search shelves..."
              className="w-full p-4 rounded-lg bg-[#0f1c47] text-gray-400 placeholder-white/70"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            <div className="flex flex-wrap gap-2">
              {['all', 'product', 'service', 'investment'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full ${
                    activeFilter === filter
                      ? 'bg-[#bf2c7e] text-white'
                      : 'bg-[#0f1c47] text-white hover:bg-gray-700'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Shelves Grid */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyShelves.map((shelf) => (
            <div
              key={shelf.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-[#0f1c47]">{shelf.name}</h3>
                <span className="px-3 py-1 text-sm rounded-full bg-[#bf2c7e]/10 text-[#bf2c7e]">
                  {shelf.type}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{shelf.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-[#0f1c47]">👥 {shelf.members} members</span>
                  {shelf.openForMembers && (
                    <span className="text-[#bf2c7e]">✨ Accepting members</span>
                  )}
                </div>
                <button
                  onClick={() => setSelectedShelf(shelf)}
                  className="text-[#bf2c7e] hover:underline"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

       {/* Create Post FAB */}
<button className="hidden sm:fixed sm:bottom-20 sm:right-8 sm:bg-[#bf2c7e] sm:text-white sm:p-4 sm:rounded-full sm:shadow-lg sm:hover:scale-105 sm:transition-transform lg:flex sm:items-center sm:gap-2">
  <span className="hidden sm:inline">Post Your Skill</span>
</button>



      {/* Shelf Details Modal */}
      {selectedShelf && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
          <div className="container mx-auto p-4 h-full flex items-center justify-center">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Content */}
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-[#0f1c47]">{selectedShelf.name}</h2>
                <button onClick={() => setSelectedShelf(null)} className="text-gray-500 hover:text-[#bf2c7e]">
                  ✕
                </button>
              </div>
              
              {/* Members & Products Section */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#0f1c47] mb-3">Members</h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: selectedShelf.members }).map((_, i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gray-200"></div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#0f1c47] mb-3">Products/Services</h3>
                  <div className="space-y-2">
                    {selectedShelf.products.map((product) => (
                      <div key={product} className="p-3 bg-gray-50 rounded-lg">
                        {product}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button className="bg-[#bf2c7e] text-white px-6 py-2 rounded-full">
                    Request to Join
                  </button>
                  <button className="border border-[#0f1c47] text-[#0f1c47] px-6 py-2 rounded-full">
                    Invest in Shelf
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}