import IArticle from "@/interface/IArticle";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import dateOnlyFormatter from "@/library/helper/dateOnlyFormatter";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

type PostCarouselProps = {
  postArray: IArticle[];
  autoSlide?: boolean;
  slideInterval?: number;
};

function PostCarousel({
  postArray,
  autoSlide = false,
  slideInterval = 4000,
}: PostCarouselProps) {
  const [current, setCurrent] = useState<number>(0);

  const goToPrev = () => {
    setCurrent((current) =>
      current === 0 ? postArray.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setCurrent((current) =>
      current === postArray.length - 1 ? 0 : current + 1
    );
  };

  useEffect(() => {
    if (!autoSlide) return;
    const slide = setTimeout(goToNext, slideInterval);
    return () => clearTimeout(slide);
  }, [current]);

  return (
    <div className="w-full flex overflow-hidden relative pb-9 sm:pb-10">
      {postArray.map((post, index) => (
        <div
          key={post.identifier}
          className="min-w-full min-h-full transition-transform linear duration-300"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          <div className="min-w-full min-h-full flex flex-col justify-start border-2">
            <div className="w-full h-60 relative sm:h-80 md:h-[25rem] lg:h-[35rem] xl:h-[40rem]">
              <Image
                src={post.thumbnail}
                alt="The thumbnail of the post"
                fill={true}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="bg-smokewhite-custom px-3 py-2 flex items-center justify-start gap-5 md:px-5">
              <p className="main-text text-3xl sm:text-4xl">{index + 1}</p>
              <div className="flex flex-col items-baseline justify-start">
                <div className="flex items-center gap-2">
                  <p className="text-red-custom text-xl font-[500] md:text-2xl">
                    {post.category}
                  </p>
                  {post.pricing === "Premium" && (
                    <p className="text-center p-1 bg-green-500 text-smokewhite-custom text-base md:text-lg">
                      Premium
                    </p>
                  )}
                </div>
                <Link
                  href={`/${post.identifier}`}
                  className="duration-300 hover:underline hover:text-blue-custom"
                >
                  <p className="text-2xl font-[600] text-ellipsis line-clamp-2 md:text-3xl">
                    {post.title}
                  </p>
                </Link>
                <p className="main-text font-[300] text-lg text-text-secondary text-ellipsis line-clamp-1 md:text-xl">
                  By {post.author},{" "}
                  {dateOnlyFormatter(post.createdAt.toString())}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="w-full absolute bottom-2 flex justify-center items-center gap-2">
        <button onClick={goToPrev}>
          <BsFillArrowLeftCircleFill className="text-text-primary text-xl duration-300 hover:text-blue-custom sm:text-2xl" />
        </button>
        {postArray.map((_, index) => (
          <button key={index} onClick={() => setCurrent(index)}>
            <div
              className={`transition-all w-3 h-3 bg-text-primary rounded-full duration-300 hover:bg-blue-custom ${
                current === index ? "p-1" : "bg-opacity-50"
              }`}
            />
          </button>
        ))}
        <button onClick={goToNext}>
          <BsFillArrowRightCircleFill className="text-text-primary text-xl duration-300 hover:text-blue-custom sm:text-2xl" />
        </button>
      </div>
    </div>
  );
}

export default PostCarousel;
