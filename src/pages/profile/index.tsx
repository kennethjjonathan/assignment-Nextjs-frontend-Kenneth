import HistoryList from "@/components/HistoryList";
import React from "react";
import { useCookies } from "react-cookie";
import { GetServerSideProps } from "next";
import IUser from "@/interface/IUser";
import * as cookie from "cookie";

type ProfileProps = {
  user: IUser;
};

function Index({ user }: ProfileProps) {
  return (
    <div className="container mx-auto px-generic-horizontal-mobile pt-generic-top-mobile flex flex-col gap-8 items-center justify-center lg:flex-row">
      <HistoryList history={user.history} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let user: IUser | null;
  const cookieData = cookie.parse(req.headers.cookie!);
  if (cookieData.USER === undefined) {
    user = null;
  } else {
    user = JSON.parse(cookieData.USER);
  }

  return {
    props: {
      user: user || null,
    },
  };
};

export default Index;
