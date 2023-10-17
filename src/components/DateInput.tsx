import { Dispatch, SetStateAction, ChangeEvent } from "react";

type DateInputProps = {
  label?: string;
  id: string;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
};

function DateInput({ label, id, inputValue, setInputValue }: DateInputProps) {
  console.log(inputValue);
  return (
    <div className="flex flex-col">
      <label className="text-xl font-[700]" htmlFor={id}>
        {label}
      </label>
      <input
        type="date"
        id={id}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        className={`px-5 py-1 mt-2 w-full border-2 rounded-md font-[400] text-lg focus:outline-none border-transparent bg-white`}
      />
    </div>
  );
}

export default DateInput;
