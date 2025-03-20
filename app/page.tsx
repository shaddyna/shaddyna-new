

import HeroCarousel from '@/components/HeroCarousel';
import ActivitiesList from '@/components/ActivitiesList';
import EventsList from '@/components/EventsList';
import 'swiper/css';
import 'swiper/css/pagination';
import FeaturedShops from '@/components/FeaturedShops';
import ExploreShelves from '@/components/ExploreShelves';
import LatestSkillPosts from '@/components/LatestSkillPosts';
import FinancialSummary from '@/components/FinancialSummary';

// Dummy data for FeaturedShops
const featuredShops = [
  {
    id: 1,
    name: "Tech Haven",
    items: ["Wireless Earbuds Pro", "Smart Home Kit", "4K Webcam"],
    icon: "💻"
  },
  {
    id: 2,
    name: "Urban Threads",
    items: ["Designer Backpacks", "Limited Edition Sneakers", "Organic Cotton Tees"],
    icon: "👕"
  },
  {
    id: 3,
    name: "Green Living",
    items: ["Smart Planters", "Solar Chargers", "Eco Yoga Mats"],
    icon: "🌿"
  }
];

// Dummy data for ExploreShelves
const shelves = [
  { 
    category: 'Tech Innovation', 
    members: 45,
    icon: '🚀',
    description: 'Building the future of technology'
  },
  { 
    category: 'Fashion Collabs', 
    members: 32,
    icon: '👗',
    description: 'Redefining modern fashion trends'
  },
  { 
    category: 'Community Investments', 
    members: 28,
    icon: '🤝',
    description: 'Local community development projects'
  }
];

// Dummy data for LatestSkillPosts
const skills = [
  'Full Stack Development',
  'UI/UX Design',
  'Digital Marketing Strategy',
  '3D Product Modeling',
  'Blockchain Development',
  'AI/ML Engineering'
];

// Dummy data for Financial Summary (static values)
const financialData = {
  walletBalance: 8430.50,
  activeInvestments: 25500.00,
  recentEarnings: 2340.75,
  recentTransactions: [
    { date: '2024-03-15', description: 'Shop Earnings', amount: 1200.00 },
    { date: '2024-03-14', description: 'Shelf Investment', amount: -500.00 },
    { date: '2024-03-13', description: 'Withdrawal', amount: -200.00 }
  ]
};

// Existing activities data
const activities = [
  'Emma launched "Green Living" shop',
  'New investment in Tech Innovation shelf',
  'Alex posted Blockchain Development skill'
];

// Existing events data
const events = [
  'Investor Networking Night',
  'E-commerce Workshop',
  'Sustainability Summit'
];

// Updated dummy data
const categories = [
  { name: 'Electronics', icon: '📱' },
  { name: 'Fashion', icon: '👗' },
  { name: 'Home & Living', icon: '🏠' },
  { name: 'Beauty', icon: '💄' },
  { name: 'Sports', icon: '⚽' },
  { name: 'Books', icon: '📚' },
];

const products = {
  new: [...Array(5)].map((_, i) => ({
    id: i,
    name: `New Product ${i+1}`,
    price: `Ksh${(99.99 - i*10).toFixed(2)}`,
    shop: `Shop ${i+1}`,
    image: `https://placehold.co/300x200?text=Product+${i+1}`
  })),
  trending: [...Array(5)].map((_, i) => ({
    id: i,
    name: `Trending Item ${i+1}`,
    price: `Ksh${(79.99 - i*8).toFixed(2)}`,
    shop: `Store ${i+1}`,
    image: `https://placehold.co/300x200?text=Trending+${i+1}`
  })),
  discounted: [...Array(5)].map((_, i) => ({
    id: i,
    name: `Sale Item ${i+1}`,
    originalPrice: `$${129.99}`,
    price: `Ksh${(89.99 - i*10).toFixed(2)}`,
    shop: `Outlet ${i+1}`,
    image: `https://placehold.co/300x200?text=Sale+${i+1}`
  }))
};

const brands = [...Array(8)].map((_, i) => ({
  id: i,
  name: `Brand ${i+1}`,
  logo: `https://placehold.co/100x50?text=Brand+${i+1}`
}));

const ads = [
  { id: 1, title: "Summer Sale!", subtitle: "Up to 50% off", image: "https://placehold.co/1200x400?text=Summer+Sale" },
  { id: 2, title: "New Arrivals", subtitle: "Discover latest trends", image: "https://placehold.co/1200x400?text=New+Arrivals" },
  { id: 3, title: "Premium Partners", subtitle: "Shop trusted brands", image: "https://placehold.co/1200x400?text=Premium+Brands" }
];


const HomePage = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Search Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          {/* ... search input remains same ... */}
          <div className="relative max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="Search products, shops, categories..."
              className="w-full py-3 pl-12 pr-6 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
            />
            <svg
              className="absolute left-4 top-4 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Hero Carousel - Add container */}
      <div className="container max-w-7xl mx-auto">
        <HeroCarousel />
      </div>

      
      {/* Categories Scroll */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
          <div className="flex overflow-x-auto pb-4 gap-8 scrollbar-hide">
            {categories.map((category) => (
              <div 
                key={category.name}
                className="flex flex-col items-center flex-shrink-0"
              >
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-4xl shadow-lg hover:shadow-xl transition-shadow duration-300 mb-2">
                  {category.icon}
                </div>
                <span className="text-gray-700 font-medium">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    {/* Product Sections */}
    {Object.entries(products).map(([section, items]) => (
        <section key={section} className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 capitalize">{section} Products</h2>
            <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide">
              {items.map((product) => (
                <div 
                  key={product.id}
                  className="w-64 flex-shrink-0 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-[#bf2c7e] font-bold">{product.price}</span>
                      {section === 'discounted' && (
                        <span className="text-sm text-gray-500 line-through">{product.price}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{product.shop}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

     {/* Brands Section */}
     <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Brands</h2>
          <div className="flex overflow-x-auto pb-4 gap-8 scrollbar-hide">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="flex-shrink-0 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  className="h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Existing Components - Add container */}
      <div className="container max-w-7xl mx-auto">
        <FeaturedShops shops={featuredShops} />
        <ExploreShelves shelves={shelves} />
        <LatestSkillPosts skills={skills} />
        <FinancialSummary />
      </div>


      {/* Advertising Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-[#0f1c47] to-[#2d3566] rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Advertise With Us</h2>
            <p className="text-xl mb-6">Reach millions of potential customers</p>
            <button className="bg-[#bf2c7e] hover:bg-[#a8246d] text-white px-8 py-3 rounded-lg">
              Start Advertising
            </button>
          </div>
        </div>
      </section>
 <ActivitiesList />
<EventsList />

      {/* Footer - Add container */}
      <footer className="bg-[#0f1c47] text-white py-16 mt-24">
        {/* ... existing footer content ... */}
              {/* Modern Footer */}
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-6">Collaborative Commerce</h3>
              <p className="text-gray-300 max-w-md">
                Empowering innovators and creators through community-driven commerce.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {['About', 'Blog', 'Careers', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-[#bf2c7e] transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
              <div className="flex gap-4">
                {['Twitter', 'LinkedIn', 'Instagram'].map((social) => (
                  <a 
                    key={social} 
                    href="#" 
                    className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors duration-300"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-300">
            © 2024 Collaborative Commerce. All rights reserved.
          </div>
        </div>
  
      </footer>
    </div>
  );
};

export default HomePage;


