import CONSTANTS from "@/constants/constants";
import ITransaction from "@/interface/ITransactions";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import moneyFormatter from "@/library/helper/moneyFormatter";
import GenericTextInput from "@/components/GenericTextInput";
import PrimaryButton from "@/components/PrimaryButton";
import PaymentSuccessModal from "@/components/PaymentSuccessModal";
import { AiOutlineShoppingCart } from "react-icons/ai";
import errorNotify from "@/library/helper/errorNotify";
import Head from "next/head";
import NotAbleToGetContent from "@/components/NotAbleToGetContent";

function Index() {
  const [moneyValue, setMoneyValue] = useState<number>(0);
  const [isMoneyEnough, setIsMoneyEnough] = useState<boolean>(true);
  const [cookie, _] = useCookies([CONSTANTS.COOKIENAME]);
  const [transaction, setTransaction] = useState<ITransaction | undefined>(
    undefined
  );
  const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false);
  const [updateToggle, setUpdateToggle] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getTransaction() {
    try {
      const response = await fetch(
        `${CONSTANTS.BASELOCALHOST}/transactions?userId=${cookie.USER.id}&_sort=id&_order=desc&_expand=user`
      );
      if (!response.ok) {
        errorNotify(response);
        throw new Error(response.statusText);
      }
      const data = await response.json();
      if (data.length !== 0) {
        setTransaction(data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTransaction();
  }, [updateToggle]);

  function moneyAmountValidator(): boolean {
    if (moneyValue < transaction!.price!) {
      setIsMoneyEnough(false);
      return false;
    }
    setIsMoneyEnough(true);
    return true;
  }

  async function handleSubmitMoney(e: React.FormEvent) {
    e.preventDefault();
    if (!moneyAmountValidator()) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `${CONSTANTS.BASELOCALHOST}/transactions/${transaction?.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentCompletion: true,
            updatedAt: new Date(),
          }),
        }
      );
      if (!response.ok) {
        errorNotify(response);
        throw new Error(response.statusText);
      }
      setUpdateToggle((prev) => !prev);
      setIsSuccessOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (transaction === undefined)
    return (
      <>
        <Head>
          <title>Payment - Teracce</title>
        </Head>
        <div className="container mx-auto px-generic-horizontal-mobile pb-generic-bottom-mobile pt-generic-top-mobile sm:pt-40 flex flex-col items-center justify-center">
          <NotAbleToGetContent text="Not able to load transaction" />
        </div>
      </>
    );

  return (
    <>
      <Head>
        <title>Payment - Teracce</title>
      </Head>
      <PaymentSuccessModal
        isOpen={isSuccessOpen}
        setIsOpen={setIsSuccessOpen}
        transaction={transaction}
      />
      <div className="container mx-auto px-generic-horizontal-mobile pb-generic-bottom-mobile pt-generic-top-mobile sm:pt-40 flex flex-col items-center justify-center">
        <p className="w-full text-xl text-center font-semibold main-text">
          Bill Details
        </p>
        <div className="flex flex-col gap-5 items-stretch max-w-7xl">
          <div className="flex flex-col mt-3 text-lg main-text">
            <div className="w-full  px-2 py-1">
              <p className="font-bold">Name:</p>
              <p>{transaction?.user?.name}</p>
            </div>
            <div className="w-full  px-2 py-1">
              <p className="font-bold">Email:</p>
              <p>{transaction?.user?.email}</p>
            </div>
            <div className="w-full  px-2 py-1">
              <p className="font-bold">Phone:</p>
              <p>{transaction?.user?.phoneNumber}</p>
            </div>
            <div className="flex items-stretch">
              <div className="w-full  px-2 py-1">
                <p className="font-bold">Plan:</p>
                <p>{transaction?.package}</p>
              </div>
              <div className="w-full  px-2 py-1">
                <p className="font-bold">Status:</p>
                <p
                  className={`font-semibold ${
                    !transaction?.paymentCompletion
                      ? "text-red-custom"
                      : "text-blue-500"
                  }`}
                >
                  {`${
                    !transaction?.paymentCompletion
                      ? "Waiting For Payment"
                      : "Paid"
                  }`}
                </p>
              </div>
            </div>
            <p className="w-full text-right font-extrabold text-3xl mt-5">
              Price: {`IDR ${moneyFormatter(transaction!.price)}`}
            </p>
          </div>
          <form onSubmit={(e) => handleSubmitMoney(e)}>
            <GenericTextInput
              type="number"
              label="Please put your money here:"
              inputValue={moneyValue}
              setInputValue={setMoneyValue}
              isValid={isMoneyEnough}
              blurFunc={moneyAmountValidator}
              errorMessage="Money is not sufficient for the price"
            />
            <PrimaryButton
              additionalStyling="px-2 py-1 w-full mt-3 text-lg flex items-center text-center justify-center md:text-xl"
              type="submit"
              isLoading={isLoading}
            >
              Submit Money <AiOutlineShoppingCart />
            </PrimaryButton>
          </form>
        </div>
      </div>
    </>
  );
}

export default Index;
