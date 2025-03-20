'use client';

import { FC } from 'react';

interface Shelf {
  category: string;
  members: number;
  icon: string;
}

interface ExploreShelvesProps {
  shelves: Shelf[];
}

const ExploreShelves: FC<ExploreShelvesProps> = ({ shelves }) => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-[#0f1c47]">Explore Shelves</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {shelves.map((shelf) => (
            <div key={shelf.category} className="p-6 border-2 border-[#0f1c47] rounded-lg hover:border-[#bf2c7e] transition-colors">
              <div className="text-2xl mb-2">{shelf.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{shelf.category}</h3>
              <p className="text-gray-600 mb-4">{shelf.members} collaborators</p>
              <button className="bg-[#bf2c7e] hover:bg-[#a8246d] text-white px-4 py-2 rounded-md">
                Join Shelf
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreShelves;