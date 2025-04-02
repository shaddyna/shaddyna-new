"use client";
import { useParams, useRouter } from 'next/navigation';
import { FiArrowLeft, FiFacebook, FiHeart, FiInstagram, FiShoppingCart, FiTwitter, FiFileText } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import axios from 'axios';

interface Shop {
  createdAt: string | number | Date;
  _id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  rating: number;
  productsCount: number;
  joinDate: string;
  contact: string;
  email: string;
  successfulSalesCount: number;
  products: Array<{ name: string; price: string; image: string }>;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  openingHours?: string;
  legalDocuments?: {
    businessLicense?: string;
    taxCertificate?: string;
    healthPermit?: string;
    otherCertifications?: string[];
  };
}

interface Product {
  shelfId: string;
  images: string[];
  _id: string;
  name: string;
  price: number;
  image: string;
  sellerId: string;
  rating: number;
}


const ShopDetailsPage = () => {
  const { shopId } = useParams();
  const router = useRouter();
  
  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeDocTab, setActiveDocTab] = useState('businessLicense');
  
  // State for scroll position and header effects
  const [scrollY, setScrollY] = useState(0);
  const [imageScale, setImageScale] = useState(1);
  const [imageTranslateY, setImageTranslateY] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const fetchShopDetails = async () => {
      if (!shopId) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch shop details
        const { data: shopResponse } = await axios.get(
          `http://localhost:5000/api/shops/${shopId}`
        );

        const { shop: shopData } = shopResponse;
        const sellerId = shopData?.sellerId?._id || shopData?.sellerId;

        // Add mock legal documents if none exist
        const shopWithDocs = {
          ...shopData,
          legalDocuments: shopData.legalDocuments || {
            businessLicense: 'https://example.com/license.pdf',
            taxCertificate: 'https://example.com/tax-certificate.pdf',
            healthPermit: shopData.category === 'food' ? 'https://example.com/health-permit.pdf' : undefined,
            otherCertifications: [
              'https://example.com/cert1.pdf',
              'https://example.com/cert2.pdf'
            ]
          }
        };

        setShop(shopWithDocs);

        // Fetch all products
        const { data: productsResponse } = await axios.get(
          `https://shaddyna-backend.onrender.com/api/products/all`
        );

        // Filter products by sellerId
        const shopProducts = productsResponse.products.filter(
          (product: Product) => product.sellerId?.toString() === sellerId?.toString()
        );

        setProducts(shopProducts);
      } catch (error) {
        console.error("Error fetching shop details:", error);
        setError("Failed to fetch shop details");
      } finally {
        setLoading(false);
      }
    };

    fetchShopDetails();
  }, [shopId]);

  // Update scroll position and header effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const scale = Math.max(0.5, 1 - window.scrollY / 300);
      const translateY = Math.min(50, window.scrollY / 2);
      const opacity = Math.max(0, 1 - window.scrollY / 200);
      setImageScale(scale);
      setImageTranslateY(translateY);
      setOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  interface DocumentInfo {
    title: string;
    url: string | undefined;
    description: string;
    hidden?: boolean;
  }
  
  const renderDocumentPreview = () => {
    if (!shop?.legalDocuments) return null;
  
    const documents: Record<string, DocumentInfo> = {
      businessLicense: {
        title: "Business License",
        url: shop.legalDocuments.businessLicense,
        description: "Official government authorization to operate this business"
      },
      taxCertificate: {
        title: "Tax Certificate",
        url: shop.legalDocuments.taxCertificate,
        description: "Proof of tax compliance and registration"
      },
      healthPermit: {
        title: "Health Permit",
        url: shop.legalDocuments.healthPermit,
        description: "Certification of health and safety standards compliance",
        hidden: !shop.legalDocuments.healthPermit
      }
    };
  
    const activeDoc = documents[activeDocTab as keyof typeof documents];
  
    if (!activeDoc || activeDoc.hidden) return (
      <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center justify-center h-64">
        <FiFileText className="text-4xl text-gray-300 mb-4" />
        <p className="text-gray-500 text-center">Document not available for this business</p>
      </div>
    );
  
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden h-64">
        <div className="bg-gray-50 p-4 border-b border-gray-200">
          <h3 className="font-bold text-[#0f1c47]">{activeDoc.title}</h3>
          <p className="text-sm text-gray-500">{activeDoc.description}</p>
        </div>
        <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="text-center p-6">
            <FiFileText className="mx-auto text-5xl text-[#0f1c47] mb-4" />
            {activeDoc.url ? (
              <a 
                href={activeDoc.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-[#0f1c47] text-white px-6 py-2 rounded-full font-medium hover:bg-[#2a3a8a] transition"
              >
                View Full Document
              </a>
            ) : (
              <button className="inline-block bg-gray-300 text-white px-6 py-2 rounded-full font-medium cursor-not-allowed">
                Document Unavailable
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div>Loading shop details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div>Shop not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Floating Back Button (Always Visible) */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => router.back()}
          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          <FiArrowLeft className="text-[#0f1c47] text-lg" />
        </button>
      </div>

      {/* Sticky Header (Appears After Scrolling) */}
      {scrollY > 100 && (
        <div className="fixed top-0 left-0 w-full bg-gradient-to-b from-[#0f1c47] to-[#2a3a8a] text-white shadow-md z-50 py-3 transition-all duration-300">
          <div className="container mx-auto px-6 flex items-center gap-4">
            {/* Back Button (Reused in Sticky Bar) */}
            <button
              onClick={() => router.back()}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
            >
              <FiArrowLeft className="text-[#0f1c47] text-lg" />
            </button>

            {/* Shrunk Shop Image & Name */}
            <div className="relative w-12 h-12">
              <img
                src={shop.image}
                alt={shop.name}
                className="w-full h-full rounded-full border-2 border-[#bf2c7e] shadow-lg object-cover"
              />
            </div>
            <h1 className="text-lg font-bold">{shop.name}</h1>
          </div>
        </div>
      )}

      {/* Full Header (Initial View with Shrinking Effect) */}
      <div className="bg-gradient-to-b from-[#0f1c47] to-[#2a3a8a] text-white py-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-6">
          {/* Large Shop Image with Shrinking Effect */}
          <div
            className="relative w-32 h-32 transition-transform duration-300"
            style={{
              transform: `scale(${imageScale}) translateY(${imageTranslateY}px)`,
              opacity: opacity,
            }}
          >
            <img
              src={shop.image}
              alt={shop.name}
              className="w-full h-full rounded-full border-4 border-[#bf2c7e] shadow-lg object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-[#bf2c7e] rounded-full px-3 py-1 text-xs font-bold shadow-md">
              ⭐ {shop.rating?.toFixed(1) || '4.5'}
            </div>
          </div>

          {/* Shop Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{shop.name}</h1>
            <p className="text-sm flex justify-center md:justify-start gap-4 text-gray-300">
              <span>📍 {shop.location}</span>
              <span>🛍️ {products.length} products</span>
            </p>

            {/* Social Links */}
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              {[
                { icon: FiFacebook, link: shop.socialLinks?.facebook || "#" },
                { icon: FiInstagram, link: shop.socialLinks?.instagram || "#" },
                { icon: FiTwitter, link: shop.socialLinks?.twitter || "#" },
              ].map(({ icon: Icon, link }, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#bf2c7e] transition transform hover:scale-110"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Shop Details Section */}
      <div className="container mx-auto p-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Shop Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#0f1c47]">About</h2>
              <p className="text-gray-600">{shop.description}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#0f1c47]">Details</h2>
              <div className="space-y-2">
                <p className="text-gray-600">📍 {shop.location}</p>
                <p className="text-gray-600">📞 {shop.contact}</p>
                {shop.openingHours && (
                  <p className="text-gray-600">🕒 {shop.openingHours}</p>
                )}
                <p className="text-gray-600">📧 {shop.email}</p>
                <p className="text-gray-600">🏆 {shop.successfulSalesCount} successful sales</p>
              </div>
            </div>
          </div>

          {/* Right Column - Legal Documents */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#0f1c47]">Legal Documents</h2>
              <p className="text-gray-500 text-sm mb-4">
                Verified business credentials and certifications
              </p>
              
              {/* Document Tabs */}
              <div className="flex border-b border-gray-200 mb-4">
                {[
                  { id: 'businessLicense', label: 'License' },
                  { id: 'taxCertificate', label: 'Tax Cert' },
                  ...(shop.legalDocuments?.healthPermit ? [{ id: 'healthPermit', label: 'Health' }] : [])
                ].map((tab) => (
                  <button
                    key={tab.id}
                    className={`px-4 py-2 font-medium text-sm ${activeDocTab === tab.id ? 'text-[#0f1c47] border-b-2 border-[#0f1c47]' : 'text-gray-500 hover:text-[#0f1c47]'}`}
                    onClick={() => setActiveDocTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Document Preview */}
              {renderDocumentPreview()}

              {/* Additional Certifications */}
              {shop.legalDocuments?.otherCertifications && shop.legalDocuments.otherCertifications.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-[#0f1c47] mb-2">Additional Certifications</h4>
                  <div className="space-y-2">
                    {shop.legalDocuments.otherCertifications.map((cert, index) => (
                      <a
                        key={index}
                        href={cert}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-gray-600 hover:text-[#0f1c47]"
                      >
                        <FiFileText className="mr-2 text-[#bf2c7e]" />
                        Certification {index + 1}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="mt-12 px-0 sm:px-0">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0f1c47] mb-4 sm:mb-6">
            Products
          </h2>

          {products.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No products available in this shop yet.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white p-2 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-[#0f1c47]/10"
                >
                  {/* Product Image */}
                  <div className="w-full h-32 sm:h-40 md:h-48 rounded-lg overflow-hidden mb-3">
                    <img
                      src={product.image || product.images?.[0] || 'https://via.placeholder.com/150'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onClick={() => router.push(`/products/${product._id}`)}
                    />
                  </div>

                  {/* Product Details */}
                  <h3 className="text-sm sm:text-lg font-bold text-[#0f1c47] truncate">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#bf2c7e] font-medium">
                    KES {product.price}
                  </p>

                  {/* Rating Stars */}
                  <div className="flex items-center mt-1 sm:mt-2">
                    {[...Array(5)].map((_, i) => (
                      i < Math.floor(product.rating || 4) ? (
                        <AiFillStar key={i} className="text-yellow-400 text-xs sm:text-base" />
                      ) : (
                        <AiOutlineStar key={i} className="text-gray-300 text-xs sm:text-base" />
                      )
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-between items-center mt-3 sm:mt-4">
                    {/* Add to Cart Button */}
                    <button
                      className="bg-[#0f1c47] text-white py-1 px-2 sm:py-1.5 sm:px-4 rounded-full font-bold text-[10px] sm:text-sm shadow-md hover:scale-105 flex items-center gap-1"
                    >
                      <FiShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                      Add
                    </button>

                    {/* Wishlist Button */}
                    <button className="text-[#bf2c7e] hover:text-red-600 transition-transform hover:scale-110">
                      <FiHeart className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopDetailsPage;

{/*"use client";
import { useParams, useRouter } from 'next/navigation';
import { FiArrowLeft, FiFacebook, FiHeart, FiInstagram, FiShoppingCart, FiTwitter } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import axios from 'axios';

interface Shop {
  createdAt: string | number | Date;
  _id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  rating: number;
  productsCount: number;
  joinDate: string;
  contact: string;
  email: string;
  successfulSalesCount: number;
  products: Array<{ name: string; price: string; image: string }>;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  openingHours?: string;
}

interface Product {
  shelfId: string;
  images: string[];
  _id: string;
  name: string;
  price: number;
  image: string;
  sellerId: string;
  rating: number;
}

const ShopDetailsPage = () => {
  const { shopId } = useParams();
  const router = useRouter();
  
  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for scroll position and header effects
  const [scrollY, setScrollY] = useState(0);
  const [imageScale, setImageScale] = useState(1);
  const [imageTranslateY, setImageTranslateY] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const fetchShopDetails = async () => {
      if (!shopId) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch shop details
        const { data: shopResponse } = await axios.get(
          `https://shaddyna-backend.onrender.com/api/shops/${shopId}`
        );

        const { shop: shopData } = shopResponse;
        const sellerId = shopData?.sellerId?._id || shopData?.sellerId;

        setShop(shopData);

        // Fetch all products
        const { data: productsResponse } = await axios.get(
          `https://shaddyna-backend.onrender.com/api/products/all`
        );

        // Filter products by sellerId
        const shopProducts = productsResponse.products.filter(
          (product: Product) => product.sellerId?.toString() === sellerId?.toString()
        );

        setProducts(shopProducts);
      } catch (error) {
        console.error("Error fetching shop details:", error);
        setError("Failed to fetch shop details");
      } finally {
        setLoading(false);
      }
    };

    fetchShopDetails();
  }, [shopId]);

  // Update scroll position and header effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const scale = Math.max(0.5, 1 - window.scrollY / 300);
      const translateY = Math.min(50, window.scrollY / 2);
      const opacity = Math.max(0, 1 - window.scrollY / 200);
      setImageScale(scale);
      setImageTranslateY(translateY);
      setOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div>Loading shop details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div>Shop not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Floating Back Button (Always Visible) *
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => router.back()}
          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          <FiArrowLeft className="text-[#0f1c47] text-lg" />
        </button>
      </div>

      {/* Sticky Header (Appears After Scrolling) *
      {scrollY > 100 && (
        <div className="fixed top-0 left-0 w-full bg-gradient-to-b from-[#0f1c47] to-[#2a3a8a] text-white shadow-md z-50 py-3 transition-all duration-300">
          <div className="container mx-auto px-6 flex items-center gap-4">
            {/* Back Button (Reused in Sticky Bar) *
            <button
              onClick={() => router.back()}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
            >
              <FiArrowLeft className="text-[#0f1c47] text-lg" />
            </button>

            {/* Shrunk Shop Image & Name *
            <div className="relative w-12 h-12">
              <img
                src={shop.image}
                alt={shop.name}
                className="w-full h-full rounded-full border-2 border-[#bf2c7e] shadow-lg object-cover"
              />
            </div>
            <h1 className="text-lg font-bold">{shop.name}</h1>
          </div>
        </div>
      )}

      {/* Full Header (Initial View with Shrinking Effect) *
      <div className="bg-gradient-to-b from-[#0f1c47] to-[#2a3a8a] text-white py-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-6">
          {/* Large Shop Image with Shrinking Effect *
          <div
            className="relative w-32 h-32 transition-transform duration-300"
            style={{
              transform: `scale(${imageScale}) translateY(${imageTranslateY}px)`,
              opacity: opacity,
            }}
          >
            <img
              src={shop.image}
              alt={shop.name}
              className="w-full h-full rounded-full border-4 border-[#bf2c7e] shadow-lg object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-[#bf2c7e] rounded-full px-3 py-1 text-xs font-bold shadow-md">
              ⭐ {shop.rating?.toFixed(1) || '4.5'}
            </div>
          </div>

          {/* Shop Info *
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{shop.name}</h1>
            <p className="text-sm flex justify-center md:justify-start gap-4 text-gray-300">
              <span>📍 {shop.location}</span>
              <span>🛍️ {products.length} products</span>
            </p>

            {/* Social Links *
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              {[
                { icon: FiFacebook, link: shop.socialLinks?.facebook || "#" },
                { icon: FiInstagram, link: shop.socialLinks?.instagram || "#" },
                { icon: FiTwitter, link: shop.socialLinks?.twitter || "#" },
              ].map(({ icon: Icon, link }, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#bf2c7e] transition transform hover:scale-110"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Shop Details Section *
      <div className="container mx-auto p-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shop Details *
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#0f1c47]">About</h2>
              <p className="text-gray-600">{shop.description}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#0f1c47]">Details</h2>
              <div className="space-y-2">
                <p className="text-gray-600">📍 {shop.location}</p>
                <p className="text-gray-600">📞 {shop.contact}</p>
                {shop.openingHours && (
                  <p className="text-gray-600">🕒 {shop.openingHours}</p>
                )}
                <p className="text-gray-600">📧 {shop.email}</p>
                <p className="text-gray-600">🏆 {shop.successfulSalesCount} successful sales</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section *
        <div className="mt-4 px-0 sm:px-0">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0f1c47] mb-4 sm:mb-3">
            Products
          </h2>

          {products.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No products available in this shop yet.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white p-2 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-[#0f1c47]/10"
                >
                  {/* Product Image *
                  <div className="w-full h-32 sm:h-40 md:h-48 rounded-lg overflow-hidden mb-3">
                    <img
                      src={product.image || product.images?.[0] || 'https://via.placeholder.com/150'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onClick={() => router.push(`/products/${product._id}`)}
                    />
                  </div>

                  {/* Product Details *
                  <h3 className="text-sm sm:text-lg font-bold text-[#0f1c47] truncate">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#bf2c7e] font-medium">
                    KES {product.price}
                  </p>

                  {/* Rating Stars *
                  <div className="flex items-center mt-1 sm:mt-2">
                    {[...Array(5)].map((_, i) => (
                      i < Math.floor(product.rating || 4) ? (
                        <AiFillStar key={i} className="text-yellow-400 text-xs sm:text-base" />
                      ) : (
                        <AiOutlineStar key={i} className="text-gray-300 text-xs sm:text-base" />
                      )
                    ))}
                  </div>

                  {/* Buttons *
                  <div className="flex justify-between items-center mt-3 sm:mt-4">
                    {/* Add to Cart Button *
                    <button
                      className="bg-[#0f1c47] text-white py-1 px-2 sm:py-1.5 sm:px-4 rounded-full font-bold text-[10px] sm:text-sm shadow-md hover:scale-105 flex items-center gap-1"
                    >
                      <FiShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                      Add
                    </button>

                    {/* Wishlist Button *
                    <button className="text-[#bf2c7e] hover:text-red-600 transition-transform hover:scale-110">
                      <FiHeart className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopDetailsPage;*/}