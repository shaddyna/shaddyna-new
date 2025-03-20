// components/RoleDashboards.tsx
import { Order, Product, PlatformUser } from '@/types/profile';

// Common Card Component
const DashboardCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}>
    {children}
  </div>
);

// User Dashboard
export const UserDashboard = ({ orders }: { orders: Order[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <DashboardCard className="md:col-span-2">
      <h3 className="text-lg font-semibold text-[#0f1c47] mb-4">My Orders</h3>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="flex items-center justify-between p-4 hover:bg-[#bf2c7e]/5 rounded-lg">
            <div>
              <p className="font-medium text-[#0f1c47]">{order.product}</p>
              <p className="text-sm text-[#0f1c47]/60">{order.date}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-[#bf2c7e]/10 text-[#bf2c7e]'
            }`}>
              {order.status}
            </span>
          </div>
        ))}
      </div>
    </DashboardCard>

    <DashboardCard>
      <h3 className="text-lg font-semibold text-[#0f1c47] mb-4">Investment Portfolio</h3>
      {/* Investment content */}
    </DashboardCard>

    {/* Add other user sections */}
  </div>
);

// Vendor Dashboard
export const VendorDashboard = ({ products }: { products: Product[] }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <DashboardCard className="lg:col-span-2">
      <h3 className="text-lg font-semibold text-[#0f1c47] mb-4">Product Management</h3>
      <div className="space-y-4">
        {products.map(product => (
          <div key={product.id} className="flex items-center justify-between p-4 hover:bg-[#bf2c7e]/5 rounded-lg">
            <div>
              <p className="font-medium text-[#0f1c47]">{product.name}</p>
              <p className="text-sm text-[#0f1c47]/60">Stock: {product.stock}</p>
            </div>
            <p className="text-[#bf2c7e] font-semibold">Ksh {product.price}</p>
          </div>
        ))}
      </div>
    </DashboardCard>

    <DashboardCard>
      <h3 className="text-lg font-semibold text-[#0f1c47] mb-4">Sales Overview</h3>
      <div className="space-y-3">
        <div className="p-4 bg-[#bf2c7e]/10 rounded-lg">
          <p className="text-sm text-[#0f1c47]/60">Total Revenue</p>
          <p className="text-2xl font-bold text-[#0f1c47]">Ksh 24,500</p>
        </div>
      </div>
    </DashboardCard>
  </div>
);

// Admin Dashboard
export const AdminDashboard = ({ users }: { users: PlatformUser[] }) => (
  <DashboardCard>
    <h3 className="text-lg font-semibold text-[#0f1c47] mb-4">User Management</h3>
    <div className="space-y-4">
      {users.map(user => (
        <div key={user.id} className="flex items-center justify-between p-4 hover:bg-[#bf2c7e]/5 rounded-lg">
          <div>
            <p className="font-medium text-[#0f1c47]">{user.name}</p>
            <p className="text-sm text-[#0f1c47]/60">{user.role}</p>
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
  </DashboardCard>
);