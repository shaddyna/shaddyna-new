/*import { useState } from 'react';
import Image from 'next/image';
import { CommentForm } from './commentForm';
import { Comment } from '@/types/skills';

interface CommentSectionProps {
  skillId: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ skillId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [showReplyForm, setShowReplyForm] = useState<string | null>(null);

  // In a real app, you would fetch comments for the skill
  // useEffect(() => {
  //   fetchComments(skillId);
  // }, [skillId]);

  const handleAddComment = (content: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      content,
      createdAt: new Date(),
      user: {
        id: 'current-user',
        name: 'You',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        bio: '',
        location: '',
        skills: [],
        joinedAt: new Date(),
      },
    };
    setComments([...comments, newComment]);
  };

  const handleAddReply = (parentId: string, content: string) => {
    const newReply: Comment = {
      id: Date.now().toString(),
      content,
      createdAt: new Date(),
      user: {
        id: 'current-user',
        name: 'You',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        bio: '',
        location: '',
        skills: [],
        joinedAt: new Date(),
      },
    };

    setComments(comments.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply]
        };
      }
      return comment;
    }));

    setShowReplyForm(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-[#0f1c47] mb-6">Comments ({comments.length})</h2>

      <CommentForm onSubmit={handleAddComment} />

      <div className="mt-8 space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={comment.user.avatar}
                      alt={comment.user.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-[#0f1c47]">{comment.user.name}</h4>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-1">{comment.content}</p>
                  <button
                    onClick={() => setShowReplyForm(showReplyForm === comment.id ? null : comment.id)}
                    className="text-sm text-[#bf2c7e] hover:text-[#a8256d] mt-2"
                  >
                    Reply
                  </button>

                  {showReplyForm === comment.id && (
                    <div className="mt-4 pl-4 border-l-2 border-gray-200">
                      <CommentForm 
                        onSubmit={(content) => handleAddReply(comment.id, content)} 
                        isReply 
                      />
                    </div>
                  )}

                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 space-y-4 pl-4 border-l-2 border-gray-200">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="pt-4 first:pt-0">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                                <Image
                                  src={reply.user.avatar}
                                  alt={reply.user.name}
                                  layout="fill"
                                  objectFit="cover"
                                />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium text-[#0f1c47]">{reply.user.name}</h4>
                                <span className="text-xs text-gray-500">
                                  {new Date(reply.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 mt-1">{reply.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};*/



'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { CommentForm } from './commentForm';
import { Comment } from '@/types/skills';

interface CommentSectionProps {
  skillId: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ skillId }) => {
  const { user, token, logout } = useAuth(); // Use AuthContext instead of useSession
  const [comments, setComments] = useState<Comment[]>([]);
  const [showReplyForm, setShowReplyForm] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/skill/${skillId}`);
        setComments(response.data.comments || []);
      } catch (err) {
        setError('Failed to fetch comments');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [skillId]);

  const handleAddComment = async (content: string) => {
    if (!user || !token) {
      setError('You must be logged in to comment');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/skill/${skillId}/comments`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use token from AuthContext
          },
        }
      );

      setComments(response.data.comments);
      setError(null);
    } catch (err) {
      setError('Failed to add comment');
      console.error(err);
    }
  };

  const handleAddReply = async (parentId: string, content: string) => {
    if (!user || !token) {
      setError('You must be logged in to reply');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/skill/${skillId}/comments/${parentId}/replies`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use token from AuthContext
          },
        }
      );

      setComments(response.data.comments);
      setShowReplyForm(null);
      setError(null);
    } catch (err) {
      setError('Failed to add reply');
      console.error(err);
    }
  };

  const handleDelete = async (commentId: string, isReply: boolean = false, parentId?: string) => {
    if (!user || !token) {
      setError('You must be logged in to delete');
      return;
    }

    try {
      let url = `http://localhost:5000/api/skill/${skillId}/comments/${commentId}`;
      if (isReply && parentId) {
        url += `/replies/${parentId}`;
      }

      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`, // Use token from AuthContext
        },
      });

      setComments(response.data.comments);
      setError(null);
    } catch (err) {
      setError('Failed to delete');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading comments...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-[#0f1c47] mb-6">
        Comments ({comments.length})
      </h2>

      {user && <CommentForm onSubmit={handleAddComment} />}

      <div className="mt-8 space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                   {/*<Image
                      src={comment.user.avatar || '/default-avatar.jpg'}
                      alt={comment.user.name}
                      layout="fill"
                      objectFit="cover"
                    />*/}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                     {/*} <h4 className="font-medium text-[#0f1c47]">{comment.user.id}</h4>*/}
                       <h4 className="font-medium text-[#0f1c47]">sam</h4>
                      <span className="text-xs text-gray-500">
                        {format(new Date(comment.createdAt), 'MMM d, yyyy h:mm a')}
                      </span>
                    </div>
                    {/*{(user?._id === comment.id) && (*/}
                    {(user?._id === comment._id) && (
                      <button
                        onClick={() => handleDelete(comment._id)}
                        className="text-red-500 text-sm hover:text-red-700"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <p className="text-gray-700 mt-1">{comment.content}</p>
                  
                  {user && (
                    <button
                      onClick={() => setShowReplyForm(showReplyForm === comment._id ? null : comment._id)}
                      className="text-sm text-[#bf2c7e] hover:text-[#a8256d] mt-2"
                    >
                      Reply
                    </button>
                  )}

                  {showReplyForm === comment._id && (
                    <div className="mt-4 pl-4 border-l-2 border-gray-200">
                      <CommentForm 
                        onSubmit={(content) => handleAddReply(comment._id, content)} 
                        isReply 
                      />
                    </div>
                  )}

                  {(comment.replies ?? []).length > 0 && (
                    <div className="mt-4 space-y-4 pl-4 border-l-2 border-gray-200">
                      {(comment.replies ?? []).map((reply) => (
                        <div key={reply._id} className="pt-4 first:pt-0">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                               {/* <Image
                                  src={reply.user.avatar || '/default-avatar.jpg'}
                                  alt={reply.user.name}
                                  layout="fill"
                                  objectFit="cover"
                                />*/}
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="text-sm font-medium text-[#0f1c47]">
                              
                                    {/* sam reply */}
                                    Sam reply
                                  </h4>
                                  <span className="text-xs text-gray-500">
                                    {format(new Date(reply.createdAt), 'MMM d, yyyy h:mm a')}
                                  </span>
                                </div>
                                {/*{(user?._id === reply.user.id || user?._id === comment.user.id) && (
                                  <button
                                    onClick={() => handleDelete(comment._id, true, reply._id)}
                                    className="text-xs text-red-500 hover:text-red-700"
                                  >
                                    Delete
                                  </button>
                                )}*/}
                              </div>
                              <p className="text-sm text-gray-700 mt-1">{reply.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};