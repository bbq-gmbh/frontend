import { jwtDecrypt, jwtVerify } from "jose";

import { NextResponse, NextRequest } from "next/server";

import * as sdk from "@/backend/sdk.gen";

const tokenSecret = process.env.TOKEN_SECRET!;
const encodedTokenSecret = new TextEncoder().encode(tokenSecret);
const tokenAlgorithm = process.env.TOKEN_ALGORITHM!;

export async function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const pathname = nextUrl.pathname;

  const accessToken = cookies.get("access_token")?.value;
  const refreshToken = cookies.get("refresh_token")?.value;

  if (pathname == "/login") {
    if (refreshToken !== undefined) {
      const redirectPath = nextUrl.searchParams.get("redirect");
      if (redirectPath !== null) {
        return NextResponse.redirect(new URL(redirectPath, request.url));
      }
      return NextResponse.redirect(new URL("/app", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/app")) {
    let accessTokenValid = accessToken !== undefined;
    if (accessTokenValid) {
      try {
        await jwtVerify(accessToken!, encodedTokenSecret, {
          algorithms: [tokenAlgorithm],
        });
        accessTokenValid = true;
      } catch (error) {
        accessTokenValid = false;
      }
    }

    if (accessTokenValid) {
      return NextResponse.next();
    }

    let refreshTokenValid = refreshToken !== undefined;
    if (refreshTokenValid) {
      try {
        await jwtVerify(refreshToken!, encodedTokenSecret, {
          algorithms: [tokenAlgorithm],
        });
        refreshTokenValid = true;
      } catch (error) {
        refreshTokenValid = false;
      }
    }

    if (refreshTokenValid) {
      const apiRes = await sdk.refreshAccessToken({
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      if (apiRes.data) {
        request.cookies.set("access_token", apiRes.data.token);

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

      const loginUrl = new URL("/login", request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("refresh_token");
      return response;
    }

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname + nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Only protect /app/* routes
export const config = {
  matcher: ["/app/:path*", "/login"],
};
