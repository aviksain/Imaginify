"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CustomField, MediaUploader, TransformedImage } from ".";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { aspectRatioOptions, creditFee, transformationTypes } from "@/constants";
import { useEffect, useState, useTransition } from "react";
import { AspectRatioKey, debounce, deepMergeObjects } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { updateCredits } from "@/actions/user.actions";
import { getCldImageUrl } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { addImage, updateImage } from "@/actions/image.actions";
import { InsufficientCreditsModal } from "./InsufficientCreditsModal";

export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
});

export const defaultValues = {
  title: "",
  aspectRatio: "",
  color: "",
  prompt: "",
  publicId: "",
};

function TransformationForm({
  data = null,
  action,
  userId,
  type,
  creditBalance,
  config = null,
}: TransformationFormProps) {
  const transformationType = transformationTypes[type];
  const [image, setImage] = useState(data);
  const [newTransformation, setNewTransformation] =
    useState<Transformations | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformationConfig, setTransformationConfig] = useState(config);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const initialValues =
    data && action === "Update"
      ? {
          title: data?.title,
          aspectRatio: data?.aspectRatio,
          color: data?.color,
          prompt: data?.prompt,
          publicId: data?.publicId,
        }
      : defaultValues;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const onSelectFieldHandler = (
    value: string,
    onChangeField: (value: string) => void
  ) => {
    const imageSize = aspectRatioOptions[value as AspectRatioKey];

    setImage((prevState: any) => ({
      ...prevState,
      aspectRatio: imageSize.aspectRatio,
      width: imageSize.width,
      height: imageSize.height,
    }));

    setNewTransformation(transformationType.config);

    return onChangeField(value);
  };

  const onInputChangeHandler = (
    fieldName: string,
    value: string,
    type: string,
    onChangeField: (value: string) => void
  ) => {
    debounce(() => {
      setNewTransformation((prevState: any) => ({
        ...prevState,
        [type]: {
          ...prevState?.[type],
          [fieldName === "prompt" ? "prompt" : "to"]: value,
        },
      }));
    }, 1000)();
    return onChangeField(value);
  };

  const onTransformHandler = async () => {
    setIsTransforming(true);

    setTransformationConfig(
      deepMergeObjects(newTransformation, transformationConfig)
    );

    setNewTransformation(null);

    startTransition(async () => {
      await updateCredits(userId, creditBalance-creditFee);
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    setIsSubmitting(true);

    if (data || image) {
      const transformationUrl = getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image?.publicId,
        ...transformationConfig,
      });

      const imageData = {
        title: values.title,
        publicId: image?.publicId,
        transformationType: type,
        width: image?.width,
        height: image?.height,
        config: transformationConfig,
        secureURL: image?.secureURL,
        transformationUrl: transformationUrl,
        aspectRatio: values.aspectRatio,
        prompt: values.prompt,
        color: values.color,
      };

      if (action === "Add") {
        try {
          const newImage = await addImage({
            image: imageData,
            userId,
            path: "/",
          });

          if (newImage) {
            form.reset();
            setImage(data);
            router.push(`/transformation/${newImage.id}`);
          }
        } catch (error) {
          console.log(error);
        }
      }

      if (action === "Update") {
        try {
          const updatedImage = await updateImage({
            image: {
              ...imageData,
              id: data.id,
            },
            userId,
            path: `/transformation/${data.id}`,
          });

          if (updatedImage) {
            router.push(`/transformation/${updatedImage.id}`);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    setIsSubmitting(false)
  }

  useEffect(() => {
    if(image && (type === 'restore' || type === 'removeBackground')) {
      setNewTransformation(transformationType.config)
    }
  }, [image, transformationType.config, type]);
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {creditBalance < Math.abs(creditFee) && <InsufficientCreditsModal />}
        <CustomField
          control={form.control}
          render={({ field }) => <Input {...field} className="input-field" />}
          name="title"
          formLabel="Image Title"
          className="w-full"
        />

        {/* This component is only for generative fill  to choose the aspect ratio*/}
        {type === "fill" && (
          <CustomField
            control={form.control}
            name="aspectRatio"
            formLabel="Aspect Ratio"
            className="w-full"
            render={({ field }) => (
              <Select
                onValueChange={(value) =>
                  onSelectFieldHandler(value, field.onChange)
                }
                value={field.value}
              >
                <SelectTrigger className="w-full border-2 border-purple-200/20 shadow-sm shadow-purple-200/15 rounded-[16px] h-[50px] md:h-[54px] text-dark-600 font-semibold text-[16px] leading-[140%] disabled:opacity-100 placeholder:text-dark-400/50 px-4 py-3 focus:ring-offset-0 focus-visible:ring-transparent focus:ring-transparent focus-visible:ring-0 focus-visible:outline-none !important bg-[#444449]">
                  <SelectValue placeholder="Select Size" />
                </SelectTrigger>
                <SelectContent className="bg-[#444449]">
                  {Object.keys(aspectRatioOptions).map((key) => (
                    <SelectItem
                      key={key}
                      value={key}
                      className="py-3 text-white bg-[#444449] cursor-pointer hover:bg-[#4f4f56]"
                    >
                      {aspectRatioOptions[key as AspectRatioKey].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        )}

        {/* Field for Object Remove and Object Recolor */}
        {(type === "remove" || type === "recolor") && (
          <div className="flex flex-col gap-5 lg:flex-row lg:gap-10">
            <CustomField
              control={form.control}
              name="prompt"
              formLabel={
                type === "remove" ? "Object to remove" : "Object to recolor"
              }
              className="w-full"
              render={({ field }) => (
                <Input
                  value={field.value}
                  className="rounded-[16px] border-2 border-purple-200/20 shadow-sm shadow-purple-200/15 text-dark-600 disabled:opacity-100 font-semibold text-[16px] leading-[140%] h-[50px] md:h-[54px] focus-visible:ring-offset-0 px-4 py-3 focus-visible:ring-transparent !important"
                  onChange={(e) =>
                    onInputChangeHandler(
                      "prompt",
                      e.target.value,
                      type,
                      field.onChange
                    )
                  }
                />
              )}
            />

            {/* Field for Object Recolor to get the color name */}
            {type === "recolor" && (
              <CustomField
                control={form.control}
                name="color"
                formLabel="Replacement Color"
                className="w-full"
                render={({ field }) => (
                  <Input
                    value={field.value}
                    className="rounded-[16px] border-2 border-purple-200/20 shadow-sm shadow-purple-200/15 text-dark-600 disabled:opacity-100 font-semibold text-[16px] leading-[140%] h-[50px] md:h-[54px] focus-visible:ring-offset-0 px-4 py-3 focus-visible:ring-transparent !important"
                    onChange={(e) =>
                      onInputChangeHandler(
                        "color",
                        e.target.value,
                        "recolor",
                        field.onChange
                      )
                    }
                  />
                )}
              />
            )}
          </div>
        )}

        <div className="grid h-fit min-h-[200px] grid-cols-1 gap-5 py-4 md:grid-cols-2">
          <CustomField
            control={form.control}
            name="publicId"
            className="flex size-full flex-col"
            render={({ field }) => (
              <MediaUploader
                onValueChange={field.onChange}
                setImage={setImage}
                publicId={field.value}
                image={image}
                type={type}
              />
            )}
          />

          <TransformedImage
            image={image}
            type={type}
            title={form.getValues().title}
            isTransforming={isTransforming}
            setIsTransforming={setIsTransforming}
            transformationConfig={transformationConfig}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Button
            type="button"
            className="w-full p-5 rounded-md text-white bg-blue-700 hover:bg-indigo-700 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none transition-colors duration-700 capitalize"
            disabled={isTransforming || newTransformation === null}
            onClick={onTransformHandler}
          >
            {isTransforming ? (
              <>
                <LoaderCircle className="animate-spin" />
                Transforming...
              </>
            ) : (
              "Apply Transformation"
            )}
          </Button>
          <Button
            type="submit"
            className="w-full p-5 rounded-md bg-gradient-to-r from-blue-500 to-green-500 text-white transition-all duration-500 bg-[length:200%_100%] bg-left hover:bg-right focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none capitalize"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="animate-spin" />
                Submitting...
              </>
            ) : (
              "Save Image"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default TransformationForm;
