import React from "react";
import Link from "next/link";

type TeracceLogoProps = {
  textColor: string;
};

function TeracceLogo({ textColor }: TeracceLogoProps) {
  return (
    <Link href="/">
      <h1
        className={`font-extrabold text-2xl lg:text-4xl md:text-3xl main-text text-center ${textColor}`}
      >
        Teracce
      </h1>
    </Link>
  );
}

export default TeracceLogo;
