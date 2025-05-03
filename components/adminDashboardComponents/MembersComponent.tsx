import { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '@/types/profile';

const MEMBERS_PER_PAGE = 10;

export const MembersComponent = () => {
  const [members, setMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [visibleCount, setVisibleCount] = useState(MEMBERS_PER_PAGE);
  const [editingMember, setEditingMember] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/all');
        const membersOnly = response.data.filter((user: User) => user.member === true);
        setMembers(membersOnly);
      } catch {
        setError('Failed to fetch members');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${userId}`);
        setMembers(prev => prev.filter(m => m._id !== userId));
      } catch {
        alert('Failed to delete member');
      }
    }
  };

  const handleEdit = (member: User) => setEditingMember(member);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editingMember) return;
    setEditingMember({ ...editingMember, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    if (!editingMember) return;
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${editingMember._id}`, editingMember);
      setMembers(members.map(m => (m._id === editingMember._id ? response.data : m)));
      setEditingMember(null);
    } catch {
      alert('Failed to update member');
    }
  };

  const visibleMembers = members.slice(0, visibleCount);

  if (loading) return <div className="p-6 text-center">Loading members...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Members List</h3>

      <div className="space-y-4">
        {visibleMembers.map(member => (
          <div key={member._id} className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-lg">
            <div>
              <p className="text-[#0f1c47] font-medium">{member.firstName} {member.lastName}</p>
              <p className="text-sm text-gray-500">{member.email}</p>
              <p className="text-sm text-gray-500 capitalize">{member.role}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm ${!member.deleted ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {!member.deleted ? 'active' : 'deleted'}
              </span>
              <button onClick={() => handleEdit(member)} className="px-2 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">Edit</button>
              <button onClick={() => handleDelete(member._id)} className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {members.length > MEMBERS_PER_PAGE && (
        <div className="mt-4 text-center">
          {visibleCount < members.length ? (
            <button
              onClick={() => setVisibleCount(prev => prev + MEMBERS_PER_PAGE)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Show More
            </button>
          ) : (
            <button
              onClick={() => setVisibleCount(MEMBERS_PER_PAGE)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Collapse
            </button>
          )}
        </div>
      )}

      {editingMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Edit Member</h3>
            <div className="space-y-4">
              {['firstName', 'lastName', 'email'].map(field => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700">
                    {field.replace(/^\w/, c => c.toUpperCase())}
                  </label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={(editingMember as any)[field]}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  name="role"
                  value={editingMember.role}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="admin">Admin</option>
                  <option value="seller">Seller</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button onClick={() => setEditingMember(null)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                <button onClick={handleSaveEdit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
