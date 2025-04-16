import React from 'react';
import { Post } from '@/types/shelf';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
};