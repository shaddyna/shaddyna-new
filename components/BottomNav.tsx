/*"use client"; 

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeadingIcon, Home02Icon, Money03Icon, ShoppingBasket01Icon, UserMultiple02Icon } from "hugeicons-react";

const navItems = [
  { name: "Home", href: "/", icon: Home02Icon },
  { name: "Shops", href: "/shops", icon: ShoppingBasket01Icon },
  { name: "Hub", href: "/hub", icon: HeadingIcon},
  { name: "Shelves", href: "/shelves", icon: UserMultiple02Icon },
  { name: "My Money", href: "/money", icon: Money03Icon },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around p-2 shadow-md lg:hidden">
      {navItems.map(({ name, href, icon: Icon }) => (
        <Link key={name} href={href} className="flex flex-col items-center text-gray-500 hover:text-black transition">
          <Icon size={24} className={pathname === href ? "text-blue-500" : "text-gray-500"} />
          <span className={`${pathname === href ? "text-blue-500" : "text-gray-500"} text-xs`}>{name}</span>
        </Link>
      ))}
    </nav>
  );
}*/




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
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-[#0f1c47]/10 flex justify-around shadow-lg lg:hidden">
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
}