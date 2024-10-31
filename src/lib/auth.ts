import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import { prisma } from "./prisma";
import {
  signIn as logIn,
  signOut as logOut,
  SessionProvider as AuthProvider,
} from "next-auth/react";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
});

export { logIn, logOut, AuthProvider };
