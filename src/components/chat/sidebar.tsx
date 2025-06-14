"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { MessageCircle } from "lucide-react";

export function Sidebar() {
  const { user } = useUser();
  const { openUserProfile } = useClerk();

  return (
    <aside className="w-1/5 min-h-screen bg-sidebar-primary text-white flex flex-col shadow-lg rounded-r-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-5 bg-gradient-to-r from-blue-500 to-purple-500 shadow-md pb-2">
        <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-semibold">T3 Chat</span>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-4">
        <ul className="space-y-2 text-sm">
          {[
            { name: "Conversations", href: "#" },
            { name: "Settings", href: "#" },
            { name: "Help", href: "#" },
          ].map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="block rounded-md px-3 py-2 text-gray-300 hover:bg-purple-700 hover:text-white transition-colors duration-200"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile Section */}
      {user && (
        <button
          onClick={() => openUserProfile()}
          className="mt-auto px-4 py-3 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <img
              src={user.imageUrl || "/default-avatar.png"}
              alt={user.fullName || "User Avatar"}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium">{user.fullName}</span>
          </div>
        </button>
      )}
    </aside>
  );
}
