"use client"
import HeroCarousel from '@/components/HeroCarousel';
import ActivitiesList from '@/components/ActivitiesList';
import EventsList from '@/components/EventsList';
import 'swiper/css';
import 'swiper/css/pagination';
import FeaturedShops from '@/components/FeaturedShops';
import ExploreShelves from '@/components/ExploreShelves';
import LatestSkillPosts from '@/components/LatestSkillPosts';
import FinancialSummary from '@/components/FinancialSummary';
import ProductSection from '@/components/home/ProductSections';
import BrandsSection from '@/components/home/BrandsSection';
import AdvertiseSection from '@/components/home/AdvertiseSection';
import {
  featuredShops,
  shelves,
  skills,
  brands
} from './homedata';
const HomePage = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Search Bar 
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="container max-w-7xl mx-auto px-4 py-4">
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
      </div>*/}
      {/* Hero Carousel */}
      <div className="container max-w-7xl mx-auto">
        <HeroCarousel />
      </div>
      {/* Category Scroll 
      <CategoryScroll categories={categories} title="Shop by Category" />*/}
      <ProductSection />
      {/* Brands Section */}
      <BrandsSection brands={brands} title="Featured Brands" />
      {/* Existing Components */}
      <div className="container max-w-7xl mx-auto">
        <FeaturedShops shops={featuredShops} />
        <ExploreShelves shelves={shelves} />
        <LatestSkillPosts skills={skills} />
        <FinancialSummary />
      </div>

      {/* Advertising Section */}
      <AdvertiseSection />

      {/* Activities and Events */}
      <ActivitiesList />
      <EventsList  />

      {/* Footer */}
      <footer className="bg-[#0f1c47] text-white py-16 mt-24">
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
