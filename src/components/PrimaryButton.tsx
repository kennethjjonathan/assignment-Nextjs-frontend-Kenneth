import React from "react";

type PrimaryButtonProps = {
  children: React.ReactNode;
  type?: "submit";
  additionalStyling?: string;
  param?: any;
  callback?: any;
  isDisabled?: boolean;
  isLoading?: boolean;
};

function PrimaryButton({
  children,
  type,
  additionalStyling,
  param,
  callback,
  isDisabled,
  isLoading = false,
}: PrimaryButtonProps) {
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
        className={`bg-slate-700 text-slate-500 border-2 rounded-md border-slate-700 focus:outline-none cursor-not-allowed ${additionalStyling}`}
        disabled
      >
        {children}
      </button>
    );
  }
  return (
    <button
      type={type}
      className={`bg-blue-500 text-smokewhite-custom border-2 rounded-md border-blue-500 hover:bg-transparent hover:text-blue-500 active:bg-blue-800 duration-300 focus:outline-none ${additionalStyling}`}
      onClick={() => {
        if (callback !== undefined) callback(param);
      }}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
