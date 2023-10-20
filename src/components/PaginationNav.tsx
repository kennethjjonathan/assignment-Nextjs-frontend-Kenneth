import React, { Dispatch, SetStateAction, useState } from "react";

type PaginationNavProps = {
  dataAmount: number;
  currentPage: number;
  dataPerPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

function PaginationNav({
  dataAmount,
  currentPage,
  dataPerPage,
  setCurrentPage,
}: PaginationNavProps) {
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
    <div className="flex items-center gap-0 rounded-md border-2 border-gray-300 w-fit h-fit">
      <button
        className={`${
          showedPages[0] === 1
            ? "cursor-not-allowed bg-slate-700 text-text-secondary"
            : "cursor-pointer text-blue-custom bg-smokewhite-custom duration-300 hover:bg-blue-custom hover:text-smokewhite-custom"
        } p-3 text-xs text-center border-2 border-gray-300 w-24`}
        onClick={handleFirstClick}
      >
        First
      </button>
      {showedPages.map((value, index) =>
        value ? (
          <button
            key={index}
            className={`cursor-pointer p-3 text-xs text-center duration-300 border-2 border-gray-300 hover:text-smokewhite-custom hover:bg-blue-custom w-14 ${
              currentPage === value
                ? "bg-blue-custom text-smokewhite-custom"
                : "text-blue-custom bg-smokewhite-custom"
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
          pageNumbers[pageNumbers.length - 1]
            ? "cursor-not-allowed bg-slate-700 text-text-secondary"
            : "cursor-pointer text-blue-custom bg-smokewhite-custom duration-300 hover:bg-blue-custom hover:text-smokewhite-custom"
        }  p-3 text-xs text-center border-2 border-gray-300 w-24`}
        onClick={handleNextClick}
      >
        Next
      </button>
    </div>
  );
}

export default PaginationNav;
