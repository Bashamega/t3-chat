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
  const { messages, typing } = useConversation();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full w-full max-w-3xl mx-auto overflow-y-auto p-6 space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-md px-4 py-3 rounded-xl text-sm shadow-md whitespace-pre-wrap ${
              msg.sender === "user"
                ? "bg-blue-600 text-white rounded-br-sm"
                : " border border-purple-500 rounded-bl-sm backdrop-blur-3xl text-white"
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}
      {typing && (
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
