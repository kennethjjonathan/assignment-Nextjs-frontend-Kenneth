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
      className={`border-2 border-gray-300 px-2 py-1 text-left ${
        index % 2 === 0 ? "bg-smokewhite-custom" : "bg-gray-300"
      }`}
    >
      <td className="text-center text-text-secondary text-base lg:text-lg">
        {checkIfToday(history.readTime.toString())
          ? hourFormatter(history.readTime.toString())
          : dateOnlyFormatter(history.readTime.toString())}{" "}
      </td>
      <td className="text-lg lg:text-xl">
        <Link href={`/${history.identifier}`} className="underline">
          {history.title}
        </Link>
      </td>
      <td className="grid place-items-center">
        <div className="relative w-12 h-12 rounded-full overflow-hidden lg:w-16 lg:h-16">
          <Image
            src={history.imagerSrc}
            alt="Thumgnail of the post"
            fill={true}
          />
        </div>
      </td>
    </tr>
  );
}

export default HistoryRow;
