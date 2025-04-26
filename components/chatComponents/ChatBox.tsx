/*'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { FaPaperPlane } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

const socket = io('http://localhost:5000');

export const ChatBox = ({ targetUser }: { targetUser: any }) => {
  const { user: currentUser } = useAuth();
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [roomId, setRoomId] = useState<string>('');

  useEffect(() => {
    if (!currentUser?._id || !targetUser?.id) {
      console.warn('Missing currentUser or targetUser');
      return;
    }

    const newRoomId = `${currentUser._id}_${targetUser.id}`;
    setRoomId(newRoomId);
    socket.emit('joinRoom', newRoomId);
    console.log('Joining room:', newRoomId);

    socket.on('receiveMessage', (message) => {
      console.log('Received message:', message);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.emit('leaveRoom', newRoomId);
      socket.off('receiveMessage');
    };
  }, [currentUser, targetUser]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || !currentUser?._id || !targetUser?.id || !roomId) {
      console.warn('Message or user info missing');
      return;
    }

    const message = {
      sender: currentUser._id,
      receiver: targetUser.id,
      text: newMessage,
    };

    socket.emit('sendMessage', message);
    setMessages((prev) => [...prev, { from: currentUser._id, text: newMessage }]);
    setNewMessage('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mt-6">
      <h3 className="font-medium text-[#0f1c47] mb-2">Chat with {targetUser?.firstName}</h3>
      <div className="h-64 overflow-y-auto border rounded-md p-2 mb-2 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-md max-w-[80%] ${
              msg.from === currentUser?._id ? 'bg-[#bf2c7e] text-white ml-auto' : 'bg-gray-100 text-gray-800'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-[#bf2c7e] text-white px-4 py-2 rounded-md hover:bg-[#a8256d] flex items-center"
        >
          <FaPaperPlane className="mr-1" /> Send
        </button>
      </form>
    </div>
  );
};*/

'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { FaPaperPlane } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

const socket = io('http://localhost:5000');

//export const ChatBox = ({ targetUser }: { targetUser: User }) => { 
export const ChatBox = ({ targetUser }: { targetUser: any }) => {
  const { user: currentUser } = useAuth();
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [roomId, setRoomId] = useState<string>('');

  useEffect(() => {
    if (!currentUser?._id || !targetUser?.id) {
      console.warn('Missing currentUser or targetUser');
      return;
    }

    const newRoomId = `${currentUser._id}_${targetUser.id}`;
    setRoomId(newRoomId);
    socket.emit('joinRoom', newRoomId);
    console.log('Joining room:', newRoomId);

    socket.on('receiveMessage', (message) => {
      console.log('Received message:', message);
      // Only update messages if the message is from the other user
      if (message.from !== currentUser?._id) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.emit('leaveRoom', newRoomId);
      socket.off('receiveMessage');
    };
  }, [currentUser, targetUser]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || !currentUser?._id || !targetUser?.id || !roomId) {
      console.warn('Message or user info missing');
      return;
    }

    const message = {
      sender: currentUser._id,
      receiver: targetUser.id,
      text: newMessage,
    };

    socket.emit('sendMessage', message);  // Emit the message to the server
    setMessages((prev) => [...prev, { from: currentUser._id, text: newMessage }]);  // Add it locally for immediate display
    setNewMessage('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mt-6">
      <h3 className="font-medium text-[#0f1c47] mb-2">Chat with {targetUser?.firstName}</h3>
      <div className="h-64 overflow-y-auto border rounded-md p-2 mb-2 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-md max-w-[80%] ${
              msg.from === currentUser?._id ? 'bg-[#bf2c7e] text-white ml-auto' : 'bg-gray-100 text-gray-800'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-[#bf2c7e] text-white px-4 py-2 rounded-md hover:bg-[#a8256d] flex items-center"
        >
          <FaPaperPlane className="mr-1" /> Send
        </button>
      </form>
    </div>
  );
};


