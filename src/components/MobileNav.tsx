"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { AlignJustify } from "lucide-react";
import Image from "next/image";
import { Logo } from ".";

function MobileNav() {
  const pathname = usePathname();
  return (
    <header className="flex justify-between items-center fixed h-16 w-full border-b-4 bg-[#374151] p-5 lg:hidden">
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Logo/>
      </Link>
      <nav className="flex gap-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
          <Sheet>
            <SheetTrigger>
              <AlignJustify />
            </SheetTrigger>
            <SheetContent className="bg-[#374151] text-white focus:ring-0 focus-visible:ring-transparent focus:ring-offset-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-none !important sm:w-64">
              <Logo/>
              <ul className="mt-8 flex w-full flex-col items-start gap-5">
              {navLinks.map((link) => {
                const isActive = link.route === pathname

                return (
                  <li 
                    className={`${isActive && 'gradient-text'} p-18 flex whitespace-nowrap text-dark-700`}
                    key={link.route}
                    >
                    <Link className="p-16-semibold flex size-full gap-4 p-2 cursor-pointer" href={link.route}>
                      <Image 
                        src={link.icon}
                        alt="logo"
                        width={24}
                        height={24}
                      />
                      {link.label}
                    </Link>
                  </li>
                )
              })}
              </ul>
            </SheetContent>
          </Sheet>
        </SignedIn>

        <SignedOut>
          <Button
            asChild
            className="py-4 px-6 flex justify-center items-center gap-3 rounded-full p-16-semibold focus-visible:ring-offset-0 focus-visible:ring-transparent !important bg-purple-gradient bg-cover"
          >
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
}
export default MobileNav;
