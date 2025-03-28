import { FC, useState } from 'react';
import { FiSearch, FiFilter, FiGrid, FiList } from 'react-icons/fi';

interface ShopSearchProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onSearch: (query: string) => void;
}

const ShopSearch: FC<ShopSearchProps> = ({ viewMode, onViewModeChange, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="flex flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
      <form onSubmit={handleSearch} className="relative flex-1 group min-w-[120px]">
        <input
          type="text"
          placeholder=" "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 pl-10 pr-3 sm:p-4 sm:pl-12 rounded-lg sm:rounded-xl border-2 border-gray-200 focus:border-[#bf2c7e] focus:ring-0 transition-all peer bg-gray-50 h-10 sm:h-14"
        />
        <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-[#bf2c7e] transition-colors">
          <FiSearch className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <label className="absolute left-8 sm:left-12 top-1/2 -translate-y-1/2 text-sm sm:text-base text-gray-500 peer-focus:text-[#bf2c7e] peer-focus:scale-90 peer-focus:-translate-y-7 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 origin-left transition-all duration-200 pointer-events-none bg-white px-1 ml-1 peer-focus:bg-white peer-focus:px-2">
          Search shops...
        </label>
      </form>

      <div className="flex gap-1 sm:gap-2">
        <button className="flex items-center p-2 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#bf2c7e] to-[#a02468] text-white font-medium hover:shadow-lg hover:shadow-[#bf2c7e]/20 transition-all">
          <FiFilter className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="sr-only sm:not-sr-only sm:ml-1 sm:inline">Filters</span>
        </button>
        <button
          onClick={() => onViewModeChange(viewMode === 'grid' ? 'list' : 'grid')}
          className="flex items-center p-2 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl bg-[#0f1c47] text-white font-medium hover:bg-[#0f1c47]/90 transition-all"
        >
          {viewMode === 'grid' ? (
            <FiList className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <FiGrid className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
          <span className="sr-only sm:not-sr-only sm:ml-1">{viewMode === 'grid' ? 'List' : 'Grid'}</span>
        </button>
      </div>
    </div>
  );
};

export default ShopSearch;