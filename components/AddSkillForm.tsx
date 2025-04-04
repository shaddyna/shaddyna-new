"use client";

import { useState, useRef, ChangeEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaPlus, FaTrash, FaUpload, FaTimes } from 'react-icons/fa';

interface PortfolioItem {
  image: File | null;
  title: string;
  description: string;
  preview?: string;
}

interface AddSkillFormProps {
  onClose: () => void;
}

const AddSkillForm = ({ onClose }: AddSkillFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    level: '',
    rating: '',
    description: '',
    price: '',
    image: null as File | null,
    pimage: null as File | null,
    portfolio: [{ 
      image: null as File | null, 
      title: '', 
      description: '',
      preview: ''
    }] as PortfolioItem[]
  });

  const imageInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, field: 'image' | 'pimage') => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, [field]: e.target.files![0] }));
    }
  };

  const handlePortfolioFileChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newPortfolio = [...formData.portfolio];
      newPortfolio[index] = { 
        ...newPortfolio[index], 
        image: file,
        preview: URL.createObjectURL(file)
      };
      setFormData(prev => ({ ...prev, portfolio: newPortfolio }));
    }
  };

  const handlePortfolioChange = (index: number, field: keyof PortfolioItem, value: string) => {
    const newPortfolio = [...formData.portfolio];
    newPortfolio[index] = { ...newPortfolio[index], [field]: value };
    setFormData(prev => ({ ...prev, portfolio: newPortfolio }));
  };

  const addPortfolioItem = () => {
    setFormData(prev => ({
      ...prev,
      portfolio: [...prev.portfolio, { image: null, title: '', description: '', preview: '' }]
    }));
  };

  const removePortfolioItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      portfolio: prev.portfolio.filter((_, i) => i !== index)
    }));
  };

  const removeImage = (field: 'image' | 'pimage') => {
    setFormData(prev => ({ ...prev, [field]: null }));
  };

  const removePortfolioImage = (index: number) => {
    const newPortfolio = [...formData.portfolio];
    newPortfolio[index] = { ...newPortfolio[index], image: null, preview: '' };
    setFormData(prev => ({ ...prev, portfolio: newPortfolio }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('level', formData.level);
      formDataToSend.append('rating', formData.rating);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      if (formData.image) formDataToSend.append('image', formData.image);
      if (formData.pimage) formDataToSend.append('pimage', formData.pimage);

      formData.portfolio.forEach((item, index) => {
        formDataToSend.append(`portfolio[${index}][title]`, item.title);
        formDataToSend.append(`portfolio[${index}][description]`, item.description);
        if (item.image) formDataToSend.append(`portfolio[${index}][image]`, item.image);
      });

      await axios.post('/api/skills', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      onClose();
      router.refresh();
    } catch (err) {
      setError('Failed to create skill. Please try again.');
      console.error('Submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-2xl overflow-y-auto max-h-screen">
        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Add New Skill</h1>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Skill Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Skill Level (1-10) *
                </label>
                <input
                  type="number"
                  name="level"
                  min="1"
                  max="10"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Rating (1-5) *
                </label>
                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Price (KES) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
                  required
                />
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Skill Image *
                </label>
                <input
                  type="file"
                  ref={imageInputRef}
                  onChange={(e) => handleFileChange(e, 'image')}
                  accept="image/*"
                  className="hidden"
                />
                {formData.image ? (
                  <div className="relative mt-2">
                    <img 
                      src={URL.createObjectURL(formData.image)} 
                      alt="Preview" 
                      className="h-48 w-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage('image')}
                      className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                    >
                      <FaTimes className="text-red-500" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className="mt-1 w-full px-4 py-12 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 transition-colors"
                  >
                    <FaUpload className="text-3xl text-gray-400 mb-2" />
                    <span className="text-gray-600">Click to upload skill image</span>
                  </button>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Profile Image *
                </label>
                <input
                  type="file"
                  ref={profileInputRef}
                  onChange={(e) => handleFileChange(e, 'pimage')}
                  accept="image/*"
                  className="hidden"
                />
                {formData.pimage ? (
                  <div className="relative mt-2">
                    <img 
                      src={URL.createObjectURL(formData.pimage)} 
                      alt="Preview" 
                      className="h-48 w-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage('pimage')}
                      className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                    >
                      <FaTimes className="text-red-500" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => profileInputRef.current?.click()}
                    className="mt-1 w-full px-4 py-12 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 transition-colors"
                  >
                    <FaUpload className="text-3xl text-gray-400 mb-2" />
                    <span className="text-gray-600">Click to upload profile image</span>
                  </button>
                )}
              </div>
            </div>

            {/* Description Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                className="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
                required
              />
            </div>

            {/* Portfolio Section */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">Portfolio Items</h3>
                <button
                  type="button"
                  onClick={addPortfolioItem}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <FaPlus /> Add Item
                </button>
              </div>

              {formData.portfolio.map((item, index) => (
                <div key={index} className="border rounded-xl p-6 space-y-6 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-lg">Portfolio Item #{index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removePortfolioItem(index)}
                      className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Image
                      </label>
                      <input
                        type="file"
                        id={`portfolio-image-${index}`}
                        onChange={(e) => handlePortfolioFileChange(index, e)}
                        accept="image/*"
                        className="hidden"
                      />
                      {item.preview ? (
                        <div className="relative">
                          <img 
                            src={item.preview} 
                            alt="Portfolio preview" 
                            className="h-40 w-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removePortfolioImage(index)}
                            className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                          >
                            <FaTimes className="text-red-500" />
                          </button>
                        </div>
                      ) : (
                        <label
                          htmlFor={`portfolio-image-${index}`}
                          className="block w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 transition-colors cursor-pointer"
                        >
                          <FaUpload className="text-2xl text-gray-400 mb-2" />
                          <span className="text-gray-600">Upload image</span>
                        </label>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Title
                      </label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handlePortfolioChange(index, 'title', e.target.value)}
                        className="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Description
                      </label>
                      <textarea
                        value={item.description}
                        onChange={(e) => handlePortfolioChange(index, 'description', e.target.value)}
                        className="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="mt-10 flex justify-end gap-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium text-lg transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 font-medium text-lg shadow-md hover:shadow-lg transition-all disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </span>
                ) : (
                  'Create Skill'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSkillForm;













