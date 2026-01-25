import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  // get pathname
  const pathName = request.nextUrl.pathname;

  let isAuthenticated = false;
  let isAdmin = false;

  // ! get user data

  const { data: session } = await userService.getSession();

  // ! set user data

  if (session) {
    isAuthenticated = true;
    isAdmin = session.user.role === Roles.admin;
  }

  // valiadte user role with admin role

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // ! redirect users to their role based page based on users role

  if (isAdmin && pathName.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  if (!isAdmin && pathName.startsWith("admin-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/dashboard/:path*",
  ],
};
