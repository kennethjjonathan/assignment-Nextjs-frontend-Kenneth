import IArticle from "@/interface/IArticle";
import dateFormatter from "@/library/helper/dateFormmatter";
import React from "react";

type ArticleDetailModalProps = {
  isOpen: boolean;
  setIsOpen: (input: boolean) => void;
  post: IArticle;
};

function ArticleDetailModal({
  isOpen,
  setIsOpen,
  post,
}: ArticleDetailModalProps) {
  if (!isOpen) return null;
  return (
    <dialog
      open
      className="fixed h-full w-full top-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,0.2)]"
    >
      <div className="w-3/4 py-3 bg-smokewhite-custom rounded-xl">
        <div className="w-full border-b-2 border-dark-custom flex justify-between px-3 pb-3 text-lg sm:text-xl md:text-2xl">
          <p>Post's Detail</p>
          <button
            className="text-blue-500 duration-300 hover:text-blue-800 active:text-blue-950"
            onClick={() => setIsOpen(false)}
          >
            X
          </button>
        </div>
        <div className="w-full px-3 py-3 overflow-y-auto h-96">
          <div className="flex justify-end items-center gap-2 text-text-secondary text-sm sm:text-base md:text-lg">
            <p>Id: {post.id}</p>
            <p>Like(s): {post.liked}</p>
            <p>Share(s): {post.shared}</p>
            <p
              className={`${post.isPremium ? "text-red-custom" : ""}`}
            >{`Pricing: ${post.isPremium ? "Premium" : "Free"}`}</p>
          </div>
          <div className="mt-3 flex flex-col text-lg sm:text-xl md:text-2xl">
            <p>Title:</p>
            <p className="font-[700]">{post.title}</p>
          </div>
          <div className="mt-3 flex flex-col text-lg sm:text-xl md:text-2xl">
            <p>Opening:</p>
            <p className="font-[700]">{post.opening}</p>
          </div>
          <div className="mt-3 flex flex-col text-lg sm:text-xl md:text-2xl">
            <p>Category:</p>
            <p className="font-[700]">{post.category}</p>
          </div>
          <div className="mt-3 flex flex-col text-lg sm:text-xl md:text-2xl">
            <p>Author:</p>
            <p className="font-[700]">{post.author}</p>
          </div>
          <div className="mt-3 flex flex-col text-lg sm:text-xl md:text-2xl">
            <p>Thumbnail Link:</p>
            <p className="font-[700] whitespace-normal break-all">
              {post.thumbnail}
            </p>
          </div>
          <div className="mt-3 flex flex-col text-lg sm:text-xl md:text-2xl">
            <p>Created At:</p>
            <p className="font-[700] whitespace-normal break-all">
              {dateFormatter(post.createdAt.toString())}
            </p>
          </div>
          <div className="mt-3 flex flex-col text-lg sm:text-xl md:text-2xl">
            <p>Updated At:</p>
            <p className="font-[700] whitespace-normal break-all">
              {dateFormatter(post.updatedAt.toString())}
            </p>
          </div>
          <div className="mt-3 flex flex-col text-lg sm:text-xl md:text-2xl">
            <p className="font-[800] text-lg sm:text-xl md:text-2xl">
              Content:
            </p>
            {post.content.map((paragraph, index) => (
              <p
                key={index}
                className="whitespace-normal break-all mt-3 text-justify"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default ArticleDetailModal;
