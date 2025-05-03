import { FC } from 'react';
import { ShopCategories } from '@/types/CTAtypes';
const shopCategories: ShopCategories = {
    fashion: {
      label: "Fashion",
      attributes: {
        "Clothing Type": ["Men", "Women", "Kids", "Unisex"],
        "Specialty": ["Casual", "Formal", "Sports", "Traditional"]
      }
    },
    electronics: {
      label: "Electronics",
      attributes: {
        "Product Type": ["Mobile", "Computers", "Home Appliances", "Accessories"],
        "Brand Specialty": ["Single Brand", "Multi Brand"]
      }
    },
    food: {
      label: "Food",
      attributes: {
        "Cuisine": ["Local", "International", "Fusion"],
        "Service Type": ["Dine-in", "Takeaway", "Delivery"]
      }
    },
    homegoods: {
      label: "Home Goods",
      attributes: {
        "Product Range": ["Furniture", "Decor", "Kitchenware", "Bedding"],
        "Style": ["Modern", "Traditional", "Minimalist"]
      }
    },
    art: {
      label: "Art",
      attributes: {
        "Art Type": ["Paintings", "Sculptures", "Photography", "Digital"],
        "Style": ["Contemporary", "Traditional", "Abstract"]
      }
    }
  };


interface ShopBasicsFormProps {
  shopName: string;
  setShopName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  openingHours: string;
  setOpeningHours: (value: string) => void;
  closingHours: string;
  setClosingHours: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (value: string | null) => void;
}

export const ShopBasicsForm: FC<ShopBasicsFormProps> = ({
  shopName, setShopName,
  description, setDescription,
  phoneNumber, setPhoneNumber,
  email, setEmail,
  openingHours, setOpeningHours,
  closingHours, setClosingHours,
  location, setLocation,
  selectedCategory, setSelectedCategory
}) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category || null);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#0f1c47] border-b pb-2">Shop Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Shop Name*</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent text-[#0f1c47]"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent text-[#0f1c47]"
            onChange={handleCategoryChange}
            value={selectedCategory || ""}
            required
          >
            <option value="" className="text-gray-400">Select Category</option>
            {Object.keys(shopCategories).map((key) => (
              <option key={key} value={key} className="text-[#0f1c47]">
                {shopCategories[key as keyof typeof shopCategories].label}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent text-[#0f1c47] min-h-[100px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
          <input
            type="tel"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent text-[#0f1c47]"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent text-[#0f1c47]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Opening Hours</label>
          <input
            type="time"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent text-[#0f1c47]"
            value={openingHours}
            onChange={(e) => setOpeningHours(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Closing Hours</label>
          <input
            type="time"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent text-[#0f1c47]"
            value={closingHours}
            onChange={(e) => setClosingHours(e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent text-[#0f1c47]"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};