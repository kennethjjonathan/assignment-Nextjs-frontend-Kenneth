import IArticle from "@/interface/IArticle";
import React from "react";
import CONSTANTS from "@/constants/constants";
import { GetServerSideProps } from "next";
import errorNotify from "@/library/helper/errorNotify";
import PostForm from "@/components/PostForm";

type EditPost = {
  data: IArticle | null;
};

const EditPost = ({ data }: EditPost) => {
  return <PostForm data={data} isEdit={true} />;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let data: IArticle | null = null;
  try {
    const response = await fetch(
      `${CONSTANTS.BASELOCALHOST}/posts/${params?.editId}`
    );
    if (!response.ok) {
      errorNotify(response);
      throw new Error(response.statusText);
    }
    data = await response.json();
  } catch (error) {
    console.error(error);
  } finally {
    return {
      props: {
        data: data || null,
      },
    };
  }
};

export default EditPost;
