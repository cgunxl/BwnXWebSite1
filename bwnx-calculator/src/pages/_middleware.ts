import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en","es","pt","de","fr","ja","ko","zh","th","ar","hi","id","ru","it","nl","vi","fa"],
  defaultLocale: "en",
});

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};