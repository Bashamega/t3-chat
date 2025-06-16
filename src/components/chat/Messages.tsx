"use client";
import { useConversation } from "@/context/chat";
import React, { useEffect, useRef } from "react";

export type Message = {
  id: string;
  sender: "user" | "bot";
  content: string;
  timestamp: number;
};

export function Messages() {
  const { messages } = useConversation();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full w-1/2 overflow-y-auto  rounded p-4 space-y-2">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-xs px-3 py-2 rounded text-sm ${
              msg.sender === "user"
                ? "bg-blue-600 text-white rounded-br-none"
                : " text-gray-900 rounded-bl-none border border-purple-500"
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
