/*'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const ads = [
  { id: 1, title: "Summer Sale!", subtitle: "Up to 50% off", image: "https://placehold.co/1200x400?text=Summer+Sale" },
  { id: 2, title: "New Arrivals", subtitle: "Discover latest trends", image: "https://placehold.co/1200x400?text=New+Arrivals" },
  { id: 3, title: "Premium Partners", subtitle: "Shop trusted brands", image: "https://placehold.co/1200x400?text=Premium+Brands" }
];

export default function HeroCarousel() {
  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        className="h-[500px]"
      >
        {ads.map((ad) => (
          <SwiperSlide key={ad.id}>
            <div 
              className="h-full w-full bg-cover bg-center flex items-center"
              style={{ backgroundImage: `url(${ad.image})` }}
            >
              <div className="container mx-auto px-4 text-white text-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">{ad.title}</h2>
                <p className="text-xl md:text-2xl mb-8">{ad.subtitle}</p>
                <button className="bg-[#bf2c7e] hover:bg-[#a8246d] text-white px-8 py-3 rounded-lg">
                  Shop Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}*/

'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const ads = [
  { id: 1, title: "Summer Sale!", subtitle: "Up to 50% off", image: "https://placehold.co/1200x400?text=Summer+Sale" },
  { id: 2, title: "New Arrivals", subtitle: "Discover latest trends", image: "https://placehold.co/1200x400?text=New+Arrivals" },
  { id: 3, title: "Premium Partners", subtitle: "Shop trusted brands", image: "https://placehold.co/1200x400?text=Premium+Brands" }
];

export default function HeroCarousel() {
  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ 
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-white/50 !h-2 !w-8 !rounded-full',
          bulletActiveClass: '!bg-white !w-12'
        }}
        className="h-[300px] md:h-[500px]"
      >
        {ads.map((ad) => (
          <SwiperSlide key={ad.id}>
            <div className="relative h-full w-full">
              {/* Background Image with Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${ad.image})` }}
              />
              <div className="absolute inset-0 bg-black/30 md:bg-black/20" />
              
              {/* Content */}
              <div className="relative h-full container mx-auto px-4 flex items-center justify-center text-center">
                <div className="max-w-2xl space-y-3 md:space-y-4">
                  <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight">
                    {ad.title}
                  </h2>
                  <p className="text-base md:text-xl lg:text-2xl text-white/90 mb-4 md:mb-6">
                    {ad.subtitle}
                  </p>
                  <button 
                    className="bg-[#bf2c7e] hover:bg-[#a8246d] text-white px-6 py-2.5 md:px-8 md:py-3 rounded-lg text-sm md:text-base transition-all duration-300"
                    aria-label={`Shop ${ad.title}`}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}