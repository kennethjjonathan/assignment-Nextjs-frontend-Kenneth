import IHistory from "@/interface/IHistory";
import hourFormatter from "@/library/helper/hourFormatter";
import React from "react";
import Link from "next/link";
import checkIfToday from "@/library/helper/checkIfToday";
import dateOnlyFormatter from "@/library/helper/dateOnlyFormatter";
import Image from "next/image";
import HistoryRow from "./HistoryRow";

type HistoryListProps = {
  history: IHistory[];
};

function HistoryList({ history }: HistoryListProps) {
  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="font-[800] text-2xl w-full text-center lg:text-3xl">
        History
      </h2>
      <div className="mt-2 w-full hidden sm:block">
        <table className="w-full">
          <thead>
            <tr className="text-left px-2 py-1 text-text-secondary main-text text-lg lg:text-xl">
              <th className="text-center">Time</th>
              <th>Title</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {history.map((history, index) => (
              <HistoryRow
                key={history.identifier}
                index={index}
                history={history}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-2 w-full sm:hidden">
        {history.map((item, index) => (
          <div
            key={item.identifier}
            className={`${
              index % 2 === 0 ? "bg-smokewhite-custom" : "bg-gray-300"
            } flex items-center p-2 justify-between gap-2 border-[1px] border-gray-300`}
          >
            <div className="text-sm text-text-secondary">
              {checkIfToday(item.readTime.toString())
                ? hourFormatter(item.readTime.toString())
                : dateOnlyFormatter(item.readTime.toString())}
            </div>
            <Link
              href={`/${item.identifier}`}
              className="underline w-full text-justify"
            >
              <p className="leading-none text-ellipsis line-clamp-2 w-full">
                {item.title}
              </p>
            </Link>
            <div className="relative rounded-full overflow-hidden w-12 h-12">
              <Image
                src={item.imagerSrc}
                alt="Thumbnail for the post"
                fill={true}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryList;
