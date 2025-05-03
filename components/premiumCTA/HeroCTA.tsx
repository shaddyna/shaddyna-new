/*"use client";

import { FC, useState } from 'react';
import { FiPlusCircle, FiX, FiAlertCircle, FiUsers, FiStar } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

interface HeroCTAProps {
  onOpenModal: () => void;
}

export const HeroCTA: FC<HeroCTAProps> = ({ onOpenModal }) => {
  const { user, isLoading: authLoading, refreshUser } = useAuth();
  const [checking, setChecking] = useState(false);
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [showMembershipPrompt, setShowMembershipPrompt] = useState(false);

  const handleCreateShopClick = async () => {
    if (authLoading) return;

    setChecking(true);

    try {
      await refreshUser();

      if (!user) {
        console.log("User not logged in");
        onOpenModal();
        return;
      }

      if (user.role === 'admin') {
        setShowAdminPrompt(true);
      } else if (user.role === 'customer' && !user.member) {
        setShowMembershipPrompt(true);
      } else {
        onOpenModal();
      }
    } catch (error) {
      console.error('Error checking user status:', error);
      onOpenModal();
    } finally {
      setChecking(false);
    }
  };

  return (
    <>
      <section className="relative py-12 sm:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1c47] to-[#2a3a6e] z-0"></div>

        <div className="absolute top-0 left-0 w-full h-full opacity-10 z-0">
          <div className="absolute top-8 left-8 w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-[#bf2c7e] mix-blend-overlay"></div>
          <div className="absolute bottom-16 right-8 w-24 h-24 sm:w-40 sm:h-40 rounded-full bg-[#bf2c7e] mix-blend-overlay"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white mix-blend-overlay"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white animate-fade-in-up">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8a9f] to-[#bf2c7e]">Start Selling?</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-10 max-w-2xl mx-auto animate-fade-in-up delay-100">
            Join our thriving community of successful vendors and grow your business with us
          </p>

          <div className="animate-fade-in-up delay-200">
            <button
              onClick={handleCreateShopClick}
              disabled={checking || authLoading}
              className="relative group bg-gradient-to-r from-[#bf2c7e] to-[#a02468] text-white px-6 py-4 sm:px-10 sm:py-5 rounded-lg sm:rounded-xl text-base sm:text-lg font-medium hover:shadow-xl hover:shadow-[#bf2c7e]/30 transition-all duration-300 overflow-hidden disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {checking ? (
                  <span className="animate-spin">
                    <FiPlusCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  </span>
                ) : (
                  <FiPlusCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
                Create Your Shop Now
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#a02468] to-[#bf2c7e] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute top-0 left-0 w-10 h-full bg-white/30 -skew-x-12 -translate-x-16 group-hover:translate-x-[400%] transition-transform duration-700"></span>
            </button>
          </div>

          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-gray-300 animate-fade-in-up delay-300">
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <FiUsers className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>10,000+ Happy Vendors</span>
            </div>
            <div className="sm:hidden w-8 h-px bg-gray-500 my-1"></div>
            <div className="hidden sm:block w-px h-6 bg-gray-500"></div>
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <FiStar className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>4.9/5 Average Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Prompt Modal *
      {showAdminPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg w-full max-w-md text-center">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setShowAdminPrompt(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <div className="mb-4 text-[#bf2c7e]">
              <FiAlertCircle className="w-12 h-12 mx-auto" />
            </div>
            <h2 className="text-xl font-bold text-[#0f1c47] mb-4">Admin Restriction</h2>
            <p className="text-gray-700 mb-6">Administrators cannot create shops. Please use a seller or customer account.</p>
            <button
              className="px-6 py-3 bg-[#0f1c47] text-white rounded-md hover:bg-[#1a2d5a]"
              onClick={() => setShowAdminPrompt(false)}
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* Membership Prompt Modal *
      {showMembershipPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative bg-gradient-to-br from-white to-gray-50 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
          >
            {/* Decorative elements *
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#bf2c7e]/10"></div>
            <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-[#0f1c47]/10"></div>

            {/* Modal content *
            <div className="relative z-10 p-8 text-center">
              {/* Icon *
              <div className="mx-auto flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#bf2c7e] to-[#d64285] rounded-full mb-6">
                <FiStar className="w-8 h-8 text-white" />
              </div>

              {/* Header *
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Unlock Premium Features
              </h2>
              <p className="text-gray-500 mb-6">
                Upgrade to a seller membership and start selling today
              </p>

              {/* Benefits list *
              <div className="space-y-3 mb-8 text-left">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Create your own shop</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Premium seller dashboard</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Priority customer support</span>
                </div>
              </div>

              {/* Pricing *
              <div className="bg-gray-50 rounded-xl p-4 mb-8">
                <div className="flex justify-center items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">Ksh 500</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Cancel anytime</p>
              </div>

              {/* Action buttons *
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => window.location.href = '/membership'}
                  className="w-full px-6 py-3.5 bg-gradient-to-r from-[#bf2c7e] to-[#d64285] text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Upgrade Now
                </button>
                <button
                  onClick={() => setShowMembershipPrompt(false)}
                  className="w-full px-6 py-3 text-gray-600 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};*/


'use client';

import { FC, useState } from 'react';
import { FiPlusCircle, FiX, FiAlertCircle, FiUsers, FiStar, FiClock } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

interface HeroCTAProps {
  onOpenModal: () => void;
}

export const HeroCTA: FC<HeroCTAProps> = ({ onOpenModal }) => {
  const { user, isLoading: authLoading, refreshUser } = useAuth();
  const [checking, setChecking] = useState(false);
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [showMembershipPrompt, setShowMembershipPrompt] = useState(false);
  const [showPendingRequestPrompt, setShowPendingRequestPrompt] = useState(false);
  const [error, setError] = useState('');

  const checkExistingRequest = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return false;
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/membership/check`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to check requests');
      }
  
      const data = await response.json();
      return data.hasPendingRequest;
    } catch (err) {
      console.error('Error checking requests:', err);
      setError('Failed to check your membership status');
      return false;
    }
  };

  const handleCreateShopClick = async () => {
    if (authLoading) return;
    
    setChecking(true);
    setError('');
    
    try {
      await refreshUser();

      if (!user) {
        console.log("User not logged in");
        onOpenModal();
        return;
      }

      // Check for existing pending request first
      const hasPendingRequest = await checkExistingRequest();
      if (hasPendingRequest) {
        setShowPendingRequestPrompt(true);
        return;
      }

      if (user.role === 'admin') {
        setShowAdminPrompt(true);
      } else if (user.role === 'customer' && !user.member) {
        setShowMembershipPrompt(true);
      } else {
        onOpenModal();
      }
    } catch (error) {
      console.error('Error checking user status:', error);
      setError('An error occurred while checking your status');
    } finally {
      setChecking(false);
    }
  };

  return (
    <>
      <section className="relative py-12 sm:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1c47] to-[#2a3a6e] z-0"></div>

        <div className="absolute top-0 left-0 w-full h-full opacity-10 z-0">
          <div className="absolute top-8 left-8 w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-[#bf2c7e] mix-blend-overlay"></div>
          <div className="absolute bottom-16 right-8 w-24 h-24 sm:w-40 sm:h-40 rounded-full bg-[#bf2c7e] mix-blend-overlay"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white mix-blend-overlay"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white animate-fade-in-up">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8a9f] to-[#bf2c7e]">Start Selling?</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-10 max-w-2xl mx-auto animate-fade-in-up delay-100">
            Join our thriving community of successful vendors and grow your business with us
          </p>

          <div className="animate-fade-in-up delay-200">
            <button
              onClick={handleCreateShopClick}
              disabled={checking || authLoading}
              className="relative group bg-gradient-to-r from-[#bf2c7e] to-[#a02468] text-white px-6 py-4 sm:px-10 sm:py-5 rounded-lg sm:rounded-xl text-base sm:text-lg font-medium hover:shadow-xl hover:shadow-[#bf2c7e]/30 transition-all duration-300 overflow-hidden disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {checking ? (
                  <span className="animate-spin">
                    <FiPlusCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  </span>
                ) : (
                  <FiPlusCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
                Create Your Shop Now
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#a02468] to-[#bf2c7e] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute top-0 left-0 w-10 h-full bg-white/30 -skew-x-12 -translate-x-16 group-hover:translate-x-[400%] transition-transform duration-700"></span>
            </button>
          </div>

          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-gray-300 animate-fade-in-up delay-300">
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <FiUsers className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>10,000+ Happy Vendors</span>
            </div>
            <div className="sm:hidden w-8 h-px bg-gray-500 my-1"></div>
            <div className="hidden sm:block w-px h-6 bg-gray-500"></div>
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <FiStar className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>4.9/5 Average Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Prompt Modal */}
      {showAdminPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg w-full max-w-md text-center">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setShowAdminPrompt(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <div className="mb-4 text-[#bf2c7e]">
              <FiAlertCircle className="w-12 h-12 mx-auto" />
            </div>
            <h2 className="text-xl font-bold text-[#0f1c47] mb-4">Admin Restriction</h2>
            <p className="text-gray-700 mb-6">Administrators cannot create shops. Please use a seller or customer account.</p>
            <button
              className="px-6 py-3 bg-[#0f1c47] text-white rounded-md hover:bg-[#1a2d5a]"
              onClick={() => setShowAdminPrompt(false)}
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* Membership Prompt Modal */}
      {showMembershipPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative bg-gradient-to-br from-white to-gray-50 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#bf2c7e]/10"></div>
            <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-[#0f1c47]/10"></div>

            <button
              onClick={() => setShowMembershipPrompt(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <FiX className="w-5 h-5 text-gray-500" />
            </button>

            <div className="relative z-10 p-8 text-center">
              <div className="mx-auto flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#bf2c7e] to-[#d64285] rounded-full mb-6">
                <FiStar className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Unlock Premium Features
              </h2>
              <p className="text-gray-500 mb-6">
                Upgrade to a seller membership and start selling today
              </p>

              <div className="space-y-3 mb-8 text-left">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Create your own shop</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Premium seller dashboard</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Priority customer support</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-8">
                <div className="flex justify-center items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">Ksh 500</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Cancel anytime</p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => window.location.href = '/membership'}
                  className="w-full px-6 py-3.5 bg-gradient-to-r from-[#bf2c7e] to-[#d64285] text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Upgrade Now
                </button>
                <button
                  onClick={() => setShowMembershipPrompt(false)}
                  className="w-full px-6 py-3 text-gray-600 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Pending Request Prompt Modal */}
      {showPendingRequestPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative bg-gradient-to-br from-white to-gray-50 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#bf2c7e]/10"></div>
            <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-[#0f1c47]/10"></div>
            
            <button
              onClick={() => setShowPendingRequestPrompt(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <FiX className="w-5 h-5 text-gray-500" />
            </button>

            <div className="relative z-10 p-8 text-center">
              <div className="mx-auto flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
                <FiClock className="w-8 h-8 text-yellow-500" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Request Pending Approval
              </h2>
              <p className="text-gray-600 mb-6">
                Your seller membership request is currently being reviewed by our team.
              </p>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-8">
                <p className="text-gray-700">
                  We'll notify you via email once your request has been processed.
                </p>
              </div>

              <button
                onClick={() => setShowPendingRequestPrompt(false)}
                className="w-full px-6 py-3 bg-[#0f1c47] text-white font-medium rounded-lg hover:bg-[#1a2d5a] transition-colors"
              >
                Understood
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Error Toast */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-lg z-50 max-w-xs"
        >
          <div className="flex items-center">
            <FiAlertCircle className="w-5 h-5 mr-2" />
            <p>{error}</p>
          </div>
        </motion.div>
      )}
    </>
  );
};