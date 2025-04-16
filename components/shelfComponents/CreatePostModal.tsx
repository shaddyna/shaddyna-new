"use client";
import { useState } from 'react';
import { Post } from '@/types/shelf';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: Omit<Post, 'id' | 'createdAt' | 'createdBy' | 'status' | 'stats'>) => void;
  currentUser: import('@/types/shelf').User;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit,
  currentUser 
}) => {
  const [postType, setPostType] = useState<'product' | 'service' | 'investment'>('product');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | undefined>();
  const [currency, setCurrency] = useState('USD');
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Investment specific fields
  const [investmentAmount, setInvestmentAmount] = useState<number | undefined>();
  const [roi, setRoi] = useState<number | undefined>();
  const [duration, setDuration] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const basePost = {
      title,
      description,
      type: postType,
      tags,
      images,
      createdBy: currentUser,
    };

    if (postType === 'product' || postType === 'service') {
      onSubmit({
        ...basePost,
        price,
        currency,
      });
    } else if (postType === 'investment') {
      onSubmit({
        ...basePost,
        price: investmentAmount,
        currency,
        investmentDetails: {
          roi: roi ?? 0,
          duration,
        }
      });
    }

    // Reset form
    setTitle('');
    setDescription('');
    setPrice(undefined);
    setImages([]);
    setTags([]);
    onClose();
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

  const removeImage = (imageToRemove: string) => {
    setImages(images.filter(image => image !== imageToRemove));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
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
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
              placeholder="Enter post title"
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

          {(postType === 'product' || postType === 'service') && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  value={price || ''}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
                  placeholder="Enter price"
                  required
                />
              </div>
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select
                  id="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
                  required
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="KES">KES</option>
                </select>
              </div>
            </div>
          )}

          {postType === 'investment' && (
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Investment Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  value={investmentAmount || ''}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
                  placeholder="Enter amount"
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
                  required
                />
              </div>
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
                  placeholder="e.g., 6 months"
                  required
                />
              </div>
            </div>
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
            <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
              Images
            </label>
            <div className="flex">
              <input
                type="text"
                id="images"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
                placeholder="Add image URL"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
              />
              <button
                type="button"
                onClick={addImage}
                className="px-4 py-2 bg-[#0f1c47] text-white rounded-r-md hover:bg-[#0a142f]"
              >
                Add
              </button>
            </div>
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
                    onClick={() => removeImage(image)}
                    className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#bf2c7e] text-white rounded-md hover:bg-[#a8256d]"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};