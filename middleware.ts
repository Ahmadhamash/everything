export { auth as middleware } from "@/lib/auth";

export const config = {
  matcher: ["/dashboard/:path*", "/stores/:path*", "/studio/:path*", "/content/:path*", "/website-builder/:path*", "/settings/:path*"]
};
