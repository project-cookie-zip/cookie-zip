import { NextRequest, NextFetchEvent } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  // if (req.nextUrl.pathname.startsWith("/")) {
  //   if (req.url.includes("/api")) {
  //     if (!req.url.includes("/enter") && !req.cookies.get("carrotsession")) {
  //       return NextResponse.redirect(`${req.nextUrl.origin}/login`);
  //     }
  //   }
  // }
  // return NextResponse.next();
}
