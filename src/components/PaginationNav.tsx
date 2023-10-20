import React, { Dispatch, SetStateAction, useState } from "react";

type PaginationNavProps = {
  dataAmount: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

function PaginationNav({
  dataAmount,
  currentPage,
  setCurrentPage,
}: PaginationNavProps) {
  const [bigIndex, setBigIndex] = useState<number>(0);
  const pageNumbers: number[] = [];
  const dataPerPage: number = 5;
  const amountShowed: number = 3;
  
  for (let i = 1; i <= Math.ceil(dataAmount / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  const showedPages: number[] = pageNumbers.slice(
    bigIndex,
    bigIndex + amountShowed
  );
  return (
    <div className="flex items-center gap-0 rounded-md border-4 border-table-border w-fit h-[43px]">
      <button
        className={`${
          showedPages[0] === 1
            ? "cursor-not-allowed text-text-gray bg-disabled-lucky-card-bg"
            : "cursor-pointer text-primary-color bg-white"
        } p-[10px] text-[10px] text-center duration-300 border-2 border-table-border hover:bg-primary-color hover:text-white w-[90px]`}
        onClick={() => setBigIndex(0)}
      >
        First
      </button>
      {showedPages.map((value, index) =>
        value ? (
          <button
            key={index}
            className={`cursor-pointer p-[10px] text-[10px] text-center duration-300 border-2 border-table-border hover:bg-primary-color hover:text-white w-[50px] ${
              currentPage == value
                ? "bg-primary-color text-white"
                : "text-primary-color bg-white"
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
            ? "cursor-not-allowed text-text-gray bg-disabled-lucky-card-bg"
            : "cursor-pointer text-primary-color bg-white"
        } p-[10px] text-[10px] text-center duration-300 border-2 border-table-border hover:bg-primary-color hover:text-white w-[90px]`}
        onClick={() => {
          if (
            showedPages[showedPages.length - 1] ===
            pageNumbers[pageNumbers.length - 1]
          ) {
            return;
          }
          setBigIndex((prev) => prev + amountShowed);
        }}
      >
        Next
      </button>
    </div>
  );
}

export default PaginationNav;
