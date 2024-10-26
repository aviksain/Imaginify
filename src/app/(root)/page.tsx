import { Collection } from "@/components/Collections";
import { navLinks } from "@/constants";
import { getAllImages } from "@/actions/image.actions";
import Image from "next/image";
import Link from "next/link";
import { TypewriterEffectDemo } from "@/components/typewriter";


const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || "";

  const { data = [], totalPage } =
    (await getAllImages({ page, searchQuery })) || {};

  
  const formattedImages = data.map((image) => ({
    id: image.id,
    title: image.title,
    transformationType: image.transformationType,
    publicId: image.publicId,
    secureURL: image.secureURL,
    width: image.width ?? 0,
    height: image.height ?? 0,
    config:
      typeof image.config === "object" && image.config !== null
        ? image.config
        : {},
    transformationUrl: image.transformationUrl || undefined,
    aspectRatio: image.aspectRatio || undefined,
    color: image.color || undefined,
    prompt: image.prompt || undefined,
    author: {
      id: image.author.id,
      firstname: image.author.firstname || "",
      lastname: image.author.lastname || "",
    },
    createdAt: image.createdAt || undefined,
    updatedAt: image.updatedAt || undefined,
  }));

  return (
    <>
      <section className="sm:flex justify-center items-center hidden h-72 flex-col gap-4 rounded-[20px] border bg-banner bg-cover bg-no-repeat p-10 shadow-inner bg-gradient-to-br from-green-600 to-blue-600">
          <TypewriterEffectDemo/>
        <ul className="flex justify-center items-center w-full gap-20">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex justify-center items-center flex-col gap-2"
            >
              <li className="flex justify-center items-center w-fit rounded-full bg-[#181A1B] p-4">
                <Image src={link.icon} alt="image" width={24} height={24} />
              </li>
              <p className="font-medium text-[14px] leading-[120%] text-center text-white">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>

      <section className="sm:mt-12">
        <Collection
          hasSearch={true}
          images={formattedImages}
          totalPages={totalPage}
          page={page}
        />
      </section>
    </>
  );
};

export default Home;
