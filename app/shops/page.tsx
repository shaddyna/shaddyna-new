"use client";
import TopNavModified from '@/components/TopNavModified';
import { FC, useState, useEffect } from 'react';
import { FiFilter, FiGrid, FiList } from 'react-icons/fi';
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










