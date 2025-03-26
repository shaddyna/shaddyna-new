import React from 'react';

interface Brand {
  id: number;
  name: string;
  logo: string;
}

interface BrandsSectionProps {
  brands: Brand[];
  title: string;
}

const BrandsSection: React.FC<BrandsSectionProps> = ({ brands, title }) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">{title}</h2>
        <div className="flex overflow-x-auto pb-4 gap-8 scrollbar-hide">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex-shrink-0 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img 
                src={brand.logo} 
                alt={brand.name}
                className="h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;