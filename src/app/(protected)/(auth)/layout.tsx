"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Button onClick={() => signOut()}>Logout</Button>
      {children}
    </div>
  );
}
