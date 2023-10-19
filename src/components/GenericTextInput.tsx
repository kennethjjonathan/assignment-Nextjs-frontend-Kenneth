import { Dispatch, SetStateAction } from "react";

type GenericTextInputProps = {
  placeHolder?: string;
  type: string;
  label?: string;
  inputValue: string | number;
  setInputValue: Dispatch<SetStateAction<any>>;
  isValid?: boolean;
  errorMessage?: string;
};

function GenericTextInput({
  placeHolder,
  type,
  label,
  inputValue,
  setInputValue,
  isValid,
  errorMessage,
}: GenericTextInputProps) {
  return (
    <>
      <label
        className={`group duration-300 hover:text-blue-custom text-lg md:text-xl font-[700] ${
          isValid !== false ? "" : "text-red-custom"
        }`}
      >
        {label}
        <input
          type={type}
          placeholder={placeHolder}
          className={`md:text-lg lg:text-xl px-5 py-2 mt-2 w-full border-2 rounded-md font-[400] text-base focus:outline-none duration-300 group-hover:border-blue-custom group-hover:text-text-primary ${
            isValid !== false ? "border-transparent" : "border-red-custom"
          }`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
        />
      </label>
      {isValid === false ? (
        <p className="mt-2 text-lg text-red-custom">{errorMessage}</p>
      ) : null}
    </>
  );
}

export default GenericTextInput;
