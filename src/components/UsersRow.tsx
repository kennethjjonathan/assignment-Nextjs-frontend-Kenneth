import IUser from "@/interface/IUser";
import React, { SetStateAction, useState } from "react";
import dateFormatter from "@/library/helper/dateFormmatter";
import PrimaryButton from "./PrimaryButton";
import CONSTANTS from "@/constants/constants";
import ModalBase from "./ModalBase";
import RedButton from "./RedButton";
import errorNotify from "@/library/helper/errorNotify";
import successNotify from "@/library/helper/successToast";

type UsersRowProps = {
  dataPerPage: number;
  currentPage: number;
  user: IUser;
  index: number;
  updateToggle: React.Dispatch<SetStateAction<boolean>>;
};

function UsersRow({
  currentPage,
  dataPerPage,
  user,
  index,
  updateToggle,
}: UsersRowProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  async function handleDeactivateUser() {
    setIsModalOpen(false);
    setIsLoading(true);
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
              expiration: "",
            },
          }),
        }
      );
      if (!response.ok) {
        errorNotify(response);
        throw new Error(response.statusText);
      }
      successNotify(`Successfully deactivate ${user.email}'s account`);
      updateToggle((prev) => !prev);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <ModalBase isOpen={isModalOpen}>
        <div className="w-3/4 py-3 bg-smokewhite-custom rounded-xl">
          <div className="w-full border-b-2 border-dark-custom flex justify-between px-3 pb-3 text-lg sm:text-xl md:text-2xl">
            <p>Confirm Deactivate User</p>
            <button
              className="text-blue-500 duration-300 hover:text-blue-800 active:text-blue-950"
              onClick={() => setIsModalOpen(false)}
            >
              X
            </button>
          </div>
          <div className="w-full px-3 py-3 h-auto">
            <p className="text-lg sm:text-xl md:text-2xl">
              Are you sure want to deactivate {user?.email}&apos;s subscription
              <span className="text-red-custom font-[500]">
                {" "}
                (user id: {user.id})
              </span>
              ?
            </p>
          </div>
          <div className="w-full border-t-2 border-dark-custom flex justify-end px-3 pt-3 gap-2 text-lg sm:text-xl md:text-2xl">
            <PrimaryButton
              callback={setIsModalOpen}
              param={false}
              additionalStyling="text-base py-1 px-1 sm:text-lg md:text-xl"
            >
              Cancel
            </PrimaryButton>
            <RedButton
              callback={handleDeactivateUser}
              additionalStyling="text-base py-1 px-1 sm:text-lg md:text-xl"
            >
              Deactivate User
            </RedButton>
          </div>
        </div>
      </ModalBase>
      <tr
        className={`duration-300 hover:bg-green-300 border-[1px] border-text-primary text-center text-sm sm:text-base lg:text-lg ${
          index % 2 === 0 ? "bg-white" : "bg-slate-300"
        }`}
      >
        <td className="border-[1px] border-text-primary py-2 px-2">
          {(currentPage - 1) * dataPerPage + index + 1}
        </td>
        <td className="border-[1px] border-text-primary py-2 px-2">
          {user.name}
        </td>
        <td
          className={`border-[1px] border-text-primary py-2 px-2 ${
            user.subscription?.isSubscribed
              ? "text-green-500"
              : "text-red-custom"
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
            callback={setIsModalOpen}
            param={true}
            isLoading={isLoading}
          >
            Deactivate User
          </PrimaryButton>
        </td>
      </tr>
    </>
  );
}

export default UsersRow;
