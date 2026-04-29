import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SEC);

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  // Protect only /admin routes
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("X-RF-Token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    try {
      // Verify JWT
      const { payload } = await jwtVerify(token, SECRET);

      // Optional: role-based check
      if (!["admin", "editor"].includes(payload.role)) {
        return NextResponse.redirect(new URL("/signin", request.url));
      }

      // Token is valid → continue
      return NextResponse.next();
    } catch (err) {
      // console.log("Cookie Error=>", err);
      request.cookies.delete("X-RF-Token");
      request.cookies.delete("X-AS-Token");
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware only to admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
