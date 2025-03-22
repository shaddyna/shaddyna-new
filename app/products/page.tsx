'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiArrowLeft, FiShoppingCart, FiShoppingBag, FiPlus, FiX } from 'react-icons/fi'

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
  id: number
  name: string
  price: string
  image: string
  description: string
}

const ProductCard = ({ product, onSelect, onAddToCart }: { 
  product: Product, 
  onSelect: () => void,
  onAddToCart: () => void 
}) => (
  <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
    <div className="relative h-60 overflow-hidden">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c47]/20 to-transparent" />
    </div>
    
    <div className="p-4 space-y-3">
      <div>
        <h2 className="text-lg font-bold text-[#0f1c47] truncate">{product.name}</h2>
        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
      </div>
      
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold text-[#bf2c7e]">{product.price}</p>
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
          
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-48 object-cover rounded-lg"
          />
          
          <div className="space-y-4">
            <p className="text-gray-600">{product.description}</p>
            <p className="text-2xl font-bold text-[#bf2c7e]">{product.price}</p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                onClose()
                router.push(`/pay?product=${product.id}`)
              }}
              className="w-full bg-[#bf2c7e] text-white py-3 rounded-xl hover:bg-[#a02468] transition-colors font-medium"
            >
              Proceed to Payment
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
    </div>
  )
}

const CartNotification = ({ count, onCheckout }: { count: number, onCheckout: () => void }) => (
  <div className="fixed bottom-4 right-4 left-4 sm:left-auto bg-white shadow-xl rounded-xl p-4 flex items-center justify-between animate-slide-up">
    <div className="flex items-center gap-3">
      <FiShoppingCart className="text-[#bf2c7e] text-xl" />
      <span className="font-medium text-[#0f1c47]">{count} item(s) in cart</span>
    </div>
    <button
      onClick={onCheckout}
      className="bg-[#bf2c7e] text-white px-6 py-2 rounded-lg hover:bg-[#a02468] transition-colors"
    >
      Checkout
    </button>
  </div>
)

const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 'KES 4,500',
    image: '/images/headphones.jpg',
    description: 'Premium noise-canceling wireless headphones with 40hr battery life and deep bass'
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    price: 'KES 6,000',
    image: '/images/smartwatch.jpg',
    description: 'Health monitoring smartwatch with AMOLED display and 2-week battery'
  },
  {
    id: 3,
    name: 'RGB Gaming Mouse',
    price: 'KES 2,200',
    image: '/images/mouse.jpg',
    description: '16,000 DPI optical gaming mouse with customizable RGB lighting effects'
  },
  {
    id: 4,
    name: 'Ergo Laptop Stand',
    price: 'KES 3,000',
    image: '/images/laptop-stand.jpg',
    description: 'Adjustable aluminum stand with 6-angle tilt for perfect ergonomic positioning'
  },
  {
    id: 5,
    name: 'Wireless Keyboard',
    price: 'KES 3,500',
    image: '/images/keyboard.jpg',
    description: 'Slim mechanical keyboard with Bluetooth 5.2 and RGB backlighting'
  },
  {
    id: 6,
    name: '4K Webcam',
    price: 'KES 8,000',
    image: '/images/webcam.jpg',
    description: 'Autofocus webcam with dual microphones and privacy shutter'
  }
]

export default function BuyGoodsPage() {
  const [cart, setCart] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const router = useRouter()

  const addToCart = (product: Product) => {
    setCart([...cart, product])
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
            Explore our curated selection of high-quality tech accessories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
              onSelect={() => setSelectedProduct(product)}
              onAddToCart={() => addToCart(product)}
            />
          ))}
        </div>

        {cart.length > 0 && (
          <CartNotification 
            count={cart.length} 
            onCheckout={() => router.push('/checkout')}
          />
        )}

        {selectedProduct && (
          <PurchaseModal 
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </main>
    </div>
  )
}
