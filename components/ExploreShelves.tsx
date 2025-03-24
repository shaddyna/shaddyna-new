/*'use client';

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

export default ExploreShelves;*/

'use client';

import { FC, useState } from 'react';

interface Shelf {
  id: string;
  name: string;
  type: 'product' | 'service' | 'other';
  description: string;
  members: number;
  openForMembers: boolean;
  icon?: string;
}

interface ExploreShelvesProps {
  shelves: Shelf[];
}

const ExploreShelves: FC<ExploreShelvesProps> = ({ shelves }) => {
  const [selectedShelf, setSelectedShelf] = useState<Shelf | null>(null);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-[#0f1c47]">Explore Shelves</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shelves.map((shelf) => (
            <div
              key={shelf.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-[#0f1c47]/10"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-[#0f1c47]">{shelf.name}</h3>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    shelf.type === 'product'
                      ? 'bg-[#bf2c7e]/10 text-[#bf2c7e]'
                      : shelf.type === 'service'
                      ? 'bg-[#0f1c47]/10 text-[#0f1c47]'
                      : 'bg-green-100 text-green-600'
                  }`}
                >
                  {shelf.type}
                </span>
              </div>

              <p className="text-gray-600 mb-4">{shelf.description}</p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-[#0f1c47]">👥 {shelf.members} members</span>
                  {shelf.openForMembers && (
                    <span className="text-[#bf2c7e]">✨ Accepting members</span>
                  )}
                </div>
                <button
                  onClick={() => setSelectedShelf(shelf)}
                  className="text-[#bf2c7e] hover:underline"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreShelves;