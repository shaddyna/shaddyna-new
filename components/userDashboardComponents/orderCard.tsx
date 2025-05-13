// OrderCard.tsx
import { useState } from 'react';
import { FaShoppingCart, FaCalendarAlt, FaBox, FaTruck, FaFileAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface Product {
  _id?: string; // Optional as it might not be included in order products
  name: string;
  quantity: number;
  price: number;
  images?: string[]; // Optional to maintain backward compatibility
}

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
  products: Product[];
  delivery_status: string;
  payment_status: string;
  date: string;
}

interface OrderCardProps {
  order: Order;
  formattedDate: string;
  time: string;
}

const OrderCard = ({ order, formattedDate, time }: OrderCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div key={order._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mb-4 transition-all duration-300">
      {/* Order Summary (Always Visible) */}
      <div
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-4">
          <div className="bg-[#0f1c47] text-white p-2 rounded-lg">
            <FaShoppingCart className="text-[#bf2c7e]" />
          </div>
          <div>
            <h3 className="text-[#0f1c47] font-semibold">ORDER #{order._id.slice(-6).toUpperCase()}</h3>
            <p className="text-gray-500 text-sm flex items-center">
              <FaCalendarAlt className="mr-1 text-[#bf2c7e]" />
              {formattedDate} • {time}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${order.delivery_status === 'delivered' ? 'bg-green-100 text-green-800' : order.delivery_status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-[#bf2c7e]/10 text-[#bf2c7e]'}`}>
            {order.delivery_status}
          </div>
          <div className="text-[#bf2c7e]">
            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
      </div>

      {/* Collapsible Details */}
      {isExpanded && (
        <div className="border-t border-gray-100 px-5 py-4">
          {/* Customer & Payment Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <h4 className="text-[#0f1c47] font-medium text-sm">CUSTOMER DETAILS</h4>
              <p className="text-gray-800">{order.customerName}</p>
              {order.mpesaCode && (
                <p className="text-sm text-gray-600">
                  M-Pesa: {order.mpesaCode} ({order.mpesaNumber})
                </p>
              )}
            </div>
            <div className="space-y-2">
              <h4 className="text-[#0f1c47] font-medium text-sm">PAYMENT SUMMARY</h4>
              <div className="flex justify-between items-center pb-1">
                <span className="text-gray-600 text-sm">Subtotal:</span>
                <span className="text-gray-800">KSh {(order.amount - order.shipping_fee).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pb-1">
                <span className="text-gray-600 text-sm">Shipping:</span>
                <span className="text-gray-800">KSh {order.shipping_fee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-gray-100">
                <span className="text-[#0f1c47] font-medium">Total:</span>
                <span className="font-bold text-[#0f1c47]">KSh {order.amount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Products List */}
          <div className="mb-4">
            <h4 className="text-[#0f1c47] font-medium mb-3 flex items-center">
              <FaBox className="mr-2 text-[#bf2c7e]" />
              ORDER ITEMS ({order.products.length})
            </h4>
            <div className="space-y-3">
              {order.products.map((product, index) => (
                <div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 rounded mr-3 overflow-hidden bg-gray-100 flex-shrink-0">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = '';
                          target.parentElement!.className = 'w-12 h-12 rounded mr-3 overflow-hidden bg-[#bf2c7e]/10 flex items-center justify-center flex-shrink-0';
                          target.parentElement!.innerHTML = '<FaBox className="text-[#bf2c7e] text-sm" />';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#bf2c7e]/10">
                        <FaBox className="text-[#bf2c7e] text-sm" />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <h5 className="text-[#0f1c47] font-medium text-sm">{product.name}</h5>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>Qty: {product.quantity}</span>
                      <span>Ksh {product.price.toLocaleString()} @</span>
                    </div>
                  </div>
                  <div className="text-[#0f1c47] font-medium text-sm">
                    Ksh {(product.price * product.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Info */}
          {order.shippingInfo && (
            <div className="mb-4">
              <h4 className="text-[#0f1c47] font-medium mb-2 flex items-center">
                <FaTruck className="mr-2 text-[#bf2c7e]" />
                SHIPPING INFORMATION
              </h4>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-800 text-sm">
                  {order.shippingInfo.firstName} {order.shippingInfo.lastName}
                </p>
                <p className="text-gray-800 text-sm mt-1">
                  {order.shippingInfo.address}, {order.shippingInfo.city}
                </p>
                <p className="text-gray-600 text-xs mt-1">
                  {order.shippingInfo.postalCode} • {order.shippingInfo.phone}
                </p>
                {order.shippingInfo.additionalInfo && (
                  <p className="text-gray-500 text-xs mt-2 italic">
                    Note: {order.shippingInfo.additionalInfo}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-2 border-t border-gray-100">
            <button className="text-[#bf2c7e] hover:text-[#0f1c47] text-sm font-medium flex items-center transition-colors px-3 py-1.5 rounded-lg hover:bg-[#bf2c7e]/10">
              <FaFileAlt className="mr-2" />
              View Invoice
            </button>
            <button className="bg-[#0f1c47] text-white text-sm font-medium flex items-center px-3 py-1.5 rounded-lg hover:bg-[#0f1c47]/90 transition-colors">
              Track Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;