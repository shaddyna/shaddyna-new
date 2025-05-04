import { useEffect, useState } from 'react';
import axios from 'axios';
import { SellerRequest } from '@/types/profile';

export const SellerRequests = () => {
  const [requests, setRequests] = useState<SellerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('https://shaddyna-backend.onrender.com/api/membership');
        setRequests(res.data);
        console.log('✅ Successfully fetched seller requests:', res.data);
      } catch (err) {
        setError('Failed to fetch seller requests');
        console.error('❌ Error fetching seller requests:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchRequests();
  }, []);
  
  const handleStatusChange = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await axios.put(`https://shaddyna-backend.onrender.com/api/membership/${id}`, { status });
      setRequests(prev =>
        prev.map(req =>
          req._id === id ? { ...req, status, processedAt: new Date().toISOString() } : req
        )
      );
    } catch {
      alert(`Failed to ${status} request`);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading seller requests...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-xl font-semibold text-[#0f1c47] mb-4">Seller Requests</h3>
      {requests.length === 0 ? (
        <p className="text-gray-500 text-center">No requests available.</p>
      ) : (
        <div className="space-y-4">
          {requests.map(req => (
            <div
              key={req._id}
              className="p-4 rounded-lg border border-gray-200 flex justify-between items-start hover:bg-gray-50"
            >
              <div>
              {typeof req.userId === 'object' && req.userId && (
                  <p className="font-medium text-[#0f1c47]">
                    User: {req.userId.firstName} {req.userId.lastName} ({req.userId.email})
                  </p>
                )}
                <p className="text-sm text-gray-600">Amount: KES {req.amount}</p>
                <p className="text-sm text-gray-600 capitalize">Method: {req.paymentMethod}</p>
                {req.mpesaName && (
                  <p className="text-sm text-gray-600">Mpesa Name: {req.mpesaName}</p>
                )}
                {req.mpesaCode && (
                  <p className="text-sm text-gray-600">Mpesa Code: {req.mpesaCode}</p>
                )}
                <p
                  className={`mt-1 inline-block px-3 py-1 rounded-full text-xs ${
                    req.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : req.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {req.status}
                </p>
              </div>
              {req.status === 'pending' && (
                <div className="space-x-2">
                  <button
                    onClick={() => handleStatusChange(req._id!, 'approved')}
                    className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange(req._id!, 'rejected')}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
