import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/credits",
  "/profile",
  "/transformation(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const currentUrl = new URL(req.url);
  console.log("Current URL:", currentUrl.pathname);
  console.log("Public Route Match:", isProtectedRoute(req));
  // console.log("Public API Route Match:", isPublicApiRoute(req));
  console.log("User ID:", userId);


  if (!userId && isProtectedRoute(req)) {
    // Add custom logic to run before redirecting

    return (await auth()).redirectToSignIn();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    
  ],
};
