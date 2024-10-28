"use client"

import { dataUrl, debounce, download, getImageSize } from "@/lib/utils";
import { Download, LoaderCircle } from "lucide-react";
import { CldImage, getCldImageUrl } from "next-cloudinary";
import Image from "next/image";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import React from "react";

function TransformedImage({
  image,
  type,
  title,
  transformationConfig,
  isTransforming,
  setIsTransforming,
  hasDownload = false,
}: TransformedImageProps) {
  const downloadHandler = (e: React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
    e.preventDefault();
    download(getCldImageUrl({
      width: image?.width,
      height: image?.height,
      src: image?.publicId,
      ...transformationConfig
    }), title)
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-[30px] leading-[140%] text-dark-600">
            Transformed
          </h3>
          {hasDownload && (
            <button
              className="p-14-medium mt-2 flex items-center gap-2 px-2"
              onClick={downloadHandler}
            >
              <Download />
            </button>
          )}
        </div>

        {image?.publicId && transformationConfig ? (
          <div className="relative">
            <CldImage
              width={getImageSize(type, image, "width")}
              height={getImageSize(type, image, "height")}
              src={image?.publicId}
              alt={image.title}
              sizes={"(max-width: 767px) 100vw, 50vw"}
              placeholder={dataUrl as PlaceholderValue}
              className="h-fit min-h-72 w-full rounded-[10px] border border-dashed bg-purple-100/20 object-cover p-2"
              onLoad={() => {
                setIsTransforming && setIsTransforming(false);
              }}
              onError={() => {
                debounce(() => {
                  setIsTransforming && setIsTransforming(false);
                }, 8000)();
              }}
              {...transformationConfig}
            />

            {isTransforming && (
              <div className="transforming-loader">
                <LoaderCircle className="animate-spin" />
                <p className="text-white/80">Please wait...</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center font-semibold text-[20px] leading-[140%] h-full min-h-72 flex-col gap-5 rounded-[16px] border border-dashed bg-[#374151] shadow-inner">
            Transformed Image
          </div>
        )}
      </div>
    </>
  );
}
export default TransformedImage;
