// app/shelves/page.tsx
"use client";
import TopNavModified from '@/components/TopNavModified';
import { useState, useEffect } from 'react';
import { Shelf, User, Member, ProductDetails, ServiceDetails, InvestmentDetails, } from '@/types/types';
import { ShelfCard } from '@/components/shelves/ShelfCard';
import { CreateShelfForm } from '@/components/shelves/CreateShelfForm';
import { useRouter } from 'next/navigation';

export default function ShelvesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
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
        const mappedShelves = shelvesData.map((shelf: any): Shelf => {
          // Process members
          const members: Member[] = shelf.members?.map((member: any) => {
            // Handle cases where userId might be populated or just an ID
            const userId = typeof member.userId === 'object' 
              ? {
                  _id: member.userId._id,
                  firstName: member.userId.firstName || '',
                  lastName: member.userId.lastName || '',
                  email: member.userId.email || '',
                  image: member.userId.image,
                  role: member.userId.role || 'member'
                }
              : member.userId || '';
  
            return {
              userId,
              role: member.role || 'member',
              ...(member._id ? { _id: member._id } : {})
            };
          }) || [];
  
          // Process details based on shelf type
          let productDetails: ProductDetails[] | undefined;
          let serviceDetails: ServiceDetails[] | undefined;
          let investmentDetails: InvestmentDetails[] | undefined;
  
          if (shelf.type === 'product') {
            productDetails = shelf.productDetails?.map((product: any): ProductDetails => ({
              name: product.name || '',
              price: product.price || 0,
              stock: product.stock || 0,
              images: product.images || [],
              category: product.category || 'uncategorized'
            })) || [];
          } else if (shelf.type === 'service') {
            serviceDetails = shelf.serviceDetails?.map((service: any): ServiceDetails => ({
              price: service.price || 0,
              duration: service.duration || '',
              availability: (service.availability || []).filter((day: string) => 
                ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].includes(day)
              ) as ServiceDetails['availability']
            })) || [];
          } else if (shelf.type === 'investment') {
            investmentDetails = shelf.investmentDetails?.map((investment: any): InvestmentDetails => ({
              amount: investment.amount || 0,
              roi: investment.roi || 0,
              duration: investment.duration || '',
              riskLevel: ['low', 'medium', 'high'].includes(investment.riskLevel)
                ? investment.riskLevel as InvestmentDetails['riskLevel']
                : 'medium'
            })) || [];
          }
  
          return {
            _id: shelf._id || '',
            name: shelf.name || 'Unnamed Shelf',
            description: shelf.description || '',
            type: ['product', 'service', 'investment'].includes(shelf.type)
              ? shelf.type as Shelf['type']
              : 'product',
            openForMembers: shelf.openForMembers !== false,
            members,
            ...(productDetails ? { productDetails } : {}),
            ...(serviceDetails ? { serviceDetails } : {}),
            ...(investmentDetails ? { investmentDetails } : {}),
            createdAt: shelf.createdAt || new Date().toISOString(),
            updatedAt: shelf.updatedAt || new Date().toISOString(),
            ...(shelf.__v !== undefined ? { __v: shelf.__v } : {})
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

  const handleShelfCreated = (newShelf: Shelf) => {
    setShelves(prev => [...prev, newShelf]);
    setShowCreateForm(false);
  };

  const handleViewDetails = (shelfId: string) => {
    router.push(`/shelves/${shelfId}`);
  };

  const filteredShelves = shelves.filter(shelf => {
    const matchesSearch = shelf.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         shelf.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || shelf.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <TopNavModified 
          menuItems={["Add Shelf", "My Shelves"]} 
          onMenuItemClick={() => {}} 
        />
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
      <TopNavModified 
        menuItems={["Add Shelf", "My Shelves"]} 
        onMenuItemClick={() => {}} 
      />
  
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
              onSuccess={handleShelfCreated}
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
              onViewDetails={() => handleViewDetails(shelf._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

{/*"use client";
import TopNavModified from '@/components/TopNavModified';
import { useState, useEffect } from 'react';
import { Shelf, User, Member, ProductDetails, ServiceDetails, InvestmentDetails, } from '@/types/types';
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
        const mappedShelves = shelvesData.map((shelf: any): Shelf => {
          // Process members
          const members: Member[] = shelf.members?.map((member: any) => {
            // Handle cases where userId might be populated or just an ID
            const userId = typeof member.userId === 'object' 
              ? {
                  _id: member.userId._id,
                  firstName: member.userId.firstName || '',
                  lastName: member.userId.lastName || '',
                  email: member.userId.email || '',
                  image: member.userId.image,
                  role: member.userId.role || 'member'
                }
              : member.userId || '';
  
            return {
              userId,
              role: member.role || 'member',
              ...(member._id ? { _id: member._id } : {})
            };
          }) || [];
  
          // Process details based on shelf type
          let productDetails: ProductDetails[] | undefined;
          let serviceDetails: ServiceDetails[] | undefined;
          let investmentDetails: InvestmentDetails[] | undefined;
  
          if (shelf.type === 'product') {
            productDetails = shelf.productDetails?.map((product: any): ProductDetails => ({
              name: product.name || '',
              price: product.price || 0,
              stock: product.stock || 0,
              images: product.images || [],
              category: product.category || 'uncategorized'
            })) || [];
          } else if (shelf.type === 'service') {
            serviceDetails = shelf.serviceDetails?.map((service: any): ServiceDetails => ({
              price: service.price || 0,
              duration: service.duration || '',
              availability: (service.availability || []).filter((day: string) => 
                ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].includes(day)
              ) as ServiceDetails['availability']
            })) || [];
          } else if (shelf.type === 'investment') {
            investmentDetails = shelf.investmentDetails?.map((investment: any): InvestmentDetails => ({
              amount: investment.amount || 0,
              roi: investment.roi || 0,
              duration: investment.duration || '',
              riskLevel: ['low', 'medium', 'high'].includes(investment.riskLevel)
                ? investment.riskLevel as InvestmentDetails['riskLevel']
                : 'medium'
            })) || [];
          }
  
          return {
            _id: shelf._id || '',
            name: shelf.name || 'Unnamed Shelf',
            description: shelf.description || '',
            type: ['product', 'service', 'investment'].includes(shelf.type)
              ? shelf.type as Shelf['type']
              : 'product',
            openForMembers: shelf.openForMembers !== false,
            members,
            ...(productDetails ? { productDetails } : {}),
            ...(serviceDetails ? { serviceDetails } : {}),
            ...(investmentDetails ? { investmentDetails } : {}),
            createdAt: shelf.createdAt || new Date().toISOString(),
            updatedAt: shelf.updatedAt || new Date().toISOString(),
            ...(shelf.__v !== undefined ? { __v: shelf.__v } : {})
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

  // Called when CreateShelfForm successfully creates a new shelf
  const handleShelfCreated = (newShelf: Shelf) => {
    setShelves(prev => [...prev, newShelf]);
    setShowCreateForm(false);
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
        <TopNavModified 
          menuItems={["Add Shelf", "My Shelves"]} 
          onMenuItemClick={() => {}} 
        />
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
      <TopNavModified 
        menuItems={["Add Shelf", "My Shelves"]} 
        onMenuItemClick={() => {}} 
      />
  
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
              onSuccess={handleShelfCreated}
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
          {filteredShelves.map((shelf) => (
            <ShelfCard 
              key={shelf._id}
              shelf={shelf}
              onViewDetails={() => setSelectedShelf(shelf)}
            />
          ))}
        </div>
      </div>
  
      {/* Shelf Details Modal *
      {selectedShelf && (
        <ShelfDetailsModal
          shelf={selectedShelf}
          onClose={() => setSelectedShelf(null)}
          onJoinRequest={() => {
            console.log('Join request for:', selectedShelf.name);
          }}
        />
      )}
    </div>
  );
}

*/}