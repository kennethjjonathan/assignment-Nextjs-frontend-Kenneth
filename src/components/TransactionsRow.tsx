import ITransaction from "@/interface/ITransactions";
import dateFormatter from "@/library/helper/dateFormmatter";
import React, { SetStateAction, useState } from "react";
import PrimaryButton from "./PrimaryButton";
import RedButton from "./RedButton";
import CONSTANTS from "@/constants/constants";
import CompleteTransactionModal from "./CompleteTransactionModal";
import CancelTransactionModal from "./CancelTransactionModal";
import generateOneMonth from "@/library/helper/generateOneMonth";

type TransactionsRowProps = {
  dataPerPage: number;
  currentPage: number;
  transaction: ITransaction;
  index: number;
  setUpdateToggle: React.Dispatch<SetStateAction<boolean>>;
};

function TransactionsRow({
  dataPerPage,
  currentPage,
  transaction,
  index,
  setUpdateToggle,
}: TransactionsRowProps) {
  const [isCompleteOpen, setIsCompleteOpen] = useState<boolean>(false);
  const [isCancelOpen, setIsCancelOpen] = useState<boolean>(false);

  function completeButtonValidator(): boolean {
    if (transaction.status === "canceled") {
      return true;
    } else if (transaction.status === "completed") {
      return true;
    } else if (!transaction.paymentCompletion) {
      return true;
    } else {
      return false;
    }
  }

  function cancelButtonValidator(): boolean {
    if (transaction.status === "canceled") {
      return true;
    } else if (transaction.status === "completed") {
      return true;
    } else if (transaction.paymentCompletion) {
      return true;
    } else {
      return false;
    }
  }
  function handleCompleteButtonClick() {
    setIsCompleteOpen(true);
  }
  async function handleCompleteTransaction() {
    setIsCompleteOpen(false);
    try {
      const response = await fetch(
        `${CONSTANTS.BASELOCALHOST}/transactions/${transaction.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "completed",
            updatedAt: new Date(),
            user: {
              subscription: {
                isSubscribe: true,
                expiration: generateOneMonth(),
              },
              updatedAt: new Date(),
            },
          }),
        }
      );
      if (!response.ok) throw new Error(response.statusText);
      const userResponse = await fetch(
        `${CONSTANTS.BASELOCALHOST}/users/${transaction.user?.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            updatedAt: new Date(),
            subscription: {
              isSubscribed: true,
              expiration: generateOneMonth(),
            },
          }),
        }
      );
      if (!userResponse.ok) throw new Error(userResponse.statusText);
      setUpdateToggle((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  }

  function handleCancelButton() {
    setIsCancelOpen(true);
  }

  async function handleCancelTransaction() {
    setIsCancelOpen(false);
    try {
      const response = await fetch(
        `${CONSTANTS.BASELOCALHOST}/transactions/${transaction.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "canceled",
            updatedAt: new Date(),
          }),
        }
      );
      if (!response.ok) throw new Error(response.statusText);
      setUpdateToggle((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <CompleteTransactionModal
        isOpen={isCompleteOpen}
        setIsOpen={setIsCompleteOpen}
        transaction={transaction}
        updateFunction={handleCompleteTransaction}
      />
      <CancelTransactionModal
        isOpen={isCancelOpen}
        setIsOpen={setIsCancelOpen}
        transaction={transaction}
        cancelFunction={handleCancelTransaction}
      />
      <tr
        className={`duration-300 hover:bg-green-300 border-[1px] border-text-primary text-center text-sm sm:text-base lg:text-lg ${
          index % 2 === 0 ? "bg-white" : "bg-slate-300"
        }`}
      >
        <td className="border-[1px] border-text-primary py-2 px-2">
          {(currentPage - 1) * dataPerPage + index + 1}
        </td>
        <td className="border-[1px] border-text-primary py-2 px-2">
          {transaction.user?.email}
        </td>
        <td
          className={`border-[1px] border-text-primary py-2 px-2 ${
            transaction.status === "process"
              ? "text-yellow-500"
              : transaction.status === "canceled"
              ? "text-red-custom"
              : "text-green-500"
          }`}
        >
          {transaction.status.toUpperCase()}
        </td>
        <td
          className={`border-[1px] border-text-primary py-2 px-2 ${
            transaction.paymentCompletion ? "text-green-500" : "text-red-custom"
          }`}
        >
          {transaction.paymentCompletion ? "PAID" : "WAITING"}
        </td>
        <td className="border-[1px] border-text-primary py-2 px-2">
          {transaction.package}
        </td>
        <td className="border-[1px] border-text-primary py-2 px-2">
          {dateFormatter(transaction.createdAt.toString())}
        </td>
        <td className="border-[1px] border-text-primary py-2 px-2 text-sm sm:text-base lg:text-lg">
          <PrimaryButton
            additionalStyling={`py-1 px-2`}
            callback={handleCompleteButtonClick}
            isDisabled={completeButtonValidator()}
          >
            Complete
          </PrimaryButton>
        </td>
        <td className="border-[1px] border-text-primary py-2 px-2 text-sm sm:text-base lg:text-lg">
          <RedButton
            additionalStyling={`px-2 py-1`}
            callback={handleCancelButton}
            isDisabled={cancelButtonValidator()}
          >
            Cancel
          </RedButton>
        </td>
      </tr>
    </>
  );
}

export default TransactionsRow;
