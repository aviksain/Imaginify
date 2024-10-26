"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { Search as SearchIcon } from "lucide-react";

export const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        const newUrl = formUrlQuery({
          searchParams: searchParams.toString(),
          key: "query",
          value: query,
        });

        router.push(newUrl, { scroll: false });
      } else {
        const newUrl = removeKeysFromQuery({
          searchParams: searchParams.toString(),
          keysToRemove: ["query"],
        });

        router.push(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [router, searchParams, query]);

  return (
    <>
      <div className="flex w-full rounded-[16px] border-2 border-purple-200/20 bg-transparent px-4 shadow-sm shadow-purple-200/15 md:max-w-96">
        <SearchIcon className="mt-3" height={24} width={24} />
        <Input
          className="border-0 bg-transparent text-dark-600 w-full placeholder:text-dark-400 h-[50px] font-medium text-[16px] leading-[140%] focus-visible:ring-offset-0 p-3 focus-visible:ring-transparent !important"
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </>
  );
};
