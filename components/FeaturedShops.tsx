/*'use client';

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

export default FeaturedShops;*/

'use client';

import { FC } from 'react';

interface Shop {
  id: number;
  name: string;
  category: string;
  description: string;
  rating: number;
  products: number;
  isFeatured: boolean;
  icon?: string;
}

interface FeaturedShopsProps {
  shops: Shop[];
}

const FeaturedShops: FC<FeaturedShopsProps> = ({ shops }) => {
  return (
    <section className="py-8 px-4 bg-gray-50 bg-opacity-60">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-[#0f1c47]">
          Featured Shops
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops
            .filter((shop) => shop.isFeatured)
            .map((shop) => (
              <div
                key={shop.id}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-2 border-[#bf2c7e] hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#bf2c7e]/10 flex items-center justify-center">
                    {shop.icon ? (
                      <span className="text-[#bf2c7e] text-lg sm:text-xl">
                        {shop.icon}
                      </span>
                    ) : (
                      <span className="text-[#bf2c7e] font-bold text-lg sm:text-xl">
                        {shop.name[0]}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0f1c47]">
                      {shop.name}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      {shop.category}
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2 sm:line-clamp-3">
                  {shop.description}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-[#bf2c7e] text-xs sm:text-sm">
                      ★ {shop.rating}
                    </span>
                    <span className="text-gray-600 text-xs sm:text-sm">
                      {shop.products} products
                    </span>
                  </div>
                  <button className="bg-[#0f1c47] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm hover:bg-[#0f1c47]/80 transition-colors">
                    Visit Shop
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedShops;