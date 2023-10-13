import IArticle from "@/interface/IArticle";
import React, { useState } from "react";
import { BsInfoLg } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";
import ArticleDetailModal from "./ArticleDetailModal";
import { useRouter } from "next/router";

type PostsRowProps = {
  post: IArticle;
};

function PostsRow({ post }: PostsRowProps) {
  const router = useRouter();
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

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
      <tr className="cursor-pointer border-2 border-text-primary text-center duration-300 hover:bg-blue-200 active:bg-blue-800 text-sm sm:text-base lg:text-lg">
        <td className="border-2 border-text-primary py-2 px-2">{post.id}</td>
        <td className="py-2 px-2 text-ellipsis line-clamp-1">{post.title}</td>
        <td
          className={`border-2 border-text-primary py-2 px-2 ${
            post.isPremium ? "text-red-custom" : ""
          }`}
        >
          {post.isPremium ? "Premium" : "Free"}
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
        <td className="border-2 border-text-primary py-2 px-2 text-blue-500 duration-300 hover:text-blue-800 text-sm sm:text-base lg:text-lg">
          <button onClick={() => setIsDetailOpen(true)}>
            <BsInfoLg />
          </button>
        </td>
      </tr>
    </>
  );
}

export default PostsRow;
