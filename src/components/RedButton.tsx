import IArticle from "@/interface/IArticle";
import React from "react";

type RedButtonProps = {
  children: React.ReactNode;
  type?: "submit";
  additionalStyling?: string;
  param?: any;
  callback?: any;
  isDisabled?: boolean;
  isLoading?: boolean;
};

function RedButton({
  children,
  type,
  additionalStyling,
  param,
  callback,
  isDisabled,
  isLoading = false,
}: RedButtonProps) {
  if (isLoading) {
    return (
      <button
        className={`bg-slate-700 text-slate-500 border-2 rounded-md border-slate-700 focus:outline-none cursor-not-allowed flex items-center justify-center gap-5 ${additionalStyling}`}
        disabled
      >
        Loading{" "}
        <div className="border-4 border-smokewhite-custom border-b-transparent w-5 h-5 rounded-full animate-spin" />
      </button>
    );
  }
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
