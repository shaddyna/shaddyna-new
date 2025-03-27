"use client";

import { useState } from "react";
import Link from "next/link";
import { UserAccountIcon } from "hugeicons-react";
import { PlusCircleIcon, X } from "lucide-react";

export default function TopHomeNav() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-white shadow-md border-b lg:hidden">
        <h1 className="text-lg font-bold text-[#0f1c47]">Shaddyna</h1>
        <div className="flex items-center space-x-4">
          <button onClick={() => setIsModalOpen(true)}>
            <PlusCircleIcon size={24} className="text-[#0f1c47] hover:text-black transition" />
          </button>
          <Link href="/profile">
            <UserAccountIcon size={24} className="text-[#0f1c47] hover:text-black transition" />
          </Link>
        </div>
      </nav>

      {/* Product Adding Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-bold text-[#0f1c47]">Add Product</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X size={24} className="text-gray-600 hover:text-black transition" />
              </button>
            </div>
            <form className="mt-4 space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                className="w-full border p-2 rounded-md"
              />
              <input
                type="number"
                placeholder="Price"
                className="w-full border p-2 rounded-md"
              />
              <textarea
                placeholder="Description"
                className="w-full border p-2 rounded-md"
                rows={3}
              ></textarea>
              <button
                type="submit"
                className="w-full bg-[#0f1c47] text-white py-2 rounded-md hover:bg-[#0c1637] transition"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
