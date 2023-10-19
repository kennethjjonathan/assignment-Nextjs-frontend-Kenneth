import { Dispatch, SetStateAction, useRef } from "react";

type DateInputProps = {
  label?: string;
  id: string;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
};

function DateInput({ label, id, inputValue, setInputValue }: DateInputProps) {
  const ref = useRef<HTMLInputElement>(null);

  const handleDateClick = () => {
    ref.current?.showPicker();
  };

  return (
    <div
      className="flex flex-col cursor-pointer relative group"
      onClick={handleDateClick}
    >
      <label
        className="text-xl font-[700] cursor-pointer group-hover:text-blue-custom duration-300"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="bg-white w-full border-2 border-gray-300 p-2 group-hover:border-blue-custom duration-300">
        <p className="w-full text-center group-hover:text-blue-custom duration-300">
          {inputValue === "" ? "yyyy-mm-dd" : inputValue}
        </p>
      </div>
      <input
        type="date"
        id={id}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        ref={ref}
        className={`px-5 py-1 mt-2 w-full border-2 rounded-md font-[400] text-lg focus:outline-none border-transparent bg-white absolute invisible`}
      />
    </div>
  );
}

export default DateInput;
