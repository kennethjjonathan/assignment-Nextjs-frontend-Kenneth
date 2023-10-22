import React, { Dispatch, SetStateAction, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

type DarkPaginationNavProps = {
  dataAmount: number;
  currentPage: number;
  dataPerPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

function DarkPaginationNav({
  dataAmount,
  currentPage,
  dataPerPage,
  setCurrentPage,
}: DarkPaginationNavProps) {
  const [bigIndex, setBigIndex] = useState<number>(0);
  const pageNumbers: number[] = [];
  const amountShowed: number = 3;
  for (let i = 1; i <= Math.ceil(dataAmount / dataPerPage); i++) {
    pageNumbers.push(i);
  }
  const showedPages: number[] = pageNumbers.slice(
    bigIndex,
    bigIndex + amountShowed
  );
  function handleFirstClick() {
    setBigIndex(0);
    setCurrentPage(1);
  }
  function handleNextClick() {
    if (
      showedPages[showedPages.length - 1] ===
      pageNumbers[pageNumbers.length - 1]
    ) {
      return;
    }
    setBigIndex((prev) => prev + amountShowed);
    setCurrentPage(bigIndex + amountShowed + 1);
  }
  return (
    <div className="flex items-center justify-center gap-2 w-fit h-fit">
      <button
        className={`${
          showedPages[0] === 1 && "hidden"
        } duration-300 hover:text-blue-custom text-xl text-center font-[600] main-text md:text-2xl`}
        onClick={handleFirstClick}
      >
        First
      </button>
      {showedPages.map((value, index) =>
        value ? (
          <button
            key={index}
            className={`main-text text-xl text-center duration-300 hover:text-blue-custom md:text-2xl ${
              currentPage === value ? "" : "opacity-50"
            }`}
            onClick={() => setCurrentPage(value)}
          >
            {value}
          </button>
        ) : null
      )}
      <button
        className={`${
          showedPages[showedPages.length - 1] ===
            pageNumbers[pageNumbers.length - 1] && "hidden"
        } duration-300 hover:text-blue-custom text-xl text-center font-[600] main-text md:text-2xl`}
        onClick={handleNextClick}
      >
        Next
      </button>
    </div>
  );
}

export default DarkPaginationNav;
