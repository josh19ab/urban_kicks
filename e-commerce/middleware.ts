import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/orders", "/cart"]);

// With @clerk/nextjs v6, auth() is async and returns a SessionAuthWithRedirect
export default clerkMiddleware(async (auth, req) => {
  const session = await auth();
  if (isProtectedRoute(req) && !session.userId) {
    return session.redirectToSignIn();
  }
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
