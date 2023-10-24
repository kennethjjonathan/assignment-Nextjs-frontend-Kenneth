import HistoryList from "@/components/HistoryList";
import React, { useState } from "react";
import IUser from "@/interface/IUser";
import BlackButton from "@/components/BlackButton";
import dateOnlyFormatter from "@/library/helper/dateOnlyFormatter";
import ITransaction from "@/interface/ITransactions";
import QrCodeModal from "@/components/QrCodeModal";
import { useRouter } from "next/router";
import Head from "next/head";
import NotAbleToGetContent from "./NotAbleToGetContent";

type ProfileProps = {
  user: IUser | null;
  transaction: ITransaction | null;
};

function Profile({ user, transaction }: ProfileProps) {
  const [isQrOpen, setIsQrOpen] = useState<boolean>(false);
  const router = useRouter();
  function handleSubscribeButton() {
    router.push("/subscribe");
  }

  function handleGoToHomePage() {
    router.push("/");
  }

  if (user === null) {
    return (
      <>
        <Head>
          <title>Profile</title>
        </Head>
        <div className="container mx-auto px-generic-horizontal-mobile pt-generic-top-mobile pb-generic-bottom-mobile">
          <NotAbleToGetContent text="Unable to load data" />
        </div>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      {transaction && (
        <QrCodeModal
          isOpen={isQrOpen}
          setIsOpen={setIsQrOpen}
          duration={transaction.package}
          isConfirmed={true}
          setIsConfirmed={() => {}}
        />
      )}
      <div className="container mx-auto px-generic-horizontal-mobile pt-generic-top-mobile pb-generic-bottom-mobile flex flex-col items-center justify-between gap-5">
        <div className="w-full flex flex-col items-center justify-start gap-3 md:gap-4">
          <h1 className="w-full text-center text-3xl font-[800] main-text md:text-4xl">
            Hello, {user.name}
          </h1>
          <p className="w-full text-center font-light text-lg md:text-xl">
            You are signed in as {user.email}
          </p>
          {user.isAdmin && (
            <div>
              <BlackButton
                innerAdditionalStyling="px-3 py-2 md:text-lg"
                callback={handleGoToHomePage}
              >
                Go To Teracce&apos;s home page
              </BlackButton>
            </div>
          )}
        </div>
        {transaction && !transaction.paymentCompletion && (
          <div className="w-full border-2 border-gray-300 flex flex-col items-center gap-2 py-2 px-3">
            <p className="text-lg w-full text-center">
              You have a payment waiting
            </p>
            <div className="w-full flex flex-col items-baseline py-2 border-b-2 border-b-gray-300">
              <p className="font-bold text-base">Package:</p>
              <p className="text-xl">{transaction.package}</p>
            </div>
            <div className="w-full flex flex-col items-baseline py-2 border-b-2 border-b-gray-300">
              <p className="font-bold text-base">Payment:</p>
              <p className="text-xl text-red-custom">Waiting for Payment</p>
            </div>
            <div>
              <BlackButton
                innerAdditionalStyling="px-3 py-2"
                callback={() => {
                  setIsQrOpen(true);
                }}
              >
                Pay
              </BlackButton>
            </div>
          </div>
        )}
        {transaction &&
          transaction.paymentCompletion &&
          transaction.status === "process" && (
            <div className="w-full border-2 border-gray-300 flex flex-col items-center gap-2 py-2 px-3">
              <p className="text-lg w-full text-center">
                Please wait for admin&apos;s approval for your premium
                membership
              </p>
              <div className="w-full flex flex-col items-baseline py-2 border-b-2 border-b-gray-300">
                <p className="font-bold text-base">Package:</p>
                <p className="text-xl">{transaction.package}</p>
              </div>
              <div className="w-full flex flex-col items-baseline py-2 border-b-2 border-b-gray-300">
                <p className="font-bold text-base">Payment:</p>
                <p className="text-xl text-green-500">Paid</p>
              </div>
            </div>
          )}
        <div className="w-full flex flex-col items-center justify-between gap-5 md:flex-row md:items-baseline">
          <div className="w-full border-2 border-gray-300 flex flex-col items-center gap-2 py-2 px-3">
            <p className="text-2xl font-semibold main-text">Subscription</p>
            <div className="w-full flex flex-col items-baseline py-2 border-b-2 border-b-gray-300">
              <p className="font-bold text-base">Status</p>
              <p
                className={`text-xl ${
                  user.subscription?.isSubscribed
                    ? "text-green-500"
                    : "text-red-custom"
                }`}
              >
                {user.subscription?.isSubscribed === false ? "Free" : "Premium"}
              </p>
            </div>
            {user.subscription.isSubscribed && !user.isAdmin && (
              <div className="w-full flex flex-col items-baseline py-2 border-b-2 border-b-gray-300">
                <p className="font-bold text-base">Valid Until:</p>
                <p className={`text-xl`}>
                  {dateOnlyFormatter(user.subscription.expiration.toString())}
                </p>
              </div>
            )}
            {user.subscription.isSubscribed === false && (
              <div className="w-full flex flex-col items-center justify-start gap-3">
                <p className="text-lg w-full text-center">
                  Subscribe to enjoy Teracce premium content.
                </p>
                <BlackButton
                  innerAdditionalStyling="px-3 py-2 text-xl"
                  callback={handleSubscribeButton}
                >
                  Subscribe
                </BlackButton>
              </div>
            )}
          </div>
          <div className="w-full border-2 border-gray-300 flex flex-col items-center gap-2 py-2 px-3">
            <p className="text-2xl font-semibold main-text">Credentials</p>
            <div className="w-full flex flex-col items-baseline py-2 border-b-2 border-b-gray-300">
              <p className="font-bold text-base">Name</p>
              <p className="text-xl">{user.name}</p>
            </div>
            <div className="w-full flex flex-col items-baseline py-2 border-b-2 border-b-gray-300">
              <p className="font-bold text-base">Email</p>
              <p className="text-xl">{user.email}</p>
            </div>
            <div className="w-full flex flex-col items-baseline py-2 border-b-2 border-b-gray-300">
              <p className="font-bold text-base">Address</p>
              <p className="text-xl">{user.address}</p>
            </div>
            <div className="w-full flex flex-col items-baseline py-2 border-b-2 border-b-gray-300">
              <p className="font-bold text-base">Phone</p>
              <p className="text-xl">{user.phoneNumber}</p>
            </div>
          </div>
        </div>

        {user.history && <HistoryList history={user.history} />}
      </div>
    </>
  );
}

export default Profile;
