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
  sendMessage: (content: string) => void;
  receiveMessage: (content: string) => void;
  clearConversation: () => void;
};

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export function ConversationProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);

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

  const sendMessage = (content: string) => {
    addMessage("user", content);
  };

  const receiveMessage = (content: string) => {
    addMessage("bot", content);
  };

  const clearConversation = () => {
    setMessages([]);
  };

  return (
    <ConversationContext.Provider
      value={{ messages, sendMessage, receiveMessage, clearConversation }}
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
