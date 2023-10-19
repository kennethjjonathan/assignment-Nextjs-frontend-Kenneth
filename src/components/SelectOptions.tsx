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
        className={`text-xl font-[700] ${labelAdditionalStyling} group hover:text-blue-custom duration-300 cursor-pointer`}
      >
        {label}
        <select
          className={`px-5 py-2 mt-2 w-full border-2 rounded-md font-[400] text-lg focus:outline-none border-transparent bg-white ${additionalStyling} group-hover:border-blue-custom cursor-pointer`}
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
