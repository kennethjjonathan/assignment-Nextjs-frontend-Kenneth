import React from "react";

type TelInputProps = {
  placeHolder?: string;
  label?: string;
  inputValue: string;
  setInputValue: (input: string) => void;
  isValid?: boolean;
  errorMessage?: string;
  isRequired?: boolean;
  blurFunc?: () => void;
};

function TelInput({
  placeHolder,
  label,
  inputValue,
  setInputValue,
  isValid,
  errorMessage,
  isRequired = false,
  blurFunc,
}: TelInputProps) {
  if (isRequired) {
    return (
      <>
        <label
          className={`group duration-300 hover:text-blue-custom text-lg md:text-xl font-[700] w-full ${
            isValid !== false ? "" : "text-red-custom"
          }`}
        >
          {label}
          <input
            type="tel"
            pattern="[0-9]{12}"
            placeholder={placeHolder}
            className={`md:text-lg lg:text-xl px-5 py-2 mt-2 w-full border-2 rounded-md font-[400] text-base focus:outline-none duration-300 group-hover:border-blue-custom group-hover:text-text-primary ${
              isValid !== false ? "border-transparent" : "border-red-custom"
            }`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={blurFunc}
            required
          />
        </label>
        <p className="text-text-secondary mt-2 text-sm sm:text-base">
          Format: 08XXXXXXXXXX
        </p>
        {isValid === false ? (
          <p className="mt-2 text-base text-red-custom">{errorMessage}</p>
        ) : null}
      </>
    );
  }

  return (
    <>
      <label
        className={`group duration-300 hover:text-blue-custom text-lg md:text-xl font-[700] w-full ${
          isValid !== false ? "" : "text-red-custom"
        }`}
      >
        {label}
        <input
          type="tel"
          pattern="[0-9]{12}"
          placeholder={placeHolder}
          className={`md:text-lg lg:text-xl px-5 py-2 mt-2 w-full border-2 rounded-md font-[400] text-base focus:outline-none duration-300 group-hover:border-blue-custom group-hover:text-text-primary ${
            isValid !== false ? "border-transparent" : "border-red-custom"
          }`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={blurFunc}
        />
      </label>
      <p className="text-text-secondary mt-2 text-sm sm:text-base">
        Format: 08XXXXXXXXXX
      </p>
      {isValid === false ? (
        <p className="mt-2 text-base text-red-custom">{errorMessage}</p>
      ) : null}
    </>
  );
}

export default TelInput;
