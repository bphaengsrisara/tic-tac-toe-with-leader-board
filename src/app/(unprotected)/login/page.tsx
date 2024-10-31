"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { logIn } from "@/lib/auth";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>Please log in to access the board</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => logIn()}
            className="mb-3 w-full bg-blue-500 font-semibold text-white hover:bg-blue-600"
          >
            Sign in
          </Button>
          <Button
            onClick={() => logIn("google")}
            className="w-full bg-red-500 font-semibold text-white hover:bg-red-600"
          >
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
