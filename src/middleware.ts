import { NextRequest, NextResponse } from "next/server";
import CONSTANTS from "./constants/constants";
import ICookieUser from "./interface/ICookieUser";

const isAdminRoute = (pathname: string) => {
  return pathname.startsWith("/admin");
};

const isPaymentRoute = (pathname: string) => {
  return pathname.startsWith("/subscribe/payment");
};

const isLoginRoute = (pathname: string) => {
  return pathname.startsWith("/login");
};

const isRegisterRoute = (pathname: string) => {
  return pathname.startsWith("/register");
};

const isProfileRoute = (pathname: string) => {
  return pathname.startsWith("/profile");
};

export async function middleware(req: NextRequest) {
  const cookieData = req.cookies.get(CONSTANTS.COOKIENAME)?.value!;
  const { pathname } = req.nextUrl;
  let user: ICookieUser | undefined = undefined;

  if (cookieData && isLoginRoute(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (cookieData && isRegisterRoute(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!cookieData && isPaymentRoute(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!cookieData && isAdminRoute(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!cookieData && isProfileRoute(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (cookieData !== undefined) {
    user = JSON.parse(cookieData);
  }

  if (user && isAdminRoute(pathname) && !user.isAdmin) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: ["/admin/:path*", "/subscribe/payment"],
// };
