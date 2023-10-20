import React from "react";

type BlackButtonProps = {
  children: React.ReactNode;
  type?: "submit";
  additionalStyling?: string;
  innerAdditionalStyling?: string;
  callback?: any;
  isDisabled?: boolean;
};

function BlackButton({
  children,
  type,
  additionalStyling,
  callback,
  innerAdditionalStyling,
  isDisabled,
}: BlackButtonProps) {
  return (
    <button
      type={type}
      className={`bg-text-primary text-smokewhite-custom p-1 group duration-300 hover:bg-blue-custom active:bg-blue-950 ${additionalStyling}`}
      onClick={() => {
        if (callback !== undefined) callback();
      }}
    >
      <div
        className={`border-2 border-smokewhite-custom group-hover:border-blue-custom duration-300 group-active:border-blue-950 flex items-center gap-2 ${innerAdditionalStyling}`}
      >
        {children}
      </div>
    </button>
  );
}

export default BlackButton;
