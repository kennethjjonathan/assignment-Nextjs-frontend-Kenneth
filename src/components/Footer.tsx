import React from "react";
import {
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineFacebook,
} from "react-icons/ai";
import { RiTwitterXFill } from "react-icons/ri";
import { BsSnapchat } from "react-icons/bs";

function Footer() {
  return (
    <div className="w-full bg-text-primary text-smokewhite-custom px-3 py-5 container mx-auto flx flex-col items-center divide-y-2 divide-text-secondary">
      <h1 className="font-extrabold text-2xl lg:text-4xl md:text-3xl main-text text-center pb-3">
        Teracce
      </h1>
      <div className="py-5 text-text-secondary">
        <h3 className="text-smokewhite-custom text-lg">SECTIONS</h3>
        <div className="grid grid-cols-2 grid-rows-3 mt-3 grid-flow-col gap-2">
          <a href="#!" className="main-text text-base font-semibold">
            News
          </a>
          <a href="#!" className="main-text text-base font-semibold">
            Payment
          </a>
          <a href="#!" className="main-text text-base font-semibold">
            Books
          </a>
          <a href="#!" className="main-text text-base font-semibold">
            Podcast
          </a>
          <a href="#!" className="main-text text-base font-semibold">
            Regulation Archive
          </a>
          <a href="#!" className="main-text text-base font-semibold">
            Magazine
          </a>
        </div>
      </div>
      <div className="py-5 text-text-secondary">
        <h3 className="text-smokewhite-custom text-lg">MORE</h3>
        <div className="grid grid-cols-2 grid-rows-3 mt-3 grid-flow-col gap-2">
          <a href="#!" className="main-text text-base font-semibold">
            Customer Care
          </a>
          <a href="#!" className="main-text text-base font-semibold">
            Shop Teracce
          </a>
          <a href="#!" className="main-text text-base font-semibold">
            Offline Stores
          </a>
          <a href="#!" className="main-text text-base font-semibold">
            Newsletter
          </a>
          <a href="#!" className="main-text text-base font-semibold">
            Pro Bono
          </a>
        </div>
      </div>
      <div className="py-5 text-text-secondary">
        <div className="grid grid-cols-2 grid-rows-3 grid-flow-col gap-2">
          <a href="#!" className="main-text text-base font-semibold">
            About Us
          </a>
          <a href="#!" className="main-text text-base font-semibold">
            Careers
          </a>
          <a href="#!" className="main-text text-base font-semibold">
            F.A.Q.
          </a>
          <a href="#!" className="main-text text-base font-semibold">
            Press
          </a>
          <a href="#!" className="main-text text-base font-semibold">
            Media
          </a>
        </div>
      </div>
      <div className="py-5 flex flex-col justify-center items-center">
        <div className="flex items-center justify-center gap-5">
          <a href="#!" className="main-text font-semibold text-2xl">
            <AiOutlineInstagram />
          </a>
          <a href="#!" className="main-text font-semibold text-2xl">
            <AiOutlineYoutube />
          </a>
          <a href="#!" className="main-text font-semibold text-xl">
            <RiTwitterXFill />
          </a>
          <a href="#!" className="main-text font-semibold text-2xl">
            <AiOutlineFacebook />
          </a>
          <a href="#!" className="main-text font-semibold text-xl">
            <BsSnapchat />
          </a>
        </div>
        <div className="mt-5">
          <p className="text-text-secondary text-lg">
            &copy; 2023 Teracce. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
