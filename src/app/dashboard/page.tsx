// "use client";

// import React, { useState, useEffect } from "react";
// import { useSession, signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import io, { Socket } from "socket.io-client";

// import TrendingTopics from "../../components/TrendingTopics";
// import ActiveUsers from "../../components/ActiveUsers";
// import ChatBox from "../../components/ChatBox";
// import SendMessageInput from "../../components/SendMessageInput";

// // Declare the socket variable here
// let socket: Socket;

// const Dashboard = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [activeUsers, setActiveUsers] = useState(0); // Track active users
//   const [message, setMessage] = useState(""); // Message input state

//   // Socket setup for the WebSocket connection
//   useEffect(() => {
//     if (status === "loading") return;

//     if (!session) {
//       router.push("/"); // Redirect to homepage if not signed in
//     } else {
//       socket = io("http://localhost:5000"); // Your server's WebSocket URL

//       // Listen for active users count update from the server
//       socket.on("active_users", (count: number) => {
//         setActiveUsers(count); // Update active users count
//       });

//       // Cleanup on component unmount
//       return () => {
//         socket.disconnect();
//       };
//     }
//   }, [session, status, router]);

//   const handleLogout = () => {
//     signOut({ callbackUrl: "/" });
//   };

//   // Send message to the chat room
//   const sendMessage = (message: string) => {
//     if (message.trim()) {
//       const userMessage = `${session?.user?.name}: ${message}`;
//       socket.emit("chat_message", userMessage); // Emit message to server
//       setMessage(""); // Clear input field
//     }
//   };

//   // If session is still loading, show loading message
//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen p-6 bg-gray-100">
//       {/* Header Section with Name and Logout Button */}
//       <header className="bg-white shadow-md p-4 flex justify-between items-center mb-8">
//         <div className="text-xl font-semibold text-gray-800">
//           Welcome, {session?.user?.name}
//         </div>
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
//         >
//           Logout
//         </button>
//       </header>

//       {/* Main Dashboard Layout */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         {/* Left Column: Trending Live Topics and Chat Box */}
//         <div className="space-y-6">
//           {/* Trending Live Topics */}
//           <TrendingTopics />

//           {/* Chat Box */}
//           <ChatBox /> {/* No messages prop passed */}
//         </div>

//         {/* Right Column: Active Users and Send Message Input */}
//         <div className="space-y-6">
//           {/* Active Users */}
//           <ActiveUsers activeUsers={activeUsers} />

//           {/* Send Message Input */}
//           <SendMessageInput message={message} setMessage={setMessage} onSend={sendMessage} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


"use client";

import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import io, { Socket } from "socket.io-client";

import TrendingTopics from "../../components/TrendingTopics";
import ActiveUsers from "../../components/ActiveUsers";
import ChatBox from "../../components/ChatBox";
import SendMessageInput from "../../components/SendMessageInput";

// Declare the socket variable
let socket: Socket;

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeUsers, setActiveUsers] = useState(0); // Track active users
  const [message, setMessage] = useState(""); // Message input state

  // Socket setup for the WebSocket connection
  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/"); // Redirect to homepage if not signed in
    } else {
      socket = io("https://convohub-web-backend-production.up.railway.app", {
        transports: ["websocket"],
      }); // Use your deployed backend URL

      // Listen for active users count update from the server
      socket.on("active_users", (count: number) => {
        setActiveUsers(count);
      });

      // Cleanup on component unmount
      return () => {
        socket.disconnect();
      };
    }
  }, [session, status, router]);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  // Send message to the chat room
  const sendMessage = (message: string) => {
    if (message.trim()) {
      const userMessage = `${session?.user?.name}: ${message}`;
      socket.emit("chat_message", userMessage); // Emit message to server
      setMessage(""); // Clear input field
    }
  };

  // If session is still loading, show loading message
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Header Section with Name and Logout Button */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center mb-8">
        <div className="text-xl font-semibold text-gray-800">
          Welcome, {session?.user?.name}
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
        >
          Logout
        </button>
      </header>

      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Left Column: Trending Live Topics and Chat Box */}
        <div className="space-y-6">
          {/* Trending Live Topics */}
          <TrendingTopics />

          {/* Chat Box */}
          <ChatBox />
        </div>

        {/* Right Column: Active Users and Send Message Input */}
        <div className="space-y-6">
          {/* Active Users */}
          <ActiveUsers activeUsers={activeUsers} />

          {/* Send Message Input */}
          <SendMessageInput message={message} setMessage={setMessage} onSend={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


