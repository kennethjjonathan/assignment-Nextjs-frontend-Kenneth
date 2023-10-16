import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { QRCodeSVG } from "qrcode.react";
import CONSTANTS from "@/constants/constants";

type QrCodeModalProps = {
  isOpen: boolean;
  setIsOpen: (input: boolean) => void;
  value: string;
  duration: "perMonth" | "perYear";
};

function QrCodeModal({ isOpen, setIsOpen, value, duration }: QrCodeModalProps) {
  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal");
  }, []);

  return isOpen && ref.current
    ? createPortal(
        <div className="fixed h-full w-full top-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,0.2)] z-[1000]">
          <div className="w-3/4 py-3 bg-smokewhite-custom rounded-xl">
            <div className="w-full border-b-2 border-dark-custom flex justify-between px-3 pb-3 text-lg sm:text-xl md:text-2xl">
              <p>{duration === "perMonth" ? "Monthly" : "Yearly"} QR Code</p>
              <button
                className="text-blue-500 duration-300 hover:text-blue-800 active:text-blue-950"
                onClick={() => setIsOpen(false)}
              >
                X
              </button>
            </div>
            <div className="w-full px-3 py-3 flex flex-col justify-center items-center gap-5">
              <h3 className="text-xl sm:text-2xl md:text-3xl text-center w-full font-semibold main-text">
                Please scan to continue payment
              </h3>
              <QRCodeSVG value={`${value}`} />
            </div>
          </div>
        </div>,
        ref.current
      )
    : null;
}

export default QrCodeModal;
