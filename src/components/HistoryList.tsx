import IHistory from "@/interface/IHistory";
import React from "react";

type HistoryListProps = {
  history: IHistory[];
};

function HistoryList({ history }: HistoryListProps) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="font-[800] text-2xl">History</h2>
      <div className="mt-2">
        {history.map((item, index) => (
          <div
            key={item.identifier}
            className={`${index % 2 === 0 ? "" : "bg-red-500"}`}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryList;
