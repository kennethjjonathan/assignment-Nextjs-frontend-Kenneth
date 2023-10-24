import GenericTextInput from "@/components/GenericTextInput";
import PrimaryButton from "@/components/PrimaryButton";
import CONSTANTS from "@/constants/constants";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Link from "next/link";
import { useCookies } from "react-cookie";
import IUser from "@/interface/IUser";
import ICookieUser from "@/interface/ICookieUser";
import errorNotify from "@/library/helper/errorNotify";
import errorNotifyString from "@/library/helper/errorNotifyString";
import successNotify from "@/library/helper/successToast";
import checkIfDateHasPassed from "@/library/helper/checkIfDateHasPassed";
import infoNotify from "@/library/helper/infoNotify";

function Login() {
  const [emailValue, setEmailValue] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [_, setCookie] = useCookies([CONSTANTS.COOKIENAME]);

  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  function validateEmail(): boolean {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!regex.test(emailValue)) {
      setIsEmailValid(false);
      setEmailErrorMessage("Please put in a valid email");
      return false;
    }
    setIsEmailValid(true);
    setEmailErrorMessage("");
    return true;
  }

  function validatePassword(): boolean {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (!regex.test(passwordValue)) {
      setIsPasswordValid(false);
      setPasswordErrorMessage(
        "Password contains at least 1 lowercase letter, 1 uppercase letter, 1 number, and with a minimum of 8 characters"
      );
      return false;
    }
    setIsPasswordValid(true);
    setPasswordErrorMessage("");
    return true;
  }

  function validateAll() {
    let isContinue: boolean = true;
    if (!validateEmail()) {
      isContinue = false;
    }
    if (!validatePassword()) {
      isContinue = false;
    }
    return isContinue;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `${
          CONSTANTS.BASELOCALHOST
        }/users?email=${emailValue.toLowerCase()}&password=${passwordValue}`
      );
      if (!response.ok) {
        errorNotify(response);
        throw new Error(response.statusText);
      }
      const data: IUser[] = await response.json();
      if (data.length === 0) {
        errorNotifyString("Wrong email or password");
        return;
      }
      let newUser = data[0];
      if (
        newUser.subscription.isSubscribed &&
        checkIfDateHasPassed(newUser.subscription.expiration.toString())
      ) {
        newUser = {
          ...newUser,
          subscription: {
            isSubscribed: false,
            expiration: newUser.subscription.expiration,
          },
        };
        const revalidResponse = await fetch(
          `${CONSTANTS.BASELOCALHOST}/users/${newUser.id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              subscription: newUser.subscription,
            }),
          }
        );
        if (!revalidResponse.ok) {
          errorNotify(revalidResponse);
          throw new Error(revalidResponse.statusText);
        }
        infoNotify(
          "Your subscription has expired, you are now a non-premium user"
        );
      }
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
      successNotify("Login is successful");
      if (data[0].isAdmin) {
        router.replace("/admin");
      } else {
        router.replace("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center px-3 pb-5 pt-20 container mx-auto sm:pt-40">
      <h1 className="font-[800] text-3xl">Log In</h1>
      <form className="mt-2 w-full lg:w-3/6" onSubmit={(e) => handleSubmit(e)}>
        <div className="mt-3">
          <GenericTextInput
            placeHolder="Please put your email here..."
            type="email"
            label="Email"
            inputValue={emailValue}
            isValid={isEmailValid}
            setInputValue={setEmailValue}
            blurFunc={validateEmail}
            errorMessage={emailErrorMessage}
          />
        </div>
        <div className="mt-3">
          <GenericTextInput
            placeHolder="Please put your password here..."
            type="password"
            label="Password"
            inputValue={passwordValue}
            isValid={isPasswordValid}
            blurFunc={validatePassword}
            setInputValue={setPasswordValue}
            errorMessage={passwordErrorMessage}
          />
        </div>
        <div className="mt-5">
          <PrimaryButton
            type="submit"
            additionalStyling="w-full px-5 py-2 font-[500] text-lg"
            isLoading={isLoading}
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
