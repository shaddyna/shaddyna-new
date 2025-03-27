"use client";
import { User } from "@/types/types";

interface SelectedUsersProps {
  users: User[];
  onRemove: (user: User) => void;
}

export const SelectedUsers = ({ users, onRemove }: SelectedUsersProps) => {
  if (users.length === 0) return null;

  return (
    <div className="mb-4">
      <h4 className="text-sm font-medium text-[#0f1c47] mb-2">Selected Members ({users.length})</h4>
      <div className="flex flex-wrap gap-2">
        {users.map(user => (
          <div key={user._id} className="flex items-center bg-[#bf2c7e]/10 rounded-full px-3 py-1">
            <span className="text-sm text-[#bf2c7e]">{user.firstName}</span>
            <button
              type="button"
              onClick={() => onRemove(user)}
              className="ml-2 text-[#bf2c7e] hover:text-[#a02468]"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};