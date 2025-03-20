"use client";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { ProfileHeader } from '@/components/ProfileHeader';
import { MainContent } from '@/components/MainContent';
import { User } from '@/types/profile';
import { dummyUser, dummyOrders, dummyProducts, dummyUsers } from '@/data/dummyData';
import { EditProfileModal } from '@/components/EditProfileModal';
import { FiEdit, FiPlus, FiTrash } from 'react-icons/fi';
import Button from '@/components/ui/Button';


export default function ProfilePage() {

  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User>(dummyUser);
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [shop, setShop] = useState({
    name: "Mizzo Collections",
    logo: "https://via.placeholder.com/100",
    description: "Your one-stop shop for the latest trends.",
    categories: ["Fashion", "Accessories"],
    contactEmail: "contact@mizzo.com",
    socialMedia: {
      instagram: "@mizzo_collections",
      facebook: "MizzoCollections"
    }
  });

  const [products, setProducts] = useState([
    { id: 1, name: "Denim Jacket", stock: 10, price: 4500 },
    { id: 2, name: "Classic Sneakers", stock: 5, price: 3200 },
  ]);

  const [orders, setOrders] = useState([
    { id: 101, customer: "John Doe", total: 12000, status: "Pending" },
    { id: 102, customer: "Jane Smith", total: 8000, status: "Completed" },
  ]);

  const [withdrawals, setWithdrawals] = useState([
    { id: 201, amount: 5000, status: "Processing" },
    { id: 202, amount: 12000, status: "Completed" },
  ]);

  // Modal states
  const [isShopEditModalOpen, setIsShopEditModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [editedShop, setEditedShop] = useState({ ...shop });

  // Shop Management
  const handleSaveShop = () => {
    setShop(editedShop);
    setIsShopEditModalOpen(false);
  };

  // Calculate total revenue
  const totalRevenue = orders
    .filter(order => order.status === "Completed")
    .reduce((sum, order) => sum + order.total, 0);

    const renderRoleContent = () => {
      interface Product {
        id?: number;
        name: string;
        stock: number;
        price: number;
      }
      const [editedProduct, setEditedProduct] = useState<Product | null>(null);
      // In the component
      //const [editedProduct, setEditedProduct] = useState<Product | null>(null);
      switch(currentUser.role) {
        case 'user':
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
          
        case 'vendor':
          return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
              {/* My Shop Section */}
              <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-[#0f1c47]">My Shop</h3>
                  <Button onClick={() => setIsShopEditModalOpen(true)}>
                    <FiEdit className="mr-2" /> Edit Shop
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <img src={shop.logo} alt="Shop Logo" className="w-16 h-16 rounded-full" />
                  <div className="space-y-1">
                    <p className="text-lg font-medium">{shop.name}</p>
                    <p className="text-sm text-gray-500">{shop.description}</p>
                    <div className="flex gap-2 mt-2">
                      {shop.categories.map(category => (
                        <span key={category} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
        
              {/* Product Management */}
              <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-[#0f1c47]">Product Management</h3>
               
                  <Button onClick={() => {
                    setIsProductModalOpen(true);
                    setEditedProduct({ name: '', stock: 0, price: 0 });
                  }}>
                    <FiPlus className="mr-2" /> Add Product
                  </Button>
                </div>
                <div className="space-y-4">
                  {products.map(product => (
                    <div key={product.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-[#0f1c47] font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-[#bf2c7e] font-semibold">Ksh {product.price}</p>
                        <FiEdit 
                          className="text-blue-500 cursor-pointer" 
                          onClick={() => { setEditedProduct(product); setIsProductModalOpen(true); }}
                        />
                        <FiTrash 
                          className="text-red-500 cursor-pointer" 
                          onClick={() => setProducts(products.filter(p => p.id !== product.id))} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
        
              {/* Sales Dashboard */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Sales Dashboard</h3>
                <div className="space-y-3">
                  <p className="text-lg font-medium">Total Revenue: Ksh {totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Pending Orders: {orders.filter(o => o.status === "Pending").length}</p>
                </div>
              </div>
        
              {/* Customer Orders */}
              <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
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
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          order.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
        
              {/* Withdrawal Requests */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-[#0f1c47]">Withdrawal Requests</h3>
                  <Button onClick={() => setIsWithdrawalModalOpen(true)}>
                    <FiPlus className="mr-2" /> New Request
                  </Button>
                </div>
                <div className="space-y-3">
                  {withdrawals.map(withdrawal => (
                    <div key={withdrawal.id} className="flex justify-between p-4 bg-gray-50 rounded-lg">
                      <p className="text-[#0f1c47] font-medium">Ksh {withdrawal.amount.toLocaleString()}</p>
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        withdrawal.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {withdrawal.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
        
              {/* Edit Shop Modal */}
              {isShopEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-6 rounded-xl w-full max-w-md">
                    <h3 className="text-xl font-semibold mb-4">Edit Shop Details</h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Shop Name"
                        className="w-full p-2 border rounded"
                        value={editedShop.name}
                        onChange={e => setEditedShop({...editedShop, name: e.target.value})}
                      />
                      <input
                        type="text"
                        placeholder="Logo URL"
                        className="w-full p-2 border rounded"
                        value={editedShop.logo}
                        onChange={e => setEditedShop({...editedShop, logo: e.target.value})}
                      />
                      <textarea
                        placeholder="Description"
                        className="w-full p-2 border rounded"
                        value={editedShop.description}
                        onChange={e => setEditedShop({...editedShop, description: e.target.value})}
                      />
                      <div className="flex gap-2">
                        <Button onClick={handleSaveShop}>Save Changes</Button>
                        <Button  onClick={() => setIsShopEditModalOpen(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
        
              {/* Product Modal */}
              {isProductModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-6 rounded-xl w-full max-w-md">
                    <h3 className="text-xl font-semibold mb-4">
                      {editedProduct ? "Edit Product" : "Add New Product"}
                    </h3>
                    <div className="space-y-4">
                    <input
                    type="text"
                    placeholder="Product Name"
                    className="w-full p-2 border rounded"
                    value={editedProduct?.name || ""}
                    onChange={e => setEditedProduct(prev => ({
                      ...(prev || { name: '', stock: 0, price: 0 }),
                      name: e.target.value
                    }))}
                  />

                  <input
                    type="number"
                    placeholder="Price"
                    className="w-full p-2 border rounded"
                    value={editedProduct?.price || ""}
                    onChange={e => setEditedProduct(prev => ({
                      ...(prev || { name: '', stock: 0, price: 0 }),
                      price: Number(e.target.value)
                    }))}
                  />

                  <input
                    type="number"
                    placeholder="Stock Quantity"
                    className="w-full p-2 border rounded"
                    value={editedProduct?.stock || ""}
                    onChange={e => setEditedProduct(prev => ({
                      ...(prev || { name: '', stock: 0, price: 0 }),
                      stock: Number(e.target.value)
                    }))}
                  />
                                        <div className="flex gap-2">
                        {/*<Button onClick={() => handleSaveProduct(editedProduct)}>
                          {editedProduct ? "Save Changes" : "Add Product"}
                        </Button>*/}
                        <Button  onClick={() => {
                          setIsProductModalOpen(false);
                          setEditedProduct(null);
                        }}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
        
              {/* Withdrawal Modal */}
              {isWithdrawalModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-6 rounded-xl w-full max-w-md">
                    <h3 className="text-xl font-semibold mb-4">New Withdrawal Request</h3>
                    <div className="space-y-4">
                      <input
                        type="number"
                        placeholder="Amount"
                        className="w-full p-2 border rounded"
                        value={withdrawalAmount}
                        onChange={e => setWithdrawalAmount(e.target.value)}
                      />
                      <div className="flex gap-2">
                        {/*<Button onClick={handleWithdrawalRequest}>Submit Request</Button>*/}
                        <Button  onClick={() => setIsWithdrawalModalOpen(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
    
        case 'admin':
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">User Management</h3>
                <div className="space-y-4">
                  {dummyUsers.map(user => (
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
    
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Shop Moderation</h3>
                {/* Shop approval content */}
              </div>
    
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Transaction Monitoring</h3>
                {/* Transaction overview */}
              </div>
    
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Investment Approvals</h3>
                {/* Investment reviews */}
              </div>
    
              <div className="md:col-span-2 lg:col-span-3 bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Platform Analytics</h3>
                {/* Reports & charts */}
              </div>
            </div>
          );
      }
    };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar remains unchanged */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/10 lg:hidden">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <button
          className="p-2 bg-white/50 hover:bg-white/10 rounded-full transition-colors"
          onClick={() => router.back()}
        >
          <svg className="w-6 h-6 text-[#0f1c47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="p-2 bg-white/50 hover:bg-white/10 rounded-full transition-colors">
          <svg className="w-6 h-6 text-[#0f1c47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </nav>
      <ProfileHeader 
        currentUser={currentUser} 
        setShowEditModal={setShowEditModal} 
      />
      <MainContent
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        renderRoleContent={renderRoleContent}
        twoFactorEnabled={twoFactorEnabled}
        setTwoFactorEnabled={setTwoFactorEnabled}
      />
      <EditProfileModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        currentUser={currentUser}
      />
    </div>
  );
}