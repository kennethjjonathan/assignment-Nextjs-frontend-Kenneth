type GenericTextInputProps = {
  placeHolder?: string;
  type: string;
  label: string;
  inputValue: string;
  setInputValue: (input: string) => void;
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
        className={`text-xl font-[700] ${
          isValid !== false ? "" : "text-red-custom"
        }`}
      >
        {label}
        <input
          type={type}
          placeholder={placeHolder}
          className={`px-5 py-2 mt-2 w-full border-2 rounded-md font-[400] text-lg focus:outline-none ${
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
