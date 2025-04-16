import React, { useState } from 'react';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (email: string, role: string) => void;
}

export const InviteModal: React.FC<InviteModalProps> = ({ isOpen, onClose, onInvite }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-[#0f1c47]">Invite Members</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="invite-email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="invite-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
            placeholder="Enter email address"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <div className="space-y-2">
            {['member', 'admin'].map((roleOption) => (
              <div key={roleOption} className="flex items-center">
                <input
                  id={`role-${roleOption}`}
                  name="role"
                  type="radio"
                  checked={role === roleOption}
                  onChange={() => setRole(roleOption)}
                  className="h-4 w-4 text-[#bf2c7e] focus:ring-[#bf2c7e] border-gray-300"
                />
                <label htmlFor={`role-${roleOption}`} className="ml-2 block text-sm text-gray-700 capitalize">
                  {roleOption}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onInvite(email, role);
              setEmail('');
              setRole('member');
            }}
            className="px-4 py-2 bg-[#bf2c7e] text-white rounded-md hover:bg-[#a8256d]"
          >
            Send Invite
          </button>
        </div>
      </div>
    </div>
  );
};