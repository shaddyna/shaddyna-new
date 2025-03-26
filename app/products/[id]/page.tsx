"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiShoppingCart, FiHeart, FiArrowLeft, FiShare2 } from 'react-icons/fi';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';


interface ProductDetail {
  id: string;
  name: string;
  description: string;
  price?: number;
  images: string[];
  rating?: number;
  stock?: number;
  category?: string;
  attributes: Record<string, string>;
  isNew?: boolean;
  isDiscounted?: boolean;
  originalPrice?: number;
}

// Correct the type definition
interface ProductDetailPageProps {
  params: { id: string };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const router = useRouter();
  const productId = params.id;
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);


{/*'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiShoppingCart, FiHeart, FiArrowLeft, FiShare2 } from 'react-icons/fi';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface ProductDetail {
  id: string;
  name: string;
  description: string;
  price?: number;
  images: string[];
  rating?: number;
  stock?: number;
  category?: string;
  attributes: Record<string, string>;
  isNew?: boolean;
  isDiscounted?: boolean;
  originalPrice?: number;
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const productId = params.id;
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);*/}

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(
          `https://shaddyna-backend.onrender.com/api/products/${productId}`
        );
        if (!response.ok) throw new Error("Failed to fetch product details");
        
        const data = await response.json();

        const formattedProduct: ProductDetail = {
          id: data.product._id,
          name: data.product.name,
          description: data.product.description || "No Description Available",
          price: data.product.price,
          images: data.product.images || ["https://placehold.co/1200x1200?text=No+Image"],
          rating: data.product.rating || 0,
          stock: data.product.stock,
          category: data.product.category,
          attributes: data.product.attributes || {},
          isNew: data.product.isNew,
          isDiscounted: data.product.isDiscounted,
          originalPrice: data.product.originalPrice
        };

        setProduct(formattedProduct);
        setSelectedImage(formattedProduct.images[0]);
        setError(null);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) fetchProductDetail();
  }, [productId]);

  const handleQuantityChange = (value: number) => {
    if (value < 1) return;
    setQuantity(value);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="rounded-full bg-[#bf2c7e]/20 h-16 w-16"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
        <div className="bg-white p-6 rounded-xl shadow-sm max-w-md w-full text-center">
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            {error}
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 bg-[#0f1c47] text-white py-2 px-6 rounded-lg font-medium hover:bg-[#0f1c47]/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
        <div className="bg-white p-6 rounded-xl shadow-sm max-w-md w-full text-center">
          <p className="text-gray-700 mb-6">Product not found</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-[#0f1c47] text-white py-2 px-6 rounded-lg font-medium hover:bg-[#0f1c47]/90 transition-colors"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-gray-700 hover:text-[#bf2c7e] transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-[#bf2c7e] transition-colors">
              <FiShare2 className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-[#bf2c7e] transition-colors relative">
              <FiHeart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-opacity duration-300"
                  loading="eager"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {product.isNew && (
                    <span className="text-xs font-semibold bg-green-600 text-white px-3 py-1 rounded-full shadow-sm">
                      New Arrival
                    </span>
                  )}
                  {product.isDiscounted && (
                    <span className="text-xs font-semibold bg-[#bf2c7e] text-white px-3 py-1 rounded-full shadow-sm">
                      {`Math.round(((product.originalPrice! - product.price!) / product.originalPrice!) * 100`}% Off
                    </span>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`aspect-square rounded-lg overflow-hidden transition-all duration-200 ${selectedImage === image ? 'ring-2 ring-[#bf2c7e]' : 'hover:ring-1 hover:ring-gray-300'}`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-3">
                  {product.category}
                </p>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      i < (product.rating || 0) ? (
                        <AiFillStar key={i} className="text-yellow-400 w-5 h-5" />
                      ) : (
                        <AiOutlineStar key={i} className="text-gray-300 w-5 h-5" />
                      )
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({product.rating})</span>
                  <span className="text-sm text-gray-500 ml-2">•</span>
                  <span className="text-sm text-green-600 font-medium">
                    {product.stock && product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-[#bf2c7e]">
                    Ksh{(product.price ?? 0).toLocaleString()}
                  </span>
                  {product.isDiscounted && product.originalPrice && (
                    <span className="text-base text-gray-400 line-through">
                      Ksh{(product.originalPrice ?? 0).toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
                  <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
                </div>

                {Object.keys(product.attributes).length > 0 && (
                  <div className="pt-4 border-t border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {Object.entries(product.attributes).map(([key, value]) => (
                        <li key={key} className="text-sm flex">
                          <span className="font-medium text-gray-700 min-w-[120px]">{key}:</span>
                          <span className="text-gray-600">{value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button 
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-center w-12">{quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.stock} available
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button className="flex-1 bg-[#0f1c47] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#0f1c47]/90 transition-colors flex items-center justify-center gap-2">
                    <FiShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </button>
                  <button className="flex-1 bg-white border border-[#0f1c47] text-[#0f1c47] py-3 px-6 rounded-lg font-medium hover:bg-[#0f1c47]/5 transition-colors flex items-center justify-center gap-2">
                    <FiHeart className="h-5 w-5" />
                    Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Related Products Section (optional) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">You may also like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {/* Placeholder for related products */}
          <div className="bg-gray-100 aspect-[3/4] rounded-lg animate-pulse"></div>
          <div className="bg-gray-100 aspect-[3/4] rounded-lg animate-pulse"></div>
          <div className="bg-gray-100 aspect-[3/4] rounded-lg animate-pulse"></div>
          <div className="bg-gray-100 aspect-[3/4] rounded-lg animate-pulse"></div>
        </div>
      </section>
    </div>
  );
}