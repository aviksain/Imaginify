import { auth } from "@clerk/nextjs/server";
import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { plans } from "@/constants";
import { getUserById } from "@/actions/user.actions";
import Checkout from "@/components/Checkout";

const Credits = async () => {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);

  return (
    <>
      <Header
        title="Buy Credits"
        subtitle="Choose a credit package that suits your needs!"
      />

      <section>
        <ul className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-9 xl:grid-cols-3">
          {plans.map((plan) => (
            <li
              key={plan.name}
              className="w-full rounded-[16px] border-2 border-purple-200/20 bg-[#374151] text-white p-8 shadow-xl shadow-purple-200/20 lg:max-w-none"
            >
              <div className="flex justify-center items-center flex-col gap-3">
                <Image src={plan.icon} alt="check" width={50} height={50} />
                <p className="font-semibold text-[20px] leading-[140%] mt-2 text-blue-400">
                  {plan.name}
                </p>
                <p className="text-[36px] font-semibold sm:text-[44px] leading-[120%] sm:leading-[56px] text-dark-600">
                  ${plan.price}
                </p>
                <p className="font-normal text-[16px] leading-[140%]">
                  {plan.credits} Credits
                </p>
              </div>

              {/* Inclusions */}
              <ul className="flex flex-col gap-5 py-9">
                {plan.inclusions.map((inclusion) => (
                  <li
                    key={plan.name + inclusion.label}
                    className="flex items-center gap-4"
                  >
                    <Image
                      src={`/assets/icons/${
                        inclusion.isIncluded ? "check.svg" : "x.svg"
                      }`}
                      alt="check"
                      width={24}
                      height={24}
                    />
                    <p className="font-normal text-[16px] leading-[140%]">
                      {inclusion.label}
                    </p>
                  </li>
                ))}
              </ul>

              {plan.name === "Free" ? (
                <Button className="w-full rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br">
                  Free Consumable
                </Button>
              ) : (
                <SignedIn>
                  <Checkout
                    plan={plan.name}
                    amount={plan.price}
                    credits={plan.credits}
                    buyerId={user.id}
                  />
                </SignedIn>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Credits;
