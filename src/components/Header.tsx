"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import useRouter for redirection

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter(); // Initialize router for page navigation

  // Handle login and redirection
  const handleLogin = () => {
    signIn("google", {
      callbackUrl: "/dashboard", // Redirect to the dashboard after login
    });
  };

  // Handle logout
  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); // redirect to homepage after logout
  };

  return (
    <header className="flex items-center justify-between p-4 bg-blue-500 text-white">
      <h1 className="text-3xl font-bold">ConvoHub</h1>
      {!session ? (
        <button
          onClick={handleLogin}
          className="bg-white text-blue-500 px-4 py-2 rounded-lg"
        >
          Login
        </button>
      ) : (
        <button
          onClick={handleLogout}
          className="bg-white text-blue-500 px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      )}
    </header>
  );
}





