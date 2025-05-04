'use client'

import { useState, useEffect } from 'react'
import { FiArrowLeft, FiDollarSign, FiUser, FiShield } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'


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

export default function MoneyTransferPage() {
  const [amount, setAmount] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [confirmationCode, setConfirmationCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })

  const [balanceData, setBalanceData] = useState<any>({})
  const [balanceError, setError] = useState<string | null>(null)
  const [balanceLoading, setBalanceLoading] = useState(true)

  const { token, user } = useAuth()

  useEffect(() => {
    const fetchBalance = async () => {
      if (!token || !user?._id) {
        setError("Please login to view balance")
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
          setError(null)
        } else {
          setError(responseData.message || "Failed to fetch balance")
        }
      } catch (err) {
        console.error('Fetch error:', err)
        setError("Network error. Please try again.")
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

 
  const handleTransfer = async () => {
    if (!amount || !accountNumber || !confirmationCode) {
      setMessage({ text: 'Please fill in all fields.', type: 'error' });
      return;
    }
  
    if (parseFloat(amount) > (balanceData.totalBalance || 0)) {
      setMessage({ text: 'Insufficient balance for this transfer.', type: 'error' });
      return;
    }
  
    // You can replace this with a more secure method like OTP/PIN in future
    if (confirmationCode !== 'CONFIRM123') {
      setMessage({ text: 'Invalid confirmation code.', type: 'error' });
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch('https://shaddyna-backend.onrender.com/api/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // or however you store it
        },
        body: JSON.stringify({
          recipientId: accountNumber, // Should be MongoDB _id of the recipient
          amount: parseFloat(amount),
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Transfer failed.');
      }
  
      setMessage({
        text: `KES ${amount} transferred successfully to account ${accountNumber}!`,
        type: 'success',
      });
  
      setAmount('');
      setAccountNumber('');
      setConfirmationCode('');
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      setMessage({ text: errorMessage, type: 'error' });
    } finally {
      setLoading(false);
    }
  };
  

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
            <h1 className="text-3xl font-bold text-[#0f1c47] mb-2">Money Transfer</h1>
            <p className="text-gray-600">Send money to another account securely</p>
          </div>

          {/* Balance Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-[#0f1c47]/10">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-[#0f1c47]/70">Available Balance</p>
                {balanceLoading ? (
                  <p className="text-lg text-gray-500 italic">Loading...</p>
                ) : balanceError ? (
                  <p className="text-red-500 text-sm">{balanceError}</p>
                ) : (
                  <p className="text-2xl font-bold text-[#0f1c47]">{formatKES(balanceData.totalBalance)}</p>
                )}
              </div>
              <div className="w-12 h-12 bg-[#bf2c7e]/10 rounded-xl flex items-center justify-center">
                <FiDollarSign className="text-xl text-[#bf2c7e]" />
              </div>
            </div>
          </div>

          {/* Transfer Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#0f1c47]/10">
            <div className="space-y-6">
              {/* Amount */}
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
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0f1c47]/50">KES</span>
                </div>
              </div>

              {/* Account Number */}
              <div>
                <label className="text-sm font-medium text-[#0f1c47] mb-2 block">Account Number</label>
                <div className="relative">
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => {
                      setAccountNumber(e.target.value)
                      setMessage({ text: '', type: '' })
                    }}
                    className="w-full p-4 pl-12 border-2 border-[#0f1c47]/10 rounded-xl focus:border-[#bf2c7e] focus:ring-0 transition-all"
                    placeholder="Enter account number"
                  />
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0f1c47]/50" />
                </div>
              </div>

              {/* Confirmation Code */}
              <div>
                <label className="text-sm font-medium text-[#0f1c47] mb-2 block">Confirmation Code</label>
                <div className="relative">
                  <input
                    type="text"
                    value={confirmationCode}
                    onChange={(e) => {
                      setConfirmationCode(e.target.value)
                      setMessage({ text: '', type: '' })
                    }}
                    className="w-full p-4 pl-12 border-2 border-[#0f1c47]/10 rounded-xl focus:border-[#bf2c7e] focus:ring-0 transition-all"
                    placeholder="Enter confirmation code"
                  />
                  <FiShield className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0f1c47]/50" />
                </div>
                <p className="text-xs text-[#0f1c47]/50 mt-2">
                  Ask the recipient for their confirmation code
                </p>
              </div>

              {/* Button */}
              <button
                className={`w-full p-4 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 ${
                  loading 
                    ? 'bg-[#bf2c7e]/80 cursor-not-allowed' 
                    : 'bg-[#bf2c7e] hover:bg-[#a02468] shadow-lg hover:shadow-[#bf2c7e]/20'
                }`}
                onClick={handleTransfer}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing Transfer...
                  </>
                ) : (
                  'Confirm Transfer'
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

          {/* Security Info */}
          <div className="bg-[#bf2c7e]/5 rounded-xl p-4 mt-6 border border-[#bf2c7e]/10">
            <div className="flex items-start gap-3">
              <FiShield className="text-[#bf2c7e] mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-[#0f1c47] mb-1">Secure Transfer</h3>
                <p className="text-xs text-[#0f1c47]/70">
                  All transfers are encrypted and processed securely. The confirmation code ensures the money goes to the right account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
