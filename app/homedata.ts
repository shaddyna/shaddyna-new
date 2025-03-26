export interface Shop {
    id: number;
    name: string;
    category: string;
    description: string;
    rating: number;
    products: number;
    isFeatured: boolean;
    icon: string;
  }
  
  export interface Shelf {
    id: string;
    name: string;
    type: 'product' | 'service' | 'other';
    description: string;
    members: number;
    openForMembers: boolean;
    icon?: string;
  }
  
  export interface Skill {
    id: string;
    title: string;
    category: string;
    type: 'freelancer' | 'other';
    user: string;
    experience: string;
    portfolio?: string;
    likes: number;
    comments: number;
  }
  
  export interface Product {
    id: number;
    name: string;
    price: string;
    shop: string;
    image: string;
    originalPrice?: string;
  }
  
  export interface Category {
    name: string;
    icon: string;
  }
  
  export interface Brand {
    id: number;
    name: string;
    logo: string;
  }
  
  export interface FinancialData {
    walletBalance: number;
    activeInvestments: number;
    recentEarnings: number;
    recentTransactions: {
      date: string;
      description: string;
      amount: number;
    }[];
  }
  
  export interface Ad {
    id: number;
    title: string;
    subtitle: string;
    image: string;
  }
  
  // Dummy data for FeaturedShops
  export const featuredShops: Shop[] = [
    {
      id: 1,
      name: "Tech Haven",
      category: "Electronics",
      description: "Cutting-edge tech gadgets and accessories for modern living",
      rating: 4.8,
      products: 42,
      isFeatured: true,
      icon: "💻"
    },
    {
      id: 2,
      name: "Urban Threads",
      category: "Fashion",
      description: "Trendsetting apparel and accessories for the style-conscious",
      rating: 4.5,
      products: 36,
      isFeatured: true,
      icon: "👕"
    },
    {
      id: 3,
      name: "Green Living",
      category: "Lifestyle",
      description: "Sustainable products for eco-friendly home and wellness",
      rating: 4.9,
      products: 28,
      isFeatured: true,
      icon: "🌿"
    }
  ];
  
  // Dummy data for ExploreShelves
  export const shelves: Shelf[] = [
    { 
      id: '1',
      name: 'Tech Innovation', 
      type: 'product',
      members: 45,
      description: 'Building the future of technology',
      openForMembers: true,
      icon: '🚀'
    },
    { 
      id: '2',
      name: 'Fashion Collabs', 
      type: 'service',
      members: 32,
      description: 'Redefining modern fashion trends',
      openForMembers: false,
      icon: '👗'
    },
    { 
      id: '3',
      name: 'Community Investments', 
      type: 'other',
      members: 28,
      description: 'Local community development projects',
      openForMembers: true,
      icon: '🤝'
    }
  ];
  
  // Dummy data for LatestSkillPosts
  export const skills: Skill[] = [
    {
      id: '1',
      title: 'Full Stack Development',
      category: 'Web Development',
      type: 'freelancer',
      user: 'Alex Johnson',
      experience: '5+ years',
      portfolio: 'alexjohnson.dev',
      likes: 24,
      comments: 8
    },
    {
      id: '2',
      title: 'UI/UX Design',
      category: 'Design',
      type: 'freelancer',
      user: 'Sarah Chen',
      experience: '3 years',
      portfolio: 'sarahchen.design',
      likes: 42,
      comments: 15
    },
    {
      id: '3',
      title: 'Digital Marketing Strategy',
      category: 'Marketing',
      type: 'other',
      user: 'Marcus Wong',
      experience: '7+ years',
      likes: 18,
      comments: 5
    }
  ];
  
  // Dummy data for Financial Summary
  export const financialData: FinancialData = {
    walletBalance: 8430.50,
    activeInvestments: 25500.00,
    recentEarnings: 2340.75,
    recentTransactions: [
      { date: '2024-03-15', description: 'Shop Earnings', amount: 1200.00 },
      { date: '2024-03-14', description: 'Shelf Investment', amount: -500.00 },
      { date: '2024-03-13', description: 'Withdrawal', amount: -200.00 }
    ]
  };
  
  // Activities data
  export const activities = [
    'Emma launched "Green Living" shop',
    'New investment in Tech Innovation shelf',
    'Alex posted Blockchain Development skill'
  ];
  
  // Events data
  export const events = [
    'Investor Networking Night',
    'E-commerce Workshop',
    'Sustainability Summit'
  ];
  
  // Categories data
  export const categories: Category[] = [
    { name: 'Electronics', icon: '📱' },
    { name: 'Fashion', icon: '👗' },
    { name: 'Home & Living', icon: '🏠' },
    { name: 'Beauty', icon: '💄' },
    { name: 'Sports', icon: '⚽' },
    { name: 'Books', icon: '📚' },
  ];
  
  // Products data
  export const products = {
    new: Array.from({ length: 5 }, (_, i) => ({
      id: i,
      name: `New Product ${i+1}`,
      price: `Ksh${(99.99 - i*10).toFixed(2)}`,
      shop: `Shop ${i+1}`,
      image: `https://placehold.co/300x200?text=Product+${i+1}`
    })),
    trending: Array.from({ length: 5 }, (_, i) => ({
      id: i,
      name: `Trending Item ${i+1}`,
      price: `Ksh${(79.99 - i*8).toFixed(2)}`,
      shop: `Store ${i+1}`,
      image: `https://placehold.co/300x200?text=Trending+${i+1}`
    })),
    discounted: Array.from({ length: 5 }, (_, i) => ({
      id: i,
      name: `Sale Item ${i+1}`,
      originalPrice: `$${129.99}`,
      price: `Ksh${(89.99 - i*10).toFixed(2)}`,
      shop: `Outlet ${i+1}`,
      image: `https://placehold.co/300x200?text=Sale+${i+1}`
    }))
  };
  
  // Brands data
  export const brands: Brand[] = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    name: `Brand ${i+1}`,
    logo: `https://placehold.co/100x50?text=Brand+${i+1}`
  }));
  
  // Ads data
  export const ads: Ad[] = [
    { id: 1, title: "Summer Sale!", subtitle: "Up to 50% off", image: "https://placehold.co/1200x400?text=Summer+Sale" },
    { id: 2, title: "New Arrivals", subtitle: "Discover latest trends", image: "https://placehold.co/1200x400?text=New+Arrivals" },
    { id: 3, title: "Premium Partners", subtitle: "Shop trusted brands", image: "https://placehold.co/1200x400?text=Premium+Brands" }
  ];