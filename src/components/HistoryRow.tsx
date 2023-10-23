import React from "react";
import IHistory from "@/interface/IHistory";
import checkIfToday from "@/library/helper/checkIfToday";
import hourFormatter from "@/library/helper/hourFormatter";
import dateOnlyFormatter from "@/library/helper/dateOnlyFormatter";
import Link from "next/link";
import Image from "next/image";

type HistoryRowProps = {
  history: IHistory;
  index: number;
};

function HistoryRow({ history, index }: HistoryRowProps) {
  return (
    <tr
      className={`border-2 border-gray-300 text-left ${
        index % 2 === 0 ? "bg-smokewhite-custom" : "bg-gray-300"
      }`}
    >
      <td className="text-center text-text-secondary text-base lg:text-lg py-2 px-1">
        {checkIfToday(history.readTime.toString())
          ? hourFormatter(history.readTime.toString())
          : dateOnlyFormatter(history.readTime.toString())}{" "}
      </td>
      <td className="text-lg lg:text-xl">
        <Link href={`/${history.identifier}`} className="underline py-2 px-1">
          {history.title}
        </Link>
      </td>
    </tr>
  );
}

export default HistoryRow;
