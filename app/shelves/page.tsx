/*"use client";
import TopNavModified from '@/components/TopNavModified';
import { useState, useEffect } from 'react';
import { Shelf, User } from '@/types/types';
import { ShelfCard } from '@/components/shelves/ShelfCard';
import { ShelfDetailsModal } from '@/components/shelves/ShelfDetailsModal';
import { CreateShelfForm } from '@/components/shelves/CreateShelfForm';

export default function ShelvesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShelf, setSelectedShelf] = useState<Shelf | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [shelves, setShelves] = useState<Shelf[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);

  useEffect(() => {
    const fetchShelves = async () => {
      try {
        const response = await fetch("https://shaddyna-backend.onrender.com/api/shelf/shelves");
        if (!response.ok) throw new Error("Failed to fetch shelves");
        const data = await response.json();
        
        const shelvesData = Array.isArray(data) ? data : data.shelves;
        if (!Array.isArray(shelvesData)) throw new Error("Invalid API response format");
        
        const mappedShelves = shelvesData.map(shelf => ({
          ...shelf,
          id: shelf._id,
          type: shelf.type || 'product',
          products: shelf.products || [],
          openForMembers: shelf.openForMembers || true,
          members: shelf.members || [],
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

  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const response = await fetch("https://shaddyna-backend.onrender.com/api/users/all");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setUsersLoading(false);
    }
  };

  const handleCreateShelf = async (data: {
    name: string;
    description: string;
    type: 'product' | 'service' | 'investment';
    openForMembers: boolean;
    members: Array<{ userId: string; role: string }>;
  }) => {
    try {
      const response = await fetch("http://localhost:5000/api/shelf/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create shelf");

      const createdShelf = await response.json();
      setShelves([...shelves, createdShelf]);
      setShowCreateForm(false);
    } catch (error: any) {
      setError(error.message);
    }
  };

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
        <div className="container mx-auto py-8 px-4">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <TopNavModified menuItems={["Add Shelf", "My Shelves"]} />

      {/* Floating Create Shelf Button *
      <div className="fixed bottom-8 right-8 z-40">
        <button
          onClick={() => {
            setShowCreateForm(true);
            fetchUsers();
          }}
          className="bg-[#bf2c7e] text-white p-4 rounded-full shadow-lg hover:bg-[#a02468] transition-colors flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="ml-2">Create Shelf</span>
        </button>
      </div>

      {/* Create Shelf Modal *
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#0f1c47]">Create New Shelf</h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-gray-500 hover:text-[#bf2c7e]"
              >
                ✕
              </button>
            </div>

            <CreateShelfForm
              onSubmit={handleCreateShelf}
              onCancel={() => setShowCreateForm(false)}
              users={users}
              loading={usersLoading}
            />
          </div>
        </div>
      )}

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
          {shelves.map((shelf) => (
            <ShelfCard
              key={shelf._id}
              shelf={shelf}
              onClick={() => setSelectedShelf(shelf)}
            />
          ))}
        </div>
      </div>

      {/* Shelf Details Modal *
      {selectedShelf && (
        <ShelfDetailsModal
          shelf={selectedShelf}
          onClose={() => setSelectedShelf(null)}
        />
      )}
    </div>
  );
}*/

"use client";
import TopNavModified from '@/components/TopNavModified';
import { useState, useEffect } from 'react';
import { Shelf, User } from '@/types/types';
import { ShelfCard } from '@/components/shelves/ShelfCard';
import { ShelfDetailsModal } from '@/components/shelves/ShelfDetailsModal';
import { CreateShelfForm } from '@/components/shelves/CreateShelfForm';

export default function ShelvesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShelf, setSelectedShelf] = useState<Shelf | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [shelves, setShelves] = useState<Shelf[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);

  useEffect(() => {
    const fetchShelves = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("https://shaddyna-backend.onrender.com/api/shelf/shelves");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const responseData = await response.json();
        
        // Handle both array and object response formats
        const shelvesData = Array.isArray(responseData) 
          ? responseData 
          : responseData.data || responseData.shelves || [];
    
        if (!Array.isArray(shelvesData)) {
          throw new Error("API response is not an array");
        }
    
        // Transform the backend data to match our frontend types
        const mappedShelves = shelvesData.map((shelf: any) => {
          // Handle cases where members might be populated or just IDs
          const members = shelf.members?.map((member: any) => ({
            _id: member.userId?._id || member.userId || member._id,
            name: member.userId?.firstName || member.name || 'Unknown Member',
            role: member.role || 'member',
            image: member.userId?.image || member.image || ''
          })) || [];
    
          return {
            _id: shelf._id || '',
            name: shelf.name || 'Unnamed Shelf',
            description: shelf.description || '',
            image: shelf.image || '',
            type: ['product', 'service', 'investment'].includes(shelf.type) 
              ? shelf.type 
              : 'product',
            openForMembers: shelf.openForMembers !== false,
            members,
            products: shelf.products || [],
            investments: shelf.investments || 0,
            createdAt: shelf.createdAt || new Date().toISOString(),
            updatedAt: shelf.updatedAt || new Date().toISOString()
          };
        });
        
        setShelves(mappedShelves);
      } catch (error: any) {
        console.error("Error fetching shelves:", error);
        setError(error.message || "Failed to load shelves");
      } finally {
        setLoading(false);
      }
    };

    fetchShelves();
  }, []);

  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const response = await fetch("https://shaddyna-backend.onrender.com/api/users/all");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setUsersLoading(false);
    }
  };

  const handleCreateShelf = async (data: {
    name: string;
    description: string;
    type: 'product' | 'service' | 'investment';
    openForMembers: boolean;
    members: Array<{ userId: string; role: string }>;
  }) => {
    try {
      const response = await fetch("https://shaddyna-backend.onrender.com/api/shelf/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create shelf");
      }

      const { data: createdShelf } = await response.json();
      
      // Transform the created shelf to match our frontend type
      const newShelf = {
        _id: createdShelf._id,
        name: createdShelf.name,
        description: createdShelf.description,
        image: createdShelf.image || '',
        type: createdShelf.type || 'product',
        openForMembers: createdShelf.openForMembers !== false,
        members: createdShelf.members?.map((member: any) => ({
          _id: member.userId?._id || member.userId,
          name: member.userId?.firstName || 'Unknown Member',
          role: member.role || 'member',
          image: member.userId?.image || ''
        })) || [],
        products: createdShelf.products || [],
        investments: createdShelf.investments || 0,
        createdAt: createdShelf.createdAt,
        updatedAt: createdShelf.updatedAt
      };

      setShelves(prev => [...prev, newShelf]);
      setShowCreateForm(false);
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Filter shelves based on search and active filter
  const filteredShelves = shelves.filter(shelf => {
    const matchesSearch = shelf.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         shelf.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || shelf.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
          <TopNavModified menuItems={["Add Shelf", "My Shelves"]} onMenuItemClick={function (item: string): void {
          throw new Error('Function not implemented.');
        } } />
        {/*
        <TopNavModified menuItems={["Add Shelf", "My Shelves"]} />*/}
        <div className="container mx-auto py-8 px-4">
          <p>Loading shelves...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto py-8 px-4">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/*<TopNavModified menuItems={["Add Shelf", "My Shelves"]} />*/}
      <TopNavModified menuItems={["Add Shelf", "My Shelves"]} onMenuItemClick={function (item: string): void {
          throw new Error('Function not implemented.');
        } } />
  
      {/* Floating Create Shelf Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <button
          onClick={() => {
            setShowCreateForm(true);
            fetchUsers();
          }}
          className="bg-[#bf2c7e] text-white p-4 rounded-full shadow-lg hover:bg-[#a02468] transition-colors flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="ml-2">Create Shelf</span>
        </button>
      </div>
  
      {/* Create Shelf Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#0f1c47]">Create New Shelf</h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-gray-500 hover:text-[#bf2c7e]"
              >
                ✕
              </button>
            </div>
  
            <CreateShelfForm
              onSubmit={handleCreateShelf}
              onCancel={() => setShowCreateForm(false)}
              users={users}
              loading={usersLoading}
            />
          </div>
        </div>
      )}
  
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
          {filteredShelves.map((shelf) => (
            <ShelfCard 
            key={shelf._id}
            shelf={shelf}
            onViewDetails={() => setSelectedShelf(shelf)}
          />
          ))}
        </div>
      </div>
  
      {/* Shelf Details Modal */}
      {selectedShelf && (
         <ShelfDetailsModal
         shelf={selectedShelf}
         onClose={() => setSelectedShelf(null)}
         onJoinRequest={() => {
           // Handle join request logic
           console.log('Join request for:', selectedShelf.name);
         }}
       />
      )}
    </div>
  );}