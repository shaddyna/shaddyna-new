"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { FiCreditCard, FiDollarSign, FiSave, FiSmartphone, FiUser } from "react-icons/fi";

const fetchUserSavings = async (token: string) => {
  if (!token) {
    console.error("User not authenticated - no token");
    return null;
  }

  try {
    const response = await fetch("https://shaddyna-backend.onrender.com/api/saving/savings", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch savings");
    }

    const result = await response.json();
    return result.balance || 0;
  } catch (error) {
    console.error("Error fetching savings:", error);
    return null;
  }
};

const SeminarOtherPaymentPage = () => {
  const searchParams = useSearchParams() as ReadonlyURLSearchParams;
  const initialAmount = searchParams.get("amount") || "";
  const { user, isLoading: authLoading } = useAuth();

  const [activeMethod, setActiveMethod] = useState("mpesa");
  const [formData, setFormData] = useState({
    phoneNumber: "",
    mpesaCode: "",
    mpesaName: "",
    amount: initialAmount,
    recipientName: "",
    recipientEmail: "",
    recipientPhone: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      amount: initialAmount,
      phoneNumber: user?.phoneNumber || prev.phoneNumber,
      mpesaName: `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || prev.mpesaName
    }));
  }, [initialAmount, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayWithMpesa = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    const paymentData = {
      phoneNumber: formData.phoneNumber,
      mpesaCode: formData.mpesaCode,
      mpesaName: formData.mpesaName,
      amount: formData.amount,
      seminarId: searchParams.get("seminarId"),
      userId: user?._id,
      recipientInfo: {
        name: formData.recipientName,
        email: formData.recipientEmail,
        phone: formData.recipientPhone
      }
    };
  
    try {
      const response = await axios.post("https://shaddyna-backend.onrender.com/api/seminar/pay/other/mpesa", paymentData);
      setMessage(response.data.message);
    } catch (error) {
      console.error("M-Pesa Payment Error:", error);
      setMessage("Payment failed. Please try again.");
    }
    setIsLoading(false);
  };

  const handlePayWithSavings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!user) {
      setMessage("User not authenticated");
      setIsLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Authentication token not found");
      setIsLoading(false);
      return;
    }

    const userSavings = await fetchUserSavings(token);
    if (userSavings === null) {
      setMessage("Error fetching savings. Try again.");
      setIsLoading(false);
      return;
    }

    if (userSavings < Number(formData.amount)) {
      setMessage("Insufficient savings to complete the payment.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("https://shaddyna-backend.onrender.com/api/seminar/pay/other/savings", {
        userId: user._id,
        seminarId: searchParams.get("seminarId"),
        amount: formData.amount,
        recipientInfo: {
          name: formData.recipientName,
          email: formData.recipientEmail,
          phone: formData.recipientPhone
        }
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage("Payment failed. Please try again.");
    }

    setIsLoading(false);
  };

  if (authLoading) {
    return <div className="flex justify-center items-center min-h-screen text-[#0f1c47]">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-white">      
        <div className="flex-grow flex items-center justify-center p-4">
          <p className="text-center text-red-500 font-medium">Please log in to complete your payment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-[#0f1c47] mb-6">Payment Details</h2>
            
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveMethod("mpesa")}
                className={`flex-1 py-3 rounded-xl transition-colors ${
                  activeMethod === "mpesa" 
                    ? "bg-[#bf2c7e] text-white" 
                    : "bg-[#0f1c47]/10 text-[#0f1c47] hover:bg-[#0f1c47]/20"
                }`}
              >
                <FiSmartphone className="inline mr-2" />
                M-Pesa
              </button>
              <button
                onClick={() => setActiveMethod("savings")}
                className={`flex-1 py-3 rounded-xl transition-colors ${
                  activeMethod === "savings" 
                    ? "bg-[#0f1c47] text-white" 
                    : "bg-[#0f1c47]/10 text-[#0f1c47] hover:bg-[#0f1c47]/20"
                }`}
              >
                <FiSave className="inline mr-2" />
                Savings
              </button>
            </div>

            {activeMethod === "mpesa" && (
              <form onSubmit={handlePayWithMpesa} className="space-y-4">
                <div className="space-y-4 text-[#0f1c47]">
                  <div>
                    <label className="block font-medium mb-2">Recipient Information</label>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 bg-[#0f1c47]/5 p-3 rounded-xl">
                        <FiUser className="text-[#bf2c7e]" />
                        <input
                          type="text"
                          name="recipientName"
                          placeholder="Full name"
                          className="w-full bg-transparent focus:outline-none"
                          value={formData.recipientName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="flex items-center gap-3 bg-[#0f1c47]/5 p-3 rounded-xl">
                        <FiSmartphone className="text-[#bf2c7e]" />
                        <input
                          type="text"
                          name="recipientPhone"
                          placeholder="Phone number"
                          className="w-full bg-transparent focus:outline-none"
                          value={formData.recipientPhone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-4">
                    <label className="block font-medium mb-2">Payment Details</label>
                    <div className="flex items-center gap-3 bg-[#0f1c47]/5 p-3 rounded-xl">
                      <FiSmartphone className="text-[#bf2c7e]" />
                      <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Your M-Pesa number"
                        className="w-full bg-transparent focus:outline-none"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="flex items-center gap-3 bg-[#0f1c47]/5 p-3 rounded-xl">
                      <FiCreditCard className="text-[#bf2c7e]" />
                      <input
                        type="text"
                        name="mpesaCode"
                        placeholder="M-Pesa code"
                        className="w-full bg-transparent focus:outline-none"
                        value={formData.mpesaCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="flex items-center gap-3 bg-[#0f1c47]/5 p-3 rounded-xl">
                      <FiDollarSign className="text-[#bf2c7e]" />
                      <input
                        type="text"
                        name="amount"
                        value={formData.amount}
                        readOnly
                        className="w-full bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#bf2c7e] text-white py-3 rounded-xl hover:bg-[#a02468] transition-colors font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Confirm Payment"}
                </button>
              </form>
            )}

            {activeMethod === "savings" && (
              <form onSubmit={handlePayWithSavings} className="space-y-4 text-[#0f1c47]">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-[#0f1c47]/5 p-3 rounded-xl">
                    <FiUser className="text-[#bf2c7e]" />
                    <input
                      type="text"
                      name="recipientName"
                      placeholder="Recipient's full name"
                      className="w-full bg-transparent focus:outline-none"
                      value={formData.recipientName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex items-center gap-3 bg-[#0f1c47]/5 p-3 rounded-xl">
                    <FiSmartphone className="text-[#bf2c7e]" />
                    <input
                      type="text"
                      name="recipientPhone"
                      placeholder="Recipient's phone number"
                      className="w-full bg-transparent focus:outline-none"
                      value={formData.recipientPhone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex items-center gap-3 bg-[#0f1c47]/5 p-3 rounded-xl">
                    <FiDollarSign className="text-[#bf2c7e]" />
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      className="w-full bg-transparent focus:outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0f1c47] text-white py-3 rounded-xl hover:bg-[#0f1c47]/90 transition-colors font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Pay with Savings"}
                </button>
              </form>
            )}

            {message && (
              <p className={`mt-4 text-center font-medium ${
                message.includes("failed") ? "text-red-500" : "text-green-500"
              }`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeminarOtherPaymentPage;