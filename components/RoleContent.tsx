// components/RoleContent.tsx
import { User, Order, Product, PlatformUser } from "@/types/profile";

interface RoleContentProps {
  role: User['role'];
  orders: Order[];
  products: Product[];
  users: PlatformUser[];
}

export const RoleContent = ({ role, orders, products, users }: RoleContentProps) => {
  switch(role) {
    case 'customer':
      return <UserOrders orders={orders} />;
    case 'seller':
      return <VendorProducts products={products} />;
    case 'admin':
      return <AdminUsers users={users} />;
    default:
      return null;
  }
};

// Sub-components for each role view
/*const UserOrders = ({ orders }: { orders: Order[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">My Orders</h3>
      {orders.map(order => (
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
      <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Investment Portfolio</h3>
      {/* Investment content *
    </div>
  </div>
);
*/
const UserOrders = ({ orders }: { orders: Order[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">My Orders</h3>
      {orders.map(order => (
        <div 
          key={order._id } // Handle both cases
          className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-lg"
        >
          <div>
            <p className="text-[#0f1c47] font-medium">order</p>
            <p className="text-sm text-gray-500">
              order date 
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${
            order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-[#bf2c7e]/10 text-[#bf2c7e]'
          }`}>
            {order.status}
          </span>
        </div>
      ))}
    </div>
    {/* ... */}
  </div>
);

const VendorProducts = ({ products }: { products: Product[] }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
      <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Product Management</h3>
      <div className="space-y-4">
        {products.map(product => (
          <div key={product._id} className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-lg">
            <div>
              <p className="text-[#0f1c47] font-medium">{product.name}</p>
              <p className="text-sm text-gray-500">Stock: {product.stock}</p>
            </div>
            <p className="text-[#bf2c7e] font-semibold">Ksh {product.price}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Sales Dashboard</h3>
      {/* Sales metrics */}
    </div>
  </div>
);

const AdminUsers = ({ users }: { users: PlatformUser[] }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">User Management</h3>
    <div className="space-y-4">
      {users.map(user => (
        <div key={user.id} className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-lg">
          <div>
            <p className="text-[#0f1c47] font-medium">{user.name}</p>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${
            user.status === 'active' ? 'bg-green-100 text-green-800' : 
            user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
          }`}>
            {user.status}
          </span>
        </div>
      ))}
    </div>
  </div>
);