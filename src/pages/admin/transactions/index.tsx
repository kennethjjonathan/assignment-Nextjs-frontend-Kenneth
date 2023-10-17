import React, { useEffect, useState } from "react";
import Head from "next/head";
import ITransaction from "@/interface/ITransactions";
import CONSTANTS from "@/constants/constants";
import TransactionsRow from "@/components/TransactionsRow";
import SelectOptions from "@/components/SelectOptions";
import DateInput from "@/components/DateInput";
import FilterTransactionModal from "@/components/FilterTransactionModal";
import { BsFilterLeft } from "react-icons/bs";
import PrimaryButton from "@/components/PrimaryButton";

function Index() {
  const statusOptionArr: string[] = ["All", "process", "canceled", "completed"];
  const [transacationsList, setTransactionsList] = useState<ITransaction[]>([]);
  const [status, setStatus] = useState<string>("All");
  const [date, setDate] = useState<string>("");
  const [updateToggle, setUpdateToggle] = useState<boolean>(true);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  async function getTransactions() {
    try {
      const response = await fetch(
        `${CONSTANTS.BASELOCALHOST}/transactions?_expand=user${
          status === "All" ? "" : `&status=${status}`
        }${date === "" ? "" : `&createdAt_like=${date}`}`
      );
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      setTransactionsList(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTransactions();
  }, [updateToggle, status, date]);

  return (
    <>
      <Head>
        <title>Manage Transactions</title>
      </Head>
      <FilterTransactionModal
        isOpen={isFilterOpen}
        setIsOpen={setIsFilterOpen}
        statusOptionArr={statusOptionArr}
        status={status}
        setStatus={setStatus}
        date={date}
        setDate={setDate}
      />
      <div className="container mx-auto px-3 pb-16 pt-32 sm:pt-40">
        <h1 className="text-2xl font-[800] sm:text-3xl md:text-5xl">
          Manage Transactions
        </h1>
        <div className="items-center gap-2 mt-3 hidden sm:flex">
          <SelectOptions
            label="By Status"
            optionArr={statusOptionArr}
            inputValue={status}
            setInputValue={setStatus}
          />
          <DateInput
            label="By Date"
            id="transaction-date"
            inputValue={date}
            setInputValue={setDate}
          />
        </div>
        <div className="mt-3 sm:hidden">
          <PrimaryButton
            additionalStyling="flex items-center px-2 py-1 gap-2 text-lg"
            callback={setIsFilterOpen}
            param={true}
          >
            Filter <BsFilterLeft />
          </PrimaryButton>
        </div>
        <div className="mt-4 w-full overflow-x-auto">
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
