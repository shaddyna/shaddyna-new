"use client";

import { useState, useEffect } from 'react';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface Ad {
  id: string;
  title: string;
  description: string;
  image: string;
  advertiser: string;
  link: string;
  type: 'shop' | 'skill' | 'shelf';
}

export const AdPlacement = ({ type = 'shop', variant = 'horizontal' }: { type?: 'shop' | 'skill' | 'shelf', variant?: 'horizontal' | 'vertical' }) => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockAds: Ad[] = [
      {
        id: '1',
        title: 'Premium Boutique Collection',
        description: 'Discover our exclusive summer collection with 20% off for new customers',
        image: '/ad-fashion.jpg',
        advertiser: 'Urban Threads',
        link: '/shops/urban-threads',
        type: "shop" as const
      },
      {
        id: '2',
        title: 'Web Development Special',
        description: 'Get your business online with our professional web development services',
        image: '/ad-webdev.jpg',
        advertiser: 'Tech Solutions Inc.',
        link: '/hub/tech-solutions',
        type: "skill" as const
      },
      {
        id: '3',
        title: 'Invest in Local Startups',
        description: 'Join our investor community and support emerging businesses',
        image: '/ad-investment.jpg',
        advertiser: 'Startup Ventures',
        link: '/shelves/startup-ventures',
        type: "shelf" as const
      }
    ].filter(ad => ad.type === type);

    setAds(mockAds);
    setLoading(false);
  }, [type]);

  const nextAd = () => {
    setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
  };

  const prevAd = () => {
    setCurrentAdIndex((prevIndex) => (prevIndex - 1 + ads.length) % ads.length);
  };

  if (loading || ads.length === 0 || dismissed) return null;

  const currentAd = ads[currentAdIndex];

  return (
    <div className={`relative group ${variant === 'horizontal' ? 'w-full' : 'w-72'} bg-gradient-to-br from-[#0f1c47]/10 to-[#bf2c7e]/10 rounded-2xl overflow-hidden shadow-lg`}>
      {/* Close button */}
      <button 
        onClick={() => setDismissed(true)}
        className="absolute top-3 right-3 z-10 p-1.5 bg-white/80 rounded-full hover:bg-white transition-all"
        aria-label="Close ad"
      >
        <FiX className="h-4 w-4 text-gray-800" />
      </button>

      {/* Ad content */}
      <div className="relative h-full">
        {/* Image placeholder */}
        <div className={`${variant === 'horizontal' ? 'h-48' : 'h-60'} bg-gradient-to-r from-[#0f1c47] to-[#3a1b6b] flex items-center justify-center`}>
          <span className="text-white/80 text-sm font-medium">Ad Space</span>
        </div>

        <div className="p-4">
          <div className="flex items-center mb-1">
            <span className="text-xs font-medium px-2 py-1 bg-[#bf2c7e]/10 text-[#bf2c7e] rounded-full">
              Sponsored
            </span>
            <span className="ml-2 text-xs text-gray-500">{currentAd.advertiser}</span>
          </div>
          <h3 className="text-lg font-bold text-[#0f1c47] mb-1">{currentAd.title}</h3>
          <p className="text-sm text-gray-600 mb-3">{currentAd.description}</p>
          <a 
            href={currentAd.link} 
            className="inline-block px-4 py-2 bg-[#bf2c7e] text-white text-sm font-medium rounded-lg hover:bg-[#a6246d] transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Navigation arrows for multiple ads */}
      {ads.length > 1 && (
        <>
          <button 
            onClick={prevAd}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Previous ad"
          >
            <FiChevronLeft className="h-4 w-4 text-gray-800" />
          </button>
          <button 
            onClick={nextAd}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Next ad"
          >
            <FiChevronRight className="h-4 w-4 text-gray-800" />
          </button>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-1">
            {ads.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentAdIndex(index)}
                className={`h-1.5 rounded-full ${index === currentAdIndex ? 'w-4 bg-[#bf2c7e]' : 'w-2 bg-gray-300'}`}
                aria-label={`Go to ad ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};