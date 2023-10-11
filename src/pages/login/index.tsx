import GenericTextInput from "@/components/GenericTextInput";
import PrimaryButton from "@/components/PrimaryButton";
import React, { useState } from "react";

function Login() {
  const [emailValue, setEmailValue] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);

  const handleSubmit = async (e: React.FormEvent, path: string) => {
    e.preventDefault();
    const response = await fetch(`/api/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailValue, passwordValue }),
    });
    if (response.ok) {
      console.log("berhasil");
    } else {
      console.log(response.statusText);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen px-10">
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
    </div>
  );
}

export default Login;
