"use client"; // ✅ Needed for usePathname()

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
          <span className="text-xs">{name}</span>
        </Link>
      ))}
    </nav>
  );
}






