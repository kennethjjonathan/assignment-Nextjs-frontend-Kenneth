import IArticle from "@/interface/IArticle";
import React from "react";
import RedButton from "./RedButton";
import PrimaryButton from "./PrimaryButton";

type DeleteConfirmationModalType = {
  isOpen: boolean;
  setIsOpen: (input: boolean) => void;
  post: IArticle;
  deleteFunction: () => void;
};

function DeleteConfirmationModal({
  isOpen,
  setIsOpen,
  post,
  deleteFunction,
}: DeleteConfirmationModalType) {
  if (!isOpen) return null;

  return (
    <dialog
      open
      className="fixed h-full w-full top-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,0.2)]"
    >
      <div className="w-3/4 py-3 bg-smokewhite-custom rounded-xl">
        <div className="w-full border-b-2 border-dark-custom flex justify-between px-3 pb-3 text-lg sm:text-xl md:text-2xl">
          <p className="text-red-custom">Confirm Delete</p>
          <button
            className="text-blue-500 duration-300 hover:text-blue-800 active:text-blue-950"
            onClick={() => setIsOpen(false)}
          >
            X
          </button>
        </div>
        <div className="w-full px-3 py-3 h-auto">
          <p className="text-lg sm:text-xl md:text-2xl">
            Are you sure want to delete{" "}
            <span className="text-red-custom font-[500]">
              {post.title} (id: {post.id})
            </span>
            ?
          </p>
        </div>
        <div className="w-full border-t-2 border-dark-custom flex justify-end px-3 pt-3 gap-2 text-lg sm:text-xl md:text-2xl">
          <PrimaryButton
            callback={setIsOpen}
            param={false}
            additionalStyling="text-base py-1 px-1 sm:text-lg md:text-xl"
          >
            Cancel
          </PrimaryButton>
          <RedButton
            callback={deleteFunction}
            additionalStyling="text-base py-1 px-1 sm:text-lg md:text-xl"
          >
            Delete Post
          </RedButton>
        </div>
      </div>
    </dialog>
  );
}

export default DeleteConfirmationModal;
