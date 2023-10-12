import IUser from "@/interface/IUser";
import React, { SetStateAction } from "react";
import dateFormatter from "@/library/helper/dateFormmatter";
import PrimaryButton from "./PrimaryButton";
import CONSTANTS from "@/constants/constants";

type SubscriptionCardProps = {
  user: IUser;
  updateToggle: React.Dispatch<SetStateAction<boolean>>;
};

function SubscriptionCard({ user, updateToggle }: SubscriptionCardProps) {
  async function handleDeactivateUser() {
    if (!user.subscription?.isSubscribed) {
      return;
    }

    try {
      const response = await fetch(
        `${CONSTANTS.BASELOCALHOST}/users/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subscription: {
              isSubscribed: false,
              expiration: user.subscription?.expiration,
            },
          }),
        }
      );
      if (!response.ok) throw new Error(response.statusText);
    } catch (error) {
      console.error(error);
    }
    updateToggle((prev) => !prev);
  }
  return (
    <div className="w-full border-2 border-text-primary rounded-md px-5 py-5 flex justify-between items-center">
      <div className="flex flex-col items-stretch justify-evenly">
        <p className="text-base font-[500]">{`Name: ${user.name}`}</p>
        <p className="text-base font-[500] text-text-secondary">
          Subscription:{" "}
          <span className="text-red-custom">
            {user.subscription?.isSubscribed ? "Premium" : "Free"}
          </span>
        </p>
        {user.subscription?.isSubscribed ? (
          <p className="text-base font-[500] text-text-secondary">
            Exp date:{" "}
            <span className="text-red-custom">
              {dateFormatter(user.subscription.expiration.toString())}
            </span>
          </p>
        ) : null}
      </div>
      <PrimaryButton
        additionalStyling={`px-1 py-2 ${
          !user.subscription?.isSubscribed ? "cursor-not-allowed" : ""
        }`}
        callback={handleDeactivateUser}
      >
        Deactivate User
      </PrimaryButton>
    </div>
  );
}

export default SubscriptionCard;
