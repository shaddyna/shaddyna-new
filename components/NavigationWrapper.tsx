/*"use client";

import { usePathname } from "next/navigation";
import TopNav from "@/components/TopNav";
import BottomNav from "@/components/BottomNav";
import DesktopNav from "@/components/DesktopNav";

const pagesWithMobileNav = ["/", "/hub", "/shops", "/shelves", "/money"];
const pagesWithTopMobileNav = ["/", "/money"];
const pagesWithDesktopNav = ["/", "/hub", "/shops", "/shelves"];

export default function NavigationWrapper() {
  const pathname = usePathname();
  const shouldShowMobileNav = pagesWithMobileNav.includes(pathname);
  const shouldShowTopMobileNav = pagesWithTopMobileNav.includes(pathname);
  const shouldShowTopDesktopNav = pagesWithDesktopNav.includes(pathname);


  return (
    <>
      {shouldShowTopMobileNav && <TopNav />}
      {shouldShowMobileNav && <BottomNav />}
      {shouldShowTopDesktopNav && <DesktopNav />}
    </>
  );
}*/

"use client";

import { usePathname } from "next/navigation";
import TopNav from "@/components/TopNav";
import BottomNav from "@/components/BottomNav";
import DesktopNav from "@/components/DesktopNav";

const pagesWithMobileNav = ["/", "/hub", "/shops", "/shelves", "/money",];
const pagesWithTopMobileNav = ["/", "/money",];
const pagesWithDesktopNav = ["/", "/hub", "/shops", "/shelves", "/money", "/profile", "/events"];

export default function NavigationWrapper() {
  const pathname = usePathname();
  const shouldShowMobileNav = pagesWithMobileNav.includes(pathname);
  const shouldShowTopMobileNav = pagesWithTopMobileNav.includes(pathname);
  const shouldShowTopDesktopNav = pagesWithDesktopNav.includes(pathname);

  return (
    <div className="lg:flex lg:w-64">
      {shouldShowTopDesktopNav && <DesktopNav />}
      <div className="flex-1">
        {shouldShowTopMobileNav && <TopNav />}
        {shouldShowMobileNav && <BottomNav />}
      </div>
    </div>
  );
}
