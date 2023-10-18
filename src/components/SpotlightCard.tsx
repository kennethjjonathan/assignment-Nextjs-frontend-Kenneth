import IArticle from "@/interface/IArticle";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import CONSTANTS from "@/constants/constants";
import Link from "next/link";

type SpotlightCardProps = {
  rank: number;
  post: IArticle;
};

function SpotlightCard({ rank, post }: SpotlightCardProps) {
  return (
    <div className="flex items-center gap-2 w-full p-1">
      <div className="h-full flex justify-center items-center text-slate-300 main-text text-3xl sm:text-4xl lg:text-5xl">
        {rank}
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col justify-evenly max-w-[190px] lg:max-w-[300px]">
          <div className="flex items-center gap-2">
            <p className="text-red-custom text-sm font-[500] leading-none sm:text-base lg:text-xl">
              {post.category}
            </p>
            {post.pricing === "Premium" ? (
              <div className="text-center px-1 bg-green-500 text-white text-sm sm:text-base lg:text-base">
                Premium
              </div>
            ) : null}
          </div>
          <Link href={`/${post.identifier}`}>
            <p className="text-base font-[500] leading-tight sm:text-base lg:text-2xl">
              {post.title}
            </p>
          </Link>

          <p className="main-text font-[300] leading-none text-sm text-text-secondary sm:text-base lg:text-xl">
            By {post.author}
          </p>
        </div>
        <div className="w-[50px] h-[50px] relative sm:w-14 sm:h-14 lg:h-20 lg:w-20">
          <Image
            src={post.thumbnail}
            alt="Thumbnail of the post"
            fill={true}
            className="rounded-sm"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
}

export default SpotlightCard;
