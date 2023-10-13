import IArticle from "@/interface/IArticle";
import React from "react";

type RedButtonProps = {
  children: React.ReactNode;
  type?: "submit";
  additionalStyling?: string;
  param?: any;
  callback?: any;
};

function RedButton({
  children,
  type,
  additionalStyling,
  param,
  callback,
}: RedButtonProps) {
  return (
    <button
      type={type}
      className={`bg-red-custom text-smokewhite-custom border-2 rounded-md border-red-custom hover:bg-transparent hover:text-red-custom active:bg-red-900 duration-300 focus:outline-none ${additionalStyling}`}
      onClick={() => {
        if (callback !== undefined) callback(param);
      }}
    >
      {children}
    </button>
  );
}

export default RedButton;
