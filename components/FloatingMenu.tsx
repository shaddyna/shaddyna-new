"use client";

import { MoreVerticalIcon } from "hugeicons-react";
import { useState, useRef, useEffect } from "react";

export default function FloatingMenu({ items }: { items: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Toggle menu visibility
  const toggleMenu = () => setIsOpen(!isOpen);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={toggleMenu} className="focus:outline-none">
        <MoreVerticalIcon size={24} className="text-[#0f1c47] hover:text-black transition" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border rounded-lg py-2 z-50">
          {items.map((item, index) => (
            <button
              key={index}
              className="block w-full text-left px-4 py-2 text-[#0f1c47] hover:bg-gray-100"
              onClick={() => console.log(`${item} clicked`)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
