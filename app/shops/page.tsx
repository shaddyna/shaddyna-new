"use client";
import TopNavModified from '@/components/TopNavModified';
import { FC, useState, useEffect } from 'react';
import { FiFilter, FiGrid, FiList, FiPlusCircle, FiSearch, FiStar, FiUsers, FiX } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Categories remain the same
const categories = ['Fashion', 'Electronics', 'Food', 'Home Goods', 'Art'];

interface Shop {
  _id: string;
  name: string;
  category: string;
  rating?: number;
  products?: number;
  description?: string;
  owner?: string;
  social?: string[];
  isFeatured?: boolean;
  image?: string;
  location?: string;
  contact?: string;
  openingHours?: string;
}

const ShopsPage: FC = () => {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFollowing, setIsFollowing] = useState<{ [key: string]: boolean }>({});
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shopProductsCount, setShopProductsCount] = useState<{ [key: string]: number }>({});

  const fetchShops = async () => {
    try {
      const response = await axios.get("https://shaddyna-backend.onrender.com/api/shops/shops");
      localStorage.setItem("shops", JSON.stringify(response.data.shops));
      setShops(response.data.shops);
    } catch (err) {
      setError("Failed to fetch shops.");
      console.error('Error fetching shops:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchShopDetailsData = async (shopId: string) => {
    try {
      // You can implement this if you need additional shop details
      // const response = await axios.get(`/api/shops/${shopId}/details`);
      // return response.data;
    } catch (err) {
      console.error(`Error fetching details for shop ${shopId}:`, err);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  useEffect(() => {
    if (shops.length > 0) {
      shops.forEach((shop) => {
        if (!shopProductsCount[shop._id]) {
          fetchShopDetailsData(shop._id);
        }
      });
    }
  }, [shops]);

  const handleShopClick = (shopId: string) => {
    router.push(`/shops/${shopId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <TopNavModified menuItems={["Create Shop"]} />
        <div className="container mx-auto py-8 px-4 text-center">
          <p>Loading shops...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <TopNavModified menuItems={["Create Shop"]} />
        <div className="container mx-auto py-8 px-4 text-center text-red-500">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Rest of your component remains the same with minor adjustments for _id
  return (
    <div className="min-h-screen bg-white">
      <TopNavModified menuItems={["Create Shop"]} />

      {/* Enhanced Search & Filter Section */}
<section className="bg-white py-6 sm:py-8 px-4 sm:px-6 border-b border-gray-100">
  <div className="max-w-7xl mx-auto">
    {/* Main Search and Controls */}
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* Search Input - Modern with floating label effect */}
      <div className="relative flex-1 group">
        <input
          type="text"
          placeholder=" "
          className="w-full p-4 pl-12 pr-4 rounded-xl border-2 border-gray-200 focus:border-[#bf2c7e] focus:ring-0 transition-all peer bg-gray-50 h-14"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-[#bf2c7e] transition-colors">
          <FiSearch className="w-5 h-5" />
        </div>
        <label className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-500 peer-focus:text-[#bf2c7e] peer-focus:scale-90 peer-focus:-translate-y-7 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 origin-left transition-all duration-200 pointer-events-none bg-white px-1 ml-1 peer-focus:bg-white peer-focus:px-2">
          Search shops...
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#bf2c7e] to-[#a02468] text-white font-medium hover:shadow-lg hover:shadow-[#bf2c7e]/20 transition-all">
          <FiFilter className="w-5 h-5" />
          <span className="hidden sm:inline">Filters</span>
        </button>
        <button
          onClick={() => setViewMode(prev => (prev === 'grid' ? 'list' : 'grid'))}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0f1c47] text-white font-medium hover:bg-[#0f1c47]/90 transition-all"
        >
          {viewMode === 'grid' ? (
            <>
              <FiList className="w-5 h-5" />
              <span className="hidden sm:inline">List View</span>
            </>
          ) : (
            <>
              <FiGrid className="w-5 h-5" />
              <span className="hidden sm:inline">Grid View</span>
            </>
          )}
        </button>
      </div>
    </div>

    {/* Category Filters - Modern horizontal scroll for mobile */}
    <div className="relative">
      <div className="flex space-x-2 pb-2 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setActiveFilter('all')}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeFilter === 'all'
              ? 'bg-gradient-to-r from-[#bf2c7e] to-[#a02468] text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Shops
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === category
                ? 'bg-gradient-to-r from-[#bf2c7e] to-[#a02468] text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>

    {/* Active Filters Indicator (optional) */}
    {activeFilter !== 'all' && (
      <div className="mt-4 flex items-center">
        <span className="text-sm text-gray-500 mr-2">Active filter:</span>
        <span className="px-3 py-1 bg-[#bf2c7e]/10 text-[#bf2c7e] rounded-full text-sm font-medium flex items-center">
          {activeFilter}
          <button 
            onClick={() => setActiveFilter('all')}
            className="ml-2 text-[#bf2c7e] hover:text-[#a02468]"
          >
            <FiX className="w-4 h-4" />
          </button>
        </span>
      </div>
    )}
  </div>
</section>
      {/* Search & Filter Section *
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

          {/* Category Filters *
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#bf2c7e] text-white'
                  : 'bg-[#0f1c47]/10 text-[#0f1c47] hover:bg-[#bf2c7e]/10 hover:text-[#bf2c7e]'
              }`}
            >
              All
            </button>
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
      </section>*/}

 {/* Premium CTA Section */}
<section className="relative py-20 px-4 sm:py-28 overflow-hidden">
  {/* Background Gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#0f1c47] to-[#2a3a6e] z-0"></div>
  
  {/* Decorative Elements */}
  <div className="absolute top-0 left-0 w-full h-full opacity-10 z-0">
    <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#bf2c7e] mix-blend-overlay"></div>
    <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-[#bf2c7e] mix-blend-overlay"></div>
    <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-white mix-blend-overlay"></div>
  </div>

  <div className="max-w-6xl mx-auto relative z-10">
    <div className="text-center">
      {/* Animated Heading */}
      <h2 className="text-3xl sm:text-5xl font-bold mb-6 text-white animate-fade-in-up">
        Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8a9f] to-[#bf2c7e]">Start Selling?</span>
      </h2>
      
      {/* Subheading with subtle animation */}
      <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto animate-fade-in-up delay-100">
        Join our thriving community of successful vendors and grow your business with us
      </p>
      
      {/* Enhanced CTA Button */}
      <div className="animate-fade-in-up delay-200">
        <button className="relative group bg-gradient-to-r from-[#bf2c7e] to-[#a02468] text-white px-10 py-5 rounded-xl text-lg font-medium hover:shadow-xl hover:shadow-[#bf2c7e]/30 transition-all duration-300 overflow-hidden">
          <span className="relative z-10 flex items-center justify-center gap-2">
            <FiPlusCircle className="w-6 h-6" />
            Create Your Shop Now
          </span>
          
          {/* Button Hover Effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-[#a02468] to-[#bf2c7e] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          
          {/* Button Shine Effect */}
          <span className="absolute top-0 left-0 w-10 h-full bg-white/30 -skew-x-12 -translate-x-16 group-hover:translate-x-[400%] transition-transform duration-700"></span>
        </button>
      </div>
      
      {/* Trust Indicators */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-300 animate-fade-in-up delay-300">
        <div className="flex items-center gap-2">
          <FiUsers className="w-5 h-5" />
          <span>10,000+ Happy Vendors</span>
        </div>
        <div className="hidden sm:block w-px h-6 bg-gray-500"></div>
        <div className="flex items-center gap-2">
          <FiStar className="w-5 h-5" />
          <span>4.9/5 Average Rating</span>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Featured Shops */}
      <section className="py-4 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-[#0f1c47]">Featured Shops</h2>
          <div className="flex gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {shops.filter((s) => s.isFeatured).map((shop) => (
              <div
                key={shop._id}
                className="bg-white p-6 rounded-2xl shadow-lg border-2 border-[#bf2c7e] min-w-[250px] md:min-w-[300px]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#bf2c7e]/10 flex items-center justify-center">
                    <span className="text-[#bf2c7e] font-bold text-lg md:text-xl">{shop.name[0]}</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-[#0f1c47]">{shop.name}</h3>
                    <p className="text-gray-600 text-sm md:text-base">{shop.category}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-2 md:line-clamp-3">
                  {shop.description || `Specializing in ${shop.category} products`}
                </p>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[#bf2c7e]">★ {shop.rating?.toFixed(1) || '4.5'}</span>
                    <span className="ml-4 text-gray-600">{shop.products || 0} products</span>
                  </div>
                  <button 
                    onClick={() => handleShopClick(shop._id)}
                    className="bg-[#0f1c47] text-white px-4 py-2 rounded-xl text-sm md:text-base hover:bg-[#0f1c47]/80 transition-colors"
                  >
                    Visit Shop
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Shops */}
      <section className="py-8 px-3 sm:py-10 sm:px-6 md:py-12 md:px-10 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-[#0f1c47]">All Shops</h2>
          
          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6`}>
            {shops
              .filter((shop) => activeFilter === 'all' || shop.category === activeFilter)
              .map((shop) => (
                <div
                  key={shop._id}
                  className="bg-white p-4 sm:p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-[#0f1c47]/10 cursor-pointer"
                  onClick={() => handleShopClick(shop._id)}
                >
                  {/* Shop Image */}
                  <div className="w-full h-40 sm:h-48 rounded-lg overflow-hidden mb-3 sm:mb-4">
                    <img
                      src={shop.image || `https://picsum.photos/300/200?random=${shop._id}`}
                      alt={shop.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Shop Details */}
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#0f1c47] truncate">{shop.name}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm">{shop.category}</p>
                    </div>
                    {shop.isFeatured && (
                      <span className="text-[#bf2c7e] bg-[#bf2c7e]/10 px-2 py-1 rounded-full text-xs sm:text-sm">
                        Sponsored
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 truncate">
                    {shop.description || `Specializing in ${shop.category} products`}
                  </p>

                  {/* Additional Shop Info */}
                  <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4 text-sm sm:text-base">
                    <div className="flex items-center gap-2 text-[#0f1c47]">
                      <span>📍 {shop.location || 'Nairobi, Kenya'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#0f1c47]">
                      <span>📞 {shop.contact || '+254 700 000 000'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#0f1c47]">
                      <span>🕒 {shop.openingHours || '9:00 AM - 6:00 PM'}</span>
                    </div>
                  </div>

                  {/* Rating and Follow Button */}
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div>
                      <span className="text-[#bf2c7e] font-bold">★ {shop.rating?.toFixed(1) || '4.5'}</span>
                      <span className="ml-2 text-gray-600 text-xs sm:text-sm">{shop.products || 0} products</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFollowing((prev) => ({ ...prev, [shop._id]: !prev[shop._id] }));
                      }}
                      className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                        isFollowing[shop._id]
                          ? 'bg-[#0f1c47] text-white'
                          : 'bg-[#bf2c7e] text-white hover:bg-[#a02468]'
                      }`}
                    >
                      {isFollowing[shop._id] ? 'Following' : 'Follow'}
                    </button>
                  </div>

                  {/* Social Media Links */}
                  <div className="border-t border-[#0f1c47]/10 pt-3 sm:pt-4">
                    <p className="text-gray-600 text-xs sm:text-sm mb-2">Owner: {shop.owner || 'Shop Owner'}</p>
                    <div className="flex gap-2">
                      {(shop.social || ['twitter', 'instagram']).map((platform) => (
                        <button
                          key={platform}
                          className="text-[#0f1c47] hover:text-[#bf2c7e] transition-colors text-sm sm:text-base"
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

{/*"use client";
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

      {/* Search & Filter Section *
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

          {/* Category Filters *
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

      {/* CTA Section *
      <section className="py-16 px-4 bg-[#0f1c47]">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">Ready to Start Selling?</h2>
          <p className="text-gray-200 mb-8">Join our community of successful vendors</p>
          <button className="bg-[#bf2c7e] text-white px-8 py-4 rounded-xl text-lg hover:bg-[#a02468] transition-colors">
            Create Your Shop Now
          </button>
        </div>
      </section>

{/* Featured Shops *
<section className="py-4 px-4">
  <div className="container mx-auto">
    <h2 className="text-3xl font-bold mb-8 text-[#0f1c47]">Featured Shops</h2>
    <div className="flex gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
      {shops.filter((s) => s.isFeatured).map((shop) => (
        <div
          key={shop.id}
          className="bg-white p-6 rounded-2xl shadow-lg border-2 border-[#bf2c7e] min-w-[250px] md:min-w-[300px]"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#bf2c7e]/10 flex items-center justify-center">
              <span className="text-[#bf2c7e] font-bold text-lg md:text-xl">{shop.name[0]}</span>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-[#0f1c47]">{shop.name}</h3>
              <p className="text-gray-600 text-sm md:text-base">{shop.category}</p>
            </div>
          </div>
          
          {/* Responsive Description *
          <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-2 md:line-clamp-3">
            {shop.description}
          </p>

          <div className="flex justify-between items-center">
            <div>
              <span className="text-[#bf2c7e]">★ {shop.rating}</span>
              <span className="ml-4 text-gray-600">{shop.products} products</span>
            </div>
            <button className="bg-[#0f1c47] text-white px-4 py-2 rounded-xl text-sm md:text-base hover:bg-[#0f1c47]/80 transition-colors">
              Visit Shop
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>



      {/* All Shops *
<section className="py-8 px-3 sm:py-10 sm:px-6 md:py-12 md:px-10 bg-white">
  <div className="container mx-auto">
    <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-[#0f1c47]">All Shops</h2>
    
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6`}>
      {shops
        .filter((shop) => activeFilter === 'all' || shop.category === activeFilter)
        .map((shop) => (
          <div
            key={shop.id}
            className="bg-white p-4 sm:p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-[#0f1c47]/10 cursor-pointer"
            onClick={() => handleShopClick(shop.id)}
          >
            {/* Shop Image *
            <div className="w-full h-40 sm:h-48 rounded-lg overflow-hidden mb-3 sm:mb-4">
              <img
                src={shop.image}
                alt={shop.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Shop Details *
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0f1c47] truncate">{shop.name}</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{shop.category}</p>
              </div>
              <span className="text-[#bf2c7e] bg-[#bf2c7e]/10 px-2 py-1 rounded-full text-xs sm:text-sm">
                Sponsored
              </span>
            </div>

            <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 truncate">{shop.description}</p>

            {/* Additional Shop Info *
            <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4 text-sm sm:text-base">
              <div className="flex items-center gap-2 text-[#0f1c47]">
                <span>📍 {shop.location}</span>
              </div>
              <div className="flex items-center gap-2 text-[#0f1c47]">
                <span>📞 {shop.contact}</span>
              </div>
              <div className="flex items-center gap-2 text-[#0f1c47]">
                <span>🕒 {shop.openingHours}</span>
              </div>
            </div>

            {/* Rating and Follow Button *
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div>
                <span className="text-[#bf2c7e] font-bold">★ {shop.rating}</span>
                <span className="ml-2 text-gray-600 text-xs sm:text-sm">{shop.products} products</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFollowing((prev) => ({ ...prev, [shop.id]: !prev[shop.id] }));
                }}
                className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                  isFollowing[shop.id]
                    ? 'bg-[#0f1c47] text-white'
                    : 'bg-[#bf2c7e] text-white hover:bg-[#a02468]'
                }`}
              >
                {isFollowing[shop.id] ? 'Following' : 'Follow'}
              </button>
            </div>

            {/* Social Media Links *
            <div className="border-t border-[#0f1c47]/10 pt-3 sm:pt-4">
              <p className="text-gray-600 text-xs sm:text-sm mb-2">Owner: {shop.owner}</p>
              <div className="flex gap-2">
                {shop.social.map((platform) => (
                  <button
                    key={platform}
                    className="text-[#0f1c47] hover:text-[#bf2c7e] transition-colors text-sm sm:text-base"
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

export default ShopsPage;*/}










