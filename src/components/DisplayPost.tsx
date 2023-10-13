import IArticle from "@/interface/IArticle";
import dateOnlyFormatter from "@/library/helper/dateOnlyFormatter";
import React from "react";
import Image from "next/image";

type DisplayPostProps = {
  post: IArticle;
};

function DisplayPost({ post }: DisplayPostProps) {
  const openingParagraphClass: string =
    "first-line:uppercase first-line:tracking-widest first-letter:text-6xl first-letter:font-bold first-letter:text-red-custom first-letter:mr-3 first-letter:float-left sm:first-letter:text-7xl";

  return (
    <>
      <section className="w-full bg-dark-custom text-smokewhite-custom flex flex-col justify-center items-center">
        <div className="container mx-auto px-3 py-5 flex flex-col gap-8 items-center justify-center lg:flex-row">
          <div className="flex flex-col justify-center items-center lg:gap-5">
            <p className="text-xl text-center text-red-custom sm:text-2xl lg:text-3xl">
              {post.category}
            </p>
            <p className="text-2xl text-center font-[500] mt-3 sm:text-3xl lg:text-5xl">
              {post.title.toUpperCase()}
            </p>
            <p className="text-base text-center font-[300] mt-3 italic sm:text-xl lg:text-2xl">
              {post.opening}
            </p>
            <p className="text-sm font-[800] mt-3 sm:text-base lg:text-xl">{`${
              post.author
            }, ${dateOnlyFormatter(post.createdAt.toString())}`}</p>
          </div>
          <div className="w-auto h-auto grid place-items-center">
            <Image
              src={post.thumbnail}
              alt="Thumbnail of the post"
              width={1000}
              height={1000}
              className="rounded-sm"
            />
          </div>
        </div>
      </section>
      <section className="container mx-auto px-3 py-5 flex flex-col">
        {post.content.map((content: string, index: number) => (
          <p
            key={index}
            className={`${
              index === 0 ? openingParagraphClass : ""
            } text-lg text-justify mt-3`}
          >
            {content}
          </p>
        ))}
      </section>
    </>
  );
}

export default DisplayPost;
