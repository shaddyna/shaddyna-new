import { FiShoppingCart } from "react-icons/fi"

interface CartItem {
    _id: string
    name: string
    price: number
    quantity: number
    image: string
  }
  
  const CartNotification = ({ 
    items,
    onIncrease,
    onDecrease,
    onCheckout 
  }: { 
    items: CartItem[],
    onIncrease: (itemId: string) => void,
    onDecrease: (itemId: string) => void,
    onCheckout: () => void 
  }) => (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto bg-white shadow-xl rounded-xl p-4 animate-slide-up max-h-[70vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-[#0f1c47] flex items-center gap-2">
          <FiShoppingCart className="text-[#bf2c7e] text-xl" />
          Your Cart ({items.length} items)
        </h3>
        <button
          onClick={onCheckout}
          className="bg-[#bf2c7e] text-white px-4 py-2 rounded-lg hover:bg-[#a02468] transition-colors text-sm"
        >
          Checkout
        </button>
      </div>
  
      {items.map((item) => (
        <div key={item._id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
          <div className="flex items-center gap-3 flex-1">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div className="flex-1">
              <p className="font-medium text-[#0f1c47] text-sm truncate">{item.name}</p>
              <p className="text-[#bf2c7e] font-bold text-sm">
                Ksh{(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => onDecrease(item._id)}
              className="w-8 h-8 rounded-lg border border-[#0f1c47] flex items-center justify-center hover:bg-[#0f1c47]/5 transition-colors"
            >
              <span className="text-[#0f1c47]">−</span>
            </button>
            <span className="w-8 text-center text-sm font-medium text-[#0f1c47]">
              {item.quantity}
            </span>
            <button
              onClick={() => onIncrease(item._id)}
              className="w-8 h-8 rounded-lg border border-[#0f1c47] flex items-center justify-center hover:bg-[#0f1c47]/5 transition-colors"
            >
              <span className="text-[#0f1c47]">+</span>
            </button>
          </div>
        </div>
      ))}
  
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-[#0f1c47]">Total:</span>
          <span className="text-[#bf2c7e] font-bold">
            Ksh{items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )