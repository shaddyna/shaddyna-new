export const AdminDashboard = ({ dummyUsers }: { dummyUsers: any[] }) => {
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
      </div>
    );
  };
  