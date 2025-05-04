import React from 'react';
import { ShelfMember, User } from '@/types/shelf';

interface MembersTableProps {
   members: ShelfMember[];
  currentUser: User | null;
}

export const MembersTable: React.FC<MembersTableProps> = ({ members, currentUser }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                {/*{currentUser && (currentUser.role === 'owner' || currentUser.role === 'admin') && (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}*/}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {members.map((member) => (
                <tr key={member.userId}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img 
                          className="h-10 w-10 rounded-full" 
                          src={member.avatar || '/default-avatar.jpg'} 
                          alt={member.name} 
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.userId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      member.role === 'owner' ? 'bg-purple-100 text-purple-800' :
                      member.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {member.role}
                    </span>
                  </td>
                  {/*<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(member.joinedAt).toLocaleDateString()}
                  </td>
                  {currentUser && (currentUser.role === 'owner' || currentUser.role === 'admin') && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {member.role !== 'owner' && (
                        <div className="flex space-x-2">
                          {member.role !== 'admin' && (
                            <button className="text-[#0f1c47] hover:text-[#0a142f]">
                              Make Admin
                            </button>
                          )}
                          {member.role === 'admin' && (
                            <button className="text-[#0f1c47] hover:text-[#0a142f]">
                              Remove Admin
                            </button>
                          )}
                          <button className="text-[#bf2c7e] hover:text-[#a8256d]">
                            Remove
                          </button>
                        </div>
                      )}
                    </td>
                  )}*/}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};