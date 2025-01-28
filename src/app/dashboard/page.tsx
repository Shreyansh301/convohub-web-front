// // app/dashboard/page.tsx
// "use client";

// import React, { useEffect } from "react";
// import { useSession, signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function Dashboard() {
//   const { data: session, status } = useSession();
//   const router = useRouter(); // Initialize router for redirection

//   // If the session is loading, prevent rendering of the page
//   useEffect(() => {
//     if (status === "loading") {
//       return; // Don't render the page until the session is loaded
//     }
//     if (!session) {
//       router.push("/"); // Redirect to homepage if not signed in
//     }
//   }, [session, status, router]);

//   const handleLogout = () => {
//     signOut({ callbackUrl: "/" }); // Redirect to homepage after logout
//   };

//   // If session is still loading, show loading message or spinner
//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>
//       <p className="text-xl">Hello, {session?.user?.name}!</p>
//       <p className="mt-4">Start working here!</p>

//       {/* Logout Button */}
//       <button
//         onClick={handleLogout}
//         className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }




// "use client";

// import React, { useEffect, useState } from "react";
// import { useSession, signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import io, { Socket } from "socket.io-client"; // Import Socket type from socket.io-client

// // Declare the socket variable with the correct type
// let socket: Socket;

// export default function Dashboard() {
//   const { data: session, status } = useSession();
//   const router = useRouter(); // Initialize router for redirection
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<string[]>([]);

//   // If the session is loading, prevent rendering of the page
//   useEffect(() => {
//     if (status === "loading") {
//       return; // Don't render the page until the session is loaded
//     }
//     if (!session) {
//       router.push("/"); // Redirect to homepage if not signed in
//     } else {
//       // Connect to socket if session is valid
//       socket = io("http://localhost:5000"); // Adjust this URL if different
//       socket.on("chat_message", (msg: string) => {
//         setMessages((prevMessages) => [...prevMessages, msg]);
//       });
//     }

//     return () => {
//       if (socket) socket.disconnect(); // Clean up socket connection on component unmount
//     };
//   }, [session, status, router]);

//   const handleLogout = () => {
//     signOut({ callbackUrl: "/" }); // Redirect to homepage after logout
//   };

//   // Send message to the chat room
//   const sendMessage = () => {
//     if (message.trim() && session) {
//       const userMessage = `${session.user?.name}: ${message}`;
//       socket.emit("chat_message", userMessage); // Emit message to server
//       setMessage(""); // Clear message input
//     }
//   };

//   // If session is still loading, show loading message or spinner
//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       {/* Header Section with User Info and Logout Button */}
//       <header className="bg-white shadow-md p-4 flex justify-between items-center">
//         <div className="text-xl font-semibold text-gray-800">Welcome, {session?.user?.name}</div>
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
//         >
//           Logout
//         </button>
//       </header>

//       {/* Global Chat Section */}
//       <main className="flex-1 p-6">
//         <h2 className="text-2xl font-bold mb-4">Global Chat</h2>

//         {/* Chat Messages */}
//         <div className="bg-white p-4 rounded-lg shadow-md space-y-4 max-h-96 overflow-y-auto">
//           {messages.map((msg, index) => (
//             <div key={index} className="p-2 bg-gray-100 rounded-md">
//               <p className="text-gray-800">{msg}</p>
//             </div>
//           ))}
//         </div>

//         {/* Chat Input Section */}
//         <div className="mt-4 flex">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type a message"
//             className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             onClick={sendMessage}
//             className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-all"
//           >
//             Send
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// }






// pages/dashboard/page.tsx
// "use client";

// import React, { useState, useEffect } from "react";
// import { useSession, signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import io, { Socket } from "socket.io-client"; // Import socket.io-client

// import TrendingTopics from "../../components/TrendingTopics";
// import ActiveUsers from "../../components/ActiveUsers";
// import ChatBox from "../../components/ChatBox";
// import SendMessageInput from "../../components/SendMessageInput";

// // Declare the socket variable here
// let socket: Socket;

// const Dashboard = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [messages, setMessages] = useState<string[]>([]);
//   const [message, setMessage] = useState("");
//   const [activeUsers, setActiveUsers] = useState(0); // Track active users

//   // Socket setup for the WebSocket connection
//   useEffect(() => {
//     if (status === "loading") return;

//     if (!session) {
//       router.push("/"); // Redirect to homepage if not signed in
//     } else {
//       socket = io("http://localhost:5000"); // Your server's WebSocket URL

//       // Listen for incoming messages from the server
//       socket.on("chat_message", (msg: string) => {
//         setMessages((prevMessages) => [...prevMessages, msg]);
//       });

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
//         {/* Top Left Box: Trending Live Topics */}
//         <TrendingTopics />

//         {/* Top Right Box: Active Users */}
//         <ActiveUsers activeUsers={activeUsers} /> {/* Pass active users to the component */}

//         {/* Bottom Left Box: Chat Box */}
//         <ChatBox messages={messages} />

//         {/* Bottom Right Box: Send Message Input */}
//         <SendMessageInput message={message} setMessage={setMessage} onSend={sendMessage} />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;





// "use client";

// import React, { useState, useEffect } from "react";
// import { useSession, signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import io, { Socket } from "socket.io-client"; // Import socket.io-client

// import TrendingTopics from "../../components/TrendingTopics";
// import ActiveUsers from "../../components/ActiveUsers";
// import ChatBox from "../../components/ChatBox";
// import SendMessageInput from "../../components/SendMessageInput";

// // Declare the socket variable here
// let socket: Socket;

// const Dashboard = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [messages, setMessages] = useState<string[]>([]);
//   const [message, setMessage] = useState("");
//   const [activeUsers, setActiveUsers] = useState(0); // Track active users

//   // Socket setup for the WebSocket connection
//   useEffect(() => {
//     if (status === "loading") return;

//     if (!session) {
//       router.push("/"); // Redirect to homepage if not signed in
//     } else {
//       socket = io("http://localhost:5000"); // Your server's WebSocket URL

//       // Listen for incoming messages from the server
//       socket.on("chat_message", (msg: string) => {
//         setMessages((prevMessages) => [...prevMessages, msg]);
//       });

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
//           <ChatBox messages={messages} />
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

// Declare the socket variable here
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
      socket = io("http://localhost:5000"); // Your server's WebSocket URL

      // Listen for active users count update from the server
      socket.on("active_users", (count: number) => {
        setActiveUsers(count); // Update active users count
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
          <ChatBox /> {/* No messages prop passed */}
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




