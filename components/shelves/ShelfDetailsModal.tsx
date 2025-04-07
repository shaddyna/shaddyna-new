"use client";
import { Shelf, User } from "@/types/types";
import Image from "next/image";
import { FiUsers, FiPackage, FiDollarSign, FiMessageSquare, FiSend } from "react-icons/fi";
import { useEffect, useState } from "react";

interface MemberWithUser {
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    image?: string;
    role?: string;
  };
  role: string;
  _id?: string;
}

interface ShelfDetailsModalProps {
  shelf: Shelf;
  onClose: () => void;
  onJoinRequest: () => void;
}

export const ShelfDetailsModal = ({ shelf, onClose, onJoinRequest }: ShelfDetailsModalProps) => {
  const [members, setMembers] = useState<MemberWithUser[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);

  useEffect(() => {
    const processMembers = async () => {
      setLoadingMembers(true);
      try {
        const safeMembers = shelf.members.map(member => {
          const userId = typeof member.userId === 'string' 
            ? { _id: member.userId } 
            : member.userId || { _id: 'unknown' };

          return {
            ...member,
            userId: {
              id: userId._id,
              firstName: 'Loading...',
              lastName: '',
              email: '',
              role: 'member',
              ...userId
            }
          };
        });

        const needsFetch = safeMembers.some(m => 
          typeof m.userId === 'string' || 
          !m.userId.firstName || 
          m.userId.firstName === 'Loading...'
        );
        
        if (needsFetch) {
          const memberIds = safeMembers.map(m => m.userId._id);
          const response = await fetch(`https://shaddyna-backend.onrender.com/api/users/bulk?ids=${memberIds.join(',')}`);
          
          if (response.ok) {
            const userData: User[] = await response.json();
            const updatedMembers = safeMembers.map(member => {
              const user = userData.find(u => u._id === member.userId._id);
              return {
                ...member,
                userId: {
                  ...member.userId,
                  firstName: user?.firstName || 'Unknown',
                  lastName: user?.lastName || 'User',
                  email: user?.email || '',
                  image: user?.image,
                  role: user?.role || 'member'
                }
              };
            });
            setMembers(updatedMembers);
            return;
          }
        }
        
        setMembers(safeMembers);
      } catch (error) {
        console.error('Error processing members:', error);
        setMembers(shelf.members.map(member => ({
          ...member,
          userId: {
            _id: typeof member.userId === 'string' ? member.userId : member.userId?._id || 'unknown',
            firstName: 'Unknown',
            lastName: 'User',
            email: '',
            role: 'member'
          }
        })));
      } finally {
        setLoadingMembers(false);
      }
    };

    processMembers();
  }, [shelf.members]);

  const renderMemberAvatar = (member: MemberWithUser) => {
    const initials = `${member.userId.firstName?.charAt(0) || 'U'}${member.userId.lastName?.charAt(0) || ''}`;
    const fullName = `${member.userId.firstName} ${member.userId.lastName}`;

    return (
      <div className="w-8 h-8 rounded-full bg-[#bf2c7e]/10 flex items-center justify-center overflow-hidden">
        {member.userId.image ? (
          <Image 
            src={member.userId.image} 
            alt={fullName}
            width={32}
            height={32}
            className="object-cover"
          />
        ) : (
          <span className="text-[#bf2c7e]">{initials}</span>
        )}
      </div>
    );
  };

  const renderMemberItem = (member: MemberWithUser) => (
    <div key={member.userId._id} className="flex items-center space-x-2 p-2 bg-[#f8f9fa] rounded-lg">
      {renderMemberAvatar(member)}
      <div>
        <p className="text-sm font-medium text-[#0f1c47]">
          {member.userId.firstName} {member.userId.lastName}
        </p>
        <p className="text-xs text-gray-500">{member.userId.email || 'No email'}</p>
        <p className="text-xs text-gray-500 capitalize">{member.role}</p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#0f1c47]">{shelf.name}</h2>
            <p className="text-sm text-gray-500">
              Created: {new Date(shelf.createdAt).toLocaleDateString()} | 
              Updated: {new Date(shelf.updatedAt).toLocaleDateString()}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-[#bf2c7e]">
            ✕
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#0f1c47] mb-2">Description</h3>
              <p className="text-gray-600">{shelf.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#0f1c47] mb-3 flex items-center">
                <FiUsers className="mr-2" /> Members ({members.length})
              </h3>
              {loadingMembers ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#bf2c7e]"></div>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {members.map(renderMemberItem)}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#0f1c47] mb-3 flex items-center">
                <FiPackage className="mr-2" /> {shelf.type === 'investment' ? 'Investments' : 'Products & Services'}
              </h3>
              <div className="space-y-2">
                {shelf.type === 'product' && shelf.productDetails && shelf.productDetails.length > 0 ? (
                  shelf.productDetails.map((product, index) => (
                    <div key={index} className="p-3 bg-[#f8f9fa] rounded-lg">
                      <p className="text-[#0f1c47]">{product.name}</p>
                    </div>
                  ))
                ) : shelf.type === 'service' && shelf.serviceDetails && shelf.serviceDetails.length > 0 ? (
                  shelf.serviceDetails.map((service, index) => (
                    <div key={index} className="p-3 bg-[#f8f9fa] rounded-lg">
                      <p className="text-[#0f1c47]">Service (Duration: {service.duration})</p>
                    </div>
                  ))
                ) : shelf.type === 'investment' && shelf.investmentDetails && shelf.investmentDetails.length > 0 ? (
                  shelf.investmentDetails.map((investment, index) => (
                    <div key={index} className="p-3 bg-[#f8f9fa] rounded-lg">
                      <p className="text-[#0f1c47]">Investment: Ksh {investment.amount.toLocaleString()}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No {shelf.type === 'investment' ? 'investments' : 'items'} yet</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {shelf.type === 'investment' && (
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <FiDollarSign className="mr-2" /> Investment Summary
                </h3>
                <p className="text-2xl font-bold text-green-600 mb-1">
                  Ksh {shelf.investmentDetails?.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString() ?? '0'}
                </p>
                <p className="text-sm text-green-700">Total contributions</p>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-[#0f1c47] mb-3 flex items-center">
                <FiMessageSquare className="mr-2" /> Collaboration Chat
              </h3>
              <div className="bg-[#f8f9fa] rounded-lg p-4 h-48 overflow-y-auto mb-2">
                <p className="text-center text-gray-500 my-16">Chat feature coming soon!</p>
              </div>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 p-2 border border-[#0f1c47]/20 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#bf2c7e]"
                  disabled
                />
                <button className="bg-[#bf2c7e] text-white p-2 rounded-r-lg hover:bg-[#a02468] disabled:opacity-50" disabled>
                  <FiSend />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {shelf.openForMembers && (
                <button
                  onClick={onJoinRequest}
                  className="w-full bg-[#bf2c7e] text-white py-2 px-4 rounded-lg hover:bg-[#a02468] transition-colors"
                >
                  Request to Join
                </button>
              )}
              <button className="w-full border border-[#0f1c47] text-[#0f1c47] py-2 px-4 rounded-lg hover:bg-[#0f1c47]/5 transition-colors">
                {shelf.type === 'investment' ? 'Contribute' : 'Get Involved'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/*"use client";
import { Shelf, User } from "@/types/types";
import Image from "next/image";
import { FiUsers, FiPackage, FiDollarSign, FiMessageSquare, FiSend } from "react-icons/fi";
import { useEffect, useState } from "react";

interface MemberWithUser {
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    image?: string;
    role?: string;
  };
  role: string;
  _id?: string;
}

interface ShelfDetailsModalProps {
  shelf: Shelf;
  onClose: () => void;
  onJoinRequest: () => void;
}

export const ShelfDetailsModal = ({ shelf, onClose, onJoinRequest }: ShelfDetailsModalProps) => {
  const [members, setMembers] = useState<MemberWithUser[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);

  useEffect(() => {
    const processMembers = async () => {
      setLoadingMembers(true);
      try {
        // Create safe default member data
        const safeMembers = shelf.members.map(member => {
          // Handle case where userId might be string or object
          const userId = typeof member.userId === 'string' 
            ? { _id: member.userId } 
            : member.userId || { _id: 'unknown' };

          return {
            ...member,
            userId: {
              id: userId._id,
              firstName: 'Loading...',
              lastName: '',
              email: '',
              role: 'member',
              ...userId // Spread actual data over defaults
            }
          };
        });

        // Check if we need to fetch user details
        const needsFetch = safeMembers.some(m => 
          typeof m.userId === 'string' || 
          !m.userId.firstName || 
          m.userId.firstName === 'Loading...'
        );
        
        if (needsFetch) {
          const memberIds = safeMembers.map(m => m.userId._id);
          const response = await fetch(`https://shaddyna-backend.onrender.com/api/users/bulk?ids=${memberIds.join(',')}`);
          
          if (response.ok) {
            const userData: User[] = await response.json();
            const updatedMembers = safeMembers.map(member => {
              const user = userData.find(u => u._id === member.userId._id);
              return {
                ...member,
                userId: {
                  ...member.userId,
                  firstName: user?.firstName || 'Unknown',
                  lastName: user?.lastName || 'User',
                  email: user?.email || '',
                  image: user?.image,
                  role: user?.role || 'member'
                }
              };
            });
            setMembers(updatedMembers);
            return;
          }
        }
        
        setMembers(safeMembers);
      } catch (error) {
        console.error('Error processing members:', error);
        // Fallback to showing basic member info
        setMembers(shelf.members.map(member => ({
          ...member,
          userId: {
            _id: typeof member.userId === 'string' ? member.userId : member.userId?._id || 'unknown',
            firstName: 'Unknown',
            lastName: 'User',
            email: '',
            role: 'member'
          }
        })));
      } finally {
        setLoadingMembers(false);
      }
    };

    processMembers();
  }, [shelf.members]);

  const renderMemberAvatar = (member: MemberWithUser) => {
    const initials = `${member.userId.firstName?.charAt(0) || 'U'}${member.userId.lastName?.charAt(0) || ''}`;
    const fullName = `${member.userId.firstName} ${member.userId.lastName}`;

    return (
      <div className="w-8 h-8 rounded-full bg-[#bf2c7e]/10 flex items-center justify-center overflow-hidden">
        {member.userId.image ? (
          <Image 
            src={member.userId.image} 
            alt={fullName}
            width={32}
            height={32}
            className="object-cover"
          />
        ) : (
          <span className="text-[#bf2c7e]">{initials}</span>
        )}
      </div>
    );
  };

  const renderMemberItem = (member: MemberWithUser) => (
    <div key={member.userId._id} className="flex items-center space-x-2 p-2 bg-[#f8f9fa] rounded-lg">
      {renderMemberAvatar(member)}
      <div>
        <p className="text-sm font-medium text-[#0f1c47]">
          {member.userId.firstName} {member.userId.lastName}
        </p>
        <p className="text-xs text-gray-500">{member.userId.email || 'No email'}</p>
        <p className="text-xs text-gray-500 capitalize">{member.role}</p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#0f1c47]">{shelf.name}</h2>
            <p className="text-sm text-gray-500">
              Created: {new Date(shelf.createdAt).toLocaleDateString()} | 
              Updated: {new Date(shelf.updatedAt).toLocaleDateString()}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-[#bf2c7e]">
            ✕
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#0f1c47] mb-2">Description</h3>
              <p className="text-gray-600">{shelf.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#0f1c47] mb-3 flex items-center">
                <FiUsers className="mr-2" /> Members ({members.length})
              </h3>
              {loadingMembers ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#bf2c7e]"></div>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {members.map(renderMemberItem)}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#0f1c47] mb-3 flex items-center">
                <FiPackage className="mr-2" /> {shelf.type === 'investment' ? 'Investments' : 'Products & Services'}
              </h3>
              <div className="space-y-2">
                {shelf.products.length > 0 ? (
                  shelf.products.map((product, index) => (
                    <div key={index} className="p-3 bg-[#f8f9fa] rounded-lg">
                      <p className="text-[#0f1c47]">{product}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No {shelf.type === 'investment' ? 'investments' : 'items'} yet</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {shelf.type === 'investment' && (
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center">
                  <FiDollarSign className="mr-2" /> Investment Summary
                </h3>
                <p className="text-2xl font-bold text-green-600 mb-1">
                  Ksh {shelf.investments.toLocaleString()}
                </p>
                <p className="text-sm text-green-700">Total contributions</p>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-[#0f1c47] mb-3 flex items-center">
                <FiMessageSquare className="mr-2" /> Collaboration Chat
              </h3>
              <div className="bg-[#f8f9fa] rounded-lg p-4 h-48 overflow-y-auto mb-2">
                <p className="text-center text-gray-500 my-16">Chat feature coming soon!</p>
              </div>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 p-2 border border-[#0f1c47]/20 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#bf2c7e]"
                  disabled
                />
                <button className="bg-[#bf2c7e] text-white p-2 rounded-r-lg hover:bg-[#a02468] disabled:opacity-50" disabled>
                  <FiSend />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {shelf.openForMembers && (
                <button
                  onClick={onJoinRequest}
                  className="w-full bg-[#bf2c7e] text-white py-2 px-4 rounded-lg hover:bg-[#a02468] transition-colors"
                >
                  Request to Join
                </button>
              )}
              <button className="w-full border border-[#0f1c47] text-[#0f1c47] py-2 px-4 rounded-lg hover:bg-[#0f1c47]/5 transition-colors">
                {shelf.type === 'investment' ? 'Contribute' : 'Get Involved'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};*/