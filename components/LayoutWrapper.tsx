
// components/LayoutWrapper.tsx
{/*"use client"

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
}*/}




"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";
import { AiOutlineHome, AiOutlineShop, AiOutlineUser } from "react-icons/ai";
import { FaBoxes, FaUserCircle } from "react-icons/fa";
import React, { useState, useEffect } from "react";

// ... (keep your existing NavItem and DesktopNavigation components)
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
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);

  const mobileLinks = React.useMemo(() => [
    { href: "/", label: "Home", icon: AiOutlineHome },
    { href: "/shops", label: "Shops", icon: AiOutlineShop },
    { href: "/shelves", label: "Shelves", icon: FaBoxes },
    { href: "/hub", label: "Hub", icon: AiOutlineUser },
  ], []);

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
      
      <nav className={`fixed bottom-0 left-0 right-0 bg-gray-900 text-white flex justify-around py-3 md:hidden transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}>
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