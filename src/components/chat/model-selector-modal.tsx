import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useModelsQuery } from "@/lib/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ModelSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectModel: (model: Model) => void;
  selectedModel: Model;
}

export default function ModelSelectorModal({
  isOpen,
  onClose,
  onSelectModel,
  selectedModel,
}: ModelSelectorModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, isError } = useModelsQuery();

  // Save selected model to localStorage whenever it changes
  useEffect(() => {
    if (selectedModel) {
      localStorage.setItem("selectedModel", JSON.stringify(selectedModel));
    }
  }, [selectedModel]);

  const filteredModels =
    data?.filter((model) => model.name.toLowerCase().includes(searchTerm.toLowerCase())) ?? [];

  const handleModelSelect = (model: Model) => {
    onSelectModel(model);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] h-[600px]">
        <DialogHeader>
          <DialogTitle>Select Model</DialogTitle>
        </DialogHeader>

        <div className="h-full overflow-hidden">
          {/* Search Input */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search models..."
            className="w-full px-4 py-3 text-gray-200 bg-gray-700 rounded-lg mb-4 placeholder-gray-400"
          />

          {isError ? (
            <div className="flex justify-center items-center py-8">
              <p className="text-red-500 text-center">
                Failed to load models. Please try again later.
              </p>
            </div>
          ) : isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="text-gray-400 animate-spin" size={50} />
            </div>
          ) : (
            <div
              className={
                filteredModels.length > 0
                  ? "space-y-2 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 h-full"
                  : ""
              }
            >
              {filteredModels.length > 0 ? (
                filteredModels.map((model) => (
                  <button
                    key={model.id}
                    className={`cursor-pointer w-full px-4 py-3 text-center rounded-lg transition-colors ${
                      selectedModel.id === model.id
                        ? "bg-gray-600 text-white"
                        : "text-gray-200 hover:bg-gray-700"
                    }`}
                    onClick={() => handleModelSelect(model)}
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
      </DialogContent>
    </Dialog>
  );
}
