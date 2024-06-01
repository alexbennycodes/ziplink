import { env } from "@/lib/env.mjs";
import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

import { authRoutes, protectedRoutes, publicRoutes } from "./routes";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: env.NEXTAUTH_SECRET });

    const isLoggedIn = !!token;

    const { nextUrl } = req;

    const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
    const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    const slugRoute = req.nextUrl.pathname.split("/").pop();

    // ⚙️ Is Api Route:
    if (isApiAuthRoute) {
      return NextResponse.next();
    }

    // ⚙️ Is Auth Route. First, check is authenticated:
    if (isAuthRoute) {
      if (isLoggedIn) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return NextResponse.next();
    }

    // ⚙️ Protected routes. If not authenticated, redirect to /auth:
    if (!isLoggedIn && isProtectedRoute) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // ⚙️ Home route if authenticated, redirect to /dashboard:
    if (isLoggedIn && isPublicRoute) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // ⚙️ Redirect using slug:
    // If not public route and not protected route:
    if (!isPublicRoute && !isProtectedRoute) {
      return NextResponse.next();
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/s/:slug*"],
};
