
// components/LayoutWrapper.tsx
"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";
import { AiOutlineHome, AiOutlineShop, AiOutlineUser } from "react-icons/ai";
import { FaBoxes, FaUserCircle } from "react-icons/fa";
import React from "react";

const NavItem = React.memo(function NavItemComponent({
  href,
  label,
  iconComponent: Icon,
  iconSize,
  isActive,
}: {
  href: string;
  label: string;
  iconComponent: React.ComponentType<{ size: number }>;
  iconSize: number;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 p-2 rounded transition ${
        isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-800'
      }`}
    >
      <Icon size={iconSize} />
      <span className="hidden md:inline">{label}</span>
    </Link>
  );
});

const DesktopNavigation = () => {
  const currentPath = usePathname();
  const isActive = (path: string) => currentPath === path;

  return (
    <aside className="hidden md:flex flex-col w-64 bg-gray-900 text-white p-4 min-h-screen justify-between">
      <div>
        <h1 className="text-xl font-bold mb-6">MyApp</h1>
        <nav className="flex flex-col gap-4">
          <NavItem
            href="/"
            label="Home"
            iconComponent={AiOutlineHome}
            iconSize={22}
            isActive={isActive("/")}
          />
          <NavItem
            href="/shops"
            label="Shops"
            iconComponent={AiOutlineShop}
            iconSize={22}
            isActive={isActive("/shops")}
          />
          <NavItem
            href="/shelves"
            label="Shelves"
            iconComponent={FaBoxes}
            iconSize={22}
            isActive={isActive("/shelves")}
          />
          <NavItem
            href="/hub"
            label="Hub"
            iconComponent={AiOutlineUser}
            iconSize={22}
            isActive={isActive("/hub")}
          />
        </nav>
      </div>
      <div className="border-t border-gray-700 mt-6 pt-4">
        <NavItem
          href="/profile"
          label="Profile"
          iconComponent={FaUserCircle}
          iconSize={24}
          isActive={isActive("/profile")}
        />
      </div>
    </aside>
  );
};

const MobileNavigation = () => {
  const currentPath = usePathname();
  const isActive = (path: string) => currentPath === path;

  const mobileLinks = React.useMemo(() => [
    { href: "/", label: "Home", icon: AiOutlineHome },
    { href: "/shops", label: "Shops", icon: AiOutlineShop },
    { href: "/shelves", label: "Shelves", icon: FaBoxes },
    { href: "/hub", label: "Hub", icon: AiOutlineUser },
  ], []);

  return (
    <>
      <nav className="md:hidden p-4 bg-gray-900 text-white flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">MyApp</h1>
        <Link href="/profile">
          <FaUserCircle
            size={28}
            className={isActive("/profile") ? "text-blue-400" : "text-white"}
          />
        </Link>
      </nav>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white flex justify-around py-3 md:hidden">
        {mobileLinks.map((link) => (
          <NavItem
            key={link.href}
            href={link.href}
            label={link.label}
            iconComponent={link.icon}
            iconSize={22}
            isActive={isActive(link.href)}
          />
        ))}
      </nav>
    </>
  );
};

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <DesktopNavigation />
      <div className="flex flex-col flex-grow w-full">
        <MobileNavigation />
        <main className="flex-grow p-4">{children}</main>
      </div>
    </div>
  );
}
{/*"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIStore } from '@/store/ui-store';
import { DollarCircleIcon, FavouriteIcon, PlusSignCircleIcon, ShoppingBasket01Icon, Home02Icon } from 'hugeicons-react';

const BottomNavBar = () => {
  const isDrawerOpen = useUIStore((state) => state.isDrawerOpen);
  const pathname = usePathname() ?? "";

  return (
    <nav className={`fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-around py-2 z-40 transition-transform duration-300 ${
      isDrawerOpen ? 'translate-y-full' : 'translate-y-0'
    }`}>
      <NavItem href="/" icon={Home02Icon} label="Home" pathname={pathname} />
      <NavItem href="/shops" icon={ShoppingBasket01Icon} label="Shops" pathname={pathname} />
      <NavItem href="/sell" icon={PlusSignCircleIcon} label="Sell" pathname={pathname} />
      <NavItem href="/wishlist" icon={FavouriteIcon} label="Wishlist" pathname={pathname} />
      <NavItem href="/forum" icon={DollarCircleIcon} label="Forum" pathname={pathname} />
      {/* ... rest of the nav items ... *
    </nav>
  );
};
interface NavItemProps {
  href: string;
  icon: React.ComponentType<{ size: number; className: string }>;
  label: string;
  pathname: string;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, label, pathname }) => {
  const isActive = pathname === href;

  return (
    <Link href={href} className="flex flex-col items-center">
      <Icon size={24} className={`transition-colors duration-300 ${isActive ? "text-[#bf2c7e]" : "text-[#0f1c47]"}`} />
      <span className={`text-xs font-medium ${isActive ? "text-[#bf2c7e]" : "text-[#0f1c47]"}`}>{label}</span>
    </Link>
  );
};

export default BottomNavBar;*/}


{/*"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineHome, AiOutlineShop, AiOutlineUser } from "react-icons/ai";
import { FaBoxes, FaUserCircle } from "react-icons/fa";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const currentPath = usePathname();

  const isActive = (path: string) => currentPath === path;

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar Navigation (Visible on Desktop) *
      <aside className="hidden md:flex flex-col w-64 bg-gray-900 text-white p-4 min-h-screen justify-between">
        <div>
          <h1 className="text-xl font-bold mb-6">MyApp</h1>
          <nav className="flex flex-col gap-4">
            <NavItem href="/" label="Home" icon={<AiOutlineHome size={22} />} isActive={isActive("/")} />
            <NavItem href="/shops" label="Shops" icon={<AiOutlineShop size={22} />} isActive={isActive("/shops")} />
            <NavItem href="/shelves" label="Shelves" icon={<FaBoxes size={22} />} isActive={isActive("/shelves")} />
            <NavItem href="/hub" label="Hub" icon={<AiOutlineUser size={22} />} isActive={isActive("/hub")} />
          </nav>
        </div>

        {/* Profile Icon for Desktop *
        <div className="border-t border-gray-700 mt-6 pt-4">
          <NavItem href="/profile" label="Profile" icon={<FaUserCircle size={24} />} isActive={isActive("/profile")} />
        </div>
      </aside>

      {/* Main Content Area *
      <div className="flex flex-col flex-grow">
        {/* Top Navbar (Only for Mobile) *
        <nav className="md:hidden p-4 bg-gray-900 text-white flex justify-between items-center shadow-md">
          <h1 className="text-xl font-bold">MyApp</h1>
          <Link href="/profile">
            <FaUserCircle size={28} className={isActive("/profile") ? "text-blue-400" : "text-white"} />
          </Link>
        </nav>

        {/* Page Content - Dynamic *
        <main className="flex-grow p-4">{children}</main>

        {/* Bottom Navigation (Only for Mobile) *
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white flex justify-around py-3 md:hidden">
          <NavItem href="/" label="Home" icon={<AiOutlineHome size={22} />} isActive={isActive("/")} />
          <NavItem href="/shops" label="Shops" icon={<AiOutlineShop size={22} />} isActive={isActive("/shops")} />
          <NavItem href="/shelves" label="Shelves" icon={<FaBoxes size={22} />} isActive={isActive("/shelves")} />
          <NavItem href="/hub" label="Hub" icon={<AiOutlineUser size={22} />} isActive={isActive("/hub")} />
        </nav>
      </div>
    </div>
  );
}

// Reusable Navigation Item Component
function NavItem({ href, label, icon, isActive }: { href: string; label: string; icon: React.ReactNode; isActive: boolean }) {
  return (
    <Link href={href} className={`flex items-center gap-2 p-2 rounded transition ${
      isActive ? "bg-blue-500 text-white" : "hover:bg-gray-800"
    }`}>
      {icon}
      <span className="hidden md:inline">{label}</span> {/* Hide text on mobile *
    </Link>
  );
}*/}

