
/*"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserIcon } from "lucide-react";
import { HeadingIcon, Home02Icon, Money03Icon, ShoppingBasket01Icon, UserMultiple02Icon } from "hugeicons-react";


const navItems = [
  { name: "Home", href: "/", icon: Home02Icon },
  { name: "Shops", href: "/shops", icon: ShoppingBasket01Icon },
  { name: "Hub", href: "/hub", icon: HeadingIcon },
  { name: "Shelves", href: "/shelves", icon: UserMultiple02Icon },
  { name: "My Money", href: "/money", icon: Money03Icon },
];


export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white shadow-md border-r p-6">
      <h2 className="text-xl font-bold mb-6">Shaddyna</h2>
      <nav className="flex flex-col space-y-4 flex-grow">
        {navItems.map(({ name, href, icon: Icon }) => (
          <Link
            key={name}
            href={href}
            className={`flex items-center space-x-3 px-4 py-3 rounded-md transition ${
              pathname === href ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Icon size={22} />
            <span>{name}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto">
        <Link href="/profile" className="flex items-center space-x-3 px-4 py-3 rounded-md text-gray-600 hover:bg-gray-100 transition">
          <UserIcon size={22} />
          <span>Profile</span>
        </Link>
      </div>
    </aside>
  );
}*/

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserIcon } from "lucide-react";
import { HeadingIcon, Home02Icon, Money03Icon, ShoppingBasket01Icon, UserMultiple02Icon } from "hugeicons-react";

const navItems = [
  { name: "Home", href: "/", icon: Home02Icon },
  { name: "Shops", href: "/shops", icon: ShoppingBasket01Icon },
  { name: "Hub", href: "/hub", icon: HeadingIcon },
  { name: "Shelves", href: "/shelves", icon: UserMultiple02Icon },
  { name: "My Money", href: "/money", icon: Money03Icon },
];

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white shadow-lg border-r border-[#0f1c47]/10 p-6">
      {/* Branding */}
      <h2 className="text-2xl font-bold text-[#0f1c47] mb-8">Shaddyna</h2>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-2 flex-grow">
        {navItems.map(({ name, href, icon: Icon }) => (
          <Link
            key={name}
            href={href}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              pathname === href
                ? "bg-[#bf2c7e]/10 text-[#bf2c7e] font-semibold"
                : "text-[#0f1c47] hover:bg-[#bf2c7e]/5"
            }`}
          >
            <Icon size={22} className={pathname === href ? "text-[#bf2c7e]" : "text-[#0f1c47]"} />
            <span>{name}</span>
          </Link>
        ))}
      </nav>

      {/* Profile Link */}
      <div className="mt-auto">
        <Link
          href="/profile"
          className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
            pathname === "/profile"
              ? "bg-[#bf2c7e]/10 text-[#bf2c7e] font-semibold"
              : "text-[#0f1c47] hover:bg-[#bf2c7e]/5"
          }`}
        >
          <UserIcon size={22} className={pathname === "/profile" ? "text-[#bf2c7e]" : "text-[#0f1c47]"} />
          <span>Profile</span>
        </Link>
      </div>
    </aside>
  );
}

