import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/about",
  "/projects",
  "/impact",
  "/volunteer",
  "/donate",
  "/login(.*)",
  "/signup(.*)",
  // Razorpay calls this server-to-server (no Clerk session); it is
  // authenticated via webhook signature verification instead.
  "/api/razorpay-webhook",
]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    // ✅ No parentheses — it's already the auth object
    auth.protect();
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // all dynamic routes, skip static files
};
