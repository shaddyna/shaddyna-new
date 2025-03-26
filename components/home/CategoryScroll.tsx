import React from 'react';

interface Category {
  name: string;
  icon: string;
}

interface CategoryScrollProps {
  categories: Category[];
  title: string;
}

const CategoryScroll: React.FC<CategoryScrollProps> = ({ categories, title }) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">{title}</h2>
        <div className="flex overflow-x-auto pb-4 gap-8 scrollbar-hide">
          {categories.map((category) => (
            <div key={category.name} className="flex flex-col items-center flex-shrink-0">
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-4xl shadow-lg hover:shadow-xl transition-shadow duration-300 mb-2">
                {category.icon}
              </div>
              <span className="text-gray-700 font-medium">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryScroll;