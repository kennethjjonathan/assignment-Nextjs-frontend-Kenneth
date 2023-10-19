import IArticle from "@/interface/IArticle";
import React, { useState } from "react";
import { BsInfoLg } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";
import { BiTrash } from "react-icons/bi";
import ArticleDetailModal from "./ArticleDetailModal";
import { useRouter } from "next/router";
import CONSTANTS from "@/constants/constants";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import Link from "next/link";

type PostsRowProps = {
  post: IArticle;
  index: number;
};

function PostsRow({ post, index }: PostsRowProps) {
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

  // function handleEdit() {
  //   router.push({
  //     pathname: `/admin/manage-posts/edit/${post.id}`,
  //     query: {
  //       data: JSON.stringify(post),
  //     },
  //   });
  // }
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
      <tr
        className={`duration-300 hover:bg-green-300 border-[1px] border-text-primary text-center text-sm sm:text-base lg:text-lg ${
          index % 2 === 0 ? "bg-white" : "bg-slate-300"
        }`}
      >
        <td className="border-[1px] border-text-primary py-2 px-2">
          {post.id}
        </td>
        <td className="py-2 px-2 text-ellipsis line-clamp-1">{post.title}</td>
        <td
          className={`border-[1px] border-text-primary py-2 px-2 ${
            post.pricing === "Premium" ? "text-red-custom" : ""
          }`}
        >
          {post.pricing === "Premium" ? "Premium" : "Free"}
        </td>
        <td className="border-[1px] border-text-primary py-2 px-2">
          {post.liked}
        </td>
        <td className="border-[1px] border-text-primary py-2 px-2">
          {post.shared}
        </td>
        <td className="border-[1px] border-text-primary py-2 px-2 text-blue-500 duration-300 hover:text-blue-800 text-sm sm:text-base lg:text-lg">
          <button onClick={() => setIsDetailOpen(true)}>
            <BsInfoLg />
          </button>
        </td>
        <td className="border-[1px] border-text-primary py-2 px-2 text-blue-500 duration-300 hover:text-blue-800 text-sm sm:text-base lg:text-lg">
          <Link href={`/admin/manage-posts/edit/${post.id}`}>
            <TbEdit />
          </Link>
        </td>
        <td className="border-[1px] border-text-primary py-2 px-2 text-red-custom duration-300 hover:text-red-900 text-sm sm:text-base lg:text-lg">
          <button onClick={() => setIsDeleteOpen(true)}>
            <BiTrash />
          </button>
        </td>
      </tr>
    </>
  );
}

export default PostsRow;
