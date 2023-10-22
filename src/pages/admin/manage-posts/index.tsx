import React, { useEffect, useState } from "react";
import Head from "next/head";
import CONSTANTS from "@/constants/constants";
import IArticle from "@/interface/IArticle";
import PostsRow from "@/components/PostsRow";
import PrimaryButton from "@/components/PrimaryButton";
import { useRouter } from "next/router";
import axios from "axios";
import PaginationNav from "@/components/PaginationNav";
import NotAbleToGetContent from "@/components/NotAbleToGetContent";

function Index() {
  const [data, setData] = useState<IArticle[]>([]);
  const dataPerPage: number = 5;
  const [dataAmount, setDataAmount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [updateToggle, setUpdateToggle] = useState<boolean>(false);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(
          `${CONSTANTS.BASELOCALHOST}/posts?_page=${currentPage}&_limit=${dataPerPage}`
        );
        setDataAmount(response.headers["x-total-count"]);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, [currentPage, updateToggle]);

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Manage Posts</title>
      </Head>
      <div className="container mx-auto px-3 pt-32 sm:pt-40 flex flex-col justify-between items-stretch pb-16">
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
        <div className="mt-8 w-full overflow-x-auto h-96">
          <table className="w-full border-collapse border-[1px] border-text-primary">
            <thead className="text-sm font-bold md:text-lg lg:text-xl bg-slate-500">
              <tr>
                <th className="py-2 px-2 border-[1px] border-text-primary">
                  No
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
                <PostsRow
                  key={post.id}
                  post={post}
                  index={index}
                  currentPage={currentPage}
                  dataPerPage={dataPerPage}
                  setUpdateToggle={setUpdateToggle}
                />
              ))}
            </tbody>
          </table>
          {data.length === 0 && (
            <div className="w-full text-lg h-10 flex items-center justify-center main-text text-red-custom">
              No Posts
            </div>
          )}
        </div>
        <div className="mx-auto">
          {dataAmount > dataPerPage && (
            <PaginationNav
              dataAmount={dataAmount}
              currentPage={currentPage}
              dataPerPage={dataPerPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Index;
