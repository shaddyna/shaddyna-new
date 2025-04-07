"use client";
import { Shelf } from "@/types/types";
import { FiUsers, FiDollarSign, FiClock, FiPlusCircle } from "react-icons/fi";

interface ShelfCardProps {
  shelf: Shelf;
  onViewDetails: () => void;
}

export const ShelfCard = ({ shelf, onViewDetails }: ShelfCardProps) => {
  const createdAt = new Date(shelf.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Helper function to count items based on shelf type
  const getItemCount = () => {
    switch (shelf.type) {
      case 'product':
        return shelf.productDetails?.length || 0;
      case 'service':
        return shelf.serviceDetails?.length || 0;
      case 'investment':
        return shelf.investmentDetails?.length || 0;
      default:
        return 0;
    }
  };

  // Helper function to calculate total investment value
  const getInvestmentValue = () => {
    if (shelf.type === 'investment' && shelf.investmentDetails) {
      return shelf.investmentDetails.reduce((total, investment) => {
        return total + (investment.amount || 0);
      }, 0);
    }
    return 0;
  };

  // Helper function to get first product image if available
  const getShelfImage = () => {
    if (shelf.type === 'product' && shelf.productDetails?.[0]?.images?.[0]) {
      return shelf.productDetails[0].images[0];
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-[#0f1c47]/10 hover:border-[#bf2c7e]/30">
      {/* Shelf Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-lg bg-[#bf2c7e]/10 flex items-center justify-center overflow-hidden">
        {getShelfImage() ? (
          <img 
            src={getShelfImage() || undefined} 
            alt={shelf.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-[#bf2c7e] text-2xl">
            {shelf.name.charAt(0).toUpperCase()}
          </div>
        )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-[#0f1c47]">{shelf.name}</h3>
            <span className={`px-3 py-1 text-xs rounded-full capitalize ${
                shelf.type === 'product' ? 'bg-[#bf2c7e]/10 text-[#bf2c7e]' :
                shelf.type === 'service' ? 'bg-[#0f1c47]/10 text-[#0f1c47]' :
                'bg-green-100 text-green-600'
              }`}
            >
              {shelf.type}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Created: {createdAt}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-4 line-clamp-2">{shelf.description}</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-[#f8f9fa] p-2 rounded-lg text-center">
          <div className="flex items-center justify-center text-[#bf2c7e] mb-1">
            <FiUsers className="mr-1" />
          </div>
          <span className="text-xs font-medium text-[#0f1c47]">
            {shelf.members?.length || 0} {shelf.members?.length === 1 ? 'Member' : 'Members'}
          </span>
        </div>
        
        <div className="bg-[#f8f9fa] p-2 rounded-lg text-center">
          <div className="flex items-center justify-center text-[#0f1c47] mb-1">
            <FiPlusCircle className="mr-1" />
          </div>
          <span className="text-xs font-medium text-[#0f1c47]">
            {getItemCount()} {getItemCount() === 1 ? 'Item' : 'Items'}
          </span>
        </div>
        
        <div className="bg-[#f8f9fa] p-2 rounded-lg text-center">
          <div className="flex items-center justify-center text-green-500 mb-1">
            <FiDollarSign className="mr-1" />
          </div>
          <span className="text-xs font-medium text-[#0f1c47]">
            {shelf.type === 'investment' ? (
              `Ksh ${getInvestmentValue().toLocaleString()}`
            ) : (
              'N/A'
            )}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-[#0f1c47]/10">
        <div className="flex items-center space-x-1">
          <FiClock className="text-gray-400 text-sm" />
          <span className="text-xs text-gray-500">
            Updated {new Date(shelf.updatedAt).toLocaleDateString()}
          </span>
        </div>
        
        <button
          className="text-sm font-medium text-[#bf2c7e] hover:text-[#a02468] transition-colors flex items-center"
          onClick={onViewDetails}
        >
          View Details
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

{/*"use client";
import { Shelf } from "@/types/types";
import { FiUsers, FiDollarSign, FiClock, FiPlusCircle } from "react-icons/fi";

interface ShelfCardProps {
  shelf: Shelf;
  onViewDetails: () => void;
}

export const ShelfCard = ({ shelf, onViewDetails }: ShelfCardProps) => {
  const createdAt = new Date(shelf.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Helper function to count items based on shelf type
  const getItemCount = () => {
    switch (shelf.type) {
      case 'product':
        return shelf.productDetails ? 1 : 0; // Assuming 1 product per product shelf
      case 'service':
        return 1; // Assuming 1 service per service shelf
      case 'investment':
        return 1; // Assuming 1 investment per investment shelf
      default:
        return 0;
    }
  };

  // Helper function to get investment value
  const getInvestmentValue = () => {
    if (shelf.type === 'investment' && shelf.investmentDetails) {
      return shelf.investmentDetails.amount;
    }
    return 0;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-[#0f1c47]/10 hover:border-[#bf2c7e]/30">
      {/* Shelf Header *
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-lg bg-[#bf2c7e]/10 flex items-center justify-center overflow-hidden">
          <div className="text-[#bf2c7e] text-2xl">
            {shelf.name.charAt(0).toUpperCase()}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-[#0f1c47]">{shelf.name}</h3>
            <span className={`px-3 py-1 text-xs rounded-full capitalize ${
                shelf.type === 'product' ? 'bg-[#bf2c7e]/10 text-[#bf2c7e]' :
                shelf.type === 'service' ? 'bg-[#0f1c47]/10 text-[#0f1c47]' :
                'bg-green-100 text-green-600'
              }`}
            >
              {shelf.type}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Created: {createdAt}</p>
        </div>
      </div>

      {/* Description *
      <p className="text-gray-600 mb-4 line-clamp-2">{shelf.description}</p>

      {/* Stats Grid *
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-[#f8f9fa] p-2 rounded-lg text-center">
          <div className="flex items-center justify-center text-[#bf2c7e] mb-1">
            <FiUsers className="mr-1" />
          </div>
          <span className="text-xs font-medium text-[#0f1c47]">
            {shelf.members.length} {shelf.members.length === 1 ? 'Member' : 'Members'}
          </span>
        </div>
        
        <div className="bg-[#f8f9fa] p-2 rounded-lg text-center">
          <div className="flex items-center justify-center text-[#0f1c47] mb-1">
            <FiPlusCircle className="mr-1" />
          </div>
          <span className="text-xs font-medium text-[#0f1c47]">
            {getItemCount()} {getItemCount() === 1 ? 'Item' : 'Items'}
          </span>
        </div>
        
        <div className="bg-[#f8f9fa] p-2 rounded-lg text-center">
          <div className="flex items-center justify-center text-green-500 mb-1">
            <FiDollarSign className="mr-1" />
          </div>
          <span className="text-xs font-medium text-[#0f1c47]">
            Ksh {getInvestmentValue().toLocaleString()}
          </span>
        </div>
      </div>

      {/* Footer *
      <div className="flex items-center justify-between pt-3 border-t border-[#0f1c47]/10">
        <div className="flex items-center space-x-1">
          <FiClock className="text-gray-400 text-sm" />
          <span className="text-xs text-gray-500">
            Updated {new Date(shelf.updatedAt).toLocaleDateString()}
          </span>
        </div>
        
        <button
          className="text-sm font-medium text-[#bf2c7e] hover:text-[#a02468] transition-colors flex items-center"
          onClick={onViewDetails}
        >
          View Details
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};*/}









