'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FiArrowLeft, FiMinus, FiPlus } from 'react-icons/fi'
import Image from 'next/image'
import { Snackbar } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import React from 'react'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Product {
  _id: string
  name: string
  price?: number
  images: string[]
  rating?: number
  category?: string
  isNew?: boolean
  isDiscounted?: boolean
  originalPrice?: number
}

const TopNav = ({ title }: { title: string }) => {
  const router = useRouter()
  
  return (
    <nav className="bg-white border-b border-[#0f1c47]/10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <button 
          onClick={() => router.back()}
          className="text-[#0f1c47] hover:text-[#bf2c7e] transition-colors flex items-center gap-2"
        >
          <FiArrowLeft className="text-xl" />
          <span className="font-medium">Back</span>
        </button>
        <h1 className="text-xl font-bold text-[#0f1c47]">
          {title}
        </h1>
        <div className="w-8"></div> {/* Spacer for alignment */}
      </div>
    </nav>
  )
}

export default function PayWithSavingsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const productId = searchParams.get('product')
  
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')
  
  // Shipping form state
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    country: 'Kenya',
    additionalInfo: ''
  })

  useEffect(() => {
    if (!productId) {
      setError('No product selected')
      setIsLoading(false)
      return
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://shaddyna-backend.onrender.com/api/products/${productId}`)
        if (!response.ok) throw new Error("Failed to fetch product")
        
        const data = await response.json()
        setProduct({
          _id: data._id,
          name: data.name || "Unnamed Product",
          price: data.price ?? 0,
          images: data.images || [],
          rating: data.rating || 0,
          category: data.category,
          isNew: data.isNew,
          isDiscounted: data.isDiscounted,
          originalPrice: data.originalPrice
        })
        
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate form
    if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address || !shippingInfo.city) {
      setSnackbarMessage('Please fill in all required shipping information')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
      return
    }

    // Here you would typically process the payment
    // For now we'll just show a success message
    setSnackbarMessage('Order placed successfully!')
    setSnackbarSeverity('success')
    setSnackbarOpen(true)
    
    // Redirect to order confirmation after a delay
    setTimeout(() => {
      router.push('/orders')
    }, 2000)
  }

  const subtotal = product ? (product.price || 0) * quantity : 0
  const shippingFee = 200 // Fixed shipping fee in KSH
  const total = subtotal + shippingFee

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <TopNav title="Pay With Savings" />
        <div className="container mx-auto px-4 py-8 flex justify-center">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-[#bf2c7e]/20 h-12 w-12"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <TopNav title="Pay With Savings" />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="bg-red-50 text-red-600 p-4 rounded-lg inline-block">
            {error}
          </div>
          <button 
            onClick={() => router.push('/buy-goods')}
            className="mt-4 bg-[#bf2c7e] text-white px-6 py-2 rounded-lg hover:bg-[#a02468] transition-colors"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <TopNav title="Pay With Savings" />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="bg-yellow-50 text-yellow-600 p-4 rounded-lg inline-block">
            Product not found
          </div>
          <button 
            onClick={() => router.push('/buy-goods')}
            className="mt-4 bg-[#bf2c7e] text-white px-6 py-2 rounded-lg hover:bg-[#a02468] transition-colors"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <TopNav title="Pay With Savings" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Product and Shipping */}
          <div className="lg:w-2/3 space-y-8">
            {/* Product Summary */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-[#0f1c47] mb-6">Product Summary</h2>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="relative w-full sm:w-40 h-40 rounded-lg overflow-hidden">
                  <Image 
                    src={product.images[0] || 'https://placehold.co/300x360?text=No+Image'}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#0f1c47]">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        disabled={quantity <= 1}
                      >
                        <FiMinus className="text-gray-600" />
                      </button>
                      <span className="font-medium">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(prev => prev + 1)}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        <FiPlus className="text-gray-600" />
                      </button>
                    </div>
                    
                    <p className="text-xl font-bold text-[#bf2c7e]">
                      Ksh{(product.price || 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Shipping Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-[#0f1c47] mb-6">Shipping Information</h2>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingInfo.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#bf2c7e] focus:border-[#bf2c7e]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#bf2c7e] focus:border-[#bf2c7e]"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#bf2c7e] focus:border-[#bf2c7e]"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#bf2c7e] focus:border-[#bf2c7e]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={shippingInfo.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                      disabled
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                  <textarea
                    name="additionalInfo"
                    value={shippingInfo.additionalInfo}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#bf2c7e] focus:border-[#bf2c7e]"
                  />
                </div>
              </form>
            </div>
          </div>
          
          {/* Right column - Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-[#0f1c47] mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({quantity} item{quantity > 1 ? 's' : ''})</span>
                  <span className="font-medium">Ksh{subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Ksh{shippingFee.toLocaleString()}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-[#bf2c7e]">Ksh{total.toLocaleString()}</span>
                  </div>
                </div>
                
                <button
                  onClick={handleSubmit}
                  className="w-full bg-[#bf2c7e] text-white py-3 rounded-lg hover:bg-[#a02468] transition-colors font-medium mt-6"
                >
                  Complete Purchase
                </button>
                
                <p className="text-xs text-gray-500 mt-4 text-center">
                  By completing your purchase, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}
