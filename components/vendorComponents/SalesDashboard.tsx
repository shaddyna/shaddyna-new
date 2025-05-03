interface Order {
    status: string;
  }
  
  interface SalesDashboardProps {
    totalRevenue: number;
    //orders: Order[];
  }
  
  export const SalesDashboard: React.FC<SalesDashboardProps> = ({ totalRevenue, }) => (
    <div className="bg-white p-3 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Sales Dashboard</h3>
      <div className="space-y-3">
        <p className="text-lg font-medium">Total Revenue: Ksh {totalRevenue.toLocaleString()}</p>
       {/*} <p className="text-sm text-gray-500">
          Pending Orders: {orders.filter((o: Order) => o.status === "Pending").length}
        </p>*/}
      </div>
    </div>
  );
  