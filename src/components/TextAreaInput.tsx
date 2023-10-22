import { Dispatch, SetStateAction } from "react";

type TextAreaInputProps = {
  label: string;
  placeHolder?: string;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  inputValid?: boolean;
  errorMessage?: string;
  blurFunc?: () => void;
};

function TextAreaInput({
  label,
  placeHolder,
  inputValue,
  setInputValue,
  inputValid,
  errorMessage,
  blurFunc,
}: TextAreaInputProps) {
  return (
    <>
      <label
        className={`group duration-300 hover:text-blue-custom text-xl md:text-xl font-[700] w-full ${
          inputValid !== false ? "" : "text-red-custom"
        }`}
      >
        {label}
        <textarea
          className={`md:text-lg lg:text-xl px-5 py-2 mt-2 w-full border-2 rounded-md font-[400] text-base focus:outline-none group-hover:border-blue-custom group-hover:text-text-primary text-text-primary h-96 ${
            inputValid !== false ? "border-transparent" : "border-red-custom"
          }`}
          placeholder={placeHolder}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onBlur={blurFunc}
        />
      </label>
      {inputValid === false ? (
        <p className="mt-2 text-base text-red-custom">{errorMessage}</p>
      ) : null}
    </>
  );
}

export default TextAreaInput;
