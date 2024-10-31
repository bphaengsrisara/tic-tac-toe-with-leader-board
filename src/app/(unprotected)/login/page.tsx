"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div>
      <h1>Please log in to access the board</h1>
      <button onClick={() => signIn()}>Sign in</button>
      {/* Or specify a provider */}
      <button onClick={() => signIn("google")}>Sign in with Google</button>
    </div>
  );
}
