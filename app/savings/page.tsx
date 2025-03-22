'use client'

import { useState } from 'react'
import { FiArrowLeft, FiPieChart, FiPlus, FiTrendingUp, FiX } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

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

interface SavingsAccount {
  id: number
  name: string
  balance: number
  target?: number
  category: string
}

const initialSavings: SavingsAccount[] = [
  { id: 1, name: 'Emergency Fund', balance: 20000, category: 'Security' },
  { id: 2, name: 'Retirement Savings', balance: 50000, category: 'Future' },
  { id: 3, name: 'Vacation Fund', balance: 15000, category: 'Leisure' }
]

export default function SavingsPage() {
  const [savings, setSavings] = useState(initialSavings)
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [newGoal, setNewGoal] = useState({ name: '', target: '', category: '' })

  const totalBalance = savings.reduce((total, acc) => total + acc.balance, 0)

  const chartData = {
    labels: savings.map((acc) => acc.name),
    datasets: [
      {
        label: 'Balance (KES)',
        data: savings.map((acc) => acc.balance),
        backgroundColor: ['#bf2c7e', '#0f1c47', '#bf2c7e'],
        borderRadius: 8
      }
    ]
  }

  const addSavingsGoal = () => {
    if (!newGoal.name || !newGoal.target || !newGoal.category) {
      alert('Please fill all fields')
      return
    }

    setSavings([
      ...savings,
      {
        id: savings.length + 1,
        name: newGoal.name,
        balance: 0,
        target: Number(newGoal.target),
        category: newGoal.category
      }
    ])

    setNewGoal({ name: '', target: '', category: '' })
    setShowAddGoal(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f8f9fd]">
      <TopNav />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#bf2c7e]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FiTrendingUp className="text-3xl text-[#bf2c7e]" />
          </div>
          <h1 className="text-3xl font-bold text-[#0f1c47] mb-3">
            Your <span className="text-[#bf2c7e]">Savings</span> Journey
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Plan, track, and grow your savings across different goals
          </p>
        </div>

        {/* Total Balance */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-[#0f1c47]/10">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-[#0f1c47]/70">Total Savings Balance</p>
              <p className="text-3xl font-bold text-[#0f1c47]">KES {totalBalance.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-[#bf2c7e]/10 rounded-xl flex items-center justify-center">
              <FiPieChart className="text-xl text-[#bf2c7e]" />
            </div>
          </div>
        </div>

        {/* Savings Goals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {savings.map((account) => (
            <div key={account.id} className="bg-white rounded-2xl shadow-lg p-6 border border-[#0f1c47]/10">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#0f1c47]">{account.name}</h3>
                  <span className="text-sm text-[#bf2c7e] bg-[#bf2c7e]/10 px-2 py-1 rounded-full">
                    {account.category}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#0f1c47]/70">Current Balance:</span>
                  <span className="font-medium text-[#0f1c47]">KES {account.balance.toLocaleString()}</span>
                </div>

                {account.target && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#0f1c47]/70">Target:</span>
                    <span className="font-medium text-[#0f1c47]">KES {account.target.toLocaleString()}</span>
                  </div>
                )}

                {account.target && (
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-[#bf2c7e] h-2 rounded-full" 
                      style={{ width: `${(account.balance / account.target) * 100}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Goal Button */}
        <button
          onClick={() => setShowAddGoal(true)}
          className="w-full bg-[#bf2c7e] text-white py-3 rounded-xl hover:bg-[#a02468] transition-colors flex items-center justify-center gap-2 mb-8"
        >
          <FiPlus className="text-lg" />
          Add New Savings Goal
        </button>

        {/* Savings Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#0f1c47]/10">
          <h2 className="text-xl font-bold text-[#0f1c47] mb-4">Savings Distribution</h2>
          <Bar data={chartData} />
        </div>

        {/* Add Goal Modal */}
        {showAddGoal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#0f1c47]">New Savings Goal</h2>
                <button 
                  onClick={() => setShowAddGoal(false)}
                  className="text-gray-500 hover:text-[#bf2c7e]"
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-[#0f1c47] mb-2 block">Goal Name</label>
                  <input
                    type="text"
                    value={newGoal.name}
                    onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                    className="w-full p-3 border-2 border-[#0f1c47]/10 rounded-xl focus:border-[#bf2c7e]"
                    placeholder="e.g. School Fees"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#0f1c47] mb-2 block">Target Amount (KES)</label>
                  <input
                    type="number"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                    className="w-full p-3 border-2 border-[#0f1c47]/10 rounded-xl focus:border-[#bf2c7e]"
                    placeholder="Enter target amount"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#0f1c47] mb-2 block">Category</label>
                  <select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                    className="w-full p-3 border-2 border-[#0f1c47]/10 rounded-xl focus:border-[#bf2c7e]"
                  >
                    <option value="">Select category</option>
                    <option value="Education">Education</option>
                    <option value="Housing">Housing</option>
                    <option value="Leisure">Leisure</option>
                    <option value="Security">Security</option>
                    <option value="Future">Future</option>
                  </select>
                </div>

                <button
                  onClick={addSavingsGoal}
                  className="w-full bg-[#bf2c7e] text-white py-3 rounded-xl hover:bg-[#a02468] transition-colors"
                >
                  Create Savings Goal
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}