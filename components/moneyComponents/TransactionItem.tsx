// components/MoneyPage/TransactionItem.tsx
'use client'
import { Transaction } from '@/types/types'

interface TransactionItemProps {
  transaction: Transaction
}

export const TransactionItem = ({ transaction }: TransactionItemProps) => (
  <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
    <div className="flex items-center gap-4">
      <div
        className={`w-3 h-3 rounded-full ${
          transaction.type === 'deposit'
            ? 'bg-green-500'
            : transaction.type === 'withdrawal'
            ? 'bg-red-500'
            : 'bg-[#bf2c7e]'
        }`}
      />
      <div>
        <p className="font-medium text-[#0f1c47]">{transaction.description}</p>
        <p className="text-sm text-gray-500">{transaction.date}</p>
      </div>
    </div>
    <div className="text-right">
      <p
        className={`font-medium ${
          transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'
        }`}
      >
        Ksh {transaction.amount.toLocaleString()}
      </p>
      <p className="text-sm text-gray-500">{transaction.status}</p>
    </div>
  </div>
)