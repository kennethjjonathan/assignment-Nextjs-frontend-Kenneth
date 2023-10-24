import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import IUser from "@/interface/IUser";
import * as cookie from "cookie";
import CONSTANTS from "@/constants/constants";
import ITransaction from "@/interface/ITransactions";
import Profile from "@/components/Profile";
import { useCookies } from "react-cookie";
import errorNotify from "@/library/helper/errorNotify";

type ProfileProps = {
  user: IUser | null;
  transaction: ITransaction | null;
};

function Index() {
  const [mainUser, setMainUser] = useState<IUser | null>(null);
  const [transaction, setTransaction] = useState<ITransaction | null>(null);
  const [cookie, _] = useCookies([CONSTANTS.COOKIENAME]);

  useEffect(() => {
    async function getUser() {
      if (cookie && cookie.USER !== undefined) {
        try {
          let user =cookie.USER;
          const userResponse = await fetch(
            `${CONSTANTS.BASELOCALHOST}/users/${user.id}`
          );
          if (!userResponse.ok) {
            errorNotify(userResponse);
            throw new Error(userResponse.statusText);
          }
          user = await userResponse.json();
          setMainUser(user);
          const transactionResponse = await fetch(
            `${CONSTANTS.BASELOCALHOST}/transactions?userId=${
              user!.id
            }&_sort=id&_order=desc`
          );
          if (!transactionResponse.ok) {
            errorNotify(transactionResponse);
            throw new Error(transactionResponse.statusText);
          }
          const transactionData = await transactionResponse.json();
          if (transactionData.length !== 0) {
            setTransaction(transactionData[0]);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    getUser();
  }, []);

  return <Profile user={mainUser} transaction={transaction} />;
}

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   let user: IUser | null = null;
//   let transaction: ITransaction | null = null;
//   const cookieData = cookie.parse(req.headers.cookie!);

//   if (cookieData.USER !== undefined) {
//     try {
//       user = JSON.parse(cookieData.USER);
//       const userResponse = await fetch(
//         `${CONSTANTS.BASELOCALHOST}/users/${user!.id}`
//       );
//       if (!userResponse.ok) {
//         throw new Error(userResponse.statusText);
//       }
//       user = await userResponse.json();
//       const transactionResponse = await fetch(
//         `${CONSTANTS.BASELOCALHOST}/transactions?userId=${
//           user!.id
//         }&_sort=id&_order=desc`
//       );
//       if (!transactionResponse.ok) {
//         throw new Error(transactionResponse.statusText);
//       }
//       const transactionData = await transactionResponse.json();
//       if (transactionData.length !== 0) {
//         transaction = transactionData[0];
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   return {
//     props: {
//       user: user || null,
//       transaction: transaction || null,
//     },
//   };
// };

export default Index;
