"use client";
import { useState, FormEvent } from "react";
import { User, Shelf } from "@/types/types";
import { UserList } from "./UserList";
import { SelectedUsers } from "./SelectedUsers";
import { CloudUploadIcon, MarketingIcon } from "hugeicons-react";

export const CreateShelfForm = ({ 
  onSuccess, 
  onCancel, 
  users, 
  loading = false 
}: {
  onSuccess: (newShelf: Shelf) => void;
  onCancel: () => void;
  users: User[];
  loading?: boolean;
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'product' | 'service' | 'investment'>('product');
  const [openForMembers, setOpenForMembers] = useState(true);
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
  const [userSearch, setUserSearch] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Product fields - array of products
  const [products, setProducts] = useState([{
    name: '',
    price: 0,
    stock: 0,
    images: [] as File[],
    category: ''
  }]);

  // Service fields - array of services
  const [services, setServices] = useState([{
    price: 0,
    duration: '',
    availability: [] as string[]
  }]);

  // Investment fields - array of investments
  const [investments, setInvestments] = useState([{
    amount: 0,
    roi: 0,
    duration: '',
    riskLevel: 'medium' as 'low' | 'medium' | 'high'
  }]);

  // Product handlers
  const addProduct = () => {
    setProducts(prev => [...prev, {
      name: '',
      price: 0,
      stock: 0,
      images: [],
      category: ''
    }]);
  };

  const removeProduct = (index: number) => {
    if (products.length > 1) {
      setProducts(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateProduct = (index: number, field: string, value: any) => {
    setProducts(prev => prev.map((product, i) => 
      i === index ? { ...product, [field]: value } : product
    ));
  };

  const handleProductImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const selectedFiles = files.slice(0, 5);
      setProducts(prev => prev.map((product, i) => 
        i === index ? { 
          ...product, 
          images: [...product.images, ...selectedFiles] 
        } : product
      ));
    }
  };

  const removeProductImage = (productIndex: number, imageIndex: number) => {
    setProducts(prev => prev.map((product, i) => 
      i === productIndex ? { 
        ...product, 
        images: product.images.filter((_, idx) => idx !== imageIndex) 
      } : product
    ));
  };

  // Service handlers
  const addService = () => {
    setServices(prev => [...prev, {
      price: 0,
      duration: '',
      availability: []
    }]);
  };

  const removeService = (index: number) => {
    if (services.length > 1) {
      setServices(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateService = (index: number, field: string, value: any) => {
    setServices(prev => prev.map((service, i) => 
      i === index ? { ...service, [field]: value } : service
    ));
  };

  const handleServiceAvailabilityChange = (serviceIndex: number, day: string) => {
    setServices(prev => prev.map((service, i) => 
      i === serviceIndex ? {
        ...service,
        availability: service.availability.includes(day)
          ? service.availability.filter(d => d !== day)
          : [...service.availability, day]
      } : service
    ));
  };

  // Investment handlers
  const addInvestment = () => {
    setInvestments(prev => [...prev, {
      amount: 0,
      roi: 0,
      duration: '',
      riskLevel: 'medium'
    }]);
  };

  const removeInvestment = (index: number) => {
    if (investments.length > 1) {
      setInvestments(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateInvestment = (index: number, field: string, value: any) => {
    setInvestments(prev => prev.map((investment, i) => 
      i === index ? { ...investment, [field]: value } : investment
    ));
  };

  // Member selection
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      
      // Append basic shelf info
      formData.append('name', name);
      formData.append('description', description);
      formData.append('type', type);
      formData.append('openForMembers', String(openForMembers));
      formData.append('members', JSON.stringify(
        selectedMembers.map(member => ({
          userId: member._id,
          role: 'member'
        }))
      ));
  
      // Append type-specific details as arrays
      if (type === 'product') {
        formData.append('productDetails', JSON.stringify(
          products.map(product => ({
            name: product.name,
            price: product.price,
            stock: product.stock,
            category: product.category
          }))
        ));
        
        // Append all product images with proper naming
        products.forEach((product, productIndex) => {
          product.images.forEach((image, imageIndex) => {
            formData.append(`productImages[${productIndex}]`, image);
          });
        });
      } 
      else if (type === 'service') {
        formData.append('serviceDetails', JSON.stringify(
          services.map(service => ({
            price: service.price,
            duration: service.duration,
            availability: service.availability
          }))
        ));
      } 
      else if (type === 'investment') {
        formData.append('investmentDetails', JSON.stringify(
          investments.map(investment => ({
            amount: investment.amount,
            roi: investment.roi,
            duration: investment.duration,
            riskLevel: investment.riskLevel
          }))
        ));
      }
  
      const response = await fetch("https://shaddyna-backend.onrender.com/api/shelf/create", {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create shelf');
      }
  
      const { data: createdShelf } = await response.json();
      
      // Transform the API response to Shelf type
      const newShelf: Shelf = {
        _id: createdShelf._id,
        name: createdShelf.name,
        description: createdShelf.description,
        image: createdShelf.image || '',
        type: createdShelf.type || 'product',
        openForMembers: createdShelf.openForMembers !== false,
        members: createdShelf.members?.map((member: any) => ({
          _id: member.userId?._id || member.userId,
          name: member.userId?.firstName || 'Unknown Member',
          role: member.role || 'member',
          image: member.userId?.image || ''
        })) || [],
        products: createdShelf.products || [],
        investments: createdShelf.investments || 0,
        createdAt: createdShelf.createdAt,
        updatedAt: createdShelf.updatedAt,
        ...(createdShelf.productDetails && { productDetails: createdShelf.productDetails }),
        ...(createdShelf.serviceDetails && { serviceDetails: createdShelf.serviceDetails }),
        ...(createdShelf.investmentDetails && { investmentDetails: createdShelf.investmentDetails })
      };

      onSuccess(newShelf);
    } catch (error: any) {
      console.error("Shelf creation error:", error);
      alert(error.message || "Failed to create shelf");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Basic Shelf Info */}
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

      {/* Type-Specific Fields */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-lg font-medium text-[#0f1c47]">Add {type.charAt(0).toUpperCase() + type.slice(1)} Details</h3>
        
        {/* Product Fields */}
        {type === 'product' && (
          <div className="space-y-6 mt-4">
            {products.map((product, productIndex) => (
              <div key={productIndex} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-[#0f1c47]">Product {productIndex + 1}</h4>
                  {products.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProduct(productIndex)}
                      className="text-red-500 text-sm"
                    >
                      Remove Product
                    </button>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor={`productName-${productIndex}`} className="block text-sm font-medium text-[#0f1c47] mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id={`productName-${productIndex}`}
                    className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
                    value={product.name}
                    onChange={(e) => updateProduct(productIndex, 'name', e.target.value)}
                    required
                    placeholder="Enter product name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor={`productPrice-${productIndex}`} className="block text-sm font-medium text-[#0f1c47] mb-1">
                      Price (Ksh)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">Ksh</span>
                      <input
                        type="number"
                        id={`productPrice-${productIndex}`}
                        className="w-full p-3 pl-10 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
                        value={product.price}
                        onChange={(e) => updateProduct(productIndex, 'price', Number(e.target.value))}
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`productStock-${productIndex}`} className="block text-sm font-medium text-[#0f1c47] mb-1">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      id={`productStock-${productIndex}`}
                      className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
                      value={product.stock}
                      onChange={(e) => updateProduct(productIndex, 'stock', Number(e.target.value))}
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor={`productCategory-${productIndex}`} className="block text-sm font-medium text-[#0f1c47] mb-1">
                    Category
                  </label>
                  <select
                    id={`productCategory-${productIndex}`}
                    className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
                    value={product.category}
                    onChange={(e) => updateProduct(productIndex, 'category', e.target.value)}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="groceries">Groceries</option>
                    <option value="furniture">Furniture</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#0f1c47] mb-1">
                    Product Images
                  </label>
                  
                  <div className="border-2 border-dashed border-[#0f1c47]/30 rounded-xl p-6 text-center mb-2">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <CloudUploadIcon className="w-10 h-10 text-[#0f1c47]/50" />
                      <div className="flex text-sm text-[#0f1c47]/50">
                        <label
                          htmlFor={`productImages-${productIndex}`}
                          className="relative cursor-pointer bg-white rounded-md font-medium text-[#bf2c7e] hover:text-[#a02468] focus-within:outline-none"
                        >
                          <span>Upload files</span>
                          <input
                            id={`productImages-${productIndex}`}
                            name={`productImages-${productIndex}`}
                            type="file"
                            className="sr-only"
                            onChange={(e) => handleProductImageUpload(productIndex, e)}
                            multiple
                            accept="image/*"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-[#0f1c47]/50">
                        PNG, JPG, JPEG up to 5MB
                      </p>
                    </div>
                  </div>

                  {product.images.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-[#0f1c47]">
                        Selected Images ({product.images.length})
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {product.images.map((file, imageIndex) => (
                          <div key={imageIndex} className="relative aspect-square group">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${imageIndex + 1}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeProductImage(productIndex, imageIndex)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
                              aria-label="Remove image"
                            >
                              <MarketingIcon className="h-4 w-4" />
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                              <p className="text-xs text-white truncate">{file.name}</p>
                              <p className="text-xs text-white/80">
                                {(file.size / 1024).toFixed(1)} KB
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addProduct}
              className="flex items-center text-[#bf2c7e] text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Another Product
            </button>
          </div>
        )}

        {/* Service Fields */}
        {type === 'service' && (
          <div className="space-y-6 mt-4">
            {services.map((service, serviceIndex) => (
              <div key={serviceIndex} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-[#0f1c47]">Service {serviceIndex + 1}</h4>
                  {services.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeService(serviceIndex)}
                      className="text-red-500 text-sm"
                    >
                      Remove Service
                    </button>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor={`servicePrice-${serviceIndex}`} className="block text-sm font-medium text-[#0f1c47] mb-1">
                    Price (Ksh)
                  </label>
                  <input
                    type="number"
                    id={`servicePrice-${serviceIndex}`}
                    className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
                    value={service.price}
                    onChange={(e) => updateService(serviceIndex, 'price', Number(e.target.value))}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor={`serviceDuration-${serviceIndex}`} className="block text-sm font-medium text-[#0f1c47] mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    id={`serviceDuration-${serviceIndex}`}
                    className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
                    value={service.duration}
                    onChange={(e) => updateService(serviceIndex, 'duration', e.target.value)}
                    placeholder="e.g., 1 hour, 30 minutes"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#0f1c47] mb-2">
                    Availability Days
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                      <div key={day} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`day-${serviceIndex}-${day}`}
                          checked={service.availability.includes(day)}
                          onChange={() => handleServiceAvailabilityChange(serviceIndex, day)}
                          className="h-4 w-4 text-[#bf2c7e] focus:ring-[#bf2c7e] border-[#0f1c47]/10 rounded"
                        />
                        <label htmlFor={`day-${serviceIndex}-${day}`} className="ml-2 text-sm text-[#0f1c47]">
                          {day}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addService}
              className="flex items-center text-[#bf2c7e] text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Another Service
            </button>
          </div>
        )}

        {/* Investment Fields */}
        {type === 'investment' && (
          <div className="space-y-6 mt-4">
            {investments.map((investment, investmentIndex) => (
              <div key={investmentIndex} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-[#0f1c47]">Investment {investmentIndex + 1}</h4>
                  {investments.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeInvestment(investmentIndex)}
                      className="text-red-500 text-sm"
                    >
                      Remove Investment
                    </button>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor={`investmentAmount-${investmentIndex}`} className="block text-sm font-medium text-[#0f1c47] mb-1">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    id={`investmentAmount-${investmentIndex}`}
                    className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
                    value={investment.amount}
                    onChange={(e) => updateInvestment(investmentIndex, 'amount', Number(e.target.value))}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor={`investmentROI-${investmentIndex}`} className="block text-sm font-medium text-[#0f1c47] mb-1">
                    Expected ROI (%)
                  </label>
                  <input
                    type="number"
                    id={`investmentROI-${investmentIndex}`}
                    className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
                    value={investment.roi}
                    onChange={(e) => updateInvestment(investmentIndex, 'roi', Number(e.target.value))}
                    min="0"
                    max="100"
                    step="0.1"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor={`investmentDuration-${investmentIndex}`} className="block text-sm font-medium text-[#0f1c47] mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    id={`investmentDuration-${investmentIndex}`}
                    className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
                    value={investment.duration}
                    onChange={(e) => updateInvestment(investmentIndex, 'duration', e.target.value)}
                    placeholder="e.g., 1 year, 6 months"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor={`investmentRiskLevel-${investmentIndex}`} className="block text-sm font-medium text-[#0f1c47] mb-1">
                    Risk Level
                  </label>
                  <select
                    id={`investmentRiskLevel-${investmentIndex}`}
                    className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
                    value={investment.riskLevel}
                    onChange={(e) => updateInvestment(investmentIndex, 'riskLevel', e.target.value as 'low' | 'medium' | 'high')}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addInvestment}
              className="flex items-center text-[#bf2c7e] text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Another Investment
            </button>
          </div>
        )}
      </div>

      {/* Members section */}
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

      {/* Form buttons */}
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
          disabled={isSubmitting}
          className={`px-6 py-2 rounded-full bg-[#bf2c7e] text-white hover:bg-[#a02468] transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Creating...' : 'Create Shelf'}
        </button>
      </div>
    </form>
  );
};

/*"use client";
import { useState, FormEvent } from "react";
import { User, Shelf } from "@/types/types";
import { UserList } from "./UserList";
import { SelectedUsers } from "./SelectedUsers";
import { CloudUploadIcon, MarketingIcon } from "hugeicons-react";

export const CreateShelfForm = ({ 
  onSuccess, 
  onCancel, 
  users, 
  loading = false 
}: {
  onSuccess: (newShelf: Shelf) => void;
  onCancel: () => void;
  users: User[];
  loading?: boolean;
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'product' | 'service' | 'investment'>('product');
  const [openForMembers, setOpenForMembers] = useState(true);
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
  const [userSearch, setUserSearch] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Product fields
  const [productName, setProductName] = useState('');
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
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      
      // Append all form fields
      formData.append('name', name);
      formData.append('description', description);
      formData.append('type', type);
      formData.append('openForMembers', String(openForMembers));
      formData.append('members', JSON.stringify(
        selectedMembers.map(member => ({
          userId: member._id,
          role: 'member'
        }))
      ));
  
      // Append type-specific details
      if (type === 'product') {
        formData.append('productDetails', JSON.stringify({
          name: productName,
          price: productPrice,
          stock: productStock,
          category: productCategory
        }));
        productImages.forEach(image => {
          formData.append('images', image);
        });
      } else if (type === 'service') {
        formData.append('serviceDetails', JSON.stringify({
          price: servicePrice,
          duration: serviceDuration,
          availability: serviceAvailability
        }));
      } else if (type === 'investment') {
        formData.append('investmentDetails', JSON.stringify({
          amount: investmentAmount,
          roi: investmentROI,
          duration: investmentDuration,
          riskLevel: investmentRiskLevel
        }));
      }
  
      const response = await fetch("http://localhost:5000/api/shelf/create", {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create shelf');
      }
  
      const { data: createdShelf } = await response.json();
      
      // Transform the API response to Shelf type
      const newShelf: Shelf = {
        _id: createdShelf._id,
        name: createdShelf.name,
        description: createdShelf.description,
        image: createdShelf.image || '',
        type: createdShelf.type || 'product',
        openForMembers: createdShelf.openForMembers !== false,
        members: createdShelf.members?.map((member: any) => ({
          _id: member.userId?._id || member.userId,
          name: member.userId?.firstName || 'Unknown Member',
          role: member.role || 'member',
          image: member.userId?.image || ''
        })) || [],
        products: createdShelf.products || [],
        investments: createdShelf.investments || 0,
        createdAt: createdShelf.createdAt,
        updatedAt: createdShelf.updatedAt,
        ...(createdShelf.productDetails && { productDetails: createdShelf.productDetails }),
        ...(createdShelf.serviceDetails && { serviceDetails: createdShelf.serviceDetails }),
        ...(createdShelf.investmentDetails && { investmentDetails: createdShelf.investmentDetails })
      };

      onSuccess(newShelf); // Notify parent of successful creation
    } catch (error: any) {
      console.error("Shelf creation error:", error);
      alert(error.message || "Failed to create shelf");
    } finally {
      setIsSubmitting(false);
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
      {/* Existing fields (name, description, type, openForMembers) *
      {/* ... keep all the existing fields as they are ... *
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

      {/* Dynamic fields based on shelf type *
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-lg font-medium text-[#0f1c47]">Add Type Details</h3>
        
        {type === 'product' && (
  <div className="space-y-4 mt-4">
    {/* Product Name *
    <div>
      <label htmlFor="productName" className="block text-sm font-medium text-[#0f1c47] mb-1">
        Product Name
      </label>
      <input
        type="text"
        id="productName"
        className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        required
        placeholder="Enter product name"
      />
    </div>

    {/* Product Details Grid *
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Price *
      <div>
        <label htmlFor="productPrice" className="block text-sm font-medium text-[#0f1c47] mb-1">
          Price (Ksh)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">Ksh</span>
          <input
            type="number"
            id="productPrice"
            className="w-full p-3 pl-10 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
            value={productPrice}
            onChange={(e) => setProductPrice(Number(e.target.value))}
            min="0"
            step="0.01"
            required
          />
        </div>
      </div>

      {/* Stock *
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
    </div>

    {/* Category *
    <div>
      <label htmlFor="productCategory" className="block text-sm font-medium text-[#0f1c47] mb-1">
        Category
      </label>
      <select
        id="productCategory"
        className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
        value={productCategory}
        onChange={(e) => setProductCategory(e.target.value)}
        required
      >
        <option value="">Select a category</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="groceries">Groceries</option>
        <option value="furniture">Furniture</option>
        <option value="other">Other</option>
      </select>
    </div>

    {/* Image Upload Section *
    <div>
      <label className="block text-sm font-medium text-[#0f1c47] mb-1">
        Product Images
      </label>
      
      {/* Upload Area *
      <div className="border-2 border-dashed border-[#0f1c47]/30 rounded-xl p-6 text-center">
        <div className="flex flex-col items-center justify-center space-y-2">
          <CloudUploadIcon className="w-10 h-10 text-[#0f1c47]/50" />
          <div className="flex text-sm text-[#0f1c47]/50">
            <label
              htmlFor="productImages"
              className="relative cursor-pointer bg-white rounded-md font-medium text-[#bf2c7e] hover:text-[#a02468] focus-within:outline-none"
            >
              <span>Upload files</span>
              <input
                id="productImages"
                name="productImages"
                type="file"
                className="sr-only"
                onChange={handleImageUpload}
                multiple
                accept="image/*"
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-[#0f1c47]/50">
            PNG, JPG, JPEG up to 5MB
          </p>
        </div>
      </div>

      {/* Image Previews *
      {productImages.length > 0 && (
        <div className="mt-4 space-y-3">
          <h4 className="text-sm font-medium text-[#0f1c47]">
            Selected Images ({productImages.length})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {productImages.map((file, index) => (
              <div key={index} className="relative aspect-square group">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
                  aria-label="Remove image"
                >
                  <MarketingIcon className="h-4 w-4" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <p className="text-xs text-white truncate">{file.name}</p>
                  <p className="text-xs text-white/80">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
            ))}
          </div>
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

      {/* Members section (keep existing) *
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

      {/* Form buttons (keep existing) *
      <div className="flex justify-end gap-4 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 rounded-full border border-[#0f1c47] text-[#0f1c47] hover:bg-[#0f1c47]/5 transition-colors"
        >
          Cancel
        </button>
        {/*<button
          type="submit"
          className="px-6 py-2 rounded-full bg-[#bf2c7e] text-white hover:bg-[#a02468] transition-colors"
        >
          Create Shelf
        </button>*
        <button
  type="submit"
  disabled={isSubmitting}
  className={`px-6 py-2 rounded-full bg-[#bf2c7e] text-white hover:bg-[#a02468] transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
>
  {isSubmitting ? 'Creating...' : 'Create Shelf'}
</button>
      </div>
    </form>
  );
};
*/













