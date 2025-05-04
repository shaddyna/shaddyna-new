/*import React from 'react';
import { Post } from '@/types/shelf';
import { useRouter } from 'next/navigation';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/posts/${post.id}`);
  };


  return (
    <div 
    className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
    onClick={handleClick}
  >
    {/*<div className="bg-white rounded-lg shadow-sm overflow-hidden">*
      <div className="p-6">
        <div className="flex justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={post.createdBy.avatar || '/default-avatar.jpg'} 
              alt={post.createdBy.name} 
              className="w-10 h-10 rounded-full" 
            />
            <div>
              <p className="font-medium">{post.createdBy.name}</p>
              <p className="text-sm text-gray-500">
                {post.createdAt.toLocaleDateString()} • {post.type}
              </p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            post.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {post.status}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-semibold text-[#0f1c47]">{post.title}</h3>
        <p className="mt-2 text-gray-700">{post.description}</p>

        {post.images.length > 0 && (
          <div className="mt-4">
            <img 
              src={post.images[0]} 
              alt={post.title} 
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>

        {post.price && (
          <div className="mt-4">
            <span className="text-xl font-bold text-[#0f1c47]">
              {post.price} {post.currency}
            </span>
          </div>
        )}

        <div className="mt-6 flex justify-between items-center">
          <div className="flex space-x-4 text-sm text-gray-500">
            <span>{post.stats.views} views</span>
            <span>{post.stats.saves} saves</span>
            <span>{post.stats.inquiries} inquiries</span>
          </div>
          <div className="flex space-x-3">
            <button className="text-[#bf2c7e] hover:text-[#a8256d]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="text-[#bf2c7e] hover:text-[#a8256d]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
            </button>
            <button className="text-[#bf2c7e] hover:text-[#a8256d]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};*/

'use client';

import React from 'react';
import { Post } from '@/types/shelf';
import { useRouter } from 'next/navigation';

const dummyPost: Post = {
  id: '1',
  name: 'Sample Post Title',
  description: 'This is a sample description for the post.',
  images: [
    { url: '/sample.jpg', publicId: 'sample123' },
  ],
  tags: ['tag1', 'tag2', 'tag3'],
  type: 'product',
  shelf: 'shelf-id-1',
  createdBy: {
    id: 'user1',
    name: 'John Doe',
    avatar: '/default-avatar.jpg',
  },
  status: 'active',
  stats: {
    saves: 12,
    views: 300,
    likes: 40,
    shares: 10,
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};


interface PostCardProps {
  post: Post;
}


export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/posts/${dummyPost.id}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleClick}
    >
      <div className="p-6">
        <div className="flex justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={typeof dummyPost.createdBy !== 'string' ? dummyPost.createdBy.avatar || '/default-avatar.jpg' : '/default-avatar.jpg'}
              alt={typeof dummyPost.createdBy !== 'string' ? dummyPost.createdBy.name : 'User'}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium">
                {typeof dummyPost.createdBy !== 'string' ? dummyPost.createdBy.name : 'Anonymous'}
              </p>
              <p className="text-sm text-gray-500">
                {dummyPost.createdAt.toLocaleDateString()} • {dummyPost.type}
              </p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            dummyPost.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {dummyPost.status}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-semibold text-[#0f1c47]">{dummyPost.name}</h3>
        <p className="mt-2 text-gray-700">{dummyPost.description}</p>

        {dummyPost.images.length > 0 && (
          <div className="mt-4">
            <img
              src={dummyPost.images[0].url}
              alt={dummyPost.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {dummyPost.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="flex space-x-4 text-sm text-gray-500">
            <span>{dummyPost.stats.views} views</span>
            <span>{dummyPost.stats.saves} saves</span>
            <span>{dummyPost.stats.likes} likes</span>
          </div>
          <div className="flex space-x-3 text-[#bf2c7e] hover:text-[#a8256d]">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
            </button>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
