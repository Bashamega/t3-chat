"use client";

import { useState, useRef, useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { MessageCircle, Menu, X } from "lucide-react";

export function Sidebar() {
  const { user } = useUser();
  const { openUserProfile } = useClerk();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar when clicking outside (mobile only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="sm:hidden fixed top-4 left-4 z-50 bg-gradient-to-t from-blue-600 to-purple-600 p-2 rounded-md text-white shadow-md"
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
      >
        <span className="sr-only">Open Sidebar</span>
        <Menu className="w-5 h-5" />
      </button>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden" />}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`
          fixed sm:static top-0 left-0 z-50 h-full sm:h-screen w-full sm:w-1/5 bg-sidebar-primary text-white shadow-lg rounded-none sm:rounded-r-lg 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-5 bg-gradient-to-r from-blue-500 to-purple-500 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold tracking-wide">T3 Chat</span>
          </div>

          {/* Close button (mobile only) */}
          <button
            className="sm:hidden p-1 text-white"
            onClick={() => setIsOpen(false)}
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4 flex-grow">
          <ul className="space-y-2 text-sm">
            {[
              { name: "Conversations", href: "#" },
              { name: "Settings", href: "#" },
              { name: "Help", href: "#" },
            ].map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-gray-300 hover:bg-purple-700 hover:text-white transition duration-200"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile */}
        {user && (
          <button
            onClick={() => {
              openUserProfile();
              setIsOpen(false);
            }}
            className="px-4 py-3 bg-gray-800 hover:bg-gray-700 transition text-left"
          >
            <div className="flex items-center gap-3">
              <img
                src={user.imageUrl || "/default-avatar.png"}
                alt={user.fullName || "User Avatar"}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium truncate">
                {user.fullName || user.primaryEmailAddress?.emailAddress}
              </span>
            </div>
          </button>
        )}
      </aside>
    </>
  );
}
