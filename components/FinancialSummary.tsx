'use client';

import { FC } from 'react';

const FinancialSummary: FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-[#0f1c47]">Financial Summary</h2>
        <div className="bg-gray-50 p-6 rounded-xl">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            <div>
              <p className="text-gray-600">Wallet Balance</p>
              <p className="text-2xl font-bold text-[#0f1c47]">$5,430.00</p>
            </div>
            <div>
              <p className="text-gray-600">Active Investments</p>
              <p className="text-2xl font-bold text-[#0f1c47]">$12,500.00</p>
            </div>
            <div>
              <p className="text-gray-600">Recent Earnings</p>
              <p className="text-2xl font-bold text-[#0f1c47]">$2,340.00</p>
            </div>
          </div>
          <button className="text-[#bf2c7e] hover:text-[#a8246d] font-medium">
            View Full Financial Details →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinancialSummary;