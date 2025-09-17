import { NextResponse, NextRequest } from "next/server";

const REFRESH_TOKEN_COOKIE = "refresh_token";

export function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const pathname = nextUrl.pathname;

  const refreshToken = cookies.get(REFRESH_TOKEN_COOKIE)?.value;

  if (!refreshToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname + nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Only protect /app/* routes
export const config = {
  matcher: ["/", "/app/:path*"],
};
