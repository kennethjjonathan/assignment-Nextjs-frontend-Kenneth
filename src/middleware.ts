import { NextRequest, NextResponse } from "next/server";
import CONSTANTS from "./constants/constants";

const isAdminRoute = (pathname: string) => {
  return pathname.startsWith("/admin");
};

export async function middleware(req: NextRequest) {
  const user = JSON.parse(req.cookies.get(CONSTANTS.COOKIENAME)?.value!);
  const { pathname } = req.nextUrl;
  if (isAdminRoute(pathname) && user.isAdmin) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
