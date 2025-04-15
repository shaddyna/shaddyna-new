"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

interface User {
    id: string;
    name: string;
    avatar?: string;
}

interface Shelf  {
    _id: string;
    name: string;
    description: string;
    bannerImage: string;
    createdBy: User;
    members: User[];
    createdAt: Date;
    type?: string[];
    //types: ('products' | 'services' | 'investments')[];
    visibility: 'public' | 'private' | 'unlisted';
    rules: string;
    tags: string[];
    stats: {
      totalPosts: number;
      activeMembers: number;
    };
  };

const ShelvesListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'products' | 'services' | 'investments'>('all');
  const [shelves, setShelves] = useState<Shelf[]>([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShelves = async () => {
      try {
        const response = await axios.get('https://shaddyna-backend.onrender.com/api/shelf');
        // Make sure response.data is an array
        setShelves(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError('Failed to fetch shelves');
        console.error('Error fetching shelves:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchShelves();
  }, []);

  const filteredShelves = shelves.filter(shelf => {
    const matchesSearch = shelf.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (shelf.description && shelf.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'all' || shelf.type?.includes(typeFilter);
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading shelves...</p>
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
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Shelves | Community Spaces</title>
        <meta name="description" content="Browse all community shelves" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#0f1c47]">Community Shelves</h1>
            <p className="text-gray-600 mt-2">
              {shelves.length} collaborative spaces to share products, services, and opportunities
            </p>
          </div>
          <Link
            href="/shelves/new"
            className="px-6 py-3 bg-[#bf2c7e] text-white rounded-md hover:bg-[#a8256d] transition-colors whitespace-nowrap"
          >
            Create New Shelf
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Shelves
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or description..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Type
              </label>
              <div className="flex flex-wrap gap-2">
                {['all', 'products', 'services', 'investments'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type as any)}
                    className={`px-4 py-2 rounded-md text-sm ${
                      typeFilter === type 
                        ? 'bg-[#0f1c47] text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Shelves Grid */}
        {filteredShelves.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShelves.map((shelf) => (
              <Link key={shelf._id} href={`/shelves/${shelf._id}`} className="group">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={shelf.bannerImage || '/default-banner.jpg'} 
                      alt={shelf.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c47] to-transparent opacity-70"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-xl font-semibold">{shelf.name}</h3>
                    </div>
                  </div>
                  <div className="p-6 flex-grow">
                    <p className="text-gray-600 line-clamp-3 mb-4">{shelf.description || 'No description'}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                          {(shelf.members?.length || 0)} members
                        </span>
                      </div>
                      <span className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                        {(shelf.type?.join(', ') || 'No type specified')}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No shelves found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setTypeFilter('all');
              }}
              className="px-4 py-2 text-[#bf2c7e] hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShelvesListPage;

{/*"use client"
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Shelf, generateDummyUser, generateDummyShelf } from '../../types/shelf';

const currentUser = generateDummyUser('user-1', 'You', 'owner');

// Generate dummy shelves data
const dummyShelves: Shelf[] = Array.from({ length: 12 }, (_, i) => 
  generateDummyShelf(`shelf-${i}`, currentUser)
);

const ShelvesListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'products' | 'services' | 'investments'>('all');

  const filteredShelves = dummyShelves.filter(shelf => {
    const matchesSearch = shelf.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         shelf.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || shelf.types.includes(typeFilter);
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Shelves | Community Spaces</title>
        <meta name="description" content="Browse all community shelves" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#0f1c47]">Community Shelves</h1>
            <p className="text-gray-600 mt-2">
              {dummyShelves.length} collaborative spaces to share products, services, and opportunities
            </p>
          </div>
          <Link
            href="/shelves/new"
            className="px-6 py-3 bg-[#bf2c7e] text-white rounded-md hover:bg-[#a8256d] transition-colors whitespace-nowrap"
          >
            Create New Shelf
          </Link>
        </div>

        {/* Filters *
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Shelves
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or description..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Type
              </label>
              <div className="flex flex-wrap gap-2">
                {['all', 'products', 'services', 'investments'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type as any)}
                    className={`px-4 py-2 rounded-md text-sm ${
                      typeFilter === type 
                        ? 'bg-[#0f1c47] text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Shelves Grid *
        {filteredShelves.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShelves.map((shelf) => (
             <Link
             key={shelf.id}
             href={`/shelves/${shelf.id}`}
             className="group"
           >
             <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
               <div className="h-48 relative overflow-hidden">
                 <img 
                   src={shelf.bannerImage} 
                   alt={shelf.name}
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c47] to-transparent opacity-70"></div>
                 <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                   <h3 className="text-xl font-semibold">{shelf.name}</h3>
                 </div>
               </div>
               <div className="p-6 flex-grow">
                 <p className="text-gray-600 line-clamp-3 mb-4">{shelf.description}</p>
                 <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-2">
                     <div className="flex -space-x-2">
                       {shelf.members.slice(0, 3).map((member) => (
                         <img 
                           key={member.id}
                           src={member.avatar}
                           alt={member.name}
                           className="w-8 h-8 rounded-full border-2 border-white"
                         />
                       ))}
                     </div>
                     <span className="text-sm text-gray-500">
                       {shelf.stats.activeMembers} members
                     </span>
                   </div>
                   <span className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                     {shelf.types.join(', ')}
                   </span>
                 </div>
               </div>
             </div>
           </Link>
           
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No shelves found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setTypeFilter('all');
              }}
              className="px-4 py-2 text-[#bf2c7e] hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShelvesListPage;*/}