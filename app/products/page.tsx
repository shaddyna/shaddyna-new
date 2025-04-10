'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FiArrowLeft, FiShoppingCart, FiShoppingBag, FiPlus, FiX, FiHeart } from 'react-icons/fi'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import Image from 'next/image'
import { useCartStore } from '@/stores/cart-store'
import { Snackbar } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import React from 'react'
import CartNotification from '@/components/cart/CartNotification'



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Reusable TopNav Component
const TopNav = () => {
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
        <h1 className="text-xl font-bold text-[#0f1c47] flex items-center gap-2">
          <FiShoppingBag className="text-[#bf2c7e]" />
          Marketplace
        </h1>
      </div>
    </nav>
  )
}

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
  sellerId?: string
  shelfId?: string
}

const ProductCard = ({ 
  product, 
  onSelect, 
  onAddToCart 
}: { 
  product: Product, 
  onSelect: () => void,
  onAddToCart: () => void 
}) => (
  <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
    <div className="relative h-60 overflow-hidden">
      <Image 
        src={product.images[0] || 'https://placehold.co/300x360?text=No+Image'}
        alt={product.name}
        fill
        className="object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c47]/20 to-transparent" />
      
      <div className="absolute top-2 left-2 flex gap-2">
        {product.isNew && (
          <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">
            New
          </span>
        )}
        {product.isDiscounted && (
          <span className="text-xs bg-[#bf2c7e] text-white px-2 py-1 rounded-full">
            Sale
          </span>
        )}
      </div>
      
      <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full backdrop-blur-sm hover:bg-white transition-colors">
        <FiHeart className="text-gray-700 hover:text-[#bf2c7e]" />
      </button>
    </div>
    
    <div className="p-4 space-y-3">
      <div>
        <h2 className="text-lg font-bold text-[#0f1c47] truncate">{product.name}</h2>
        <p className="text-xs text-gray-500 uppercase">{product.category || 'Uncategorized'}</p>
        
        <div className="flex items-center mt-1">
          {[...Array(5)].map((_, i) => (
            i < (product.rating || 0) ? (
              <AiFillStar key={i} className="text-yellow-400 w-3 h-3" />
            ) : (
              <AiOutlineStar key={i} className="text-gray-300 w-3 h-3" />
            )
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xl font-bold text-[#bf2c7e]">
            Ksh{(product.price || 0).toLocaleString()}
          </p>
          {product.isDiscounted && product.originalPrice && (
            <p className="text-xs text-gray-400 line-through">
              Ksh{(product.originalPrice || 0).toLocaleString()}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={onSelect}
            className="bg-[#bf2c7e] text-white p-2 rounded-lg hover:bg-[#a02468] transition-colors"
          >
            Buy Now
          </button>
          <button
            onClick={onAddToCart}
            className="border-2 border-[#0f1c47] text-[#0f1c47] p-2 rounded-lg hover:bg-[#0f1c47]/5 transition-colors"
          >
            <FiPlus className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  </div>
)

const PurchaseModal = ({ product, onClose }: { product: Product, onClose: () => void }) => {
  const router = useRouter()
  const { addItem } = useCartStore()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')

  const handleAddToCart = () => {
    try {
      addItem({
        _id: product._id,
        name: product.name,
        price: product.price || 0,
        quantity: 1,
        image: product.images?.[0] || '',
        color: '',
        stock: 10,
        sellerId: product.sellerId || '',
        shelfId: product.shelfId || ''
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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-[#0f1c47]">{product.name}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-[#bf2c7e] transition-colors"
            >
              <FiX className="text-xl" />
            </button>
          </div>
          
          <div className="relative h-60 w-full rounded-lg overflow-hidden">
            <Image 
              src={product.images[0] || 'https://placehold.co/300x360?text=No+Image'}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-600">{product.category || 'Uncategorized'}</p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                i < (product.rating || 0) ? (
                  <AiFillStar key={i} className="text-yellow-400" />
                ) : (
                  <AiOutlineStar key={i} className="text-gray-300" />
                )
              ))}
            </div>
            <div>
              <p className="text-2xl font-bold text-[#bf2c7e]">
                Ksh{(product.price || 0).toLocaleString()}
              </p>
              {product.isDiscounted && product.originalPrice && (
                <p className="text-sm text-gray-400 line-through">
                  Ksh{(product.originalPrice || 0).toLocaleString()}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                onClose()
                router.push(`/pay?product=${product._id}`)
              }}
              className="w-full bg-[#bf2c7e] text-white py-3 rounded-xl hover:bg-[#a02468] transition-colors font-medium"
            >
              Pay With Savings
            </button>
            
            <button
              onClick={() => {
                handleAddToCart()
                onClose()
              }}
              className="w-full bg-[#0f1c47] text-white py-3 rounded-xl hover:bg-[#0f1c47]/90 transition-colors font-medium"
            >
              Add to Cart
            </button>
            
            <button
              onClick={onClose}
              className="w-full border-2 border-[#0f1c47] text-[#0f1c47] py-3 rounded-xl hover:bg-[#0f1c47]/5 transition-colors font-medium"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>

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

export default function BuyGoodsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success')
  const router = useRouter()
  const { items, addItem } = useCartStore()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://shaddyna-backend.onrender.com/api/products/all")
        if (!response.ok) throw new Error("Failed to fetch products")
        
        const data = await response.json()
        setProducts(data.products.map((product: any) => ({
          _id: product._id,
          name: product.name || "Unnamed Product",
          price: product.price ?? 0,
          images: product.images || [],
          rating: product.rating || Math.floor(Math.random() * 5) + 1,
          category: product.category,
          isNew: product.isNew,
          isDiscounted: product.isDiscounted,
          originalPrice: product.originalPrice,
          sellerId: product.sellerId,
          shelfId: product.shelfId
        })))
        
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleAddToCart = (product: Product) => {
    try {
      addItem({
        _id: product._id,
        name: product.name,
        price: product.price || 0,
        quantity: 1,
        image: product.images?.[0] || '',
        color: '',
        stock: 10,
        sellerId: product.sellerId || '',
        shelfId: product.shelfId || ''
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <TopNav />
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
        <TopNav />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="bg-red-50 text-red-600 p-4 rounded-lg inline-block">
            {error}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <TopNav />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-[#0f1c47] mb-2">
            Discover <span className="text-[#bf2c7e]">Premium</span> Goods
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Explore our curated selection of high-quality products
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product._id}
                product={product}
                onSelect={() => setSelectedProduct(product)}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500">No products available</p>
          </div>
        )}

        {items.length > 0 && (
          <CartNotification 
            onCheckout={() => router.push('/cart')} 
          />
        )}

        {selectedProduct && (
          <PurchaseModal 
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}

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
      </main>
    </div>
  )
}