/*import { Skill } from '@/types/skills';
import Image from 'next/image';
import Link from 'next/link';

interface SkillCardProps {
  skill: Skill;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  // Fallback image URL
  const fallbackImage = '/images/placeholder.jpg'; // Replace with your placeholder image path

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      {/* Skill Image *
      <div className="relative h-48 w-full">
        {skill.images && skill.images.length > 0 ? (
          <Image
            src={skill.images[0] || fallbackImage}
            alt={skill.title || 'Skill image'}
            fill
            style={{ objectFit: 'cover' }}
            className="hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="bg-gray-100 h-full w-full flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>

      {/* Skill Details *
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-[#0f1c47] mb-1">{skill.title || 'Untitled Skill'}</h3>
            <p className="text-sm text-[#bf2c7e] font-medium">{skill.category || 'Uncategorized'}</p>
          </div>
          {skill.price && (
            <span className="bg-[#0f1c47] text-white px-3 py-1 rounded-full text-sm">
              Ksh {skill.price}{skill.priceType === 'hourly' ? '/hr' : ''}
            </span>
          )}
        </div>

        <p className="text-gray-600 mt-3 line-clamp-2">{skill.description || 'No description available'}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {skill.tags && skill.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
              {tag || 'Unknown tag'}
            </span>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center">
          {/* Creator Avatar *
          <div className="flex items-center">
            <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
              <Image
                src={skill.createdBy?.avatar || fallbackImage}
                alt={skill.createdBy?.name || 'Creator avatar'}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <span className="text-sm font-medium">{skill.createdBy?.name || 'Unknown creator'}</span>
          </div>

          {/* Actions *
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-500 hover:text-[#bf2c7e]">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm">{skill.likes?.length || 0}</span>
            </button>
            <Link
              href={`/hub/${skill._id}`}
              className="px-4 py-2 bg-[#bf2c7e] text-white rounded-md hover:bg-[#a8256d] transition-colors text-sm"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};*/

import { Skill } from '@/types/skills';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

interface SkillCardProps {
  skill: Skill;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  // Fallback image URL
  const fallbackImage = 'https://i.pinimg.com/736x/31/f3/ea/31f3ea192296a4596fcf0747c5c7c1ea.jpg'; 
  const { user, token } = useAuth(); // Use AuthContext for user and token
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(skill.likes?.length || 0);

  useEffect(() => {
    // Check if the current user has liked the skill
    if (user && skill.likes) {
      setIsLiked(skill.likes.some(like => like.toString() === user._id.toString()));
    }
  }, [user, skill.likes]);

  const handleLike = async () => {
    if (!user || !token) {
      alert('You must be logged in to like a skill');
      return;
    }

    try {
      const response = await axios.post(
        `https://shaddyna-backend.onrender.com/api/skill/${skill._id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsLiked(response.data.likes.some((like: string) => like.toString() === user._id.toString()));
      setLikesCount(response.data.likes.length);
    } catch (err) {
      console.error(err);
      alert('Failed to like skill');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      {/* Skill Image */}
      <div className="relative h-48 w-full">
        {skill.images && skill.images.length > 0 ? (
          <Image
            src={skill.images[0] || fallbackImage}
            alt={skill.title || 'Skill image'}
            fill
            style={{ objectFit: 'cover' }}
            className="hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="bg-gray-100 h-full w-full flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>

      {/* Skill Details */}
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-[#0f1c47] mb-1">{skill.title || 'Untitled Skill'}</h3>
            <p className="text-sm text-[#bf2c7e] font-medium">{skill.category || 'Uncategorized'}</p>
          </div>
          {skill.price && (
            <span className="bg-[#0f1c47] text-white px-3 py-1 rounded-full text-sm">
              Ksh {skill.price}{skill.priceType === 'hourly' ? '/hr' : ''}
            </span>
          )}
        </div>

        <p className="text-gray-600 mt-3 line-clamp-2">{skill.description || 'No description available'}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {skill.tags && skill.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
              {tag || 'Unknown tag'}
            </span>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center">
          {/* Creator Avatar */}
          <div className="flex items-center">
            <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
              <Image
                src={skill.createdBy?.avatar || fallbackImage}
                alt={skill.createdBy?.name || 'Creator avatar'}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <span className="text-sm font-medium">{skill.createdBy?.name || 'Unknown creator'}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center text-${isLiked ? 'red-500' : 'gray-500'} hover:text-${isLiked ? 'red-700' : '#bf2c7e'}`}
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm">{likesCount}</span>
            </button>
            <Link
              href={`/hub/${skill._id}`}
              className="px-4 py-2 bg-[#bf2c7e] text-white rounded-md hover:bg-[#a8256d] transition-colors text-sm"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};