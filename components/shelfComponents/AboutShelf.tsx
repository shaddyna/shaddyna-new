import React from 'react';
import { Shelf } from '@/types/shelf';

interface AboutShelfProps {
  shelf: Shelf;
}

export const AboutShelf: React.FC<AboutShelfProps> = ({ shelf }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-[#0f1c47] mb-3">Description</h3>
          <p className="text-gray-700">{shelf.description}</p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-[#0f1c47] mb-3">Shelf Rules</h3>
          <div className="bg-gray-50 p-4 rounded-md">
           {/*{shelf.rules.split('\n').map((rule, i) => (
              <p key={i} className="text-gray-700 mb-2">{rule}</p>
            ))}*/}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#0f1c47] mb-3">Shelf Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Created</p>
              <p className="text-gray-700">{new Date(shelf.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Visibility</p>
              <p className="text-gray-700 capitalize">{shelf.visibility}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Post Types</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {/*{shelf.type?.map((type) => (
                  <span key={type} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    {type}
                  </span>
                ))}*/}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tags</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {shelf.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};