import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import useSWR from "swr";
import CONSTANTS from "@/constants/constants";
import IArticle from "@/interface/IArticle";
import PostsRow from "@/components/PostsRow";
import PrimaryButton from "@/components/PrimaryButton";
import { useRouter } from "next/router";

function Index() {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, isLoading, error } = useSWR(
    `${CONSTANTS.BASELOCALHOST}/posts`,
    fetcher
  );
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Manage Posts</title>
      </Head>
      <div className="container mx-auto px-3 pb-16 pt-32 sm:pt-40">
        <div className="flex flex-col justify-between items-baseline gap-2">
          <h1 className="text-2xl font-[800] sm:text-3xl md:text-5xl">
            Manage Posts
          </h1>
          <PrimaryButton
            callback={router.push}
            param={"/admin/manage-posts/create"}
            additionalStyling="px-2 py-1 text-lg"
          >
            Create a Post
          </PrimaryButton>
        </div>
        <div className="mt-8 w-full overflow-x-auto">
          <table className="w-full border-collapse border-[1px] border-text-primary">
            <thead className="text-sm font-bold md:text-lg lg:text-xl bg-slate-500">
              <tr>
                <th className="py-2 px-2 border-[1px] border-text-primary">
                  Post ID
                </th>
                <th className="py-2 px-2 border-[1px] border-text-primary">
                  Title
                </th>
                <th className="py-2 px-2 border-[1px] border-text-primary">
                  Pricing
                </th>
                <th className="py-2 px-2 border-[1px] border-text-primary">
                  Like(s)
                </th>
                <th className="py-2 px-2 border-[1px] border-text-primary">
                  Share(s)
                </th>
                <th
                  className="py-2 px-2 border-[1px] border-text-primary"
                  colSpan={3}
                ></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((post: IArticle, index: number) => (
                <PostsRow key={post.id} post={post} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Index;
