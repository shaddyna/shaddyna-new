import { FC } from 'react';
import { FiStar } from 'react-icons/fi';

interface ShopCardProps {
  shop: {
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
  };
  isFollowing: boolean;
  onFollow: (shopId: string) => void;
  onClick: (shopId: string) => void;
}

const ShopCard: FC<ShopCardProps> = ({ shop, isFollowing, onFollow, onClick }) => {
  return (
    <div
      className="bg-white p-4 sm:p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-[#0f1c47]/10 cursor-pointer"
      onClick={() => onClick(shop._id)}
    >
      <div className="w-full h-40 sm:h-48 rounded-lg overflow-hidden mb-3 sm:mb-4">
        <img
          src={shop.image || `https://picsum.photos/300/200?random=${shop._id}`}
          alt={shop.name}
          className="w-full h-full object-cover"
        />
      </div>

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

      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div>
          <span className="text-[#bf2c7e] font-bold flex items-center gap-1">
            <FiStar className="w-4 h-4" />
            {shop.rating?.toFixed(1) || '4.5'}
          </span>
          <span className="ml-2 text-gray-600 text-xs sm:text-sm">{shop.products || 0} products</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFollow(shop._id);
          }}
          className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
            isFollowing
              ? 'bg-[#0f1c47] text-white'
              : 'bg-[#bf2c7e] text-white hover:bg-[#a02468]'
          }`}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </button>
      </div>

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
  );
};

export default ShopCard;