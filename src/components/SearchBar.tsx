import { Dispatch, SetStateAction, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";

type SearchBarProps = {
  placeHolder?: string;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<any>>;
};

function SearchBar({ placeHolder, inputValue, setInputValue }: SearchBarProps) {
  const ref = useRef<HTMLInputElement>(null);
  function handleClick() {
    ref.current?.focus();
  }
  return (
    <div
      className="flex items-center justify-between gap-1 border-2 border-gray-300 bg-white px-3 py-1 w-full rounded-md group hover:border-blue-custom duration-300"
      onClick={handleClick}
    >
      <label>
        <AiOutlineSearch className="text-xl text-text-secondary group-hover:text-blue-custom duration-300" />
      </label>
      <input
        type="text"
        value={inputValue}
        placeholder={placeHolder}
        onChange={(e) => setInputValue(e.target.value)}
        ref={ref}
        className="md:text-lg lg:text-xl py-1 px-1 w-full font-[400] text-base focus:outline-none duration-300 group-hover:text-text-primary"
      />
    </div>
  );
}

export default SearchBar;
