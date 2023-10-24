import React, { useState } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import GenericTextInput from "@/components/GenericTextInput";
import Link from "next/link";
import TelInput from "@/components/TelInput";
import CONSTANTS from "@/constants/constants";
import { useRouter } from "next/router";
import IUser from "@/interface/IUser";
import { useCookies } from "react-cookie";
import ICookieUser from "@/interface/ICookieUser";
import successNotify from "@/library/helper/successToast";
import errorNotify from "@/library/helper/errorNotify";
import errorNotifyString from "@/library/helper/errorNotifyString";

function Index() {
  const [nameValue, setNameValue] = useState<string>("");
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>("");
  const [addressValue, setAddressValue] = useState<string>("");
  const [phoneNumberValue, setPhoneNumberValue] = useState<string>("");
  const [isNameValid, setIsNamValid] = useState<boolean>(true);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] =
    useState<boolean>(true);
  const [isAddressValid, setIsAddressValid] = useState<boolean>(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState<boolean>(true);

  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [_, setCookie] = useCookies([CONSTANTS.COOKIENAME]);
  const router = useRouter();

  function validateName(): boolean {
    if (nameValue.length === 0) {
      setIsNamValid(false);
      return false;
    }
    setIsNamValid(true);
    return true;
  }

  function validateEmail(): boolean {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!regex.test(emailValue)) {
      setIsEmailValid(false);
      return false;
    }
    setIsEmailValid(true);
    return true;
  }

  function validatePassword(): boolean {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (!regex.test(passwordValue)) {
      setIsPasswordValid(false);
      setPasswordErrorMessage(
        "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and with a minimum of 8 characters"
      );
      return false;
    }
    setIsPasswordValid(true);
    setPasswordErrorMessage("");
    return true;
  }

  function validateConfirmPassword(): boolean {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (!regex.test(confirmPasswordValue)) {
      setIsConfirmPasswordValid(false);
      setConfirmPasswordErrorMessage(
        "Confirm password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and with a minimum of 8 characters"
      );
      return false;
    }
    setIsConfirmPasswordValid(true);
    setConfirmPasswordErrorMessage("");
    return true;
  }

  function validateAddress(): boolean {
    if (addressValue.length === 0) {
      setIsAddressValid(false);
      return false;
    }
    setIsAddressValid(true);
    return true;
  }

  function validatePhoneNumber(): boolean {
    const regex = /[0-9]{12}/g;
    if (!regex.test(phoneNumberValue)) {
      setIsPhoneNumberValid(false);
      return false;
    }
    setIsPhoneNumberValid(true);
    return true;
  }

  function validatePasswordEqual(): boolean {
    if (passwordValue !== confirmPasswordValue) {
      setIsPasswordValid(false);
      setIsConfirmPasswordValid(false);
      setConfirmPasswordErrorMessage("Must be the same with password");
      return false;
    }
    setIsPasswordValid(true);
    setIsConfirmPasswordValid(true);
    setConfirmPasswordErrorMessage("");
    return true;
  }

  function validateAll(): boolean {
    let isContinue: boolean = true;
    if (!validateName()) {
      isContinue = false;
    }
    if (!validateEmail()) {
      isContinue = false;
    }
    if (!validatePassword()) {
      isContinue = false;
    }
    if (!validateConfirmPassword()) {
      isContinue = false;
    }
    if (!validateAddress()) {
      isContinue = false;
    }
    if (!validatePhoneNumber()) {
      isContinue = false;
    }
    return isContinue;
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!validateAll()) return;
    if (!validatePasswordEqual()) return;
    setIsLoading(true);

    const newUser: Omit<IUser, "id"> = {
      name: nameValue,
      email: emailValue.toLowerCase(),
      password: passwordValue,
      isAdmin: false,
      address: addressValue,
      phoneNumber: phoneNumberValue,
      subscription: {
        isSubscribed: false,
        expiration: new Date(),
      },
      liked: [],
      history: [],
      favorite: {
        Unwind: 0,
        "Lawyers Spotlight": 0,
        "Curated News": 0,
      },
      shared: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const checkResponse = await fetch(
        `${
          CONSTANTS.BASELOCALHOST
        }/users?email=${emailValue.toLocaleLowerCase()}`
      );
      if (!checkResponse.ok) {
        errorNotify(checkResponse);
        throw new Error(checkResponse.statusText);
      }
      const checkData = await checkResponse.json();
      if (checkData.length !== 0) {
        errorNotifyString("An account with the same email already exist");
        setIsLoading(false);
        return;
      }
      const response = await fetch(`${CONSTANTS.BASELOCALHOST}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        errorNotify(response);
        throw new Error(response.statusText);
      }
      const data = await response.json();
      const cookieUser: ICookieUser = {
        id: data.id,
        name: data.name,
        email: data.email,
        isAdmin: data.isAdmin,
        subscription: data.subscription,
      };
      setCookie(CONSTANTS.COOKIENAME, JSON.stringify(cookieUser), {
        path: "/",
        maxAge: 3600,
        sameSite: true,
      });
      successNotify("Sign up is successful");
      router.replace("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center px-3 pb-5 pt-20 container mx-auto sm:pt-40">
      <h1 className="font-[800] text-3xl">Register</h1>
      <form
        className="mt-2 w-full lg:w-3/6"
        onSubmit={(e) => handleRegister(e)}
      >
        <div className="mt-3">
          <GenericTextInput
            placeHolder="Please put your name here..."
            type="text"
            label="Name"
            inputValue={nameValue}
            setInputValue={setNameValue}
            isValid={isNameValid}
            blurFunc={validateName}
            errorMessage="Name cannot be empty"
          />
        </div>
        <div className="mt-3">
          <GenericTextInput
            placeHolder="Please put your email here..."
            type="email"
            label="Email"
            inputValue={emailValue}
            setInputValue={setEmailValue}
            isValid={isEmailValid}
            blurFunc={validateEmail}
            errorMessage="Please put in a valid email"
          />
        </div>
        <div className="mt-3">
          <GenericTextInput
            placeHolder="Please put the password here..."
            type="password"
            label="Password"
            inputValue={passwordValue}
            setInputValue={setPasswordValue}
            isValid={isPasswordValid}
            blurFunc={validatePassword}
            errorMessage={passwordErrorMessage}
          />
        </div>
        <div className="mt-3">
          <GenericTextInput
            placeHolder="Please put confirm the password here..."
            type="password"
            label="Confirm Password"
            inputValue={confirmPasswordValue}
            setInputValue={setConfirmPasswordValue}
            isValid={isConfirmPasswordValid}
            blurFunc={validateConfirmPassword}
            errorMessage={confirmPasswordErrorMessage}
          />
        </div>
        <div className="mt-3">
          <GenericTextInput
            placeHolder="Please put your address here..."
            type="text"
            label="Address"
            inputValue={addressValue}
            isValid={isAddressValid}
            blurFunc={validateAddress}
            setInputValue={setAddressValue}
            errorMessage="Address can't be empty"
          />
        </div>
        <div className="mt-3">
          <TelInput
            placeHolder="Please put your phone number here..."
            label="Phone Number"
            inputValue={phoneNumberValue}
            isValid={isPhoneNumberValid}
            blurFunc={validatePhoneNumber}
            setInputValue={setPhoneNumberValue}
            errorMessage="Please put the phone number in the required format (XXXXXXXXXXXX)"
          />
        </div>
        <div className="mt-5">
          <PrimaryButton
            type="submit"
            additionalStyling="w-full px-5 py-2 font-[500] text-lg"
            isLoading={isLoading}
          >
            Register
          </PrimaryButton>
        </div>
      </form>
      <p className="mt-3 text-base sm:text-xl">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Log In
        </Link>
      </p>
    </div>
  );
}

export default Index;
