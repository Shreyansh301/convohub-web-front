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

import React, { useEffect, useRef, useState } from "react";
import supabase from "../app/lib/supabaseClient";

interface Message {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

interface ChatBoxProps {
  session: any; // Pass the session object as a prop
}

const ChatBox = ({ session }: ChatBoxProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [editedMessage, setEditedMessage] = useState("");
  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  // Fetch messages from Supabase on initial load
  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) console.error("Error fetching messages:", error);
    else setMessages(data || []);
  };

  // Subscribe to real-time message updates
  const setupRealtime = () => {
    const channel = supabase
      .channel("realtime:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev) => [...prev, newMessage]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "messages" },
        (payload) => {
          const updatedMessage = payload.new as Message;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === updatedMessage.id ? updatedMessage : msg
            )
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "messages" },
        (payload) => {
          const deletedMessageId = payload.old.id;
          setMessages((prev) =>
            prev.filter((msg) => msg.id !== deletedMessageId)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  // Auto-scroll to the bottom of the chat box when messages update
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Fetch messages and setup real-time updates on component mount
  useEffect(() => {
    fetchMessages();
    const cleanup = setupRealtime();
    return cleanup;
  }, []);

  // Edit a message
  const editMessage = async (id: number, newMessage: string) => {
    const { error } = await supabase
      .from("messages")
      .update({ message: newMessage })
      .eq("id", id);

    if (error) {
      console.error("Error updating message:", error);
    } else {
      setEditingMessageId(null);
      setEditedMessage("");
    }
  };

  // Delete a message
  const deleteMessage = async (id: number) => {
    const { error } = await supabase.from("messages").delete().eq("id", id);

    if (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md col-span-1 sm:col-span-2">
      <h2 className="text-2xl font-semibold mb-4">Chat Box</h2>
      <div
        ref={chatBoxRef}
        className="bg-gray-100 p-4 rounded-lg space-y-4 max-h-64 overflow-y-auto"
      >
        {messages.map((msg) => (
          <div key={msg.id} className="bg-white p-2 rounded-md">
            {editingMessageId === msg.id ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={editedMessage}
                  onChange={(e) => setEditedMessage(e.target.value)}
                  className="flex-1 p-1 border rounded"
                />
                <button
                  onClick={() => editMessage(msg.id, editedMessage)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingMessageId(null)}
                  className="bg-gray-500 text-white px-2 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <p>
                  <strong>{msg.name}:</strong> {msg.message}
                </p>
                {/* Show Edit and Delete buttons only for the logged-in user's messages */}
                {session?.user?.name === msg.name && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingMessageId(msg.id);
                        setEditedMessage(msg.message);
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatBox;