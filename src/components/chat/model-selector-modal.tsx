import { X } from "lucide-react";
import { useState, useEffect } from "react";

interface ModelSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectModel: (model: string) => void;
  selectedModel: string;
}

export default function ModelSelectorModal({
  isOpen,
  onClose,
  onSelectModel,
  selectedModel,
}: ModelSelectorModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [models, setModels] = useState<string[]>(['gpt-4', 'gpt-3.5', 'claude', 'hey']);



  // Save selected model to localStorage whenever it changes
  useEffect(() => {
    if (selectedModel) {
      localStorage.setItem('selectedModel', selectedModel);
    }
  }, [selectedModel]);

  if (!isOpen) return null;

  const filteredModels = models.filter(model =>
    model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleModelSelect = (model: string) => {
    onSelectModel(model);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <h3 className="text-lg font-semibold text-gray-200 mb-4">Select Model</h3>

        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search models..."
          className="w-full px-4 py-3 text-gray-200 bg-gray-700 rounded-lg mb-4 placeholder-gray-400"
        />

        {/* Model List */}
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {filteredModels.length > 0 ? (
            filteredModels.map((model) => (
              <button
                key={model}
                className={`w-full px-4 py-3 text-left rounded-lg transition-colors ${
                  selectedModel === model
                    ? 'bg-gray-600 text-white'
                    : 'text-gray-200 hover:bg-gray-700'
                }`}
                onClick={() => handleModelSelect(model)}
              >
                {model}
              </button>
            ))
          ) : (
            <p className="text-gray-400">No models found.</p>
          )}
        </div>

        {/* Cancel Button */}
        <button
          className="mt-4 w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
