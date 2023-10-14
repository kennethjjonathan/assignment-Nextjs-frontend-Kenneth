import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import useSWR from "swr";
import CONSTANTS from "@/constants/constants";
import IArticle from "@/interface/IArticle";
import PostsRow from "@/components/PostsRow";

function Index() {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, isLoading, error } = useSWR(
    `${CONSTANTS.BASELOCALHOST}/posts`,
    fetcher
  );

  return (
    <>
      <Head>
        <title>Manage Posts</title>
      </Head>
      <div className="container mx-auto px-3 pt-5 pb-16">
        <Link href="/admin/manage-posts/create">Create a Post</Link>
        <h1 className="text-5xl font-[800]">Manage Posts</h1>
        <div className="mt-8 w-full">
          <table className="w-full border-collapse border-4 border-text-primary">
            <thead className="text-sm font-bold md:text-lg lg:text-xl">
              <tr>
                <th className="py-2 px-2 border-4 border-text-primary">
                  Post ID
                </th>
                <th className="py-2 px-2 border-4 border-text-primary">
                  Title
                </th>
                <th className="py-2 px-2 border-4 border-text-primary">
                  Pricing
                </th>
                <th className="py-2 px-2 border-4 border-text-primary">
                  Like(s)
                </th>
                <th className="py-2 px-2 border-4 border-text-primary">
                  Share(s)
                </th>
                <th
                  className="py-2 px-2 border-4 border-text-primary"
                  colSpan={3}
                ></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((post: IArticle) => (
                <PostsRow key={post.id} post={post} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Index;
