import { NextRequest, NextResponse } from "next/server";
import CONSTANTS from "./constants/constants";

const isAdminRoute = (pathname: string) => {
  return pathname.startsWith("/admin");
};

const isPaymentRoute = (pathname: string) => {
  return pathname.startsWith("/subscribe/payment");
};

export async function middleware(req: NextRequest) {
  const cookieData = req.cookies.get(CONSTANTS.COOKIENAME)?.value!;

  if (!cookieData) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const user = JSON.parse(cookieData);

  const { pathname } = req.nextUrl;
  if (isAdminRoute(pathname) && !user.isAdmin) {
    console.log("bukan admin");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/subscribe/payment"],
};
