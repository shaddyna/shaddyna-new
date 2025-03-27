"use client";
import { useState, FormEvent } from "react";
import { User } from "@/types/types";
import { UserList } from "./UserList";
import { SelectedUsers } from "./SelectedUsers";

interface CreateShelfFormProps {
  onSubmit: (data: {
    name: string;
    description: string;
    type: 'product' | 'service' | 'investment';
    openForMembers: boolean;
    members: Array<{ userId: string; role: string }>;
  }) => void;
  onCancel: () => void;
  users: User[];
  loading?: boolean;
}

export const CreateShelfForm = ({ onSubmit, onCancel, users, loading = false }: CreateShelfFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'product' | 'service' | 'investment'>('product');
  const [openForMembers, setOpenForMembers] = useState(true);
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
  const [userSearch, setUserSearch] = useState('');

  {/*const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      type,
      openForMembers,
      members: selectedMembers.map(member => ({
        userId: member._id,
        role: 'member'
      }))
    });
  };*/}

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("https://shaddyna-backend.onrender.com/api/shelf/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          type,
          openForMembers,
          members: selectedMembers.map(member => ({
            userId: member._id,
            role: 'member'
          }))
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create shelf');
      }
  
      const createdShelf = await response.json();
      onSubmit(createdShelf.data); // Pass the created shelf data to parent component
    } catch (error: any) {
      console.error("Shelf creation error:", error);
      alert(error.message || "Failed to create shelf");
    }
  };

  const toggleMemberSelection = (user: User) => {
    setSelectedMembers(prev => {
      const isSelected = prev.some(m => m._id === user._id);
      if (isSelected) {
        return prev.filter(m => m._id !== user._id);
      } else {
        return [...prev, user];
      }
    });
  };

  const filteredUsers = users.filter(user => {
    const firstName = user.firstName || '';
    const email = user.email || '';
    const search = userSearch.toLowerCase();
    
    return firstName.toLowerCase().includes(search) || 
           email.toLowerCase().includes(search);
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#0f1c47] mb-1">
          Shelf Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-[#0f1c47] mb-1">
          Description
        </label>
        <textarea
          id="description"
          className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-[#0f1c47] mb-1">
          Shelf Type
        </label>
        <select
          id="type"
          className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
          value={type}
          onChange={(e) => setType(e.target.value as 'product' | 'service' | 'investment')}
        >
          <option value="product">Product</option>
          <option value="service">Service</option>
          <option value="investment">Investment</option>
        </select>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="openForMembers"
          className="h-4 w-4 text-[#bf2c7e] focus:ring-[#bf2c7e] border-[#0f1c47]/10 rounded"
          checked={openForMembers}
          onChange={(e) => setOpenForMembers(e.target.checked)}
        />
        <label htmlFor="openForMembers" className="ml-2 block text-sm text-[#0f1c47]">
          Accepting new members
        </label>
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-medium text-[#0f1c47]">Add Members</h3>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full p-3 rounded-xl bg-white border-2 border-[#0f1c47]/10 focus:border-[#bf2c7e] focus:ring-0 transition-all"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
          />
          {loading && (
            <div className="absolute right-3 top-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#bf2c7e]"></div>
            </div>
          )}
        </div>

        <SelectedUsers 
          users={selectedMembers} 
          onRemove={toggleMemberSelection} 
        />

        <UserList 
          users={filteredUsers} 
          selectedUsers={selectedMembers} 
          onSelect={toggleMemberSelection}
          loading={loading}
        />
      </div>

      <div className="flex justify-end gap-4 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 rounded-full border border-[#0f1c47] text-[#0f1c47] hover:bg-[#0f1c47]/5 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-full bg-[#bf2c7e] text-white hover:bg-[#a02468] transition-colors"
        >
          Create Shelf
        </button>
      </div>
    </form>
  );
};