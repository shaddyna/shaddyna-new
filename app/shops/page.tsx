/*"use client"
import TopNavModified from '@/components/TopNavModified';
import { FC, useState } from 'react';

// Dummy data generators
const categories = ['Fashion', 'Electronics', 'Food', 'Home Goods', 'Art'];
const shops = [...Array(9)].map((_, i) => ({
  id: i,
  name: `Shop ${i + 1}`,
  category: categories[i % 5],
  rating: (4 + Math.random()).toFixed(1),
  products: Math.floor(Math.random() * 100),
  description: `Specializing in ${categories[i % 5]} products and services`,
  owner: `Owner ${i + 1}`,
  social: ['twitter', 'instagram'],
  isFeatured: i < 2,
}));

const ShopsPage: FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFollowing, setIsFollowing] = useState<{[key: number]: boolean}>({});

  return (
    <div className="min-h-screen bg-white">
       <TopNavModified menuItems={["Create Shop"]} />
      {/* Search & Filter Section *
      <section className="bg-gray-50 bg-opacity-60 py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input 
              type="text" 
              placeholder="Search shops..." 
              className="flex-1 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#bf2c7e]"
            />
            <div className="flex gap-2">
              <button className="bg-[#bf2c7e] text-white px-4 py-2 rounded-lg">Filter</button>
              <button 
                onClick={() => setViewMode(prev => prev === 'grid' ? 'list' : 'grid')}
                className="bg-[#0f1c47] text-white px-4 py-2 rounded-lg"
              >
                {viewMode === 'grid' ? 'List View' : 'Grid View'}
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {categories.map(category => (
              <button 
                key={category}
                className="px-4 py-2 bg-white border border-[#0f1c47] rounded-full hover:bg-[#bf2c7e] hover:text-white transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

         {/* CTA Section *
         <section className="py-16 px-4 bg-[#0f1c47]">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">Ready to Start Selling?</h2>
          <p className="text-gray-200 mb-8">Join our community of successful vendors</p>
          <button className="bg-[#bf2c7e] text-white px-8 py-4 rounded-lg text-lg hover:bg-opacity-90">
            Create Your Shop Now
          </button>
        </div>
      </section>

      {/* Featured Shops *
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-[#0f1c47]">Featured Shops</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shops.filter(s => s.isFeatured).map(shop => (
              <div key={shop.id} className="bg-white p-6 rounded-xl shadow-lg border-2 border-[#bf2c7e]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-[#0f1c47] font-bold">{shop.name[0]}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0f1c47]">{shop.name}</h3>
                    <p className="text-gray-600">{shop.category}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{shop.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[#bf2c7e]">★ {shop.rating}</span>
                    <span className="ml-4 text-gray-600">{shop.products} products</span>
                  </div>
                  <button className="bg-[#0f1c47] text-white px-4 py-2 rounded-lg">
                    Visit Shop
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shops Grid *
      <section className="py-12 px-4 bg-gray-50 bg-opacity-60">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-[#0f1c47]">All Shops</h2>
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1'} gap-6`}>
            {shops.map(shop => (
              <div key={shop.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#0f1c47]">{shop.name}</h3>
                    <p className="text-gray-600">{shop.category}</p>
                  </div>
                  <span className="text-[#bf2c7e] bg-[#bf2c7e]/10 px-2 py-1 rounded">Sponsored</span>
                </div>
                
                <p className="text-gray-600 mb-4">{shop.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[#bf2c7e]">★ {shop.rating}</span>
                    <span className="ml-4 text-gray-600">{shop.products} products</span>
                  </div>
                  <button 
                    onClick={() => setIsFollowing(prev => ({...prev, [shop.id]: !prev[shop.id]}))}
                    className={`px-4 py-2 rounded-lg ${
                      isFollowing[shop.id] 
                        ? 'bg-[#0f1c47] text-white' 
                        : 'bg-[#bf2c7e] text-white'
                    }`}
                  >
                    {isFollowing[shop.id] ? 'Following' : 'Follow'}
                  </button>
                </div>

                <div className="border-t pt-4">
                  <p className="text-gray-600 mb-2">Owner: {shop.owner}</p>
                  <div className="flex gap-2">
                    {shop.social.map(platform => (
                      <button key={platform} className="text-[#0f1c47] hover:text-[#bf2c7e]">
                        {platform === 'twitter' ? '𝕏' : '📸'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

             {/* Create Post FAB *
      <button className="hidden sm:fixed sm:bottom-20 sm:right-8 sm:bg-[#bf2c7e] sm:text-white sm:p-4 sm:rounded-full sm:shadow-lg sm:hover:scale-105 sm:transition-transform lg:flex sm:items-center sm:gap-2">
        <span className="hidden sm:inline">Create shop</span>
      </button>

    </div>
  );
};

export default ShopsPage;*/
"use client";
import TopNavModified from '@/components/TopNavModified';
import { FC, useState } from 'react';
import { FiFilter, FiGrid, FiList } from 'react-icons/fi'; // Nove icons for filter and view modes
import { useRouter } from 'next/navigation'


// Dummy data generators
const categories = ['Fashion', 'Electronics', 'Food', 'Home Goods', 'Art'];
const shops = [...Array(9)].map((_, i) => ({
  id: i,
  name: `Shop ${i + 1}`,
  category: categories[i % 5],
  rating: (4 + Math.random()).toFixed(1),
  products: Math.floor(Math.random() * 100),
  description: `Specializing in ${categories[i % 5]} products and services`,
  owner: `Owner ${i + 1}`,
  social: ['twitter', 'instagram'],
  isFeatured: i < 2,
  image: `https://picsum.photos/300/200?random=${i}`, // Placeholder image URL
  location: 'Nairobi, Kenya', // Added location
  contact: '+254 700 000 000', // Added contact
  openingHours: '9:00 AM - 6:00 PM', // Added opening hours
}));


const ShopsPage: FC = () => {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFollowing, setIsFollowing] = useState<{ [key: number]: boolean }>({});
  const [activeFilter, setActiveFilter] = useState<string>('all'); // Added activeFilter state
  const handleShopClick = (shopId: number) => {
    router.push(`/shops/${shopId}`);
  };
  

  return (
    <div className="min-h-screen bg-white">
      <TopNavModified menuItems={["Create Shop"]} />

      {/* Search & Filter Section */}
      <section className="bg-white py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search shops..."
              className="flex-1 p-3 rounded-xl border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
            />
            <div className="flex gap-2">
              <button className="bg-[#bf2c7e] text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-[#a02468] transition-colors">
                <FiFilter className="text-lg" />
                Filter
              </button>
              <button
                onClick={() => setViewMode(prev => (prev === 'grid' ? 'list' : 'grid'))}
                className="bg-[#0f1c47] text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-[#0f1c47]/80 transition-colors"
              >
                {viewMode === 'grid' ? <FiList className="text-lg" /> : <FiGrid className="text-lg" />}
                {viewMode === 'grid' ? 'List View' : 'Grid View'}
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === category
                    ? 'bg-[#bf2c7e] text-white'
                    : 'bg-[#0f1c47]/10 text-[#0f1c47] hover:bg-[#bf2c7e]/10 hover:text-[#bf2c7e]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#0f1c47]">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">Ready to Start Selling?</h2>
          <p className="text-gray-200 mb-8">Join our community of successful vendors</p>
          <button className="bg-[#bf2c7e] text-white px-8 py-4 rounded-xl text-lg hover:bg-[#a02468] transition-colors">
            Create Your Shop Now
          </button>
        </div>
      </section>

      {/* Featured Shops */}
      <section className="py-4 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-[#0f1c47]">Featured Shops</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shops.filter((s) => s.isFeatured).map((shop) => (
              <div
                key={shop.id}
                className="bg-white p-6 rounded-2xl shadow-lg border-2 border-[#bf2c7e]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#bf2c7e]/10 flex items-center justify-center">
                    <span className="text-[#bf2c7e] font-bold text-xl">{shop.name[0]}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0f1c47]">{shop.name}</h3>
                    <p className="text-gray-600">{shop.category}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{shop.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[#bf2c7e]">★ {shop.rating}</span>
                    <span className="ml-4 text-gray-600">{shop.products} products</span>
                  </div>
                  <button className="bg-[#0f1c47] text-white px-4 py-2 rounded-xl hover:bg-[#0f1c47]/80 transition-colors">
                    Visit Shop
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Shops */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-[#0f1c47]">All Shops</h2>
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1'} gap-6`}>
            {shops
              .filter((shop) => activeFilter === 'all' || shop.category === activeFilter)
              .map((shop) => (
                <div
                  key={shop.id}
                  className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-[#0f1c47]/10 cursor-pointer"
                  onClick={() => handleShopClick(shop.id)} // Navigate to shop details on click
                >
                  {/* Shop Image */}
                  <div className="w-full h-48 rounded-xl overflow-hidden mb-4">
                    <img
                      src={shop.image}
                      alt={shop.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Shop Details */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#0f1c47]">{shop.name}</h3>
                      <p className="text-gray-600">{shop.category}</p>
                    </div>
                    <span className="text-[#bf2c7e] bg-[#bf2c7e]/10 px-2 py-1 rounded-full text-sm">
                      Sponsored
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{shop.description}</p>

                  {/* Additional Shop Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-[#0f1c47]">
                      <span>📍 {shop.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#0f1c47]">
                      <span>📞 {shop.contact}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#0f1c47]">
                      <span>🕒 {shop.openingHours}</span>
                    </div>
                  </div>

                  {/* Rating and Follow Button */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[#bf2c7e]">★ {shop.rating}</span>
                      <span className="ml-4 text-gray-600">{shop.products} products</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent navigation when clicking the button
                        setIsFollowing((prev) => ({ ...prev, [shop.id]: !prev[shop.id] }));
                      }}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                        isFollowing[shop.id]
                          ? 'bg-[#0f1c47] text-white'
                          : 'bg-[#bf2c7e] text-white hover:bg-[#a02468]'
                      }`}
                    >
                      {isFollowing[shop.id] ? 'Following' : 'Follow'}
                    </button>
                  </div>

                  {/* Social Media Links */}
                  <div className="border-t border-[#0f1c47]/10 pt-4">
                    <p className="text-gray-600 mb-2">Owner: {shop.owner}</p>
                    <div className="flex gap-2">
                      {shop.social.map((platform) => (
                        <button
                          key={platform}
                          className="text-[#0f1c47] hover:text-[#bf2c7e] transition-colors"
                        >
                          {platform === 'twitter' ? '𝕏' : '📸'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default ShopsPage;