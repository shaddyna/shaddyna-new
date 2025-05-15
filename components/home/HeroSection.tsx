import Link from 'next/link';

export default function HeroSection() {
  // Dummy data for stats
  const stats = [
    { value: '150+', label: 'Shops' },
    { value: '500+', label: 'Products' },
    { value: '200+', label: 'Skills' },
    { value: '50+', label: 'Events' },
  ];

  return (
    <section className="bg-gradient-to-r from-[#bf2c7e]/10 to-[#0f1c47]/10 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#0f1c47] mb-6">
            Discover, Connect, and <span className="text-[#bf2c7e]">Thrive</span>
          </h1>
          <p className="text-lg md:text-xl text-[#0f1c47]/80 mb-10">
            Your modern marketplace for shops, skills, and community shelves. Find what you need or showcase what you offer.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link
              href="/signup"
              className="bg-[#bf2c7e] hover:bg-[#a6246d] text-white font-semibold py-3 px-8 rounded-full transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/explore"
              className="border-2 border-[#0f1c47] hover:border-[#bf2c7e] text-[#0f1c47] hover:text-[#bf2c7e] font-semibold py-3 px-8 rounded-full transition-colors"
            >
              Explore
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-2xl font-bold text-[#bf2c7e]">{stat.value}</p>
                <p className="text-[#0f1c47]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}