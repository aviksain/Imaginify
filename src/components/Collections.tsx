"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";

import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { transformationTypes } from "@/constants";
// import { Image as IImage } from '@prisma/client';
import { formUrlQuery } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { Search } from "@/components/Search";

export interface IImage {
  id: string,
  title: string;
  transformationType: string;
  publicId: string;
  secureURL: string; 
  width?: number;
  height?: number;
  config?: Record<string, any>;
  transformationUrl?: string; 
  aspectRatio?: string;
  color?: string;
  prompt?: string;
  author: {
    id: string;
    firstname: string;
    lastname: string;
  }
  createdAt?: Date;
  updatedAt?: Date;
}

export const Collection = ({
  hasSearch = false,
  images,
  totalPages = 1,
  page,
}: {
  images: IImage[];
  totalPages?: number;
  page: number;
  hasSearch?: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // PAGINATION HANDLER
  const onPageChange = (action: string) => {
    const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      searchParams: searchParams.toString(),
      key: "page",
      value: pageValue,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      <div className="md:flex justify-between items-center mb-6 flex flex-col gap-5 md:flex-row">
        <h2 className="text-[30px] font-bold md:text-[36px] leading-[110%] text-dark-600">Recent Edits</h2>
        {hasSearch && <Search />}
      </div>

      {images.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {images.map((image) => (
            <Card image={image} key={image.id} />
          ))}
        </ul>
      ) : (
        <div className="flex justify-center items-center h-60 w-full rounded-[10px] border border-dark-400/10 bg-white/20">
          <p className="font-semibold text-[20px] leading-[140%]">Empty List</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent className="flex w-full">
            <Button
              disabled={Number(page) <= 1}
              className="button w-32 bg-purple-gradient bg-cover text-white"
              onClick={() => onPageChange("prev")}
            >
              <PaginationPrevious className="hover:bg-transparent hover:text-white" />
            </Button>

            <p className="flex justify-center items-center p-16-medium w-fit flex-1">
              {page} / {totalPages}
            </p>

            <Button
              className="button w-32 bg-purple-gradient bg-cover text-white"
              onClick={() => onPageChange("next")}
              disabled={Number(page) >= totalPages}
            >
              <PaginationNext className="hover:bg-transparent hover:text-white" />
            </Button>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

const Card = ({ image }: { image: IImage }) => {
  return (
    <li>
      <Link href={`/transformation/${image.id}`} className="flex flex-1 cursor-pointer flex-col gap-5 rounded-[16px] border-2 border-purple-200/15 bg-[#26282A] p-4 shadow-xl transition-all hover:shadow-purple-200/20">
        <CldImage
          src={image.publicId}
          alt={image.title}
          width={image.width || 500}
          height={image.height || 500}
          {...image.config}
          loading="lazy"
          className="h-52 w-full rounded-[10px] object-cover border border-purple-200/15"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
        />
        <div className="flex justify-between items-center">
          <p className="p-20-semibold mr-3 line-clamp-1 text-dark-600">
            {image.title}
          </p>
          <Image
            src={`/assets/icons/${
              transformationTypes[
                image.transformationType as TransformationTypeKey
              ].icon
            }`}
            alt={image.title}
            width={24}
            height={24}
          />
        </div>
      </Link>
    </li>
  );
};