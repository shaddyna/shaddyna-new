
// components/CustomerOrders.tsx
/*import { Order } from '@/types/order'; 

type CustomerOrdersProps = {
  orders: Order[];
};

  
  export const CustomerOrders: React.FC<CustomerOrdersProps> = ({ orders }) => (
    <div className="lg:col-span-2 bg-white p-3 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Customer Orders</h3>
      <div className="space-y-3">
        {orders.map(order => (
          <div key={order.id} className="flex justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-[#0f1c47] font-medium">{order.customer}</p>
              <p className="text-sm text-gray-500">Order #{order.id}</p>
            </div>
            <div className="text-right">
              <p className="text-[#0f1c47] font-medium">Ksh {order.total}</p>
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  order.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  */

  /*import { Order } from '@/types/order'; // adjust path as needed

  type CustomerOrdersProps = {
    orders: Order[];
  };
  
  export const CustomerOrders: React.FC<CustomerOrdersProps> = ({ orders }) => (
    <div className="lg:col-span-2 bg-white p-3 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Customer Orders</h3>
      <div className="space-y-3">
        {orders.map(order => {
          const buyerName = `${order.shipping.firstName} ${order.shipping.lastName}`;
          const sellerPayment = order.payments.find(p => p.sellerId === order.payments[0].sellerId);
          return (
            <div key={order._id} className="flex justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-[#0f1c47] font-medium">{buyerName}</p>
                <p className="text-sm text-gray-500">Order #{order._id}</p>
              </div>
              <div className="text-right">
                <p className="text-[#0f1c47] font-medium">
                  Ksh {sellerPayment?.amount ?? order.totalAmount}
                </p>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    order.status === 'delivered'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );*/

  import { Order } from '@/types/order';

type CustomerOrdersProps = {
  orders: Order[];
  sellerId?: string; // Now receives sellerId from parent
};

export const CustomerOrders: React.FC<CustomerOrdersProps> = ({ orders, sellerId }) => (
  <div className="lg:col-span-2 bg-white p-3 rounded-xl shadow-md">
    <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Customer Orders</h3>
    <div className="space-y-3">
      {orders.map(order => {
        const buyerName = order.shipping
          ? `${order.shipping.firstName} ${order.shipping.lastName}`
          : 'Unknown Buyer';

        const sellerPayment = sellerId
          ? order.payments.find(p => p.sellerId === sellerId)
          : undefined;

        return (
          <div key={order._id} className="flex justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-[#0f1c47] font-medium">{buyerName}</p>
              <p className="text-sm text-gray-500">Order #{order._id}</p>
            </div>
            <div className="text-right">
              <p className="text-[#0f1c47] font-medium">
                Ksh {sellerPayment?.amount ?? order.totalAmount}
              </p>
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  order.status === 'delivered'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
  