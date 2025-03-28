import { FC } from 'react';
import { FiX } from 'react-icons/fi';

interface ShopFiltersProps {
  categories: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const ShopFilters: FC<ShopFiltersProps> = ({ categories, activeFilter, onFilterChange }) => {
  return (
    <div className="relative pb-1 sm:pb-2">
      <div className="flex space-x-2 overflow-x-auto scrollbar-hide py-1">
        <button
          onClick={() => onFilterChange('all')}
          className={`flex-shrink-0 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
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
            onClick={() => onFilterChange(category)}
            className={`flex-shrink-0 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              activeFilter === category
                ? 'bg-gradient-to-r from-[#bf2c7e] to-[#a02468] text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {activeFilter !== 'all' && (
        <div className="mt-2 sm:mt-3 flex items-center">
          <span className="text-xs sm:text-sm text-gray-500 mr-1 sm:mr-2">Active:</span>
          <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-[#bf2c7e]/10 text-[#bf2c7e] rounded-full text-xs sm:text-sm font-medium flex items-center">
            {activeFilter}
            <button 
              onClick={() => onFilterChange('all')}
              className="ml-1 sm:ml-2 text-[#bf2c7e] hover:text-[#a02468]"
            >
              <FiX className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </span>
        </div>
      )}
    </div>
  );
};

export default ShopFilters;