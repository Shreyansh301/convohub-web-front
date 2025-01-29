"use client";

import React, { useEffect, useRef, useState } from "react";
import supabase from "../app/lib/supabaseClient";

interface Message {
  id: number;
  name: string;
  message: string;
  created_at: string; // database
}

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
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
          const newMessage = payload.new as Message; // Explicitly type the payload as `Message`
          setMessages((prev) => [...prev, newMessage]);
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md col-span-1 sm:col-span-2">
      <h2 className="text-2xl font-semibold mb-4">Chat Box</h2>
      <div
        ref={chatBoxRef}
        className="bg-gray-100 p-4 rounded-lg space-y-4 max-h-64 overflow-y-auto"
      >
        {messages.map((msg) => (
          <div key={msg.id} className="bg-white p-2 rounded-md">
            <p>
              <strong>{msg.name}:</strong> {msg.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatBox;
