// types/order.ts

/*export interface PaymentItem {
    _id: string; // ObjectId as string
    name: string;
    price: number;
    quantity: number;
    image: string;
    color?: string;
    sellerId: string; // ObjectId as string
  }
  
  export interface Payment {
    sellerId: string; // ObjectId as string
    phoneNumber: string;
    mpesaCode: string;
    mpesaName: string;
    amount: number;
    items: PaymentItem[];
    createdAt?: string; // from timestamps
    updatedAt?: string;
  }
  
  export interface Shipping {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    additionalInfo?: string;
  }
  
  export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  
  export interface Order {
    _id?: string; 
    buyerId: string; 
    shipping: Shipping;
    payments: Payment[];
    status: OrderStatus;
    totalAmount: number;
    createdAt?: string;
    updatedAt?: string;
  }
  */

  // types/order.ts

export interface PaymentItem {
  _id: string; // ObjectId as string
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  sellerId: string; // ObjectId as string
  productId: string; // ObjectId as string, assuming it refers to a product
}

export interface Payment {
  sellerId: string; // ObjectId as string
  phoneNumber: string;
  mpesaCode: string;
  mpesaName: string;
  amount: number;
  items: PaymentItem[];
  createdAt?: string; // from timestamps
  updatedAt?: string;
}

export interface Shipping {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  additionalInfo?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  _id?: string; 
  buyerId: string; 
  shipping: Shipping;
  payments: Payment[];
  status: OrderStatus;
  totalAmount: number;
  createdAt?: string;
  updatedAt?: string;
}
