import Image from "next/image";
import React from "react";

type NotAbleToGetContentProps = {
  text: string;
};

function NotAbleToGetContent({ text }: NotAbleToGetContentProps) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full h-64 md:h-72">
        <Image
          src="/no-content.png"
          alt="An error illustration"
          fill={true}
          style={{ objectFit: "contain" }}
        />
      </div>
      <p className="text-center w-full text-lg md:text-xl">{text}</p>
    </div>
  );
}

export default NotAbleToGetContent;
