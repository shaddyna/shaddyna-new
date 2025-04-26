export interface User {
    id: string;
    name: string;
    avatar: string;
    bio: string;
    location: string;
    skills: string[];
    joinedAt: Date;
  }
  
  export interface Skill {
    _id: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    price?: number;
    priceType?: 'hourly' | 'fixed' | 'negotiable';
    images: string[];
    createdAt: Date;
    createdBy: User;
    likes: string[]; // user IDs who liked
    stats: {
      views: number;
      inquiries: number;
    };
  }
  
  export interface Comment {
    _id: string;
    content: string;
    createdAt: Date;
    user: User;
    replies?: Comment[];
  }