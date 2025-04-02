import { create } from 'zustand';
import { CartItem } from './cart-store';

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

interface CheckoutStore {
  items: CartItem[];
  shippingInfo: ShippingInfo | null;
  paymentDetails: PaymentDetails | null;
  setItems: (items: CartItem[]) => void;
  setShippingInfo: (address: ShippingInfo) => void;
  setPaymentDetails: (details: PaymentDetails) => void;
  clearCheckout: () => void;
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
