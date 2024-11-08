export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/", "/calculation", "/register", "/parameters", "/statistics"],
};
