import CONSTANTS from "@/constants/constants";
import IUser from "@/interface/IUser";
import React, { useEffect, useState } from "react";
import SubscriptionCard from "@/components/SubscriptionCard";
import Head from "next/head";

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
      <div className="container mx-auto px-3 py-5">
        <h1 className="text-5xl font-[800]">Subscribers List</h1>
        <div className="mt-8 grid grid-cols-1 grid-rows-5 grid-flow-col gap-4">
          {usersArray.map((user) => (
            <SubscriptionCard
              user={user}
              key={user.id}
              updateToggle={setUpdateToggle}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Index;
