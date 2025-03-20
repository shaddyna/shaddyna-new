"use client"
import Link from 'next/link';
import { useState } from 'react';
import { registerUser } from '@/utils/api';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const response = await registerUser(name, email, password);

    if (!response.success) {
      setError(response.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0f1c47] mb-2">Join the Community</h1>
          <p className="text-gray-600">Start your collaborative journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[#0f1c47] mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-[#0f1c47] mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-[#0f1c47] mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#bf2c7e] text-white p-3 rounded-lg hover:bg-[#a8246d] transition-colors"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-gray-600">Already have an account? </span>
          <Link href="/login" className="text-[#0f1c47] hover:text-[#bf2c7e] font-medium">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
