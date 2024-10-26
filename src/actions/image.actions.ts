"use server";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v2 as cloudinary } from 'cloudinary';

// add new image to database
export async function addImage({ image, userId, path }: AddImageParams) {
  try {
    const author = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!author) {
      throw new Error("User not found");
    }

    const newImage = await prisma.image.create({
      data: {
        ...image,
        author: { connect: { id: author.id } },
      },
      include: {
        author: true,
      },
    });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newImage));
  } catch (error) {
    handleError(error);
  }
}

// update the existing image in the database
export async function updateImage({ image, userId, path }: UpdateImageParams) {
  try {
    const imageToUpdate = await prisma.image.findUnique({
      where: { id: image.id },
    });

    if (!imageToUpdate || imageToUpdate.authorId.toString() !== userId) {
      throw new Error("Unauthorized or image not found");
    }

    const updatedImage = await prisma.image.update({
      where: { id: imageToUpdate.id },
      data: {
        ...image,
      },
    });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedImage));
  } catch (error) {
    handleError(error);
  }
}

// delete the image in the database
export async function deleteImage(imageId: string) {
  try {
    await prisma.image.delete({
      where: { id: imageId },
    });
  } catch (error) {
    handleError(error);
  } finally {
    redirect("/");
  }
}

// get the image from database by id
export async function getImageById(imageId: string) {
  try {
    const image = await prisma.image.findUnique({
      where: {
        id: imageId,
      },
      include: {
        author: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            clerkId: true,
          },
        },
      },
    });

    if(!image) throw new Error("Image not found");

    return JSON.parse(JSON.stringify(image));
  } catch (error) {
    handleError(error)
  }
}

export async function getAllImages({
  limit = 9,
  page = 1,
  searchQuery = ""
}: {
  limit?: number;
  page: number;
  searchQuery: string;
}) {
  try {
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    let expression = 'folder=imaginify';

    if (searchQuery) {
      expression += ` AND ${searchQuery}`;
    }

    const { resources } = await cloudinary.search
      .expression(expression)
      .execute();

    const resourceIds = resources.map((resource: any) => resource.public_id);

    let whereCondition = {};

    if (searchQuery) {
      whereCondition = {
        publicId: {
          in: resourceIds,
        },
      };
    }

    const skipAmount = (page - 1) * limit;

    const images = await prisma.image.findMany({
      where: whereCondition,
      orderBy: {
        updatedAt: 'desc',
      },
      skip: skipAmount,
      take: limit,
      include: {
        author: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
          }
        }
      },
    });

    const totalImages = await prisma.image.count({
      where: whereCondition,
    });

    const savedImages = await prisma.image.count();

    return {
      data: images,
      totalPage: Math.ceil(totalImages / limit),
      savedImages,
    };
  } catch (error) {
    handleError(error);
  }
}









