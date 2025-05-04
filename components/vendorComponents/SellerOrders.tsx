// components/SellerOrders.tsx
/*import { useEffect, useState } from 'react';
import { CustomerOrders } from './CustomerOrder';
import { useAuth } from '@/context/AuthContext';
import { Order } from '@/types/order';

export const SellerOrders = () => {
  const { user } = useAuth();
  const [sellerId, setSellerId] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch the seller ID based on the user
  useEffect(() => {
    const fetchSellerId = async () => {
      if (user?.role === 'seller') {
        try {
          const res = await fetch('https://shaddyna-backend.onrender.com/api/sellers');
          const sellers = await res.json();
          const matched = sellers.find((s: any) => s.email === user.email);
          if (matched) {
            setSellerId(matched._id);
          }
        } catch (err) {
          console.error('Error fetching seller:', err);
        }
      }
    };

    fetchSellerId();
  }, [user]);

  // Fetch orders for the seller
  useEffect(() => {
    const fetchOrders = async () => {
      if (!sellerId) return;
      try {
        const res = await fetch(`https://shaddyna-backend.onrender.com/api/orders/seller/${sellerId}`);
        const data = await res.json();
  
        console.log('Fetched seller orders:', data); // <-- Log received data here
  
        setOrders(data);
      } catch (err) {
        console.error('Error fetching seller orders:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, [sellerId]);
  

  if (loading) return <p>Loading orders...</p>;
  if (!orders.length) return <p>No orders found.</p>;

  return <CustomerOrders orders={orders} />;
};
*/

import { useEffect, useState } from 'react';
import { CustomerOrders } from './CustomerOrder';
import { useAuth } from '@/context/AuthContext';
import { Order } from '@/types/order';

export const SellerOrders = () => {
    const { user } = useAuth();
    const [sellerId, setSellerId] = useState<string | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchSellerId = async () => {
        if (user?.role === 'seller') {
          try {
            const res = await fetch('https://shaddyna-backend.onrender.com/api/sellers');
            const sellers = await res.json();
            const matched = sellers.find((s: any) => s.email === user.email);
            if (matched) {
              setSellerId(matched._id);
            }
          } catch (err) {
            console.error('Error fetching seller:', err);
          }
        }
      };
  
      fetchSellerId();
    }, [user]);
  
    useEffect(() => {
        const fetchOrders = async () => {
          if (!sellerId) return;
          try {
            const res = await fetch(`https://shaddyna-backend.onrender.com/api/orders/seller/${sellerId}`);
            
            if (!res.ok) {
              throw new Error('Failed to fetch orders');
            }
      
            const data = await res.json(); // This includes { success, count, orders }
      
            console.log('Received orders:', data);
      
            if (data.success && Array.isArray(data.orders)) {
              setOrders(data.orders); // <-- extract orders array here
            } else {
              setOrders([]); // fallback to empty array
            }
          } catch (err) {
            console.error('Error fetching seller orders:', err);
            setOrders([]);
          } finally {
            setLoading(false);
          }
        };
      
        fetchOrders();
      }, [sellerId]);
      
  
    if (loading) return <p>Loading orders...</p>;
    if (!orders.length) return <p>No orders found.</p>;
  
    return <CustomerOrders orders={orders} sellerId={sellerId || undefined} />;
  };