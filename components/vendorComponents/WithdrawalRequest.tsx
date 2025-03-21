import { FiPlus } from "react-icons/fi";
import Button from "../ui/Button";

interface Withdrawal {
  id: string;
  amount: number;
  status: "Completed" | "Pending"; }

interface WithdrawalRequestsProps {
  withdrawals: Withdrawal[];
  setIsWithdrawalModalOpen: (open: boolean) => void;
}

export const WithdrawalRequests: React.FC<WithdrawalRequestsProps> = ({ withdrawals, setIsWithdrawalModalOpen }) => (
  <div className="bg-white p-3 rounded-xl shadow-md">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-xl font-semibold text-[#0f1c47]">Withdrawal Requests</h3>
      <Button onClick={() => setIsWithdrawalModalOpen(true)}>
         New Request
      </Button>
    </div>
    <div className="space-y-3">
      {withdrawals.map((withdrawal) => (
        <div key={withdrawal.id} className="flex justify-between p-4 bg-gray-50 rounded-lg">
          <p className="text-[#0f1c47] font-medium">Ksh {withdrawal.amount.toLocaleString()}</p>
          <span className={`px-2 py-1 rounded-full text-sm ${
            withdrawal.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          }`}>
            {withdrawal.status}
          </span>
        </div>
      ))}
    </div>
  </div>
);
