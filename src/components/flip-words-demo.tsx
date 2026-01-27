import React from "react";
import { SimpleWordRotator } from "@/components/ui/simple-word-rotator";

export default function FlipWordsDemo() {
  const words = ["multicultural", "diverse", "connected", "thriving", "united", "vibrant"];

  return (
    <div className="h-[40rem] flex justify-center items-center px-4">
      <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400 text-center">
        Supporting
        <SimpleWordRotator words={words} /> <br />
        communities across NSW
      </div>
    </div>
  );
}
