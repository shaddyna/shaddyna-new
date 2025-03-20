'use client';

import { FC } from 'react';

interface Shop {
  id: number;
  name: string;
  items: string[];
  icon: string;
}

interface FeaturedShopsProps {
  shops: Shop[];
}

const FeaturedShops: FC<FeaturedShopsProps> = ({ shops }) => {
  return (
    <section className="py-12 bg-gray-50 bg-opacity-60">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-[#0f1c47]">Featured Shops</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shops.map((shop) => (
            <div key={shop.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl mb-2">{shop.icon}</div>
              <h3 className="text-xl font-semibold mb-4">{shop.name}</h3>
              <ul className="space-y-2 mb-4">
                {shop.items.map((item) => (
                  <li key={item} className="text-gray-600">• {item}</li>
                ))}
              </ul>
              <button className="text-[#bf2c7e] hover:text-[#a8246d] font-medium">
                View Shop →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedShops;