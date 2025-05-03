/*import { useEffect, useState } from 'react';
import axios from 'axios';
import { Order, OrderStatus, } from '@/types/profile';

const ORDERS_PER_PAGE = 10;

export const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [visibleCount, setVisibleCount] = useState(ORDERS_PER_PAGE);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders');
        console.log('Fetched orders:', response.data.orders);  // Log the actual orders array
        setOrders(response.data.orders);  // Set orders correctly from the 'orders' field
      } catch {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  

  const handleDelete = async (orderId: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
        setOrders(prev => prev.filter(order => order._id !== orderId));
      } catch {
        alert('Failed to delete order');
      }
    }
  };

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
  };

  const handleSaveEdit = async () => {
    if (!editingOrder || !editingOrder._id) return;
    try {
      const response = await axios.put(`http://localhost:5000/api/orders/${editingOrder._id}`, editingOrder);
      setOrders(orders.map(order => (order._id === editingOrder._id ? response.data : order)));
      setEditingOrder(null);
    } catch {
      alert('Failed to update order');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!editingOrder) return;
    setEditingOrder({ ...editingOrder, [e.target.name]: e.target.value as OrderStatus });
  };

  const visibleOrders = orders.slice(0, visibleCount);

  if (loading) return <div className="p-6 text-center">Loading orders...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Order Management</h3>

      <div className="space-y-4">
        {visibleOrders.map(order => (
          <div key={order._id} className="border p-4 rounded-lg hover:bg-gray-50">
            <div className="mb-2">
              <p className="text-sm text-gray-600">
                <strong>Order ID:</strong> {order._id}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Status:</strong> {order.status}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Total:</strong> ${order.totalAmount}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Buyer:</strong> {order.shipping.firstName} {order.shipping.lastName}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {order.shipping.email}
              </p>
            </div>

            {/* Order Items *
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-[#0f1c47] mb-2">Items</h4>
              <div className="space-y-2">
                {order.payments.flatMap(payment =>
                  payment.items.map(item => (
                    <div key={item._id} className="flex items-center space-x-4 border p-2 rounded">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-sm text-gray-500">Price: ${item.price}</p>
                        {item.color && <p className="text-sm text-gray-500">Color: {item.color}</p>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button onClick={() => handleEdit(order)} className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
                Edit
              </button>
              <button onClick={() => handleDelete(order._id!)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {orders.length > ORDERS_PER_PAGE && (
        <div className="mt-4 text-center">
          {visibleCount < orders.length ? (
            <button
              onClick={() => setVisibleCount(prev => prev + ORDERS_PER_PAGE)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Show More
            </button>
          ) : (
            <button
              onClick={() => setVisibleCount(ORDERS_PER_PAGE)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Collapse
            </button>
          )}
        </div>
      )}

      {editingOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Edit Order Status</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={editingOrder.status}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setEditingOrder(null)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
              <button onClick={handleSaveEdit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

*/

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Order, OrderStatus } from '@/types/profile';

const ORDERS_PER_PAGE = 2;

export const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch orders on load
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders');
        setOrders(response.data.orders || []);
      } catch {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Handle delete
  const handleDelete = async (orderId: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
        setOrders(prev => prev.filter(order => order._id !== orderId));
      } catch {
        alert('Failed to delete order');
      }
    }
  };

  // Edit handlers
  const handleEdit = (order: Order) => setEditingOrder(order);
  
  const handleSaveEdit = async () => {
    if (!editingOrder || !editingOrder._id) return;
    try {
      const response = await axios.put(`http://localhost:5000/api/orders/${editingOrder._id}`, editingOrder);
      setOrders(orders.map(order => (order._id === editingOrder._id ? response.data : order)));
      setEditingOrder(null);
    } catch {
      alert('Failed to update order');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!editingOrder) return;
    setEditingOrder({ ...editingOrder, [e.target.name]: e.target.value as OrderStatus });
  };

  // Pagination logic
  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
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
  if (loading) return <div className="p-6 text-center">Loading orders...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Order Management</h3>

      {/* Orders List */}
      <div className="space-y-4">
        {paginatedOrders.map(order => (
          <div key={order._id} className="border p-4 rounded-lg hover:bg-gray-50">
            <div className="mb-2">
              <p className="text-sm text-gray-600">
                <strong>Order ID:</strong> {order._id}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Status:</strong> {order.status}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Total:</strong> ${order.totalAmount}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Buyer:</strong> {order.shipping.firstName} {order.shipping.lastName}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {order.shipping.email}
              </p>
            </div>

            {/* Items */}
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-[#0f1c47] mb-2">Items</h4>
              <div className="space-y-2">
                {order.payments.flatMap(payment =>
                  payment.items.map(item => (
                    <div key={item._id} className="flex items-center space-x-4 border p-2 rounded">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-sm text-gray-500">Price: ${item.price}</p>
                        {item.color && <p className="text-sm text-gray-500">Color: {item.color}</p>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button onClick={() => handleEdit(order)} className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
                Edit
              </button>
              <button onClick={() => handleDelete(order._id!)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm">
                Delete
              </button>
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
      {editingOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Edit Order Status</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={editingOrder.status}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setEditingOrder(null)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
              <button onClick={handleSaveEdit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};