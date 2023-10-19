import { GetServerSideProps } from "next";
import CONSTANTS from "@/constants/constants";
import IArticle from "@/interface/IArticle";
import SpotlightCard from "@/components/SpotlightCard";
import Discover from "@/components/Discover";
import Head from "next/head";
import ModalBase from "@/components/ModalBase";

type HomeProps = {
  topFivePosts: IArticle[];
};

export default function Home({ topFivePosts }: HomeProps) {
  return (
    <>
      <Head>
        <title>Terrace</title>
      </Head>
      <main>
        <section className="h-screen w-full bg-red-500 container mx-auto px-3 py-5 grid place-items-center">
          <h1>Stay</h1>
        </section>
        <section className="container mx-auto px-3 pt-5 pb-10 flex flex-col items-center">
          <h2 className="main-text font-[1000] text-3xl text-left w-full sm:text-4xl">
            Spotlight
          </h2>
          <div className="mt-1 w-full grid grid-cols-1 divide-y-2 divide-solid sm:grid-cols-2 sm:divide-y-0 sm:gap-2 lg:grid-cols-3">
            {topFivePosts.map((post, index) => (
              <div
                key={post.id}
                className="mt-3 flex justify-center items-center h-full"
              >
                <SpotlightCard rank={index + 1} post={post} />
              </div>
            ))}
          </div>
        </section>
        <section className="container mx-auto px-3 pt-5 pb-10 flex flex-col items-center">
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
  const response = await fetch(
    `${CONSTANTS.BASELOCALHOST}/posts?_sort=liked&_order=desc&_limit=5`
  );
  if (!response.ok) throw new Error(response.statusText);
  const topFivePosts = await response.json();
  if (topFivePosts.length === 0) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        topFivePosts,
      },
    };
  }
};
