'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchWithAuth } from '@/utils/api';
import { FaShoppingCart, FaRegClock, FaCalendarAlt, FaBox, FaTruck, FaFileAlt } from 'react-icons/fa';

interface Order {
  _id: string;
  customerId: string;
  customerName: string;
  mpesaCode: string;
  mpesaName: string;
  mpesaNumber: string;
  amount: number;
  shipping_fee: number;
  shippingInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    additionalInfo?: string;
  };
  products: { name: string; quantity: number; price: number }[];
  delivery_status: string;
  payment_status: string;
  date: string;
}

export const UserDashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)

 useEffect(() => {
    const fetchOrders = async () => {
      if (!user?._id) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        // Use the correct endpoint path (remove duplicate 'orders')
        const response = await fetchWithAuth(`/api/orders/orders/customer/${user._id}`);
        
        // Debug logging
        console.log('API Response:', response);

        // Handle case where backend returns empty array
        if (Array.isArray(response) && response.length === 0) {
          setOrders([]);
          return;
        }

        // Handle case where backend returns object with data array
        const ordersData = Array.isArray(response) ? response : response.data || [];
        
        setOrders(ordersData);
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(err.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?._id]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return {
        formattedDate: date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    } catch {
      return {
        formattedDate: dateString,
        time: ''
      };
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#bf2c7e]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-xl text-red-600 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">My Orders</h3>
        {orders.length > 0 ? (
          orders.map((order) => {
            const { formattedDate, time } = formatDate(order.date);
            
            return (
              <div key={order._id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100 mb-6">
              {/* Order Header */}
              <div className="bg-[#0f1c47] px-5 py-3 flex justify-between items-center">
                <div>
                  <h3 className="text-white font-semibold">ORDER #{order._id.slice(-6).toUpperCase()}</h3>
                  <p className="text-[#bf2c7e] text-xs mt-1">
                    Placed on {formattedDate} at {time}
                  </p>
                </div>
                <div className="bg-[#bf2c7e] text-white px-3 py-1 rounded-full text-xs font-medium">
                  {order.products.length} {order.products.length === 1 ? 'item' : 'items'}
                </div>
              </div>
            
              {/* Order Body */}
              <div className="p-5">
                {/* Customer & Payment Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <h4 className="text-[#0f1c47] font-medium text-sm">CUSTOMER</h4>
                    <p className="text-gray-800">{order.customerName}</p>
                    {order.mpesaCode && (
                      <p className="text-sm text-gray-600">
                        M-Pesa: {order.mpesaCode} ({order.mpesaNumber})
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-[#0f1c47] font-medium text-sm">PAYMENT</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800">Total Amount:</span>
                      <span className="font-bold text-[#0f1c47]">KSh {order.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800">Shipping:</span>
                      <span className="text-gray-800">KSh {order.shipping_fee.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
            
                {/* Status Indicators */}
                <div className="flex flex-wrap gap-3 mb-5">
                  <div className={`px-3 py-1.5 rounded-full flex items-center ${
                    order.delivery_status === 'delivered' ? 'bg-green-50 text-green-800' :
                    order.delivery_status === 'cancelled' ? 'bg-red-50 text-red-800' :
                    'bg-[#bf2c7e]/10 text-[#bf2c7e]'
                  }`}>
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      order.delivery_status === 'delivered' ? 'bg-green-500' :
                      order.delivery_status === 'cancelled' ? 'bg-red-500' :
                      'bg-[#bf2c7e]'
                    }`}></div>
                    <span className="text-xs font-medium">Delivery: {order.delivery_status}</span>
                  </div>
                  
                  <div className={`px-3 py-1.5 rounded-full flex items-center ${
                    order.payment_status === 'paid' ? 'bg-green-50 text-green-800' :
                    'bg-yellow-50 text-yellow-800'
                  }`}>
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      order.payment_status === 'paid' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                    <span className="text-xs font-medium">Payment: {order.payment_status}</span>
                  </div>
                </div>
            
                {/* Products List */}
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-[#0f1c47] font-medium mb-3 flex items-center">
                    <FaShoppingCart className="mr-2 text-[#bf2c7e]" />
                    ORDER ITEMS
                  </h4>
                  
                  <div className="space-y-4">
                    {order.products.map((product, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-gray-100 rounded-lg p-2 mr-3 flex-shrink-0">
                          <div className="w-10 h-10 bg-[#bf2c7e]/10 rounded flex items-center justify-center">
                            <FaBox className="text-[#bf2c7e]" />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <h5 className="text-[#0f1c47] font-medium">{product.name}</h5>
                          <div className="flex justify-between text-sm text-gray-600 mt-1">
                            <span>Qty: {product.quantity}</span>
                            <span>KSh {product.price.toLocaleString()} each</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
            
                {/* Shipping Info */}
                {order.shippingInfo && (
                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <h4 className="text-[#0f1c47] font-medium mb-3 flex items-center">
                      <FaTruck className="mr-2 text-[#bf2c7e]" />
                      SHIPPING INFORMATION
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-800">
                        {order.shippingInfo.address}, {order.shippingInfo.city}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        {order.shippingInfo.postalCode} • {order.shippingInfo.phone}
                      </p>
                      {order.shippingInfo.additionalInfo && (
                        <p className="text-gray-500 text-xs mt-2">
                          Note: {order.shippingInfo.additionalInfo}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            
              {/* Order Footer */}
              <div className="bg-gray-50 px-5 py-3 flex justify-end">
                <button className="text-[#bf2c7e] hover:text-[#0f1c47] text-sm font-medium flex items-center transition-colors">
                  <FaFileAlt className="mr-2" />
                  View Invoice
                </button>
              </div>
            </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="mt-2 text-gray-500">No orders found</p>
            <p className="text-sm text-gray-400">Your orders will appear here once you make a purchase</p>
          </div>
        )}
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">My Shelves</h3>
          {/* Shelf membership content */}
        </div>
  
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Hub Contributions</h3>
          {/* Skills/services posted */}
        </div>
  
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Investment Portfolio</h3>
          {/* Investment content */}
        </div>
  
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Saved Shops & Products</h3>
          {/* Wishlist content */}
        </div>

      {/* Other dashboard sections */}
    </div>
  );
};

export default UserDashboard;
  

{/*export const UserDashboard = ({ dummyOrders }: { dummyOrders: any[] }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">My Orders</h3>
          {dummyOrders.map(order => (
            <div key={order.id} className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-lg">
              <div>
                <p className="text-[#0f1c47] font-medium">{order.product}</p>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-[#bf2c7e]/10 text-[#bf2c7e]'
              }`}>
                {order.status}
              </span>
            </div>
          ))}
        </div>
  
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">My Shelves</h3>
          {/* Shelf membership content *
        </div>
  
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Hub Contributions</h3>
          {/* Skills/services posted *
        </div>
  
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Investment Portfolio</h3>
          {/* Investment content *
        </div>
  
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Saved Shops & Products</h3>
          {/* Wishlist content *
        </div>
      </div>
    );
  };
  
  export default UserDashboard;*/}
