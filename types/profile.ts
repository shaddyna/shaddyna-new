
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string; // Make it optional with ?
  password: string;
  role: 'admin' | 'seller' | 'customer';
  deleted: boolean;
  member: boolean;
  resetToken?: string;
  resetTokenExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}


export interface Seller {
  _id: string; 
  name: string;
  email: string;
  phoneNumber?: string; 
  mpesaCode: string;
  amount: number;
  status: 'inactive' | 'pending' | 'active';
  createdAt: string;
  updatedAt: string; 
}

  
  export interface PlatformUser {
    id: number;
    name: string;
    role: 'user' | 'vendor' | 'admin';
    status: 'active' | 'pending' | 'banned';
  }

  export interface Shop {
    _id: string;
    name: string;
    description: string;
    phoneNumber: string;
    openingHours: string; // default: "09:00"
    closingHours: string; // default: "18:00"
    email: string;
    location: string;
    category: string;
    attributes: Record<string, any>; // flexible key-value object
    sellerId: string; // ObjectId reference to Seller
    socialMedias: Array<{
      platform: string;
      url: string;
    }>;
    images: string[]; // array of image URLs
    isFeatured: boolean;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
  }

  type TransactionType = 
  | 'deposit' 
  | 'withdrawal' 
  | 'investment' 
  | 'seminar' 
  | 'purchase' 
  | 'transfer_sent' 
  | 'transfer_received';

type TransactionStatus = 'pending' | 'successful' | 'failed';

export interface Transaction {
  _id: string;
  userId: string; // ObjectId reference to User
  type: TransactionType;
  amount: number;
  mpesaCode?: string; // Only present if type is 'deposit'
  status: TransactionStatus;
  balanceBefore: number;
  balanceAfter: number;
  createdAt: Date;
  updatedAt: Date;
}




export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface PaymentItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  sellerId: string;
}

export interface Payment {
  sellerId: string;
  phoneNumber: string;
  mpesaCode: string;
  mpesaName: string;
  amount: number;
  items: PaymentItem[];
  createdAt?: string;
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

export interface Order {
  _id: string;
  buyerId: string;
  shipping: Shipping;
  payments: Payment[];
  status: OrderStatus;
  totalAmount: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  _id?: string; 
  name: string;
  stock: number;
  description?: string;
  price: number;
  category: string;
  attributes: Record<string, any>; 
  images: string[];
  createdAt?: string; 
  updatedAt?: string; 
}

/*export interface SellerRequest {
  _id?: string; 
  userId: string; 
  status?: 'pending' | 'approved' | 'rejected'; 
  paymentMethod?: 'mpesa' | 'card' | 'bank'; 
  mpesaName?: string;
  mpesaCode?: string; 
  amount: number;
  processedAt?: string | Date;
  processedBy?: string; 
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
*/
export interface SellerRequest {
  _id: string;
  amount: number;
  paymentMethod: string;
  mpesaName?: string;
  mpesaCode?: string;
  status: 'pending' | 'approved' | 'rejected';
  processedAt?: string;
  userId: {
    firstName: string;
    lastName: string;
    email: string;
  }; // Explicitly define the type
}