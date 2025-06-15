import { X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useModelsQuery } from "@/lib/api";

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
  const { data, isLoading } = useModelsQuery();

  // Save selected model to localStorage whenever it changes
  useEffect(() => {
    if (selectedModel) {
      localStorage.setItem('selectedModel', selectedModel);
    }
  }, [selectedModel]);

  if (!isOpen) return null;

  const filteredModels = data?.filter(model =>
    model.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) ?? [];

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
      <div className="bg-gray-800 rounded-lg p-6 w-1/2 shadow-xl relative h-1/2">
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

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className=" text-gray-400 animate-spin" size={50} />
          </div>
        ) : (
          <div className={filteredModels.length > 0 ? "space-y-2 max-h-60 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" : ""}>
            {filteredModels.length > 0 ? (
              filteredModels.map((model) => (
                <button
                  key={model.id}
                  className={`cursor-pointer w-full px-4 py-3 text-center rounded-lg transition-colors ${
                    selectedModel === model.name
                      ? 'bg-gray-600 text-white'
                      : 'text-gray-200 hover:bg-gray-700'
                  }`}
                  onClick={() => handleModelSelect(model.name)}
                >
                  <div className="font-medium text-ellipsis line-clamp-2">{model.name}</div>
                </button>
              ))
            ) : (
              <p className="text-gray-400 text-center">No models found.</p>
            )}
          </div>
        )}


      </div>
    </div>
  );
}
