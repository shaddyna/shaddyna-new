export interface User {
    avatar: string;
    name: string;
    role: string;
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