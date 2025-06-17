"use client";
import { ArrowUp, ChevronDown } from "lucide-react";
import { useState, useEffect, FormEvent, KeyboardEvent } from "react";
import ModelSelectorModal from "./model-selector-modal";
import { useConversation } from "@/context/chat";

export default function Input() {
  const { sendMessage, typing } = useConversation();
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model>(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedModel = localStorage.getItem("selectedModel");
      return storedModel
        ? JSON.parse(storedModel)
        : {
            name: "DeepSeek: Deepseek R1 0528 Qwen3 8B",
            id: "deepseek/deepseek-r1-0528-qwen3-8b:free",
          };
    }
    return {
      name: "DeepSeek: Deepseek R1 0528 Qwen3 8B",
      id: "deepseek/deepseek-r1-0528-qwen3-8b:free",
    };
  });

  useEffect(() => {
    localStorage.setItem("selectedModel", JSON.stringify(selectedModel));
  }, [selectedModel]);
  useEffect(() => {
    if (selectedModel) {
      localStorage.setItem("selectedModel", JSON.stringify(selectedModel));
    }
  }, [selectedModel]);

  const handleSubmit = (e: FormEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message.trim(), selectedModel.id);
      console.log("Message sent:", message);
      setMessage("");
    }
  };

  const handleModelSelect = (model: Model) => {
    setSelectedModel(model);
  };

  return (
    <div className=" p-4 backdrop-blur-4xl rounded-lg border-1 border-purple-500 w-1/2">
      {/* Input container */}
      <div className="relative bg-gray-700 rounded-lg border border-gray-600 focus-within:border-gray-500 transition-colors">
        <div className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
            placeholder="Type your message here..."
            className="flex-1 bg-transparent text-gray-200 placeholder-gray-400 px-4 py-3 focus:outline-none text-sm"
          />

          {/* Send button */}
          {message.trim() && (
            <button
              onClick={handleSubmit}
              className="p-2 mr-2 text-gray-200 bg-gray-600 hover:bg-gray-500 rounded-md transition-colors cursor-pointer"
              aria-label="Send message"
              disabled={typing}
            >
              <ArrowUp size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Bottom toolbar */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center space-x-4">
          {/* Model selector button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 text-gray-300 hover:text-gray-100 transition-colors text-sm cursor-pointer"
          >
            <span>{selectedModel.name}</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Model selector modal */}
      <ModelSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectModel={handleModelSelect}
        selectedModel={selectedModel}
      />
    </div>
  );
}
