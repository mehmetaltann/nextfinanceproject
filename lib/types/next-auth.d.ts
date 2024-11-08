import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
  }

  interface Session {
    user: {
      id: string | unknown;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
  }
}
