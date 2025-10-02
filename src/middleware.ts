import { jwtVerify } from "jose";
import { NextResponse, type NextRequest } from "next/server";

import * as sdk from "@/backend/sdk.gen";

const tokenSecret = process.env.TOKEN_SECRET!;
const encodedTokenSecret = new TextEncoder().encode(tokenSecret);
const tokenAlgorithm = process.env.TOKEN_ALGORITHM!;

async function isTokenValid(token: string | undefined): Promise<boolean> {
  if (!token) {
    return false;
  }
  try {
    await jwtVerify(token, encodedTokenSecret, {
      algorithms: [tokenAlgorithm],
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const { pathname, search } = nextUrl;

  const accessToken = cookies.get("access_token")?.value;
  const refreshToken = cookies.get("refresh_token")?.value;

  if (pathname === "/login") {
    if (await isTokenValid(refreshToken)) {
      const redirectPath = nextUrl.searchParams.get("redirect") ?? "/app";
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/app")) {
    if (await isTokenValid(accessToken)) {
      return NextResponse.next();
    }

    if (await isTokenValid(refreshToken)) {
      try {
        const apiRes = await sdk.refreshAccessToken({
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        if (apiRes.data) {
          const response = NextResponse.next();
          response.cookies.set("access_token", apiRes.data.token, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 1 * 30 * 1000),
            sameSite: "lax",
            path: "/",
          });
          return response;
        }
      } catch (error) {
        // Fallthrough to redirect to login if refresh fails
      }

      const loginUrl = new URL("/login", request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("refresh_token");
      return response;
    }

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Only protect /app/* routes
export const config = {
  matcher: ["/app/:path*", "/login"],
};
