import GenericTextInput from "@/components/GenericTextInput";
import PrimaryButton from "@/components/PrimaryButton";
import CONSTANTS from "@/constants/constants";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Link from "next/link";
import { useCookies } from "react-cookie";
import IUser from "@/interface/IUser";
import ICookieUser from "@/interface/ICookieUser";

function Login() {
  const [emailValue, setEmailValue] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [_, setCookie] = useCookies([CONSTANTS.COOKIENAME]);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent, path: string) => {
    e.preventDefault();
    const response = await fetch(`/api/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailValue, passwordValue }),
    });
    if (response.ok) {
      const data: IUser[] = await response.json();
      const newUser: IUser = data[0];
      const cookieUser: ICookieUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        subscription: newUser.subscription,
      };
      setCookie(CONSTANTS.COOKIENAME, JSON.stringify(cookieUser), {
        path: "/",
        maxAge: 3600,
        sameSite: true,
      });
      if (data[0].isAdmin) {
        router.replace("/admin");
      } else {
        router.replace("/");
      }
    } else {
      console.log(response.statusText);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center px-3 pb-5 pt-20 container mx-auto sm:pt-40">
      <h1 className="font-[800] text-3xl">Log In</h1>
      <form
        className="mt-2 w-full lg:w-3/6"
        onSubmit={(e) => handleSubmit(e, "login")}
      >
        <div className="mt-3">
          <GenericTextInput
            placeHolder="Please put your email here..."
            type="email"
            label="Email"
            inputValue={emailValue}
            setInputValue={setEmailValue}
          />
        </div>
        <div className="mt-3">
          <GenericTextInput
            placeHolder="Please put your password here..."
            type="password"
            label="Password"
            inputValue={passwordValue}
            setInputValue={setPasswordValue}
          />
        </div>
        <div className="mt-5">
          <PrimaryButton
            type="submit"
            additionalStyling="w-full px-5 py-2 font-[500] text-lg"
          >
            Log In
          </PrimaryButton>
        </div>
      </form>
      <p className="mt-3 text-base sm:text-xl">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default Login;
