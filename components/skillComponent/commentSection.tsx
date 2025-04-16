import { useState } from 'react';
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
};