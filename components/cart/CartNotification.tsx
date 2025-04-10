import { FiShoppingCart, FiTrash2 } from 'react-icons/fi'
import { useCartStore } from '@/stores/cart-store'

const CartNotification = ({ 
  onCheckout 
}: { 
  onCheckout: () => void 
}) => {
  const {
    items,
    updateQuantity,
    removeItem,
    getTotalItems,
    getTotalPrice
  } = useCartStore()

  const handleIncrease = (itemId: string) => {
    const item = items.find(i => i._id === itemId)
    if (item) {
      updateQuantity(itemId, item.quantity + 1)
    }
  }

  const handleDecrease = (itemId: string) => {
    const item = items.find(i => i._id === itemId)
    if (item) {
      const newQuantity = item.quantity - 1
      if (newQuantity < 1) {
        removeItem(itemId)
      } else {
        updateQuantity(itemId, newQuantity)
      }
    }
  }

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto bg-white shadow-xl rounded-xl p-4 animate-slide-up max-h-[70vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-[#0f1c47] flex items-center gap-2">
          <FiShoppingCart className="text-[#bf2c7e] text-xl" />
          Your Cart ({getTotalItems()} items)
        </h3>
        <button
          onClick={onCheckout}
          className="bg-[#bf2c7e] text-white px-4 py-2 rounded-lg hover:bg-[#a02468] transition-colors text-sm"
        >
          Checkout
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-4">Your cart is empty</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={`${item._id}-${item.color}`} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3 flex-1">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-[#0f1c47] text-sm truncate">
                    {item.name}
                    {item.color && <span className="text-gray-500"> • {item.color}</span>}
                  </p>
                  <p className="text-[#bf2c7e] font-bold text-sm">
                    Ksh{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => handleDecrease(item._id)}
                  className="w-8 h-8 rounded-lg border border-[#0f1c47] flex items-center justify-center hover:bg-[#0 0f1c47]/5 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <span className="text-[#0f1c47]">−</span>
                </button>
                <span className="w-8 text-center text-sm font-medium text-[#0f1c47]">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleIncrease(item._id)}
                  className="w-8 h-8 rounded-lg border border-[#0f1c47] flex items-center justify-center hover:bg-[#0f1c47]/5 transition-colors"
                  aria-label="Increase quantity"
                  disabled={item.quantity >= item.stock}
                >
                  <span className="text-[#0f1c47]">+</span>
                </button>
                <button
                  onClick={() => removeItem(item._id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors text-red-500"
                  aria-label="Remove item"
                >
                  <FiTrash2 className="text-sm" />
                </button>
              </div>
            </div>
          ))}

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-[#0f1c47]">Subtotal:</span>
              <span className="text-[#bf2c7e] font-bold">
                Ksh{getTotalPrice().toLocaleString()}
              </span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-[#bf2c7e] text-white py-2 rounded-lg hover:bg-[#a02468] transition-colors font-medium mt-2"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default CartNotification