"use client";
import { useParams } from 'next/navigation';

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
  

const ShopDetailsPage = () => {
  const { shopId } = useParams(); // Get shopId from URL
  const shop = shops.find((s) => s.id === Number(shopId)); // Find the shop by ID

  if (!shop) {
    return <div>Shop not found</div>;
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-[#0f1c47] mb-6">{shop.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shop Image */}
          <div className="w-full h-96 rounded-xl overflow-hidden">
            <img
              src={shop.image}
              alt={shop.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Shop Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#0f1c47]">About</h2>
              <p className="text-gray-600">{shop.description}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#0f1c47]">Details</h2>
              <div className="space-y-2">
                <p className="text-gray-600">📍 {shop.location}</p>
                <p className="text-gray-600">📞 {shop.contact}</p>
                <p className="text-gray-600">🕒 {shop.openingHours}</p>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <h2 className="text-2xl font-bold text-[#0f1c47]">Connect</h2>
              <div className="flex gap-4">
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
        </div>
      </div>
    </div>
  );
};

export default ShopDetailsPage;