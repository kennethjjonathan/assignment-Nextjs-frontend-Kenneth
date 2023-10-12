import React from "react";

type PrimaryButtonProps = {
  children: React.ReactNode;
  type?: "submit";
  additionalStyling?: string;
  param?: any;
  callback?: any;
};

function PrimaryButton({
  children,
  type,
  additionalStyling,
  param,
  callback,
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      className={`bg-blue-500 text-primary border-2 rounded-md border-blue-500 hover:bg-transparent hover:text-blue-500 active:bg-blue-800 duration-300 focus:outline-none ${additionalStyling}`}
      onClick={() => {
        if (callback !== undefined) callback(param);
      }}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
