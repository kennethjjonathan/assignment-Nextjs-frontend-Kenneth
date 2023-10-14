import React, { ReactNode, useState } from "react";
import style from "./Header.module.css";
import Link from "next/link";

type HeaderProps = {
  children: ReactNode;
};

function Header({ children }: HeaderProps) {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  return (
    <>
      <div className="w-full border-b-2 border-text-primary">
        <nav className="flex border-red-500 px-3 py-5 container mx-auto justify-between items-center">
          <h1 className="font-extrabold text-xl lg:text-3xl md:text-2xl main-text">
            Teracce
          </h1>

          <ul
            className={`${
              isNavOpen ? style.nav__menu__active : style.nav__menu
            } `}
          >
            <li>
              <Link href="/login">Log In</Link>
            </li>
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
      {children}
    </>
  );
}

export default Header;
