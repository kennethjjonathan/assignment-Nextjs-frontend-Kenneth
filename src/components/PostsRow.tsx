import IArticle from "@/interface/IArticle";
import React, { useState } from "react";
import { BsInfoLg } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";
import { BiTrash } from "react-icons/bi";
import ArticleDetailModal from "./ArticleDetailModal";
import { useRouter } from "next/router";
import CONSTANTS from "@/constants/constants";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

type PostsRowProps = {
  post: IArticle;
};

function PostsRow({ post }: PostsRowProps) {
  const router = useRouter();
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  async function handleDeletePost() {
    try {
      const response = await fetch(
        `${CONSTANTS.BASELOCALHOST}/posts/${post.id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error(response.statusText);
      router.reload();
    } catch (error) {
      console.error(error);
    }
  }

  function handleEdit() {
    router.push({
      pathname: `/admin/manage-posts/edit/${post.id}`,
      query: {
        data: JSON.stringify(post),
      },
    });
  }
  return (
    <>
      <ArticleDetailModal
        isOpen={isDetailOpen}
        setIsOpen={setIsDetailOpen}
        post={post}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        post={post}
        deleteFunction={handleDeletePost}
      />
      <tr className="border-2 border-text-primary text-center text-sm sm:text-base lg:text-lg">
        <td className="border-2 border-text-primary py-2 px-2">{post.id}</td>
        <td className="py-2 px-2 text-ellipsis line-clamp-1 cursor-pointer duration-300 hover:bg-blue-200 active:bg-blue-800">
          {post.title}
        </td>
        <td
          className={`border-2 border-text-primary py-2 px-2 ${
            post.pricing === "Premium" ? "text-red-custom" : ""
          }`}
        >
          {post.pricing === "Premium" ? "Premium" : "Free"}
        </td>
        <td className="border-2 border-text-primary py-2 px-2">{post.liked}</td>
        <td className="border-2 border-text-primary py-2 px-2">
          {post.shared}
        </td>
        <td className="border-2 border-text-primary py-2 px-2 text-blue-500 duration-300 hover:text-blue-800 text-sm sm:text-base lg:text-lg">
          <button onClick={() => setIsDetailOpen(true)}>
            <BsInfoLg />
          </button>
        </td>
        <td className="border-2 border-text-primary py-2 px-2 text-blue-500 duration-300 hover:text-blue-800 text-sm sm:text-base lg:text-lg">
          <button onClick={handleEdit}>
            <TbEdit />
          </button>
        </td>
        <td className="border-2 border-text-primary py-2 px-2 text-red-custom duration-300 hover:text-red-900 text-sm sm:text-base lg:text-lg">
          <button onClick={() => setIsDeleteOpen(true)}>
            <BiTrash />
          </button>
        </td>
      </tr>
    </>
  );
}

export default PostsRow;
