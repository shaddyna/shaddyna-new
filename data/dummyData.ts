// data/dummyData.ts
import { User, Order, Product, PlatformUser } from '@/types/profile';

export const dummyUser: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  role: 'seller',
  location: 'Nairobi',
  phone: '+254712345678',
  avatar: 'https://via.placeholder.com/150'
};
export const dummyOrders: Order[] = [
  {
    id: "1",
    product: "Wireless Headphones Pro",
    status: "delivered",
    amount: 299.99,
    date: "2024-03-10",
    customer: '',
    total: 0
  },
  {
    id: "2",
    product: "Leather Laptop Bag",
    status: "pending",
    amount: 149.50,
    date: "2024-03-12",
    customer: '',
    total: 0
  },
  {
    id: "3",
    product: "Smart Watch Series 5",
    status: "cancelled",
    amount: 199.99,
    date: "2024-03-15",
    customer: '',
    total: 0
  },
  {
    id: "4",
    product: "Noise Cancelling Earbuds",
    status: "shipped",
    amount: 179.95,
    date: "2024-03-18",
    customer: '',
    total: 0
  }
];

export const dummyProducts: Product[] = [
  {
    id: 1,
    name: "Premium Bluetooth Speaker",
    price: 129.99,
    stock: 25
  },
  {
    id: 2,
    name: "Wireless Charging Pad",
    price: 49.99,
    stock: 50
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    price: 299.95,
    stock: 10
  },
  {
    id: 4,
    name: "4K Webcam with Mic",
    price: 89.99,
    stock: 35
  }
];
  
  export const dummyUsers: PlatformUser[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "user",
      status: "active"
    },
    {
      id: 2,
      name: "TechGadgets Ltd",
      role: "vendor",
      status: "pending"
    },
    {
      id: 3,
      name: "Admin User",
      role: "admin",
      status: "active"
    },
    {
      id: 4,
      name: "DesignHub Collective",
      role: "vendor",
      status: "banned"
    },
    {
      id: 5,
      name: "Mike Chen",
      role: "user",
      status: "active"
    },
    {
      id: 6,
      name: "Fake Store",
      role: "vendor",
      status: "pending"
    }
  ]