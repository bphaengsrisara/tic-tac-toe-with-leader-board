import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function UnProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (session) {
    // Redirect to the / page if the user is authenticated
    redirect("/");
  }

  // Render the children if there's no session
  return children;
}
