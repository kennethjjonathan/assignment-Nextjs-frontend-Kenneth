import moneyFormatter from "@/library/helper/moneyFormatter";
import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { AiFillCheckCircle } from "react-icons/ai";
import QrCodeModal from "./QrCodeModal";
import CONSTANTS from "@/constants/constants";

type PriceCardProps = {
  bestValue?: boolean;
  title: string;
  duration: "perMonth" | "perYear";
  price: number;
  points?: string[];
};

function PriceCard({
  bestValue,
  title,
  duration,
  price,
  points,
}: PriceCardProps) {
  const [isOpenQr, setIsOpenQr] = useState<boolean>(false);

  return (
    <>
      <QrCodeModal
        isOpen={isOpenQr}
        setIsOpen={setIsOpenQr}
        value={`${CONSTANTS.BASEURL}/subscribe/${duration}`}
        duration={duration}
      />
      <div className="border-2 w-full h-full flex flex-col justify-center items-center p-2 relative xl:p-5">
        <p className="text-3xl font-semibold xl:text-4xl">{title}</p>
        <ul className="my-2 flex flex-col gap-1 list-none main-text xl:gap-2 xl:my-4">
          {points?.map((point, index) => (
            <li key={index} className="flex gap-1 w-full xl:gap-2">
              <p className="text-green-500 text-xl">
                <AiFillCheckCircle />
              </p>
              <p className="font-semibold text-text-secondary text-sm">
                {point}
              </p>
            </li>
          ))}
        </ul>
        <PrimaryButton
          additionalStyling="w-full py-1 px-2"
          callback={setIsOpenQr}
          param={true}
        >
          <p className="text-xl font-thin">{`IDR ${moneyFormatter(price)} / ${
            duration === "perMonth" ? "month" : "year"
          }`}</p>
        </PrimaryButton>
      </div>
    </>
  );
}

export default PriceCard;
