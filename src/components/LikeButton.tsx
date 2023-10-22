import IArticle from "@/interface/IArticle";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import React, { useEffect, useState, useRef, CSSProperties } from "react";
import IUser from "@/interface/IUser";
import CONSTANTS from "@/constants/constants";
import { useRouter } from "next/router";
import errorNotify from "@/library/helper/errorNotify";

type LikeButtonProps = {
  post: IArticle;
  user: IUser | null;
};

function LikeButton({ post, user }: LikeButtonProps) {
  const router = useRouter();
  const [liked, setLiked] = useState<boolean>(false);
  const [likeAmount, setLikeAmount] = useState<number>(post.liked);
  const [flyClone, setFlyClone] = useState<React.ReactNode>(null);
  const [keyframe, setKeyframe] = useState<string>("");
  const heartRef = useRef<HTMLDivElement>(null);

  function setInitialLiked() {
    if (user === null) {
      setLiked(false);
      return;
    } else {
      for (let i = 0; i < user.liked.length; i++) {
        if (user.liked[i] === post.id) {
          setLiked(true);
          return;
        }
      }
    }
  }
  async function handleFlyHeart() {
    if (liked) {
      return;
    }
    const { top, left } = heartRef.current?.getBoundingClientRect()!;
    setKeyframe(`@keyframes fly-heart {
          0% {
            top: ${top}px;
            left: ${left}px;
          }
          100% {
            top: -100px;
            left: ${left + 100}px;
            transform: rotate(-90deg);
          }
        }`);
    const cloneStyle: CSSProperties = {
      position: "fixed",
      top: `${top}px`,
      left: `${left}px`,
      zIndex: "60",
      animation: "fly-heart 1.5s ease-in-out forwards",
    };
    const clone = (
      <div style={cloneStyle} className="text-red-custom">
        <AiFillHeart className="text-2xl md:text-3xl" />
      </div>
    );
    setFlyClone(clone);
    setTimeout(() => {
      setFlyClone(null);
    }, 1500);
  }

  useEffect(() => {
    setInitialLiked();
  }, []);

  async function handleLike() {
    if (user === null) {
      router.push("/login");
      return;
    }
    handleFlyHeart();
    if (!liked) {
      setLikeAmount((prev) => prev + 1);
      const newLikeArr: number[] = [...user.liked, post.id];
      const newUser: IUser = { ...user, liked: newLikeArr };
      newUser.favorite[post.category] = user.favorite[post.category] + 1;
      try {
        const response = await fetch(
          `${CONSTANTS.BASELOCALHOST}/posts/${post.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              liked: likeAmount + 1,
            }),
          }
        );
        if (!response.ok) {
          errorNotify(response);
          throw new Error(response.statusText);
        }
        const userResponse = await fetch(
          `${CONSTANTS.BASELOCALHOST}/users/${user.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          }
        );
        if (!userResponse.ok) {
          errorNotify(userResponse);
          throw new Error(userResponse.statusText);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      const filtered: number[] = user.liked.filter((item) => item !== post.id);
      const newUser: IUser = { ...user, liked: filtered };
      newUser.favorite[post.category] = newUser.favorite[post.category] - 1;
      try {
        setLikeAmount((prev) => prev - 1);
        const response = await fetch(
          `${CONSTANTS.BASELOCALHOST}/posts/${post.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              liked: likeAmount - 1,
            }),
          }
        );
        if (!response.ok) {
          errorNotify(response);
          throw new Error(response.statusText);
        }
        const userResponse = await fetch(
          `${CONSTANTS.BASELOCALHOST}/users/${user.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          }
        );
        if (!userResponse.ok) {
          errorNotify(userResponse);
          throw new Error(userResponse.statusText);
        }
      } catch (error) {
        console.error(error);
      }
    }
    setLiked((prev) => !prev);
  }

  if (liked) {
    return (
      <>
        <style>{keyframe}</style>
        {flyClone}
        <button
          className="text-red-custom flex items-center gap-1 main-text text-lg md:text-xl lg:text-2xl duration-300 hover:text-blue-custom"
          onClick={handleLike}
        >
          <div ref={heartRef}>
            <AiFillHeart className="text-2xl md:text-3xl" />{" "}
          </div>
          {likeAmount}
        </button>
      </>
    );
  }

  return (
    <button
      className="flex items-center gap-1 main-text text-lg md:text-xl lg:text-2xl duration-300 hover:text-blue-custom"
      onClick={handleLike}
    >
      <div ref={heartRef}>
        <AiOutlineHeart className="text-2xl md:text-3xl" />
      </div>
      {likeAmount}
    </button>
  );
}

export default LikeButton;
