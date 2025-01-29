// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import supabase from "../app/lib/supabaseClient";

// interface Message {
//   id: number;
//   name: string;
//   message: string;
//   created_at: string; // database
// }

// const ChatBox = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const chatBoxRef = useRef<HTMLDivElement | null>(null);

//   // Fetch messages from Supabase on initial load
//   const fetchMessages = async () => {
//     const { data, error } = await supabase
//       .from("messages")
//       .select("*")
//       .order("created_at", { ascending: true });

//     if (error) console.error("Error fetching messages:", error);
//     else setMessages(data || []);
//   };

//   // Subscribe to real-time message updates
//   const setupRealtime = () => {
//     const channel = supabase
//       .channel("realtime:messages")
//       .on(
//         "postgres_changes",
//         { event: "INSERT", schema: "public", table: "messages" },
//         (payload) => {
//           const newMessage = payload.new as Message; // Explicitly type the payload as `Message`
//           setMessages((prev) => [...prev, newMessage]);
//         }
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   };

//   // Auto-scroll to the bottom of the chat box when messages update
//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // Fetch messages and setup real-time updates on component mount
//   useEffect(() => {
//     fetchMessages();
//     const cleanup = setupRealtime();
//     return cleanup;
//   }, []);

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md col-span-1 sm:col-span-2">
//       <h2 className="text-2xl font-semibold mb-4">Chat Box</h2>
//       <div
//         ref={chatBoxRef}
//         className="bg-gray-100 p-4 rounded-lg space-y-4 max-h-64 overflow-y-auto"
//       >
//         {messages.map((msg) => (
//           <div key={msg.id} className="bg-white p-2 rounded-md">
//             <p>
//               <strong>{msg.name}:</strong> {msg.message}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ChatBox;

"use client";

import React, { useEffect, useState } from "react";
import supabase from "../app/lib/supabaseClient";
import SendMessageInput from "./SendMessageInput";

interface Message {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);  // New state to track editing
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null); // Track editing message

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) console.error("Error fetching messages:", error);
    else setMessages(data || []);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const onSend = async (message: string, messageId?: number) => {
    if (isEditing && messageId) {
      // Handle Edit
      const { error } = await supabase
        .from("messages")
        .update({ message })
        .eq("id", messageId);
      
      if (error) console.error("Error updating message:", error);
      else {
        // Update the local state to reflect the edited message
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === messageId ? { ...msg, message } : msg
          )
        );
      }
      setIsEditing(false); // Reset editing state
      setEditingMessageId(null); // Reset message ID
    } else {
      // Handle New Message
      const { error } = await supabase
        .from("messages")
        .insert([{ name: "User", message }]);

      if (error) console.error("Error sending message:", error);
      else {
        // Update the local state with the new message
        setMessages((prevMessages) => [...prevMessages, { id: Date.now(), name: "User", message, created_at: new Date().toISOString() }]);
      }
    }
    setMessage(""); // Clear the message input after sending or editing
  };

  const handleEditMessage = (id: number) => {
    const messageToEdit = messages.find((msg) => msg.id === id);
    if (messageToEdit) {
      setMessage(messageToEdit.message);
      setIsEditing(true);
      setEditingMessageId(id); // Set the message ID that is being edited
    }
  };

  const handleDeleteMessage = async (id: number) => {
    const { error } = await supabase.from("messages").delete().eq("id", id);
    if (error) console.error("Error deleting message:", error);
    else {
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id)); // Remove the deleted message from state
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md col-span-1 sm:col-span-2">
      <h2 className="text-2xl font-semibold mb-4">Chat Box</h2>
      <div className="bg-gray-100 p-4 rounded-lg space-y-4 max-h-64 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-white p-2 rounded-md">
            <p>
              <strong>{msg.name}:</strong> {msg.message}
            </p>
            <button onClick={() => handleEditMessage(msg.id)} className="text-blue-500">Edit</button>
            <button onClick={() => handleDeleteMessage(msg.id)} className="text-red-500 ml-2">Delete</button>
          </div>
        ))}
      </div>
      <SendMessageInput
        message={message}
        setMessage={setMessage}
        onSend={onSend}
        isEditing={isEditing}
      />
    </div>
  );
};

export default ChatBox;
