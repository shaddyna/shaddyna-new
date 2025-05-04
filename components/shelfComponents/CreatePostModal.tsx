"use client";
import { useState, useRef, ChangeEvent } from 'react';
import { Post } from '@/types/shelf';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface BasePost {
  name: string;
  description: string;
  type: 'product' | 'service' | 'investment';
  tags: string[];
  images: string[];
  shelfId: string | undefined;
}

interface ProductPost extends BasePost {
  product: {
    price: number;
    stock: number;
    category: string;
  };
}

interface ServicePost extends BasePost {
  service: {
    price: number;
    duration: string;
    availability: string[];
  };
}

interface InvestmentPost extends BasePost {
  investment: {
    amount: number;
    roi: number;
    duration: string;
    riskLevel: 'low' | 'medium' | 'high';
  };
}

type PostData = ProductPost | ServicePost | InvestmentPost;

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: Omit<Post, 'id' | 'createdAt' | 'createdBy' | 'status' | 'stats'>) => void;
 // currentUser: import('@/types/shelf').User;
  //shelfId: string;
}


export const CreatePostModal: React.FC<CreatePostModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit,
 // currentUser,
 // shelfId 
}) => {
  const [postType, setPostType] = useState<'product' | 'service' | 'investment'>('product');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const pathname = usePathname();
  const shelfId = pathname?.split('/').pop(); 
  const { user: currentUser } = useAuth();

  // Product specific fields
  const [productPrice, setProductPrice] = useState<number | undefined>();
  const [productStock, setProductStock] = useState<number | undefined>();
  const [productCategory, setProductCategory] = useState('');

  // Service specific fields
  const [servicePrice, setServicePrice] = useState<number | undefined>();
  const [serviceDuration, setServiceDuration] = useState('');
  const [serviceAvailability, setServiceAvailability] = useState<string[]>([]);
  const [newAvailability, setNewAvailability] = useState('');

  // Investment specific fields
  const [investmentAmount, setInvestmentAmount] = useState<number | undefined>();
  const [roi, setRoi] = useState<number | undefined>();
  const [investmentDuration, setInvestmentDuration] = useState('');
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('medium');

  const handleImageUpload = async (files: FileList) => {
    const filesArray = Array.from(files);
    
    // Filter to only allow images and limit to 3
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const validFiles = filesArray
      .filter(file => allowedTypes.includes(file.type))
      .slice(0, 3 - imageFiles.length);
    
    if (validFiles.length === 0) return;

    // Create previews
    const newPreviews = await Promise.all(
      validFiles.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });
      })
    );

    setImageFiles(prev => [...prev, ...validFiles]);
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImageUpload(e.target.files);
    }
  };

  /*const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };*/
  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const uploadImagesToCloudinary = async (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
  
    try {
      const token = localStorage.getItem('token'); // 👈 grab token directly
  
      const response = await fetch('https://shaddyna-backend.onrender.com/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // 👈 attach token
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Image upload failed');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
  
    try {
      let imageUrls: string[] = [];
      if (imageFiles.length > 0) {
        const uploadResponse = await uploadImagesToCloudinary(imageFiles);
        imageUrls = uploadResponse.urls;
      }
  
      const basePost: BasePost = {
        name,
        description,
        type: postType,
        tags,
        images: imageUrls,
        shelfId,
      };
  
      let postData: PostData;
  
      if (postType === 'product') {
        postData = {
          ...basePost,
          product: {
            price: productPrice ? Number(productPrice) : 0,
            stock: productStock ? Number(productStock) : 0,
            category: productCategory,
          },
        };
      } else if (postType === 'service') {
        postData = {
          ...basePost,
          service: {
            price: servicePrice ? Number(servicePrice) : 0,
            duration: serviceDuration,
            availability: serviceAvailability,
          },
        };
      } else {
        postData = {
          ...basePost,
          investment: {
            amount: investmentAmount ? Number(investmentAmount) : 0,
            roi: roi ? Number(roi) : 0,
            duration: investmentDuration,
            riskLevel,
          },
        };
      }
  
      console.log('Submitting post data:', postData);
  
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
  
      const response = await fetch('https://shaddyna-backend.onrender.com/api/shellf/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create post');
      }
  
      const createdPost = await response.json();
      
      // Call the onSubmit callback with the created post
      onSubmit({
        ...createdPost,
        // Add any additional fields that your Post type expects
        id: createdPost._id,
        createdAt: new Date(createdPost.createdAt),
        createdBy: currentUser, // Assuming currentUser is in scope
        status: 'active', // Default status
        stats: { likes: 0, comments: 0, shares: 0 }, // Default stats
      });
  
      // Reset form and close modal
      resetForm();
      onClose();
  
      // Optional: Show success message
      alert('Post created successfully!');
  
    } catch (error) {
      console.error('Error creating post:', error);
      // Show error message to user
      alert(error instanceof Error ? error.message : 'Failed to create post');
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setImageFiles([]);
    setImagePreviews([]);
    setTags([]);
    setName('');
    setDescription('');
    setImages([]);
    setTags([]);
    setProductPrice(undefined);
    setProductStock(undefined);
    setProductCategory('');
    setServicePrice(undefined);
    setServiceDuration('');
    setServiceAvailability([]);
    setInvestmentAmount(undefined);
    setRoi(undefined);
    setInvestmentDuration('');
    setRiskLevel('medium');
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const addImage = () => {
    if (imageUrl.trim() && !images.includes(imageUrl.trim())) {
      setImages([...images, imageUrl.trim()]);
      setImageUrl('');
    }
  };


  const addAvailability = () => {
    if (newAvailability.trim() && !serviceAvailability.includes(newAvailability.trim())) {
      setServiceAvailability([...serviceAvailability, newAvailability.trim()]);
      setNewAvailability('');
    }
  };

  const removeAvailability = (availabilityToRemove: string) => {
    setServiceAvailability(serviceAvailability.filter(avail => avail !== availabilityToRemove));
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        {/* ... (keep your existing header and form opening) */}

        {/* ... (keep all your existing form fields) */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-[#0f1c47]">Create New Post</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Post Type</label>
            <div className="grid grid-cols-3 gap-2">
              {['product', 'service', 'investment'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPostType(type as any)}
                  className={`px-4 py-2 rounded-md text-sm ${
                    postType === type 
                      ? 'bg-[#0f1c47] text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              {postType === 'product' ? 'Product Name' : postType === 'service' ? 'Service Name' : 'Investment Name'}
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
              placeholder={`Enter ${postType} name`}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
              placeholder="Enter detailed description"
              rows={4}
              required
            />
          </div>

          {postType === 'product' && (
            <>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    id="productPrice"
                    value={productPrice || ''}
                    onChange={(e) => setProductPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
                    placeholder="Enter price"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="productStock" className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    id="productStock"
                    value={productStock || ''}
                    onChange={(e) => setProductStock(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
                    placeholder="Enter stock quantity"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    id="productCategory"
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
                    placeholder="Enter category"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {postType === 'service' && (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="servicePrice" className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    id="servicePrice"
                    value={servicePrice || ''}
                    onChange={(e) => setServicePrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
                    placeholder="Enter price"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="serviceDuration" className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    id="serviceDuration"
                    value={serviceDuration}
                    onChange={(e) => setServiceDuration(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
                    placeholder="e.g., 1 hour"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                  Availability
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="availability"
                    value={newAvailability}
                    onChange={(e) => setNewAvailability(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
                    placeholder="Add availability (e.g., Monday)"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addAvailability())}
                  />
                  <button
                    type="button"
                    onClick={addAvailability}
                    className="px-4 py-2 bg-[#0f1c47] text-white rounded-r-md hover:bg-[#0a142f]"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {serviceAvailability.map((avail) => (
                    <span 
                      key={avail} 
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs flex items-center"
                    >
                      {avail}
                      <button 
                        type="button"
                        onClick={() => removeAvailability(avail)}
                        className="ml-1 text-gray-500 hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {postType === 'investment' && (
            <>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label htmlFor="investmentAmount" className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    id="investmentAmount"
                    value={investmentAmount || ''}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
                    placeholder="Enter amount"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="roi" className="block text-sm font-medium text-gray-700 mb-1">
                    Expected ROI (%)
                  </label>
                  <input
                    type="number"
                    id="roi"
                    value={roi || ''}
                    onChange={(e) => setRoi(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
                    placeholder="Enter ROI percentage"
                    min="0"
                    max="100"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="investmentDuration" className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    id="investmentDuration"
                    value={investmentDuration}
                    onChange={(e) => setInvestmentDuration(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
                    placeholder="e.g., 6 months"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="riskLevel" className="block text-sm font-medium text-gray-700 mb-1">
                  Risk Level
                </label>
                <select
                  id="riskLevel"
                  value={riskLevel}
                  onChange={(e) => setRiskLevel(e.target.value as 'low' | 'medium' | 'high')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </>
          )}

          <div className="mb-4">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="flex">
              <input
                type="text"
                id="tags"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
                placeholder="Add tags"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-[#0f1c47] text-white rounded-r-md hover:bg-[#0a142f]"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs flex items-center"
                >
                  {tag}
                  <button 
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-gray-500 hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="mb-4">
      
            <div className="grid grid-cols-3 gap-2 mt-2">
              {images.map((image) => (
                <div key={image} className="relative group">
                  <img 
                    src={image} 
                    alt="Preview" 
                    className="w-full h-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                  //  onClick={() => removeImage(image)}
                    className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

       

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Images (Max 3)
          </label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            multiple
            className="hidden"
          />
          <button
            type="button"
            onClick={triggerFileInput}
            disabled={imageFiles.length >= 3}
            className={`px-4 py-2 rounded-md text-sm mb-2 ${
              imageFiles.length >= 3
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-[#0f1c47] text-white hover:bg-[#0a142f]'
            }`}
          >
            Add Images
          </button>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <img 
                  src={preview} 
                  alt={`Preview ${index + 1}`} 
                  className="w-full h-24 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
            {imagePreviews.length === 0 && (
              <div className="col-span-3 flex items-center justify-center h-24 bg-gray-100 rounded-md">
                <span className="text-gray-500">No images selected</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            disabled={isUploading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#bf2c7e] text-white rounded-md hover:bg-[#a8256d] disabled:opacity-50"
            disabled={isUploading}
          >
            {isUploading ? 'Creating...' : 'Create Post'}
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};