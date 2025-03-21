export const UserDashboard = ({ dummyOrders }: { dummyOrders: any[] }) => {
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
      </div>
    );
  };
  
  export default UserDashboard;
  