import { CldImage, CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { dataUrl, getImageSize } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import { Upload } from "lucide-react";
import { useToast } from "./ui/use-toast";

type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<any>;
  publicId: string;
  image: any;
  type: string;
};

function MediaUploader({
  onValueChange,
  setImage,
  image,
  publicId,
  type,
}: MediaUploaderProps) {
  const { toast } = useToast();
  const onUploadSuccessHandler = (result: any) => {
    setImage((prevState: any) => ({
      ...prevState,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureURL: result?.info?.secure_url,
    }));

    onValueChange(result?.info?.public_id);

    toast({
      title: "Image uploaded successfully",
      description: "1 credit was deducted from your account",
      duration: 5000,
    });
  };

  const onUploadErrorHandler = () => {
    toast({
      variant: "destructive",
      title: "Something went wrong while uploading",
      description: "Please try again",
      duration: 5000,
    });
  };

  return (
    <>
      <CldUploadWidget
        uploadPreset="jsm_imaginify"
        options={{
          multiple: false,
          resourceType: "image",
        }}
        onSuccess={onUploadSuccessHandler}
        onError={onUploadErrorHandler}
      >
        {({ open }) => (
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-[30px] leading-[140%] text-dark-600">
              Original
            </h3>

            {publicId ? (
              <>
                <div className="cursor-pointer overflow-hidden rounded-[10px]">
                  <CldImage
                    width={getImageSize(type, image, "width")}
                    height={getImageSize(type, image, "height")}
                    src={publicId}
                    alt="image"
                    sizes={"(max-width: 767px) 100vw, 50vw"}
                    placeholder={dataUrl as PlaceholderValue}
                    className="h-fit min-h-72 w-full rounded-[10px] border border-dashed bg-purple-100/20 object-cover p-2"
                  />
                </div>
              </>
            ) : (
              <div
                className="flex items-center justify-center w-full"
                onClick={() => open()}
              >
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#374151] text-white hover:bg-[#3c4758]"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload />
                    <p className="mb-2 text-sm text-white dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-xs text-white dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                </label>
              </div>
            )}
          </div>
        )}
      </CldUploadWidget>
    </>
  );
}

export default MediaUploader;
