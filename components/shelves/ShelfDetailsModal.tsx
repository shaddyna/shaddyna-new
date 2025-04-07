"use client";
import { Shelf, User } from "@/types/types";
import Image from "next/image";
import { FiUsers, FiPackage, FiDollarSign, FiMessageSquare, FiSend, FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
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
  onAddToCart?: (productId: string) => void;
  onAddToWishlist?: (productId: string) => void;
}

export const ShelfDetailsModal = ({ 
  shelf, 
  onClose, 
  onJoinRequest,
  onAddToCart = () => {},
  onAddToWishlist = () => {}
}: ShelfDetailsModalProps) => {
  const [members, setMembers] = useState<MemberWithUser[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

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

  const renderProductCard = (product: any) => (
    <div key={product.name} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
      <div className="relative h-48 bg-gray-100">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image Available
          </div>
        )}
        <div className="absolute top-2 right-2 flex flex-col space-y-2">
          <button
            onClick={() => onAddToWishlist(product.name)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Add to wishlist"
          >
            <FiHeart className="text-gray-600 hover:text-red-500" />
          </button>
          <button
            onClick={() => setSelectedProduct(product.name)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Quick view"
          >
            <FiEye className="text-gray-600 hover:text-blue-500" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-[#0f1c47] mb-1 truncate">{product.name}</h3>
        <p className="text-green-600 font-bold mb-2">Ksh {product.price?.toLocaleString() || '0'}</p>
        <p className="text-sm text-gray-500 mb-3">
          {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
        </p>
        <button
          onClick={() => onAddToCart(product.name)}
          disabled={product.stock <= 0}
          className={`w-full py-2 px-4 rounded-md flex items-center justify-center space-x-2 ${
            product.stock > 0
              ? 'bg-[#bf2c7e] text-white hover:bg-[#a02468]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <FiShoppingCart />
          <span>{product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>
      </div>
    </div>
  );

  const renderServiceCard = (service: any) => (
    <div key={service.duration} className="p-4 bg-[#f8f9fa] rounded-lg border border-gray-200">
      <h3 className="font-medium text-[#0f1c47] mb-2">Service Offering</h3>
      <p className="text-gray-600 mb-1">Duration: {service.duration}</p>
      <p className="text-green-600 font-bold">Ksh {service.price?.toLocaleString() || '0'}</p>
      <button className="mt-3 w-full py-2 px-4 bg-[#bf2c7e] text-white rounded-md hover:bg-[#a02468]">
        Book Service
      </button>
    </div>
  );

  const renderInvestmentCard = (investment: any) => (
    <div key={investment.amount} className="p-4 bg-[#f8f9fa] rounded-lg border border-gray-200">
      <h3 className="font-medium text-[#0f1c47] mb-2">Investment Opportunity</h3>
      <p className="text-green-600 font-bold mb-1">Ksh {investment.amount?.toLocaleString() || '0'}</p>
      <p className="text-gray-600 text-sm">ROI: {investment.roi}%</p>
      <p className="text-gray-600 text-sm mb-3">Duration: {investment.duration}</p>
      <button className="w-full py-2 px-4 bg-[#bf2c7e] text-white rounded-md hover:bg-[#a02468]">
        Invest Now
      </button>
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
              <div className="space-y-4">
                {shelf.type === 'product' && shelf.productDetails && shelf.productDetails.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {shelf.productDetails.map(renderProductCard)}
                  </div>
                ) : shelf.type === 'service' && shelf.serviceDetails && shelf.serviceDetails.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {shelf.serviceDetails.map(renderServiceCard)}
                  </div>
                ) : shelf.type === 'investment' && shelf.investmentDetails && shelf.investmentDetails.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {shelf.investmentDetails.map(renderInvestmentCard)}
                  </div>
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
                  Ksh {shelf.investmentDetails?.reduce((sum, inv) => sum + (inv.amount || 0), 0).toLocaleString() ?? '0'}
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

        {/* Product Quick View Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-[#0f1c47]">
                  {shelf.productDetails?.find(p => p.name === selectedProduct)?.name}
                </h3>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-500 hover:text-[#bf2c7e]"
                >
                  ✕
                </button>
              </div>
              <div className="mb-4">
                {shelf.productDetails?.find(p => p.name === selectedProduct)?.images?.[0] ? (
                  <Image
                    src={shelf.productDetails?.find(p => p.name === selectedProduct)?.images?.[0] || '/placeholder-image.jpg'}
                    alt={selectedProduct || 'Product image'}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-lg">
                    <span className="text-gray-400">No Image Available</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <p className="text-green-600 font-bold text-xl">
                  Ksh {shelf.productDetails?.find(p => p.name === selectedProduct)?.price?.toLocaleString() || '0'}
                </p>
                {/*<p className="text-gray-600">
                  {shelf.productDetails?.find(p => p.name === selectedProduct)?.description || 'No description available'}
                </p>*/}
                <p className="text-sm text-gray-500">
                  Category: {shelf.productDetails?.find(p => p.name === selectedProduct)?.category || 'Uncategorized'}
                </p>
                <p className="text-sm text-gray-500">
                  {shelf.productDetails?.find(p => p.name === selectedProduct)?.stock || '0'} available
                </p>
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => {
                    onAddToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 py-2 px-4 bg-[#bf2c7e] text-white rounded-md hover:bg-[#a02468] flex items-center justify-center space-x-2"
                >
                  <FiShoppingCart />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={() => {
                    onAddToWishlist(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="py-2 px-4 border border-[#bf2c7e] text-[#bf2c7e] rounded-md hover:bg-[#bf2c7e]/10 flex items-center justify-center"
                >
                  <FiHeart />
                </button>
              </div>
            </div>
          </div>
        )}
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