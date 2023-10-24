import React from "react";
import style from "./LoadingPage.module.css";

function LoadingPage() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className={style.textBackground}>
        <h1 className="text-2xl md:text-3xl lg:text-4xl">Loading...</h1>
      </div>
    </div>
  );
}

export default LoadingPage;
