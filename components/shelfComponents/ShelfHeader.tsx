import React from 'react';
import { User } from '@/types/shelf'; // Define your types in a separate file

interface ShelfHeaderProps {
  members: User[];
  currentUser: User | null;
  onInviteClick: () => void;
}

export const ShelfHeader: React.FC<ShelfHeaderProps> = ({ members, currentUser, onInviteClick }) => {
  return (
    <div className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex items-center space-x-4">
          <div className="flex -space-x-2">
            {members.slice(0, 4).map((member, index) => (
              <img 
                key={member.userId}
                src={member.avatar || '/default-avatar.jpg'}
                alt={member.name}
                className="w-10 h-10 rounded-full border-2 border-white"
                style={{ zIndex: 4 - index }}
              />
            ))}
            {members.length > 4 && (
              <div className="w-10 h-10 rounded-full bg-[#0f1c47] text-white flex items-center justify-center text-xs font-bold border-2 border-white">
                +{members.length - 4}
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          {currentUser && (currentUser.role === 'owner' || currentUser.role === 'admin') ? (
            <>
              <button 
                onClick={onInviteClick}
                className="px-4 py-2 bg-[#bf2c7e] text-white rounded-md hover:bg-[#a8256d] transition-colors"
              >
                Invite Members
              </button>
              <button className="px-4 py-2 bg-[#0f1c47] text-white rounded-md hover:bg-[#0a142f] transition-colors">
                Manage Shelf
              </button>
            </>
          ) : null}
          <button className="px-4 py-2 border border-[#0f1c47] text-[#0f1c47] rounded-md hover:bg-gray-100 transition-colors">
            Share Shelf
          </button>
        </div>
      </div>
    </div>
  );
};