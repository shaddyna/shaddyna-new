// pages/money.tsx
'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Transaction } from '@/types/types'
import { TransactionItem } from '@/components/moneyComponents/TransactionItem'
import { OverviewCard } from '@/components/moneyComponents/OverviewCard'
import { QuickActions } from '@/components/moneyComponents/QuickActions'

const quickActionsList = [
  { icon: '🎟️', label: 'Pay for Events', path: '/events' },
  { icon: '🛍️', label: 'Buy Goods', path: '/products' },
  { icon: '💸', label: 'Withdraw Funds', path: '/withdraw' },
  { icon: '📈', label: 'Make Investment', path: '/invest' },
  { icon: '💰', label: 'Savings', path: '/savings' }
]

export default function MoneyPage() {
  const { user, isLoading: authLoading } = useAuth()
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [timeFilter, setTimeFilter] = useState<string>('all') // '7days', '30days', 'all'
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAddMoney, setShowAddMoney] = useState(false)

  // Calculate balance from the last transaction (if available)
  const balance = allTransactions.length > 0 
    ? allTransactions[0].balanceAfter 
    : 0

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user?._id) return;
      
      try {
        setIsLoading(true);
        const response = await fetch(`https://shaddyna-backend.onrender.com/api/transactions/${user._id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const result = await response.json();
        if (result.success) {
          setAllTransactions(result.data);
          setFilteredTransactions(result.data); // Initially show all transactions
        } else {
          throw new Error(result.message || 'Failed to fetch transactions');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    fetchTransactions()
  }, [user?._id])

  // Filter transactions based on selected time period
  useEffect(() => {
    if (allTransactions.length === 0) return;

    const now = new Date();
    let filtered = [...allTransactions];

    if (timeFilter === '7days') {
      const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
      filtered = allTransactions.filter(t => new Date(t.createdAt) >= sevenDaysAgo);
    } else if (timeFilter === '30days') {
      const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
      filtered = allTransactions.filter(t => new Date(t.createdAt) >= thirtyDaysAgo);
    }

    setFilteredTransactions(filtered);
  }, [timeFilter, allTransactions])

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeFilter(e.target.value);
  }

  if (authLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>
  }

  if (!user) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Please login to view this page</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-4 px-3">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <OverviewCard
            title="Wallet Overview"
            value={`Ksh ${balance.toLocaleString()}`}
            description="Available Balance"
            buttonText="Top Up Wallet"
            onButtonClick={() => setShowAddMoney(true)}
          />

          <QuickActions actions={quickActionsList} />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#0f1c47]">Transaction History</h2>
            <select 
              className="border rounded-lg px-4 py-2 text-sm"
              value={timeFilter}
              onChange={handleFilterChange}
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <p>Loading transactions...</p>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-8">
              {error}
            </div>
          ) : filteredTransactions.length === 0 ? (
            <div className="text-center py-8">
              <p>No transactions found for this period</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <TransactionItem 
                  key={transaction._id} 
                  transaction={transaction}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// pages/money.tsx
{/*'use client'
import { useState } from 'react'

import { Transaction, Investment } from '@/types/types'
import { SecurityToggle } from '@/components/moneyComponents/SecurityToggle'
import { AddMoneyModal } from '@/components/moneyComponents/AddMoneyModal'
import { TransactionItem } from '@/components/moneyComponents/TransactionItem'
import { InvestmentCard } from '@/components/moneyComponents/InvestmentCard'
import { OverviewCard } from '@/components/moneyComponents/OverviewCard'
import { QuickActions } from '@/components/moneyComponents/QuickActions'

const dummyTransactions: Transaction[] = [
  {
    id: 1,
    type: 'deposit',
    date: '2024-03-15',
    amount: 15000,
    description: 'Mobile Money Deposit',
    status: 'completed'
  },
  {
    id: 2,
    type: 'withdrawal',
    date: '2024-03-14',
    amount: 5000,
    description: 'Bank Transfer',
    status: 'pending'
  },
  {
    id: 3,
    type: 'investment',
    date: '2024-03-13',
    amount: 25000,
    description: 'EcoTech Innovations Investment',
    status: 'completed'
  },
  {
    id: 4,
    type: 'purchase',
    date: '2024-03-12',
    amount: 3499,
    description: 'Online Course Subscription',
    status: 'failed'
  },
  {
    id: 5,
    type: 'deposit',
    date: '2024-03-10',
    amount: 7500,
    description: 'Client Payment Received',
    status: 'completed'
  },
  {
    id: 6,
    type: 'withdrawal',
    date: '2024-03-09',
    amount: 1500,
    description: 'ATM Withdrawal',
    status: 'completed'
  }
];

const dummyInvestments: Investment[] = [
  {
    id: 1,
    name: 'EcoTech Innovations',
    amount: 50000,
    return: 15,
    progress: 75,
    status: 'active'
  },
  {
    id: 2,
    name: 'Green Energy Fund',
    amount: 75000,
    return: 22,
    progress: 100,
    status: 'matured'
  },
  {
    id: 3,
    name: 'Africa Tech Startups',
    amount: 100000,
    return: 18,
    progress: 45,
    status: 'active'
  },
  {
    id: 4,
    name: 'Renewable Infrastructure',
    amount: 150000,
    return: 12,
    progress: 90,
    status: 'active'
  },
  {
    id: 5,
    name: 'Digital Education Initiative',
    amount: 30000,
    return: 25,
    progress: 100,
    status: 'matured'
  }
];

const quickActionsList = [
  { icon: '🎟️', label: 'Pay for Events', path: '/events' },
  { icon: '🛍️', label: 'Buy Goods', path: '/products' },
  { icon: '💸', label: 'Withdraw Funds', path: '/withdraw' },
  { icon: '📈', label: 'Make Investment', path: '/invest' },
  { icon: '💰', label: 'Savings', path: '/savings' }
]


export default function MoneyPage() {
  const [balance] = useState(18450.75)
  const [showAddMoney, setShowAddMoney] = useState(false)
  const [securityEnabled, setSecurityEnabled] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-4 px-3">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <OverviewCard
            title="Wallet Overview"
            value={`Ksh ${balance.toLocaleString()}`}
            description="Available Balance"
            buttonText="Top Up Wallet"
            onButtonClick={() => setShowAddMoney(true)}
          >
            {/*<div className="space-y-2">
              <p className="text-sm">Total Investments: Ksh 25,000</p>
              <p className="text-sm">30-Day Earnings: Ksh 4,500</p>
            </div>*
          </OverviewCard>

          <QuickActions actions={quickActionsList} />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#0f1c47]">Transaction History</h2>
            <select className="border rounded-lg px-4 py-2 text-sm">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>All Time</option>
            </select>
          </div>
          <div className="space-y-4">
            {dummyTransactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </div>

       {/*} <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-[#0f1c47] mb-6">Your Investments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyInvestments.map((investment) => (
              <InvestmentCard key={investment.id} investment={investment} />
            ))}
          </div>
        </div>

        <AddMoneyModal isOpen={showAddMoney} onClose={() => setShowAddMoney(false)} />

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-[#0f1c47] mb-6">Security Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-[#0f1c47]">Transaction PIN</p>
                <p className="text-sm text-gray-500">Require PIN for transactions</p>
              </div>
              <SecurityToggle
                enabled={securityEnabled}
                onToggle={() => setSecurityEnabled(!securityEnabled)}
              />
            </div>
          </div>
        </div>*
      </div>
    </div>
  )
}*/}