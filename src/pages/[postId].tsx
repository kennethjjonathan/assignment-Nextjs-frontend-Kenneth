import CONSTANTS from "@/constants/constants";
import IArticle from "@/interface/IArticle";
import IUser from "@/interface/IUser";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import dateOnlyFormatter from "@/library/helper/dateOnlyFormatter";
import * as cookie from "cookie";
import NotSubscribed from "@/components/NotSubscribed";
import LikeButton from "@/components/LikeButton";

type PostDetailProps = {
  post: IArticle;
  user: IUser | null;
};

const openingParagraphClass: string =
  "first-line:uppercase first-line:tracking-widest first-letter:text-5xl first-letter:font-bold first-letter:text-red-custom first-letter:mr-2 first-letter:float-left sm:first-letter:text-7xl";

function Index({ post, user }: PostDetailProps) {
  const [userState, setUserState] = useState<IUser | undefined>(undefined);

  function setUser() {
    if (user !== null) {
      setUserState(user);
    }
  }

  useEffect(() => {
    setUser();
  }, []);
  return (
    <>
      <section className="w-full bg-dark-custom text-smokewhite-custom flex flex-col justify-center items-center pt-20">
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
        <div>
          <LikeButton post={post} user={user} />
        </div>
        {post.content.map((content: string, index: number) => (
          <p
            key={index}
            className={`${
              index === 0 ? openingParagraphClass : ""
            } text-base text-justify mt-3 sm:text-lg`}
          >
            {content}
          </p>
        ))}
        {post.pricing === "Premium" &&
        !userState?.subscription?.isSubscribed ? (
          <NotSubscribed />
        ) : null}
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  let user: IUser | null;
  const cookieData = cookie.parse(req.headers.cookie!);
  console.log("Ini cookie data", cookieData);
  if (cookieData.USER === undefined) {
    user = null;
  } else {
    user = JSON.parse(cookieData.USER);
  }
  const response = await fetch(
    `${CONSTANTS.BASELOCALHOST}/posts/${params?.postId}`
  );
  if (!response.ok) throw new Error(response.statusText);
  const post = await response.json();

  if (
    (user === undefined || !user?.subscription?.isSubscribed) &&
    post.pricing === "Premium"
  ) {
    post.content = [
      post.content[0].slice(0, post.content[0].length / 2) + "...",
    ];
  }

  if (!post.id) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        post: post,
        user: user || null,
      },
    };
  }
};

export default Index;
