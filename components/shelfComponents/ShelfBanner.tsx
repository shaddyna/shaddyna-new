import React from 'react';

interface ShelfBannerProps {
  bannerImage: string;
  name: string;
  description: string;
}

export const ShelfBanner: React.FC<ShelfBannerProps> = ({ bannerImage, name, description }) => {
  return (
    <div className="relative h-64 w-full overflow-hidden">
      <img 
        src={bannerImage || '/default-banner.jpg'} 
        alt={name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c47] to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="mt-2 max-w-2xl">{description}</p>
      </div>
    </div>
  );
};