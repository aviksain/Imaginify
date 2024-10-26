"use client";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

export function TypewriterEffectDemo() {
  const words = [
    {
      text: "Edit",
    },
    {
      text: "your",
    },
    {
      text: "Photos",
    },
    {
      text: "like",
    },
    {
      text: "a",
    },
    {
      text: "pro",
    },
    {
      text: "with",
    },
    {
      text: "imaginify.",
      className: "text-[#E8CCB2]",
    },
  ];

  return (
    <div className="flex dancing-script text-white flex-col items-center justify-center h-[40rem] ">
      <TypewriterEffect words={words} />
    </div>
  );
}
