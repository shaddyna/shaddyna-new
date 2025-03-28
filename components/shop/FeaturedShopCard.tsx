import { FC } from 'react';

interface FeaturedShopCardProps {
  shop: {
    _id: string;
    name: string;
    category: string;
    rating?: number;
    products?: number;
    description?: string;
  };
  onClick: (shopId: string) => void;
}

const FeaturedShopCard: FC<FeaturedShopCardProps> = ({ shop, onClick }) => {
  return (
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
          onClick={() => onClick(shop._id)}
          className="bg-[#0f1c47] text-white px-4 py-2 rounded-xl text-sm md:text-base hover:bg-[#0f1c47]/80 transition-colors"
        >
          Visit Shop
        </button>
      </div>
    </div>
  );
};

export default FeaturedShopCard;