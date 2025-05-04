import { useEffect, useState } from 'react';
import axios from 'axios';
import { Shelf } from '@/types/shelf';

export const ShelfComponent = () => {
  const [shelves, setShelves] = useState<Shelf[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingShelf, setEditingShelf] = useState<Shelf | null>(null);
  const [newShelf, setNewShelf] = useState<Partial<Shelf>>({ name: '', description: '', type: 'product', visibility: 'public' });

  useEffect(() => {
    const fetchShelves = async () => {
      try {
        const response = await axios.get('https://shaddyna-backend.onrender.com/api/shelf');
        setShelves(response.data);
      } catch {
        setError('Failed to fetch shelves');
      } finally {
        setLoading(false);
      }
    };

    fetchShelves();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this shelf?')) {
      try {
        await axios.delete(`https://shaddyna-backend.onrender.com/api/shelf/${id}`);
        setShelves(prev => prev.filter(shelf => shelf.id !== id));
      } catch {
        alert('Failed to delete shelf');
      }
    }
  };

  const handleEdit = (shelf: Shelf) => setEditingShelf(shelf);

  const handleSaveEdit = async () => {
    if (!editingShelf) return;

    try {
      const response = await axios.put(`https://shaddyna-backend.onrender.com/api/shelf/${editingShelf.id}`, editingShelf);
      setShelves(prev => prev.map(s => (s.id === editingShelf.id ? response.data : s)));
      setEditingShelf(null);
    } catch {
      alert('Failed to update shelf');
    }
  };

  const handleCreateShelf = async () => {
    try {
      const response = await axios.post('https://shaddyna-backend.onrender.com/api/shelf', newShelf);
      setShelves(prev => [response.data, ...prev]);
      setNewShelf({ name: '', description: '', type: 'product', visibility: 'public' });
    } catch {
      alert('Failed to create shelf');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    isEdit = false
  ) => {
    const { name, value } = e.target;

    if (isEdit && editingShelf) {
      setEditingShelf({ ...editingShelf, [name]: value });
    } else {
      setNewShelf({ ...newShelf, [name]: value });
    }
  };

  if (loading) return <div className="p-6 text-center">Loading shelves...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-xl font-semibold text-[#0f1c47] mb-6">Shelf List</h3>

      {/* New Shelf Creation *
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h4 className="font-medium mb-2">Create New Shelf</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            value={newShelf.name}
            onChange={handleInputChange}
            placeholder="Shelf Name"
            className="p-2 border rounded"
          />
          <textarea
            name="description"
            value={newShelf.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="p-2 border rounded"
          />
          <select
            name="type"
            value={newShelf.type}
            onChange={handleInputChange}
            className="p-2 border rounded"
          >
            <option value="product">Product</option>
            <option value="service">Service</option>
            <option value="investment">Investment</option>
          </select>
          <select
            name="visibility"
            value={newShelf.visibility}
            onChange={handleInputChange}
            className="p-2 border rounded"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <button
          onClick={handleCreateShelf}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Create Shelf
        </button>
      </div>*/}

      {/* Shelf List */}
      <div className="space-y-4">
        {shelves.map(shelf => (
          <div
            key={shelf.id}
            className="border p-4 rounded-lg flex justify-between items-center hover:bg-gray-50"
          >
            <div>
              <p className="font-semibold text-[#0f1c47]">{shelf.name}</p>
              <p className="text-sm text-gray-500">{shelf.description}</p>
              <p className="text-xs text-gray-400 capitalize">
                Type: {shelf.type} | Visibility: {shelf.visibility}
              </p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(shelf)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(shelf.id)}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Shelf Modal */}
      {editingShelf && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Edit Shelf</h3>
            <div className="space-y-3">
              <input
                name="name"
                value={editingShelf.name}
                onChange={e => handleInputChange(e, true)}
                className="w-full p-2 border rounded"
              />
              <textarea
                name="description"
                value={editingShelf.description || ''}
                onChange={e => handleInputChange(e, true)}
                className="w-full p-2 border rounded"
              />
              <select
                name="type"
                value={editingShelf.type}
                onChange={e => handleInputChange(e, true)}
                className="w-full p-2 border rounded"
              >
                <option value="product">Product</option>
                <option value="service">Service</option>
                <option value="investment">Investment</option>
              </select>
              <select
                name="visibility"
                value={editingShelf.visibility}
                onChange={e => handleInputChange(e, true)}
                className="w-full p-2 border rounded"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
              <div className="flex justify-end space-x-2 mt-4">
                <button onClick={() => setEditingShelf(null)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                <button onClick={handleSaveEdit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
