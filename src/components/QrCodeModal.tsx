import React, {
  useRef,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { createPortal } from "react-dom";
import { QRCodeSVG } from "qrcode.react";
import RedButton from "./RedButton";
import PrimaryButton from "./PrimaryButton";
import Image from "next/image";
import CONSTANTS from "@/constants/constants";
import Link from "next/link";
import { useCookies } from "react-cookie";
import errorNotify from "@/library/helper/errorNotify";

type QrCodeModalProps = {
  isOpen: boolean;
  setIsOpen: (input: boolean) => void;
  duration: "Monthly" | "Yearly";
  isConfirmed: boolean;
  setIsConfirmed: Dispatch<SetStateAction<boolean>>;
};

function QrCodeModal({
  isOpen,
  setIsOpen,
  duration,
  isConfirmed,
  setIsConfirmed,
}: QrCodeModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cookie, _] = useCookies([CONSTANTS.COOKIENAME]);
  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal");
  }, []);

  async function handleConfirmBuy() {
    setIsLoading(true);
    try {
      const response = await fetch(`${CONSTANTS.BASELOCALHOST}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: cookie.USER.id,
          status: "process",
          paymentCompletion: false,
          price: duration === "Monthly" ? 50000 : 600000,
          package: duration,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      });
      if (!response.ok) {
        errorNotify(response);
        throw new Error(response.statusText);
      }
      setIsConfirmed(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isOpen && ref.current && !isConfirmed) {
    return createPortal(
      <div className="fixed h-full w-full top-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,0.2)] z-[1000]">
        <div className="w-3/4 py-3 bg-smokewhite-custom rounded-xl">
          <div className="w-full border-b-2 border-dark-custom flex justify-between px-3 pb-3 text-lg sm:text-xl md:text-2xl">
            <p>{duration}&apos;s Payment Confirmation</p>
            {!isLoading && (
              <button
                className="text-blue-500 duration-300 hover:text-blue-800 active:text-blue-950"
                onClick={() => setIsOpen(false)}
              >
                X
              </button>
            )}
          </div>
          <div className="w-full px-3 py-3 flex flex-col justify-center items-center gap-5">
            <h3 className="text-xl sm:text-2xl md:text-3xl text-left w-full font-light">
              Are you sure you want to buy the{" "}
              <span className="text-red-custom">{duration}</span> plan?
            </h3>
            <div className="relative w-24 h-24 md:w-28 md:h-28">
              <Image
                src="/transistor-man-sorts-his-socks.png"
                alt="A man sort his socks"
                fill={true}
              />
            </div>
          </div>
          <div className="w-full border-t-2 border-dark-custom flex justify-end px-3 pt-3 gap-2 text-lg sm:text-xl md:text-2xl">
            <RedButton
              callback={setIsOpen}
              param={false}
              additionalStyling="text-base py-1 px-1 sm:text-lg md:text-xl"
              isDisabled={isLoading}
            >
              Cancel
            </RedButton>
            <PrimaryButton
              callback={handleConfirmBuy}
              additionalStyling="text-base py-1 px-1 sm:text-lg md:text-xl"
              isLoading={isLoading}
            >
              Confirm
            </PrimaryButton>
          </div>
        </div>
      </div>,
      ref.current
    );
  }

  return isOpen && ref.current
    ? createPortal(
        <div className="fixed h-full w-full top-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,0.2)] z-[1000]">
          <div className="w-3/4 py-3 bg-smokewhite-custom rounded-xl">
            <div className="w-full border-b-2 border-dark-custom flex justify-between px-3 pb-3 text-lg sm:text-xl md:text-2xl">
              <p>{duration}&apos;s QR Code</p>
              <button
                className="text-blue-500 duration-300 hover:text-blue-800 active:text-blue-950"
                onClick={() => setIsOpen(false)}
              >
                X
              </button>
            </div>
            <div className="w-full px-3 py-3 flex flex-col justify-center items-center gap-5">
              <h3 className="text-xl sm:text-2xl md:text-3xl text-center w-full font-semibold">
                Your transaction has been ordered, please scan to proceed with
                the payment
              </h3>
              <QRCodeSVG value={`${CONSTANTS.BASEURL}/subscribe/payment`} />
              <p className="text-base sm:text-base md:text-lg">
                Or click{" "}
                <Link
                  href={`${CONSTANTS.BASEURL}/subscribe/payment`}
                  className="underline"
                >
                  here
                </Link>
              </p>
            </div>
          </div>
        </div>,
        ref.current
      )
    : null;
}

export default QrCodeModal;
