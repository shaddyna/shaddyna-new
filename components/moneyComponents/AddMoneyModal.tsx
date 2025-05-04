/*'use client'
import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'

interface AddMoneyModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AddMoneyModal = ({ isOpen, onClose }: AddMoneyModalProps) => {
  const { user, token } = useAuth()
  const [formData, setFormData] = useState({
    userId: '',
    mpesaCode: '',
    fullName: '',
    amount: '',
    phoneNumber: '',
    email: '',
    paymentMethod: 'Mobile Money' // Default payment method
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPaymentForm, setShowPaymentForm] = useState(false)

  // Initialize form with user data when modal opens
  useEffect(() => {
    if (isOpen && user) {
      setFormData(prev => ({
        ...prev,
        userId: user._id || '',
       // fullName: user.fullName || '',
       // phoneNumber: user.phoneNumber || '',
        email: user.email || ''
      }))
    }
  }, [isOpen, user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePaymentMethodSelect = (method: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: method }))
    setShowPaymentForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!token) {
      setError("Authentication required. Please log in.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("https://shaddyna-backend.onrender.com/api/saving/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (response.ok) {
        alert("Deposit successful!")
        onClose() // Close modal on success
      } else {
        setError(data.message || "Deposit failed. Please try again.")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
      <div className="container mx-auto p-4 h-full flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#0f1c47]">
              {showPaymentForm ? 'Confirm Payment' : 'Add Money'}
            </h2>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-[#bf2c7e] text-2xl"
              disabled={loading}
            >
              ✕
            </button>
          </div>
          
          {!showPaymentForm ? (
            <div className="space-y-6">
              <div className="space-y-4">
                {['Mobile Money',].map((method) => (
                  <button
                    key={method}
                    onClick={() => handlePaymentMethodSelect(method)}
                    className="w-full p-4 border rounded-xl hover:border-[#bf2c7e] transition-colors text-left"
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-red-500 text-center">{error}</p>}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>
                <div className="p-3 border rounded-lg bg-gray-50">
                  {formData.paymentMethod}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (KES)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  required
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              {formData.paymentMethod === 'Mobile Money' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      M-Pesa Code
                    </label>
                    <input
                      type="text"
                      name="mpesaCode"
                      value={formData.mpesaCode}
                      onChange={handleChange}
                      placeholder="Enter M-Pesa transaction code"
                      required
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="e.g. 254712345678"
                      required
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                </>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPaymentForm(false)}
                  className="flex-1 p-3 border rounded-lg hover:bg-gray-50"
                  disabled={loading}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#bf2c7e] text-white p-3 rounded-lg hover:bg-opacity-90"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Confirm'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}*/

// Update your AddMoneyModal component
'use client'
import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'

interface AddMoneyModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AddMoneyModal = ({ isOpen, onClose }: AddMoneyModalProps) => {
  const { user, token } = useAuth()
  const [formData, setFormData] = useState({
    userId: '',
    mpesaCode: '',
    fullName: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(), // Combine first and last name
    amount: '',
    phoneNumber: user?.phoneNumber || '',
    email: user?.email || '',
    paymentMethod: 'Mobile Money'
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPaymentForm, setShowPaymentForm] = useState(false)

  // Initialize form with user data when modal opens
  useEffect(() => {
    if (isOpen && user) {
      setFormData(prev => ({
        ...prev,
        userId: user._id || '',
        fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        phoneNumber: user.phoneNumber || '',
        email: user.email || ''
      }))
    }
  }, [isOpen, user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePaymentMethodSelect = (method: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: method }))
    setShowPaymentForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!token) {
      setError("Authentication required. Please log in.")
      setLoading(false)
      return
    }

    // Validate all required fields are filled
    if (!formData.userId || !formData.mpesaCode || !formData.fullName || 
        !formData.amount || !formData.phoneNumber || !formData.email) {
      setError("Please fill all required fields")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("https://shaddyna-backend.onrender.com/api/saving/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          amount: Number(formData.amount) // Ensure amount is a number
        }),
      })

      const data = await response.json()
      if (response.ok) {
        alert("Deposit successful!")
        onClose()
      } else {
        setError(data.message || "Deposit failed. Please try again.")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
      <div className="container mx-auto p-4 h-full flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#0f1c47]">
              {showPaymentForm ? 'Confirm Payment' : 'Add Money'}
            </h2>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-[#bf2c7e] text-2xl"
              disabled={loading}
            >
              ✕
            </button>
          </div>
          
          {!showPaymentForm ? (
            <div className="space-y-6">
              <div className="space-y-4">
                {['Mobile Money'].map((method) => (
                  <button
                    key={method}
                    onClick={() => handlePaymentMethodSelect(method)}
                    className="w-full p-4 border rounded-xl hover:border-[#bf2c7e] transition-colors text-left"
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-red-500 text-center">{error}</p>}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>
                <div className="p-3 border rounded-lg bg-gray-50">
                  {formData.paymentMethod}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (KES)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  required
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  M-Pesa Code
                </label>
                <input
                  type="text"
                  name="mpesaCode"
                  value={formData.mpesaCode}
                  onChange={handleChange}
                  placeholder="Enter M-Pesa transaction code"
                  required
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="e.g. 254712345678"
                  required
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPaymentForm(false)}
                  className="flex-1 p-3 border rounded-lg hover:bg-gray-50"
                  disabled={loading}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#bf2c7e] text-white p-3 rounded-lg hover:bg-opacity-90"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Confirm'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}