import React from "react";

type TextAreaInputProps = {
  label: string;
  placeHolder?: string;
  inputValue: string;
  setInputValue: (input: string) => void;
  inputValid?: boolean;
};

function TextAreaInput({
  label,
  placeHolder,
  inputValue,
  setInputValue,
  inputValid,
}: TextAreaInputProps) {
  return (
    <label
      className={`text-xl font-[700] ${
        inputValid !== false ? "" : "text-red-custom"
      }`}
    >
      {label}
      <textarea
        className={`px-5 py-2 mt-2 w-full border-2 rounded-md font-[400] text-lg focus:outline-none ${
          inputValid !== false ? "border-transparent" : "border-red-custom"
        }`}
        placeholder={placeHolder}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
    </label>
  );
}

export default TextAreaInput;
