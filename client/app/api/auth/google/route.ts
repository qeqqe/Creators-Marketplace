import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.redirect(
        new URL("/signin?error=No authorization code", request.url)
      );
    }

    const backendResponse = await fetch(
      `${BACKEND_URL}/auth/google/callback?code=${code}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!backendResponse.ok) {
      const error = await backendResponse.text();
      console.error("Backend error:", error);
      return NextResponse.redirect(
        new URL("/signin?error=Authentication failed", request.url)
      );
    }

    const data = await backendResponse.json();

    if (data.access_token) {
      const response = NextResponse.redirect(
        new URL("/dashboard", request.url)
      );

      response.cookies.set("token", data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
      });

      response.cookies.set("email", data.email, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
      });

      return response;
    }

    return NextResponse.redirect(
      new URL("/signin?error=Authentication failed", request.url)
    );
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.redirect(
      new URL("/signin?error=Server error", request.url)
    );
  }
}
