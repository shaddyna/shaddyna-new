'use client'

import { useState } from 'react'
import { FiArrowLeft, FiBriefcase, FiDollarSign, FiCheckCircle, FiTrendingUp, FiX } from 'react-icons/fi'
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

interface Investment {
  id: number
  name: string
  roi: string
  minAmount: number
  category: string
}

const investments: Investment[] = [
  { id: 1, name: 'Real Estate Fund', roi: '12% Annual', minAmount: 5000, category: 'Property' },
  { id: 2, name: 'Tech Startups', roi: '20% Annual', minAmount: 10000, category: 'Technology' },
  { id: 3, name: 'Crypto Portfolio', roi: '15% Annual', minAmount: 3000, category: 'Crypto' },
  { id: 4, name: 'Green Energy', roi: '10% Annual', minAmount: 7000, category: 'Energy' }
]

const InvestmentCard = ({ investment, onInvest }: { investment: Investment, onInvest: () => void }) => (
  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-[#0f1c47]/10">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-[#bf2c7e]/10 rounded-xl flex items-center justify-center">
            <FiBriefcase className="text-xl text-[#bf2c7e]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0f1c47]">{investment.name}</h3>
            <span className="text-sm text-[#bf2c7e] bg-[#bf2c7e]/10 px-2 py-1 rounded-full">
              {investment.category}
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-[#0f1c47]/70">Minimum Investment</p>
            <p className="font-medium text-[#0f1c47]">KES {investment.minAmount.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-[#0f1c47]/70">Projected Returns</p>
            <p className="font-medium text-green-600">{investment.roi}</p>
          </div>
        </div>
      </div>
    </div>
    
    <button
      onClick={onInvest}
      className="w-full mt-4 bg-[#bf2c7e] text-white py-3 rounded-xl hover:bg-[#a02468] transition-colors flex items-center justify-center gap-2"
    >
      <FiTrendingUp className="text-lg" />
      Invest Now
    </button>
  </div>
)

const InvestmentModal = ({ investment, onClose, onConfirm }: { 
  investment: Investment, 
  onClose: () => void,
  onConfirm: (amount: number) => void 
}) => {
  const [amount, setAmount] = useState('')
  const [step, setStep] = useState(1)

  const handleConfirm = () => {
    if (Number(amount) < investment.minAmount) {
      alert(`Minimum investment is KES ${investment.minAmount.toLocaleString()}`)
      return
    }
    setStep(2)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        {step === 1 ? (
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-[#0f1c47]">{investment.name}</h2>
                <p className="text-sm text-[#bf2c7e] mt-1">{investment.category}</p>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-[#bf2c7e]">
                <FiX className="text-xl" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#0f1c47]">Investment Amount (KES)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-4 border-2 border-[#0f1c47]/10 rounded-xl focus:border-[#bf2c7e] mt-2"
                  placeholder={`Minimum ${investment.minAmount.toLocaleString()}`}
                />
              </div>

              <div className="bg-[#bf2c7e]/5 p-4 rounded-xl">
                <div className="flex justify-between text-sm">
                  <span className="text-[#0f1c47]/70">Projected Returns:</span>
                  <span className="font-medium text-green-600">{investment.roi}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-[#0f1c47]/70">Estimated Annual Profit:</span>
                  <span className="font-medium text-[#0f1c47]">
                    KES {(Number(amount) * parseFloat(investment.roi)/100).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full bg-[#bf2c7e] text-white py-3 rounded-xl hover:bg-[#a02468] transition-colors"
            >
              Confirm Investment
            </button>
          </div>
        ) : (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheckCircle className="text-3xl text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-[#0f1c47] mb-2">Investment Successful!</h3>
            <p className="text-gray-600 mb-6">
              You've invested <span className="font-bold">KES {Number(amount).toLocaleString()}</span> in {investment.name}
            </p>
            <button
              onClick={() => {
                onConfirm(Number(amount))
                onClose()
              }}
              className="w-full bg-[#bf2c7e] text-white py-3 rounded-xl hover:bg-[#a02468] transition-colors"
            >
              View Portfolio
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function InvestPage() {
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null)
  const [portfolio, setPortfolio] = useState<{ name: string; amount: number }[]>([])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f8f9fd]">
      <TopNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-[#bf2c7e]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FiTrendingUp className="text-3xl text-[#bf2c7e]" />
          </div>
          <h1 className="text-3xl font-bold text-[#0f1c47] mb-3">
            Grow Your <span className="text-[#bf2c7e]">Wealth</span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Discover curated investment opportunities with competitive returns
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {investments.map((investment) => (
            <InvestmentCard
              key={investment.id}
              investment={investment}
              onInvest={() => setSelectedInvestment(investment)}
            />
          ))}
        </div>

        {selectedInvestment && (
          <InvestmentModal
            investment={selectedInvestment}
            onClose={() => setSelectedInvestment(null)}
            onConfirm={(amount) => {
              setPortfolio([...portfolio, { 
                name: selectedInvestment.name, 
                amount: amount 
              }])
              setSelectedInvestment(null)
            }}
          />
        )}

        {portfolio.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-[#0f1c47] mb-6">Your Investment Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolio.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-[#0f1c47]/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-[#0f1c47]">{item.name}</h3>
                      <p className="text-sm text-[#bf2c7e]">Active Investment</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#0f1c47]">KES {item.amount.toLocaleString()}</p>
                      <p className="text-sm text-green-600">+2.4% Today</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
