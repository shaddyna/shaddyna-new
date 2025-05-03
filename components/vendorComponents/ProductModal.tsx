/*import { Fragment, useState, useEffect } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productCategories: Record<string, {
    label: string;
    attributes: Record<string, string[]>;
  }>;
  selectedCategory: string | null;
  handleCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  productName: string;
  setProductName: (value: string) => void;
  productStock: string;
  setProductStock: (value: string) => void;
  productPrice: string;
  setProductPrice: (value: string) => void;
  attributeKeys: string[];
  selectedValues: Record<string, string>;
  handleAttributeChange: (key: string, value: string) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  images: File[];
  removeImage: (index: number) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  productCategories,
  selectedCategory,
  handleCategoryChange,
  productName,
  setProductName,
  productStock,
  setProductStock,
  productPrice,
  setProductPrice,
  attributeKeys,
  selectedValues,
  handleAttributeChange,
  handleImageUpload,
  images,
  removeImage,
  handleSubmit,
  isSubmitting
}) => {
  const { user } = useAuth();
  const [sellerId, setSellerId] = useState<string | null>(null);
  const [isFetchingSeller, setIsFetchingSeller] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSellerId = async () => {
      if (user?.role === 'seller' && user.email) {
        setIsFetchingSeller(true);
        setError(null);
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
    } else {
      setSellerId(null);
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#0f1c47]">Add New Product</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              disabled={isSubmitting || isFetchingSeller}
            >
              ✕
            </button>
          </div>

          {(error || isFetchingSeller) && (
            <div className="mb-4">
              {isFetchingSeller && (
                <div className="p-3 bg-blue-100 text-blue-700 rounded-lg">
                  Loading seller information...
                </div>
              )}
              {error && (
                <div className="p-3 bg-red-100 text-red-700 rounded-lg">
                  {error}
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Basics Section *
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#0f1c47] border-b pb-2">Product Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name*</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                    disabled={isSubmitting || isFetchingSeller}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent"
                    onChange={handleCategoryChange}
                    value={selectedCategory || ""}
                    required
                    disabled={isSubmitting || isFetchingSeller}
                  >
                    <option value="">Select Category</option>
                    {Object.keys(productCategories).map((key) => (
                      <option key={key} value={key}>
                        {productCategories[key].label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity*</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent"
                    value={productStock}
                    onChange={(e) => setProductStock(e.target.value)}
                    required
                    disabled={isSubmitting || isFetchingSeller}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (Ksh)*</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    required
                    disabled={isSubmitting || isFetchingSeller}
                  />
                </div>
              </div>
            </div>

            {/* Product Attributes Section *
            {selectedCategory && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#0f1c47] border-b pb-2">Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {attributeKeys.map((attribute) => (
                    <div key={attribute}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{attribute}*</label>
                      <select
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent"
                        onChange={(e) => handleAttributeChange(attribute, e.target.value)}
                        value={selectedValues[attribute] || ""}
                        required
                        disabled={isSubmitting || isFetchingSeller}
                      >
                        <option value="">Select {attribute}</option>
                        {productCategories[selectedCategory].attributes[attribute].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Image Upload Section *
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#0f1c47] border-b pb-2">Product Images</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#0f1c47] transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                  disabled={isSubmitting || isFetchingSeller}
                />
                <label 
                  htmlFor="imageUpload" 
                  className={`cursor-pointer ${(isSubmitting || isFetchingSeller) ? 'opacity-50' : ''}`}
                >
                  <div className="mb-2 text-[#0f1c47]">
                    <FiPlus className="w-8 h-8 mx-auto" />
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
                        disabled={isSubmitting || isFetchingSeller}
                      >
                        <FiTrash className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Summary Section *
            {selectedCategory && Object.keys(selectedValues).length === attributeKeys.length && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-[#0f1c47] mb-3">Summary</h3>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <dt className="text-sm font-medium text-gray-600">Product Name</dt>
                  <dd className="text-sm text-gray-900">{productName}</dd>
                  <dt className="text-sm font-medium text-gray-600">Stock</dt>
                  <dd className="text-sm text-gray-900">{productStock}</dd>
                  <dt className="text-sm font-medium text-gray-600">Price</dt>
                  <dd className="text-sm text-gray-900">Ksh {productPrice}</dd>
                  <dt className="text-sm font-medium text-gray-600">Category</dt>
                  <dd className="text-sm text-gray-900">{selectedCategory}</dd>
                  {Object.entries(selectedValues).map(([key, value]) => (
                    <Fragment key={key}>
                      <dt className="text-sm font-medium text-gray-600">{key}</dt>
                      <dd className="text-sm text-gray-900">{value}</dd>
                    </Fragment>
                  ))}
                  {sellerId && (
                    <>
                      <dt className="text-sm font-medium text-gray-600">Seller ID</dt>
                      <dd className="text-sm text-gray-900">{sellerId}</dd>
                    </>
                  )}
                </dl>
              </div>
            )}

            {/* Form Actions *
            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                disabled={isSubmitting || isFetchingSeller}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#0f1c47] text-white rounded-lg hover:bg-[#1a2d5a] transition-colors disabled:opacity-50"
                disabled={isSubmitting || isFetchingSeller || (user?.role === 'seller' && !sellerId)}
              >
                {isSubmitting ? "Creating..." : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};*/

import { Fragment } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productCategories: Record<string, {
    label: string;
    attributes: Record<string, string[]>;
  }>;
  selectedCategory: string | null;
  handleCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  productName: string;
  setProductName: (value: string) => void;
  productStock: string;
  setProductStock: (value: string) => void;
  productPrice: string;
  setProductPrice: (value: string) => void;
  attributeKeys: string[];
  selectedValues: Record<string, string>;
  handleAttributeChange: (key: string, value: string) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  images: File[];
  removeImage: (index: number) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  sellerId: string | null;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  productCategories,
  selectedCategory,
  handleCategoryChange,
  productName,
  setProductName,
  productStock,
  setProductStock,
  productPrice,
  setProductPrice,
  attributeKeys,
  selectedValues,
  handleAttributeChange,
  handleImageUpload,
  images,
  removeImage,
  handleSubmit,
  isSubmitting,
  sellerId
}) => {
  const { user } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#0f1c47]">Add New Product</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              disabled={isSubmitting}
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Basics Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#0f1c47] border-b pb-2">Product Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name*</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent"
                    onChange={handleCategoryChange}
                    value={selectedCategory || ""}
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Select Category</option>
                    {Object.keys(productCategories).map((key) => (
                      <option key={key} value={key}>
                        {productCategories[key].label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity*</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent"
                    value={productStock}
                    onChange={(e) => setProductStock(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (Ksh)*</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            {/* Product Attributes Section */}
            {selectedCategory && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#0f1c47] border-b pb-2">Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {attributeKeys.map((attribute) => (
                    <div key={attribute}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{attribute}*</label>
                      <select
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent"
                        onChange={(e) => handleAttributeChange(attribute, e.target.value)}
                        value={selectedValues[attribute] || ""}
                        required
                        disabled={isSubmitting}
                      >
                        <option value="">Select {attribute}</option>
                        {productCategories[selectedCategory].attributes[attribute].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Image Upload Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#0f1c47] border-b pb-2">Product Images</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#0f1c47] transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                  disabled={isSubmitting}
                />
                <label 
                  htmlFor="imageUpload" 
                  className={`cursor-pointer ${isSubmitting ? 'opacity-50' : ''}`}
                >
                  <div className="mb-2 text-[#0f1c47]">
                    <FiPlus className="w-8 h-8 mx-auto" />
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
                        disabled={isSubmitting}
                      >
                        <FiTrash className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Summary Section */}
            {selectedCategory && Object.keys(selectedValues).length === attributeKeys.length && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-[#0f1c47] mb-3">Summary</h3>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <dt className="text-sm font-medium text-gray-600">Product Name</dt>
                  <dd className="text-sm text-gray-900">{productName}</dd>
                  <dt className="text-sm font-medium text-gray-600">Stock</dt>
                  <dd className="text-sm text-gray-900">{productStock}</dd>
                  <dt className="text-sm font-medium text-gray-600">Price</dt>
                  <dd className="text-sm text-gray-900">Ksh {productPrice}</dd>
                  <dt className="text-sm font-medium text-gray-600">Category</dt>
                  <dd className="text-sm text-gray-900">{selectedCategory}</dd>
                  {Object.entries(selectedValues).map(([key, value]) => (
                    <Fragment key={key}>
                      <dt className="text-sm font-medium text-gray-600">{key}</dt>
                      <dd className="text-sm text-gray-900">{value}</dd>
                    </Fragment>
                  ))}
                  {sellerId && (
                    <>
                      <dt className="text-sm font-medium text-gray-600">Seller ID</dt>
                      <dd className="text-sm text-gray-900">{sellerId}</dd>
                    </>
                  )}
                </dl>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#0f1c47] text-white rounded-lg hover:bg-[#1a2d5a] transition-colors disabled:opacity-50"
                disabled={isSubmitting || (user?.role === 'seller' && !sellerId)}
              >
                {isSubmitting ? "Creating..." : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};