"use client";
import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import TopNavModified from '@/components/TopNavModified';
import ShopSearch from '@/components/shop/ShopSearch';
import ShopFilters from '@/components/shop/ShopFilters';
import PremiumCTA from '@/components/shop/PremiumCTA';
import FeaturedShopCard from '@/components/shop/FeaturedShopCard';
import ShopList from '@/components/shop/ShopList';

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

  useEffect(() => {
    fetchShops();
  }, []);

  const handleShopClick = (shopId: string) => {
    router.push(`/shops/${shopId}`);
  };

  const handleFollow = (shopId: string) => {
    setIsFollowing((prev) => ({ ...prev, [shopId]: !prev[shopId] }));
  };

  const handleSearch = (query: string) => {
    // Implement search functionality
    console.log('Searching for:', query);
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

  const filteredShops = shops.filter((shop) => 
    activeFilter === 'all' || shop.category === activeFilter
  );

  const featuredShops = shops.filter((shop) => shop.isFeatured);

  return (
    <div className="min-h-screen bg-white">
      <TopNavModified menuItems={["Create Shop"]} />

      <section className="bg-white py-4 sm:py-6 px-3 sm:px-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <ShopSearch 
            viewMode={viewMode} 
            onViewModeChange={setViewMode} 
            onSearch={handleSearch} 
          />
          <ShopFilters 
            categories={categories} 
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter} 
          />
        </div>
      </section>

      <PremiumCTA />

      {featuredShops.length > 0 && (
        <section className="py-4 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-[#0f1c47]">Featured Shops</h2>
            <div className="flex gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
              {featuredShops.map((shop) => (
                <FeaturedShopCard 
                  key={shop._id} 
                  shop={shop} 
                  onClick={handleShopClick} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-8 px-3 sm:py-10 sm:px-6 md:py-12 md:px-10 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-[#0f1c47]">All Shops</h2>
          <ShopList 
            shops={filteredShops} 
            isFollowing={isFollowing} 
            onFollow={handleFollow} 
            onClick={handleShopClick} 
            viewMode={viewMode} 
          />
        </div>
      </section>
    </div>
  );
};

export default ShopsPage;
