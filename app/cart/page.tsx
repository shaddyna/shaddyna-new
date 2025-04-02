"use client";
import { ShoppingCartIcon, XIcon, PlusIcon, MinusIcon } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/stores/cart-store';
import  Button  from '@/components/ui/Button';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice, clearCart } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  // Fix hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#0f1c47]">Your Shopping Cart</h1>
            <span className="text-gray-500">
              {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCartIcon className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-medium text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet</p>
            <Link href="/products">
              <Button className="bg-[#0f1c47] hover:bg-[#2a3a8a] text-white">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Table Header */}
                <div className="hidden md:grid grid-cols-12 bg-gray-50 p-4 border-b">
                  <div className="col-span-6 font-medium text-gray-500">Product</div>
                  <div className="col-span-2 font-medium text-gray-500">Price</div>
                  <div className="col-span-2 font-medium text-gray-500">Quantity</div>
                  <div className="col-span-2 font-medium text-gray-500">Total</div>
                </div>

                {/* Cart Items List */}
                <ul className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={`${item._id}-${item.color}`} className="p-4">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Product Image & Name */}
                        <div className="col-span-6 flex items-center space-x-4">
                          <div className="relative h-20 w-20 rounded-md overflow-hidden">
                            <img
                              src={item.image || '/placeholder-product.jpg'}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                              {item.name}
                            </h3>
                            {item.color && (
                              <p className="text-xs text-gray-500 mt-1">
                                Color: <span className="capitalize">{item.color}</span>
                              </p>
                            )}
                            <button
                              onClick={() => removeItem(item._id)}
                              className="md:hidden text-xs text-red-500 mt-2 flex items-center"
                            >
                              <XIcon className="h-3 w-3 mr-1" /> Remove
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-2 hidden md:block">
                          <p className="text-gray-900">KES {item.price.toFixed(2)}</p>
                        </div>

                        {/* Quantity */}
                        <div className="col-span-4 md:col-span-2">
                          <div className="flex items-center border border-gray-300 rounded-md w-fit">
                            <button
                              onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              disabled={item.quantity <= 1}
                            >
                              <MinusIcon className="h-4 w-4" />
                            </button>
                            <span className="px-3 py-1 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              disabled={item.quantity >= item.stock}
                            >
                              <PlusIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* Total & Remove */}
                        <div className="col-span-2 flex items-center justify-between">
                          <p className="text-gray-900 font-medium">
                            KES {(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeItem(item._id)}
                            className="hidden md:block text-gray-400 hover:text-red-500"
                          >
                            <XIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Clear Cart Button */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-sm text-red-500 hover:text-red-700 flex items-center"
                >
                  <XIcon className="h-4 w-4 mr-1" /> Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">KES {getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">Free</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-4">
                    <span className="font-medium text-gray-900">Total</span>
                    <span className="font-medium text-gray-900">KES {getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-[#bf2c7e] hover:bg-[#a8256d] text-white">
                  Checkout
                </Button>
                <div className="mt-4 flex justify-center">
                  <Link href="/products" className="text-sm text-[#0f1c47] hover:underline">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}