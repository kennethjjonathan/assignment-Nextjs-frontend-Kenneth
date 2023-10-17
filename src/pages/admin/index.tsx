import React from "react";
import Link from "next/link";
import { useCookies } from "react-cookie";
import CONSTANTS from "@/constants/constants";
import { useRouter } from "next/router";
import RedButton from "@/components/RedButton";

function Index() {
  const router = useRouter();
  const [, , removeCookies] = useCookies([`${CONSTANTS.COOKIENAME}`]);
  function handleLogout() {
    removeCookies(CONSTANTS.COOKIENAME);
    router.replace("/");
  }
  return (
    <div className="container mx-auto px-3 pb-16 pt-32 sm:pt-40">
      <h1 className="text-2xl font-[800] sm:text-3xl md:text-5xl">Admin</h1>
      <RedButton callback={handleLogout} additionalStyling="py-1 px-2 text-lg">
        Log Out
      </RedButton>
    </div>
  );
}

export default Index;
