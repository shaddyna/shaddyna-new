/*"use client";
import { useState, FormEvent } from "react";
import { User } from "@/types/types";
import { UserList } from "./UserList";
import { SelectedUsers } from "./SelectedUsers";

interface CreateShelfFormProps {
  onSubmit: (data: {
    name: string;
    description: string;
    type: 'product' | 'service' | 'investment';
    openForMembers: boolean;
    members: Array<{ userId: string; role: string }>;
  }) => void;
  onCancel: () => void;
  users: User[];
  loading?: boolean;
}

export const CreateShelfForm = ({ onSubmit, onCancel, users, loading = false }: CreateShelfFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'product' | 'service' | 'investment'>('product');
  const [openForMembers, setOpenForMembers] = useState(true);
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
  const [userSearch, setUserSearch] = useState('');

  {/*const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      type,
      openForMembers,
      members: selectedMembers.map(member => ({
        userId: member._id,
        role: 'member'
      }))
    });
  };*

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("https://shaddyna-backend.onrender.com/api/shelf/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          type,
          openForMembers,
          members: selectedMembers.map(member => ({
            userId: member._id,
            role: 'member'
          }))
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create shelf');
      }
  
      const createdShelf = await response.json();
      onSubmit(createdShelf.data); // Pass the created shelf data to parent component
    } catch (error: any) {
      console.error("Shelf creation error:", error);
      alert(error.message || "Failed to create shelf");
    }
  };

  const toggleMemberSelection = (user: User) => {
    setSelectedMembers(prev => {
      const isSelected = prev.some(m => m._id === user._id);
      if (isSelected) {
        return prev.filter(m => m._id !== user._id);
      } else {
        return [...prev, user];
      }
    });
  };

  const filteredUsers = users.filter(user => {
    const firstName = user.firstName || '';
    const email = user.email || '';
    const search = userSearch.toLowerCase();
    
    return firstName.toLowerCase().includes(search) || 
           email.toLowerCase().includes(search);
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#0f1c47] mb-1">
          Shelf Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-[#0f1c47] mb-1">
          Description
        </label>
        <textarea
          id="description"
          className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-[#0f1c47] mb-1">
          Shelf Type
        </label>
        <select
          id="type"
          className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
          value={type}
          onChange={(e) => setType(e.target.value as 'product' | 'service' | 'investment')}
        >
          <option value="product">Product</option>
          <option value="service">Service</option>
          <option value="investment">Investment</option>
        </select>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="openForMembers"
          className="h-4 w-4 text-[#bf2c7e] focus:ring-[#bf2c7e] border-[#0f1c47]/10 rounded"
          checked={openForMembers}
          onChange={(e) => setOpenForMembers(e.target.checked)}
        />
        <label htmlFor="openForMembers" className="ml-2 block text-sm text-[#0f1c47]">
          Accepting new members
        </label>
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-medium text-[#0f1c47]">Add Members</h3>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
          />
          {loading && (
            <div className="absolute right-3 top-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#bf2c7e]"></div>
            </div>
          )}
        </div>

        <SelectedUsers 
          users={selectedMembers} 
          onRemove={toggleMemberSelection} 
        />

        <UserList 
          users={filteredUsers} 
          selectedUsers={selectedMembers} 
          onSelect={toggleMemberSelection}
          loading={loading}
        />
      </div>

      <div className="flex justify-end gap-4 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 rounded-full border border-[#0f1c47] text-[#0f1c47] hover:bg-[#0f1c47]/5 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-full bg-[#bf2c7e] text-white hover:bg-[#a02468] transition-colors"
        >
          Create Shelf
        </button>
      </div>
    </form>
  );
};*/

"use client";
import { useState, FormEvent } from "react";
import { User } from "@/types/types";
import { UserList } from "./UserList";
import { SelectedUsers } from "./SelectedUsers";

interface CreateShelfFormProps {
  onSubmit: (data: {
    name: string;
    description: string;
    type: 'product' | 'service' | 'investment';
    openForMembers: boolean;
    members: Array<{ userId: string; role: string }>;
    productDetails?: {
      price: number;
      stock: number;
      images: string[];
      category: string;
    };
    serviceDetails?: {
      price: number;
      duration: string;
      availability: string[];
    };
    investmentDetails?: {
      amount: number;
      roi: number;
      duration: string;
      riskLevel: 'low' | 'medium' | 'high';
    };
  }) => void;
  onCancel: () => void;
  users: User[];
  loading?: boolean;
}

export const CreateShelfForm = ({ onSubmit, onCancel, users, loading = false }: CreateShelfFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'product' | 'service' | 'investment'>('product');
  const [openForMembers, setOpenForMembers] = useState(true);
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
  const [userSearch, setUserSearch] = useState('');
  
  // Product fields
  const [productPrice, setProductPrice] = useState<number>(0);
  const [productStock, setProductStock] = useState<number>(0);
  const [productImages, setProductImages] = useState<File[]>([]);
  const [productCategory, setProductCategory] = useState<string>('');
  
  // Service fields
  const [servicePrice, setServicePrice] = useState<number>(0);
  const [serviceDuration, setServiceDuration] = useState<string>('');
  const [serviceAvailability, setServiceAvailability] = useState<string[]>([]);
  
  // Investment fields
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);
  const [investmentROI, setInvestmentROI] = useState<number>(0);
  const [investmentDuration, setInvestmentDuration] = useState<string>('');
  const [investmentRiskLevel, setInvestmentRiskLevel] = useState<'low' | 'medium' | 'high'>('medium');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      // Upload images first if product type
      let uploadedImageUrls: string[] = [];
      if (type === 'product' && productImages.length > 0) {
        const formData = new FormData();
        productImages.forEach(image => {
          formData.append('images', image);
        });
        
        const uploadResponse = await fetch("/api/upload", {
          method: 'POST',
          body: formData,
        });
        
        if (!uploadResponse.ok) {
          throw new Error('Failed to upload images');
        }
        
        uploadedImageUrls = await uploadResponse.json();
      }

      const response = await fetch("https://shaddyna-backend.onrender.com/api/shelf/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          type,
          openForMembers,
          members: selectedMembers.map(member => ({
            userId: member._id,
            role: 'member'
          })),
          ...(type === 'product' && {
            productDetails: {
              price: productPrice,
              stock: productStock,
              images: uploadedImageUrls,
              category: productCategory
            }
          }),
          ...(type === 'service' && {
            serviceDetails: {
              price: servicePrice,
              duration: serviceDuration,
              availability: serviceAvailability
            }
          }),
          ...(type === 'investment' && {
            investmentDetails: {
              amount: investmentAmount,
              roi: investmentROI,
              duration: investmentDuration,
              riskLevel: investmentRiskLevel
            }
          })
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create shelf');
      }
  
      const createdShelf = await response.json();
      onSubmit(createdShelf.data);
    } catch (error: any) {
      console.error("Shelf creation error:", error);
      alert(error.message || "Failed to create shelf");
    }
  };

  const toggleMemberSelection = (user: User) => {
    setSelectedMembers(prev => {
      const isSelected = prev.some(m => m._id === user._id);
      if (isSelected) {
        return prev.filter(m => m._id !== user._id);
      } else {
        return [...prev, user];
      }
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      // Limit to 5 images max (optional)
      const selectedFiles = files.slice(0, 5);
      setProductImages(prev => [...prev, ...selectedFiles]);
    }
  };
  
  const removeImage = (index: number) => {
    setProductImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleServiceAvailabilityChange = (day: string) => {
    setServiceAvailability(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const filteredUsers = users.filter(user => {
    const firstName = user.firstName || '';
    const email = user.email || '';
    const search = userSearch.toLowerCase();
    
    return firstName.toLowerCase().includes(search) || 
           email.toLowerCase().includes(search);
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Existing fields (name, description, type, openForMembers) */}
      {/* ... keep all the existing fields as they are ... */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#0f1c47] mb-1">
          Shelf Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-[#0f1c47] mb-1">
          Description
        </label>
        <textarea
          id="description"
          className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-[#0f1c47] mb-1">
          Shelf Type
        </label>
        <select
          id="type"
          className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
          value={type}
          onChange={(e) => setType(e.target.value as 'product' | 'service' | 'investment')}
        >
          <option value="product">Product</option>
          <option value="service">Service</option>
          <option value="investment">Investment</option>
        </select>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="openForMembers"
          className="h-4 w-4 text-[#bf2c7e] focus:ring-[#bf2c7e] border-[#0f1c47]/10 rounded"
          checked={openForMembers}
          onChange={(e) => setOpenForMembers(e.target.checked)}
        />
        <label htmlFor="openForMembers" className="ml-2 block text-sm text-[#0f1c47]">
          Accepting new members
        </label>
      </div>

      {/* Dynamic fields based on shelf type */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-lg font-medium text-[#0f1c47]">Add Type Details</h3>
        
        {type === 'product' && (
  <div className="space-y-4 mt-4">
   <div>
      <label htmlFor="productPrice" className="block text-sm font-medium text-[#0f1c47] mb-1">
        Price (Ksh)
      </label>
      <input
        type="number"
        id="productPrice"
        className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
        value={productPrice}
        onChange={(e) => setProductPrice(Number(e.target.value))}
        min="0"
        step="0.01"
        required
      />
    </div>

    <div>
      <label htmlFor="productStock" className="block text-sm font-medium text-[#0f1c47] mb-1">
        Stock Quantity
      </label>
      <input
        type="number"
        id="productStock"
        className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
        value={productStock}
        onChange={(e) => setProductStock(Number(e.target.value))}
        min="0"
        required
      />
    </div>

    <div>
      <label htmlFor="productCategory" className="block text-sm font-medium text-[#0f1c47] mb-1">
        Category
      </label>
      <input
        type="text"
        id="productCategory"
        className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
        value={productCategory}
        onChange={(e) => setProductCategory(e.target.value)}
        required
      />
    </div>

    <div>
      <label htmlFor="productImages" className="block text-sm font-medium text-[#0f1c47] mb-1">
        Product Images
      </label>
      
      {/* Improved file input with better styling */}
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="productImages"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#0f1c47]/30 rounded-xl cursor-pointer bg-white hover:bg-[#0f1c47]/5 transition-colors"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-[#0f1c47]/50"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-[#0f1c47]/50">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-[#0f1c47]/50">PNG, JPG, JPEG (MAX. 5MB each)</p>
          </div>
          <input
            id="productImages"
            type="file"
            className="hidden"
            onChange={handleImageUpload}
            multiple
            accept="image/*"
          />
        </label>
      </div>

      {/* Image preview section */}
      {productImages.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-[#0f1c47] mb-2">Selected Images:</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {productImages.map((file, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
                  {file.name}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-500">
            {productImages.length} image{productImages.length !== 1 ? 's' : ''} selected
          </p>
        </div>
      )}
    </div>
  </div>
)}

        {type === 'service' && (
          <div className="space-y-4 mt-4">
            <div>
              <label htmlFor="servicePrice" className="block text-sm font-medium text-[#0f1c47] mb-1">
                Price (Ksh)
              </label>
              <input
                type="number"
                id="servicePrice"
                className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
                value={servicePrice}
                onChange={(e) => setServicePrice(Number(e.target.value))}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label htmlFor="serviceDuration" className="block text-sm font-medium text-[#0f1c47] mb-1">
                Duration
              </label>
              <input
                type="text"
                id="serviceDuration"
                className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
                value={serviceDuration}
                onChange={(e) => setServiceDuration(e.target.value)}
                placeholder="e.g., 1 hour, 30 minutes"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0f1c47] mb-2">
                Availability Days
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <div key={day} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`day-${day}`}
                      checked={serviceAvailability.includes(day)}
                      onChange={() => handleServiceAvailabilityChange(day)}
                      className="h-4 w-4 text-[#bf2c7e] focus:ring-[#bf2c7e] border-[#0f1c47]/10 rounded"
                    />
                    <label htmlFor={`day-${day}`} className="ml-2 text-sm text-[#0f1c47]">
                      {day}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {type === 'investment' && (
          <div className="space-y-4 mt-4">
            <div>
              <label htmlFor="investmentAmount" className="block text-sm font-medium text-[#0f1c47] mb-1">
                Amount ($)
              </label>
              <input
                type="number"
                id="investmentAmount"
                className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label htmlFor="investmentROI" className="block text-sm font-medium text-[#0f1c47] mb-1">
                Expected ROI (%)
              </label>
              <input
                type="number"
                id="investmentROI"
                className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
                value={investmentROI}
                onChange={(e) => setInvestmentROI(Number(e.target.value))}
                min="0"
                max="100"
                step="0.1"
                required
              />
            </div>

            <div>
              <label htmlFor="investmentDuration" className="block text-sm font-medium text-[#0f1c47] mb-1">
                Duration
              </label>
              <input
                type="text"
                id="investmentDuration"
                className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
                value={investmentDuration}
                onChange={(e) => setInvestmentDuration(e.target.value)}
                placeholder="e.g., 1 year, 6 months"
                required
              />
            </div>

            <div>
              <label htmlFor="investmentRiskLevel" className="block text-sm font-medium text-[#0f1c47] mb-1">
                Risk Level
              </label>
              <select
                id="investmentRiskLevel"
                className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
                value={investmentRiskLevel}
                onChange={(e) => setInvestmentRiskLevel(e.target.value as 'low' | 'medium' | 'high')}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Members section (keep existing) */}
      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-medium text-[#0f1c47]">Add Members</h3>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
          />
          {loading && (
            <div className="absolute right-3 top-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#bf2c7e]"></div>
            </div>
          )}
        </div>

        <SelectedUsers 
          users={selectedMembers} 
          onRemove={toggleMemberSelection} 
        />

        <UserList 
          users={filteredUsers} 
          selectedUsers={selectedMembers} 
          onSelect={toggleMemberSelection}
          loading={loading}
        />
      </div>

      {/* Form buttons (keep existing) */}
      <div className="flex justify-end gap-4 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 rounded-full border border-[#0f1c47] text-[#0f1c47] hover:bg-[#0f1c47]/5 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-full bg-[#bf2c7e] text-white hover:bg-[#a02468] transition-colors"
        >
          Create Shelf
        </button>
      </div>
    </form>
  );
};














