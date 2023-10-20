import IUser from "@/interface/IUser";
import React, { SetStateAction } from "react";
import dateFormatter from "@/library/helper/dateFormmatter";
import PrimaryButton from "./PrimaryButton";
import CONSTANTS from "@/constants/constants";

type UsersRowProps = {
  user: IUser;
  index: number;
  updateToggle: React.Dispatch<SetStateAction<boolean>>;
};

function UsersRow({ user, index, updateToggle }: UsersRowProps) {
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
    <tr
      className={`duration-300 hover:bg-green-300 border-[1px] border-text-primary text-center text-sm sm:text-base lg:text-lg ${
        index % 2 === 0 ? "bg-white" : "bg-slate-300"
      }`}
    >
      <td className="border-[1px] border-text-primary py-2 px-2">
        {index + 1}
      </td>
      <td className="border-[1px] border-text-primary py-2 px-2">
        {user.name}
      </td>
      <td
        className={`border-[1px] border-text-primary py-2 px-2 ${
          user.subscription?.isSubscribed ? "text-green-500" : "text-red-custom"
        }`}
      >
        {user.subscription?.isSubscribed ? "Premium" : "Free"}
      </td>
      <td className="border-[1px] border-text-primary py-2 px-2">
        {user.subscription?.isSubscribed
          ? dateFormatter(user.subscription!.expiration.toString())
          : "None"}
      </td>
      <td>
        <PrimaryButton
          additionalStyling="px-2 py-1"
          isDisabled={user.subscription?.isSubscribed === false}
          callback={handleDeactivateUser}
        >
          Deactivate User
        </PrimaryButton>
      </td>
    </tr>
  );
}

export default UsersRow;
