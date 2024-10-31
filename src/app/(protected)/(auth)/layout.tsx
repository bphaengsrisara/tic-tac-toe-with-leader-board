"use client";

import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { logOut } from "@/lib/auth";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed left-0 top-0 z-10 flex w-full items-center border-b bg-white p-4 shadow-sm">
        {session?.user?.name && (
          <span className="font-medium text-gray-700">
            Hello, {session.user.name}
          </span>
        )}
        <Button
          onClick={() => logOut()}
          className="ml-auto bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
        >
          Logout
        </Button>
      </header>
      <main className="p-6 pt-20">{children}</main>
    </div>
  );
}
