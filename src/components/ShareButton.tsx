import React, { useEffect, useState } from "react";
import IArticle from "@/interface/IArticle";
import IUser from "@/interface/IUser";
import { BsShare } from "react-icons/bs";
import { ImCopy } from "react-icons/im";
import ModalBase from "./ModalBase";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import CONSTANTS from "@/constants/constants";
import { useCookies } from "react-cookie";

type ShareButtonProps = {
  post: IArticle;
  user: IUser | null;
};

function ShareButton({ post, user }: ShareButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [_, setCookie] = useCookies([CONSTANTS.COOKIENAME]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [shareAmount, setShareAmount] = useState<number>(post.shared);
  const [shared, setShared] = useState<boolean>(false);

  function setInitialShared() {
    if (user === null) {
      setShared(false);
      return;
    } else {
      for (let i = 0; i < user.shared.length; i++) {
        if (user.shared[i] === post.id) {
          setShared(true);
          return;
        }
      }
    }
  }

  useEffect(() => {
    setInitialShared();
  }, []);

  async function handleSharePost() {
    if (shared) {
      return;
    }

    setShareAmount((prev) => prev + 1);
    const newShareArr: number[] = user!.shared.slice();
    newShareArr.push(post.id);
    const newUser: IUser = { ...user!, shared: newShareArr };
    setCookie(CONSTANTS.COOKIENAME, JSON.stringify(newUser), {
      path: "/",
      maxAge: 3600,
      sameSite: true,
    });

    try {
      const response = await fetch(
        `${CONSTANTS.BASELOCALHOST}/posts/${post.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            shared: shareAmount + 1,
          }),
        }
      );
      if (!response.ok) throw new Error(response.statusText);
      const userResponse = await fetch(
        `${CONSTANTS.BASELOCALHOST}/users/${user!.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );
      if (!userResponse.ok) throw new Error(userResponse.statusText);
    } catch (error) {
      console.error(error);
    }
  }

  function handleClickShare() {
    if (user === null) {
      router.push("/login");
      return;
    }
    setOpenModal(true);
  }

  async function handleCopyToClipBoard() {
    try {
      await navigator.clipboard.writeText(`${CONSTANTS.BASEURL}/${pathname}`);
      await handleSharePost();
      setOpenModal(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <ModalBase isOpen={openModal}>
        <div className="w-3/4 py-3 bg-smokewhite-custom rounded-xl">
          <div className="w-full border-b-2 border-dark-custom flex justify-between px-3 pb-3 text-lg sm:text-xl md:text-2xl">
            <p>Share Post</p>
            <button
              className="text-blue-500 duration-300 hover:text-blue-800 active:text-blue-950"
              onClick={() => setOpenModal(false)}
            >
              X
            </button>
          </div>
          <div className="w-full px-3 py-3 md:text-xl lg:text-2xl flex items-center justify-center gap-2">
            <div className="flex flex-col items-center justify-center gap-1 duration-300 hover:text-blue-custom group">
              <button
                className="text-3xl md:text-4xl bg-gray-300 p-3 rounded-full flex flex-col items-center justify-center group-hover:bg-gray-100"
                onClick={handleCopyToClipBoard}
              >
                <ImCopy />
              </button>
              <p className="main-text text-sm md:text-base">Copy Link</p>
            </div>
          </div>
        </div>
      </ModalBase>
      <button
        className="flex items-center gap-2 main-text text-lg md:text-xl lg:text-2xl duration-300 hover:text-blue-custom"
        onClick={handleClickShare}
      >
        <BsShare className="text-xl md:text-2xl" />
        {shareAmount}
      </button>
    </>
  );
}

export default ShareButton;
