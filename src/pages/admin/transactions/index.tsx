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
import axios from "axios";
import PaginationNav from "@/components/PaginationNav";
import SearchBar from "@/components/SearchBar";

function Index() {
  const statusOptionArr: string[] = ["All", "process", "canceled", "completed"];
  const [transacationsList, setTransactionsList] = useState<ITransaction[]>([]);
  const [status, setStatus] = useState<string>("All");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [updateToggle, setUpdateToggle] = useState<boolean>(true);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const dataPerPage: number = 5;
  const [dataAmount, setDataAmount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");

  function addADay(input: string) {
    const date: Date = new Date(input);
    date.setDate(date.getDate() + 1);
    return date.toISOString();
  }

  async function getTransactions() {
    try {
      const response = await axios.get(
        `${CONSTANTS.BASELOCALHOST}/transactions?_expand=user${
          searchValue === "" ? "" : `&q=${searchValue}`
        }&_page=${currentPage}&_limit=${dataPerPage}${
          status === "All" ? "" : `&status=${status}`
        }${fromDate === "" ? "" : `&createdAt_gte=${fromDate}`}${
          toDate === "" ? "" : `&createdAt_lte=${addADay(toDate)}`
        }`
      );
      setDataAmount(response.headers["x-total-count"]);
      setTransactionsList(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setCurrentPage(1);
    getTransactions();
  }, [updateToggle, status, fromDate, toDate, currentPage]);

  useEffect(() => {
    const wait = setTimeout(() => {
      setCurrentPage(1);
      getTransactions();
    }, 1000);

    return () => clearTimeout(wait);
  }, [searchValue]);

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
        fromDate={fromDate}
        setFromDate={setFromDate}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        toDate={toDate}
        setToDate={setToDate}
      />
      <div className="container mx-auto px-3 pb-16 pt-32 sm:pt-40 w-full">
        <h1 className="text-2xl font-[800] sm:text-3xl md:text-5xl">
          Manage Transactions
        </h1>
        <div className="w-full items-end gap-2 mt-3 hidden sm:flex justify-between">
          <div>
            <SelectOptions
              label="By Status"
              optionArr={statusOptionArr}
              inputValue={status}
              setInputValue={setStatus}
            />
          </div>
          <div className="flex gap-8 items-center">
            <DateInput
              label="From Date"
              id="transaction-from-date"
              inputValue={fromDate}
              setInputValue={setFromDate}
            />
            <DateInput
              label="To Date"
              id="transaction-to-date"
              inputValue={toDate}
              setInputValue={setToDate}
            />
          </div>
          <div>
            <SearchBar
              placeHolder="Search non user keyword..."
              inputValue={searchValue}
              setInputValue={setSearchValue}
            />
          </div>
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
        <div className="mt-4 w-full overflow-x-auto h-96">
          <table className="w-full border-collapse border-[1px] border-text-primary">
            <thead className="text-sm font-bold md:text-lg lg:text-xl bg-slate-500">
              <tr>
                <th className="py-2 px-2 border-[1px] border-text-primary">
                  No
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
                <th
                  className="py-2 px-2 border-[1px] border-text-primary"
                  colSpan={2}
                ></th>
              </tr>
            </thead>
            <tbody>
              {transacationsList.length > 0 &&
                transacationsList.map((transaction, index) => (
                  <TransactionsRow
                    currentPage={currentPage}
                    dataPerPage={dataPerPage}
                    key={transaction.id}
                    transaction={transaction}
                    index={index}
                    setUpdateToggle={setUpdateToggle}
                  />
                ))}
            </tbody>
          </table>
          {transacationsList.length === 0 && (
            <div className="w-full text-lg h-10 flex items-center justify-center main-text text-red-custom">
              No Transaction
            </div>
          )}
        </div>
        <div className="mx-auto w-full flex justify-center items-center">
          {dataAmount > dataPerPage && (
            <PaginationNav
              dataAmount={dataAmount}
              currentPage={currentPage}
              dataPerPage={dataPerPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Index;
