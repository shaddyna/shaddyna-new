{/*import { FiEdit } from "react-icons/fi";
import Button from "../ui/Button";

interface Shop {
  logo: string;
  name: string;
  description: string;
  categories: string[];
}

interface ShopSectionProps {
  shop: Shop;
  setIsShopEditModalOpen: (isOpen: boolean) => void;
}

export const ShopSection: React.FC<ShopSectionProps> = ({ shop, setIsShopEditModalOpen }) => (
  <div className="lg:col-span-3 bg-white p-3 rounded-xl shadow-md">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-xl font-semibold text-[#0f1c47]">My Shop</h3>
      <Button onClick={() => setIsShopEditModalOpen(true)}>
         Edit Shop
      </Button>
    </div>
    <div className="flex items-center gap-4">
      <img src={shop.logo} alt="Shop Logo" className="w-16 h-16 rounded-full" />
      <div className="space-y-1">
        <p className="text-lg font-medium">{shop.name}</p>
        <p className="text-sm text-gray-500">{shop.description}</p>
        <div className="flex gap-2 mt-2">
          {shop.categories.map((category: string) => (
            <span key={category} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);*/}

import { FiEdit } from "react-icons/fi";
import Button from "../ui/Button";

interface Shop {
  logo: string;
  name: string;
  description: string;
  categories: string[];
}

interface ShopSectionProps {
  shop: Shop;
  setIsShopEditModalOpen: (isOpen: boolean) => void;
}

export const ShopSection: React.FC<ShopSectionProps> = ({ shop, setIsShopEditModalOpen }) => (
  <div className="lg:col-span-3 bg-gradient-to-br from-white to-[#f8f9fd] p-4 sm:p-6 rounded-2xl shadow-lg border border-[#f0f0f0]">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <h3 className="text-2xl font-bold text-[#0f1c47] drop-shadow-sm">My Shop</h3>
      <Button 
        onClick={() => setIsShopEditModalOpen(true)}
        className="group w-full sm:w-auto"
        //variant="gradient" // Assume you have a gradient variant in your Button component
      >
        <div className="flex items-center gap-2">
          <FiEdit className="text-lg transition-transform group-hover:scale-110" />
          <span>Edit Shop Details</span>
        </div>
      </Button>
    </div>
    
    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
      <div className="relative">
        <img 
          src={shop.logo} 
          alt="Shop Logo"
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-4 border-white shadow-xl
          hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute -bottom-2 -right-2 bg-[#bf2c7e] text-white px-3 py-1 rounded-full 
        text-xs font-medium shadow-sm">
          Verified
        </div>
      </div>

      <div className="flex-1 space-y-3 text-center md:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0f1c47]">{shop.name}</h2>
        <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto md:mx-0">
          {shop.description}
        </p>
        
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {shop.categories.map((category) => (
            <span 
              key={category}
              className="px-3 py-1.5 bg-[#bf2c7e]/10 text-[#bf2c7e] rounded-full text-sm
              font-medium hover:bg-[#bf2c7e]/20 transition-colors cursor-default"
            >
              #{category}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* Stats Row for Larger Screens */}
    <div className="hidden lg:flex justify-between mt-8 pt-6 border-t border-[#00000010]">
      {[
        { label: 'Products', value: '245' },
        { label: 'Reviews', value: '4.9 ★' },
        { label: 'Followers', value: '12.4K' },
      ].map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="text-2xl font-bold text-[#0f1c47]">{stat.value}</p>
          <p className="text-sm text-gray-500">{stat.label}</p>
        </div>
      ))}
    </div>
  </div>
);
