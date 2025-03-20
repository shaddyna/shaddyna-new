/*"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, ArchiveIcon, GridIcon, ShoppingBagIcon } from "lucide-react";
import { Money03Icon } from "hugeicons-react";

const navItems = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Shelves", href: "/shelves", icon: ArchiveIcon },
  { name: "Hub", href: "/hub", icon: GridIcon },
  { name: "Shops", href: "/shops", icon: ShoppingBagIcon },
  { name: "My Money", href: "/money", icon: Money03Icon },
];

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white shadow-md border-r p-6">
      <h2 className="text-xl font-bold mb-6">Imani Imports</h2>
      <nav className="flex flex-col space-y-4">
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
    </aside>
  );
}
*/

// DesktopNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, ArchiveIcon, GridIcon, ShoppingBagIcon, UserIcon } from "lucide-react";
import { Money03Icon } from "hugeicons-react";

const navItems = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Shelves", href: "/shelves", icon: ArchiveIcon },
  { name: "Hub", href: "/hub", icon: GridIcon },
  { name: "Shops", href: "/shops", icon: ShoppingBagIcon },
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
}

