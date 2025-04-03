'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ads = [
  { 
    id: 1, 
    title: "Quick Sale!", 
    subtitle: "Up to 50% off", 
    image: "https://i.pinimg.com/736x/aa/fa/e9/aafae976a38bd341fa0d1d6f57a52d6e.jpg",
    cta: "Grab Deals"
  },
  { 
    id: 2, 
    title: "New Arrivals", 
    subtitle: "Discover latest trends", 
    image: "https://i.pinimg.com/736x/f6/bb/82/f6bb828a18d6afe4b92ce8576965057c.jpg",
    cta: "Explore Now"
  },
  { 
    id: 3, 
    title: "Premium Partners", 
    subtitle: "Shop trusted brands", 
    image: "https://i.pinimg.com/736x/06/35/f9/0635f9788b30204964ace60afe61aac1.jpg",
    cta: "View Brands"
  }
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left'|'right'>('right');

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection('right');
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  return (
    <section className="relative h-[60vh] min-h-[400px] md:h-[80vh] overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ opacity: 0, x: direction === 'right' ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction === 'right' ? -100 : 100 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{ 
              backgroundImage: `url(${ads[currentIndex].image})`,
              filter: 'brightness(0.8)'
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />
          
          {/* Content */}
          <div className="relative h-full container mx-auto px-6 flex items-end pb-16 md:items-center md:justify-center md:pb-0">
            <div className="max-w-2xl space-y-3 md:space-y-4 text-left md:text-center">
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {ads[currentIndex].title}
              </motion.h2>
              <motion.p 
                className="text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {ads[currentIndex].subtitle}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <button 
                  className="bg-[#bf2c7e] hover:bg-[#a8246d] text-white px-8 py-3 rounded-full text-base font-medium transition-all duration-300 
                  transform hover:scale-105 shadow-lg hover:shadow-xl active:scale-95"
                  aria-label={ads[currentIndex].cta}
                >
                  {ads[currentIndex].cta} →
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {ads.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white w-6' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

/*'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const ads = [
  { id: 1, title: "Quick Sale!", subtitle: "Up to 50% off", image: "https://i.pinimg.com/736x/aa/fa/e9/aafae976a38bd341fa0d1d6f57a52d6e.jpg" },
  { id: 2, title: "New Arrivals", subtitle: "Discover latest trends", image: "https://i.pinimg.com/736x/f6/bb/82/f6bb828a18d6afe4b92ce8576965057c.jpg" },
  { id: 3, title: "Premium Partners", subtitle: "Shop trusted brands", image: "https://i.pinimg.com/736x/06/35/f9/0635f9788b30204964ace60afe61aac1.jpg" }
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
              {/* Background Image with Overlay *
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${ad.image})` }}
              />
              <div className="absolute inset-0 bg-black/30 md:bg-black/20" />
              
              {/* Content *
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
}*/