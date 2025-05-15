/*import Link from 'next/link';

interface Shop {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  location: string;
  isFeatured: boolean;
  images: string[];
}

export default function FeaturedShops() {
  // Dummy data for featured shops
  const featuredShops: Shop[] = [
    {
      id: '1',
      name: 'Urban Threads',
      description: 'Premium clothing and accessories',
      category: 'Fashion',
      rating: 4.8,
      location: 'Downtown',
      isFeatured: true,
      images: ['/shop1.jpg'],
    },
    {
      id: '2',
      name: 'Tech Haven',
      description: 'Latest gadgets and electronics',
      category: 'Electronics',
      rating: 4.9,
      location: 'Mall District',
      isFeatured: true,
      images: ['/shop2.jpg'],
    },
    {
      id: '3',
      name: 'Green Delight',
      description: 'Organic groceries and health foods',
      category: 'Food',
      rating: 4.7,
      location: 'Westside',
      isFeatured: true,
      images: ['/shop3.jpg'],
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-[#0f1c47]">Featured Shops</h2>
          <Link href="/shops" className="text-[#bf2c7e] hover:underline">
            View all shops
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredShops.map((shop) => (
            <div key={shop.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Shop Image</span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-[#0f1c47] mb-2">{shop.name}</h3>
                  <span className="flex items-center bg-[#bf2c7e]/10 px-2 py-1 rounded text-[#bf2c7e] text-sm font-medium">
                    ⭐ {shop.rating}
                  </span>
                </div>
                <p className="text-[#0f1c47]/80 mb-4">{shop.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#0f1c47]/60">{shop.location}</span>
                  <span className="text-sm px-3 py-1 bg-[#0f1c47]/10 text-[#0f1c47] rounded-full">
                    {shop.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}*/

import Link from 'next/link';
import { AdPlacement } from '@/components/home/AdPlacement'; // Import AdPlacement for ads

interface Shop {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  location: string;
  isFeatured: boolean;
  images: string[];
}

export default function FeaturedShops() {
  // Dummy data for featured shops
  const featuredShops: Shop[] = [
    {
      id: '1',
      name: 'Urban Threads',
      description: 'Premium clothing and accessories',
      category: 'Fashion',
      rating: 4.8,
      location: 'Downtown',
      isFeatured: true,
      images: ['/shop1.jpg'],
    },
    {
      id: '2',
      name: 'Tech Haven',
      description: 'Latest gadgets and electronics',
      category: 'Electronics',
      rating: 4.9,
      location: 'Mall District',
      isFeatured: true,
      images: ['/shop2.jpg'],
    },
    {
      id: '3',
      name: 'Green Delight',
      description: 'Organic groceries and health foods',
      category: 'Food',
      rating: 4.7,
      location: 'Westside',
      isFeatured: true,
      images: ['/shop3.jpg'],
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-[#0f1c47]">Featured Shops</h2>
          <Link href="/shops" className="text-[#bf2c7e] hover:underline">
            View all shops
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredShops.map((shop, index) => (
            <div
              key={shop.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Shop Image</span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-[#0f1c47] mb-2">{shop.name}</h3>
                  <span className="flex items-center bg-[#bf2c7e]/10 px-2 py-1 rounded text-[#bf2c7e] text-sm font-medium">
                    ⭐ {shop.rating}
                  </span>
                </div>
                <p className="text-[#0f1c47]/80 mb-4">{shop.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#0f1c47]/60">{shop.location}</span>
                  <span className="text-sm px-3 py-1 bg-[#0f1c47]/10 text-[#0f1c47] rounded-full">
                    {shop.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Horizontal ad at bottom */}
        <div className="mt-10">
          <AdPlacement type="shop" variant="horizontal" />
        </div>
      </div>
    </section>
  );
}