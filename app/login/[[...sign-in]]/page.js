"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-50 px-4 pb-16 pt-28">
      <SignIn
        appearance={{
          elements: {
            rootBox: "shadow-xl rounded-3xl",
            card: "shadow-none rounded-3xl",
            formButtonPrimary:
              "bg-gradient-to-br from-emerald-500 to-emerald-700 hover:brightness-105 rounded-full",
          },
          variables: { colorPrimary: "#059669", borderRadius: "0.75rem" },
        }}
      />
    </div>
  );
}
