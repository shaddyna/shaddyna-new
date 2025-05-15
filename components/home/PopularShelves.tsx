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
}

export default function PopularShelves() {
  // Dummy data for popular shelves
  const popularShelves: Shelf[] = [
    {
      id: '1',
      name: 'Tech Innovators',
      description: 'Cutting-edge technology products',
      type: 'product',
      members: 245,
      product: {
        stock: 150,
        price: 599,
      },
    },
    {
      id: '2',
      name: 'Consulting Pros',
      description: 'Professional business services',
      type: 'service',
      members: 178,
      service: {
        price: 200,
        duration: '2 hours',
      },
    },
    {
      id: '3',
      name: 'Startup Investors',
      description: 'High-growth investment opportunities',
      type: 'investment',
      members: 432,
      investment: {
        amount: 10000,
        roi: 25,
      },
    },
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

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-[#0f1c47]">Popular Shelves</h2>
          <Link href="/shelves" className="text-[#bf2c7e] hover:underline">
            Browse all shelves
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularShelves.map((shelf) => (
            <div key={shelf.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  {getShelfBadge(shelf.type)}
                  <span className="text-sm text-[#0f1c47]/60">
                    {shelf.members} members
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-[#0f1c47] mb-2">{shelf.name}</h3>
                <p className="text-[#0f1c47]/80 mb-6">{shelf.description}</p>
                
                {shelf.type === 'product' && (
                  <div className="flex justify-between text-sm">
                    <span>Stock: {shelf.product?.stock}</span>
                    <span className="font-bold text-[#bf2c7e]">
                      Ksh {shelf.product?.price}
                    </span>
                  </div>
                )}
                
                {shelf.type === 'service' && (
                  <div className="flex justify-between text-sm">
                    <span>Duration: {shelf.service?.duration}</span>
                    <span className="font-bold text-[#bf2c7e]">
                      Ksh {shelf.service?.price}/session
                    </span>
                  </div>
                )}
                
                {shelf.type === 'investment' && (
                  <div className="flex justify-between text-sm">
                    <div>
                      <span className="block">ROI: {shelf.investment?.roi}%</span>
                      <span>Min: Ksh {shelf.investment?.amount}</span>
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
      </div>
    </section>
  );
}