"use client";
import { User } from "@/types/types";

interface UserListProps {
  users: User[];
  selectedUsers: User[];
  onSelect: (user: User) => void;
  loading?: boolean;
}

export const UserList = ({ users, selectedUsers, onSelect, loading = false }: UserListProps) => {
  return (
    <div className="border border-[#0f1c47]/10 rounded-xl overflow-hidden">
      <div className="max-h-60 overflow-y-auto">
        {users.length > 0 ? (
          users.map(user => (
            <div
              key={user._id}
              className={`p-3 hover:bg-[#0f1c47]/5 cursor-pointer flex items-center ${
                selectedUsers.some(m => m._id === user._id) ? 'bg-[#bf2c7e]/10' : ''
              }`}
              onClick={() => onSelect(user)}
            >
              <div className="w-8 h-8 rounded-full bg-[#bf2c7e]/10 flex items-center justify-center mr-3">
                {user.image ? (
                  <img src={user.image} alt={user.firstName || 'User'} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-[#bf2c7e]">👤</span>
                )}
              </div>
              <div>
                <p className="text-[#0f1c47] font-medium">{user.firstName || 'No name'}</p>
                <p className="text-sm text-[#0f1c47]/60">{user.email || 'No email'}</p>
              </div>
              {selectedUsers.some(m => m._id === user._id) && (
                <div className="ml-auto text-[#bf2c7e]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-[#0f1c47]/60">
            {loading ? 'Loading users...' : 'No users found'}
          </div>
        )}
      </div>
    </div>
  );
};