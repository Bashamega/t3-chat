"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

type Message = {
  id: string;
  sender: "user" | "bot";
  content: string;
  timestamp: number;
};

type ConversationContextType = {
  messages: Message[];
  sendMessage: (content: string, model: string) => void;
  receiveMessage: (content: string) => void;
  clearConversation: () => void;
  typing: boolean;
  error: string | null;
};

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export function ConversationProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addMessage = useCallback((sender: "user" | "bot", content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        sender,
        content,
        timestamp: Date.now(),
      },
    ]);
  }, []);

  const sendMessage = (text: string, model: string) => {
    setError(null);
    addMessage("user", text);
    setTyping(true);
    fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        model,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to send message");
        }
        return res.json();
      })
      .then((data) => receiveMessage(data.result))
      .catch((err) => {
        setError(err.message);
        // Add error message to chat
        addMessage("bot", `Error: ${err.message}`);
      })
      .finally(() => {
        setTyping(false);
      });
  };

  const receiveMessage = (content: string) => {
    addMessage("bot", content);
  };

  const clearConversation = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <ConversationContext.Provider
      value={{ messages, sendMessage, receiveMessage, clearConversation, typing, error }}
    >
      {children}
    </ConversationContext.Provider>
  );
}

export function useConversation() {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error("useConversation must be used within a ConversationProvider");
  }
  return context;
}
