"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed left-0 top-0 z-10 flex w-full items-center border-b bg-white p-4 shadow-sm">
        <Button
          onClick={() => signOut()}
          className="ml-auto bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
        >
          Logout
        </Button>
      </header>
      <main className="p-6 pt-20">{children}</main>
    </div>
  );
}
