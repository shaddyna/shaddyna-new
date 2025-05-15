import { AdPlacement } from '@/components/home/AdPlacement';
import Link from 'next/link';

interface Shelf {
  id: string;
  name: string;
  description: string;
  type: 'product' | 'service' | 'investment';
  members: number;
  product?: {
    stock: number;
    price: number;
  };
  service?: {
    price: number;
    duration: string;
  };
  investment?: {
    amount: number;
    roi: number;
  };
  isFeatured?: boolean;
}

export default function PopularShelves() {
  // Dummy data for popular shelves
  const popularShelves: Shelf[] = [
    {
      id: '1',
      name: 'Tech Innovators',
      description: 'Cutting-edge technology products from leading brands',
      type: 'product',
      members: 245,
      product: {
        stock: 150,
        price: 599,
      },
      isFeatured: true
    },
    {
      id: '2',
      name: 'Consulting Pros',
      description: 'Professional business services and advisory',
      type: 'service',
      members: 178,
      service: {
        price: 200,
        duration: '2 hours',
      }
    },
    {
      id: '3',
      name: 'Startup Investors',
      description: 'High-growth investment opportunities in emerging markets',
      type: 'investment',
      members: 432,
      investment: {
        amount: 10000,
        roi: 25,
      },
      isFeatured: true
    },
    {
      id: '4',
      name: 'Artisan Collective',
      description: 'Handcrafted goods from local artisans',
      type: 'product',
      members: 189,
      product: {
        stock: 85,
        price: 249,
      }
    },
    {
      id: '5',
      name: 'Digital Marketing',
      description: 'Comprehensive digital marketing services',
      type: 'service',
      members: 312,
      service: {
        price: 500,
        duration: '1 month',
      }
    }
  ];

  const getShelfBadge = (type: Shelf['type']) => {
    const colors: Record<Shelf['type'], string> = {
      product: 'bg-[#bf2c7e]/10 text-[#bf2c7e]',
      service: 'bg-[#0f1c47]/10 text-[#0f1c47]',
      investment: 'bg-green-100 text-green-800',
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[type]}`}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    );
  };

  const featuredShelves = popularShelves.filter(shelf => shelf.isFeatured);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-[#0f1c47]">Popular Shelves</h2>
            <p className="text-[#0f1c47]/80 mt-2">Discover curated collections from our community</p>
          </div>
          <Link 
            href="/shelves" 
            className="text-[#bf2c7e] hover:underline font-medium flex items-center gap-1"
          >
            Browse all shelves
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Featured Shelf Carousel */}
        {featuredShelves.length > 0 && (
          <div className="mb-12 relative">
            <div className="bg-gradient-to-r from-[#0f1c47] to-[#3a1b6b] rounded-2xl p-8 text-white overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4">
                      Featured Shelf
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">{featuredShelves[0].name}</h3>
                    <p className="text-white/90 mb-6 max-w-lg">{featuredShelves[0].description}</p>
                    <Link 
                      href={`/shelves/${featuredShelves[0].id}`} 
                      className="inline-flex items-center px-6 py-3 bg-white text-[#0f1c47] rounded-lg font-medium hover:bg-opacity-90 transition-all"
                    >
                      Explore Shelf
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                  <div className="hidden md:block w-64 h-64 bg-white/10 rounded-xl backdrop-blur-sm flex items-center justify-center">
                    <span className="text-white/70">Shelf Preview</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Promotional Ad */}
        <div className="mb-12">
          <AdPlacement type="shelf" variant="horizontal" />
        </div>

        {/* Shelves Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularShelves.slice(0, 2).map((shelf) => (
            <div key={shelf.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-r from-[#0f1c47]/10 to-[#bf2c7e]/10 flex items-center justify-center">
                <span className="text-[#0f1c47]/50">Shelf Image</span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  {getShelfBadge(shelf.type)}
                  <span className="text-sm text-[#0f1c47]/60">
                    {shelf.members.toLocaleString()} members
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-[#0f1c47] mb-2">{shelf.name}</h3>
                <p className="text-[#0f1c47]/80 mb-6 line-clamp-2">{shelf.description}</p>
                
                {shelf.type === 'product' && (
                  <div className="flex justify-between items-center text-sm">
                    <span>Stock: {shelf.product?.stock}</span>
                    <span className="font-bold text-[#bf2c7e]">
                      Ksh {shelf.product?.price.toLocaleString()}
                    </span>
                  </div>
                )}
                
                {shelf.type === 'service' && (
                  <div className="flex justify-between items-center text-sm">
                    <span>Duration: {shelf.service?.duration}</span>
                    <span className="font-bold text-[#bf2c7e]">
                      Ksh {shelf.service?.price.toLocaleString()}
                    </span>
                  </div>
                )}
                
                {shelf.type === 'investment' && (
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <span className="block">ROI: {shelf.investment?.roi}%</span>
                      <span>Min: Ksh {shelf.investment?.amount.toLocaleString()}</span>
                    </div>
                    <button className="bg-[#0f1c47] text-white px-4 py-2 rounded-full text-xs hover:bg-opacity-90 transition-colors">
                      Invest Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Vertical Ad Placement */}
          <div className="hidden md:block">
            <AdPlacement type="shelf" variant="vertical" />
          </div>

          {popularShelves.slice(2, 4).map((shelf) => (
            <div key={shelf.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-r from-[#0f1c47]/10 to-[#bf2c7e]/10 flex items-center justify-center">
                <span className="text-[#0f1c47]/50">Shelf Image</span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  {getShelfBadge(shelf.type)}
                  <span className="text-sm text-[#0f1c47]/60">
                    {shelf.members.toLocaleString()} members
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-[#0f1c47] mb-2">{shelf.name}</h3>
                <p className="text-[#0f1c47]/80 mb-6 line-clamp-2">{shelf.description}</p>
                
                {shelf.type === 'product' && (
                  <div className="flex justify-between items-center text-sm">
                    <span>Stock: {shelf.product?.stock}</span>
                    <span className="font-bold text-[#bf2c7e]">
                      Ksh {shelf.product?.price.toLocaleString()}
                    </span>
                  </div>
                )}
                
                {shelf.type === 'service' && (
                  <div className="flex justify-between items-center text-sm">
                    <span>Duration: {shelf.service?.duration}</span>
                    <span className="font-bold text-[#bf2c7e]">
                      Ksh {shelf.service?.price.toLocaleString()}
                    </span>
                  </div>
                )}
                
                {shelf.type === 'investment' && (
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <span className="block">ROI: {shelf.investment?.roi}%</span>
                      <span>Min: Ksh {shelf.investment?.amount.toLocaleString()}</span>
                    </div>
                    <button className="bg-[#0f1c47] text-white px-4 py-2 rounded-full text-xs hover:bg-opacity-90 transition-colors">
                      Invest Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Horizontal Ad */}
        <div className="mt-12">
          <AdPlacement type="shelf" variant="horizontal" />
        </div>
      </div>
    </section>
  );
}