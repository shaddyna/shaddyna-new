// components/MoneyPage/AddMoneyModal.tsx
'use client'

interface AddMoneyModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AddMoneyModal = ({ isOpen, onClose }: AddMoneyModalProps) => (
  isOpen && (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
      <div className="container mx-auto p-4 h-full flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#0f1c47]">Add Money</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-[#bf2c7e]">
              ✕
            </button>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-4">
              {['Mobile Money', 'Bank Transfer', 'Credit/Debit Card'].map((method) => (
                <button
                  key={method}
                  className="w-full p-4 border rounded-xl hover:border-[#bf2c7e] transition-colors"
                >
                  {method}
                </button>
              ))}
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
  )
)