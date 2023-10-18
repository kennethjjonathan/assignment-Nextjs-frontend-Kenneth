import React, { useState } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import GenericTextInput from "@/components/GenericTextInput";
import Link from "next/link";
import TelInput from "@/components/TelInput";
import CONSTANTS from "@/constants/constants";
import { useRouter } from "next/router";

function Index() {
  const [nameValue, setNameValue] = useState<string>("");
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [passwordValid, setPasswordValid] = useState<boolean>(true);
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>("");
  const [confirmPasswordValid, setConfirmPasswordValid] =
    useState<boolean>(true);
  const [addressValue, setAddressValue] = useState<string>("");
  const [phoneNumberValue, setPhoneNumberValue] = useState<string>("");
  const errorMessage: string = "Password and Confirmation must be the same";

  const router = useRouter();

  function validatePasswordConfirm(): boolean {
    if (passwordValue !== confirmPasswordValue) {
      setPasswordValid(false);
      setConfirmPasswordValid(false);
      return false;
    } else {
      setPasswordValid(true);
      setConfirmPasswordValid(true);
      return true;
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!validatePasswordConfirm()) {
      return;
    }
    try {
      const response = await fetch(`${CONSTANTS.BASELOCALHOST}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameValue,
          email: emailValue,
          password: passwordValue,
          isAdmin: false,
          address: addressValue,
          phoneNumber: phoneNumberValue,
          subscription: {
            isSubscribed: false,
            expiration: "",
          },
          liked: [],
          history: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      });
      if (!response.ok) throw new Error(response.statusText);
      router.replace("/");
      console.log(response);
    } catch (error) {
      console.error(error);
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
          />
        </div>
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
            placeHolder="Please put the password here..."
            type="password"
            label="Password"
            inputValue={passwordValue}
            setInputValue={setPasswordValue}
            isValid={passwordValid}
            errorMessage={errorMessage}
          />
        </div>
        <div className="mt-3">
          <GenericTextInput
            placeHolder="Please put confirm the password here..."
            type="password"
            label="Confirm Password"
            inputValue={confirmPasswordValue}
            setInputValue={setConfirmPasswordValue}
            isValid={confirmPasswordValid}
            errorMessage={errorMessage}
          />
        </div>
        <div className="mt-3">
          <GenericTextInput
            placeHolder="Please put your address here..."
            type="text"
            label="Address"
            inputValue={addressValue}
            setInputValue={setAddressValue}
          />
        </div>
        <div className="mt-3">
          <TelInput
            placeHolder="Please put your phone number here..."
            label="Phone Number"
            inputValue={phoneNumberValue}
            setInputValue={setPhoneNumberValue}
          />
        </div>
        <div className="mt-5">
          <PrimaryButton
            type="submit"
            additionalStyling="w-full px-5 py-2 font-[500] text-lg"
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
