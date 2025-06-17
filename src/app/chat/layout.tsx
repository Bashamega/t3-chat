"use client";
import { Sidebar } from "@/components/chat/sidebar";
import { ConversationProvider } from "@/context/chat";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConversationProvider>
      <main className="flex h-screen w-full">
        <Sidebar />
        <div className="p-5 w-full flex items-center justify-between flex-col">{children}</div>
      </main>
    </ConversationProvider>
  );
}
