// types/profile.ts
export interface User {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'vendor' | 'admin';
    location: string;
    phone: string;
    avatar: string;
  }
  
  export interface Order {
    id: number;
    product: string;
    status: string;
    amount: number;
    date: string;
  }
  
  export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
  }
  
  export interface PlatformUser {
    id: number;
    name: string;
    role: 'user' | 'vendor' | 'admin';
    status: 'active' | 'pending' | 'banned';
  }