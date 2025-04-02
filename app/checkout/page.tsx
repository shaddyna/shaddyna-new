"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCartStore } from '@/stores/cart-store';
import { useCheckoutStore } from '@/stores/checkout-store';
import { Button } from '@/components/ui/ButtonTwo';
import { Input } from '@/components/ui/Input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ShoppingCartIcon, ChevronLeftIcon } from 'lucide-react';

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
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  mpesaCode: z.string().min(1, "M-Pesa code is required"),
  mpesaName: z.string().min(1, "Name is required"),
});

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

  // Initialize checkout with cart items if not already set
  useEffect(() => {
    if (cartItems.length > 0 && items.length === 0) {
      setItems(cartItems);
    }
  }, [cartItems, items, setItems]);

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && items.length === 0) {
      router.push('/cart');
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

  // Payment form
  const paymentForm = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: paymentDetails || {
      phoneNumber: '',
      mpesaCode: '',
      mpesaName: '',
    },
  });

  const onShippingSubmit = (values: z.infer<typeof shippingSchema>) => {
    setShippingInfo(values);
    setActiveStep('payment');
  };

  const onPaymentSubmit = (values: z.infer<typeof paymentSchema>) => {
    setPaymentDetails(values);
    setActiveStep('review');
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    try {
      // Here you would typically send the order to your backend
      console.log('Order placed:', { items, shippingInfo, paymentDetails });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear cart and checkout
      useCartStore.getState().clearCart();
      clearCheckout();
      
      // Redirect to confirmation page
      router.push('/order-confirmation');
    } catch (error) {
      console.error('Checkout failed:', error);
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
            <div className="w-24"></div> {/* Spacer for alignment */}
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
                    You'll receive an M-Pesa prompt on your phone to complete the payment.
                  </p>
                </div>
                
                <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-4">
                  <Form form={paymentForm} asChild>
                    <>
                      <FormField
                        control={paymentForm.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>M-Pesa Phone Number</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="e.g. 254712345678" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={paymentForm.control}
                        name="mpesaName"
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
                    </>
                  </Form>
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
                    <p className="text-gray-700">
                      {shippingInfo?.firstName} {shippingInfo?.lastName}
                    </p>
                    <p className="text-gray-700">{shippingInfo?.email}</p>
                    <p className="text-gray-700">{shippingInfo?.phone}</p>
                    <p className="text-gray-700">{shippingInfo?.address}</p>
                    <p className="text-gray-700">
                      {shippingInfo?.city}, {shippingInfo?.postalCode}
                    </p>
                    {shippingInfo?.additionalInfo && (
                      <p className="text-gray-700 mt-2">
                        <span className="font-medium">Additional Info:</span> {shippingInfo.additionalInfo}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Payment Information Review */}
                <div className="mb-8">
                  <h3 className="font-medium text-gray-900 mb-3">Payment Method</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 font-medium">M-Pesa</p>
                    <p className="text-gray-700">{paymentDetails?.phoneNumber}</p>
                    <p className="text-gray-700">{paymentDetails?.mpesaName}</p>
                  </div>
                </div>
                
                {/* Order Summary */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Order Summary</h3>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={`${item._id}-${item.color}`} className="flex justify-between items-center border-b pb-4">
                        <div className="flex items-center space-x-4">
                          <div className="relative h-16 w-16 rounded-md overflow-hidden">
                            <img
                              src={item.image || '/placeholder-product.jpg'}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                            {item.color && (
                              <p className="text-xs text-gray-500">Color: {item.color}</p>
                            )}
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-gray-900">KES {(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
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

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({items.length} items)</span>
                  <span className="text-gray-900">KES {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">Free</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-4">
                  <span className="font-medium text-gray-900">Total</span>
                  <span className="font-medium text-gray-900">KES {cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}