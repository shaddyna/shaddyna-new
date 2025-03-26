// types/profile.ts
//export interface User {
   // id: number;
   // name: string;
   // email: string;
   // role: 'customer' | 'seller' | 'admin';
   // location: string;
   // phone: string;
  //  avatar: string;
 // }

 export interface User {
  _id: string; // Mongoose uses ObjectId, so it should be a string
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'admin' | 'seller' | 'customer';
  deleted: boolean;
  resetToken?: string;
  resetTokenExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

  
  export interface Order {
    id: string;
    product: string;
    status: string;
    amount: number;
    date: string;
    customer: string;
    total: number
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

  export type Shop = {
    name: string;
    logo: string;
    description: string;
    categories: string[];
    contactEmail: string;
    socialMedia: {
      instagram: string;
      facebook: string;
    };
  };