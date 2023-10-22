import { GetServerSideProps } from "next";
import CONSTANTS from "@/constants/constants";
import IArticle from "@/interface/IArticle";
import Discover from "@/components/Discover";
import Head from "next/head";
import PostCarousel from "@/components/PostCarousel";
import oneWeekBefore from "@/library/helper/oneWeekBefore";
import NotAbleToGetContent from "@/components/NotAbleToGetContent";

type HomeProps = {
  topFivePosts: IArticle[];
};

export default function Home({ topFivePosts }: HomeProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Terrace</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="keywords"
          content="Teracce, Legal, Indonesian Legal, Hukum, Majalah Hukum"
        />
        <meta
          name="description"
          content="Terrace is an award winning Indonesian legal journalism"
        />
        <meta name="author" content="Teracce" />
        <meta name="og:title" content="Teracce" />
        <meta
          name="og:description"
          content="Terrace is an award winning Indonesian legal journalism"
        />
        <meta name="og:type" content="website" />
      </Head>
      <main>
        <section className="w-full">
          <div className="container mx-auto pt-generic-top-mobile px-generic-horizontal-mobile">
            <h2 className="main-text font-[1000] text-3xl text-left w-full sm:text-4xl">
              Weekly Trending
            </h2>
            <div className="w-full mt-2">
              {topFivePosts.length > 0 ? (
                <PostCarousel postArray={topFivePosts} autoSlide={true} />
              ) : (
                <NotAbleToGetContent text="Seems like there is no weekly trending content for now." />
              )}
            </div>
          </div>
        </section>
        <section className="container mx-auto px-3 pt-5 flex flex-col items-center pb-generic-bottom-mobile">
          <h2 className="main-text font-[1000] text-3xl text-left w-full sm:text-4xl">
            Discover
          </h2>
          <Discover />
        </section>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  let topFivePosts: IArticle[] = [];
  try {
    const response = await fetch(
      `${
        CONSTANTS.BASELOCALHOST
      }/posts?_sort=liked&_order=desc&createdAt_gte=${oneWeekBefore()}&_limit=5`
    );
    if (!response.ok) throw new Error(response.statusText);
    topFivePosts = await response.json();
  } catch (error) {
    topFivePosts = [];
  }
  return {
    props: {
      topFivePosts,
    },
  };
};
