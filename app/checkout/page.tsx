"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { useCartStore } from '@/stores/cart-store';
import { useCheckoutStore } from '@/stores/checkout-store';
import { Button } from '@/components/ui/ButtonTwo';
import { Input } from '@/components/ui/Input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ShoppingCartIcon, ChevronLeftIcon } from 'lucide-react';

interface CartItem {
  _id: string
  name: string
  price: number
  quantity: number
  image: string
  color: string
  stock: number
  sellerId: string 
  shelfId: string 
}

// Form validation schemas
const shippingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  additionalInfo: z.string().optional(),
});

const paymentSchema = z.object({
  payments: z.array(
    z.object({
      sellerId: z.string(),
      phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
      mpesaCode: z.string().min(1, "M-Pesa code is required"),
      mpesaName: z.string().min(1, "Name is required"),
      amount: z.number(),
      items: z.array(z.object({
        _id: z.string(),
        quantity: z.number()
      }))
    })
  ).min(1, "At least one payment is required")
});

// Order Summary Sidebar Component
const OrderSummary = ({ items }: { items: CartItem[] }) => {
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [items]);

  const shippingCost = 0; // Free shipping in this case
  const total = subtotal + shippingCost;

  // Group items by seller for display
  const itemsBySeller = useMemo(() => {
    return items.reduce((acc, item) => {
      if (!acc[item.sellerId]) {
        acc[item.sellerId] = [];
      }
      acc[item.sellerId].push(item);
      return acc;
    }, {} as Record<string, typeof items>);
  }, [items]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      
      {/* Items List */}
      <div className="mb-4 max-h-64 overflow-y-auto">
        {Object.entries(itemsBySeller).map(([sellerId, sellerItems]) => (
          <div key={sellerId} className="mb-4">
            <h3 className="font-medium text-gray-700 mb-2">Seller {sellerId.slice(0, 4)}...</h3>
            {sellerItems.map(item => (
              <div key={`${item._id}-${item.color}`} className="flex justify-between items-start py-2 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="relative h-12 w-12 rounded-md overflow-hidden">
                    <img
                      src={item.image || '/placeholder-product.jpg'}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    {item.color && (
                      <p className="text-xs text-gray-500">Color: {item.color}</p>
                    )}
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  KES {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-3 border-t border-gray-200 pt-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({items.length} items)</span>
          <span className="text-gray-900">KES {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-900">Free</span>
        </div>
        <div className="flex justify-between font-medium text-gray-900 pt-2">
          <span>Total</span>
          <span>KES {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};



export default function CheckoutPage() {
  const router = useRouter();
  const cartItems = useCartStore(state => state.items);
  const cartTotal = useCartStore(state => state.getTotalPrice());
  const {
    items,
    shippingInfo,
    paymentDetails,
    setItems,
    setShippingInfo,
    setPaymentDetails,
    clearCheckout
  } = useCheckoutStore();
  
  const [activeStep, setActiveStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [isLoading, setIsLoading] = useState(false);

  // Group items by seller
  const itemsBySeller = useMemo(() => {
    return items.reduce((acc, item) => {
      if (!acc[item.sellerId]) {
        acc[item.sellerId] = [];
      }
      acc[item.sellerId].push(item);
      return acc;
    }, {} as Record<string, typeof items>);
  }, [items]);

  // Calculate total for each seller
  const sellerTotals = useMemo(() => {
    return Object.entries(itemsBySeller).map(([sellerId, sellerItems]) => {
      const total = sellerItems.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
      );
      return { sellerId, total, items: sellerItems };
    });
  }, [itemsBySeller]);

  // Initialize checkout with cart items if not already set
  useEffect(() => {
    if (cartItems.length > 0 && items.length === 0) {
      setItems(cartItems);
    }
  }, [cartItems, items, setItems]);

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && items.length === 0) {
      router.push('/');
    }
  }, [cartItems, items, router]);

  // Shipping form
  const shippingForm = useForm<z.infer<typeof shippingSchema>>({
    resolver: zodResolver(shippingSchema),
    defaultValues: shippingInfo || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      additionalInfo: '',
    },
  });

  // Payment form with dynamic fields for each seller
  const paymentForm = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      payments: sellerTotals.map(({ sellerId, total, items }) => {
        // Find existing payment details for this seller if available
        const existingPayment = paymentDetails?.find(p => p.sellerId === sellerId);
        
        return {
          sellerId,
          phoneNumber: existingPayment?.phoneNumber || '',
          mpesaCode: existingPayment?.mpesaCode || '',
          mpesaName: existingPayment?.mpesaName || '',
          amount: total,
          items: items.map(item => ({
            _id: item._id,
            quantity: item.quantity
          }))
        };
      })
    }
  });

  const onShippingSubmit = (values: z.infer<typeof shippingSchema>) => {
    setShippingInfo(values);
    setActiveStep('payment');
  };

  const onPaymentSubmit = (values: z.infer<typeof paymentSchema>) => {
    // Extract and store each seller's payment details
    setPaymentDetails(values.payments);
    setActiveStep('review');
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    try {
      // Prepare order data
      const orderData = {
        shippingInfo,
        payments: paymentForm.getValues().payments,
        items
      };
  
      // Log the order data before submitting
      console.log('Order Data:', orderData);
  
      // Send the request to place the order
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you use JWT
        },
        body: JSON.stringify(orderData)
      });
  
      // Handle server response
      if (!response.ok) {
        throw new Error('Failed to place order');
      }
  
      const data = await response.json();
  
      // Clear cart and checkout
      useCartStore.getState().clearCart();
      clearCheckout();
  
      // Redirect to confirmation page with order ID
      router.push(`/`);
    } catch (error) {
      console.error('Checkout failed:', error);
      // Show error to user
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-12">
        <ShoppingCartIcon className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-xl font-medium text-gray-700 mb-2">Your cart is empty</h2>
        <Button onClick={() => router.push('/products')} className="mt-4">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Checkout Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => activeStep === 'shipping' ? router.push('/cart') : setActiveStep('shipping')}
              className="flex items-center text-[#0f1c47] hover:text-[#2a3a8a]"
            >
              <ChevronLeftIcon className="h-5 w-5 mr-1" />
              Back
            </button>
            <h1 className="text-2xl font-bold text-[#0f1c47]">Checkout</h1>
            <div className="w-24"></div>
          </div>
          
          {/* Progress Steps */}
          <div className="mt-6 flex justify-between">
            <div className={`flex flex-col items-center ${activeStep === 'shipping' ? 'text-[#0f1c47] font-medium' : 'text-gray-500'}`}>
              <div className={`h-2 w-24 rounded-full mb-2 ${activeStep === 'shipping' ? 'bg-[#0f1c47]' : 'bg-gray-300'}`}></div>
              <span>Shipping</span>
            </div>
            <div className={`flex flex-col items-center ${activeStep === 'payment' ? 'text-[#0f1c47] font-medium' : 'text-gray-500'}`}>
              <div className={`h-2 w-24 rounded-full mb-2 ${activeStep !== 'shipping' ? 'bg-[#0f1c47]' : 'bg-gray-300'}`}></div>
              <span>Payment</span>
            </div>
            <div className={`flex flex-col items-center ${activeStep === 'review' ? 'text-[#0f1c47] font-medium' : 'text-gray-500'}`}>
              <div className={`h-2 w-24 rounded-full mb-2 ${activeStep === 'review' ? 'bg-[#0f1c47]' : 'bg-gray-300'}`}></div>
              <span>Review</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {activeStep === 'shipping' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Shipping Information</h2>
                <form onSubmit={shippingForm.handleSubmit(onShippingSubmit)} className="space-y-4">
                  <Form form={shippingForm} asChild>
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={shippingForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={shippingForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={shippingForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={shippingForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input type="tel" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={shippingForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={shippingForm.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={shippingForm.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postal Code</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={shippingForm.control}
                        name="additionalInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Information (Optional)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  </Form>
                  <Button type="submit" className="w-full mt-6 bg-[#0f1c47] hover:bg-[#2a3a8a]">
                    Continue to Payment
                  </Button>
                </form>
              </div>
            )}

            {activeStep === 'payment' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Payment Details</h2>
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="font-medium text-blue-800 mb-2">M-Pesa Payment</h3>
                  <p className="text-sm text-blue-700">
                    Please complete payment for each seller separately
                  </p>
                </div>
                
                <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-8">
                  {sellerTotals.map(({ sellerId, total, items }, index) => {
                    // Get the payment values for this specific seller
                    const paymentValues = paymentForm.watch(`payments.${index}`);
                    
                    return (
                      <div key={sellerId} className="border-b pb-6 last:border-b-0">
                        <div className="mb-4">
                          <h3 className="font-medium text-gray-900">
                            Payment for Seller {index + 1}
                          </h3>
                          <p className="text-gray-600">KES {total.toFixed(2)}</p>
                          <div className="mt-2 text-sm text-gray-500">
                            {items.length} item{items.length > 1 ? 's' : ''}
                          </div>
                        </div>
                        
                        <Form form={paymentForm} asChild>
                          <>
                            <input type="hidden" {...paymentForm.register(`payments.${index}.sellerId`)} />
                            <input type="hidden" {...paymentForm.register(`payments.${index}.amount`)} />
                            
                            <FormField
                              control={paymentForm.control}
                              name={`payments.${index}.phoneNumber`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>M-Pesa Phone Number</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="tel" 
                                      placeholder="e.g. 254712345678" 
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={paymentForm.control}
                              name={`payments.${index}.mpesaName`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name (as registered with M-Pesa)</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={paymentForm.control}
                              name={`payments.${index}.mpesaCode`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>M-Pesa Transaction Code</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Enter transaction code" 
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </>
                        </Form>
                      </div>
                    );
                  })}
                  
                  <div className="pt-4">
                    <Button type="submit" className="w-full bg-[#0f1c47] hover:bg-[#2a3a8a]">
                      Review Order
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {activeStep === 'review' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Review Your Order</h2>
                
                {/* Shipping Information Review */}
                <div className="mb-8">
                  <h3 className="font-medium text-gray-900 mb-3">Shipping Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {/* Shipping info display */}
                  </div>
                </div>
                
                {/* Payment Information Review */}
                <div className="mb-8">
                  <h3 className="font-medium text-gray-900 mb-3">Payment Methods</h3>
                  {paymentForm.watch('payments')?.map((payment, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                      <h4 className="font-medium text-gray-800 mb-2">
                        Payment {index + 1} (KES {payment.amount.toFixed(2)})
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Phone Number</p>
                          <p className="text-gray-700">{payment.phoneNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Name</p>
                          <p className="text-gray-700">{payment.mpesaName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Transaction Code</p>
                          <p className="text-gray-700">{payment.mpesaCode}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <OrderSummary items={items} />
                
                <Button 
                  onClick={handlePlaceOrder}
                  className="w-full mt-8 bg-[#bf2c7e] hover:bg-[#a8256d]"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Place Order'}
                </Button>
              </div>
            )}
          </div>

          <OrderSummary items={items} />
        </div>
      </div>
    </div>
  );
}
