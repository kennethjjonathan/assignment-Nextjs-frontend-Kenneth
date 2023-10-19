import React from "react";
import IArticle from "@/interface/IArticle";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

type PostCardProps = {
  post: IArticle;
};

function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/${post.identifier}`}>
      <div className="flex items-center min-h-full justify-between w-full p-1 sm:flex-col-reverse sm:items-start sm:justify-end gap-2 border-[1px] border-transparent duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:border-slate-200">
        <div className="flex flex-col justify-start h-full min-h-full max-w-[70%] sm:max-w-[100%]">
          <div className="flex items-center gap-2">
            <p className="text-red-custom text-sm font-[500] leading-none sm:text-lg lg:text-xl">
              {post.category}
            </p>
            {post.pricing === "Premium" ? (
              <div className="text-center px-1 bg-green-500 text-white text-sm sm:text-lg lg:text-base">
                Premium
              </div>
            ) : null}
          </div>
          <p className="text-lg font-[800] leading-tight sm:text-2xl text-ellipsis line-clamp-2">
            {post.title}
          </p>
          <p className="leading-none sm:text-lg lg:text-xl text-sm text-ellipsis line-clamp-2">
            {post.opening}
          </p>
          <p className="main-text font-[300] leading-none text-sm text-text-secondary sm:text-lg lg:text-xl">
            By {post.author}
          </p>
        </div>
        <div className="w-[80px] h-[80px] relative sm:w-full sm:h-52 lg:h-72">
          <Image
            src={post.thumbnail}
            alt="Thumbnail of the post"
            fill={true}
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
