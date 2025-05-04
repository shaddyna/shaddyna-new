/*"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { ShelfBanner } from '@/components/shelfComponents/ShelfBanner';
import { ShelfHeader } from '@/components/shelfComponents/ShelfHeader';
import { ShelfNavigation } from '@/components/shelfComponents/ShelfNavigation';
import { PostCard } from '@/components/shelfComponents/PostCard';
import { MembersTable } from '@/components/shelfComponents/MembersTable';
import { AboutShelf } from '@/components/shelfComponents/AboutShelf';
import { InviteModal } from '@/components/shelfComponents/InviteModal';
import { Shelf, Post, User } from '@/types/shelf';
import { CreatePostModal } from '@/components/shelfComponents/CreatePostModal';

const ShelfDetailPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const [shelf, setShelf] = useState<Shelf | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  // UI State
  const [activeTab, setActiveTab] = useState<'posts' | 'members' | 'about'>('posts');
  const [postTypeFilter, setPostTypeFilter] = useState<'all' | 'product' | 'service' | 'investment'>('all');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const handleCreatePost = (newPost: Omit<Post, 'id' | 'createdAt' | 'createdBy' | 'status' | 'stats'>) => {
    const fullPost: Post = {
      ...newPost,
      id: `post-${Date.now()}`,
      createdAt: new Date(),
      createdBy: currentUser!,
      status: 'active',
      stats: {
        views: 0,
        saves: 0,
        inquiries: 0,
      },
    };
    setPosts([fullPost, ...posts]);
    setShowCreatePostModal(false);
  };

  useEffect(() => {
    if (!id) return;

    const fetchShelfData = async () => {
      try {
        setLoading(true);
        const shelfResponse = await axios.get(`http://localhost:5000/api/shelf/${id}`);
        setShelf(shelfResponse.data);
        setPosts(generateDummyPosts(shelfResponse.data));
        setCurrentUser({
          id: 'current-user',
          userId: 'current-user',
          name: 'You',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          role: 'owner',
          joinedAt: new Date(),
        });
      } catch (err) {
        setError('Failed to fetch shelf data');
        console.error('Error fetching shelf:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchShelfData();
  }, [id]);

  const generateDummyPosts = (shelf: Shelf): Post[] => {
    if (!shelf) return [];
    
    return [
      {
        id: 'post-1',
        title: 'AI Content Generator SaaS',
        description: 'A cutting-edge AI platform that generates high-quality content for blogs, social media, and marketing materials.',
        type: 'product',
        price: 299,
        currency: 'USD',
        images: [
          'https://images.unsplash.com/photo-1677442135136-760c813a743d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        ],
        createdAt: new Date('2023-05-15'),
        createdBy: shelf.members?.[0] || {
          id: 'user-2',
          userId: 'user-2',
          name: 'Alex Johnson',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          role: 'admin',
          joinedAt: new Date('2023-02-10'),
        },
        status: 'active',
        tags: ['AI', 'SaaS', 'content creation'],
        stats: {
          views: 142,
          saves: 28,
          inquiries: 9,
        },
      },
      {
        id: 'post-2',
        title: 'Blockchain Development Services',
        description: 'Expert blockchain developers available for smart contract development, dApps, and consulting.',
        type: 'service',
        price: 150,
        currency: 'USD/hr',
        images: [
          'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        ],
        createdAt: new Date('2023-06-02'),
        createdBy: shelf.members?.[1] || {
          id: 'user-3',
          userId: 'user-3',
          name: 'Maria Garcia',
          avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
          role: 'member',
          joinedAt: new Date('2023-03-05'),
        },
        status: 'active',
        tags: ['blockchain', 'development', 'web3'],
        stats: {
          views: 89,
          saves: 15,
          inquiries: 4,
        },
      },
    ];
  };

  const filteredPosts = postTypeFilter === 'all' 
    ? posts 
    : posts.filter(post => post.type === postTypeFilter);

  const handleInvite = (email: string, role: string) => {
    // Handle invite logic here
    console.log(`Inviting ${email} as ${role}`);
    setShowInviteModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading shelf...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!shelf) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Shelf not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{shelf.name} | Shelf</title>
        <meta name="description" content={shelf.description} />
      </Head>

      <ShelfBanner 
        bannerImage={shelf.bannerImage} 
        name={shelf.name} 
        description={shelf.description} 
      />

      <ShelfHeader 
        members={shelf.members} 
        currentUser={currentUser} 
        onInviteClick={() => setShowInviteModal(true)} 
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <ShelfNavigation 
              activeTab={activeTab} 
              postTypeFilter={postTypeFilter} 
              tags={shelf.tags} 
              onTabChange={setActiveTab} 
              onFilterChange={setPostTypeFilter} 
            />
          </div>

          <div className="lg:w-3/4">
            {activeTab === 'posts' && (
              <div>
               <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#0f1c47]">
                    {postTypeFilter === 'all' ? 'All Posts' : `${postTypeFilter.charAt(0).toUpperCase() + postTypeFilter.slice(1)}s`}
                  </h2>
                  <button 
                    onClick={() => setShowCreatePostModal(true)}
                    className="px-4 py-2 bg-[#bf2c7e] text-white rounded-md hover:bg-[#a8256d] transition-colors"
                  >
                    Create Post
                  </button>
                </div>

                <div className="space-y-6">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))
                  ) : (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                      <p className="text-gray-500">No posts found matching your criteria</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'members' && (
              <div>
                <h2 className="text-2xl font-bold text-[#0f1c47] mb-6">Shelf Members</h2>
                <MembersTable members={shelf.members} currentUser={currentUser} />
              </div>
            )}

            {activeTab === 'about' && (
              <div>
                <h2 className="text-2xl font-bold text-[#0f1c47] mb-6">About This Shelf</h2>
                <AboutShelf shelf={shelf} />
              </div>
            )}
          </div>
        </div>
      </div>

           {/* Add the CreatePostModal *
      <CreatePostModal 
        isOpen={showCreatePostModal} 
        onClose={() => setShowCreatePostModal(false)} 
        onSubmit={handleCreatePost}
        currentUser={currentUser!}
      />

      <InviteModal 
        isOpen={showInviteModal} 
        onClose={() => setShowInviteModal(false)} 
        onInvite={handleInvite} 
      />
    </div>
  );
};

export default ShelfDetailPage;*/

"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { ShelfBanner } from '@/components/shelfComponents/ShelfBanner';
import { ShelfHeader } from '@/components/shelfComponents/ShelfHeader';
import { ShelfNavigation } from '@/components/shelfComponents/ShelfNavigation';
import { PostCard } from '@/components/shelfComponents/PostCard';
import { MembersTable } from '@/components/shelfComponents/MembersTable';
import { AboutShelf } from '@/components/shelfComponents/AboutShelf';
import { InviteModal } from '@/components/shelfComponents/InviteModal';
import { Shelf, Post, User } from '@/types/shelf';
import { CreatePostModal } from '@/components/shelfComponents/CreatePostModal';

const ShelfDetailPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const [shelf, setShelf] = useState<Shelf | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  // UI State
  const [activeTab, setActiveTab] = useState<'posts' | 'members' | 'about'>('posts');
  const [postTypeFilter, setPostTypeFilter] = useState<'all' | 'product' | 'service' | 'investment'>('all');
  const [showInviteModal, setShowInviteModal] = useState(false);

  const handleCreatePost = async (newPost: Omit<Post, 'id' | 'createdAt' | 'createdBy' | 'status' | 'stats'>) => {
    try {
      const response = await axios.post(`https://shaddyna-backend.onrender.com/api/shellf/posts`, newPost);
      const createdPost = response.data;
      
      setPosts([createdPost, ...posts]);
      setShowCreatePostModal(false);
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post');
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch shelf data
        const shelfResponse = await axios.get(`https://shaddyna-backend.onrender.com/api/shelf/${id}`);
        setShelf(shelfResponse.data);
        
        // Fetch posts for this shelf
        const postsResponse = await axios.get(`https://shaddyna-backend.onrender.com/api/shellf/posts/shelf/${id}`);
        
        // Transform posts to match our interface
        const transformedPosts = postsResponse.data.map((post: any) => ({
          id: post._id,
          name: post.name,
          description: post.description,
          type: Array.isArray(post.type) ? post.type[0] : post.type,
          images: post.images.map((img: any) => img.url),
          tags: post.tags,
          createdAt: new Date(post.createdAt),
          createdBy: {
            id: post.createdBy._id,
            name: post.createdBy.firstName + ' ' + post.createdBy.lastName,
            avatar: '', // Add avatar if available
          },
          status: post.status,
          stats: {
            views: post.stats?.views || 0,
            likes: post.stats?.likes || 0,
            shares: post.stats?.shares || 0,
          },
          // Include type-specific data
          ...(post.product && { product: post.product }),
          ...(post.service && { service: post.service }),
          ...(post.investment && { investment: post.investment }),
        }));
        
        setPosts(transformedPosts);
        
        // Set current user (you might want to fetch this from auth context)
        setCurrentUser({
          _id: 'current-user-id', // Replace with actual user ID
          firstName: 'Current',
          lastName: 'User',
          email: 'user@example.com',
          password: '',
          role: 'admin',
          deleted: false,
          member: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const filteredPosts = postTypeFilter === 'all' 
    ? posts 
    : posts.filter(post => post.type === postTypeFilter);

  const handleInvite = (email: string, role: string) => {
    // Handle invite logic here
    console.log(`Inviting ${email} as ${role}`);
    setShowInviteModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading shelf...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!shelf) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Shelf not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{shelf.name} | Shelf</title>
        <meta name="description" content={shelf.description} />
      </Head>

      <ShelfBanner 
        bannerImage={shelf.bannerImage} 
        name={shelf.name} 
        description={shelf.description} 
      />

      <ShelfHeader 
        members={shelf.members} 
        currentUser={currentUser} 
        onInviteClick={() => setShowInviteModal(true)} 
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <ShelfNavigation 
              activeTab={activeTab} 
              postTypeFilter={postTypeFilter} 
              tags={shelf.tags} 
              onTabChange={setActiveTab} 
              onFilterChange={setPostTypeFilter} 
            />
          </div>

          <div className="lg:w-3/4">
            {activeTab === 'posts' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#0f1c47]">
                    {postTypeFilter === 'all' ? 'All Posts' : `${postTypeFilter.charAt(0).toUpperCase() + postTypeFilter.slice(1)}s`}
                  </h2>
                  <button 
                    onClick={() => setShowCreatePostModal(true)}
                    className="px-4 py-2 bg-[#bf2c7e] text-white rounded-md hover:bg-[#a8256d] transition-colors"
                  >
                    Create Post
                  </button>
                </div>

                <div className="space-y-6">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))
                  ) : (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                      <p className="text-gray-500">No posts found matching your criteria</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'members' && (
              <div>
                <h2 className="text-2xl font-bold text-[#0f1c47] mb-6">Shelf Members</h2>
                <MembersTable members={shelf.members} currentUser={currentUser} />
              </div>
            )}

            {activeTab === 'about' && (
              <div>
                <h2 className="text-2xl font-bold text-[#0f1c47] mb-6">About This Shelf</h2>
                <AboutShelf shelf={shelf} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/*<CreatePostModal 
        isOpen={showCreatePostModal} 
        onClose={() => setShowCreatePostModal(false)} 
        onSubmit={handleCreatePost}
        currentUser={currentUser!}
        shelfId={id}
      />*/}

      <InviteModal 
        isOpen={showInviteModal} 
        onClose={() => setShowInviteModal(false)} 
        onInvite={handleInvite} 
      />
    </div>
  );
};

export default ShelfDetailPage;
