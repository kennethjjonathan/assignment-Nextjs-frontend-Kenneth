import React, { useEffect, useState } from "react";
import Head from "next/head";
import ITransaction from "@/interface/ITransactions";
import CONSTANTS from "@/constants/constants";
import TransactionsRow from "@/components/TransactionsRow";

function Index() {
  const [transacationsList, setTransactionsList] = useState<ITransaction[]>([]);
  const [updateToggle, setUpdateToggle] = useState<boolean>(true);

  async function getTransactions() {
    try {
      const response = await fetch(`${CONSTANTS.BASELOCALHOST}/transactions`);
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      setTransactionsList(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTransactions();
  }, [updateToggle]);

  return (
    <>
      <Head>
        <title>Manage Transactions</title>
      </Head>
      <div className="container mx-auto px-3 pb-16 pt-32 sm:pt-40">
        <h1 className="text-5xl font-[800]">Manage Transactions</h1>
        <div className="mt-8 w-full overflow-x-auto">
          <table className="w-full border-collapse border-[1px] border-text-primary">
            <thead className="text-sm font-bold md:text-lg lg:text-xl bg-slate-500">
              <tr>
                <th className="py-2 px-2 border-[1px] border-text-primary">
                  ID
                </th>
                <th className="py-2 px-2 border-[1px] border-text-primary">
                  User
                </th>
                <th className="py-2 px-2 border-[1px] border-text-primary">
                  Status
                </th>
                <th className="py-2 px-2 border-[1px] border-text-primary">
                  Payment Completion
                </th>
                <th className="py-2 px-2 border-[1px] border-text-primary">
                  Package
                </th>
                <th className="py-2 px-2 border-[1px] border-text-primary">
                  Transaction Date
                </th>
                <th className="py-2 px-2 border-[1px] border-text-primary">
                  Last Updated At
                </th>
                <th
                  className="py-2 px-2 border-[1px] border-text-primary"
                  colSpan={2}
                ></th>
              </tr>
            </thead>
            <tbody>
              {transacationsList.map((transaction, index) => (
                <TransactionsRow
                  key={transaction.id}
                  transaction={transaction}
                  index={index}
                  setUpdateToggle={setUpdateToggle}
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
