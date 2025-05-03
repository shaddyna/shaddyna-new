import { useEffect, useState } from 'react';
import axios from 'axios';
import { Post } from '@/types/shelf';

const POSTS_PER_PAGE = 10;

export const PostsComponent = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/shellf/posts');
      setPosts(response.data);
    } catch {
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/shellf/posts/${id}`);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  const handleUpdate = async (id: string) => {
    const newName = prompt('Enter new name for the post:');
    if (!newName) return;

    try {
      const updated = await axios.put(`http://localhost:5000/api/shellf/posts/${id}`, {
        name: newName,
      });
      setPosts((prev) =>
        prev.map((post) => (post.id === id ? { ...post, name: updated.data.name } : post))
      );
    } catch (err) {
      alert('Failed to update post');
    }
  };

  const visiblePosts = posts.slice(0, visibleCount);

  if (loading) return <div className="p-6 text-center">Loading posts...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Posts List</h3>

      <div className="space-y-4">
        {visiblePosts.map((post) => (
          <div key={post.id} className="p-4 border rounded-lg hover:bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[#0f1c47] font-medium">{post.name}</p>
                <p className="text-sm text-gray-500 capitalize">{post.type}</p>
                <p className="text-sm text-gray-500">Status: {post.status}</p>
                <p className="text-xs text-gray-400">
                  Created at: {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
              {post.images.length > 0 && (
                <img
                  src={post.images[0].url}
                  alt={post.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              )}
            </div>

            {post.description && (
              <p className="text-sm text-gray-600 mt-2">{post.description}</p>
            )}
            {post.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="text-xs text-gray-500 mt-2">
              Stats — Likes: {post.stats.likes}, Views: {post.stats.views}, Saves: {post.stats.saves}, Shares: {post.stats.shares}
            </div>

            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleUpdate(post.id)}
                className="text-sm text-blue-600 hover:underline"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {posts.length > POSTS_PER_PAGE && (
        <div className="mt-4 text-center">
          {visibleCount < posts.length ? (
            <button
              onClick={() => setVisibleCount((prev) => prev + POSTS_PER_PAGE)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Show More
            </button>
          ) : (
            <button
              onClick={() => setVisibleCount(POSTS_PER_PAGE)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Collapse
            </button>
          )}
        </div>
      )}
    </div>
  );
};
