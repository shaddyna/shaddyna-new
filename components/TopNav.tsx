// TopNav.tsx
"use client";

import Link from "next/link";
import { UserAccountIcon } from "hugeicons-react";
import { PlusCircleIcon } from "lucide-react";

export default function TopNav() {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md border-b lg:hidden">
      <h1 className="text-lg font-bold text-[#0f1c47]">Shaddyna</h1>
      <Link href="/profile">
        <UserAccountIcon size={24} className="text-[#0f1c47]hover:text-black transition" />
      </Link>
    </nav>
  );
}