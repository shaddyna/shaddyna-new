/*import { useState } from 'react';
import { Skill } from '@/types/skills';

interface SkillFormProps {
  onSubmit: (skill: Omit<Skill, 'id' | 'createdAt' | 'createdBy' | 'likes' | 'stats'>) => void;
  initialData?: Partial<Skill>;
}

export const SkillForm: React.FC<SkillFormProps> = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [price, setPrice] = useState<number | undefined>(initialData?.price);
  const [priceType, setPriceType] = useState<'hourly' | 'fixed' | 'negotiable'>(initialData?.priceType || 'hourly');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [imageUrl, setImageUrl] = useState('');

  const categories = ['Design', 'Development', 'Marketing', 'Writing', 'Business'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      category,
      price,
      priceType,
      tags,
      images,
    });
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-[#0f1c47] mb-1">
          Skill Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
          placeholder="e.g., Web Development, Graphic Design"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-[#0f1c47] mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
          placeholder="Describe your skill in detail"
          rows={5}
          required
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-[#0f1c47] mb-1">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-[#0f1c47] mb-1">
            Price (optional)
          </label>
          <input
            type="number"
            id="price"
            value={price || ''}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
            placeholder="Enter amount"
          />
        </div>
        <div>
          <label htmlFor="priceType" className="block text-sm font-medium text-[#0f1c47] mb-1">
            Price Type
          </label>
          <select
            id="priceType"
            value={priceType}
            onChange={(e) => setPriceType(e.target.value as any)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
          >
            <option value="hourly">Hourly</option>
            <option value="fixed">Fixed</option>
            <option value="negotiable">Negotiable</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-[#0f1c47] mb-1">
          Tags (max 5)
        </label>
        <div className="flex">
          <input
            type="text"
            id="tags"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
            placeholder="Add tags to describe your skill"
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            disabled={tags.length >= 5}
          />
          <button
            type="button"
            onClick={addTag}
            disabled={tags.length >= 5}
            className="px-4 py-2 bg-[#0f1c47] text-white rounded-r-md hover:bg-[#0a142f] disabled:opacity-50"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center"
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

      <div>
        <label htmlFor="images" className="block text-sm font-medium text-[#0f1c47] mb-1">
          Images (optional, max 3)
        </label>
        <div className="flex">
          <input
            type="text"
            id="images"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
            placeholder="Add image URL"
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
            disabled={images.length >= 3}
          />
          <button
            type="button"
            onClick={addImage}
            disabled={images.length >= 3}
            className="px-4 py-2 bg-[#0f1c47] text-white rounded-r-md hover:bg-[#0a142f] disabled:opacity-50"
          >
            Add
          </button>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Preview ${index + 1}`}
                className="w-full h-24 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => removeImage(image)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 bg-[#bf2c7e] text-white rounded-md hover:bg-[#a8256d] transition-colors"
        >
          {initialData?.id ? 'Update Skill' : 'Create Skill'}
        </button>
      </div>
        </form>
      )};*/

      import { useState, useRef } from 'react';
import { Skill } from '@/types/skills';
import axios from 'axios';

interface SkillFormProps {
  onSubmit: (skill: Omit<Skill, 'id' | 'createdAt' | 'createdBy' | 'likes' | 'stats'>) => void;
  initialData?: Partial<Skill>;
}

export const SkillForm: React.FC<SkillFormProps> = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [price, setPrice] = useState<number | undefined>(initialData?.price);
  const [priceType, setPriceType] = useState<'hourly' | 'fixed' | 'negotiable'>(initialData?.priceType || 'hourly');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>(initialData?.images || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const categories = ['Design', 'Development', 'Marketing', 'Writing', 'Business'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      if (price) formData.append('price', price.toString());
      formData.append('priceType', priceType);
      formData.append('tags', tags.join(','));
      
      // Append each image file
      images.forEach((image) => {
        formData.append('images', image);
      });

      const response = await axios.post('http://localhost:5000/api/skill', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      onSubmit(response.data);
    } catch (err) {
      console.error('Error submitting skill:', err);
      setError('Failed to submit skill. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      
      // Validate number of images
      if (files.length + images.length > 3) {
        setError('You can upload a maximum of 3 images');
        return;
      }

      // Validate file types and sizes
      const validFiles = files.filter(file => {
        if (!file.type.startsWith('image/')) {
          setError('Only image files are allowed');
          return false;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB
          setError('Image size should be less than 5MB');
          return false;
        }
        return true;
      });

      setImages([...images, ...validFiles]);

      // Create preview URLs
      const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls([...previewUrls, ...newPreviewUrls]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviewUrls = [...previewUrls];
    
    newImages.splice(index, 1);
    newPreviewUrls.splice(index, 1);
    
    setImages(newImages);
    setPreviewUrls(newPreviewUrls);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Existing form fields (title, description, category, price, priceType, tags) remain the same */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-[#0f1c47] mb-1">
          Skill Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
          placeholder="e.g., Web Development, Graphic Design"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-[#0f1c47] mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
          placeholder="Describe your skill in detail"
          rows={5}
          required
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-[#0f1c47] mb-1">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-[#0f1c47] mb-1">
            Price (optional)
          </label>
          <input
            type="number"
            id="price"
            value={price || ''}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
            placeholder="Enter amount"
          />
        </div>
        <div>
          <label htmlFor="priceType" className="block text-sm font-medium text-[#0f1c47] mb-1">
            Price Type
          </label>
          <select
            id="priceType"
            value={priceType}
            onChange={(e) => setPriceType(e.target.value as any)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
          >
            <option value="hourly">Hourly</option>
            <option value="fixed">Fixed</option>
            <option value="negotiable">Negotiable</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-[#0f1c47] mb-1">
          Tags (max 5)
        </label>
        <div className="flex">
          <input
            type="text"
            id="tags"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
            placeholder="Add tags to describe your skill"
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            disabled={tags.length >= 5}
          />
          <button
            type="button"
            onClick={addTag}
            disabled={tags.length >= 5}
            className="px-4 py-2 bg-[#0f1c47] text-white rounded-r-md hover:bg-[#0a142f] disabled:opacity-50"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center"
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

      <div>
        <label htmlFor="images" className="block text-sm font-medium text-[#0f1c47] mb-1">
          Images (optional, max 3)
        </label>
        <div className="flex flex-col">
          <input
            type="file"
            id="images"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            multiple
            accept="image/*"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={images.length >= 3}
            className="px-4 py-2 bg-[#0f1c47] text-white rounded-md hover:bg-[#0a142f] disabled:opacity-50 mb-2"
          >
            Upload Images
          </button>
          <p className="text-sm text-gray-500">Maximum 3 images (5MB each)</p>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-full h-24 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 bg-[#bf2c7e] text-white rounded-md hover:bg-[#a8256d] transition-colors disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : (initialData?.id ? 'Update Skill' : 'Create Skill')}
        </button>
      </div>
    </form>
  );
};