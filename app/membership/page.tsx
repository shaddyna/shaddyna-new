'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FiArrowLeft, FiCheckCircle, FiDollarSign, FiUser } from 'react-icons/fi';

export default function MembershipPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [mpesaName, setMpesaName] = useState('');
  const [mpesaCode, setMpesaCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const amount = 500; // Static amount in KES

  // Set default M-Pesa name when user data loads
  useEffect(() => {
    if (user && user.firstName && user.lastName) {
      setMpesaName(`${user.firstName} ${user.lastName}`);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/membership`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          mpesaName: mpesaName,
          mpesaCode
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit request');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <FiCheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Request Submitted!</h1>
          <p className="text-gray-600 mb-6">
            Your membership request has been received. We'll review it and notify you once approved.
          </p>
          <button
            onClick={() => router.push('/shops')}
            className="w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <FiArrowLeft className="mr-2" />
          Back
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Upgrade to Seller</h1>
              <p className="text-gray-600 mb-6">
                Complete your membership payment to start selling
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500">Membership Fee</span>
                    <span className="font-bold text-gray-900">KES {amount.toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    One-time payment to activate your seller account
                  </div>
                </div>

                {/* Editable M-Pesa Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    M-Pesa Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={mpesaName}
                      onChange={(e) => setMpesaName(e.target.value)}
                      placeholder="Enter your M-Pesa name"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* M-Pesa Transaction Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    M-Pesa Transaction Code
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiDollarSign className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={mpesaCode}
                      onChange={(e) => setMpesaCode(e.target.value)}
                      placeholder="Enter your M-Pesa transaction code"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Make payment to Paybill: 123456 Account: {user?.phoneNumber}
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-md transition-all disabled:opacity-70"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Payment'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}