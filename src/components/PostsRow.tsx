import IArticle from "@/interface/IArticle";
import React, { Dispatch, SetStateAction, useState } from "react";
import { BsInfoLg } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";
import { BiTrash } from "react-icons/bi";
import ArticleDetailModal from "./ArticleDetailModal";
import { useRouter } from "next/router";
import CONSTANTS from "@/constants/constants";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import Link from "next/link";
import errorNotify from "@/library/helper/errorNotify";
import successNotify from "@/library/helper/successToast";

type PostsRowProps = {
  currentPage: number;
  dataPerPage: number;
  post: IArticle;
  index: number;
  setUpdateToggle: Dispatch<SetStateAction<boolean>>;
};

function PostsRow({
  currentPage,
  dataPerPage,
  post,
  index,
  setUpdateToggle,
}: PostsRowProps) {
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isDeletLoading, setIsDeleteLoading] = useState<boolean>(false);

  async function handleDeletePost() {
    setIsDeleteOpen(false);
    setIsDeleteLoading(true);
    try {
      const response = await fetch(
        `${CONSTANTS.BASELOCALHOST}/posts/${post.id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        errorNotify(response);
        throw new Error(response.statusText);
      }
      successNotify("Delete successful");
      setUpdateToggle((prev) => !prev);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteLoading(false);
    }
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
      <tr
        className={`duration-300 hover:bg-green-300 border-[1px] border-text-primary text-center text-sm sm:text-base lg:text-lg ${
          index % 2 === 0 ? "bg-white" : "bg-slate-300"
        }`}
      >
        <td className="border-[1px] border-text-primary py-2 px-2">
          {(currentPage - 1) * dataPerPage + index + 1}
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
            <TbEdit className="text-center w-full" />
          </Link>
        </td>
        <td className="border-[1px] border-text-primary py-2 px-2 text-red-custom duration-300 hover:text-red-900 text-sm sm:text-base lg:text-lg">
          {isDeletLoading ? (
            <div className="w-5 h-5 border-4 border-red-custom border-b-transparent rounded-full cursor-not-allowed mx-auto animate-spin" />
          ) : (
            <button onClick={() => setIsDeleteOpen(true)}>
              <BiTrash />
            </button>
          )}
        </td>
      </tr>
    </>
  );
}

export default PostsRow;
