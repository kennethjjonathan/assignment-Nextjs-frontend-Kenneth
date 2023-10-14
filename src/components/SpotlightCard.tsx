import IArticle from "@/interface/IArticle";
import React from "react";
import Image from "next/image";

type SpotlightCardProps = {
  rank: number;
  post: IArticle;
};

function SpotlightCard({ rank, post }: SpotlightCardProps) {
  return (
    <div className="flex items-center gap-2 w-full p-1 relative">
      {post.isPremium ? (
        <div className="absolute px-1 bg-green-500 text-white text-sm -bottom-0 -right-0 z-50">
          Premium
        </div>
      ) : null}
      <div className="h-full flex justify-center items-center text-slate-300 main-text text-3xl">
        {rank}
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col justify-evenly max-w-[255px]">
          <p className="text-red-custom text-sm font-[500] leading-none">
            {post.category}
          </p>
          <p className="text-base font-[500] leading-tight">{post.title}</p>
          <p className="main-text font-[300] leading-none text-sm text-text-secondary">
            By {post.author}
          </p>
        </div>
        <div className="w-[50px] h-[50px] relative">
          <Image
            src={post.thumbnail}
            alt="Thumbnail of the post"
            fill={true}
            className="rounded-sm"
          />
        </div>
      </div>
    </div>
  );
}

export default SpotlightCard;
