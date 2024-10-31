import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import { db } from "./db";
import {
  signIn as logIn,
  signOut as logOut,
  SessionProvider as AuthProvider,
} from "next-auth/react";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [Google],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});

export { logIn, logOut, AuthProvider };
