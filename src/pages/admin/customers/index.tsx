import CONSTANTS from "@/constants/constants";
import IUser from "@/interface/IUser";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import UsersRow from "@/components/UsersRow";
import PaginationNav from "@/components/PaginationNav";
import axios from "axios";
import SearchBar from "@/components/SearchBar";

function Index() {
  const [usersArray, setUsersArray] = useState<IUser[]>([]);
  const [updateToggle, setUpdateToggle] = useState<boolean>(false);
  const dataPerPage: number = 5;
  const [dataAmount, setDataAmount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${CONSTANTS.BASELOCALHOST}/users?isAdmin=false${
          searchValue === "" ? "" : `&q=${searchValue}`
        }&_page=${currentPage}&_limit=${dataPerPage}`
      );
      setDataAmount(response.headers["x-total-count"]);
      setUsersArray(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const wait = setTimeout(() => {
      setCurrentPage(1);
      getUsers();
    }, 1000);

    return () => clearTimeout(wait);
  }, [searchValue]);

  useEffect(() => {
    getUsers();
  }, [updateToggle, currentPage]);

  return (
    <>
      <Head>
        <title>Subscribers</title>
      </Head>
      <div className="container mx-auto px-3 pb-16 pt-32 sm:pt-40">
        <h1 className="text-2xl font-[800] sm:text-3xl md:text-5xl">
          Customers
        </h1>
        <div className="w-full mr-0 flex justify-end items-center">
          <div className="w-1/3">
            <SearchBar
              placeHolder="Search user..."
              inputValue={searchValue}
              setInputValue={setSearchValue}
            />
          </div>
        </div>
        <div className="mt-8 w-full overflow-x-auto h-96">
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
                  dataPerPage={dataPerPage}
                  currentPage={currentPage}
                  user={user}
                  index={index}
                  key={user.id}
                  updateToggle={setUpdateToggle}
                />
              ))}
            </tbody>
          </table>
          {usersArray.length === 0 && (
            <div className="w-full text-lg h-10 flex items-center justify-center main-text text-red-custom">
              No Users
            </div>
          )}
        </div>
        <div className="flex justify-center items-center">
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
