"use client"
import React from 'react';
import { signIn, useSession } from 'next-auth/react'; // Import useSession and signIn

export default function HeroSection() {
  const { data: session } = useSession(); // Check if the user is logged in

  // Handle the click event
  const handleStartChatting = () => {
    if (!session) {
      signIn("google", { callbackUrl: "/dashboard" }); // Prompt login if not signed in
    }
  };

  return (
    <section className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-gradient-to-b from-gray-50 to-white">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
        Instant Chat & Seamless <span className="text-blue-600">Conversations</span>
      </h1>
      <p className="text-xl text-gray-600 mb-8">
      ConvoHub makes it effortless to start conversations about trending topicsin seconds.
      </p>
      <button
        onClick={handleStartChatting}
        className="px-6 py-3 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 focus:outline-none animate-pulse"
      >
        Start Chatting
      </button>

      <div className="mt-12 w-full max-w-5xl flex justify-center">
        {/* Placeholder for Illustration/Image */}
        <img
          src="/illustration.svg"
          alt="Illustration"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
