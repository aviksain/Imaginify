import { Sidebar, MobileNav } from "@/components";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

type dataType = {
  children: React.ReactNode;
};

function HomeLayout({ children }: dataType) {
  return (
    <main className="flex min-h-screen w-full flex-col lg:flex-row bg-[#181A1B] text-white">
      <Sidebar />
      <MobileNav/>
      <div className="mt-16 flex-1 overflow-auto py-8 lg:mt-0 lg:max-h-screen lg:py-10">
        <div className="max-w-5xl mx-auto px-5 md:px-10 w-full text-dark-400 p-16-regular">
          {children}
        </div>
      </div>
      <Toaster />
    </main>
  );
}

export default HomeLayout;
