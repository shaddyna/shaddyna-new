"use client"
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-0 md:py-4">

        <div className="flex justify-between items-center">
          <Link href="/" className="hidden md:flex text-2xl font-bold">
            <span className="text-[#bf2c7e]">Shaddyna</span>

          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/shops" className="text-[#0f1c47] hover:text-[#bf2c7e] font-medium transition-colors">
              Shops
            </Link>
            <Link href="/hub" className="text-[#0f1c47] hover:text-[#bf2c7e] font-medium transition-colors">
              Hub
            </Link>
            <Link href="/shelves" className="text-[#0f1c47] hover:text-[#bf2c7e] font-medium transition-colors">
              Shelves
            </Link>
            <Link href="/events" className="text-[#0f1c47] hover:text-[#bf2c7e] font-medium transition-colors">
              Events
            </Link>
          </nav>

          {/* Mobile Menu Button 
          <button
            className="md:hidden text-[#0f1c47]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>*/}
        </div>

        {/* Mobile Menu 
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-3 pb-4">
            <Link href="/shops" className="block text-[#0f1c47] hover:text-[#bf2c7e] font-medium transition-colors">
              Shops
            </Link>
            <Link href="/hub" className="block text-[#0f1c47] hover:text-[#bf2c7e] font-medium transition-colors">
              Hub
            </Link>
            <Link href="/shelves" className="block text-[#0f1c47] hover:text-[#bf2c7e] font-medium transition-colors">
              Shelves
            </Link>
            <Link href="/events" className="block text-[#0f1c47] hover:text-[#bf2c7e] font-medium transition-colors">
              Events
            </Link>
          </nav>
        )}*/}
      </div>
    </header>
  );
}