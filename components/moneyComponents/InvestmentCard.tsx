// components/MoneyPage/InvestmentCard.tsx
'use client'
import { Investment } from '@/types/types'

interface InvestmentCardProps {
  investment: Investment
}

export const InvestmentCard = ({ investment }: InvestmentCardProps) => (
  <div className="border rounded-xl p-4 hover:shadow-md transition-shadow">
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
)