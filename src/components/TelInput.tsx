import React from "react";

type TelInputProps = {
  placeHolder?: string;
  label?: string;
  inputValue: string;
  setInputValue: (input: string) => void;
  isValid?: boolean;
  errorMessage?: string;
};

function TelInput({
  placeHolder,
  label,
  inputValue,
  setInputValue,
  isValid,
  errorMessage,
}: TelInputProps) {
  return (
    <>
      <label
        className={`text-xl font-[700] ${
          isValid !== false ? "" : "text-red-custom"
        }`}
      >
        {label}
        <input
          type="tel"
          pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}"
          placeholder={placeHolder}
          className={`px-5 py-2 mt-2 w-full border-2 rounded-md font-[400] text-lg focus:outline-none ${
            isValid !== false ? "border-transparent" : "border-red-custom"
          }`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
        />
      </label>
      <p className="text-text-secondary mt-2 text-sm sm:text-base">
        Format: 08XX-XXXX-XXXX
      </p>
      {isValid === false ? (
        <p className="mt-2 text-lg text-red-custom">{errorMessage}</p>
      ) : null}
    </>
  );
}

export default TelInput;
