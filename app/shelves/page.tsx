/*"use client";
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
    openForMembers: true,
  },
  {
    id: 2,
    name: 'Future Fashion Collective',
    type: 'service',
    members: 28,
    description: 'Revolutionizing sustainable fashion through collaborative design',
    products: ['Custom Tailoring', 'Fabric Upcycling Service', 'Virtual Try-On'],
    investments: 15000,
    openForMembers: false,
  },
  // Add more shelves...
];

export default function ShelvesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShelf, setSelectedShelf] = useState<Shelf | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="min-h-screen bg-white">
      <TopNavModified menuItems={["Add Shelf", "My Shelves"]} />

      {/* Header Section *
      <div className="bg-white py-4 px-4">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold text-[#0f1c47] mb-3">Collaborative Shelves</h1>

          {/* Search and Filters *
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Search shelves..."
              className="w-full p-4 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="flex flex-wrap gap-2">
              {['all', 'product', 'service', 'investment'].map((filter) => (
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

      {/* Shelves Grid *
      <div className="container mx-auto py-4 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyShelves.map((shelf) => (
            <div
              key={shelf.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-[#0f1c47]/10"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-[#0f1c47]">{shelf.name}</h3>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    shelf.type === 'product'
                      ? 'bg-[#bf2c7e]/10 text-[#bf2c7e]'
                      : shelf.type === 'service'
                      ? 'bg-[#0f1c47]/10 text-[#0f1c47]'
                      : 'bg-green-100 text-green-600'
                  }`}
                >
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

      {/* Create Post FAB *
      <button className="fixed bottom-8 right-8 bg-[#bf2c7e] text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
        <span className="hidden sm:inline">Post Your Skill</span>
        <span className="text-xl">+</span>
      </button>*

      {/* Shelf Details Modal *
      {selectedShelf && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
          <div className="container mx-auto p-4 h-full flex items-center justify-center">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Content *
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-[#0f1c47]">{selectedShelf.name}</h2>
                <button
                  onClick={() => setSelectedShelf(null)}
                  className="text-gray-500 hover:text-[#bf2c7e]"
                >
                  ✕
                </button>
              </div>

              {/* Members & Products Section *
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#0f1c47] mb-3">Members</h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: selectedShelf.members }).map((_, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-[#bf2c7e]/10 flex items-center justify-center text-[#bf2c7e]"
                      >
                        👤
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#0f1c47] mb-3">Products/Services</h3>
                  <div className="space-y-2">
                    {selectedShelf.products.map((product) => (
                      <div
                        key={product}
                        className="p-3 bg-[#0f1c47]/5 rounded-lg text-[#0f1c47]"
                      >
                        {product}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons *
                <div className="flex gap-4">
                  <button className="bg-[#bf2c7e] text-white px-6 py-2 rounded-full hover:bg-[#a02468] transition-colors">
                    Request to Join
                  </button>
                  <button className="border border-[#0f1c47] text-[#0f1c47] px-6 py-2 rounded-full hover:bg-[#0f1c47]/5 transition-colors">
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
}*/



"use client";
import TopNavModified from '@/components/TopNavModified';
import { useState, useEffect } from 'react';

interface Member {
  _id: string;
  name: string;
  role: string;
  image: string;
}

interface Shelf {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  members: Member[];
  type?: 'product' | 'service' | 'investment'; // Added optional type to match original interface
  products?: string[]; // Added to match original interface
  investments?: number; // Added to match original interface
  openForMembers?: boolean; // Added to match original interface
}

export default function ShelvesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShelf, setSelectedShelf] = useState<Shelf | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [shelves, setShelves] = useState<Shelf[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShelves = async () => {
      try {
        const response = await fetch("https://shaddyna-backend.onrender.com/api/shelf/shelves");
        if (!response.ok) throw new Error("Failed to fetch shelves");
        const data = await response.json();
        
        const shelvesData = Array.isArray(data) ? data : data.shelves;
        if (!Array.isArray(shelvesData)) throw new Error("Invalid API response format");
        
        // Map the API data to match the expected Shelf interface
        const mappedShelves = shelvesData.map(shelf => ({
          ...shelf,
          id: shelf._id, // Using _id as id to match original interface
          type: shelf.type || 'product', // Default to 'product' if not provided
          products: shelf.products || [], // Default to empty array if not provided
          openForMembers: shelf.openForMembers || true, // Default to true if not provided
          members: shelf.members || [], // Ensure members array exists
        }));
        
        setShelves(mappedShelves);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchShelves();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <TopNavModified menuItems={["Add Shelf", "My Shelves"]} />
        <div className="container mx-auto py-8 px-4">
          <p>Loading shelves...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <TopNavModified menuItems={["Add Shelf", "My Shelves"]} />
        <div className="container mx-auto py-8 px-4">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <TopNavModified menuItems={["Add Shelf", "My Shelves"]} />

      {/* Header Section */}
      <div className="bg-white py-4 px-4">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold text-[#0f1c47] mb-3">Collaborative Shelves</h1>

          {/* Search and Filters */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Search shelves..."
              className="w-full p-4 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="flex flex-wrap gap-2">
              {['all', 'product', 'service', 'investment'].map((filter) => (
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

      {/* Shelves Grid */}
      <div className="container mx-auto py-4 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shelves.map((shelf) => (
            <div
              key={shelf._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-[#0f1c47]/10"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-[#0f1c47]">{shelf.name}</h3>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    shelf.type === 'product'
                      ? 'bg-[#bf2c7e]/10 text-[#bf2c7e]'
                      : shelf.type === 'service'
                      ? 'bg-[#0f1c47]/10 text-[#0f1c47]'
                      : 'bg-green-100 text-green-600'
                  }`}
                >
                  {shelf.type}
                </span>
              </div>

              <p className="text-gray-600 mb-4">{shelf.description}</p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-[#0f1c47]">👥 {shelf.members.length} members</span>
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

      {/* Shelf Details Modal */}
      {selectedShelf && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
          <div className="container mx-auto p-4 h-full flex items-center justify-center">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Content */}
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-[#0f1c47]">{selectedShelf.name}</h2>
                <button
                  onClick={() => setSelectedShelf(null)}
                  className="text-gray-500 hover:text-[#bf2c7e]"
                >
                  ✕
                </button>
              </div>

              {/* Members & Products Section */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#0f1c47] mb-3">Members</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedShelf.members.map((member, i) => (
                      <div
                        key={member._id}
                        className="w-10 h-10 rounded-full bg-[#bf2c7e]/10 flex items-center justify-center text-[#bf2c7e]"
                      >
                        {member.image ? (
                          <img src={member.image} alt={member.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          '👤'
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {selectedShelf.products && selectedShelf.products.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-[#0f1c47] mb-3">Products/Services</h3>
                    <div className="space-y-2">
                      {selectedShelf.products.map((product) => (
                        <div
                          key={product}
                          className="p-3 bg-[#0f1c47]/5 rounded-lg text-[#0f1c47]"
                        >
                          {product}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button className="bg-[#bf2c7e] text-white px-6 py-2 rounded-full hover:bg-[#a02468] transition-colors">
                    Request to Join
                  </button>
                  <button className="border border-[#0f1c47] text-[#0f1c47] px-6 py-2 rounded-full hover:bg-[#0f1c47]/5 transition-colors">
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