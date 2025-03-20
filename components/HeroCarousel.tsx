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
}