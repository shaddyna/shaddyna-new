
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
    
    // User reference (simplified from mongoose.Schema.Types.ObjectId ref)
interface UserReference {
  _id: string;
  firstName?: string;
  email?: string;
  // Add other user fields you need in frontend
}

// Member interface (matches MemberSchema)
interface ShelfMember {
  userId: string | UserReference; // Can be just ID or populated user
  role: string;
}

// Product details (matches ProductDetailsSchema)
interface ShelfProductDetails {
  name: string;
  price: number;
  stock: number;
  images: string[]; // URLs from cloud storage
  category: string;
}

// Service details (matches ServiceDetailsSchema)
type Weekday = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

interface ShelfServiceDetails {
  price: number;
  duration: string;
  availability: Weekday[];
}

// Investment details (matches InvestmentDetailsSchema)
type RiskLevel = 'low' | 'medium' | 'high';

interface ShelfInvestmentDetails {
  amount: number;
  roi: number;
  duration: string;
  riskLevel: RiskLevel;
}

// Main Shelf interface (matches ShelfSchema)
export interface Shelf {
  _id: string;
  name: string;
  description: string;
  type: 'product' | 'service' | 'investment';
  openForMembers: boolean;
  members: ShelfMember[];
  
  // Conditional type-specific details
  productDetails?: ShelfProductDetails;
  serviceDetails?: ShelfServiceDetails;
  investmentDetails?: ShelfInvestmentDetails;

  // Timestamps (can be strings if JSON serialized)
  createdAt: string | Date;
  updatedAt: string | Date;
  
  // Version key
  __v?: number;
}

export interface CreateShelfFormProps {
  onSuccess: (newShelf: Shelf) => void; // Called after successful creation
  onCancel: () => void;
  users: User[];
  loading?: boolean;
}

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