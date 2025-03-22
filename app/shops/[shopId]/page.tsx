"use client";
import { useParams, useRouter } from 'next/navigation';
import { FiArrowLeft, FiFacebook, FiHeart, FiInstagram, FiShoppingCart, FiTwitter } from 'react-icons/fi'; // Nove icons
import { useState, useEffect } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

// Dummy data generators
const categories = ['Fashion', 'Electronics', 'Food', 'Home Goods', 'Art'];
const shops = [...Array(9)].map((_, i) => ({
  id: i,
  name: `Shop ${i + 1}`,
  category: categories[i % 5],
  rating: (4 + Math.random()).toFixed(1),
  products: Math.floor(Math.random() * 100),
  description: `Specializing in ${categories[i % 5]} products and services`,
  owner: `Owner ${i + 1}`,
  social: ['twitter', 'instagram'],
  isFeatured: i < 2,
  image: `https://picsum.photos/300/200?random=${i}`, // Placeholder image URL
  location: 'Nairobi, Kenya', // Added location
  contact: '+254 700 000 000', // Added contact
  openingHours: '9:00 AM - 6:00 PM', // Added opening hours
  productsList: [
    {
      id: i * 10 + 1,
      name: `Product ${i * 10 + 1}`,
      price: `KES ${Math.floor(Math.random() * 1000) + 500}`,
      image: `https://picsum.photos/150/150?random=${i * 10 + 1}`,
    },
    {
      id: i * 10 + 2,
      name: `Product ${i * 10 + 2}`,
      price: `KES ${Math.floor(Math.random() * 1000) + 500}`,
      image: `https://picsum.photos/150/150?random=${i * 10 + 2}`,
    },
    {
      id: i * 10 + 3,
      name: `Product ${i * 10 + 3}`,
      price: `KES ${Math.floor(Math.random() * 1000) + 500}`,
      image: `https://picsum.photos/150/150?random=${i * 10 + 3}`,
    },
  ], // Added dummy products
}));

const ShopDetailsPage = () => {
  const { shopId } = useParams(); // Get shopId from URL
  const router = useRouter(); // Initialize useRouter
  const shop = shops.find((s) => s.id === Number(shopId)); // Find the shop by ID

  // State for scroll position and header effects
  const [scrollY, setScrollY] = useState(0);
  const [imageScale, setImageScale] = useState(1);
  const [imageTranslateY, setImageTranslateY] = useState(0);
  const [opacity, setOpacity] = useState(1);

  // Update scroll position and header effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const scale = Math.max(0.5, 1 - window.scrollY / 300); // Shrink image scale
      const translateY = Math.min(50, window.scrollY / 2); // Translate image vertically
      const opacity = Math.max(0, 1 - window.scrollY / 200); // Fade out image
      setImageScale(scale);
      setImageTranslateY(translateY);
      setOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!shop) {
    return <div>Shop not found</div>;
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
              ⭐ {shop.rating}
            </div>
          </div>

          {/* Shop Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{shop.name}</h1>
            <p className="text-sm flex justify-center md:justify-start gap-4 text-gray-300">
              <span>📍 {shop.location}</span>
              <span>🛍️ {shop.productsList.length} products</span>
            </p>

            {/* Social Links */}
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              {[
                { icon: FiFacebook, link: "#" },
                { icon: FiInstagram, link: "#" },
                { icon: FiTwitter, link: "#" },
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shop Details */}
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
                <p className="text-gray-600">🕒 {shop.openingHours}</p>
              </div>
            </div>
          </div>
        </div>
{/* Products Section */}
<div className="mt-4 px-2 sm:px-0">
  <h2 className="text-xl sm:text-2xl font-bold text-[#0f1c47] mb-4 sm:mb-3">
    Products
  </h2>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
    {shop.productsList.map((product) => (
      <div
        key={product.id}
        className="bg-white p-2 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-[#0f1c47]/10"
      >
        {/* Product Image */}
        <div className="w-full h-32 sm:h-40 md:h-48 rounded-lg overflow-hidden mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onClick={() => router.push(`/product/${product.id}`)}
          />
        </div>

        {/* Product Details */}
        <h3 className="text-sm sm:text-lg font-bold text-[#0f1c47] truncate">
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm text-[#bf2c7e] font-medium">
          {product.price}
        </p>

        {/* Rating Stars */}
        <div className="flex items-center mt-1 sm:mt-2">
          {[...Array(5)].map((_, i) => (
            i < Math.floor(product.id) ? (
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
</div>

      </div>
    </div>
  );
};

export default ShopDetailsPage;