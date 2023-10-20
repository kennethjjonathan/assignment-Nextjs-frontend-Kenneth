import React, { useEffect, useState } from "react";
import style from "./Header.module.css";
import Link from "next/link";
import CONSTANTS from "@/constants/constants";
import { useCookies } from "react-cookie";
import TeracceLogo from "../TeracceLogo";
import { usePathname } from "next/navigation";
import IUser from "@/interface/IUser";
import { useRouter } from "next/router";

function Header() {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [cookie, _, removeCookies] = useCookies<string>([CONSTANTS.COOKIENAME]);
  const pathname = usePathname();
  const [user, setUser] = useState<IUser | undefined>(undefined);

  const router = useRouter();

  function handleLogout() {
    setUser(undefined);
    removeCookies(CONSTANTS.COOKIENAME, { path: "/" });
    router.replace("/");
  }

  useEffect(() => {
    setUser(cookie.USER);
  }, [router]);

  if (pathname === "/login" || pathname === "/register") {
    return (
      <div className="w-full border-b-2 border-text-primary fixed z-50 bg-smokewhite-custom top-0 left-0 flex items-center justify-center py-2">
        <TeracceLogo textColor="text-text-primary" />
      </div>
    );
  }
  return (
    <div className="w-full border-b-2 border-text-primary fixed z-50 bg-smokewhite-custom top-0 left-0">
      <nav className="flex border-red-500 px-3 py-5 container mx-auto justify-between items-center">
        <div className="flex justify-center items-center gap-2">
          <TeracceLogo textColor="text-text-primary" />
          {/\/admin\/*/gi.test(pathname) ? (
            <p className="main-text text-text-secondary font-[800] text-lg sm:text-xl">
              (Admin)
            </p>
          ) : null}
        </div>

        <ul
          className={`${
            isNavOpen ? style.nav__menu__active : style.nav__menu
          } `}
        >
          {user === undefined ? (
            <>
              <li
                className={`main-text font-[800] decoration-2 text-base duration-300 hover:underline hover:decoration-blue-500`}
              >
                <Link href="/login">Login</Link>
              </li>
              <li
                className={`main-text font-[800] decoration-2 text-base duration-300 hover:underline hover:decoration-blue-500`}
              >
                <Link href="/register">Register</Link>
              </li>
            </>
          ) : /\/admin\/*/gi.test(pathname) ? (
            <>
              <li
                className={`main-text font-[800] decoration-2 text-base duration-300 hover:underline hover:decoration-blue-500 ${
                  pathname === "/admin" ? "underline decoration-red-custom" : ""
                }`}
              >
                <Link href="/admin">Hello, {cookie.USER.name}</Link>
              </li>
              <li
                className={`main-text font-[800] decoration-2 text-base duration-300 hover:underline hover:decoration-blue-500 ${
                  pathname === "/admin/customers"
                    ? "underline decoration-red-custom"
                    : ""
                }`}
              >
                <Link href="/admin/customers">Customers</Link>
              </li>
              <li
                className={`main-text font-[800] decoration-2 text-base duration-300 hover:underline hover:decoration-blue-500 ${
                  pathname === "/admin/manage-posts"
                    ? "underline decoration-red-custom"
                    : ""
                }`}
              >
                <Link href="/admin/manage-posts">Manage Posts</Link>
              </li>
              <li
                className={`main-text font-[800] decoration-2 text-base duration-300 hover:underline hover:decoration-blue-500 ${
                  pathname === "/admin/transactions"
                    ? "underline decoration-red-custom"
                    : ""
                }`}
              >
                <Link href="/admin/transactions">Transactions</Link>
              </li>
              <li
                className={`main-text font-[800] decoration-2 text-base duration-300 hover:underline hover:decoration-blue-500 cursor-pointer`}
                onClick={handleLogout}
              >
                Log Out
              </li>
            </>
          ) : (
            <>
              <li
                className={`main-text font-[800] decoration-2 text-base duration-300 hover:underline hover:decoration-blue-500 ${
                  pathname === "/profile"
                    ? "underline decoration-red-custom"
                    : ""
                }`}
              >
                <Link href="/profile">Hello, {cookie.USER.name}</Link>
              </li>
              <li
                className={`main-text font-[800] decoration-2 text-base duration-300 hover:underline hover:decoration-blue-500 ${
                  pathname === "/subscribe"
                    ? "underline decoration-red-custom"
                    : ""
                }`}
              >
                <Link href="/subscribe">Subscribe</Link>
              </li>
              <li
                className={`main-text font-[800] decoration-2 text-base duration-300 hover:underline hover:decoration-blue-500 cursor-pointer`}
                onClick={handleLogout}
              >
                Log Out
              </li>
            </>
          )}
        </ul>
        <div
          className={style.hamburger}
          onClick={() => setIsNavOpen((prev) => !prev)}
        >
          <span
            className={`${
              isNavOpen
                ? style.hamburger__bars__first__active
                : style.hamburger__bars__first
            }`}
          ></span>
          <span
            className={`${
              isNavOpen
                ? style.hamburger__bars__second__active
                : style.hamburger__bars__second
            }`}
          ></span>
          <span
            className={`${
              isNavOpen
                ? style.hamburger__bars__third__active
                : style.hamburger__bars__third
            }`}
          ></span>
        </div>
      </nav>
    </div>
  );
}

export default Header;
