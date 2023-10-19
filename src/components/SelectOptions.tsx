import React from "react";
import { Dispatch, SetStateAction } from "react";

type SelectOptionsProps = {
  label: string;
  additionalStyling?: string;
  labelAdditionalStyling?: string;
  optionArr: string[];
  inputValue: string;
  setInputValue: (input: string) => void;
};

const SelectOptions = ({
  label,
  additionalStyling,
  labelAdditionalStyling,
  optionArr,
  inputValue,
  setInputValue,
}: SelectOptionsProps) => {
  return (
    <>
      <label
        className={`text-lg font-[700] ${labelAdditionalStyling} group hover:text-blue-custom duration-300 cursor-pointer md:text-xl`}
      >
        {label}
        <select
          className={`px-5 py-2 mt-2 w-full border-2 rounded-md font-[400] text-base focus:outline-none border-transparent bg-white ${additionalStyling} group-hover:border-blue-custom cursor-pointer md:text-lg lg:text-xl group-hover:text-text-primary`}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        >
          {optionArr.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </label>
    </>
  );
};

export default SelectOptions;
