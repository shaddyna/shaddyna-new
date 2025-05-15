
/*interface SkillsFilterProps {
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
          <span className="text-sm text-gray-600">Ksh {filter.priceRange[0]}</span>
          <span className="text-sm text-gray-600">Ksh {filter.priceRange[1]}</span>
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
};*/

"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

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
  isMobile?: boolean;
}

export const SkillsFilter: React.FC<SkillsFilterProps> = ({ 
  categories, 
  priceTypes,
  filter,
  setFilter,
  isMobile = false
}) => {
  const [openSection, setOpenSection] = useState<string | null>(isMobile ? null : 'category');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className={`bg-white ${isMobile ? '' : 'p-6 rounded-xl shadow-sm sticky top-4'}`}>
      {!isMobile && <h2 className="text-lg font-semibold text-[#0f1c47] mb-6">Filters</h2>}

      {/* Search - Only show in mobile filter */}
      {isMobile && (
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search skills..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
              value={filter.searchQuery}
              onChange={(e) => setFilter({...filter, searchQuery: e.target.value})}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-medium text-[#0f1c47]">Categories</h3>
          {openSection === 'category' ? (
            <FiChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <FiChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>
        
        {openSection === 'category' && (
          <div className="mt-3 space-y-2">
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
        )}
      </div>

      {/* Price Type */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('priceType')}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-medium text-[#0f1c47]">Price Type</h3>
          {openSection === 'priceType' ? (
            <FiChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <FiChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>
        
        {openSection === 'priceType' && (
          <div className="mt-3 space-y-2">
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
        )}
      </div>

      {/* Price Range */}
      <div>
        <button
          onClick={() => toggleSection('priceRange')}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-medium text-[#0f1c47]">Price Range</h3>
          {openSection === 'priceRange' ? (
            <FiChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <FiChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>
        
        {openSection === 'priceRange' && (
          <div className="mt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Ksh {filter.priceRange[0]}</span>
              <span className="text-sm text-gray-600">Ksh {filter.priceRange[1]}</span>
            </div>
            <div className="px-2">
              <input
                type="range"
                min="0"
                max="1000"
                value={filter.priceRange[1]}
                onChange={(e) => setFilter({...filter, priceRange: [filter.priceRange[0], parseInt(e.target.value)]})}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#bf2c7e]"
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setFilter({...filter, priceRange: [0, 100]})}
                className="text-xs px-3 py-1 border border-gray-200 rounded-full hover:bg-gray-100"
              >
                Under Ksh 100
              </button>
              <button
                onClick={() => setFilter({...filter, priceRange: [0, 500]})}
                className="text-xs px-3 py-1 border border-gray-200 rounded-full hover:bg-gray-100"
              >
                Under Ksh 500
              </button>
              <button
                onClick={() => setFilter({...filter, priceRange: [0, 1000]})}
                className="text-xs px-3 py-1 border border-gray-200 rounded-full hover:bg-gray-100"
              >
                All Prices
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Reset Button for Mobile */}
      {isMobile && (
        <button
          onClick={() => {
            setFilter({
              ...filter,
              category: "",
              priceType: "",
              priceRange: [0, 1000],
              searchQuery: ""
            });
          }}
          className="w-full mt-6 py-2.5 bg-[#0f1c47] text-white rounded-lg hover:bg-[#1a2b6b]"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
};