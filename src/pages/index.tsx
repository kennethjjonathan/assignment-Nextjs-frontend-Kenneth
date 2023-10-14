import Link from "next/link";
import { GetServerSideProps } from "next";
import CONSTANTS from "@/constants/constants";
import IArticle from "@/interface/IArticle";
import SpotlightCard from "@/components/SpotlightCard";

type HomeProps = {
  topFivePosts: IArticle[];
};

export default function Home({ topFivePosts }: HomeProps) {
  return (
    <main>
      <section className="h-screen w-full bg-red-500 container mx-auto px-3 py-5">
        <Link href="/login">Login User</Link>
      </section>
      <section className="container mx-auto px-3 py-5 flex flex-col items-center">
        <h2 className="main-text font-[1000] text-3xl text-left w-full">
          Spotlight
        </h2>
        <div className="mt-1 grid grid-cols-1 divide-y-2 divide-solid">
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
    </main>
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
