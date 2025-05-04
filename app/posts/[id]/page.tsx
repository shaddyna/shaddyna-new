/*import React from 'react';
import axios from 'axios';
import { notFound } from 'next/navigation';
import { Post } from '@/types/shelf';

interface PostDetailsProps {
  params: {
    id: string;
  };
}

const PostDetailsPage = async ({ params }: PostDetailsProps) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/shellf/posts/${params.id}`);
    const postData = response.data;

    // Transform the post data to match our interface
    const post: Post = {
      id: postData._id,
      name: postData.name,
      description: postData.description,
      type: Array.isArray(postData.type) ? postData.type[0] : postData.type,
      images: postData.images.map((img: any) => img.url),
      tags: postData.tags,
      createdAt: new Date(postData.createdAt),
      createdBy: {
        id: postData.createdBy._id,
        name: postData.createdBy.firstName + ' ' + postData.createdBy.lastName,
        avatar: '', // Add avatar if available
      },
      status: postData.status,
      stats: {
        views: postData.stats?.views || 0,
        likes: postData.stats?.likes || 0,
        shares: postData.stats?.shares || 0,
      },
      ...(postData.product && { product: postData.product }),
      ...(postData.service && { service: postData.service }),
      ...(postData.investment && { investment: postData.investment }),
    };

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {/* Post Images Gallery *
          {/*<div className="relative h-96 bg-gray-100">
            {post.images.length > 0 && (
              <img
                src={post.images[0].url}
                alt={post.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>*
            <div className="relative h-96 bg-gray-100">
            {post.images.length > 0 && (
              <img
                src={post.images[0].url}
                alt={post.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Post Content *
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-[#0f1c47]">{post.name}</h1>
                <p className="text-gray-500 mt-2">
                  Posted by {post.createdBy.name} on {post.createdAt.toLocaleDateString()}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                post.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {post.status}
              </span>
            </div>

            <p className="mt-4 text-gray-700">{post.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>

            {/* Type-specific content and actions *
            <div className="mt-8 border-t pt-6">
              {post.type === 'product' && post.product && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Product Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Price:</p>
                      <p className="text-2xl font-bold">Ksh {post.product.price}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Stock Available:</p>
                      <p className="text-lg">{post.product.stock}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Category:</p>
                      <p className="text-lg">{post.product.category}</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button className="w-full bg-[#bf2c7e] text-white py-3 px-6 rounded-lg hover:bg-[#a8256d] transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              )}

              {post.type === 'service' && post.service && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Service Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Price:</p>
                      <p className="text-2xl font-bold">Ksh {post.service.price}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Duration:</p>
                      <p className="text-lg">{post.service.duration}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Availability:</p>
                      <p className="text-lg">{post.service.availability.join(', ')}</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button className="w-full bg-[#bf2c7e] text-white py-3 px-6 rounded-lg hover:bg-[#a8256d] transition-colors">
                      Request Service
                    </button>
                  </div>
                </div>
              )}

              {post.type === 'investment' && post.investment && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Investment Opportunity</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Amount:</p>
                      <p className="text-2xl font-bold">Ksh {post.investment.amount}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">ROI:</p>
                      <p className="text-lg">{post.investment.roi}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Duration:</p>
                      <p className="text-lg">{post.investment.duration}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Risk Level:</p>
                      <p className="text-lg capitalize">{post.investment.riskLevel}</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button className="w-full bg-[#bf2c7e] text-white py-3 px-6 rounded-lg hover:bg-[#a8256d] transition-colors">
                      Invest Now
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Stats *
            <div className="mt-8 border-t pt-6">
              <div className="flex space-x-6 text-sm text-gray-500">
                <span>{post.stats.views} views</span>
                <span>{post.stats.likes} likes</span>
                <span>{post.stats.shares} shares</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
};

export default PostDetailsPage;*/
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { notFound } from "next/navigation";
import { Post } from "@/types/shelf";

interface PostDetailsProps {
  params: Promise<{ id: string }>;
}

const PostDetailsPage = ({ params }: PostDetailsProps) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Unwrap the params object using React.use()
        const { id } = await params;

        const response = await axios.get(
          `https://shaddyna-backend.onrender.com/api/shellf/posts/single/${id}`
        );
        const postData = response.data;

        // Transform the post data to match your interface
        const transformedPost: Post = {
          id: postData._id,
          name: postData.name,
          description: postData.description,
          type: Array.isArray(postData.type) ? postData.type[0] : postData.type,
          //images: postData.images.map((img: any) => img.url),
          images: postData.images.map((img: { url: string; publicId: string }) => img.url),

          tags: postData.tags,
          createdAt: new Date(postData.createdAt),
          createdBy: {
            id: postData.createdBy._id,
            name:
              postData.createdBy.firstName + " " + postData.createdBy.lastName,
            avatar: "", // Add avatar if available
          },
          status: postData.status,
          stats: {
            views: postData.stats?.views || 0,
            likes: postData.stats?.likes || 0,
            shares: postData.stats?.shares || 0,
          },
          ...(postData.product && { product: postData.product }),
          ...(postData.service && { service: postData.service }),
          ...(postData.investment && { investment: postData.investment }),
        };

        setPost(transformedPost);
      } catch (err) {
        setError("Failed to load post");
        notFound(); // Redirect to 404 page
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Post Images Gallery */}
        <div className="relative h-96 bg-gray-100">
         {/*} {post.images.length > 0 && (
            <img
              src={post.images[0]}
              alt={post.name}
              className="w-full h-full object-cover"
            />
          )}*/}

        </div>

        {/* Post Content */}
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-[#0f1c47]">{post.name}</h1>
              {/*<p className="text-gray-500 mt-2">
                Posted by {post.createdBy.name} on{" "}
                {post.createdAt.toLocaleDateString()}
              </p>*/}
              <p className="text-gray-500 mt-2">
                Posted by: on{" "}
                {post.createdAt.toLocaleDateString()}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                post.status === "active"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {post.status}
            </span>
          </div>

          <p className="mt-4 text-gray-700">{post.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Type-specific content and actions */}
          <div className="mt-8 border-t pt-6">
            {post.type === "product" && post.product && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Product Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Price:</p>
                    <p className="text-2xl font-bold">Ksh {post.product.price}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Stock Available:</p>
                    <p className="text-lg">{post.product.stock}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Category:</p>
                    <p className="text-lg">{post.product.category}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="w-full bg-[#bf2c7e] text-white py-3 px-6 rounded-lg hover:bg-[#a8256d] transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            )}

            {post.type === "service" && post.service && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Service Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Price:</p>
                    <p className="text-2xl font-bold">Ksh {post.service.price}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Duration:</p>
                    <p className="text-lg">{post.service.duration}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Availability:</p>
                    <p className="text-lg">{post.service.availability.join(", ")}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="w-full bg-[#bf2c7e] text-white py-3 px-6 rounded-lg hover:bg-[#a8256d] transition-colors">
                    Request Service
                  </button>
                </div>
              </div>
            )}

            {post.type === "investment" && post.investment && (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Investment Opportunity
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Amount:</p>
                    <p className="text-2xl font-bold">Ksh {post.investment.amount}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">ROI:</p>
                    <p className="text-lg">{post.investment.roi}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Duration:</p>
                    <p className="text-lg">{post.investment.duration}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Risk Level:</p>
                    <p className="text-lg capitalize">{post.investment.riskLevel}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="w-full bg-[#bf2c7e] text-white py-3 px-6 rounded-lg hover:bg-[#a8256d] transition-colors">
                    Invest Now
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="mt-8 border-t pt-6">
            <div className="flex space-x-6 text-sm text-gray-500">
              <span>{post.stats.views} views</span>
              <span>{post.stats.likes} likes</span>
              <span>{post.stats.shares} shares</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsPage;