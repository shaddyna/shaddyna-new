
interface SkillsFilterProps {
  categories: string[];
  priceTypes: string[];
  filter: {
    category: string;
    priceRange: [number, number];
    priceType: string;
    searchQuery: string;
  };
  setFilter: React.Dispatch<React.SetStateAction<any>>;
}

export const SkillsFilter: React.FC<SkillsFilterProps> = ({ 
  categories, 
  priceTypes,
  filter,
  setFilter 
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm sticky top-4">
      <h2 className="text-lg font-semibold text-[#0f1c47] mb-6">Filters</h2>

      <div className="mb-6">
        <h3 className="font-medium text-[#0f1c47] mb-3">Search</h3>
        <input
          type="text"
          placeholder="Search skills..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
          value={filter.searchQuery}
          onChange={(e) => setFilter({...filter, searchQuery: e.target.value})}
        />
      </div>

      <div className="mb-6">
        <h3 className="font-medium text-[#0f1c47] mb-3">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => setFilter({...filter, category: ''})}
            className={`w-full text-left px-3 py-2 rounded-md text-sm ${
              filter.category === '' ? 'bg-[#0f1c47] text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter({...filter, category})}
              className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                filter.category === category ? 'bg-[#bf2c7e] text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium text-[#0f1c47] mb-3">Price Type</h3>
        <div className="space-y-2">
          <button
            onClick={() => setFilter({...filter, priceType: ''})}
            className={`w-full text-left px-3 py-2 rounded-md text-sm ${
              filter.priceType === '' ? 'bg-[#0f1c47] text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Any Type
          </button>
          {priceTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter({...filter, priceType: type})}
              className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                filter.priceType === type ? 'bg-[#bf2c7e] text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-[#0f1c47] mb-3">Price Range</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">${filter.priceRange[0]}</span>
          <span className="text-sm text-gray-600">${filter.priceRange[1]}</span>
        </div>
        <input
          type="range"
          min="0"
          max="1000"
          value={filter.priceRange[1]}
          onChange={(e) => setFilter({...filter, priceRange: [filter.priceRange[0], parseInt(e.target.value)]})}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};