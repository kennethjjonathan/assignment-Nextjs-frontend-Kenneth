import React, { Dispatch, SetStateAction } from "react";
import ModalBase from "./ModalBase";
import PrimaryButton from "./PrimaryButton";
import { useRouter } from "next/router";
import ITransaction from "@/interface/ITransactions";
import moneyFormatter from "@/library/helper/moneyFormatter";

type PaymentsSuccessModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  transaction: ITransaction;
};

function PaymentSuccessModal({
  isOpen,
  setIsOpen,
  transaction,
}: PaymentsSuccessModalProps) {
  function handleCloseModal() {
    setIsOpen(false);
    router.push("/");
  }
  const router = useRouter();
  return (
    <ModalBase isOpen={isOpen}>
      <div className="w-3/4 py-3 bg-smokewhite-custom rounded-xl">
        <div className="w-full border-b-2 border-dark-custom flex justify-between px-3 pb-3 text-lg sm:text-xl md:text-2xl lg:text-3xl">
          <p className="text-green-500">Payment is Succesful</p>
        </div>
        <div className="w-full px-3 py-3 md:text-xl lg:text-2xl flex flex-col items-center gap-2">
          <p className="text-justify w-full">
            Thank you for the payment. You will become a premium user after
            approval.
          </p>
          <div className="w-full grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <div className="w-full">
              <p className="font-bold">User's Name:</p>
              <p>{transaction.user?.name}</p>
            </div>
            <div className="w-full">
              <p className="font-bold">User's Email:</p>
              <p>{transaction.user?.email}</p>
            </div>
            <div className="w-full">
              <p className="font-bold">User's Phone:</p>
              <p>{transaction.user?.phoneNumber}</p>
            </div>
            <div className="w-full">
              <p className="font-bold">Package:</p>
              <p>
                {transaction.package ? "Monthly" : "Yearly"} (
                {`IDR ${moneyFormatter(transaction.price)}`})
              </p>
            </div>
            <div className="w-full">
              <p className="font-bold">Status:</p>
              <p className="text-blue-500">Paid</p>
            </div>
          </div>

          <PrimaryButton
            additionalStyling="py-1 px-2 text-base md:text-xl lg:text-2xl"
            callback={handleCloseModal}
          >
            Go to Home Page
          </PrimaryButton>
        </div>
      </div>
    </ModalBase>
  );
}

export default PaymentSuccessModal;
