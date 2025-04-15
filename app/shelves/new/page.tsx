"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from '@/context/AuthContext';

const CreateShelf = () => {
  const router = useRouter();
  const [form, setForm] = useState<{
    name: string;
    description: string;
    type: string[];
    visibility: string;
    rules: string;
    tags: string[];
    bannerImage: File | null;
  }>({
    name: "",
    description: "",
    type: [],
    visibility: "public",
    rules: "",
   
    tags: [] as string[],
    bannerImage: null,
  });
  const { token } = useAuth();
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [newTag, setNewTag] = useState("");
  const [showTagInput, setShowTagInput] = useState(false);

  const handleAddTag = () => {
    if (newTag.trim() && !form.tags.includes(newTag.trim())) {
      setForm({ ...form, tags: [...form.tags, newTag.trim()] });
      setNewTag("");
      setShowTagInput(false);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setForm({
      ...form,
      tags: form.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (
      type === "file" &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      setForm({ ...form, [name]: e.target.files[0] });
      setPreview(URL.createObjectURL(e.target.files[0]));
    } else if (type === "checkbox") {
      const newTypes = form.type.includes(value)
        ? form.type.filter((t) => t !== value)
        : [...form.type, value];
      setForm({ ...form, type: newTypes });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  interface ApiResponse {
    id: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "type") {
          (value as string[]).forEach((v: string) => data.append("type[]", v));
        } else {
          if (value !== null) {
            if (Array.isArray(value)) {
              value.forEach((v) => data.append(`${key}[]`, v));
            } else {
              data.append(key, value as string | Blob);
            }
          }
        }
      });

      const response = await axios.post<ApiResponse>(
        "https://lli-backend.onrender.com/api/shelf",
        data,
        {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            },
          withCredentials: true,
        }
      );

      router.push(`/shelves/${response.data.id}`);
    } catch (err) {
      console.error(err);
      alert("Shelf creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-3xl mx-auto border border-gray-200 shadow-lg rounded-lg p-6 bg-white">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#0f1c47]">
          Create a New Shelf
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-100 text-black"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 rounded bg-gray-100 text-black"
              required
            ></textarea>
          </div>

          <div>
            <label className="block mb-2">Community Rules</label>
            <textarea
              name="rules"
              value={form.rules}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 rounded bg-gray-100 text-black"
            ></textarea>
          </div>

         {/* Tags Section */}
         <div>
            <label className="block mb-2 font-medium">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#bf2c7e] text-white px-3 py-1 rounded-full flex items-center space-x-2"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-white font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {showTagInput ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="p-2 rounded border bg-white text-black"
                  placeholder="Enter tag"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="bg-[#0f1c47] text-white px-3 py-2 rounded hover:bg-[#1a2a5e]"
                >
                  Add
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowTagInput(true)}
                className="bg-[#bf2c7e] text-white px-3 py-2 rounded hover:bg-[#a8256d]"
              >
                + Add Tag
              </button>
            )}
          </div>

          <div>
            <label className="block mb-2">Banner Image</label>
            <input
              type="file"
              name="banner"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-2 bg-gray-100 text-black rounded"
              required
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 rounded w-full max-h-60 object-cover"
              />
            )}
          </div>

          <div>
            <label className="block mb-2">Type</label>
            <div className="space-x-4">
              {["products", "services", "investments"].map((t) => (
                <label key={t} className="text-[#0f1c47]">
                  <input
                    type="checkbox"
                    value={t}
                    checked={form.type.includes(t)}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  {t}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2">Visibility</label>
            <select
              name="visibility"
              value={form.visibility}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-100 text-black"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="unlisted">Unlisted</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#bf2c7e] text-white py-3 px-6 rounded hover:bg-[#a8256d] transition"
          >
            {loading ? "Creating..." : "Create Shelf"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateShelf;
