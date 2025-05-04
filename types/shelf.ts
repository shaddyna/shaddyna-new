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
  name: string; 
  description?: string;
  images: { url: string; publicId: string }[]; 
  tags: string[];
  type: 'product' | 'service' | 'investment'; 
  product?: any; 
  service?: any;
  investment?: any;
  shelf: string | Shelf; 
  createdBy: string | BaseUser; 
  status: 'active' | 'archived' | 'sold' | 'completed'; 
  stats: {
    saves: number;
    views: number;
    likes: number;
    shares: number;
  };
  createdAt: Date;
  updatedAt: Date; 
}


export interface Shelf {
  id: string;
  name: string;
  description: string;
  //bannerImage?: string;
  bannerImage: string;
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

/*export interface ShelfMember {
  userId: string | BaseUser;
  joinedAt: Date;
  role: 'admin' | 'contributor' | 'viewer';
}*/

export interface ShelfMember {
  userId: string;
  name: string;
  avatar?: string;
  role: 'owner' | 'admin' | 'member';
  // Add any other ShelfMember specific properties
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

