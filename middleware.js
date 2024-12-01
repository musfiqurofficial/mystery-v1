import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token");
  console.log(token);
  const url = req.nextUrl.clone();

  const publicRoutes = ["/", "/auth/login", "/auth/register", "/storyline"];

  if (!publicRoutes.includes(url.pathname)) {
    if (!token) {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
