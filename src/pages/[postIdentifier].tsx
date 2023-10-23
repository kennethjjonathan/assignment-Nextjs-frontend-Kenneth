import CONSTANTS from "@/constants/constants";
import IArticle from "@/interface/IArticle";
import IUser from "@/interface/IUser";
import { GetServerSideProps } from "next";
import React from "react";
import Image from "next/image";
import dateOnlyFormatter from "@/library/helper/dateOnlyFormatter";
import * as cookie from "cookie";
import NotSubscribed from "@/components/NotSubscribed";
import LikeButton from "@/components/LikeButton";
import historyUpdater from "@/library/helper/historyUpdater";
import ShareButton from "@/components/ShareButton";
import PostCard from "@/components/PostCard";
import Head from "next/head";
import errorNotify from "@/library/helper/errorNotify";
import NotAbleToGetContent from "@/components/NotAbleToGetContent";

type PostDetailProps = {
  post: IArticle | null;
  user: IUser | null;
  recommendedData: IArticle[] | null;
};

const openingParagraphClass: string =
  "first-line:uppercase first-line:tracking-widest first-letter:text-5xl first-letter:font-bold first-letter:text-red-custom first-letter:mr-2 first-letter:float-left sm:first-letter:text-7xl";

function Index({ post, user, recommendedData }: PostDetailProps) {
  if (post === null) {
    return (
      <>
        <section className="container mx-auto px-generic-horizontal-mobile pt-generic-top-mobile w-full pb-generic-bottom-mobile">
          <NotAbleToGetContent text="Not able to load content" />
        </section>
        {recommendedData && (
          <section className="container mx-auto px-generic-horizontal-mobile pb-generic-bottom-mobile">
            <div className="w-full flex items-center justify-between gap-1">
              <div className="h-px w-full bg-text-secondary" />
              <h3 className="w-full text-center font-light text-xl sm:text-2xl">
                Read More
              </h3>
              <div className="h-px w-full bg-text-secondary" />
            </div>
            <div className="w-full grid grid-cols-1 divide-y-2 sm:grid-cols-2 sm:divide-y-0 sm:gap-2 lg:grid-cols-3 sm:mt-5">
              {recommendedData?.map((article) => (
                <div
                  key={article.identifier}
                  className="h-auto w-full py-5 sm:py-0"
                >
                  <PostCard post={article} />
                </div>
              ))}
            </div>
          </section>
        )}
      </>
    );
  }
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>{`${post.title} - Teracce`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content={post.title} />
        <meta name="description" content={post.opening} />
        <meta name="author" content={post.author} />
        <meta name="og:title" content={`${post.title} - Teracce`} />
        <meta name="og:description" content={post.opening} />
        <meta name="og:type" content="website" />
      </Head>
      <section className="w-full bg-dark-custom text-smokewhite-custom flex flex-col justify-center items-center pt-generic-top-mobile lg:pb-5">
        <div className="container mx-auto px-generic-horizontal-mobile flex flex-col gap-8 items-center justify-between w-full lg:flex-row">
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
          <div className="w-full h-[310px] grid place-items-center relative sm:w-full sm:h-[350px] md:w-full lg:max-w-[50%]">
            <Image
              src={post.thumbnail}
              alt="Thumbnail of the post"
              fill={true}
              className="rounded-sm"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>
      <section className="container mx-auto px-generic-horizontal-mobile pt-5 pb-generic-bottom-mobile flex flex-col">
        <div className="flex items-center justify-start gap-3">
          <LikeButton post={post} user={user} />
          <ShareButton post={post} user={user} />
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
        {post.pricing === "Premium" && !user?.subscription?.isSubscribed ? (
          <NotSubscribed />
        ) : null}
      </section>
      {recommendedData && (
        <section className="container mx-auto px-generic-horizontal-mobile pb-generic-bottom-mobile">
          <div className="w-full flex items-center justify-between gap-1">
            <div className="h-px w-full bg-text-secondary" />
            <h3 className="w-full text-center font-light text-xl sm:text-2xl">
              Read More
            </h3>
            <div className="h-px w-full bg-text-secondary" />
          </div>
          <div className="w-full grid grid-cols-1 divide-y-2 sm:grid-cols-2 sm:divide-y-0 sm:gap-2 lg:grid-cols-3 sm:mt-5">
            {recommendedData?.map((article) => (
              <div
                key={article.identifier}
                className="h-auto w-full py-5 sm:py-0"
              >
                <PostCard post={article} />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  let favoriteCategory: string = "";
  let user: IUser | null = null;
  let recommendedData: IArticle[] | null = null;
  let post: IArticle | null = null;
  const cookieData = cookie.parse(req.headers.cookie!);

  if (cookieData.USER !== undefined) {
    user = JSON.parse(cookieData.USER);
  }

  if (params?.postIdentifier !== undefined) {
    try {
      const response = await fetch(
        `${CONSTANTS.BASELOCALHOST}/posts?identifier=${params?.postIdentifier}`
      );
      if (!response.ok) {
        errorNotify(response);
        throw new Error(response.statusText);
      }
      const data = await response.json();
      post = data[0];
    } catch (error) {
      console.error(error);
    }
  }

  if (
    post !== null &&
    (user === null || !user?.subscription?.isSubscribed) &&
    post.pricing === "Premium"
  ) {
    post.content = [
      post.content[0].slice(0, post.content[0].length / 2) + "...",
    ];
  }

  if (user !== null && post !== null) {
    try {
      const getUserResponse = await fetch(
        `${CONSTANTS.BASELOCALHOST}/users/${user.id}`
      );
      if (!getUserResponse.ok) {
        errorNotify(getUserResponse);
        throw new Error(getUserResponse.statusText);
      }
      const userData = await getUserResponse.json();
      const newUser = historyUpdater(userData, post);
      user = newUser;
      const userResponse = await fetch(
        `${CONSTANTS.BASELOCALHOST}/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );
      if (!userResponse.ok) {
        errorNotify(userResponse);
        throw new Error(userResponse.statusText);
      }
      let favoriteNumber: number = 0;
      for (let k in user.favorite) {
        if (user.favorite[k as keyof typeof user.favorite] > favoriteNumber) {
          favoriteCategory = k;
          favoriteNumber = user.favorite[k as keyof typeof user.favorite];
        }
      }
      const recommendedResponse = await fetch(
        `${CONSTANTS.BASELOCALHOST}/posts?_sort=createdAt&_order=desc${
          favoriteCategory === "" ? "" : `&category_like=${favoriteCategory}`
        }&id_ne=${post.id}&_limit=3`
      );
      if (!recommendedResponse.ok) {
        errorNotify(recommendedResponse);
        throw new Error(recommendedResponse.statusText);
      }
      recommendedData = await recommendedResponse.json();
    } catch (error) {
      console.error(error);
    }
  }

  if (user === null && post !== null) {
    try {
      const recommendedResponse = await fetch(
        `${CONSTANTS.BASELOCALHOST}/posts?_sort=createdAt&_order=desc&category_like=${post.category}&id_ne=${post.id}&_limit=3`
      );
      if (!recommendedResponse.ok) {
        errorNotify(recommendedResponse);
        throw new Error(recommendedResponse.statusText);
      }
      recommendedData = await recommendedResponse.json();
    } catch (error) {
      console.error(error);
    }
  }

  return {
    props: {
      post: post || null,
      user: user || null,
      recommendedData: recommendedData || null,
    },
  };
};

export default Index;
