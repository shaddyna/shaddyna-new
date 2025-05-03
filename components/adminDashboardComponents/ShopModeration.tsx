"use client";
import { useState, useEffect } from 'react';
import { Shop } from '@/types/profile';

export const ShopModeration = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/shops/shops');
        if (!response.ok) {
          throw new Error('Failed to fetch shops');
        }
        const data = await response.json();
        console.log("Fetched shops data:", data); 
        //setShops(data);
        setShops(data.shops); 

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  const handleDelete = async (shopId: string) => {
    if (!confirm('Are you sure you want to delete this shop?')) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/shops/${shopId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete shop');
      }

      setShops(shops.filter(shop => shop._id !== shopId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete shop');
    }
  };

  const handleEdit = (shopId: string) => {
    // Implement your edit logic here
    // This could open a modal or navigate to an edit page
    console.log('Editing shop:', shopId);
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Shop Moderation</h3>
        <p>Loading shops...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Shop Moderation</h3>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Shop Moderation</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {shops.map((shop) => (
              <tr key={shop._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {shop.images?.length > 0 && (
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full object-cover" src={shop.images[0]} alt={shop.name} />
                      </div>
                    )}
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{shop.name}</div>
                      <div className="text-sm text-gray-500">{shop.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {shop.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {shop.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {shop.openingHours} - {shop.closingHours}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${shop.rating >= 4 ? 'bg-green-100 text-green-800' : shop.rating >= 2 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {shop.rating.toFixed(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {shop.isFeatured ? (
                    <span className="text-green-600">★ Featured</span>
                  ) : (
                    <span className="text-gray-400">Not Featured</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(shop._id)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(shop._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
  