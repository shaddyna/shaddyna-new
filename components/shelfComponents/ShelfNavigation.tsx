import React from 'react';

interface ShelfNavigationProps {
    activeTab: 'posts' | 'members' | 'about';
    postTypeFilter: 'all' | 'product' | 'service' | 'investment';
    tags: string[];
    onTabChange: (tab: 'posts' | 'members' | 'about') => void;
    onFilterChange: (filter: 'all' | 'product' | 'service' | 'investment') => void;
  }    

export const ShelfNavigation: React.FC<ShelfNavigationProps> = ({ 
  activeTab, 
  postTypeFilter, 
  tags, 
  onTabChange, 
  onFilterChange 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
      <h2 className="text-lg font-semibold text-[#0f1c47] mb-4">Shelf Navigation</h2>
      <nav>
        <ul className="space-y-2">
          {(['posts', 'members', 'about'] as const).map((tab) => (
            <li key={tab}>
              <button
                onClick={() => onTabChange(tab)}
                className={`w-full text-left px-3 py-2 rounded-md ${activeTab === tab ? 'bg-[#0f1c47] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-8">
        <h3 className="font-medium text-[#0f1c47] mb-3">Post Types</h3>
        <div className="space-y-2">
          {(['all', 'product', 'service', 'investment'] as const).map((type) => (
            <button
              key={type}
              onClick={() => onFilterChange(type)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm ${postTypeFilter === type ? 'bg-[#bf2c7e] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              {type === 'all' ? 'All Posts' : `${type.charAt(0).toUpperCase() + type.slice(1)}s`}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-medium text-[#0f1c47] mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};