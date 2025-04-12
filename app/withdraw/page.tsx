'use client'

import { useState, useEffect } from 'react'
import { FiArrowLeft, FiDollarSign, FiSmartphone } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

// Reusable TopNav Component
const TopNav = () => {
  const router = useRouter()
  
  return (
    <nav className="bg-white border-b border-[#0f1c47]/10">
      <div className="container mx-auto px-4 py-3 flex items-center gap-4">
        <button 
          onClick={() => router.back()}
          className="text-[#0f1c47] hover:text-[#bf2c7e] transition-colors flex items-center gap-2"
        >
          <FiArrowLeft className="text-xl" />
          <span className="font-medium">Back</span>
        </button>
      </div>
    </nav>
  )
}

export default function WithdrawFundsPage() {
  const [amount, setAmount] = useState('')
  const [mpesaNumber, setMpesaNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })

  const [balanceData, setBalanceData] = useState<any>({})
  const [balanceError, setBalanceError] = useState<string | null>(null)
  const [balanceLoading, setBalanceLoading] = useState(true)

  const { token, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const fetchBalance = async () => {
      if (!token || !user?._id) {
        setBalanceError("Please login to view balance")
        setBalanceLoading(false)
        return
      }

      try {
        const response = await fetch("https://shaddyna-backend.onrender.com/api/saving/savings", {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })

        const responseData = await response.json()
        console.log("API Response:", responseData)

        if (response.ok) {
          const balanceValue = responseData.totalBalance ?? 
                            responseData.balance ?? 
                            responseData.data?.balance ?? 
                            0

          setBalanceData({
            userId: user._id,
            totalBalance: parseFloat(balanceValue),
            createdAt: responseData.createdAt,
            updatedAt: responseData.updatedAt
          })
          setBalanceError(null)
        } else {
          setBalanceError(responseData.message || "Failed to fetch balance")
        }
      } catch (err) {
        console.error('Fetch error:', err)
        setBalanceError("Network error. Please try again.")
      } finally {
        setBalanceLoading(false)
      }
    }

    fetchBalance()
  }, [token, user?._id])

  const formatKES = (amount: number | null | undefined) => {
    const numericAmount = Number(amount || 0)
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numericAmount)
  }

  const handleWithdraw = async () => {
    if (!amount || !mpesaNumber) {
      setMessage({ text: 'Please fill in all fields.', type: 'error' })
      return
    }

    const numericAmount = parseFloat(amount)
    if (isNaN(numericAmount)) {
      setMessage({ text: 'Please enter a valid amount.', type: 'error' })
      return
    }

    if (numericAmount <= 0) {
      setMessage({ text: 'Amount must be greater than zero.', type: 'error' })
      return
    }

    if (balanceData.totalBalance < numericAmount) {
      setMessage({ text: 'Insufficient balance.', type: 'error' })
      return
    }

    if (!mpesaNumber.match(/^07[0-9]{8}$/)) {
      setMessage({ text: 'Please enter a valid M-Pesa number (e.g. 0712345678).', type: 'error' })
      return
    }

    setLoading(true)
    try {
      const response = await fetch('https://shaddyna-backend.onrender.com/api/withdraw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: numericAmount,
          withdrawalMethod: 'mpesa',
          mpesaNumber
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to process withdrawal')
      }

      setMessage({ 
        text: 'Withdrawal request submitted successfully!', 
        type: 'success' 
      })
      
      // Refresh balance after successful withdrawal
      const balanceResponse = await fetch("https://shaddyna-backend.onrender.com/api/saving/savings", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      const balanceData = await balanceResponse.json()
      setBalanceData({
        userId: user?._id,
        totalBalance: balanceData.totalBalance || 0
      })

      setAmount('')
      setMpesaNumber('')
      
      // Optionally redirect to transactions page after delay
      setTimeout(() => {
        router.push('/money')
      }, 2000)
    } catch (error) {
      console.error('Withdrawal error:', error)
      setMessage({ 
        text:'Failed to process withdrawal', 
        type: 'error' 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f8f9fd]">
      <TopNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#bf2c7e]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiDollarSign className="text-3xl text-[#bf2c7e]" />
            </div>
            <h1 className="text-3xl font-bold text-[#0f1c47] mb-2">Withdraw Funds</h1>
            <p className="text-gray-600">Transfer funds directly to your M-Pesa account</p>
          </div>

          {/* Balance Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-[#0f1c47]/10">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-[#0f1c47]/70">Available Balance</p>
                {balanceLoading ? (
                  <div className="animate-pulse h-8 w-32 bg-gray-200 rounded"></div>
                ) : balanceError ? (
                  <p className="text-red-500 text-sm">{balanceError}</p>
                ) : (
                  <p className="text-2xl font-bold text-[#0f1c47]">
                    {formatKES(balanceData.totalBalance)}
                  </p>
                )}
              </div>
              <div className="w-12 h-12 bg-[#bf2c7e]/10 rounded-xl flex items-center justify-center">
                <FiSmartphone className="text-xl text-[#bf2c7e]" />
              </div>
            </div>
          </div>

          {/* Withdrawal Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#0f1c47]/10">
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-[#0f1c47] mb-2 block">Amount (KES)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value)
                      setMessage({ text: '', type: '' })
                    }}
                    className="w-full p-4 pr-12 border-2 border-[#0f1c47]/10 rounded-xl focus:border-[#bf2c7e] focus:ring-0 transition-all"
                    placeholder="Enter amount"
                    min="10"
                    max={balanceData.totalBalance}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0f1c47]/50">KES</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#0f1c47] mb-2 block">M-Pesa Number</label>
                <input
                  type="text"
                  value={mpesaNumber}
                  onChange={(e) => {
                    setMpesaNumber(e.target.value)
                    setMessage({ text: '', type: '' })
                  }}
                  className="w-full p-4 border-2 border-[#0f1c47]/10 rounded-xl focus:border-[#bf2c7e] focus:ring-0 transition-all"
                  placeholder="07XX XXX XXX"
                  pattern="07[0-9]{8}"
                />
              </div>

              <button
                className={`w-full p-4 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 ${
                  loading 
                    ? 'bg-[#bf2c7e]/80 cursor-not-allowed' 
                    : 'bg-[#bf2c7e] hover:bg-[#a02468] shadow-lg hover:shadow-[#bf2c7e]/20'
                }`}
                onClick={handleWithdraw}
                disabled={loading || balanceLoading}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Request Withdrawal'
                )}
              </button>

              {message.text && (
                <div className={`p-4 rounded-xl text-sm ${
                  message.type === 'success' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {message.text}
                </div>
              )}
            </div>
          </div>

          {/* Info Text */}
          <p className="text-center text-sm text-[#0f1c47]/70 mt-6">
            Transactions typically complete within 2-5 minutes
          </p>
        </div>
      </main>
    </div>
  )
}

{/*'use client'

import { useState } from 'react'
import { FiArrowLeft, FiDollarSign, FiSmartphone } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

// Reusable TopNav Component
const TopNav = () => {
  const router = useRouter()
  
  return (
    <nav className="bg-white border-b border-[#0f1c47]/10">
      <div className="container mx-auto px-4 py-3 flex items-center gap-4">
        <button 
          onClick={() => router.back()}
          className="text-[#0f1c47] hover:text-[#bf2c7e] transition-colors flex items-center gap-2"
        >
          <FiArrowLeft className="text-xl" />
          <span className="font-medium">Back</span>
        </button>
      </div>
    </nav>
  )
}

export default function WithdrawFundsPage() {
  const [amount, setAmount] = useState('')
  const [account, setAccount] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const availableBalance = 15000

  const handleWithdraw = () => {
    if (!amount || !account) {
      setMessage('Please fill in all fields.')
      return
    }
    
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setMessage('Withdrawal request submitted successfully!')
      setAmount('')
      setAccount('')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f8f9fd]">
      <TopNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Header *
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#bf2c7e]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiDollarSign className="text-3xl text-[#bf2c7e]" />
            </div>
            <h1 className="text-3xl font-bold text-[#0f1c47] mb-2">Withdraw Funds</h1>
            <p className="text-gray-600">Transfer funds directly to your M-Pesa account</p>
          </div>

          {/* Balance Card *
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-[#0f1c47]/10">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-[#0f1c47]/70">Available Balance</p>
                <p className="text-2xl font-bold text-[#0f1c47]">KES {availableBalance.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-[#bf2c7e]/10 rounded-xl flex items-center justify-center">
                <FiSmartphone className="text-xl text-[#bf2c7e]" />
              </div>
            </div>
          </div>

          {/* Withdrawal Form *
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#0f1c47]/10">
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-[#0f1c47] mb-2 block">Amount (KES)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-4 pr-12 border-2 border-[#0f1c47]/10 rounded-xl focus:border-[#bf2c7e] focus:ring-0 transition-all"
                    placeholder="Enter amount"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0f1c47]/50">KES</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#0f1c47] mb-2 block">M-Pesa Number</label>
                <input
                  type="text"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  className="w-full p-4 border-2 border-[#0f1c47]/10 rounded-xl focus:border-[#bf2c7e] focus:ring-0 transition-all"
                  placeholder="07XX XXX XXX"
                />
              </div>

              <button
                className={`w-full p-4 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 ${
                  loading 
                    ? 'bg-[#bf2c7e]/80 cursor-not-allowed' 
                    : 'bg-[#bf2c7e] hover:bg-[#a02468] shadow-lg hover:shadow-[#bf2c7e]/20'
                }`}
                onClick={handleWithdraw}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Request Withdrawal'
                )}
              </button>

              {message && (
                <div className={`p-4 rounded-xl text-sm ${
                  message.includes('success') 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {message}
                </div>
              )}
            </div>
          </div>

          {/* Info Text *
          <p className="text-center text-sm text-[#0f1c47]/70 mt-6">
            Transactions typically complete within 2-5 minutes
          </p>
        </div>
      </main>
    </div>
  )
}*/}