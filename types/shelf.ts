export interface User {
  id: string;
  userId: string;
  name: string;
  avatar?: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: Date;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  type: 'product' | 'service' | 'investment';
  price?: number;
  currency?: string;
  images: string[];
  createdAt: Date;
  createdBy: User;
  status: 'active' | 'sold' | 'closed';
  tags: string[];
  stats: {
    views: number;
    saves: number;
    inquiries: number;
  };
  investmentDetails?: {
    roi: number;
    duration: string;
  };
}
export interface Shelf {
  _id: string;
  name: string;
  description: string;
  bannerImage: string;
  createdBy: User;
  members: User[];
  createdAt: Date;
  type: ('products' | 'services' | 'investments')[];
  visibility: 'public' | 'private' | 'unlisted';
  rules: string;
  tags: string[];
  stats: {
    totalPosts: number;
    activeMembers: number;
  };
}

/*export type User = {
    id: string;
    name: string;
    avatar: string;
    role: 'owner' | 'admin' | 'member';
    joinedAt: Date;
  };
  
  export type Post = {
    id: string;
    title: string;
    description: string;
    type: 'product' | 'service' | 'investment';
    price?: number;
    currency?: string;
    images: string[];
    createdAt: Date;
    createdBy: User;
    status: 'active' | 'sold' | 'closed';
    tags: string[];
    stats: {
      views: number;
      saves: number;
      inquiries: number;
    };
  };
  
  export type Shelf = {
    _id: string;
    name: string;
    description: string;
    bannerImage: string;
    createdBy: User;
    members: User[];
    createdAt: Date;
    types: ('products' | 'services' | 'investments')[];
    visibility: 'public' | 'private' | 'unlisted';
    rules: string;
    tags: string[];
    stats: {
      totalPosts: number;
      activeMembers: number;
    };
  };*/
  
  // Dummy data generator functions
 /* export const generateDummyUser = (id: string, name: string, role: User['role'] = 'member'): User => ({
    id,
    name,
    avatar: `https://randomuser.me/api/portraits/${role === 'member' ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
    role,
    joinedAt: new Date(),
  });
  
  export const generateDummyShelf = (id: string, currentUser: User): Shelf => ({
    id,
    name: `${['Tech', 'Creative', 'Business', 'Art', 'Finance'][Math.floor(Math.random() * 5)]} ${['Hub', 'Collective', 'Network', 'Group', 'Community'][Math.floor(Math.random() * 5)]}`,
    description: `${['A community for', 'Collaborative space for', 'Network of'][Math.floor(Math.random() * 3)]} ${['entrepreneurs', 'creatives', 'investors', 'professionals'][Math.floor(Math.random() * 4)]} to ${['collaborate', 'share ideas', 'grow together', 'network'][Math.floor(Math.random() * 4)]}.`,
    bannerImage: `https://source.unsplash.com/random/800x400/?${['tech', 'business', 'office', 'creative', 'startup'][Math.floor(Math.random() * 5)]}`,
    createdBy: currentUser,
    members: Array.from({ length: Math.floor(Math.random() * 10) + 3 }, (_, i) => 
      generateDummyUser(`user-${i}`, ['Alex', 'Maria', 'Sam', 'Jordan', 'Taylor'][Math.floor(Math.random() * 5)])
    ),
    createdAt: new Date(),
    types: ['products', 'services', 'investments'].filter(() => Math.random() > 0.3) as Shelf['types'],
    visibility: ['public', 'private', 'unlisted'][Math.floor(Math.random() * 3)] as Shelf['visibility'],
    rules: '1. Be respectful\n2. No spam\n3. Only post relevant content',
    tags: ['technology', 'startups', 'innovation', 'networking'].filter(() => Math.random() > 0.3),
    stats: {
      totalPosts: Math.floor(Math.random() * 50),
      activeMembers: Math.floor(Math.random() * 20) + 3,
    },
  });*/
