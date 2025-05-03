/*import { FC, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { SocialMedia } from '@/types/CTAtypes';
import { ShopBasicsForm } from './ShopBasicsForm';
import { ShopAttributesForm } from './ShopAttributesForm';
import { SocialMediaForm } from './SocialMediaForm';
import { ImageUploadForm } from './ImageUploadForm';


interface ShopFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
}

export const ShopFormModal: FC<ShopFormModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [shopName, setShopName] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [closingHours, setClosingHours] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [socialMedias, setSocialMedias] = useState<SocialMedia[]>([]);
  const [newSocialMedia, setNewSocialMedia] = useState<SocialMedia>({ platform: "", url: "" });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!shopName || !description || !phoneNumber || !email || !location || !selectedCategory) {
        throw new Error("Please fill all required fields");
      }

      if (images.length === 0) {
        throw new Error("At least one image is required");
      }

      const formData = new FormData();
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
      
      images.forEach((image) => {
        formData.append('images', image);
      });

      await onSubmit(formData);
      resetForm();
      onClose();
    } catch (err) {
      console.error('Error creating shop:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#0f1c47]">Create New Shop</h2>
            <button 
              onClick={() => {
                resetForm();
                onClose();
              }}
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
            <ShopBasicsForm
              shopName={shopName}
              setShopName={setShopName}
              description={description}
              setDescription={setDescription}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              email={email}
              setEmail={setEmail}
              openingHours={openingHours}
              setOpeningHours={setOpeningHours}
              closingHours={closingHours}
              setClosingHours={setClosingHours}
              location={location}
              setLocation={setLocation}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            {selectedCategory && (
              <ShopAttributesForm
                selectedCategory={selectedCategory}
                selectedValues={selectedValues}
                onAttributeChange={(key, value) => 
                  setSelectedValues(prev => ({ ...prev, [key]: value }))
                }
              />
            )}

            <SocialMediaForm
              socialMedias={socialMedias}
              newSocialMedia={newSocialMedia}
              onPlatformChange={(e) => 
                setNewSocialMedia({...newSocialMedia, platform: e.target.value})
              }
              onUrlChange={(e) => 
                setNewSocialMedia({...newSocialMedia, url: e.target.value})
              }
              onAddSocialMedia={() => {
                if (newSocialMedia.platform && newSocialMedia.url) {
                  setSocialMedias([...socialMedias, newSocialMedia]);
                  setNewSocialMedia({ platform: "", url: "" });
                }
              }}
              onRemoveSocialMedia={(index) => 
                setSocialMedias(socialMedias.filter((_, i) => i !== index))
              }
            />

            <ImageUploadForm
              images={images}
              onImageUpload={(e) => {
                if (e.target.files) {
                  const newImages = Array.from(e.target.files).slice(0, 5 - images.length);
                  setImages(prev => [...prev, ...newImages]);
                }
              }}
              onRemoveImage={(index) => 
                setImages(prev => prev.filter((_, i) => i !== index))
              }
            />

            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  onClose();
                }}
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
  );
};*/

import { FC, useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { SocialMedia } from '@/types/CTAtypes';
import { ShopBasicsForm } from './ShopBasicsForm';
import { ShopAttributesForm } from './ShopAttributesForm';
import { SocialMediaForm } from './SocialMediaForm';
import { ImageUploadForm } from './ImageUploadForm';
import { useAuth } from '@/context/AuthContext';


interface ShopFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
}

export const ShopFormModal: FC<ShopFormModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [shopName, setShopName] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [closingHours, setClosingHours] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [socialMedias, setSocialMedias] = useState<SocialMedia[]>([]);
  const [newSocialMedia, setNewSocialMedia] = useState<SocialMedia>({ platform: "", url: "" });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sellerId, setSellerId] = useState<string | null>(null);
  const [isFetchingSeller, setIsFetchingSeller] = useState(false);
  const { user, isLoading: authLoading } = useAuth();

  useEffect(() => {
    const fetchSellerId = async () => {
      if (user?.role === 'seller' && user.email) {
        setIsFetchingSeller(true);
        try {
          const response = await fetch('http://localhost:5000/api/sellers');
          if (!response.ok) {
            throw new Error('Failed to fetch sellers');
          }
          const sellers = await response.json();
          const matchedSeller = sellers.find((seller: any) => seller.email === user.email);
          if (matchedSeller) {
            setSellerId(matchedSeller._id);
          } else {
            setError('No seller profile found for this user');
          }
        } catch (err) {
          console.error('Error fetching sellers:', err);
          setError('Failed to fetch seller information');
        } finally {
          setIsFetchingSeller(false);
        }
      }
    };

    if (isOpen && user?.role === 'seller') {
      fetchSellerId();
    }
  }, [isOpen, user]);

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
    setError(null);
    setSellerId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!shopName || !description || !phoneNumber || !email || !location || !selectedCategory) {
        throw new Error("Please fill all required fields");
      }

      if (images.length === 0) {
        throw new Error("At least one image is required");
      }

      if (user?.role === 'seller' && !sellerId) {
        throw new Error("Seller information not available");
      }

      const formData = new FormData();
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
      
      if (sellerId) {
        formData.append('sellerId', sellerId);
      }
      
      images.forEach((image) => {
        formData.append('images', image);
      });

      await onSubmit(formData);
      resetForm();
      onClose();
    } catch (err) {
      console.error('Error creating shop:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  if (authLoading || isFetchingSeller) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p>Loading user information...</p>
        </div>
      </div>
    );
  }

  if (user?.role !== 'seller') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p>Only sellers can create shops. Please contact support if you believe this is an error.</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#0f1c47]">Create New Shop</h2>
            <button
              onClick={() => {
                resetForm();
                onClose();
              }}
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
            <ShopBasicsForm
              shopName={shopName}
              setShopName={setShopName}
              description={description}
              setDescription={setDescription}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              email={email}
              setEmail={setEmail}
              openingHours={openingHours}
              setOpeningHours={setOpeningHours}
              closingHours={closingHours}
              setClosingHours={setClosingHours}
              location={location}
              setLocation={setLocation}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            {selectedCategory && (
              <ShopAttributesForm
                selectedCategory={selectedCategory}
                selectedValues={selectedValues}
                onAttributeChange={(key, value) => 
                  setSelectedValues(prev => ({ ...prev, [key]: value }))
                }
              />
            )}

            <SocialMediaForm
              socialMedias={socialMedias}
              newSocialMedia={newSocialMedia}
              onPlatformChange={(e) => 
                setNewSocialMedia({...newSocialMedia, platform: e.target.value})
              }
              onUrlChange={(e) => 
                setNewSocialMedia({...newSocialMedia, url: e.target.value})
              }
              onAddSocialMedia={() => {
                if (newSocialMedia.platform && newSocialMedia.url) {
                  setSocialMedias([...socialMedias, newSocialMedia]);
                  setNewSocialMedia({ platform: "", url: "" });
                }
              }}
              onRemoveSocialMedia={(index) => 
                setSocialMedias(socialMedias.filter((_, i) => i !== index))
              }
            />

            <ImageUploadForm
              images={images}
              onImageUpload={(e) => {
                if (e.target.files) {
                  const newImages = Array.from(e.target.files).slice(0, 5 - images.length);
                  setImages(prev => [...prev, ...newImages]);
                }
              }}
              onRemoveImage={(index) => 
                setImages(prev => prev.filter((_, i) => i !== index))
              }
            />

            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  onClose();
                }}
                className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#0f1c47] text-white rounded-lg hover:bg-[#1a2d5a] transition-colors disabled:opacity-50"
                disabled={isSubmitting || isFetchingSeller}
              >
                {isSubmitting ? "Creating..." : "Create Shop"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};