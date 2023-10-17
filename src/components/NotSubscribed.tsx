import Image from "next/image";
import Link from "next/link";
import React from "react";

function NotSubscribed() {
  return (
    <div className="mt-3 w-full">
      <div className="h-px w-3/4 bg-text-secondary mx-auto" />
      <div className="relative w-32 h-32 mx-auto mt-3 sm:w-40 sm:h-40 lg:w-56 lg:h-56">
        <Image src="/not-subscribed.png" alt="A dinosaurus" fill={true} />
      </div>
      <p className="mt-3 text-base text-center w-full sm:text-lg">
        This is a premium post for premium users. Please{" "}
        <Link href="/subscribe" className="underline text-blue-custom">
          subscribe
        </Link>{" "}
        to access the full content.
      </p>
    </div>
  );
}

export default NotSubscribed;
