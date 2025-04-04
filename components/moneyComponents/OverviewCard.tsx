// components/MoneyPage/OverviewCards.tsx
/*'use client'
import { ReactNode } from 'react'
import Button from '../ui/Button'

interface OverviewCardProps {
  title: string
  value: string
  description: string
  buttonText: string
  onButtonClick: () => void
  children?: ReactNode
}

export const OverviewCard = ({
  title,
  value,
  description,
  buttonText,
  onButtonClick,
  children
}: OverviewCardProps) => (
  <div className="bg-gradient-to-r from-[#bf2c7e] to-[#0f1c47] text-white p-8 rounded-2xl shadow-lg lg:col-span-2">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <div className="flex flex-wrap gap-8">
      <div>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm opacity-90">{description}</p>
      </div>
      {children}
    </div>
    <Button
      onClick={onButtonClick}
      className="mt-6 bg-[#0f1c47] text-[#bf2c7e] px-6 py-2 rounded-full hover:bg-opacity-90 transition-opacity"
    >
      {buttonText}
    </Button>
  </div>
)
*/

// components/MoneyPage/OverviewCards.tsx
// components/MoneyPage/OverviewCards.tsx
'use client'
import { ReactNode, useState, useEffect } from 'react'
import Button from '../ui/Button'
import { useAuth } from '@/context/AuthContext'

interface OverviewCardProps {
  title: string
  value: string
  description: string
  buttonText: string
  onButtonClick: () => void
  children?: ReactNode
}

interface BalanceData {
  totalBalance?: number
  balance?: number
  userId: string
  createdAt?: string
  updatedAt?: string
}

export const OverviewCard = ({
  title,
  value,
  description,
  buttonText,
  onButtonClick,
  children
}: OverviewCardProps) => {
  const { user, token } = useAuth()
  const [balanceData, setBalanceData] = useState<BalanceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBalance = async () => {
      if (!token || !user?._id) {
        setError("Please login to view balance")
        setLoading(false)
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
          // Handle different response structures
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
        setLoading(false)
      }
    }

    fetchBalance()
  }, [token, user?._id])

  // Format balance in Kenyan Shillings
  const formatKES = (amount: number | null | undefined) => {
    const numericAmount = Number(amount || 0)
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numericAmount)
  }

  // Get current balance value safely
  const currentBalance = () => {
    if (!balanceData) return 0
    return balanceData.totalBalance ?? balanceData.balance ?? 0
  }

  // Display values
  const displayValue = loading ? "Loading..." : 
                     error ? "Error" : 
                     formatKES(currentBalance())

  const displayDescription = loading ? "Fetching your balance..." :
                            error ? error :
                            balanceData ? "Your current balance" :
                            "Account balance"

  return (
    <div className="bg-gradient-to-r from-[#bf2c7e] to-[#0f1c47] text-white p-8 rounded-2xl shadow-lg lg:col-span-2">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex flex-wrap gap-8">
        <div>
          <p className="text-3xl font-bold">{displayValue}</p>
          <p className="text-sm opacity-90">{displayDescription}</p>
        </div>
        {children}
      </div>
      <Button
        onClick={onButtonClick}
        className="mt-6 bg-[#0f1c47] text-[#bf2c7e] px-6 py-2 rounded-full hover:bg-opacity-90 transition-opacity"
        disabled={loading}
      >
        {loading ? "Processing..." : buttonText}
      </Button>

      {balanceData?.updatedAt && (
        <p className="text-xs opacity-70 mt-2">
          Last updated: {new Date(balanceData.updatedAt).toLocaleString('en-KE')}
        </p>
      )}
    </div>
  )
}