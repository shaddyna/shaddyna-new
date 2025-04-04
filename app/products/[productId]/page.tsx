'use client'
import { useParams, useRouter } from 'next/navigation'
import { FiArrowLeft, FiShoppingCart, FiHeart, FiShare2, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useCartStore } from '@/stores/cart-store'
import { Snackbar } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import React from 'react'
import Image from 'next/image'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

interface Product {
  _id: string
  name: string
  price: number
  images: string[]
  description: string
  rating: number
  category: string
  stock: number
  sellerId: string
  shelfId: string
  specifications?: {
    [key: string]: string
  }
  reviews?: Array<{
    user: string
    rating: number
    comment: string
    date: string
  }>
}

export default function ProductDetailPage() {
  const { productId } = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const { data } = await axios.get(`https://shaddyna-backend.onrender.com/api/products/${productId}`)
        setProduct(data.product)
      } catch (err) {
        console.error("Error fetching product:", err)
        setError("Failed to load product details")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  const handleAddToCart = () => {
    if (!product) return

    try {
      useCartStore.getState().addItem({
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.images[0] || '',
        color: '',
        stock: product.stock,
        sellerId: product.sellerId,
        shelfId: product.shelfId
      })
      
      setSnackbarMessage(`${product.name} added to cart!`)
      setSnackbarSeverity('success')
      setSnackbarOpen(true)
    } catch (error) {
      setSnackbarMessage('Failed to add item to cart')
      setSnackbarSeverity('error')
      setSnackbarOpen(true)
    }
  }

  const nextImage = () => {
    if (!product) return
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    if (!product) return
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-[#bf2c7e]/20 h-12 w-12"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div>Product not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Floating Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => router.back()}
          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          <FiArrowLeft className="text-[#0f1c47] text-lg" />
        </button>
      </div>

      {/* Product Content */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-50">
              {product.images.length > 0 ? (
                <>
                  <Image
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full backdrop-blur-sm hover:bg-white transition"
                      >
                        <FiChevronLeft className="text-[#0f1c47]" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full backdrop-blur-sm hover:bg-white transition"
                      >
                        <FiChevronRight className="text-[#0f1c47]" />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image Available
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${currentImageIndex === index ? 'border-[#bf2c7e]' : 'border-transparent'}`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0f1c47]">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    i < Math.floor(product.rating) ? (
                      <AiFillStar key={i} className="text-yellow-400" />
                    ) : (
                      <AiOutlineStar key={i} className="text-gray-300" />
                    )
                  ))}
                </div>
                {/*<span className="text-sm text-gray-500">({product.rating.toFixed(1)})</span>*/}
              </div>
            </div>

            <div>
              {/*<p className="text-3xl font-bold text-[#bf2c7e]">KES {product.price.toLocaleString()}</p>*/}
              <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </p>
            </div>

            <div className="border-t border-b border-gray-100 py-4">
              <p className="text-gray-600">{product.description}</p>
            </div>

            {product.stock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="w-10 h-10 flex items-center justify-center text-[#0f1c47] hover:bg-gray-50 disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="w-10 text-center">{quantity}</span>
                    <button
                      onClick={increaseQuantity}
                      disabled={quantity >= product.stock}
                      className="w-10 h-10 flex items-center justify-center text-[#0f1c47] hover:bg-gray-50 disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#0f1c47] text-white py-3 rounded-lg hover:bg-[#0f1c47]/90 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <FiShoppingCart />
                    Add to Cart
                  </button>
                  <button className="p-3 border-2 border-[#0f1c47] text-[#0f1c47] rounded-lg hover:bg-[#0f1c47]/5 transition-colors">
                    <FiHeart />
                  </button>
                  <button className="p-3 border-2 border-[#0f1c47] text-[#0f1c47] rounded-lg hover:bg-[#0f1c47]/5 transition-colors">
                    <FiShare2 />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-6 font-medium text-sm ${activeTab === 'description' ? 'text-[#0f1c47] border-b-2 border-[#0f1c47]' : 'text-gray-500 hover:text-[#0f1c47]'}`}
              >
                Description
              </button>
              {product.specifications && (
                <button
                  onClick={() => setActiveTab('specifications')}
                  className={`py-4 px-6 font-medium text-sm ${activeTab === 'specifications' ? 'text-[#0f1c47] border-b-2 border-[#0f1c47]' : 'text-gray-500 hover:text-[#0f1c47]'}`}
                >
                  Specifications
                </button>
              )}
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-6 font-medium text-sm ${activeTab === 'reviews' ? 'text-[#0f1c47] border-b-2 border-[#0f1c47]' : 'text-gray-500 hover:text-[#0f1c47]'}`}
              >
                Reviews
              </button>
            </nav>
          </div>

          <div className="py-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-600">{product.description}</p>
              </div>
            )}

            {activeTab === 'specifications' && product.specifications && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="border-b border-gray-100 pb-2">
                    <h4 className="text-sm font-medium text-gray-500">{key}</h4>
                    <p className="text-[#0f1c47]">{value}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                {product.reviews && product.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {product.reviews.map((review, index) => (
                      <div key={index} className="border-b border-gray-100 pb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              i < review.rating ? (
                                <AiFillStar key={i} className="text-yellow-400" />
                              ) : (
                                <AiOutlineStar key={i} className="text-gray-300" />
                              )
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.user}</span>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                        <p className="text-xs text-gray-400 mt-2">{review.date}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No reviews yet</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Snackbar Notification */}
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