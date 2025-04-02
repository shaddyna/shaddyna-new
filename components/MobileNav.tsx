import { UserAccountIcon } from 'hugeicons-react';
import { PlusCircleIcon, HeartIcon, ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { useCartStore } from '@/stores/cart-store'; // Import your cart store

interface MobileNavProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const MobileNav = ({ setIsModalOpen }: MobileNavProps) => {
  // Get cart items count from your store
  const cartItemsCount = useCartStore(state => state.getTotalItems());

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md border-b lg:hidden">
      <h1 className="text-lg font-bold text-[#0f1c47]">Shaddyna</h1>
      <div className="flex items-center space-x-4">
        {/* Cart Icon with Badge */}
        <Link 
          href="/cart"
          aria-label="Shopping cart"
          className="hover:text-black transition relative"
        >
          <ShoppingCartIcon size={24} className="text-[#0f1c47]" />
          {cartItemsCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#bf2c7e] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemsCount > 9 ? '9+' : cartItemsCount}
            </span>
          )}
        </Link>
        
        {/* Plus Icon */}
        <button 
          onClick={() => setIsModalOpen(true)}
          aria-label="Open menu"
          className="hover:text-black transition"
        >
          <PlusCircleIcon size={24} className="text-[#0f1c47]" />
        </button>
        
        {/* Profile Icon */}
        <Link 
          href="/profile"
          aria-label="User profile"
          className="hover:text-black transition"
        >
          <UserAccountIcon size={24} className="text-[#0f1c47]" />
        </Link>
      </div>
    </nav>
  );
};

export default MobileNav;