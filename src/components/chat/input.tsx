"use client"
import { ArrowUp, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import ModelSelectorModal from "./model-selector-modal";

export default function Input(){
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState(() => {
      if (typeof window !== "undefined" && window.localStorage) {
        return localStorage.getItem('selectedModel') || 'gpt5';
      }
      return 'gpt5';
    });
  
    // Save selectedModel to localStorage whenever it changes
    useEffect(() => {
      if (selectedModel) {
        localStorage.setItem('selectedModel', selectedModel);
      }
    }, [selectedModel]);
  
    const handleSubmit = (e: any) => {
      e.preventDefault();
      if (message.trim()) {
        console.log('Message sent:', message);
        setMessage('');
      }
    };

    const handleModelSelect = (model: string) => {
      setSelectedModel(model);
    };

    return(
        <div className=" p-4 backdrop-blur-4xl rounded-lg border-1 border-purple-500 w-1/2">
          {/* Input container */}
          <div className="relative bg-gray-700 rounded-lg border border-gray-600 focus-within:border-gray-500 transition-colors">
            <div className="flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                placeholder="Type your message here..."
                className="flex-1 bg-transparent text-gray-200 placeholder-gray-400 px-4 py-3 focus:outline-none text-sm"
              />
              
              {/* Send button */}
              {message.trim() && (
                <button
                  onClick={handleSubmit}
                  className="p-2 mr-2 text-gray-200 bg-gray-600 hover:bg-gray-500 rounded-md transition-colors"
                  aria-label="Send message"
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
                className="flex items-center space-x-2 text-gray-300 hover:text-gray-100 transition-colors text-sm"
              >
                <span>{selectedModel}</span>
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
    )
}