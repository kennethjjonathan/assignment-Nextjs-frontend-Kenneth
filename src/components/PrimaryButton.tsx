import React from "react";

type PrimaryButtonProps = {
  children: React.ReactNode;
  type?: "submit";
  additionalStyling?: string;
  param?: any;
  callback?: any;
  isDisabled?: boolean;
};

function PrimaryButton({
  children,
  type,
  additionalStyling,
  param,
  callback,
  isDisabled,
}: PrimaryButtonProps) {
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
