// components/MoneyPage/TransactionItem.tsx
'use client'
import { Transaction } from '@/types/types'

interface TransactionItemProps {
  transaction: Transaction; 
}

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  // Helper function to format the transaction type for display
  const formatTransactionType = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'Deposit';
      case 'withdrawal':
        return 'Withdrawal';
      case 'investment':
        return 'Investment';
      case 'seminar':
        return 'Seminar Payment';
      case 'purchase':
        return 'Purchase';
      default:
        return type;
    }
  };

  // Helper function to format the status for display
  const formatStatus = (status: string) => {
    switch (status) {
      case 'successful':
        return 'Completed';
      case 'pending':
        return 'Pending';
      case 'failed':
        return 'Failed';
      default:
        return status;
    }
  };

  // Format the date
  const formattedDate = new Date(transaction.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Determine description text
  const description = transaction.mpesaCode 
    ? `M-Pesa: ${transaction.mpesaCode}`
    : formatTransactionType(transaction.type);

  return (
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
          <p className="font-medium text-[#0f1c47]">{description}</p>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
      </div>
      <div className="text-right">
        <p
          className={`font-medium ${
            transaction.type === 'deposit' 
              ? 'text-green-500' 
              : transaction.type === 'withdrawal'
                ? 'text-red-500'
                : 'text-[#bf2c7e]'
          }`}
        >
          {transaction.type === 'deposit' ? '+' : '-'} 
          Ksh {transaction.amount.toLocaleString()}
        </p>
        <p 
          className={`text-sm ${
            transaction.status === 'successful'
              ? 'text-green-500'
              : transaction.status === 'failed'
                ? 'text-red-500'
                : 'text-yellow-500'
          }`}
        >
          {formatStatus(transaction.status)}
        </p>
      </div>
    </div>
  );
};