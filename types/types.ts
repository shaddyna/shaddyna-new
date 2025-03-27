/*export interface User {
    avatar: string;
    name: string;
    role: string;
  }*/
    export interface User {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      image?: string;
      role: string;
    }
    
    export interface Member {
      userId: string | User; // Can be either ID or populated User object
      role: string;
      _id?: string;
    }
    
    export interface Shelf {
      _id: string;
      name: string;
      description: string;
      image: string;
      type: 'product' | 'service' | 'investment';
      openForMembers: boolean;
      members: Member[];
      products: string[];
      investments: number;
      createdAt: string;
      updatedAt: string;
    }


  // types.ts
export interface Transaction {
  id: number
  type: 'deposit' | 'withdrawal' | 'investment' | 'purchase'
  date: string
  amount: number
  description: string
  status: 'completed' | 'pending' | 'failed'
}

export interface Investment {
  id: number
  name: string
  amount: number
  return: number
  progress: number
  status: 'active' | 'matured'
}