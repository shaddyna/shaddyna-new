import { create } from 'zustand';
import { CartItem } from './cart-store';

// Define PaymentDetail interface
interface PaymentDetail {
  sellerId: string;
  phoneNumber: string;
  mpesaCode: string;
  mpesaName: string;
  amount: number;
  items: Array<{
    _id: string;
    quantity: number;
  }>;
}

// Define ShippingInfo interface
interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  additionalInfo?: string;
}

// Updated CheckoutStore interface
interface CheckoutStore {
  items: CartItem[];
  shippingInfo: ShippingInfo | null;
  paymentDetails: PaymentDetail[] | null; // Use PaymentDetail[] here
  setItems: (items: CartItem[]) => void;
  setShippingInfo: (address: ShippingInfo) => void;
  setPaymentDetails: (details: PaymentDetail[]) => void; // Updated to use PaymentDetail[]
  clearCheckout: () => void;
}

// Create the Zustand store
export const useCheckoutStore = create<CheckoutStore>((set) => ({
  items: [],
  shippingInfo: null,
  paymentDetails: null,
  setItems: (items) => set({ items }),
  setShippingInfo: (address) => set({ shippingInfo: address }),
  setPaymentDetails: (details) => set({ paymentDetails: details }), // Updated to use PaymentDetail[]
  clearCheckout: () => set({ items: [], shippingInfo: null, paymentDetails: null }),
}));


/*import { create } from 'zustand';
import { CartItem } from './cart-store';


// In your checkout-store.ts
interface PaymentDetail {
  sellerId: string;
  phoneNumber: string;
  mpesaCode: string;
  mpesaName: string;
  amount: number;
  items: Array<{
    _id: string;
    quantity: number;
  }>;
}

interface CheckoutStore {
  items: CartItem[];
  shippingInfo: ShippingInfo | null;
  paymentDetails: PaymentDetail[] | null; // Changed to array
  setItems: (items: CartItem[]) => void;
  setShippingInfo: (address: ShippingInfo) => void;
  setPaymentDetails: (details: PaymentDetail[]) => void; // Updated type
  clearCheckout: () => void;
}



interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  additionalInfo?: string;
}

interface PaymentDetails {
  phoneNumber: string;
  mpesaCode: string;
  mpesaName: string;
}


export const useCheckoutStore = create<CheckoutStore>((set) => ({
  items: [],
  shippingInfo: null,
  paymentDetails: null,
  setItems: (items) => set({ items }),
  setShippingInfo: (address) => set({ shippingInfo: address }),
  setPaymentDetails: (details) => set({ paymentDetails: details }),
  clearCheckout: () => set({ items: [], shippingInfo: null, paymentDetails: null }),
}));
*/