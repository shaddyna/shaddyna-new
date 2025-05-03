import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '@/types/profile';

const PRODUCTS_PER_PAGE = 5;

export const ProductsComponent = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreating, setIsCreating] = useState(false);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/all');
        setProducts(response.data.products || []);
      } catch {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${productId}`);
        setProducts(prev => prev.filter(p => p._id !== productId));
      } catch {
        alert('Failed to delete product');
      }
    }
  };

  // Edit/Create handlers
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingProduct({
      name: '',
      stock: 0,
      price: 0,
      category: '',
      description: '',
      images: [],
      attributes: {}
    });
    setIsCreating(true);
  };

  const handleSaveEdit = async () => {
    if (!editingProduct) return;
    try {
      if (isCreating) {
        const response = await axios.post('http://localhost:5000/api/products', editingProduct);
        setProducts(prev => [response.data, ...prev]);
      } else {
        const response = await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, editingProduct);
        setProducts(prev => prev.map(p => (p._id === editingProduct._id ? response.data : p)));
      }
      setEditingProduct(null);
      setIsCreating(false);
    } catch {
      alert('Failed to save product');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!editingProduct) return;
    setEditingProduct({ ...editingProduct, [e.target.name]: e.target.value });
  };

  // Pagination logic
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  // Render UI
  if (loading) return <div className="p-6 text-center">Loading products...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-[#0f1c47]">Products List</h3>
        {/*<button
          onClick={handleCreate}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Product
        </button>*/}
      </div>

      <div className="space-y-4">
        {paginatedProducts.map(product => (
          <div
            key={product._id}
            className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
          >
            <div className="flex-1">
              <p className="text-lg font-medium text-[#0f1c47]">{product.name}</p>
              <p className="text-sm text-gray-500">Category: {product.category}</p>
              <p className="text-sm text-gray-500">Stock: {product.stock}</p>
              {/*<p className="text-sm text-gray-600">Ksh {product.price.toFixed(2)}</p>*/}
              <p>{product.price ? product.price.toFixed(2) : 'Price not available'}</p>
              {product.description && (
                <p className="text-sm text-gray-500 mt-1">{product.description}</p>
              )}
            </div>
            {product.images?.length > 0 && (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg ml-4"
              />
            )}
            <div className="flex flex-col items-end ml-4 space-y-2">
              <button onClick={() => handleEdit(product)} className="px-2 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">Edit</button>
              <button onClick={() => handleDelete(product._id!)} className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>

          <div className="flex space-x-1">
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => changePage(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Modal for Editing */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">{isCreating ? 'Add Product' : 'Edit Product'}</h3>
            <div className="space-y-4">
              {['name', 'category', 'price', 'stock'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
                  <input
                    type={field === 'price' || field === 'stock' ? 'number' : 'text'}
                    name={field}
                    value={(editingProduct as any)[field]}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={editingProduct.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button onClick={() => { setEditingProduct(null); setIsCreating(false); }} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                <button onClick={handleSaveEdit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};