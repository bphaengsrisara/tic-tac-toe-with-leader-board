import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session) {
    // Redirect to the /login page if there's no session
    redirect("/login");
  }

  return children;
}
