/*import { useState } from 'react';

interface CommentFormProps {
  onSubmit: (content: string) => void;
  isReply?: boolean;
}

export const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, isReply = false }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
        placeholder={isReply ? 'Write your reply...' : 'Write your comment...'}
        rows={3}
        required
      />
      <div className="flex justify-end mt-2">
        <button
          type="submit"
          className="px-4 py-2 bg-[#bf2c7e] text-white rounded-md hover:bg-[#a8256d] transition-colors text-sm"
        >
          {isReply ? 'Post Reply' : 'Post Comment'}
        </button>
      </div>
    </form>
  );
};*/

// components/skillComponent/commentForm.tsx
'use client';

import { useState } from 'react';

interface CommentFormProps {
  onSubmit: (content: string) => void;
  isReply?: boolean;
}

export const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, isReply = false }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-transparent"
        placeholder={isReply ? 'Write your reply...' : 'Write your comment...'}
        rows={3}
        required
      />
      <div className="flex justify-end mt-2">
        <button
          type="submit"
          className="px-4 py-2 bg-[#bf2c7e] text-white rounded-md hover:bg-[#a8256d] transition-colors text-sm"
        >
          {isReply ? 'Post Reply' : 'Post Comment'}
        </button>
      </div>
    </form>
  );
};