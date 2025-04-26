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

export interface BaseUser {
  id: string; // Use either id or userId, not both
  name: string;
  avatar?: string;
}

export interface Post {
  id: string;
  name: string; // changed from 'title' to 'name' to match schema
  description?: string;
  images: { url: string; publicId: string }[]; // updated to match images as array of objects
  tags: string[];
  type: 'product' | 'service' | 'investment'; // should be single string in interface, not array (even though mongoose has [])
  product?: any; // or better typed if needed
  service?: any;
  investment?: any;
  shelf: string | Shelf; // reference to Shelf
  createdBy: string | BaseUser; // reference to User
  status: 'active' | 'archived' | 'sold' | 'completed'; // match schema enum
  stats: {
    saves: number;
    views: number;
    likes: number;
    shares: number;
  };
  createdAt: Date;
  updatedAt: Date; // timestamps add updatedAt too
}


export interface Shelf {
  id: string;
  name: string;
  description?: string;
  bannerImage?: string;
  createdBy: string | BaseUser;
  admins?: (string | BaseUser)[];
  members: ShelfMember[];
  type: 'product' | 'service' | 'investment';
  product?: Product;
  service?: Service;
  investment?: Investment;
  visibility: 'public' | 'private'; // no "unlisted" in schema
  inviteLink?: string;
  rules?: string;
  tags: string[];
  posts: (string | Post)[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ShelfMember {
  userId: string | BaseUser;
  joinedAt: Date;
  role: 'admin' | 'contributor' | 'viewer';
}

export interface Product {
  name: string;
  price: number;
  stock: number;
  images: string[];
  category: string;
}

export interface Service {
  price: number;
  duration: string;
  availability: string[];
}

export interface Investment {
  amount: number;
  roi: number; // 0-100
  duration: string;
  riskLevel: 'low' | 'medium' | 'high';
}

