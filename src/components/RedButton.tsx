import IArticle from "@/interface/IArticle";
import React from "react";

type RedButtonProps = {
  children: React.ReactNode;
  type?: "submit";
  additionalStyling?: string;
  param?: any;
  callback?: any;
  isDisabled?: boolean;
};

function RedButton({
  children,
  type,
  additionalStyling,
  param,
  callback,
  isDisabled,
}: RedButtonProps) {
  if (isDisabled) {
    return (
      <button
        type={type}
        className={`bg-slate-700 text-slate-500 border-2 rounded-md border-slate-700 focus:outline-none cursor-not-allowed ${additionalStyling}`}
      >
        {children}
      </button>
    );
  }
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
