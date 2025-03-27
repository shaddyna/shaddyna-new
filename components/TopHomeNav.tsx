"use client";

import { useState } from "react";
import Link from "next/link";
import { UserAccountIcon } from "hugeicons-react";
import { PlusCircleIcon } from "lucide-react";
import { FiPlus, FiTrash } from "react-icons/fi";

export default function TopHomeNav() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
  const [images, setImages] = useState<File[]>([]);

  // Mock product categories - replace with your actual data
  const productCategories: Record<string, {
    label: string;
    attributes: Record<string, string[]>;
  }> = {
    electronics: {
      label: "Electronics",
      attributes: {
        Brand: ["Apple", "Samsung", "Sony", "LG"],
        Condition: ["New", "Refurbished", "Used"],
      },
    },
    clothing: {
      label: "Clothing",
      attributes: {
        Size: ["S", "M", "L", "XL"],
        Color: ["Red", "Blue", "Black", "White"],
      },
    },
  };

  const attributeKeys = selectedCategory 
    ? Object.keys(productCategories[selectedCategory].attributes) 
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log({
      productName,
      productStock,
      productPrice,
      selectedCategory,
      selectedValues,
      images,
    });
    // Reset form
    setProductName("");
    setProductStock("");
    setProductPrice("");
    setSelectedCategory(null);
    setSelectedValues({});
    setImages([]);
    setIsModalOpen(false);
  };

  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-white shadow-md border-b lg:hidden">
        <h1 className="text-lg font-bold text-[#0f1c47]">Shaddyna</h1>
        <div className="flex items-center space-x-4">
          <button onClick={() => setIsModalOpen(true)}>
            <PlusCircleIcon size={24} className="text-[#0f1c47] hover:text-black transition" />
          </button>
          <Link href="/profile">
            <UserAccountIcon size={24} className="text-[#0f1c47] hover:text-black transition" />
          </Link>
        </div>
      </nav>

      {/* Product Adding Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#0f1c47]">Add New Product</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent text-[#0f1c47]"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent text-[#0f1c47]"
                        onChange={handleCategoryChange}
                        value={selectedCategory || ""}
                      >
                        <option value="" className="text-gray-400">Select Category</option>
                        {Object.keys(productCategories).map((key) => (
                          <option key={key} value={key} className="text-[#0f1c47]">
                            {productCategories[key].label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent text-[#0f1c47]"
                        value={productStock}
                        onChange={(e) => setProductStock(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (Ksh)</label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent text-[#0f1c47]"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        required
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
                          <label className="block text-sm font-medium text-gray-700 mb-1">{attribute}</label>
                          <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent text-[#0f1c47]"
                            onChange={(e) => handleAttributeChange(attribute, e.target.value)}
                            value={selectedValues[attribute] || ""}
                          >
                            <option value="" className="text-gray-400">Select {attribute}</option>
                            {productCategories[selectedCategory].attributes[attribute].map((option) => (
                              <option key={option} value={option} className="text-[#0f1c47]">
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
                    />
                    <label htmlFor="imageUpload" className="cursor-pointer">
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
                        <div key={key} className="col-span-2 grid grid-cols-2">
                          <dt className="text-sm font-medium text-gray-600">{key}</dt>
                          <dd className="text-sm text-gray-900">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {/* Form Actions */}
                <div className="flex justify-end gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#0f1c47] text-white rounded-lg hover:bg-[#1a2d5a] transition-colors"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}