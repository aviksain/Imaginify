import { Header, TransformationForm } from "@/components";
import React from "react";
import { transformationTypes } from "@/constants";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/actions/user.actions";
import { redirect } from "next/navigation";

async function AddTansformationType({ params: { type } }: SearchParamProps) {
  const transformation = transformationTypes[type];
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subtitle} />
      
      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user.id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  );
}

export default AddTansformationType;
