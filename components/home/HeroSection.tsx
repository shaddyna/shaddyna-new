import { AdPlacement } from '@/components/home/AdPlacement';
import Link from 'next/link';

export default function HeroSection() {
  const stats = [
    { value: '1,200+', label: 'Active Shops' },
    { value: '3,500+', label: 'Skills Listed' },
    { value: '8,000+', label: 'Community Members' },
    { value: '500+', label: 'Shelves Shared' },
  ];

  return (
    <section className="relative">
      {/* Hero content remains the same */}
          <section className="bg-gradient-to-r from-[#bf2c7e]/10 to-[#0f1c47]/10 py-10 md:py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-[#0f1c47] mb-4 md:mb-6">
            Discover, Connect, and <span className="text-[#bf2c7e]">Thrive</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-[#0f1c47]/80 mb-6 md:mb-10">
            Your modern marketplace for shops, skills, and community shelves. Find what you need or showcase what you offer.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 md:mb-16">
            <Link
              href="/"
              className="bg-[#bf2c7e] hover:bg-[#a6246d] text-white font-semibold py-3 px-6 rounded-full transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/"
              className="border-2 border-[#0f1c47] hover:border-[#bf2c7e] text-[#0f1c47] hover:text-[#bf2c7e] font-semibold py-3 px-6 rounded-full transition-colors"
            >
              Explore
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-2 md:p-4 rounded-lg shadow-sm">
                <p className="text-base md:text-xl font-bold text-[#bf2c7e]">{stat.value}</p>
                <p className="text-xs md:text-sm text-[#0f1c47]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

      {/* Premium hero ad */}
      <div className="container mx-auto px-4 mt-8">
        <AdPlacement type="shop" variant="horizontal" />
      </div>
    </section>
  );
}