/*"use client";

import { FC, useState } from 'react';
import { FiPlusCircle, FiUsers, FiStar, FiTrash, FiX } from 'react-icons/fi';


type ShopCategory = {
  label: string;
  attributes: Record<string, string[]>;
};

type ShopCategories = {
  fashion: ShopCategory;
  electronics: ShopCategory;
  food: ShopCategory;
  homegoods: ShopCategory;
  art: ShopCategory;
};

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


// Helper type to get the keys of shopCategories
type ShopCategoryKey = keyof typeof shopCategories;


const PremiumCTA: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shopName, setShopName] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [closingHours, setClosingHours] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [socialMedias, setSocialMedias] = useState<{platform: string, url: string}[]>([]);
  const [newSocialMedia, setNewSocialMedia] = useState({platform: "", url: ""});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const attributeKeys = selectedCategory 
  ? Object.keys(shopCategories[selectedCategory as ShopCategoryKey].attributes) 
  : [];

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category || null);
    setSelectedValues({});
  };

  const handleAttributeChange = (key: string, value: string) => {
    setSelectedValues(prev => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).slice(0, 5 - images.length);
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const addSocialMedia = () => {
    if (newSocialMedia.platform && newSocialMedia.url) {
      setSocialMedias([...socialMedias, newSocialMedia]);
      setNewSocialMedia({platform: "", url: ""});
    }
  };

  const removeSocialMedia = (index: number) => {
    setSocialMedias(socialMedias.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Validate form
      if (!shopName || !description || !phoneNumber || !email || !location || !selectedCategory) {
        throw new Error("Please fill all required fields");
      }

      if (images.length === 0) {
        throw new Error("At least one image is required");
      }

      // Create FormData
      const formData = new FormData();
      
      // Append all text fields
      formData.append('name', shopName);
      formData.append('description', description);
      formData.append('phoneNumber', phoneNumber);
      formData.append('openingHours', openingHours);
      formData.append('closingHours', closingHours);
      formData.append('email', email);
      formData.append('location', location);
      formData.append('category', selectedCategory);
      formData.append('attributes', JSON.stringify(selectedValues));
      formData.append('socialMedias', JSON.stringify(socialMedias));
      
      // Append each image file with the same field name 'images'
      images.forEach((image, index) => {
        formData.append('images', image); // Note: same field name for all images
      });

      // Get auth token if needed
      const token = localStorage.getItem('token');

      // Send to API
      const response = await fetch('https://shaddyna-backend.onrender.com/api/shops/create', {
        method: 'POST',
        body: formData,
        headers: token ? {
          'Authorization': `Bearer ${token}`
        } : {}
        // Don't set Content-Type header - FormData will set it automatically
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create shop');
      }

      const result = await response.json();
      console.log('Shop created successfully:', result);

      // Reset form and close modal
      resetForm();
      setIsModalOpen(false);

    } catch (err) {
      console.error('Error creating shop:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
};

// Helper function to reset form
const resetForm = () => {
    setShopName('');
    setDescription('');
    setPhoneNumber('');
    setOpeningHours('');
    setClosingHours('');
    setEmail('');
    setLocation('');
    setSocialMedias([]);
    setSelectedCategory(null);
    setSelectedValues({});
    setImages([]);
};
  return (
    <>
      <section className="relative py-12 sm:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1c47] to-[#2a3a6e] z-0"></div>
        
        <div className="absolute top-0 left-0 w-full h-full opacity-10 z-0">
          <div className="absolute top-8 left-8 w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-[#bf2c7e] mix-blend-overlay"></div>
          <div className="absolute bottom-16 right-8 w-24 h-24 sm:w-40 sm:h-40 rounded-full bg-[#bf2c7e] mix-blend-overlay"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white mix-blend-overlay"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white animate-fade-in-up">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8a9f] to-[#bf2c7e]">Start Selling?</span>
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-10 max-w-2xl mx-auto animate-fade-in-up delay-100">
              Join our thriving community of successful vendors and grow your business with us
            </p>
            
            <div className="animate-fade-in-up delay-200">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="relative group bg-gradient-to-r from-[#bf2c7e] to-[#a02468] text-white px-6 py-4 sm:px-10 sm:py-5 rounded-lg sm:rounded-xl text-base sm:text-lg font-medium hover:shadow-xl hover:shadow-[#bf2c7e]/30 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <FiPlusCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  Create Your Shop Now
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#a02468] to-[#bf2c7e] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute top-0 left-0 w-10 h-full bg-white/30 -skew-x-12 -translate-x-16 group-hover:translate-x-[400%] transition-transform duration-700"></span>
              </button>
            </div>
            
            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-gray-300 animate-fade-in-up delay-300">
              <div className="flex items-center gap-2 text-sm sm:text-base">
                <FiUsers className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>10,000+ Happy Vendors</span>
              </div>
              <div className="sm:hidden w-8 h-px bg-gray-500 my-1"></div>
              <div className="hidden sm:block w-px h-6 bg-gray-500"></div>
              <div className="flex items-center gap-2 text-sm sm:text-base">
                <FiStar className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>4.9/5 Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Creation Modal *
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#0f1c47]">Create New Shop</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Shop Basics Section *
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

                {/* Shop Attributes Section *
                {selectedCategory && (
                <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#0f1c47] border-b pb-2">Shop Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {attributeKeys.map((attribute) => {
                    const category = shopCategories[selectedCategory as ShopCategoryKey];
                    const options = category.attributes[attribute as keyof typeof category.attributes];
                    
                    return (
                        <div key={attribute}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{attribute}</label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent text-[#0f1c47]"
                            onChange={(e) => handleAttributeChange(attribute, e.target.value)}
                            value={selectedValues[attribute] || ""}
                        >
                            <option value="" className="text-gray-400">Select {attribute}</option>
                            {options.map((option) => (
                            <option key={option} value={option} className="text-[#0f1c47]">
                                {option}
                            </option>
                            ))}
                        </select>
                        </div>
                    );
                    })}
                </div>
                </div>
            )}
                {/* Social Media Section *
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#0f1c47] border-b pb-2">Social Media Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent text-[#0f1c47]"
                        value={newSocialMedia.platform}
                        onChange={(e) => setNewSocialMedia({...newSocialMedia, platform: e.target.value})}
                        placeholder="e.g. Instagram"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent text-[#0f1c47]"
                          value={newSocialMedia.url}
                          onChange={(e) => setNewSocialMedia({...newSocialMedia, url: e.target.value})}
                          placeholder="https://"
                        />
                        <button
                          type="button"
                          onClick={addSocialMedia}
                          className="px-4 py-2 bg-[#0f1c47] text-white rounded-lg hover:bg-[#1a2d5a] transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>

                  {socialMedias.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {socialMedias.map((social, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div>
                            <span className="font-medium">{social.platform}:</span> {social.url}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeSocialMedia(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiTrash className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Image Upload Section *
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[#0f1c47] border-b pb-2">Shop Images*</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#0f1c47] transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="shopImageUpload"
                      required={images.length === 0}
                    />
                    <label htmlFor="shopImageUpload" className="cursor-pointer">
                      <div className="mb-2 text-[#0f1c47]">
                        <FiPlusCircle className="w-8 h-8 mx-auto" />
                      </div>
                      <p className="text-sm text-gray-600">Drag and drop images here</p>
                      <p className="text-xs text-gray-500 mt-1">or click to browse (max 5 images)</p>
                    </label>
                  </div>

                  {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(image)}
                            alt="preview"
                            className="w-full h-32 object-cover rounded-lg shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <FiTrash className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Form Actions *
                <div className="flex justify-end gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#0f1c47] text-white rounded-lg hover:bg-[#1a2d5a] transition-colors disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create Shop"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PremiumCTA;*/

"use client";

import { FC, useState } from 'react';
import { HeroCTA } from '@/components/premiumCTA/HeroCTA';
import { ShopFormModal } from '@/components/premiumCTA/ShopFormModal';

export const PremiumCTA: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleSubmit = async (formData: FormData) => {
    try {
      // Log form data
      console.log('FormData being sent to backend:');
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
  
      const token = localStorage.getItem('token');
  
      const response = await fetch('https://shaddyna-backend.onrender.com/api/shops/create', {
        method: 'POST',
        body: formData,
        headers: token
          ? {
              'Authorization': `Bearer ${token}`,
            }
          : {},
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create shop');
      }
  
      const result = await response.json();
      console.log('Shop created successfully:', result);
    } catch (err) {
      console.error('Error creating shop:', err);
      throw err;
    }
  };
  
  /*const handleSubmit = async (formData: FormData) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('https://shaddyna-backend.onrender.com/api/shops/create', {
        method: 'POST',
        body: formData,
        headers: token ? {
          'Authorization': `Bearer ${token}`
        } : {}
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create shop');
      }

      const result = await response.json();
      console.log('Shop created successfully:', result);
    } catch (err) {
      console.error('Error creating shop:', err);
      throw err;
    }
  };*/

  return (
    <>
      <HeroCTA onOpenModal={() => setIsModalOpen(true)} />
      
      <ShopFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default PremiumCTA;