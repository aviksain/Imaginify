import { auth } from "@clerk/nextjs/server";
import {Image} from "lucide-react";
import { redirect } from "next/navigation";

import { Collection } from "@/components/Collections";
import Header from "@/components/Header";
import { getUserImages } from "@/actions/image.actions";
import { getUserById } from "@/actions/user.actions";
import { HandCoins } from "lucide-react";

const Profile = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  const images = await getUserImages({ page, userId: user._id });

  return (
    <>
      <Header title="Profile" />

      <section className="mt-5 flex flex-col gap-5 sm:flex-row md:mt-8 md:gap-10">
        <div className="w-full rounded-[16px] border-2 border-purple-200/20 bg-[#181A1B] p-5 shadow-lg shadow-purple-200/10 md:px-6 md:py-8">
          <p className="font-medium text-[14px] leading-[120%] md:text-[16px]">CREDITS AVAILABLE</p>
          <div className="mt-4 flex items-center gap-4">
          <HandCoins color="white"/>
            <h2 className="text-[30px] font-bold md:text-[36px] leading-[110%] text-white">{user.creditBalance}</h2>
          </div>
        </div>

        <div className="w-full rounded-[16px] border-2 border-purple-200/20 bg-[#181A1B] p-5 shadow-lg shadow-purple-200/10 md:px-6 md:py-8">
          <p className="font-medium text-[14px] leading-[120%] md:text-[16px]">IMAGE MANIPULATION DONE</p>
          <div className="mt-4 flex items-center gap-4">
          <Image color="white"/>
            <h2 className="text-[30px] font-bold md:text-[36px] leading-[110%] text-white">{images?.data.length}</h2>
          </div>
        </div>
      </section>

      <section className="mt-8 md:mt-14">
        <Collection
          images={images?.data}
          totalPages={images?.totalPages}
          page={page}
        />
      </section>
    </>
  );
};

export default Profile;