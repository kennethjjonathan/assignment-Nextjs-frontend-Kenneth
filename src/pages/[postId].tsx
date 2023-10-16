import DisplayPost from "@/components/DisplayPost";
import CONSTANTS from "@/constants/constants";
import IArticle from "@/interface/IArticle";
import { GetServerSideProps } from "next";
import React from "react";

type PostDetailProps = {
  post: IArticle;
};

function Index({ post }: PostDetailProps) {
  return <DisplayPost post={post} />;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await fetch(
    `${CONSTANTS.BASELOCALHOST}/posts/${params?.postId}`
  );
  if (!response.ok) throw new Error(response.statusText);
  const post = await response.json();
  console.log(post);
  if (!post.id) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        post,
      },
    };
  }
};

export default Index;
