"use client"
import { useState } from 'react';

interface Transaction {
  id: number;
  type: 'deposit' | 'withdrawal' | 'investment' | 'purchase';
  date: string;
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'failed';
}

interface Investment {
  id: number;
  name: string;
  amount: number;
  return: number;
  progress: number;
  status: 'active' | 'matured';
}

const dummyTransactions: Transaction[] = [
  {
    id: 1,
    type: 'deposit',
    date: '2024-03-01',
    amount: 1500,
    description: 'Mobile Money Deposit',
    status: 'completed'
  },
  // Add more transactions...
];

const dummyInvestments: Investment[] = [
  {
    id: 1,
    name: 'EcoTech Innovations',
    amount: 5000,
    return: 15,
    progress: 75,
    status: 'active'
  },
  // Add more investments...
];

export default function MoneyPage() {
  const [balance] = useState(18450.75);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [securityEnabled, setSecurityEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container mx-auto py-12 px-4">
        {/* Wallet Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-r from-[#bf2c7e] to-[#0f1c47] text-white p-8 rounded-2xl shadow-lg lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Wallet Overview</h2>
            <div className="flex flex-wrap gap-8">
              <div>
                <p className="text-3xl font-bold">Ksh {balance.toLocaleString()}</p>
                <p className="text-sm opacity-90">Available Balance</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm">Total Investments: Ksh 25,000</p>
                <p className="text-sm">30-Day Earnings: Ksh 4,500</p>
              </div>
            </div>
            <button 
              className="mt-6 bg-white text-[#bf2c7e] px-6 py-2 rounded-full hover:bg-opacity-90 transition-opacity"
              onClick={() => setShowAddMoney(true)}
            >
              Top Up Wallet
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold text-[#0f1c47] mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg">
                💸 Withdraw Funds
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg">
                📈 View Investments
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg">
                🔒 Security Settings
              </button>
            </div>
          </div>
        </div>

        {/* Transaction History */}
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
              <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${
                    transaction.type === 'deposit' ? 'bg-green-500' : 
                    transaction.type === 'withdrawal' ? 'bg-red-500' :
                    'bg-[#bf2c7e]'}`}
                  />
                  <div>
                    <p className="font-medium text-[#0f1c47]">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'}`}>
                    Ksh {transaction.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">{transaction.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investments Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-[#0f1c47] mb-6">Your Investments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyInvestments.map((investment) => (
              <div key={investment.id} className="border rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between mb-4">
                  <h3 className="font-medium text-[#0f1c47]">{investment.name}</h3>
                  <span className="text-sm text-[#bf2c7e]">{investment.return}% ROI</span>
                </div>
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#bf2c7e] h-2 rounded-full" 
                      style={{ width: `${investment.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <p>Ksh {investment.amount.toLocaleString()}</p>
                  <p className="text-gray-500">{investment.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Money Modal */}
      {showAddMoney && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
          <div className="container mx-auto p-4 h-full flex items-center justify-center">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#0f1c47]">Add Money</h2>
                <button 
                  onClick={() => setShowAddMoney(false)}
                  className="text-gray-500 hover:text-[#bf2c7e]"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <button className="w-full p-4 border rounded-xl hover:border-[#bf2c7e] transition-colors">
                    Mobile Money
                  </button>
                  <button className="w-full p-4 border rounded-xl hover:border-[#bf2c7e] transition-colors">
                    Bank Transfer
                  </button>
                  <button className="w-full p-4 border rounded-xl hover:border-[#bf2c7e] transition-colors">
                    Credit/Debit Card
                  </button>
                </div>
                
                <div className="pt-4 border-t">
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full p-4 border rounded-xl mb-4"
                  />
                  <button className="w-full bg-[#bf2c7e] text-white py-3 rounded-xl hover:bg-opacity-90">
                    Confirm Deposit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Settings Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
        <h2 className="text-2xl font-bold text-[#0f1c47] mb-6">Security Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-[#0f1c47]">Transaction PIN</p>
              <p className="text-sm text-gray-500">Require PIN for transactions</p>
            </div>
            <button 
              onClick={() => setSecurityEnabled(!securityEnabled)}
              className={`w-12 h-6 rounded-full p-1 ${securityEnabled ? 'bg-[#bf2c7e]' : 'bg-gray-300'}`}
            >
              <div className={`bg-white w-4 h-4 rounded-full transform transition-transform ${
                securityEnabled ? 'translate-x-6' : 'translate-x-0'}`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}