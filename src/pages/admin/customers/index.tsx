import CONSTANTS from "@/constants/constants";
import IUser from "@/interface/IUser";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import UsersRow from "@/components/UsersRow";

function Index() {
  const [usersArray, setUsersArray] = useState<IUser[]>([]);
  const [updateToggle, setUpdateToggle] = useState<boolean>(false);
  const getUsers = async () => {
    try {
      const response = await fetch(
        `${CONSTANTS.BASELOCALHOST}/users?isAdmin=false`
      );
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      setUsersArray(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, [updateToggle]);
  return (
    <>
      <Head>
        <title>Subscribers</title>
      </Head>
      <div className="container mx-auto px-3 pb-16 pt-32 sm:pt-40">
        <h1 className="text-2xl font-[800] sm:text-3xl md:text-5xl">
          Customers
        </h1>
        <div className="mt-8 w-full overflow-x-auto">
          <table className="w-full border-collapse border-[1px] border-text-primary">
            <thead className="text-sm font-bold md:text-lg lg:text-xl bg-slate-500">
              <tr>
                <th className="py-2 px-2 border-[1px] border-text-primary">
                  No
                </th>
                <th className="py-2 px-2 border-[1px] border-text-primary">
                  Name
                </th>
                <th className="py-2 px-2 border-[1px] border-text-primary">
                  Subscription
                </th>
                <th className="py-2 px-2 border-[1px] border-text-primary">
                  Expiration Date
                </th>
                <th className="py-2 px-2 border-[1px] border-text-primary" />
              </tr>
            </thead>
            <tbody>
              {usersArray.map((user, index) => (
                <UsersRow
                  user={user}
                  index={index}
                  key={user.id}
                  updateToggle={setUpdateToggle}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Index;
