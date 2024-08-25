"use client";
import { navLinks } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "./ui/button";
import { Logo } from ".";
import { LogIn } from "lucide-react";

function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden h-screen w-72 bg-white p-5 shadow-md shadow-purple-200/50 lg:flex">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="flex items-center gap-2 md:py-2">
          <Logo />
        </Link>
        <nav className="h-full flex-col justify-between md:flex md:gap-4">
          <SignedIn>
            <ul className="hidden w-full flex-col items-start gap-2 md:flex">
              {navLinks.slice(0, 6).map((link) => {
                const isActive = link.route === pathname;
                return (
                  <li
                    key={link.route}
                    className={`hidden w-full flex-col items-start gap-2 md:flex group rounded-xl px-4 text-black font-medium	 ${
                      isActive ? "bg-purple-400" : ""
                    }`}
                  >
                    <div className="flex justify-around">
                      <Image
                        src={link.icon}
                        alt="logo"
                        width={24}
                        height={24}
                        className={`${isActive && "brightness-200"}`}
                      />
                      <Link
                        href={link.route}
                        className="p-16-semibold flex size-full gap-4 p-4"
                      >
                        {link.label}
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
            <ul className="hidden w-full flex-col items-start gap-2 md:flex">
              {navLinks.slice(6).map((link) => {
                const isActive = link.route === pathname;
                return (
                  <li
                    key={link.route}
                    className={`hidden w-full flex-col items-start gap-2 md:flex group rounded-xl px-4 text-black font-medium	 ${
                      isActive ? "bg-purple-400" : ""
                    }`}
                  >
                    <div className="flex justify-around">
                      <Image
                        src={link.icon}
                        alt="logo"
                        width={24}
                        height={24}
                        className={`${isActive && "brightness-200"}`}
                      />
                      <Link
                        href={link.route}
                        className="p-16-semibold flex size-full gap-4 p-4"
                      >
                        {link.label}
                      </Link>
                    </div>
                  </li>
                );
              })}
              <li className="flex justify-center items-center cursor-pointer gap-2 p-4">
                <UserButton afterSignOutUrl="/" showName />
              </li>
            </ul>
          </SignedIn>

          <SignedOut>
            <Button asChild className="py-4 font-medium bg-transparent hover:bg-purple-400 text-black px-6 flex justify-center items-center gap-3 rounded-xl p-16-semibold focus-visible:ring-offset-0 focus-visible:ring-transparent !important bg-purple-gradient bg-cover">
              
              <Link href="/sign-in"><LogIn />Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
}
export default Sidebar;
