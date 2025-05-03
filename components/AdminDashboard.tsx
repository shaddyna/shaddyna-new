/*import { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '@/types/profile';

export const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/all');
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${userId}`);
        setUsers(users.filter(user => user._id !== userId));
      } catch (err) {
        console.error('Error deleting user:', err);
        alert('Failed to delete user');
      }
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${editingUser._id}`,
        editingUser
      );
      
      setUsers(users.map(user => 
        user._id === editingUser._id ? response.data : user
      ));
      setEditingUser(null);
    } catch (err) {
      console.error('Error updating user:', err);
      alert('Failed to update user');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editingUser) return;
    
    const { name, value } = e.target;
    setEditingUser({
      ...editingUser,
      [name]: value
    });
  };

  if (loading) return <div className="p-6 text-center">Loading users...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">User Management</h3>
        <div className="space-y-4">
          {users.map(user => (
            <div key={user._id} className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-lg">
              <div>
                <p className="text-[#0f1c47] font-medium">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-500 capitalize">{user.role}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  !user.deleted ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {!user.deleted ? 'active' : 'deleted'}
                </span>
                <button 
                  onClick={() => handleEdit(user)}
                  className="px-2 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(user._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Other dashboard sections remain the same *
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Shop Moderation</h3>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Transaction Monitoring</h3>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Investment Approvals</h3>
      </div>
      <div className="md:col-span-2 lg:col-span-3 bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Platform Analytics</h3>
      </div>

      {/* Edit User Modal *
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Edit User</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={editingUser.firstName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={editingUser.lastName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editingUser.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  name="role"
                  value={editingUser.role}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="admin">Admin</option>
                  <option value="seller">Seller</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};*/

import { UserManagement } from '@/components/adminDashboardComponents/UserManagement';
import { ShopModeration } from '@/components/adminDashboardComponents/ShopModeration';
import { TransactionMonitoring } from '@/components/adminDashboardComponents/TransactionMonitoring';
import { InvestmentApprovals } from '@/components/adminDashboardComponents/InvestmentApprovals';
import { PlatformAnalytics } from '@/components/adminDashboardComponents/PlatformAnalytics';
import { OrderManagement } from './adminDashboardComponents/OrdersComponent';
import { ProductsComponent } from './adminDashboardComponents/ProductsComponent';
import { MembersComponent } from './adminDashboardComponents/MembersComponent';
import { ShelfComponent } from './adminDashboardComponents/ShelfComponent';
import { SkillsComponent } from './adminDashboardComponents/SkillsComponent';
import { PostsComponent } from './adminDashboardComponents/PostsComponent';
import { WithdrawalRequestComponent } from './adminDashboardComponents/WithdrawalRequests';
import { SellersComponent } from './adminDashboardComponents/SellersComponent';
import { SellerRequests } from './adminDashboardComponents/SellerRequestsComponent';

export const AdminDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UserManagement />
      <ShopModeration />
      <TransactionMonitoring />
      <InvestmentApprovals />
      <OrderManagement />
      <ProductsComponent />
      <MembersComponent />
      <ShelfComponent />
      <SkillsComponent />
      <PostsComponent />
      <WithdrawalRequestComponent />
      <SellersComponent />
      <SellerRequests />
      <div className="md:col-span-2 lg:col-span-3">
        <PlatformAnalytics />
      </div>
      
    </div>
  );
};

