import Button from "../ui/Button";

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  withdrawalAmount: number;
  setWithdrawalAmount: (amount: number) => void;
  handleWithdrawalRequest: () => void;
}

export const WithdrawalModal: React.FC<WithdrawalModalProps> = ({
  isOpen,
  onClose,
  withdrawalAmount,
  setWithdrawalAmount,
  handleWithdrawalRequest,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">New Withdrawal Request</h3>
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Amount"
            className="w-full p-2 border rounded"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(Number(e.target.value))}
          />
          <div className="flex gap-2">
            <Button onClick={handleWithdrawalRequest}>Submit Request</Button>
            <Button onClick={onClose}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
