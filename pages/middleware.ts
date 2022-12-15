import { NextRequest, NextFetchEvent, userAgent } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  // if (req.nextUrl.pathname.startsWith("/")) {
  //   const ua = userAgent(req);
  //   if (ua?.isBot) {
  //     return NextResponse.redirect(`${req.nextUrl.origin}/login`);
  //   }
  //   if (req.url.includes("/api")) {
  //     return NextResponse.redirect(`${req.nextUrl.origin}/login`);
  //   }
  // }
  // return NextResponse.next();
}
