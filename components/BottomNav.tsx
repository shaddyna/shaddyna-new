/*"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeadingIcon, Home02Icon, Money03Icon, ShoppingBasket01Icon, UserMultiple02Icon } from "hugeicons-react";

const navItems = [
  { name: "Home", href: "/", icon: Home02Icon },
  { name: "Shops", href: "/shops", icon: ShoppingBasket01Icon },
  { name: "Hub", href: "/hub", icon: HeadingIcon },
  { name: "Shelves", href: "/shelves", icon: UserMultiple02Icon },
  { name: "My Money", href: "/money", icon: Money03Icon },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-[#0f1c47]/10 flex justify-around shadow-lg lg:hidden z-[9999]">
      {navItems.map(({ name, href, icon: Icon }) => (
        <Link
          key={name}
          href={href}
          className="flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300"
        >
          <div
            className={`p-2 rounded-lg transition-all duration-300 ${
              pathname === href
                ? "bg-[#bf2c7e]/10 text-[#bf2c7e]"
                : "text-[#0f1c47] hover:bg-[#bf2c7e]/10"
            }`}
          >
            <Icon size={24} />
          </div>
          <span
            className={`text-xs font-medium mt-1 ${
              pathname === href ? "text-[#bf2c7e]" : "text-[#0f1c47]"
            }`}
          >
            {name}
          </span>
        </Link>
      ))}
    </nav>
  );
}*/

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeadingIcon, Home02Icon, Money03Icon, ShoppingBasket01Icon, UserMultiple02Icon } from "hugeicons-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "/", icon: Home02Icon },
  { name: "Shops", href: "/shops", icon: ShoppingBasket01Icon },
  { name: "Hub", href: "/hub", icon: HeadingIcon },
  { name: "Shelves", href: "/shelves", icon: UserMultiple02Icon },
  { name: "My Money", href: "/money", icon: Money03Icon },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px threshold
        setVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`fixed bottom-0 left-0 w-full bg-white border-t border-[#0f1c47]/10 flex justify-around shadow-lg lg:hidden z-[9999] transition-transform duration-300 ${
      visible ? 'translate-y-0' : 'translate-y-full'
    }`}>
      {navItems.map(({ name, href, icon: Icon }) => (
        <Link
          key={name}
          href={href}
          className="flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300"
        >
          <div
            className={`p-2 rounded-lg transition-all duration-300 ${
              pathname === href
                ? "bg-[#bf2c7e]/10 text-[#bf2c7e]"
                : "text-[#0f1c47] hover:bg-[#bf2c7e]/10"
            }`}
          >
            <Icon size={24} />
          </div>
          <span
            className={`text-xs font-medium mt-1 ${
              pathname === href ? "text-[#bf2c7e]" : "text-[#0f1c47]"
            }`}
          >
            {name}
          </span>
        </Link>
      ))}
    </nav>
  );
}